"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateToken = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var generateToken = exports.generateToken = function generateToken(id) {
  var options = {
    expiresIn: '2d'
  };
  var token = _jsonwebtoken["default"].sign(id, process.env.JWT_SECRET_KEY, options);
  return token;
};