"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _redisClient = require("./redis-client");

var _routes = _interopRequireDefault(require("./routes"));

var _cors = _interopRequireDefault(require("cors"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _classSetupSocket = require("./class-setup-socket");

/* eslint-disable no-console */
var port = process.env.PORT || 4000;
var app = (0, _express.default)();
app.use((0, _cors.default)());
app.use(_bodyParser.default.json());
(0, _redisClient.setupRedis)();
var httpServer = app.listen(port, function () {
  console.log("Express app listening at port ".concat(port));
});
(0, _classSetupSocket.setupSockets)(httpServer);
(0, _routes.default)(app);