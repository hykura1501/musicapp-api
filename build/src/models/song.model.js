"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var songSchema = new _mongoose["default"].Schema({
  title: String,
  artistId: String,
  artistName: String,
  thumbnail: String,
  path: String,
  duration: Number,
  view: {
    type: Number,
    "default": 0
  },
  like: {
    type: Number,
    "default": 0
  },
  album: String,
  lyric: String,
  userId: {
    type: String,
    "default": ""
  },
  deleted: {
    type: Boolean,
    "default": false
  },
  deletedAt: Date
}, {
  timestamps: true
});
var Song = _mongoose["default"].model("Song", songSchema, "songs");
var _default = exports["default"] = Song;