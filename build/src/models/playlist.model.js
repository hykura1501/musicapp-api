"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var playlistSchema = new _mongoose["default"].Schema({
  userId: {
    type: String
  },
  title: {
    type: String
  },
  songIds: [{
    songId: String
  }],
  deleted: {
    type: Boolean,
    "default": false
  },
  deletedAt: Date
}, {
  timestamps: true
});
var Playlist = _mongoose["default"].model("Playlist", playlistSchema, "playlists");
var _default = exports["default"] = Playlist;