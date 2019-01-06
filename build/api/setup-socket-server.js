"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _socketServer = _interopRequireDefault(require("./socket-server"));

var _default = function _default(httpServer) {
  // next想singletone的getInstance怎麼傳參數
  var socketServer = _socketServer.default.getSocket(httpServer);

  socketServer.setupUserNamespace('/ben');
}; // todo: connect all the user in redis
// setTimeout(() => {
//   const socket = new Socket(httpServer);
//   socket.setupUserNamespace('/ben');
// }, 3000);


exports.default = _default;