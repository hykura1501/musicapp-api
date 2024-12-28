"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSongRules = void 0;
var _expressValidator = require("express-validator");
var createSongRules = exports.createSongRules = [(0, _expressValidator.body)("url").isURL(), (0, _expressValidator.body)("title").exists(), (0, _expressValidator.body)("duration").isNumeric()];