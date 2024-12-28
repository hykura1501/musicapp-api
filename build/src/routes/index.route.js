"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _auth = _interopRequireDefault(require("./auth.route"));
var _song = _interopRequireDefault(require("./song.route"));
var _playlist = _interopRequireDefault(require("./playlist.route"));
var _user = _interopRequireDefault(require("./user.route"));
var _otherSongServices = _interopRequireDefault(require("./otherSongServices.route"));
var _artist = _interopRequireDefault(require("./artist.route"));
var _comment = _interopRequireDefault(require("./comment.route"));
var _authenticate = _interopRequireDefault(require("../middlewares/authenticate"));
var _default = exports["default"] = function _default(app) {
  app.use("/auth", _auth["default"]);
  app.use("/song", _song["default"]);
  app.use("/playlist", _authenticate["default"], _playlist["default"]);
  app.use("/user", _user["default"]);
  app.use("/other", _authenticate["default"], _otherSongServices["default"]);
  app.use("/artist", _authenticate["default"], _artist["default"]);
  app.use("/comment", _comment["default"]);
};