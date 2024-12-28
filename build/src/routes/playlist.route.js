"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _playlist = require("../controllers/playlist.controller");
var _auth = require("../validations/auth.rule");
var _validate = _interopRequireDefault(require("../middlewares/validate"));
var router = (0, _express.Router)();
//authenticate
router.get("/", _playlist.getAllPlaylists);
router.get("/:playlistId", _playlist.getSongsOfPlaylist);
router["delete"]("/:playlistId", _playlist.deletePlaylist);
router.post("/", _playlist.createPlaylist);
router.post("/add-song/:playlistId", _playlist.addSongToPlaylist);
router["delete"]("/remove-song/:playlistId", _playlist.removeSongFromPlaylist);
var _default = exports["default"] = router;