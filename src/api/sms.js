const twilio = require('twilio');

const accountSid = 'AC4b720360a25332f96ead4824c9f7058c'; // Your Account SID from www.twilio.com/console
const authToken = 'e8ae7932690b20f80993c630f42aba9d';   // Your Auth Token from www.twilio.com/console

const client = new twilio(accountSid, authToken);

export default (fromName) => {
  return client.messages.create({
    body: `You received a message on WhatsBen from: ${fromName} at ${new Date().toLocaleTimeString()}`,
    to: '+19089383973',  // Text this number
    from: '+18482333413' // From a valid Twilio number
  });
};