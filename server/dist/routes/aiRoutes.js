"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _auth = require("../middlewares/auth.js");
var _aiController = require("../controller/aiController.js");
var _multer = require("../configs/multer.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var aiRouter = _express["default"].Router();
aiRouter.post('/generate-article', _auth.auth, _aiController.generateArticle);
aiRouter.post('/generate-blog-title', _auth.auth, _aiController.generateBlogTitles);
aiRouter.post('/generate-image', _auth.auth, _aiController.generateImage);
aiRouter.post('/remove-image-background', _multer.upload.single('image'), _auth.auth, _aiController.removeImageBackgroud);
aiRouter.post('/remove-image-object', _multer.upload.single('image'), _auth.auth, _aiController.removeImageObject);
aiRouter.post('/resume-review', _multer.upload.single('resume'), _auth.auth, _aiController.resumeReview);
var _default = exports["default"] = aiRouter;