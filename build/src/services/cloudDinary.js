"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _cloudinary = require("cloudinary");
var _streamifier = _interopRequireDefault(require("streamifier"));
require("dotenv/config");
_cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY
});
var streamUpload = function streamUpload(buffer, folder) {
  return new Promise(function (resolve, reject) {
    var stream = _cloudinary.v2.uploader.upload_stream({
      resource_type: "auto",
      folder: folder
    }, function (error, result) {
      if (result) {
        resolve(result);
      } else {
        reject(error);
      }
    });
    _streamifier["default"].createReadStream(buffer).pipe(stream);
  });
};
var _default = exports["default"] = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(buffer, folder) {
    var result;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return streamUpload(buffer, folder);
        case 3:
          result = _context.sent;
          return _context.abrupt("return", result);
        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.error("Cloudinary Upload Error:", _context.t0);
          throw _context.t0;
        case 11:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 7]]);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();