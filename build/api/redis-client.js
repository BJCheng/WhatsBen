"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.redisKeys = exports.setupRedis = exports.redisClient = void 0;

var _bluebird = _interopRequireDefault(require("bluebird"));

var _redis = _interopRequireDefault(require("redis"));

_bluebird.default.promisifyAll(_redis.default);

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
var redisKeys = {
  contactsByUser: function contactsByUser(handle) {
    return "contacts|".concat(handle, "|1");
  },
  getUser: function getUser(id) {
    return "user:".concat(id);
  },
  getMessages: function getMessages(fromId, toId) {
    if (fromId.localeCompare(toId) < 0) return "messages:".concat(fromId, "|").concat(toId);else return "messages:".concat(toId, "|").concat(fromId);
  },
  getContacts: function getContacts(id) {
    return "contacts:".concat(id);
  },
  getTempUsers: function getTempUsers() {
    return 'temp-users';
  }
};
exports.redisKeys = redisKeys;