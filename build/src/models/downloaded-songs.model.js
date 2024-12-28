"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var downloadedSongSchema = new _mongoose["default"].Schema({
  userId: String,
  songId: String,
  localURL: String,
  deleted: {
    type: Boolean,
    "default": false
  }
}, {
  timestamps: true
});
var DownloadedSong = _mongoose["default"].model("DownloadedSong", downloadedSongSchema, "downloaded-songs");
var _default = exports["default"] = DownloadedSong;