"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _serverless = require("@neondatabase/serverless");
var sql = (0, _serverless.neon)("".concat(process.env.DATABASE_URL));
var _default = exports["default"] = sql;