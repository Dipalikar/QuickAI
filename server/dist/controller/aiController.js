"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resumeReview = exports.removeImageObject = exports.removeImageBackgroud = exports.processPDFFile = exports.generateImage = exports.generateBlogTitles = exports.generateArticle = void 0;
var _openai = _interopRequireDefault(require("openai"));
var _db = _interopRequireDefault(require("../configs/db.js"));
var _express = require("@clerk/express");
var _axios = _interopRequireDefault(require("axios"));
var _cloudinary = require("cloudinary");
var _fs = _interopRequireDefault(require("fs"));
var pdfjsLib = _interopRequireWildcard(require("pdfjs-dist/legacy/build/pdf.mjs"));
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t8 in e) "default" !== _t8 && {}.hasOwnProperty.call(e, _t8) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t8)) && (i.get || i.set) ? o(f, _t8, i) : f[_t8] = e[_t8]); return f; })(e, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
// import pdf from 'pdf-parse/lib/pdf-parse.js'

var AI = new _openai["default"]({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});
var processPDFFile = exports.processPDFFile = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(req, res) {
    var pdfParse, pdfBuffer, data, extractedText, _t;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          _context.p = 0;
          _context.n = 1;
          return Promise.resolve().then(function () {
            return _interopRequireWildcard(require("pdf-parse"));
          });
        case 1:
          pdfParse = _context.v["default"];
          pdfBuffer = req.file.buffer; // or however you get the PDF
          _context.n = 2;
          return pdfParse(pdfBuffer);
        case 2:
          data = _context.v;
          extractedText = data.text;
          res.json({
            success: true,
            text: extractedText
          });
          _context.n = 4;
          break;
        case 3:
          _context.p = 3;
          _t = _context.v;
          console.error("PDF processing error:", _t);
          res.status(500).json({
            error: "Failed to process PDF"
          });
        case 4:
          return _context.a(2);
      }
    }, _callee, null, [[0, 3]]);
  }));
  return function processPDFFile(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var generateArticle = exports.generateArticle = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(req, res) {
    var _yield$req$auth, userId, _req$body, prompt, length, user, plan, free_usage, response, content, _t2;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.p = _context2.n) {
        case 0:
          _context2.p = 0;
          _context2.n = 1;
          return req.auth();
        case 1:
          _yield$req$auth = _context2.v;
          userId = _yield$req$auth.userId;
          _req$body = req.body, prompt = _req$body.prompt, length = _req$body.length;
          _context2.n = 2;
          return _express.clerkClient.users.getUser(userId);
        case 2:
          user = _context2.v;
          plan = user.raw.unsafe_metadata.plan;
          free_usage = req.free_usage;
          if (!(plan !== "premium" && free_usage >= 10)) {
            _context2.n = 3;
            break;
          }
          return _context2.a(2, res.json({
            success: false,
            message: "Limit reached. Upgrade to continue."
          }));
        case 3:
          _context2.n = 4;
          return AI.chat.completions.create({
            model: "gemini-2.0-flash",
            messages: [{
              role: "user",
              content: prompt
            }],
            temperature: 0.7,
            max_tokens: length
          });
        case 4:
          response = _context2.v;
          content = response.choices[0].message.content;
          _context2.n = 5;
          return (0, _db["default"])(_templateObject || (_templateObject = _taggedTemplateLiteral(["INSERT INTO public.creations(user_id, prompt, content,type) VALUES (", ", ", ", ", ", 'article')"])), userId, prompt, content);
        case 5:
          if (!(plan !== "premium")) {
            _context2.n = 6;
            break;
          }
          _context2.n = 6;
          return _express.clerkClient.users.updateUserMetadata(userId, {
            privateMetadata: {
              free_usage: free_usage + 1
            }
          });
        case 6:
          res.json({
            success: true,
            content: content
          });
          _context2.n = 8;
          break;
        case 7:
          _context2.p = 7;
          _t2 = _context2.v;
          console.log(_t2);
          res.json({
            success: false,
            message: _t2.message
          });
        case 8:
          return _context2.a(2);
      }
    }, _callee2, null, [[0, 7]]);
  }));
  return function generateArticle(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var generateBlogTitles = exports.generateBlogTitles = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(req, res) {
    var _yield$req$auth2, userId, prompt, user, plan, free_usage, response, content, _t3;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.p = _context3.n) {
        case 0:
          _context3.p = 0;
          _context3.n = 1;
          return req.auth();
        case 1:
          _yield$req$auth2 = _context3.v;
          userId = _yield$req$auth2.userId;
          prompt = req.body.prompt;
          _context3.n = 2;
          return _express.clerkClient.users.getUser(userId);
        case 2:
          user = _context3.v;
          plan = user.raw.unsafe_metadata.plan;
          free_usage = req.free_usage;
          if (!(plan !== "premium" && free_usage >= 10)) {
            _context3.n = 3;
            break;
          }
          return _context3.a(2, res.json({
            success: false,
            message: "Limit reached. Upgrade to continue."
          }));
        case 3:
          _context3.n = 4;
          return AI.chat.completions.create({
            model: "gemini-2.0-flash",
            messages: [{
              role: "user",
              content: prompt
            }],
            temperature: 0.7
            // max_tokens: 100,
          });
        case 4:
          response = _context3.v;
          content = response.choices[0].message.content;
          _context3.n = 5;
          return (0, _db["default"])(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["INSERT INTO public.creations(user_id, prompt, content,type) VALUES (", ", ", ", ", ", 'blog-title')"])), userId, prompt, content);
        case 5:
          if (!(plan !== "premium")) {
            _context3.n = 6;
            break;
          }
          _context3.n = 6;
          return _express.clerkClient.users.updateUserMetadata(userId, {
            privateMetadata: {
              free_usage: free_usage + 1
            }
          });
        case 6:
          res.json({
            success: true,
            content: content
          });
          _context3.n = 8;
          break;
        case 7:
          _context3.p = 7;
          _t3 = _context3.v;
          console.log(_t3);
          res.json({
            success: false,
            message: _t3.message
          });
        case 8:
          return _context3.a(2);
      }
    }, _callee3, null, [[0, 7]]);
  }));
  return function generateBlogTitles(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var generateImage = exports.generateImage = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(req, res) {
    var _yield$req$auth3, userId, _req$body2, prompt, publish, user, plan, formData, _yield$axios$post, data, base64Image, _yield$cloudinary$upl, secure_url, _t4;
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.p = _context4.n) {
        case 0:
          _context4.p = 0;
          _context4.n = 1;
          return req.auth();
        case 1:
          _yield$req$auth3 = _context4.v;
          userId = _yield$req$auth3.userId;
          _req$body2 = req.body, prompt = _req$body2.prompt, publish = _req$body2.publish;
          _context4.n = 2;
          return _express.clerkClient.users.getUser(userId);
        case 2:
          user = _context4.v;
          plan = user.raw.unsafe_metadata.plan;
          console.log(prompt);
          if (!(plan !== "premium")) {
            _context4.n = 3;
            break;
          }
          return _context4.a(2, res.json({
            success: false,
            message: "This feature is only available for premium subscription"
          }));
        case 3:
          formData = new FormData();
          formData.append("prompt", prompt);
          _context4.n = 4;
          return _axios["default"].post("https://clipdrop-api.co/text-to-image/v1", formData, {
            headers: {
              "x-api-key": process.env.CLIPDROP_API_KEY
            },
            responseType: "arraybuffer"
          });
        case 4:
          _yield$axios$post = _context4.v;
          data = _yield$axios$post.data;
          base64Image = "data:image/png;base64,".concat(Buffer.from(data, "binary").toString("base64"));
          _context4.n = 5;
          return _cloudinary.v2.uploader.upload(base64Image);
        case 5:
          _yield$cloudinary$upl = _context4.v;
          secure_url = _yield$cloudinary$upl.secure_url;
          _context4.n = 6;
          return (0, _db["default"])(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["INSERT INTO public.creations(user_id, prompt, content,type,publish) VALUES (", ", ", ", ", ", 'image',", ")"])), userId, prompt, secure_url, publish !== null && publish !== void 0 ? publish : false);
        case 6:
          res.json({
            success: true,
            content: secure_url
          });
          _context4.n = 8;
          break;
        case 7:
          _context4.p = 7;
          _t4 = _context4.v;
          console.log(_t4);
          res.json({
            success: false,
            message: _t4.message
          });
        case 8:
          return _context4.a(2);
      }
    }, _callee4, null, [[0, 7]]);
  }));
  return function generateImage(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var removeImageBackgroud = exports.removeImageBackgroud = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(req, res) {
    var _yield$req$auth4, userId, image, user, plan, uploadResult, publicId, transformedUrl, _t5;
    return _regenerator().w(function (_context5) {
      while (1) switch (_context5.p = _context5.n) {
        case 0:
          _context5.p = 0;
          _context5.n = 1;
          return req.auth();
        case 1:
          _yield$req$auth4 = _context5.v;
          userId = _yield$req$auth4.userId;
          image = req.file;
          _context5.n = 2;
          return _express.clerkClient.users.getUser(userId);
        case 2:
          user = _context5.v;
          plan = user.raw.unsafe_metadata.plan;
          console.log(image.path);
          if (!(plan !== "premium")) {
            _context5.n = 3;
            break;
          }
          return _context5.a(2, res.json({
            success: false,
            message: "This feature is only available for premium subscription"
          }));
        case 3:
          _context5.n = 4;
          return _cloudinary.v2.uploader.upload(image.path);
        case 4:
          uploadResult = _context5.v;
          publicId = uploadResult.public_id; // Then, generate a URL with background removal transformation
          transformedUrl = _cloudinary.v2.url(publicId, {
            effect: "background_removal",
            fetch_format: "png" // Important: use PNG to preserve transparency
          });
          console.log("Transformed URL:", transformedUrl);
          _context5.n = 5;
          return (0, _db["default"])(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["INSERT INTO public.creations(user_id, prompt, content, type) VALUES (", ", 'Remove background from image', ", ", 'image')"])), userId, transformedUrl);
        case 5:
          res.json({
            success: true,
            content: transformedUrl
          });
          _context5.n = 7;
          break;
        case 6:
          _context5.p = 6;
          _t5 = _context5.v;
          console.log(_t5);
          res.json({
            success: false,
            message: _t5.message
          });
        case 7:
          return _context5.a(2);
      }
    }, _callee5, null, [[0, 6]]);
  }));
  return function removeImageBackgroud(_x9, _x0) {
    return _ref5.apply(this, arguments);
  };
}();
var removeImageObject = exports.removeImageObject = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(req, res) {
    var _yield$req$auth5, userId, object, image, user, plan, _yield$cloudinary$upl2, public_id, imageUrl, _t6;
    return _regenerator().w(function (_context6) {
      while (1) switch (_context6.p = _context6.n) {
        case 0:
          _context6.p = 0;
          _context6.n = 1;
          return req.auth();
        case 1:
          _yield$req$auth5 = _context6.v;
          userId = _yield$req$auth5.userId;
          object = req.body.object;
          image = req.file;
          _context6.n = 2;
          return _express.clerkClient.users.getUser(userId);
        case 2:
          user = _context6.v;
          plan = user.raw.unsafe_metadata.plan; // console.log(plan)
          if (!(plan !== "premium")) {
            _context6.n = 3;
            break;
          }
          return _context6.a(2, res.json({
            success: false,
            message: "This feature is only available for premium subscription"
          }));
        case 3:
          _context6.n = 4;
          return _cloudinary.v2.uploader.upload(image.path);
        case 4:
          _yield$cloudinary$upl2 = _context6.v;
          public_id = _yield$cloudinary$upl2.public_id;
          imageUrl = _cloudinary.v2.url(public_id, {
            transformation: [{
              effect: "gen_remove:".concat(object)
            }],
            resource_type: "image"
          });
          _context6.n = 5;
          return (0, _db["default"])(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["INSERT INTO public.creations(user_id, prompt, content,type) VALUES (", ",", ", ", ", 'image')"])), userId, "Removed ".concat(object, " from image"), imageUrl);
        case 5:
          res.json({
            success: true,
            content: imageUrl
          });
          _context6.n = 7;
          break;
        case 6:
          _context6.p = 6;
          _t6 = _context6.v;
          console.log(_t6);
          res.json({
            success: false,
            message: _t6.message
          });
        case 7:
          return _context6.a(2);
      }
    }, _callee6, null, [[0, 6]]);
  }));
  return function removeImageObject(_x1, _x10) {
    return _ref6.apply(this, arguments);
  };
}();
var resumeReview = exports.resumeReview = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(req, res) {
    var _yield$req$auth6, userId, resume, user, plan, dataBuffer, uint8Array, loadingTask, pdfDocument, extractedText, i, page, textContent, pageText, prompt, response, content, _t7;
    return _regenerator().w(function (_context7) {
      while (1) switch (_context7.p = _context7.n) {
        case 0:
          _context7.p = 0;
          _context7.n = 1;
          return req.auth();
        case 1:
          _yield$req$auth6 = _context7.v;
          userId = _yield$req$auth6.userId;
          resume = req.file;
          _context7.n = 2;
          return _express.clerkClient.users.getUser(userId);
        case 2:
          user = _context7.v;
          plan = user.raw.unsafe_metadata.plan;
          if (!(plan !== "premium")) {
            _context7.n = 3;
            break;
          }
          return _context7.a(2, res.json({
            success: false,
            message: "This feature is only available for premium subscription"
          }));
        case 3:
          if (!(resume.size > 5 * 1024 * 1024)) {
            _context7.n = 4;
            break;
          }
          return _context7.a(2, res.json({
            success: false,
            message: "Resume file size exceeds allowed size(5 MB)"
          }));
        case 4:
          dataBuffer = _fs["default"].readFileSync(resume.path); // Convert Buffer to Uint8Array
          uint8Array = new Uint8Array(dataBuffer);
          loadingTask = pdfjsLib.getDocument({
            data: uint8Array
          });
          _context7.n = 5;
          return loadingTask.promise;
        case 5:
          pdfDocument = _context7.v;
          extractedText = '';
          i = 1;
        case 6:
          if (!(i <= pdfDocument.numPages)) {
            _context7.n = 10;
            break;
          }
          _context7.n = 7;
          return pdfDocument.getPage(i);
        case 7:
          page = _context7.v;
          _context7.n = 8;
          return page.getTextContent();
        case 8:
          textContent = _context7.v;
          pageText = textContent.items.map(function (item) {
            return item.str;
          }).join(' ');
          extractedText += pageText + '\n';
        case 9:
          i++;
          _context7.n = 6;
          break;
        case 10:
          prompt = "Review the following resume and provide constructive feedback on its strengths, weaknesses and areas for improvement. Resume Content: \n\n ".concat(extractedText);
          _context7.n = 11;
          return AI.chat.completions.create({
            model: "gemini-2.0-flash",
            messages: [{
              role: "user",
              content: prompt
            }],
            temperature: 0.7,
            max_tokens: 1000
          });
        case 11:
          response = _context7.v;
          content = response.choices[0].message.content;
          _context7.n = 12;
          return (0, _db["default"])(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["INSERT INTO public.creations(user_id, prompt, content, type) VALUES (", ", 'Review the uploaded resume', ", ", 'resume-review')"])), userId, content);
        case 12:
          res.json({
            success: true,
            content: content
          });
          _context7.n = 14;
          break;
        case 13:
          _context7.p = 13;
          _t7 = _context7.v;
          console.log(_t7);
          res.json({
            success: false,
            message: _t7.message
          });
        case 14:
          return _context7.a(2);
      }
    }, _callee7, null, [[0, 13]]);
  }));
  return function resumeReview(_x11, _x12) {
    return _ref7.apply(this, arguments);
  };
}();