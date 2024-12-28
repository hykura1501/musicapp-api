"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var commentSchema = new _mongoose["default"].Schema({
  userId: String,
  songId: String,
  content: String,
  deleted: {
    type: Boolean,
    "default": false
  },
  deletedAt: Date
}, {
  timestamps: true
});
var Comment = _mongoose["default"].model("Comment", commentSchema, "comments");
var _default = exports["default"] = Comment;