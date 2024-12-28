"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var forgotPasswordSchema = new _mongoose["default"].Schema({
  email: String,
  otp: String,
  expireAt: {
    type: Date,
    expires: 5 * 1000 * 60
  },
  resetToken: String
}, {
  timestamps: true
});
var ForgotPassword = _mongoose["default"].model("ForgotPassword", forgotPasswordSchema, "forgot-password");
var _default = exports["default"] = ForgotPassword;