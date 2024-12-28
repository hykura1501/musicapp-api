"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateMe = exports.resetPassword = exports.otp = exports.getMe = exports.forgotPassword = exports.detailUser = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _user = _interopRequireDefault(require("../models/user.model"));
var _song = _interopRequireDefault(require("../models/song.model"));
var _artist = _interopRequireDefault(require("../models/artist.model"));
var _sendMail = _interopRequireDefault(require("../helpers/sendMail"));
var _forgotPass = _interopRequireDefault(require("../models/forgot-pass.model"));
var _uuid = require("uuid");
var _bcrypt = require("bcrypt");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
// [GET] /user/me
var getMe = exports.getMe = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var favoriteSongIds, favoriteArtistIds, favoriteSongs, _iterator, _step, id, song, favoriteArtists, _iterator2, _step2, _id, artist;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          req.user.password = undefined;
          favoriteSongIds = req.user.favoriteSongs.map(function (song) {
            return song.songId;
          });
          favoriteArtistIds = req.user.favoriteArtists.map(function (artist) {
            return artist.artistId;
          });
          favoriteSongs = [];
          _iterator = _createForOfIteratorHelper(favoriteSongIds);
          _context.prev = 6;
          _iterator.s();
        case 8:
          if ((_step = _iterator.n()).done) {
            _context.next = 16;
            break;
          }
          id = _step.value;
          _context.next = 12;
          return _song["default"].findById(id).select("-userId");
        case 12:
          song = _context.sent;
          if (song) {
            favoriteSongs.push(song);
          }
        case 14:
          _context.next = 8;
          break;
        case 16:
          _context.next = 21;
          break;
        case 18:
          _context.prev = 18;
          _context.t0 = _context["catch"](6);
          _iterator.e(_context.t0);
        case 21:
          _context.prev = 21;
          _iterator.f();
          return _context.finish(21);
        case 24:
          favoriteArtists = [];
          _iterator2 = _createForOfIteratorHelper(favoriteArtistIds);
          _context.prev = 26;
          _iterator2.s();
        case 28:
          if ((_step2 = _iterator2.n()).done) {
            _context.next = 36;
            break;
          }
          _id = _step2.value;
          _context.next = 32;
          return _artist["default"].findById(_id);
        case 32:
          artist = _context.sent;
          if (artist) {
            favoriteArtists.push(artist);
          }
        case 34:
          _context.next = 28;
          break;
        case 36:
          _context.next = 41;
          break;
        case 38:
          _context.prev = 38;
          _context.t1 = _context["catch"](26);
          _iterator2.e(_context.t1);
        case 41:
          _context.prev = 41;
          _iterator2.f();
          return _context.finish(41);
        case 44:
          return _context.abrupt("return", res.status(200).json({
            code: 200,
            data: _objectSpread(_objectSpread({}, req.user._doc), {}, {
              favoriteSongs: favoriteSongs,
              favoriteArtists: favoriteArtists
            })
          }));
        case 47:
          _context.prev = 47;
          _context.t2 = _context["catch"](0);
          return _context.abrupt("return", res.status(500).json({
            message: "Internal server error"
          }));
        case 50:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 47], [6, 18, 21, 24], [26, 38, 41, 44]]);
  }));
  return function getMe(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

// [GET] /user/profile/:userId
var detailUser = exports.detailUser = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var userId, user;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          userId = req.params.userId;
          _context2.next = 4;
          return _user["default"].findById(userId).select("-password -songUploaded -favoriteSong");
        case 4:
          user = _context2.sent;
          if (user) {
            _context2.next = 7;
            break;
          }
          return _context2.abrupt("return", res.status(404).json({
            message: "User not found"
          }));
        case 7:
          return _context2.abrupt("return", res.status(200).json({
            code: 200,
            data: user
          }));
        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](0);
          return _context2.abrupt("return", res.status(500).json({
            message: "Internal server error"
          }));
        case 13:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 10]]);
  }));
  return function detailUser(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

// [PATCH] /user/update
var updateMe = exports.updateMe = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var body, userId, emailExist, user;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          body = req.body;
          userId = req.user.id;
          console.log("body:::::::", body);
          console.log("req.user:::::::", req.user);
          if (!(body.email && body.email !== req.user.email)) {
            _context3.next = 11;
            break;
          }
          _context3.next = 8;
          return _user["default"].findOne({
            email: body.email
          });
        case 8:
          emailExist = _context3.sent;
          if (!emailExist) {
            _context3.next = 11;
            break;
          }
          return _context3.abrupt("return", res.status(400).json({
            message: "Email already exists"
          }));
        case 11:
          if (body.password) {
            delete body.password; // Prevent user from updating password
          }
          _context3.next = 14;
          return _user["default"].findByIdAndUpdate({
            _id: userId
          }, body, {
            "new": true
          }).select("-password");
        case 14:
          user = _context3.sent;
          if (user) {
            _context3.next = 17;
            break;
          }
          return _context3.abrupt("return", res.status(404).json({
            message: "User not found"
          }));
        case 17:
          return _context3.abrupt("return", res.status(200).json({
            code: 200,
            data: user
          }));
        case 20:
          _context3.prev = 20;
          _context3.t0 = _context3["catch"](0);
          console.log("error:::::::", _context3.t0);
          return _context3.abrupt("return", res.status(500).json({
            message: "Internal server error"
          }));
        case 24:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 20]]);
  }));
  return function updateMe(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

// [POST] /user/password/forgot
var forgotPassword = exports.forgotPassword = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var _email, user, _otp, forgotPass, subject, html;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _email = req.body.email;
          _context4.next = 4;
          return _user["default"].findOne({
            email: _email
          });
        case 4:
          user = _context4.sent;
          if (user) {
            _context4.next = 7;
            break;
          }
          return _context4.abrupt("return", res.status(404).json({
            message: "User not found"
          }));
        case 7:
          _otp = Math.floor(100000 + Math.random() * 900000);
          forgotPass = new _forgotPass["default"]({
            email: _email,
            otp: _otp
          });
          _context4.next = 11;
          return forgotPass.save();
        case 11:
          subject = "OTP Code for Password Recovery";
          html = "Your OTP code to recover your password is: <b>".concat(_otp, "</b>. Please do not share it with anyone. Note that this code is valid for only 5 minutes.");
          (0, _sendMail["default"])(_email, subject, html);
          return _context4.abrupt("return", res.status(200).json({
            code: 200,
            message: "Email sent"
          }));
        case 17:
          _context4.prev = 17;
          _context4.t0 = _context4["catch"](0);
          return _context4.abrupt("return", res.status(500).json({
            message: "Internal server error"
          }));
        case 20:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 17]]);
  }));
  return function forgotPassword(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

// [POST] /user/password/otp
var otp = exports.otp = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var _req$body, _email2, _otp2, forgotPass, user, resetToken;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _req$body = req.body, _email2 = _req$body.email, _otp2 = _req$body.otp;
          _context5.next = 4;
          return _forgotPass["default"].findOne({
            email: _email2,
            otp: _otp2
          });
        case 4:
          forgotPass = _context5.sent;
          if (forgotPass) {
            _context5.next = 7;
            break;
          }
          return _context5.abrupt("return", res.status(400).json({
            message: "OTP is incorrect"
          }));
        case 7:
          _context5.next = 9;
          return _user["default"].findOne({
            email: _email2
          });
        case 9:
          user = _context5.sent;
          if (user) {
            _context5.next = 12;
            break;
          }
          return _context5.abrupt("return", res.status(404).json({
            message: "User not found"
          }));
        case 12:
          resetToken = (0, _uuid.v4)();
          forgotPass.resetToken = resetToken;
          _context5.next = 16;
          return forgotPass.save();
        case 16:
          return _context5.abrupt("return", res.status(200).json({
            code: 200,
            resetToken: resetToken
          }));
        case 19:
          _context5.prev = 19;
          _context5.t0 = _context5["catch"](0);
          return _context5.abrupt("return", res.status(500).json({
            message: "Internal server error"
          }));
        case 22:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 19]]);
  }));
  return function otp(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

// [POST] /user/password/reset
var resetPassword = exports.resetPassword = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var _req$body2, resetToken, newPassword, forgotPass, user, hashedPassword;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _req$body2 = req.body, resetToken = _req$body2.resetToken, newPassword = _req$body2.newPassword;
          _context6.next = 4;
          return _forgotPass["default"].findOne({
            resetToken: resetToken
          });
        case 4:
          forgotPass = _context6.sent;
          if (forgotPass) {
            _context6.next = 7;
            break;
          }
          return _context6.abrupt("return", res.status(400).json({
            message: "Invalid reset token"
          }));
        case 7:
          _context6.next = 9;
          return _user["default"].findOne({
            email: email
          });
        case 9:
          user = _context6.sent;
          if (user) {
            _context6.next = 12;
            break;
          }
          return _context6.abrupt("return", res.status(404).json({
            message: "User not found"
          }));
        case 12:
          _context6.next = 14;
          return (0, _bcrypt.hash)(newPassword, 10);
        case 14:
          hashedPassword = _context6.sent;
          user.password = hashedPassword;
          _context6.next = 18;
          return user.save();
        case 18:
          return _context6.abrupt("return", res.status(200).json({
            code: 200,
            message: "Password reset successfully"
          }));
        case 21:
          _context6.prev = 21;
          _context6.t0 = _context6["catch"](0);
          res.status(500).json({
            message: "Internal server error"
          });
        case 24:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 21]]);
  }));
  return function resetPassword(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();