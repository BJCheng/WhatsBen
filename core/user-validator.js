"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserValidator = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _validator = _interopRequireDefault(require("validator"));

var UserValidator =
/*#__PURE__*/
function () {
  function UserValidator(user) {
    (0, _classCallCheck2.default)(this, UserValidator);
    this._user = user;
  }

  (0, _createClass2.default)(UserValidator, [{
    key: "validate",
    value: function validate(existingUsers) {
      var _this = this;

      var errors = [];

      if (!_validator.default.isLength(this._user.handle, 1, 16)) {
        errors.push('invalid-handle');
      }

      if (!_validator.default.isLength(this._user.name, 1, 100)) {
        errors.push('invalid-name');
      }

      if (existingUsers.find(function (user) {
        return user.handle === _this._user.handle;
      })) errors.push('duplicate handle');
      return errors;
    }
  }]);
  return UserValidator;
}();

exports.UserValidator = UserValidator;