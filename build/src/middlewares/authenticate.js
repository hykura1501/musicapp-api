"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _user = _interopRequireDefault(require("../models/user.model"));
var _default = exports["default"] = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var authorization, token, tokenDecoded, user;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          authorization = req.headers.authorization;
          if (authorization) {
            _context.next = 3;
            break;
          }
          return _context.abrupt("return", res.status(401).json({
            code: 401,
            message: 'Unauthorized'
          }));
        case 3:
          if (authorization.startsWith('Bearer')) {
            _context.next = 5;
            break;
          }
          return _context.abrupt("return", res.status(401).json({
            code: 401,
            message: 'Unauthorized'
          }));
        case 5:
          _context.prev = 5;
          token = authorization.split(' ')[1];
          tokenDecoded = _jsonwebtoken["default"].verify(token, process.env.JWT_SECRET_KEY);
          _context.next = 10;
          return _user["default"].findOne({
            _id: tokenDecoded.id
          }).select('-password');
        case 10:
          user = _context.sent;
          if (user) {
            _context.next = 13;
            break;
          }
          return _context.abrupt("return", res.status(401).json({
            code: 401,
            message: 'Unauthorized'
          }));
        case 13:
          req.user = user;
          next();
          _context.next = 20;
          break;
        case 17:
          _context.prev = 17;
          _context.t0 = _context["catch"](5);
          return _context.abrupt("return", res.status(401).json({
            code: 401,
            message: 'Unauthorized'
          }));
        case 20:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[5, 17]]);
  }));
  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();