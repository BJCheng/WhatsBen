"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var Response =
/*#__PURE__*/
function () {
  function Response() {
    (0, _classCallCheck2.default)(this, Response);
    this.error = '';
    this.data = {};
  }

  (0, _createClass2.default)(Response, [{
    key: "setError",
    value: function setError(error) {
      this.error = error;
      return this;
    }
  }, {
    key: "setData",
    value: function setData(data) {
      this.data = data;
      return this;
    }
  }, {
    key: "toJson",
    value: function toJson() {
      return JSON.parse(JSON.stringify(this));
    }
  }]);
  return Response;
}();

exports.default = Response;