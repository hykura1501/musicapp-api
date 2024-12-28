"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = exports["default"] = function _default(duration) {
  var hrs = ~~(duration / 3600);
  var mins = ~~(duration % 3600 / 60);
  var secs = ~~duration % 60;
  var ret = "";
  if (hrs > 0) {
    ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
  }
  ret += "" + mins + ":" + (secs < 10 ? "0" : "");
  ret += "" + secs;
  return ret;
};