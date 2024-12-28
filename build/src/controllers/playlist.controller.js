"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeSongFromPlaylist = exports.getSongsOfPlaylist = exports.getAllPlaylists = exports.deletePlaylist = exports.createPlaylist = exports.addSongToPlaylist = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _playlist = _interopRequireDefault(require("../models/playlist.model"));
var _song = _interopRequireDefault(require("../models/song.model"));
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
// [GET] /playlist
var getAllPlaylists = exports.getAllPlaylists = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var userId, playlists, result, _iterator, _step, _playlist$songIds, playlist, playlistSongs, songs;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          userId = req.user.id;
          _context.next = 4;
          return _playlist["default"].find({
            userId: userId,
            deleted: false
          });
        case 4:
          playlists = _context.sent;
          result = [];
          _iterator = _createForOfIteratorHelper(playlists);
          _context.prev = 7;
          _iterator.s();
        case 9:
          if ((_step = _iterator.n()).done) {
            _context.next = 18;
            break;
          }
          playlist = _step.value;
          playlistSongs = playlist === null || playlist === void 0 || (_playlist$songIds = playlist.songIds) === null || _playlist$songIds === void 0 ? void 0 : _playlist$songIds.map(function (song) {
            return song.songId;
          });
          _context.next = 14;
          return _song["default"].find({
            _id: {
              $in: playlistSongs
            }
          }).select("-userId");
        case 14:
          songs = _context.sent;
          result.push({
            playlistId: playlist._id,
            title: playlist.title,
            songs: songs
          });
        case 16:
          _context.next = 9;
          break;
        case 18:
          _context.next = 23;
          break;
        case 20:
          _context.prev = 20;
          _context.t0 = _context["catch"](7);
          _iterator.e(_context.t0);
        case 23:
          _context.prev = 23;
          _iterator.f();
          return _context.finish(23);
        case 26:
          return _context.abrupt("return", res.status(200).json({
            code: 200,
            data: result
          }));
        case 29:
          _context.prev = 29;
          _context.t1 = _context["catch"](0);
          return _context.abrupt("return", res.status(500).json({
            message: "Internal server error"
          }));
        case 32:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 29], [7, 20, 23, 26]]);
  }));
  return function getAllPlaylists(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

// [POST] /playlist
var createPlaylist = exports.createPlaylist = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var userId, title, playlist;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          userId = req.user.id;
          title = req.body.title;
          _context2.next = 5;
          return _playlist["default"].create({
            userId: userId,
            title: title
          });
        case 5:
          playlist = _context2.sent;
          return _context2.abrupt("return", res.status(200).json({
            code: 200,
            data: {
              playlistId: playlist._id,
              title: playlist.title,
              songs: []
            }
          }));
        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](0);
          return _context2.abrupt("return", res.status(500).json({
            message: "Internal server error"
          }));
        case 12:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 9]]);
  }));
  return function createPlaylist(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

// [DELETE] /playlist/:playlistId
var deletePlaylist = exports.deletePlaylist = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var userId, playlistId, playlist;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          userId = req.user.id;
          playlistId = req.params.playlistId;
          _context3.next = 5;
          return _playlist["default"].findOne({
            _id: playlistId,
            userId: userId,
            deleted: false
          });
        case 5:
          playlist = _context3.sent;
          if (playlist) {
            _context3.next = 8;
            break;
          }
          return _context3.abrupt("return", res.status(404).json({
            message: "Playlist not found"
          }));
        case 8:
          playlist.deleted = true;
          _context3.next = 11;
          return playlist.save();
        case 11:
          return _context3.abrupt("return", res.status(200).json({
            code: 200,
            message: "Delete playlist successfully"
          }));
        case 14:
          _context3.prev = 14;
          _context3.t0 = _context3["catch"](0);
          return _context3.abrupt("return", res.status(500).json({
            message: "Internal server error"
          }));
        case 17:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 14]]);
  }));
  return function deletePlaylist(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

// [GET] /playlist/:playlistId
var getSongsOfPlaylist = exports.getSongsOfPlaylist = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var _playlist$songIds2, userId, playlistId, playlist, playlistSongs, songs;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          userId = req.user.id;
          playlistId = req.params.playlistId;
          _context4.next = 5;
          return _playlist["default"].findOne({
            _id: playlistId,
            userId: userId,
            deleted: false
          });
        case 5:
          playlist = _context4.sent;
          if (playlist) {
            _context4.next = 8;
            break;
          }
          return _context4.abrupt("return", res.status(404).json({
            message: "Playlist not found"
          }));
        case 8:
          playlistSongs = playlist === null || playlist === void 0 || (_playlist$songIds2 = playlist.songIds) === null || _playlist$songIds2 === void 0 ? void 0 : _playlist$songIds2.map(function (song) {
            return song.songId;
          });
          _context4.next = 11;
          return _song["default"].find({
            _id: {
              $in: playlistSongs
            }
          });
        case 11:
          songs = _context4.sent;
          return _context4.abrupt("return", res.status(200).json({
            code: 200,
            data: {
              playlistId: playlist._id,
              title: playlist.title,
              songs: songs
            }
          }));
        case 15:
          _context4.prev = 15;
          _context4.t0 = _context4["catch"](0);
          return _context4.abrupt("return", res.status(500).json({
            message: "Internal server error"
          }));
        case 18:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 15]]);
  }));
  return function getSongsOfPlaylist(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

// [POST] /playlist/add-song/:playlistId
var addSongToPlaylist = exports.addSongToPlaylist = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var _playlist$songIds3, userId, playlistId, songId, playlist, isExisted, song;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          userId = req.user.id;
          playlistId = req.params.playlistId;
          songId = req.body.songId;
          _context5.next = 6;
          return _playlist["default"].findOne({
            _id: playlistId,
            userId: userId,
            deleted: false
          });
        case 6:
          playlist = _context5.sent;
          if (playlist) {
            _context5.next = 9;
            break;
          }
          return _context5.abrupt("return", res.status(404).json({
            message: "Playlist not found"
          }));
        case 9:
          isExisted = playlist === null || playlist === void 0 || (_playlist$songIds3 = playlist.songIds) === null || _playlist$songIds3 === void 0 ? void 0 : _playlist$songIds3.some(function (item) {
            return item.songId === songId;
          });
          if (!isExisted) {
            _context5.next = 12;
            break;
          }
          return _context5.abrupt("return", res.status(400).json({
            message: "Song is already in playlist"
          }));
        case 12:
          _context5.next = 14;
          return _song["default"].findById(songId);
        case 14:
          song = _context5.sent;
          if (song) {
            _context5.next = 17;
            break;
          }
          return _context5.abrupt("return", res.status(404).json({
            message: "Song not found"
          }));
        case 17:
          playlist.songIds.push({
            songId: songId
          });
          _context5.next = 20;
          return playlist.save();
        case 20:
          return _context5.abrupt("return", res.status(200).json(playlist));
        case 23:
          _context5.prev = 23;
          _context5.t0 = _context5["catch"](0);
          return _context5.abrupt("return", res.status(500).json({
            message: "Internal server error"
          }));
        case 26:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 23]]);
  }));
  return function addSongToPlaylist(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

// [DELETE] /playlist/remove-song/:playlistId
var removeSongFromPlaylist = exports.removeSongFromPlaylist = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var userId, playlistId, songId, playlist, songIndex;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          userId = req.user.id;
          playlistId = req.params.playlistId;
          songId = req.body.songId;
          _context6.next = 6;
          return _playlist["default"].findOne({
            _id: playlistId,
            userId: userId,
            deleted: false
          });
        case 6:
          playlist = _context6.sent;
          if (playlist) {
            _context6.next = 9;
            break;
          }
          return _context6.abrupt("return", res.status(404).json({
            message: "Playlist not found"
          }));
        case 9:
          songIndex = playlist.songIds.findIndex(function (item) {
            return item.songId === songId;
          });
          if (!(songIndex === -1)) {
            _context6.next = 12;
            break;
          }
          return _context6.abrupt("return", res.status(404).json({
            message: "Song not found in playlist"
          }));
        case 12:
          playlist.songIds.splice(songIndex, 1);
          _context6.next = 15;
          return playlist.save();
        case 15:
          return _context6.abrupt("return", res.status(200).json(playlist));
        case 18:
          _context6.prev = 18;
          _context6.t0 = _context6["catch"](0);
          return _context6.abrupt("return", res.status(500).json({
            message: "Internal server error"
          }));
        case 21:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 18]]);
  }));
  return function removeSongFromPlaylist(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();