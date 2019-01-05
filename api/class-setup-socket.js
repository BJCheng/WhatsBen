"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setupSockets = setupSockets;
exports.sockets = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _socket = _interopRequireDefault(require("socket.io"));

var _util = _interopRequireDefault(require("util"));

var Sockets =
/*#__PURE__*/
function () {
  function Sockets(httpServer) {
    (0, _classCallCheck2.default)(this, Sockets);
    this._io = (0, _socket.default)(httpServer);
  }

  (0, _createClass2.default)(Sockets, [{
    key: "setupUserNamespace",
    value: function setupUserNamespace(namespace) {
      var userSocket = this._io.of(namespace);

      console.log("server connected on ".concat(namespace));
      userSocket.on('connection', function (socket) {
        console.log("client connected on ".concat(socket.nsp.name)); // server socket can also be listening events here
      });
    }
  }, {
    key: "emit",
    value: function emit(event, namespace, data) {
      console.log("server emitting ".concat(event, " to ").concat(namespace, " with: "), data);

      var userSocket = this._io.of(namespace);

      userSocket.emit(event, data);
    }
  }]);
  return Sockets;
}();

var sockets;
exports.sockets = sockets;

function setupSockets(httpServer) {
  exports.sockets = sockets = new Sockets(httpServer);
  sockets.setupUserNamespace('/ben');
  sockets.setupUserNamespace('/niu');
}