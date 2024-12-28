"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _artist = require("../controllers/artist.controller");
var router = (0, _express.Router)();
router.post("/follow/:artistId", _artist.followArtist);
router.post("/un-follow/:artistId", _artist.unFollowArtist);
var _default = exports["default"] = router;