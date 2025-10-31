"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _auth = require("../middlewares/auth.js");
var _userController = require("../controller/userController.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var userRouter = _express["default"].Router();
userRouter.get('/get-user-creations', _auth.auth, _userController.getUserCreations);
userRouter.get('/get-published-creations', _auth.auth, _userController.getPublishedCreations);
userRouter.post('/toggle-like-creation', _auth.auth, _userController.toggleLikeCreation);
var _default = exports["default"] = userRouter;