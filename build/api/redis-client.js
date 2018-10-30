"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setupRedis = exports.redisClient = void 0;

var _redis = _interopRequireDefault(require("redis"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var redisClient = null;
exports.redisClient = redisClient;

var setupRedis = function setupRedis() {
  if (process.env.REDISCLOUD_URL) {
    console.log('connecting to redis cloud');
    exports.redisClient = redisClient = _redis.default.createClient(process.env.REDISCLOUD_URL);
  } else {
    console.log('connecting to local redis');
    exports.redisClient = redisClient = _redis.default.createClient();
  }

  redisClient.on('connect', function () {
    console.log('redis redisClient emitted connect event');
  });
  redisClient.on('error', function (err) {
    console.error(err, 'redis error');
  });
};

exports.setupRedis = setupRedis;