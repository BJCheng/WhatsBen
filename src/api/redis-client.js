import bluebird from 'bluebird';
import redis from 'redis';
bluebird.promisifyAll(redis);

export let redisClient = null;

export const setupRedis = () => {
  if (process.env.REDISCLOUD_URL) {
    console.log('connecting to redis cloud');
    redisClient = redis.createClient(process.env.REDISCLOUD_URL);
  }
  else {
    console.log('connecting to local redis');
    redisClient = redis.createClient();
  }

  redisClient.on('connect', function () {
    console.log('redis redisClient emitted connect event');
  });

  redisClient.on('error', function (err) {
    console.error(err, 'redis error');
  });
};

export const redisKeys = {
  contactsByUser(handle) {
    return `contacts|${handle}|1`;
  },
  getUser(id) {
    return `user:${id}`;
  },
  getMessages(fromId, toId) {
    if (fromId.localeCompare(toId) < 0)
      return `messages:${fromId}|${toId}`;
    else
      return `messages:${toId}|${fromId}`;
  },
  getContacts(id) {
    return `contacts:${id}`;
  }
};
