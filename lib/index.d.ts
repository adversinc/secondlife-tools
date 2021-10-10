import dayjs from "dayjs";
/**
 * Transforms slname to the normalized form:
 * - adds "Resident" if slname is a single word login
 * @param slname
 * @returns {string} normalized name
 */
declare function normalize_slname(slname: string): string;
/**
 * Transforms slname to the text representation: removes "Resident"
 * part if exists
 * @param slname
 * @returns {string} text representation of the name
 */
declare function slname2str(slname: string): string;
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
declare function timeToSLT(datetime?: any): dayjs.Dayjs;
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
declare function split_slname(slname: any): string[];
/**
 * Pack UUID to binary
 * @param slkey
 * @returns {Buffer}
 */
declare function packSLKey(slkey: any): any;
/**
 * Unpack UUID from binary
 * @param packed
 * @returns {*}
 */
declare function unpackSLKey(packed: any): any;
/**
 * Pack UUID to binary like SmartBots do
 * @param {String} slkey
 * @returns {Buffer}
 */
declare function sbPackSLKey(slkey: any): number[];
/**
 *
 * @param {Buffer} packed - the smartbots-style packed UUID
 * @returns {string}
 */
declare function sbUnpackSLKey(packed: any): any;
declare const _default: {
    /**
     * Returns true if slname is a valid Second Life account name
     * (either normalized or not)
     * @param slname
     * @returns {boolean} check result
     */
    checkSLName(slname: string): boolean;
    /**
     * Returns true if two names are equal (normalizes them)
     * @param slname1
     * @param slname2
     */
    equalSLName(slname1: string, slname2: string): boolean;
    slname2str: typeof slname2str;
    normalize_slname: typeof normalize_slname;
    timeToSLT: typeof timeToSLT;
    split_slname: typeof split_slname;
    sbPackSLKey: typeof sbPackSLKey;
    sbUnpackSLKey: typeof sbUnpackSLKey;
    packSLKey: typeof packSLKey;
    unpackSLKey: typeof unpackSLKey;
};
export default _default;
