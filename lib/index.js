"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _momentSLT = _interopRequireDefault(require("@advers/moment-SLT"));

var _uuidParse = _interopRequireDefault(require("uuid-parse"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Detect if we need to load the browser-side buffer module
if (Buffer === undefined) {
  Buffer = require("buffer/").Buffer;
}
/**
 * Transforms slname to the normalized form:
 * - adds "Resident" if slname is a single word login
 * @param slname
 * @returns {string} normalized name
 */


function normalize_slname(slname) {
  if (typeof slname !== "string") {
    return "";
  }

  slname = slname.replace('.', ' ');
  slname = slname.trim().replace(/\s+/, " ");

  if (slname.indexOf(" ") == -1 && !slname.toLowerCase().endsWith(" resident")) {
    slname += " Resident";
  }

  return slname;
}
/**
 * Transforms slname to the text representation: removes "Resident"
 * part if exists
 * @param slname
 * @returns {string} text representation of the name
 */


function slname2str(slname) {
  slname = normalize_slname(slname);
  var parts = slname.split(" ");

  if (parts[1].toLowerCase() == "resident") {
    return parts[0];
  } else {
    return slname;
  }
}
/**
 * Converts date/time to SLT.
 *
 * datetime may have a timezone set (the conversion
 * is being performed then)
 * If datetime has no timezone, we consider it in SLT already.
 *
 * Also, datetime may be empty - current SL time is being returned then
 * @param datetime
 */


function timeToSLT(datetime) {
  if (!datetime) {
    datetime = new Date();
  }

  return _momentSLT.default.tz(datetime, "America/Los_Angeles");
}
/**
 * Splits the SL name to parts (first name, last name) and returns them as an
 * array.
 *
 * Usage:
 * [fname, lname] = split_slname(slname);
 * [fname] = split_slname(slname);
 *
 * Tries to normalize the given SL name.
 *
 * @param slname {String} - the Second Life name to split
 * @return {string[]}
 */


function split_slname(slname) {
  const normalized = normalize_slname(slname);
  const parts = normalized.split(" ");
  return parts.length > 1 ? parts : [normalized, ""];
}
/**
 * Pack UUID to binary
 * @param slkey
 * @returns {Buffer}
 */


function packSLKey(slkey) {
  return Buffer.from(_uuidParse.default.parse(slkey));
}
/**
 * Unpack UUID from binary
 * @param packed
 * @returns {*}
 */


function unpackSLKey(packed) {
  return _uuidParse.default.unparse(Buffer.from(packed));
}
/**
 * Pack UUID to binary like SmartBots do
 * @param {String} slkey
 * @returns {Buffer}
 */


function sbPackSLKey(slkey) {
  const bin = Buffer.from(_uuidParse.default.parse(slkey)); // SmartBots packSLkey has OCTETS order reversed, so we have to re-pack values here

  const bin2 = Buffer.alloc(16);

  for (let i = 0; i < 16; i++) {
    bin2[i] = (bin[i] << 4) + (bin[i] >> 4);
  }

  return bin2;
}
/**
 *
 * @param {Buffer} packed - the smartbots-style packed UUID
 * @returns {string}
 */


function sbUnpackSLKey(packed) {
  const bin = Buffer.from(packed); // SmartBots packSLkey has OCTETS order reversed, so we have to re-pack values here

  const bin2 = Buffer.alloc(16);

  for (let i = 0; i < 16; i++) {
    bin2[i] = (bin[i] << 4) + (bin[i] >> 4);
  }

  return _uuidParse.default.unparse(bin2);
}

var _default = {
  /**
   * Returns true if slname is a valid Second Life account name
   * (either normalized or not)
   * @param slname
   * @returns {boolean} check result
   */
  checkSLName(slname) {
    return slname.match(/^[a-z0-9][a-z0-9_]+( [a-z0-9_]+)?$/i);
  },

  /**
   * Returns true if two names are equal (normalizes them)
   * @param slname1
   * @param slname2
   */
  equalSLName(slname1, slname2) {
    return normalize_slname(slname1).toLowerCase() === normalize_slname(slname2).toLowerCase();
  },

  slname2str,
  normalize_slname,
  timeToSLT,
  split_slname,
  sbPackSLKey,
  sbUnpackSLKey,
  packSLKey,
  unpackSLKey
};
exports.default = _default;
module.exports = exports.default;