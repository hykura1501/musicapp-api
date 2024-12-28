"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerRules = exports.loginRules = void 0;
var _expressValidator = require("express-validator");
var registerRules = exports.registerRules = [(0, _expressValidator.body)('email').isEmail(), (0, _expressValidator.body)('password').isLength({
  min: 6
}), (0, _expressValidator.body)('fullName').exists()];
var loginRules = exports.loginRules = [(0, _expressValidator.body)('email').isEmail(), (0, _expressValidator.body)('password').isLength({
  min: 6
})];