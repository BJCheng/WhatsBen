"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _http = _interopRequireDefault(require("http"));

var port = process.env.PORT || 4000;

var server = _http.default.createServer(function (req, res) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello React Class\n');
});

server.listen(port, function () {
  console.log("Server running at port ".concat(port, "."));
});