"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var twilio = require('twilio');

var accountSid = 'AC4b720360a25332f96ead4824c9f7058c'; // Your Account SID from www.twilio.com/console

var authToken = 'e8ae7932690b20f80993c630f42aba9d'; // Your Auth Token from www.twilio.com/console

var client = new twilio(accountSid, authToken);

var _default = function _default(fromName) {
  return client.messages.create({
    body: "You received a message on WhatsBen from: ".concat(fromName, " at ").concat(new Date().toLocaleTimeString()),
    to: '+19089383973',
    // Text this number
    from: '+18482333413' // From a valid Twilio number

  });
};

exports.default = _default;