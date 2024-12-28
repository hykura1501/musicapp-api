"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateRecentlyPlayed = exports.getRecentlyPlayed = exports.getDownloadedSongs = exports.addDownloadedSongs = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _recentlyPlayed = _interopRequireDefault(require("../models/recently-played.model"));
var _song = _interopRequireDefault(require("../models/song.model"));
var _downloadedSongs = _interopRequireDefault(require("../models/downloaded-songs.model"));
var _sortByKey = require("../helpers/sortByKey");
// [POST] /other/recently-played
var updateRecentlyPlayed = exports.updateRecentlyPlayed = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var userId, songId, song, exists;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          userId = req.user.id;
          songId = req.params.songId;
          _context.next = 5;
          return _song["default"].findById(songId);
        case 5:
          song = _context.sent;
          if (song) {
            _context.next = 8;
            break;
          }
          return _context.abrupt("return", res.status(404).json({
            code: 404,
            message: "Song not found"
          }));
        case 8:
          _context.next = 10;
          return _recentlyPlayed["default"].findOne({
            userId: userId,
            songId: songId
          });
        case 10:
          exists = _context.sent;
          if (exists) {
            _context.next = 15;
            break;
          }
          _context.next = 14;
          return _recentlyPlayed["default"].create({
            userId: userId,
            songId: songId,
            updatedAt: Date.now()
          });
        case 14:
          return _context.abrupt("return", res.status(201).json({
            code: 201,
            message: "Added to recently played"
          }));
        case 15:
          _context.next = 17;
          return _recentlyPlayed["default"].updateOne({
            userId: userId,
            songId: songId
          }, {
            updatedAt: Date.now()
          });
        case 17:
          return _context.abrupt("return", res.status(200).json({
            code: 200,
            message: "Updated recently played"
          }));
        case 20:
          _context.prev = 20;
          _context.t0 = _context["catch"](0);
          console.error("Error updating recently played:", _context.t0);
          res.status(500).json({
            code: 500,
            error: _context.t0.message
          });
        case 24:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 20]]);
  }));
  return function updateRecentlyPlayed(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

// [GET] /other/recently-played
var getRecentlyPlayed = exports.getRecentlyPlayed = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var userId, recentlyPlayed, songIds, songs, sortedSongs;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          userId = req.user.id;
          _context2.next = 4;
          return _recentlyPlayed["default"].find({
            userId: userId
          }).sort({
            updatedAt: -1
          });
        case 4:
          recentlyPlayed = _context2.sent;
          songIds = recentlyPlayed.map(function (item) {
            return item.songId.toString();
          });
          _context2.next = 8;
          return _song["default"].find({
            _id: {
              $in: songIds
            }
          });
        case 8:
          songs = _context2.sent;
          sortedSongs = (0, _sortByKey.sortByKey)(songs, songIds, "_id");
          return _context2.abrupt("return", res.status(200).json({
            code: 200,
            data: sortedSongs
          }));
        case 13:
          _context2.prev = 13;
          _context2.t0 = _context2["catch"](0);
          console.error("Error getting recently played:", _context2.t0);
          res.status(500).json({
            code: 500,
            error: _context2.t0.message
          });
        case 17:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 13]]);
  }));
  return function getRecentlyPlayed(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

// [POST] /other/downloaded-songs
var addDownloadedSongs = exports.addDownloadedSongs = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var userId, _req$body, songId, localURL, song, exists;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          userId = req.user.id;
          _req$body = req.body, songId = _req$body.songId, localURL = _req$body.localURL;
          _context3.next = 5;
          return _song["default"].findById(songId);
        case 5:
          song = _context3.sent;
          if (song) {
            _context3.next = 8;
            break;
          }
          return _context3.abrupt("return", res.status(404).json({
            code: 404,
            message: "Song not found"
          }));
        case 8:
          _context3.next = 10;
          return _downloadedSongs["default"].findOne({
            userId: userId,
            songId: songId,
            deleted: false
          });
        case 10:
          exists = _context3.sent;
          if (!exists) {
            _context3.next = 13;
            break;
          }
          return _context3.abrupt("return", res.status(400).json({
            code: 400,
            message: "Song already downloaded"
          }));
        case 13:
          _context3.next = 15;
          return _downloadedSongs["default"].create({
            userId: userId,
            songId: songId,
            localURL: localURL
          });
        case 15:
          return _context3.abrupt("return", res.status(201).json({
            code: 201,
            message: "Song downloaded"
          }));
        case 18:
          _context3.prev = 18;
          _context3.t0 = _context3["catch"](0);
          res.status(500).json({
            code: 500,
            error: _context3.t0.message
          });
        case 21:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 18]]);
  }));
  return function addDownloadedSongs(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

// [GET] /other/downloaded-songs
var getDownloadedSongs = exports.getDownloadedSongs = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var userId, downloadedSongs, songIds, songs, sortedSongs;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          userId = req.user.id;
          _context4.next = 4;
          return _downloadedSongs["default"].find({
            userId: userId,
            deleted: false
          });
        case 4:
          downloadedSongs = _context4.sent;
          if (downloadedSongs) {
            _context4.next = 7;
            break;
          }
          return _context4.abrupt("return", res.status(404).json({
            code: 404,
            message: "No downloaded songs found"
          }));
        case 7:
          songIds = downloadedSongs.map(function (item) {
            return item.songId.toString();
          });
          _context4.next = 10;
          return _song["default"].find({
            _id: {
              $in: songIds
            }
          });
        case 10:
          songs = _context4.sent;
          sortedSongs = (0, _sortByKey.sortByKey)(songs, songIds, "_id");
          return _context4.abrupt("return", res.status(200).json({
            code: 200,
            data: sortedSongs
          }));
        case 15:
          _context4.prev = 15;
          _context4.t0 = _context4["catch"](0);
          return _context4.abrupt("return", res.status(500).json({
            code: 500,
            error: _context4.t0.message
          }));
        case 18:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 15]]);
  }));
  return function getDownloadedSongs(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();