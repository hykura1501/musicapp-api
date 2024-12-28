"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sortByKey = void 0;
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var sortByKey = exports.sortByKey = function sortByKey(originalArray, orderArray, key) {
  var clone = (0, _toConsumableArray2["default"])(originalArray);
  clone.sort(function (a, b) {
    var aIndex = orderArray.indexOf(a[key].toString());
    var bIndex = orderArray.indexOf(b[key].toString());
    return aIndex - bIndex;
  });
  return clone;
};