"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _auth = require("../controllers/auth.controller");
var _auth2 = require("../validations/auth.rule");
var _validate = _interopRequireDefault(require("../middlewares/validate"));
var router = (0, _express.Router)();
router.post("/login", (0, _validate["default"])(_auth2.loginRules), _auth.login);
router.post("/register", (0, _validate["default"])(_auth2.registerRules), _auth.register);
router.post("/login/google", _auth.loginGoogle);
router.post("/login/facebook", _auth.loginFacebook);
var _default = exports["default"] = router;