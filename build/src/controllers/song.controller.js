"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeFavoriteSong = exports.increaseView = exports.increaseLike = exports.getTopLikeSongs = exports.getSongDetail = exports.getPopularSongs = exports.getNewReleaseSongs = exports.getFavoriteSongs = exports.getAllSongs = exports.createSong = exports.addFavoriteSong = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _song = _interopRequireDefault(require("../models/song.model"));
var _user = _interopRequireDefault(require("../models/user.model"));
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
// [POST] /song
var createSong = exports.createSong = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var userId, _req$body, url, title, duration, user;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          userId = req.user.id;
          _req$body = req.body, url = _req$body.url, title = _req$body.title, duration = _req$body.duration;
          _context.next = 5;
          return _user["default"].findOneAndUpdate({
            _id: userId
          }, {
            $push: {
              uploadedSongs: {
                path: url,
                title: title,
                duration: parseInt(duration)
              }
            }
          }, {
            "new": true
          });
        case 5:
          user = _context.sent;
          return _context.abrupt("return", res.status(201).json({
            code: 201,
            data: user.uploadedSongs
          }));
        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", res.status(500).json({
            code: 500,
            message: _context.t0.message
          }));
        case 12:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 9]]);
  }));
  return function createSong(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

// [GET] /song/detail/:songId
var getSongDetail = exports.getSongDetail = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var songId, song;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          songId = req.params.songId;
          _context2.next = 4;
          return _song["default"].findOne({
            _id: songId
          }).select("-userId");
        case 4:
          song = _context2.sent;
          if (song) {
            _context2.next = 7;
            break;
          }
          return _context2.abrupt("return", res.status(404).json({
            code: 404,
            message: "Song not found"
          }));
        case 7:
          return _context2.abrupt("return", res.status(200).json({
            code: 200,
            data: song
          }));
        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](0);
          res.status(500).json({
            code: 500,
            message: _context2.t0.message
          });
        case 13:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 10]]);
  }));
  return function getSongDetail(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

// [POST] /song/increase-view/:songId
var increaseView = exports.increaseView = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var songId, song;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          songId = req.params.songId;
          _context3.next = 4;
          return _song["default"].findOneAndUpdate({
            _id: songId
          }, {
            $inc: {
              view: 1
            }
          }, {
            "new": true
          }).select("-userId");
        case 4:
          song = _context3.sent;
          return _context3.abrupt("return", res.status(200).json({
            code: 200,
            song: song,
            message: "Increase view successfully"
          }));
        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](0);
          return _context3.abrupt("return", res.status(500).json({
            code: 500,
            message: _context3.t0.message
          }));
        case 11:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 8]]);
  }));
  return function increaseView(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

// [POST] /song/increase-like
var increaseLike = exports.increaseLike = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var songId, song;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          songId = req.params.songId;
          _context4.next = 4;
          return _song["default"].findOneAndUpdate({
            _id: songId
          }, {
            $inc: {
              like: 1
            }
          }, {
            "new": true
          }).select("-userId");
        case 4:
          song = _context4.sent;
          return _context4.abrupt("return", res.status(200).json({
            code: 200,
            song: song,
            message: "Increase like successfully"
          }));
        case 8:
          _context4.prev = 8;
          _context4.t0 = _context4["catch"](0);
          return _context4.abrupt("return", res.status(500).json({
            code: 500,
            message: _context4.t0.message
          }));
        case 11:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 8]]);
  }));
  return function increaseLike(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

// [GET] /song
var getAllSongs = exports.getAllSongs = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var _req$query, keyword, query, count, songs;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          keyword = (_req$query = req.query) === null || _req$query === void 0 || (_req$query = _req$query.keyword) === null || _req$query === void 0 || (_req$query = _req$query.trim()) === null || _req$query === void 0 ? void 0 : _req$query.toLowerCase();
          query = {
            page: parseInt(req.query.page) || 1,
            perPage: parseInt(req.query.perPage) || 10
          };
          _context5.next = 5;
          return _song["default"].countDocuments({
            title: new RegExp(keyword, "i")
          });
        case 5:
          count = _context5.sent;
          _context5.next = 8;
          return _song["default"].find({
            title: new RegExp(keyword, "i")
          }).select("-userId").limit(query.perPage).skip((query.page - 1) * query.perPage);
        case 8:
          songs = _context5.sent;
          return _context5.abrupt("return", res.status(200).json(_objectSpread(_objectSpread({
            code: 200,
            data: songs
          }, query), {}, {
            total: count,
            totalPage: Math.ceil(count / query.perPage)
          })));
        case 12:
          _context5.prev = 12;
          _context5.t0 = _context5["catch"](0);
          return _context5.abrupt("return", res.status(500).json({
            code: 500,
            message: _context5.t0.message
          }));
        case 15:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 12]]);
  }));
  return function getAllSongs(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

// [GET] /song/top-likes
var getTopLikeSongs = exports.getTopLikeSongs = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var query, count, songs;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          query = {
            page: parseInt(req.query.page) || 1,
            perPage: parseInt(req.query.perPage) || 10
          };
          _context6.next = 4;
          return _song["default"].countDocuments({});
        case 4:
          count = _context6.sent;
          _context6.next = 7;
          return _song["default"].find({}).select("-userId").sort({
            like: -1
          }).limit(query.perPage).skip((query.page - 1) * query.perPage);
        case 7:
          songs = _context6.sent;
          return _context6.abrupt("return", res.status(200).json(_objectSpread(_objectSpread({
            code: 200,
            data: songs
          }, query), {}, {
            total: count,
            totalPage: Math.ceil(count / query.perPage)
          })));
        case 11:
          _context6.prev = 11;
          _context6.t0 = _context6["catch"](0);
          console.log(_context6.t0);
          return _context6.abrupt("return", res.status(500).json({
            code: 500,
            message: _context6.t0.message
          }));
        case 15:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 11]]);
  }));
  return function getTopLikeSongs(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

// [GET] /song/popular
var getPopularSongs = exports.getPopularSongs = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
    var query, count, songs;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          query = {
            page: parseInt(req.query.page) || 1,
            perPage: parseInt(req.query.perPage) || 10
          };
          _context7.next = 4;
          return _song["default"].countDocuments({});
        case 4:
          count = _context7.sent;
          _context7.next = 7;
          return _song["default"].find({}).select("-userId").sort({
            view: -1
          }).limit(query.perPage).skip((query.page - 1) * query.perPage);
        case 7:
          songs = _context7.sent;
          return _context7.abrupt("return", res.status(200).json(_objectSpread(_objectSpread({
            code: 200,
            data: songs
          }, query), {}, {
            total: count,
            totalPage: Math.ceil(count / query.perPage)
          })));
        case 11:
          _context7.prev = 11;
          _context7.t0 = _context7["catch"](0);
          return _context7.abrupt("return", res.status(500).json({
            code: 500,
            message: _context7.t0.message
          }));
        case 14:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 11]]);
  }));
  return function getPopularSongs(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

// [GET] /song/new-release
var getNewReleaseSongs = exports.getNewReleaseSongs = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res) {
    var query, count, songs;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          query = {
            page: parseInt(req.query.page) || 1,
            perPage: parseInt(req.query.perPage) || 10
          };
          _context8.next = 4;
          return _song["default"].countDocuments({});
        case 4:
          count = _context8.sent;
          _context8.next = 7;
          return _song["default"].find({}).select("-userId").sort({
            createdAt: -1
          }).limit(query.perPage).skip((query.page - 1) * query.perPage);
        case 7:
          songs = _context8.sent;
          return _context8.abrupt("return", res.status(200).json(_objectSpread(_objectSpread({
            code: 200,
            data: songs
          }, query), {}, {
            total: count,
            totalPage: Math.ceil(count / query.perPage)
          })));
        case 11:
          _context8.prev = 11;
          _context8.t0 = _context8["catch"](0);
          return _context8.abrupt("return", res.status(500).json({
            code: 500,
            message: _context8.t0.message
          }));
        case 14:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[0, 11]]);
  }));
  return function getNewReleaseSongs(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();

// [GET] /song/favorite
var getFavoriteSongs = exports.getFavoriteSongs = /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee9(req, res) {
    var query, favoriteSongIds, count, favoriteSongs;
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          query = {
            page: parseInt(req.query.page) || 1,
            perPage: parseInt(req.query.perPage) || 10
          };
          favoriteSongIds = req.user.favoriteSongs;
          _context9.next = 5;
          return _song["default"].countDocuments({
            _id: {
              $in: favoriteSongIds.map(function (item) {
                return item.songId;
              })
            }
          });
        case 5:
          count = _context9.sent;
          _context9.next = 8;
          return _song["default"].find({
            _id: {
              $in: favoriteSongIds.map(function (item) {
                return item.songId;
              })
            }
          }).select("-userId").limit(query.perPage).skip((query.page - 1) * query.perPage);
        case 8:
          favoriteSongs = _context9.sent;
          return _context9.abrupt("return", res.status(200).json(_objectSpread(_objectSpread({
            code: 200,
            favoriteSongs: favoriteSongs
          }, query), {}, {
            total: count,
            totalPage: Math.ceil(count / query.perPage)
          })));
        case 12:
          _context9.prev = 12;
          _context9.t0 = _context9["catch"](0);
          return _context9.abrupt("return", res.status(500).json({
            code: 500,
            message: _context9.t0.message
          }));
        case 15:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[0, 12]]);
  }));
  return function getFavoriteSongs(_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();

// [POST] /song/favorite/add/:songId
var addFavoriteSong = exports.addFavoriteSong = /*#__PURE__*/function () {
  var _ref10 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee10(req, res) {
    var _user$favoriteSongs, user, songId, isExisted, song;
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          user = req.user;
          songId = req.params.songId;
          isExisted = (_user$favoriteSongs = user.favoriteSongs) === null || _user$favoriteSongs === void 0 ? void 0 : _user$favoriteSongs.some(function (item) {
            return item.songId === songId;
          });
          if (!isExisted) {
            _context10.next = 6;
            break;
          }
          return _context10.abrupt("return", res.status(400).json({
            code: 400,
            message: "Song is already in favorite list"
          }));
        case 6:
          _context10.next = 8;
          return _song["default"].findOne({
            _id: songId
          }).select("-userId");
        case 8:
          song = _context10.sent;
          if (song) {
            _context10.next = 11;
            break;
          }
          return _context10.abrupt("return", res.status(404).json({
            code: 404,
            message: "Song not found"
          }));
        case 11:
          _context10.next = 13;
          return _user["default"].updateOne({
            _id: user.id
          }, {
            $push: {
              favoriteSongs: {
                songId: songId
              }
            }
          });
        case 13:
          return _context10.abrupt("return", res.status(200).json({
            code: 200,
            data: song,
            message: "Add favorite song successfully"
          }));
        case 16:
          _context10.prev = 16;
          _context10.t0 = _context10["catch"](0);
          return _context10.abrupt("return", res.status(500).json({
            code: 500,
            message: _context10.t0.message
          }));
        case 19:
        case "end":
          return _context10.stop();
      }
    }, _callee10, null, [[0, 16]]);
  }));
  return function addFavoriteSong(_x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}();

