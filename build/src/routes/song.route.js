"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _song = require("../controllers/song.controller");
var _authenticate = _interopRequireDefault(require("../middlewares/authenticate"));
var _multer = _interopRequireDefault(require("multer"));
var _uploadCloud = require("../middlewares/uploadCloud");
var _validate = _interopRequireDefault(require("../middlewares/validate"));
var _song2 = require("../validations/song.rule");
var router = (0, _express.Router)();
var upload = (0, _multer["default"])();
router.post("/", _authenticate["default"], upload.single("url"), (0, _uploadCloud.uploadCloud)("mp3"), (0, _validate["default"])(_song2.createSongRules), _song.createSong);
router.get("/", _song.getAllSongs);
router.get("/detail/:songId", _song.getSongDetail);
router.post("/increase-view/:songId", _song.increaseView);
router.post("/increase-like/:songId", _song.increaseLike);
router.get("/top-likes", _song.getTopLikeSongs);
router.get("/popular", _song.getPopularSongs);
router.get("/new-release", _song.getNewReleaseSongs);
router.get("/favorite", _authenticate["default"], _song.getFavoriteSongs);
router.post("/favorite/add/:songId", _authenticate["default"], _song.addFavoriteSong);
router["delete"]("/favorite/remove/:songId", _authenticate["default"], _song.removeFavoriteSong);
var _default = exports["default"] = router;