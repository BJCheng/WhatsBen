"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _socket = _interopRequireDefault(require("socket.io"));

var SocketServer =
/*#__PURE__*/
function () {
  function SocketServer(httpServer) {
    (0, _classCallCheck2.default)(this, SocketServer);

    if (!this._io) {
      this._io = (0, _socket.default)(httpServer);
    }
  }

  (0, _createClass2.default)(SocketServer, [{
    key: "setupUserNamespace",
    value: function setupUserNamespace(namespace) {
      var _this = this;

      var userSocket = this._io.of(namespace);

      userSocket.on('connection', function (socket) {
        socket.on('send-message', function (msg) {
          _this.emitEventTo(namespace, 'receive-message', msg);
        });
      });
    }
  }, {
    key: "emitEventTo",
    value: function emitEventTo(namespace, event, data) {}
  }]);
  return SocketServer;
}(); // const socket;
// export default get