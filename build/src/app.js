"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _express = _interopRequireDefault(require("express"));
require("dotenv/config");
var _db = require("./services/db");
var _index = _interopRequireDefault(require("./routes/index.route"));
var app = (0, _express["default"])();
// parse application/json

app.use(_express["default"].json());

// connect to database
(0, _db.connect)();

// routers
(0, _index["default"])(app);
app.get("/", function (req, res) {
  res.send("Hello World!");
});
var port = process.env.PORT;
app.listen(port, function () {
  console.log("Example app listening on port ".concat(port));
});