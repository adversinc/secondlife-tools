"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * Special truncated moment-timezone module which contains
 * SLT timezone (PDT) only.
 *
 * The problem is huge latest.json loaded by default moment-timezone.
 * Use this module instead of moment/moment-timezone everywhere.
 */
const moment = require("moment-timezone/moment-timezone.js"),
      fs = require("fs");

const la = fs.readFileSync(__dirname + "/../data/LA.json").toString();
moment.tz.load(JSON.parse(la));
var _default = moment;
exports.default = _default;
module.exports = exports.default;