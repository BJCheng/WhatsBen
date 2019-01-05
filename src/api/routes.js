import { redisClient, redisKeys } from './redis-client';
// import { UserValidator } from '../core/user-validator';
import jwt from 'jsonwebtoken';
import { sockets } from './class-setup-socket';
import uuidv4 from 'uuid/v4';
import Response from './response';
import randomWords from 'random-words';

const handleSecret = 'random-secret';
const ONE_MONTH_IN_SECONDS = 60 * 60 * 24 * 30;

export default (app) => {
  app.get('/', (req, res) => {
    res.send('Hello whatsapp clone!');
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

  app.get('/messages/:from/:to', wrapAsync(async (req, res) => {
    const { from, to } = req.params;
    const result = await redisClient.lrangeAsync(redisKeys.getMessages(from, to), 0, -1).catch(e => { throw new Error(e); });
    res.json(result);
  }));

  app.post('/message/:from/:to', wrapAsync(async (req, res) => {
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
    await redisClient.rpushAsync(redisKeys.getMessages(from, to), messageJson).catch(e => { throw new Error(e); });
    await redisClient.zaddAsync(redisKeys.getContacts(from), Date.now(), to).catch(e => { throw new Error(e); });
    await redisClient.zaddAsync(redisKeys.getContacts(to), Date.now(), from).catch(e => { throw new Error(e); });
    const fromUserObj = await redisClient.hgetallAsync(redisKeys.getUser(from)).catch(e => { throw new Error(e); });
    const isFromTemp = await redisClient.sismemberAsync(redisKeys.getTempUsers(), from).catch(e => { throw new Error(e); });
    const isToTemp = await redisClient.sismemberAsync(redisKeys.getTempUsers(), to).catch(e => { throw new Error(e); });
    if (isFromTemp === 1 || isToTemp === 1)
      redisClient.expire(redisKeys.getMessages(from, to), ONE_MONTH_IN_SECONDS);
    if (isFromTemp === 1)
      redisClient.expireAsync(redisKeys.getContacts(from), ONE_MONTH_IN_SECONDS);
    if (isToTemp === 1)
      redisClient.expireAsync(redisKeys.getContacts(to), ONE_MONTH_IN_SECONDS);
    sockets.emit('receive-message', `/${to}`, { from: fromUserObj, message: messageObj }); // double check that if json string can be emitted or not
    res.json(new Response().setData(messageJson).toJson());
  }));

  app.get('/user/:id', wrapAsync(async (req, res) => {
    const { id } = req.params;
    const result = await redisClient.hgetallAsync(redisKeys.getUser(id)).catch(e => { throw new Error(e); });
    if (!result)
      throw new Error(`no such user: ${id}`);
    res.json(result);
  }));

  app.post('/auth', wrapAsync(async (req, res) => {
    const { id, password } = req.body;
    const result = await redisClient.hgetallAsync(redisKeys.getUser(id)).catch(e => { throw new Error(e); });
    if (!result)
      throw new Error(`no such user: ${id}`);
    if (password !== result.password)
      throw new Error('incorrect id password combination');
    res.json({ ...result });
  }));

  app.post('/user/:name', wrapAsync(async (req, res) => {
    const { name } = req.params;
    const { password } = req.body;
    if (!name)
      throw new Error('Missing user name.');
    if (!password)
      throw new Error('Missing password.');

    const id = name === 'ben' ? 'ben' : name === 'niu' ? 'niu' : randomWords({ exactly: 2, join: '-' });
    const result = await redisClient.existsAsync(redisKeys.getUser(id)).catch(e => { throw new Error(e); });
    if (result === 1)
      throw new Error(`user id '${id}' already exist`);

    const user = { id, name, lastSeen: Date.now() };
    await redisClient.hsetAsync(redisKeys.getUser(id),
      'id', id,
      'name', user.name,
      'password', password,
      'lastSeen', user.lastSeen).catch(e => { throw new Error(e); });
    sockets.setupUserNamespace(id);
    res.json(user);
  }));

  app.post('/temp-user/:name', wrapAsync(async (req, res) => {
    const id = randomWords({ exactly: 2, join: '-' });
    const { name } = req.params;
    const result = await redisClient.hsetAsync(redisKeys.getUser(id), 'id', id, 'name', name).catch(e => { throw new Error(e); });
    redisClient.saddAsync(redisKeys.getTempUsers(), id);
    if (result === 0)
      throw new Error(`id '${id}' already exist.`);
    sockets.setupUserNamespace(id);
    res.json({ id, name });
  }));

  app.get('/contacts/:id', wrapAsync(async (req, res) => {
    const { id } = req.params;
    const contacts = await redisClient.zrevrangeAsync(redisKeys.getContacts(id), 0, -1).catch(e => { throw new Error(e); });
    const sortedUser = await Promise.all(contacts.map(async id => {
      return await redisClient.hgetallAsync(redisKeys.getUser(id)).catch(e => { throw new Error(e); });
    }));
    res.json(sortedUser);
  }));

  app.use((error, req, res, next) => {
    res.status(400).json({ message: error.message });
  });

  function wrapAsync(fn) {
    return function (req, res, next) {
      fn(req, res, next).catch(next);
    };
  }

  function defaultErrHandling(e) {
    throw new Error(e);
  }
};