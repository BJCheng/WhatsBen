import { redisClient, redisKeys } from './redis-client';
import { UserValidator } from '../core/user-validator';
import jwt from 'jsonwebtoken';
import { sockets } from './class-setup-socket';
import uuidv4 from 'uuid/v4';
import Response from './response';
import randomWords from 'random-words';

const handleSecret = 'random-secret';

export default (app) => {
  app.get('/', (req, res) => {
    res.send('Hello whatsapp clone!');
  });

  app.get('/redis-test', (req, res) => {
    redisClient.incr('inc-foo', (err, result) => {
      if (err) {
        console.error(err); // eslint-disable-line
        res.status(500).send('redis increment error');
      } else {
        res.send(`New increment value is ${result}`);
      }
    });
  });

  app.get('/json-test', (req, res, next) => {
    redisClient.incr('inc-json-test', (err, result) => {
      if (err) {
        next(err);
      }
      else {
        res.json({ incResult: result });
      }
    });
  });

  app.get('/setup-server-socket/:namespace/', (req, res) => {
    const { namespace } = req.params;
    sockets.setupUserNamespace('/' + namespace);
    res.json(new Response().setData('success').toJson());
  });

  // app.post('/user', (req, res, next) => {
  //   const { handle, name } = req.body;
  //   const user = {
  //     handle,
  //     name
  //   };
  //   const validator = new UserValidator(user);
  //   const validationErrors = validator.validate([{ handle: '1' }]);
  //   if (validationErrors.length > 0) {
  //     console.error('validation errors', validationErrors);
  //     res.status(500).send(validationErrors);
  //   } else {
  //     redisClient.lpush('users', JSON.stringify(user), (err, result) => {
  //       if (err) {
  //         next(err);
  //       }
  //       else {
  //         const token = jwt.sign({ handle }, handleSecret);
  //         console.info(jwt);
  //         res.json({
  //           token: `Bearer ${token}`
  //         });
  //       }
  //     });
  //   }
  // });

  app.get('/verify', (req, res) => {
    const bearerToken = req.header('Authorization');
    const token = bearerToken.substring('Bearer '.length);
    const decoded = jwt.verify(token, handleSecret);
    res.send(decoded.handle);
  });

  app.post('/send-message', (req, res) => {
    const { userNamespace, msg } = req.body;
    sockets.emit('receive-message', `/${userNamespace}`, msg);
    res.send({ userNamespace, msg });
  });

  app.get('/messages/:from/:to', async (req, res, next) => {
    const { from, to } = req.params;
    const exists = await redisClient.existsAsync(redisKeys.getMessages(from, to), 0, -1).catch(err => {
      next(err);
    });
    if (exists == 0) {
      res.json(new Response().setError(`No messages between ${from} and ${to}`));
      next();
    }
    const result = await redisClient.lrangeAsync(redisKeys.getMessages(from, to), 0, -1).catch(err => {
      next(err);
    });
    res.json(new Response().setData(result).toJson());
  });

  app.post('/message/:from/:to', async (req, res, next) => {
    const { from, to } = req.params;
    const { text, sendTime } = req.body;
    if (!from || !to || !text || !sendTime) {
      res.json(new Response().setError('Missing required fields'));
      return;
    }
    const messageObj = {
      from,
      to,
      text,
      sendTime,
      serverReceiveTime: Date.now()
    };
    const messageJson = JSON.stringify(messageObj);
    await redisClient.rpushAsync(redisKeys.getMessages(from, to), messageJson).catch(err => { console.error(err); });
    await redisClient.zaddAsync(redisKeys.getContacts(from), Date.now(), to).catch(err => { console.error(err); });
    await redisClient.zaddAsync(redisKeys.getContacts(to), Date.now(), from).catch(err => { console.error(err); });
    sockets.emit('receive-message', `/${to}`, messageObj); // especially test if json string can be emitted or not
    res.json(new Response().setData(messageJson).toJson());
  });

  app.get('/user/:id', wrapAsync(async (req, res) => {
    const { id } = req.params;
    const result = await redisClient.hgetallAsync(redisKeys.getUser(id)).catch(err => { console.error(err); });
    if (!result)
      throw new Error(`no such user: ${id}`);
    res.json(result);
  }));

  app.post('/auth', wrapAsync(async (req, res) => {
    const { id, password } = req.body;
    const result = await redisClient.hgetallAsync(redisKeys.getUser(id)).catch(err => { console.error(err); });
    if (!result)
      throw new Error(`no such user: ${id}`);
    if (password !== result.password)
      throw new Error('incorrect id password combination');
    res.json({result: true});
  }));

  app.post('/user/:name', wrapAsync(async (req, res, next) => {
    const { name } = req.params;
    const { password } = req.body;
    if (!name)
      throw new Error('Missing user name.');
    if (!password)
      throw new Error('Missing password.');

    const id = name === 'ben' ? 'ben' : name === 'niu' ? 'niu' : randomWords({ exactly: 2, join: '-' });
    const result = await redisClient.existsAsync(redisKeys.getUser(id)).catch(next);
    if (result === 1)
      throw new Error(`user id '${id}' already exist`);

    const user = { id, name, lastSeen: Date.now() };
    await redisClient.hsetAsync(redisKeys.getUser(id),
      'id', id,
      'name', user.name,
      'password', password,
      'lastSeen', user.lastSeen).catch(next);
    // TODO: setup namespace
    res.json(user);
  }));

  app.post('/namespace', (req, res) => {
    const id = randomWords({ exactly: 2, join: '-' });
    sockets.setupUserNamespace(id);
    res.json(new Response().setData({ id }).toJson());
  });

  app.get('/contacts/:id', async (req, res, next) => {
    const { id } = req.params;
    const contacts = await redisClient.zrevrangeAsync(redisKeys.getContacts(id), 0, -1).catch(err => { console.error(err); });
    res.json(contacts);
  });

  app.use((error, req, res, next) => {
    res.status(400).json({ message: error.message });
  });

  function wrapAsync(fn) {
    return function (req, res, next) {
      fn(req, res, next).catch(next);
    };
  }
};