"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _momentTimezoneLA = _interopRequireDefault(require("./moment-timezone-LA"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

  return _momentTimezoneLA.default.tz(datetime, "America/Los_Angeles");
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

var _default = {
  /**
   * Returns true if slname is a valid Second Life account name
   * (either normalized or not)
   * @param slname
   * @returns {boolean} check result
   */
  checkSLName(slname) {
    return slname.match(/^[a-z][a-z0-9_]+( [a-z0-9_]+)?$/i);
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
  split_slname
};
exports.default = _default;
module.exports = exports.default;