// [POST] /song/favorite/remove/:songId
var removeFavoriteSong = exports.removeFavoriteSong = /*#__PURE__*/function () {
  var _ref11 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee11(req, res) {
    var _user$favoriteSongs2, user, songId, isExisted, song;
    return _regenerator["default"].wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          user = req.user;
          songId = req.params.songId;
          isExisted = (_user$favoriteSongs2 = user.favoriteSongs) === null || _user$favoriteSongs2 === void 0 ? void 0 : _user$favoriteSongs2.some(function (item) {
            return item.songId === songId;
          });
          if (isExisted) {
            _context11.next = 6;
            break;
          }
          return _context11.abrupt("return", res.status(400).json({
            code: 400,
            message: "Song is not in favorite list"
          }));
        case 6:
          _context11.next = 8;
          return _song["default"].findOne({
            _id: songId
          });
        case 8:
          song = _context11.sent;
          if (song) {
            _context11.next = 11;
            break;
          }
          return _context11.abrupt("return", res.status(404).json({
            code: 404,
            message: "Song not found"
          }));
        case 11:
          _context11.next = 13;
          return _user["default"].updateOne({
            _id: user.id
          }, {
            $pull: {
              favoriteSongs: {
                songId: songId
              }
            }
          });
        case 13:
          return _context11.abrupt("return", res.status(200).json({
            code: 200,
            message: "Remove favorite song successfully"
          }));
        case 16:
          _context11.prev = 16;
          _context11.t0 = _context11["catch"](0);
          return _context11.abrupt("return", res.status(500).json({
            code: 500,
            message: _context11.t0.message
          }));
        case 19:
        case "end":
          return _context11.stop();
      }
    }, _callee11, null, [[0, 16]]);
  }));
  return function removeFavoriteSong(_x21, _x22) {
    return _ref11.apply(this, arguments);
  };
}();