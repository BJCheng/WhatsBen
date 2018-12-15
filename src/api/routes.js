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

  app.get('verify', (req, res) => {
    const bearerToken = req.header('Authorization');
    const token = bearerToken.substring('Bearer '.length);
    const decoded = jwt.verify(token, handleSecret);
    res.send(decoded.handle);
  });

  app.post('/send-message', (req, res) => {
    const { userNamespace, msg } = req.body;
    sockets.emit('receive-message', '/ben', msg);
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

  app.put('/messages', async (req, res, next) => {
    const { from, to, text, sendTime } = req.body;
    if (!from || !to || !text || !sendTime){
      res.json(new Response().setError('Missing required fields'));
      return;
    }
    const messageJson = JSON.stringify({
      from,
      to,
      text,
      sendTime,
      serverReceiveTime: Date.now()
    });
    const newLength = await redisClient.rpushAsync(redisKeys.getMessages(from, to), messageJson).catch(err => {
      next(err);
    });
    res.json(new Response().setData(messageJson).toJson());
    sockets.emit('receive-message', '/to', messageJson); // especially test if json string can be emitted or not
  });

  app.get('/user/:id', async (req, res) => {
    const { id } = req.params;
    const result = await redisClient.hgetallAsync(redisKeys.getUser(id)).catch(err => {
      console.error(err);
    });
    if (!result) {
      res.json(new Response().setError(`no such user: ${id}`).toJson());
      return;
    }
    res.json(new Response().setData(result).toJson());
  });

  app.post('/user', async (req, res) => {
    const { name } = req.body;
    if (!name) {
      res.json(new Response().setError('Missing user name.').toJson());
      return;
    }

    const id = name === 'ben' ? 'ben' : randomWords({ exactly: 2, join: '-' });
    const result = await redisClient.existsAsync(redisKeys.getUser(id)).catch(err => {
      res.json(new Response().setError(err));
      return;
    });
    if (result === 1) {
      const response = new Response().setError(`user id: ${id} already exist`);
      res.json(response.toJson());
      return;
    }

    const user = {
      id,
      name,
      lastSeen: Date.now()
    };
    await redisClient.hsetAsync(redisKeys.getUser(id), 'id', id, 'name', user.name, 'lastSeen', user.lastSeen).catch(err => {
      res.json(new Response().setError(err).toJson());
      return;
    });
    res.json(new Response().setData(user).toJson());
    return;
  });
};