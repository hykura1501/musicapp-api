"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadCloud = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _cloudDinary = _interopRequireDefault(require("../services/cloudDinary"));
var uploadCloud = exports.uploadCloud = function uploadCloud(folder) {
  return /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
      var result;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            if (!req.file) {
              _context.next = 8;
              break;
            }
            _context.next = 4;
            return (0, _cloudDinary["default"])(req.file.buffer, folder);
          case 4:
            result = _context.sent;
            req.body[req.file.fieldname] = result.url;
            req.body.duration = result === null || result === void 0 ? void 0 : result.duration;
            req.body.title = req.file.originalname;
          case 8:
            next();
            _context.next = 15;
            break;
          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](0);
            console.error("Error in middleware:", _context.t0);
            res.status(500).send({
              error: "Internal server error"
            });
          case 15:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[0, 11]]);
    }));
    return function (_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }();
};