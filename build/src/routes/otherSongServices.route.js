"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _otherSongServices = require("../controllers/otherSongServices.controller");
var router = (0, _express.Router)();
router.post("/recently-played/:songId", _otherSongServices.updateRecentlyPlayed);
router.get("/recently-played", _otherSongServices.getRecentlyPlayed);
router.post("/downloaded-songs", _otherSongServices.addDownloadedSongs);
router.get("/downloaded-songs", _otherSongServices.getDownloadedSongs);
var _default = exports["default"] = router;