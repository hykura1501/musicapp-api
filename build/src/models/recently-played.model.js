"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var recentlyPlayedSchema = new _mongoose["default"].Schema({
  userId: String,
  songId: String,
  updatedAt: Date
});
var RecentlyPlayed = _mongoose["default"].model("RecentlyPlayed", recentlyPlayedSchema, "recently-played");
var _default = exports["default"] = RecentlyPlayed;