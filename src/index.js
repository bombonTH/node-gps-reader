'use strict'
const decoder = require('./decoder');

const NMEA_PATTERN = /[!$]((GP|GN|GL|HE|P|AI)(\w{3}),(.+)+)\*([0-9A-F]{2})/;

let debug = false;

const parse = function (raw) {
    raw = raw.toString().trim();
    let data = {}
    try {
        data = validLine(raw);
    } catch (TypeError) {
        console.error(TypeError, raw);
        data.valid = false;
    }

    if (!data.valid) {
        console.log(data)
    } else if (decoder[data.format]) {
        decoder[data.format](data);
    } else {
        if (debug) console.log(`Format ${data.format} is not yet supported.`);
    }
    return data;
}

const validLine = function (raw) {
    let data = {};
    data.raw = raw;
    let groups = NMEA_PATTERN.exec(data.raw);
    data.valid = getChecksum(groups[1]) === parseInt(groups[groups.length - 1], 16);
    data.talker = groups[2];
    data.format = groups[3];
    data.payload = groups[4];
    if (!data.valid) {
        if (debug) console.log(`Checksum invalid. Should have been ${getChecksum(groups[1]).toString(16)}`);
    }
    return data;
}

const getChecksum = function (text) {
    return text.split('').reduce((y, x) => y ^ x.charCodeAt(0), 0);
}

module.exports = {
    parse: parse,
    getChecksum: getChecksum,
    debug: debug
};
