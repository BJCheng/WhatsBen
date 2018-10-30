"use strict";

var _express = _interopRequireDefault(require("express"));

var _redisClient = require("./redis-client");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express.default)();
var port = process.env.PORT || 4000;
(0, _redisClient.setupRedis)();
app.get('/', function (req, res) {
  res.send('Hello whatsapp clone!');
});
app.get('/redis-test', function (req, res) {
  _redisClient.redisClient.incr('inc-foo', function (err, result) {
    if (err) {
      console.error(err);
      res.status(500).send('redis increment error');
    } else {
      res.send("New increment value is ".concat(result));
    }
  });
});
app.listen(port, function () {
  console.log("Express app listening at port ".concat(port));
});