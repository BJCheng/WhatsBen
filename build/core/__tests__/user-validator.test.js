"use strict";

var _userValidator = require("../user-validator");

var _chai = require("chai");

describe('UserValidator Tests', function () {
  it('validates handle', function () {
    var validator = new _userValidator.UserValidator({
      handle: '',
      name: ''
    });
    var errors = validator.validate([]);

    _chai.assert.lengthOf(errors, 2);

    _chai.assert.deepEqual(errors, ['invalid-handle', 'invalid-name']);
  });
});