"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var userSchema = new _mongoose["default"].Schema({
  fullName: String,
  username: String,
  email: String,
  password: String,
  avatar: String,
  phone: String,
  uploadedSongs: [{
    title: String,
    path: String,
    duration: Number
  }],
  favoriteSongs: [{
    songId: String
  }],
  favoriteArtists: [{
    artistId: String
  }],
  deleted: {
    type: Boolean,
    "default": false
  },
  deletedAt: Date
}, {
  timestamps: true
});
var User = _mongoose["default"].model("User", userSchema, "users");
var _default = exports["default"] = User;