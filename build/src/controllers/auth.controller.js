"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.register = exports.loginGoogle = exports.loginFacebook = exports.login = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _user = _interopRequireDefault(require("../models/user.model"));
var _bcrypt = require("bcrypt");
var _token = require("../helpers/token");
var _googleAuthLibrary = require("google-auth-library");
require("dotenv/config");
var login = exports.login = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body, email, password, user, isPasswordMatched, token;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, email = _req$body.email, password = _req$body.password;
          _context.next = 4;
          return _user["default"].findOne({
            email: email
          });
        case 4:
          user = _context.sent;
          if (user) {
            _context.next = 7;
            break;
          }
          return _context.abrupt("return", res.status(404).json({
            code: 404,
            message: "User not found"
          }));
        case 7:
          _context.next = 9;
          return (0, _bcrypt.compare)(password, user.password);
        case 9:
          isPasswordMatched = _context.sent;
          if (isPasswordMatched) {
            _context.next = 12;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            code: 400,
            message: "Password is incorrect"
          }));
        case 12:
          user.password = undefined;
          token = (0, _token.generateToken)({
            id: user._id
          });
          return _context.abrupt("return", res.status(200).json({
            code: 200,
            token: token
          }));
        case 17:
          _context.prev = 17;
          _context.t0 = _context["catch"](0);
        case 19:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 17]]);
  }));
  return function login(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var register = exports.register = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var _req$body2, fullName, email, password, isExisted, hashedPassword, user, token;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _req$body2 = req.body, fullName = _req$body2.fullName, email = _req$body2.email, password = _req$body2.password;
          _context2.next = 4;
          return _user["default"].findOne({
            email: email
          });
        case 4:
          isExisted = _context2.sent;
          if (!isExisted) {
            _context2.next = 7;
            break;
          }
          return _context2.abrupt("return", res.status(400).json({
            code: 400,
            message: "Email already existed"
          }));
        case 7:
          _context2.next = 9;
          return (0, _bcrypt.hash)(password, 10);
        case 9:
          hashedPassword = _context2.sent;
          user = new _user["default"]({
            fullName: fullName,
            email: email,
            password: hashedPassword
          });
          _context2.next = 13;
          return user.save();
        case 13:
          user.password = undefined;
          token = (0, _token.generateToken)({
            id: user._id
          });
          return _context2.abrupt("return", res.status(201).json({
            code: 201,
            token: token
          }));
        case 18:
          _context2.prev = 18;
          _context2.t0 = _context2["catch"](0);
        case 20:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 18]]);
  }));
  return function register(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var client = new _googleAuthLibrary.OAuth2Client(process.env.GOOGLE_CLIENT_ID);
var loginGoogle = exports.loginGoogle = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    var idToken, ticket, payload, email, name, picture, user, token;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          idToken = req.body.idToken;
          if (idToken) {
            _context3.next = 3;
            break;
          }
          return _context3.abrupt("return", res.status(400).json({
            error: "Missing idToken"
          }));
        case 3:
          _context3.prev = 3;
          _context3.next = 6;
          return client.verifyIdToken({
            idToken: idToken,
            audience: process.env.GOOGLE_CLIENT_ID
          });
        case 6:
          ticket = _context3.sent;
          payload = ticket.getPayload();
          email = payload.email, name = payload.name, picture = payload.picture;
          _context3.next = 11;
          return _user["default"].findOne({
            email: email
          });
        case 11:
          user = _context3.sent;
          if (user) {
            _context3.next = 16;
            break;
          }
          user = new _user["default"]({
            email: email,
            fullName: name,
            avatar: picture
          });
          _context3.next = 16;
          return user.save();
        case 16:
          token = (0, _token.generateToken)({
            id: user._id
          });
          res.status(200).json({
            code: 200,
            token: token
          });
          _context3.next = 24;
          break;
        case 20:
          _context3.prev = 20;
          _context3.t0 = _context3["catch"](3);
          console.error(_context3.t0);
          res.status(500).json({
            error: "Failed to authenticate"
          });
        case 24:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[3, 20]]);
  }));
  return function loginGoogle(_x5, _x6, _x7) {
    return _ref3.apply(this, arguments);
  };
}();
var loginFacebook = exports.loginFacebook = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var accessToken, fbResponse, fbData, email, name, picture, user, token;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          accessToken = req.body.accessToken;
          console.log("accessToken", accessToken);
          if (accessToken) {
            _context4.next = 4;
            break;
          }
          return _context4.abrupt("return", res.status(400).json({
            error: "Access token is required"
          }));
        case 4:
          _context4.prev = 4;
          _context4.next = 7;
          return fetch("https://graph.facebook.com/v21.0/me?fields=id%2Cname%2Cemail%2Cpicture.height(500).width(500)&access_token=".concat(accessToken));
        case 7:
          fbResponse = _context4.sent;
          if (fbResponse.ok) {
            _context4.next = 10;
            break;
          }
          throw new Error("Facebook API Error: ".concat(fbResponse.statusText));
        case 10:
          _context4.next = 12;
          return fbResponse.json();
        case 12:
          fbData = _context4.sent;
          console.log("Data from Facebook", fbData);
          email = fbData.email;
          name = fbData.name;
          picture = fbData.picture.data.url;
          if (email) {
            _context4.next = 19;
            break;
          }
          return _context4.abrupt("return", res.status(400).json({
            error: "Email is required"
          }));
        case 19:
          _context4.next = 21;
          return _user["default"].findOne({
            email: email
          });
        case 21:
          user = _context4.sent;
          if (user) {
            _context4.next = 26;
            break;
          }
          user = new _user["default"]({
            fullName: name,
            email: email,
            avatar: picture
          });
          _context4.next = 26;
          return user.save();
        case 26:
          token = (0, _token.generateToken)({
            id: user._id
          });
          console.log("Token", token);
          res.status(200).json({
            token: token
          });
          _context4.next = 35;
          break;
        case 31:
          _context4.prev = 31;
          _context4.t0 = _context4["catch"](4);
          console.error(_context4.t0);
          res.status(500).json({
            error: "Failed to authenticate with Facebook"
          });
        case 35:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[4, 31]]);
  }));
  return function loginFacebook(_x8, _x9) {
    return _ref4.apply(this, arguments);
  };
}();