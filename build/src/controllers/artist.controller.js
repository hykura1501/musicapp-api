"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unFollowArtist = exports.followArtist = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _artist = _interopRequireDefault(require("../models/artist.model"));
var _user = _interopRequireDefault(require("../models/user.model"));
// [POST] /artists/follow/:artistId
var followArtist = exports.followArtist = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _user$favoriteArtists, user, artistId, artist, existed, newUser;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          user = req.user;
          artistId = req.params.artistId;
          if (artistId) {
            _context.next = 5;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            code: 400,
            message: "Missing required fields"
          }));
        case 5:
          _context.next = 7;
          return _artist["default"].findOne({
            _id: artistId
          });
        case 7:
          artist = _context.sent;
          if (artist) {
            _context.next = 10;
            break;
          }
          return _context.abrupt("return", res.status(404).json({
            code: 404,
            message: "Artist not found"
          }));
        case 10:
          existed = user === null || user === void 0 || (_user$favoriteArtists = user.favoriteArtists) === null || _user$favoriteArtists === void 0 ? void 0 : _user$favoriteArtists.some(function (item) {
            return item.artistId === artistId;
          });
          if (!existed) {
            _context.next = 13;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            code: 400,
            message: "Already followed"
          }));
        case 13:
          _context.next = 15;
          return _user["default"].findByIdAndUpdate({
            _id: user._id,
            $push: {
              favoriteArtists: {
                artistId: artistId
              }
            }
          }, {
            "new": true
          });
        case 15:
          newUser = _context.sent;
          _context.next = 18;
          return _artist["default"].updateOne({
            _id: artistId
          }, {
            $inc: {
              follower: 1
            }
          });
        case 18:
          return _context.abrupt("return", res.status(200).json({
            code: 200,
            message: "Followed artist successfully",
            data: newUser.favoriteArtists
          }));
        case 21:
          _context.prev = 21;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", res.status(500).json({
            code: 500,
            message: _context.t0.message
          }));
        case 24:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 21]]);
  }));
  return function followArtist(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

// [POST] /artists/un-follow/:artistId
var unFollowArtist = exports.unFollowArtist = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var _user$favoriteArtists2, user, artistId, artist, existed, newUser;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          user = req.user;
          artistId = req.params.artistId;
          if (artistId) {
            _context2.next = 5;
            break;
          }
          return _context2.abrupt("return", res.status(400).json({
            code: 400,
            message: "Missing required fields"
          }));
        case 5:
          _context2.next = 7;
          return _artist["default"].findById(artistId);
        case 7:
          artist = _context2.sent;
          if (artist) {
            _context2.next = 10;
            break;
          }
          return _context2.abrupt("return", res.status(404).json({
            code: 404,
            message: "Artist not found"
          }));
        case 10:
          existed = user === null || user === void 0 || (_user$favoriteArtists2 = user.favoriteArtists) === null || _user$favoriteArtists2 === void 0 ? void 0 : _user$favoriteArtists2.some(function (item) {
            return item.artistId === artistId;
          });
          if (existed) {
            _context2.next = 13;
            break;
          }
          return _context2.abrupt("return", res.status(400).json({
            code: 400,
            message: "Not followed yet"
          }));
        case 13:
          _context2.next = 15;
          return _user["default"].findByIdAndUpdate({
            _id: user._id,
            $pull: {
              favoriteArtists: {
                artistId: artistId
              }
            }
          }, {
            "new": true
          });
        case 15:
          newUser = _context2.sent;
          _context2.next = 18;
          return _artist["default"].updateOne({
            _id: artistId
          }, {
            $inc: {
              follower: -1
            }
          });
        case 18:
          return _context2.abrupt("return", res.status(200).json({
            code: 200,
            message: "Un-followed artist successfully",
            data: newUser.favoriteArtists
          }));
        case 21:
          _context2.prev = 21;
          _context2.t0 = _context2["catch"](0);
          return _context2.abrupt("return", res.status(500).json({
            code: 500,
            message: _context2.t0.message
          }));
        case 24:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 21]]);
  }));
  return function unFollowArtist(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();