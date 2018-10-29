"use strict";

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express.default)();
var port = process.env.PORT || 4000;
app.get('/', function (req, res) {
  res.send('Hello whatsapp clone!');
});
app.listen(port, function () {
  console.log("Express app listening at port ".concat(port));
});