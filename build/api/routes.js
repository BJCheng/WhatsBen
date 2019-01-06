"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _redisClient = require("./redis-client");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _classSetupSocket = require("./class-setup-socket");

var _v = _interopRequireDefault(require("uuid/v4"));

var _response = _interopRequireDefault(require("./response"));

var _randomWords = _interopRequireDefault(require("random-words"));

// import { UserValidator } from '../core/user-validator';
var handleSecret = 'random-secret';
var ONE_MONTH_IN_SECONDS = 60 * 60 * 24 * 30;

var _default = function _default(app) {
  app.get('/', function (req, res) {
    res.send('Hello whatsapp clone!');
  });
  app.get('/setup-server-socket/:namespace/', function (req, res) {
    var namespace = req.params.namespace;

    _classSetupSocket.sockets.setupUserNamespace('/' + namespace);

    res.json(new _response.default().setData('success').toJson());
  }); // app.post('/user', (req, res, next) => {
  //   const { handle, name } = req.body;
  //   const user = {
  //     handle,
  //     name
  //   };
  //   const validator = new UserValidator(user);
  //   const validationErrors = validator.validate([{ handle: '1' }]);
  //   if (validationErrors.length > 0) {
  //     console.error('validation errors', validationErrors);
  //     res.status(500).send(validationErrors);
  //   } else {
  //     redisClient.lpush('users', JSON.stringify(user), (err, result) => {
  //       if (err) {
  //         next(err);
  //       }
  //       else {
  //         const token = jwt.sign({ handle }, handleSecret);
  //         console.info(jwt);
  //         res.json({
  //           token: `Bearer ${token}`
  //         });
  //       }
  //     });
  //   }
  // });

  app.get('/verify', function (req, res) {
    var bearerToken = req.header('Authorization');
    var token = bearerToken.substring('Bearer '.length);

    var decoded = _jsonwebtoken.default.verify(token, handleSecret);

    res.send(decoded.handle);
  });
  app.get('/messages/:from/:to', wrapAsync(
  /*#__PURE__*/
  function () {
    var _ref = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee(req, res) {
      var _req$params, from, to, result;

      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _req$params = req.params, from = _req$params.from, to = _req$params.to;
              _context.next = 3;
              return _redisClient.redisClient.lrangeAsync(_redisClient.redisKeys.getMessages(from, to), 0, -1).catch(function (e) {
                throw new Error(e);
              });

            case 3:
              result = _context.sent;
              res.json(result);

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }()));
  app.post('/message/:from/:to', wrapAsync(
  /*#__PURE__*/
  function () {
    var _ref2 = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee2(req, res) {
      var _req$params2, from, to, _req$body, text, sendTime, messageObj, messageJson, fromUserObj, isFromTemp, isToTemp;

      return _regenerator.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _req$params2 = req.params, from = _req$params2.from, to = _req$params2.to;
              _req$body = req.body, text = _req$body.text, sendTime = _req$body.sendTime;

              if (!(!from || !to || !text || !sendTime)) {
                _context2.next = 5;
                break;
              }

              res.json(new _response.default().setError('Missing required fields'));
              return _context2.abrupt("return");

            case 5:
              messageObj = {
                from: from,
                to: to,
                text: text,
                sendTime: sendTime,
                serverReceiveTime: Date.now()
              };
              messageJson = JSON.stringify(messageObj);
              _context2.next = 9;
              return _redisClient.redisClient.rpushAsync(_redisClient.redisKeys.getMessages(from, to), messageJson).catch(function (e) {
                throw new Error(e);
              });

            case 9:
              _context2.next = 11;
              return _redisClient.redisClient.zaddAsync(_redisClient.redisKeys.getContacts(from), Date.now(), to).catch(function (e) {
                throw new Error(e);
              });

            case 11:
              _context2.next = 13;
              return _redisClient.redisClient.zaddAsync(_redisClient.redisKeys.getContacts(to), Date.now(), from).catch(function (e) {
                throw new Error(e);
              });

            case 13:
              _context2.next = 15;
              return _redisClient.redisClient.hgetallAsync(_redisClient.redisKeys.getUser(from)).catch(function (e) {
                throw new Error(e);
              });

            case 15:
              fromUserObj = _context2.sent;
              _context2.next = 18;
              return _redisClient.redisClient.sismemberAsync(_redisClient.redisKeys.getTempUsers(), from).catch(function (e) {
                throw new Error(e);
              });

            case 18:
              isFromTemp = _context2.sent;
              _context2.next = 21;
              return _redisClient.redisClient.sismemberAsync(_redisClient.redisKeys.getTempUsers(), to).catch(function (e) {
                throw new Error(e);
              });

            case 21:
              isToTemp = _context2.sent;
              if (isFromTemp === 1 || isToTemp === 1) _redisClient.redisClient.expire(_redisClient.redisKeys.getMessages(from, to), ONE_MONTH_IN_SECONDS);
              if (isFromTemp === 1) _redisClient.redisClient.expireAsync(_redisClient.redisKeys.getContacts(from), ONE_MONTH_IN_SECONDS);
              if (isToTemp === 1) _redisClient.redisClient.expireAsync(_redisClient.redisKeys.getContacts(to), ONE_MONTH_IN_SECONDS);

              _classSetupSocket.sockets.emit('receive-message', "/".concat(to), {
                from: fromUserObj,
                message: messageObj
              }); // double check that if json string can be emitted or not


              res.json(new _response.default().setData(messageJson).toJson());

            case 27:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    return function (_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }()));
  app.get('/user/:id', wrapAsync(
  /*#__PURE__*/
  function () {
    var _ref3 = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee3(req, res) {
      var id, result;
      return _regenerator.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              id = req.params.id;
              _context3.next = 3;
              return _redisClient.redisClient.hgetallAsync(_redisClient.redisKeys.getUser(id)).catch(function (e) {
                throw new Error(e);
              });

            case 3:
              result = _context3.sent;

              if (result) {
                _context3.next = 6;
                break;
              }

              throw new Error("no such user: ".concat(id));

            case 6:
              res.json(result);

            case 7:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    return function (_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }()));
  app.post('/auth', wrapAsync(
  /*#__PURE__*/
  function () {
    var _ref4 = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee4(req, res) {
      var _req$body2, id, password, result;

      return _regenerator.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _req$body2 = req.body, id = _req$body2.id, password = _req$body2.password;
              _context4.next = 3;
              return _redisClient.redisClient.hgetallAsync(_redisClient.redisKeys.getUser(id)).catch(function (e) {
                throw new Error(e);
              });

            case 3:
              result = _context4.sent;

              if (result) {
                _context4.next = 6;
                break;
              }

              throw new Error("no such user: ".concat(id));

            case 6:
              if (!(password !== result.password)) {
                _context4.next = 8;
                break;
              }

              throw new Error('incorrect id password combination');

            case 8:
              res.json((0, _objectSpread2.default)({}, result));

            case 9:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    return function (_x7, _x8) {
      return _ref4.apply(this, arguments);
    };
  }()));
  app.post('/user/:name', wrapAsync(
  /*#__PURE__*/
  function () {
    var _ref5 = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee5(req, res) {
      var name, password, id, result, user;
      return _regenerator.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              name = req.params.name;
              password = req.body.password;

              if (name) {
                _context5.next = 4;
                break;
              }

              throw new Error('Missing user name.');

            case 4:
              if (password) {
                _context5.next = 6;
                break;
              }

              throw new Error('Missing password.');

            case 6:
              id = name === 'ben' ? 'ben' : name === 'niu' ? 'niu' : (0, _randomWords.default)({
                exactly: 2,
                join: '-'
              });
              _context5.next = 9;
              return _redisClient.redisClient.existsAsync(_redisClient.redisKeys.getUser(id)).catch(function (e) {
                throw new Error(e);
              });

            case 9:
              result = _context5.sent;

              if (!(result === 1)) {
                _context5.next = 12;
                break;
              }

              throw new Error("user id '".concat(id, "' already exist"));

            case 12:
              user = {
                id: id,
                name: name,
                lastSeen: Date.now()
              };
              _context5.next = 15;
              return _redisClient.redisClient.hsetAsync(_redisClient.redisKeys.getUser(id), 'id', id, 'name', user.name, 'password', password, 'lastSeen', user.lastSeen).catch(function (e) {
                throw new Error(e);
              });

            case 15:
              _classSetupSocket.sockets.setupUserNamespace(id);

              res.json(user);

            case 17:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    return function (_x9, _x10) {
      return _ref5.apply(this, arguments);
    };
  }()));
  app.post('/temp-user/:name', wrapAsync(
  /*#__PURE__*/
  function () {
    var _ref6 = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee6(req, res) {
      var id, name, result;
      return _regenerator.default.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              id = (0, _randomWords.default)({
                exactly: 2,
                join: '-'
              });
              name = req.params.name;
              _context6.next = 4;
              return _redisClient.redisClient.hsetAsync(_redisClient.redisKeys.getUser(id), 'id', id, 'name', name).catch(function (e) {
                throw new Error(e);
              });

            case 4:
              result = _context6.sent;

              _redisClient.redisClient.saddAsync(_redisClient.redisKeys.getTempUsers(), id);

              if (!(result === 0)) {
                _context6.next = 8;
                break;
              }

              throw new Error("id '".concat(id, "' already exist."));

            case 8:
              _classSetupSocket.sockets.setupUserNamespace(id);

              res.json({
                id: id,
                name: name
              });

            case 10:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    return function (_x11, _x12) {
      return _ref6.apply(this, arguments);
    };
  }()));
  app.get('/contacts/:id', wrapAsync(
  /*#__PURE__*/
  function () {
    var _ref7 = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee8(req, res) {
      var id, contacts, sortedUser;
      return _regenerator.default.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              id = req.params.id;
              _context8.next = 3;
              return _redisClient.redisClient.zrevrangeAsync(_redisClient.redisKeys.getContacts(id), 0, -1).catch(function (e) {
                throw new Error(e);
              });

            case 3:
              contacts = _context8.sent;
              _context8.next = 6;
              return Promise.all(contacts.map(
              /*#__PURE__*/
              function () {
                var _ref8 = (0, _asyncToGenerator2.default)(
                /*#__PURE__*/
                _regenerator.default.mark(function _callee7(id) {
                  return _regenerator.default.wrap(function _callee7$(_context7) {
                    while (1) {
                      switch (_context7.prev = _context7.next) {
                        case 0:
                          _context7.next = 2;
                          return _redisClient.redisClient.hgetallAsync(_redisClient.redisKeys.getUser(id)).catch(function (e) {
                            throw new Error(e);
                          });

                        case 2:
                          return _context7.abrupt("return", _context7.sent);

                        case 3:
                        case "end":
                          return _context7.stop();
                      }
                    }
                  }, _callee7, this);
                }));

                return function (_x15) {
                  return _ref8.apply(this, arguments);
                };
              }()));

            case 6:
              sortedUser = _context8.sent;
              res.json(sortedUser);

            case 8:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, this);
    }));

    return function (_x13, _x14) {
      return _ref7.apply(this, arguments);
    };
  }()));
  app.use(function (error, req, res, next) {
    res.status(400).json({
      message: error.message
    });
  });

  function wrapAsync(fn) {
    return function (req, res, next) {
      fn(req, res, next).catch(next);
    };
  }

  function defaultErrHandling(e) {
    throw new Error(e);
  }
};

exports.default = _default;