"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _user = require("../controllers/user.controller");
var _authenticate = _interopRequireDefault(require("../middlewares/authenticate"));
var _multer = _interopRequireDefault(require("multer"));
var _uploadCloud = require("../middlewares/uploadCloud");
var router = (0, _express.Router)();
var upload = (0, _multer["default"])();
router.get("/me", _authenticate["default"], _user.getMe);
router.patch("/update", _authenticate["default"], upload.single("avatar"), (0, _uploadCloud.uploadCloud)("image"), _user.updateMe);
router.get("/profile/:userId", _user.detailUser);
router.post("/password/forgot", _user.forgotPassword);
router.post("/password/otp", _user.otp);
router.post("/password/reset", _user.resetPassword);
var _default = exports["default"] = router;