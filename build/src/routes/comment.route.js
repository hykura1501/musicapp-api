"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _comment = require("../controllers/comment.controller");
var _authenticate = _interopRequireDefault(require("../middlewares/authenticate"));
var router = (0, _express.Router)();
router.post("/:songId", _authenticate["default"], _comment.addComment);
router.get("/:songId", _comment.getAllComments);
router["delete"]("/:songId/:commentId", _authenticate["default"], _comment.deleteComment);
router.patch("/:songId/:commentId", _authenticate["default"], _comment.editComment);
var _default = exports["default"] = router;