"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var artistSchema = new _mongoose["default"].Schema({
  artistId: String,
  name: String,
  description: String,
  followers: String,
  avatar: String,
  birthday: String,
  deleted: {
    type: Boolean,
    "default": false
  },
  deletedAt: Date
}, {
  timestamps: true
});
var Artist = _mongoose["default"].model("Artist", artistSchema, "artists");
var _default = exports["default"] = Artist;