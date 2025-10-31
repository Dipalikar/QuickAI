"use strict";

var _express = _interopRequireDefault(require("express"));
var _cors = _interopRequireDefault(require("cors"));
require("dotenv/config");
var _express2 = require("@clerk/express");
var _aiRoutes = _interopRequireDefault(require("./routes/aiRoutes.js"));
var _userRoutes = _interopRequireDefault(require("./routes/userRoutes.js"));
var _cloudinary = _interopRequireDefault(require("./configs/cloudinary.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var app = (0, _express["default"])();
await (0, _cloudinary["default"])();
app.use((0, _cors["default"])());
app.use(_express["default"].json());
app.use((0, _express2.clerkMiddleware)());
app.get("/ping", function (req, res) {
  return res.send("Server is Live!");
});
app.use("/api/ai", _aiRoutes["default"]);
app.use("/api/user", _userRoutes["default"]);
var PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  return console.log("Server is running on port", PORT);
});