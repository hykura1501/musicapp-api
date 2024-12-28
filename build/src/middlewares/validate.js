"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _expressValidator = require("express-validator");
var _default = exports["default"] = function _default(validations) {
  return /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
      var errors;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return Promise.all(validations.map(function (validation) {
              return validation.run(req);
            }));
          case 2:
            errors = (0, _expressValidator.validationResult)(req);
            if (!errors.isEmpty()) {
              _context.next = 5;
              break;
            }
            return _context.abrupt("return", next());
          case 5:
            return _context.abrupt("return", res.status(400).json({
              errors: errors.array()
            }));
          case 6:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function (_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }();
};