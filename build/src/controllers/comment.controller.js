"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllComments = exports.editComment = exports.deleteComment = exports.addComment = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _comment = _interopRequireDefault(require("../models/comment.model"));
var _song = _interopRequireDefault(require("../models/song.model"));
var _user = _interopRequireDefault(require("../models/user.model"));
// [POST] /comment/:songId
var addComment = exports.addComment = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var songId, content, userId, song, comment;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          songId = req.params.songId;
          content = req.body.content;
          userId = req.user.id;
          _context.next = 6;
          return _song["default"].findById(songId);
        case 6:
          song = _context.sent;
          if (song) {
            _context.next = 9;
            break;
          }
          return _context.abrupt("return", res.status(404).json({
            code: 404,
            message: "Song not found"
          }));
        case 9:
          _context.next = 11;
          return _comment["default"].create({
            userId: userId,
            songId: songId,
            content: content
          });
        case 11:
          comment = _context.sent;
          return _context.abrupt("return", res.status(201).json({
            code: 201,
            data: comment
          }));
        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", res.status(500).json({
            code: 500,
            error: _context.t0.message
          }));
        case 18:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 15]]);
  }));
  return function addComment(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

// [GET] /comment/:songId
var getAllComments = exports.getAllComments = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var songId, song, comments, commentsWithUserInfo;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          songId = req.params.songId;
          _context3.next = 4;
          return _song["default"].findById(songId);
        case 4:
          song = _context3.sent;
          if (song) {
            _context3.next = 7;
            break;
          }
          return _context3.abrupt("return", res.status(404).json({
            code: 404,
            message: "Song not found"
          }));
        case 7:
          _context3.next = 9;
          return _comment["default"].find({
            songId: songId
          }).populate("userId").sort({
            createdAt: -1
          });
        case 9:
          comments = _context3.sent;
          _context3.next = 12;
          return Promise.all(comments.map(/*#__PURE__*/function () {
            var _ref3 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(comment) {
              var user;
              return _regenerator["default"].wrap(function _callee2$(_context2) {
                while (1) switch (_context2.prev = _context2.next) {
                  case 0:
                    _context2.next = 2;
                    return _user["default"].findById(comment.userId).select("username avatar fullName");
                  case 2:
                    user = _context2.sent;
                    return _context2.abrupt("return", {
                      userInfo: user,
                      content: comment.content,
                      createdAt: comment.createdAt
                    });
                  case 4:
                  case "end":
                    return _context2.stop();
                }
              }, _callee2);
            }));
            return function (_x5) {
              return _ref3.apply(this, arguments);
            };
          }()));
        case 12:
          commentsWithUserInfo = _context3.sent;
          console.log(commentsWithUserInfo);
          return _context3.abrupt("return", res.status(200).json({
            code: 200,
            data: commentsWithUserInfo
          }));
        case 17:
          _context3.prev = 17;
          _context3.t0 = _context3["catch"](0);
          return _context3.abrupt("return", res.status(500).json({
            code: 500,
            error: _context3.t0.message
          }));
        case 20:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 17]]);
  }));
  return function getAllComments(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

// [DELETE] /comment/:songId/:commentId
var deleteComment = exports.deleteComment = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var userId, _req$params, songId, commentId, song, comment;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          userId = req.user.id;
          _req$params = req.params, songId = _req$params.songId, commentId = _req$params.commentId;
          _context4.next = 5;
          return _song["default"].findById(songId);
        case 5:
          song = _context4.sent;
          if (song) {
            _context4.next = 8;
            break;
          }
          return _context4.abrupt("return", res.status(404).json({
            code: 404,
            message: "Song not found"
          }));
        case 8:
          _context4.next = 10;
          return _comment["default"].findById(commentId);
        case 10:
          comment = _context4.sent;
          if (comment) {
            _context4.next = 13;
            break;
          }
          return _context4.abrupt("return", res.status(404).json({
            code: 404,
            message: "Comment not found"
          }));
        case 13:
          if (!(comment.userId.toString() !== userId)) {
            _context4.next = 15;
            break;
          }
          return _context4.abrupt("return", res.status(403).json({
            code: 403,
            message: "Forbidden"
          }));
        case 15:
          _context4.next = 17;
          return _comment["default"].deleteOne({
            _id: commentId
          });
        case 17:
          return _context4.abrupt("return", res.status(200).json({
            code: 200,
            message: "Comment deleted"
          }));
        case 20:
          _context4.prev = 20;
          _context4.t0 = _context4["catch"](0);
          return _context4.abrupt("return", res.status(500).json({
            code: 500,
            error: _context4.t0.message
          }));
        case 23:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 20]]);
  }));
  return function deleteComment(_x6, _x7) {
    return _ref4.apply(this, arguments);
  };
}();

// [PATCH] /comment/:songId/:commentId
var editComment = exports.editComment = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var userId, _req$params2, songId, commentId, content, song, comment, newComment;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          userId = req.user.id;
          _req$params2 = req.params, songId = _req$params2.songId, commentId = _req$params2.commentId;
          content = req.body.content;
          _context5.next = 6;
          return _song["default"].findById(songId);
        case 6:
          song = _context5.sent;
          if (song) {
            _context5.next = 9;
            break;
          }
          return _context5.abrupt("return", res.status(404).json({
            code: 404,
            message: "Song not found"
          }));
        case 9:
          _context5.next = 11;
          return _comment["default"].findById(commentId);
        case 11:
          comment = _context5.sent;
          if (comment) {
            _context5.next = 14;
            break;
          }
          return _context5.abrupt("return", res.status(404).json({
            code: 404,
            message: "Comment not found"
          }));
        case 14:
          if (!(comment.userId.toString() !== userId)) {
            _context5.next = 16;
            break;
          }
          return _context5.abrupt("return", res.status(403).json({
            code: 403,
            message: "Forbidden"
          }));
        case 16:
          _context5.next = 18;
          return _comment["default"].findOneAndUpdate({
            _id: commentId
          }, {
            content: content
          }, {
            "new": true
          });
        case 18:
          newComment = _context5.sent;
          return _context5.abrupt("return", res.status(200).json({
            code: 200,
            data: newComment.content,
            message: "Comment updated"
          }));
        case 22:
          _context5.prev = 22;
          _context5.t0 = _context5["catch"](0);
          return _context5.abrupt("return", res.status(500).json({
            code: 500,
            error: _context5.t0.message
          }));
        case 25:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 22]]);
  }));
  return function editComment(_x8, _x9) {
    return _ref5.apply(this, arguments);
  };
}();