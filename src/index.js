'use strict'
const decoder = require('./decoder');

const NMEA_PATTERN = /[!$]((GP|HE|P|AI)(\w{3}),(.+)+)\*([0-9A-F]{2})/;

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
        console.log(`Format ${data.format} is not yet supported.`);
    }
    return data;
}

const validLine = function (raw) {
    let data = {};
    data.raw = raw;
    let groups = NMEA_PATTERN.exec(data.raw);
    data.valid = groups[1].split('').reduce((y, x) => y ^ x.charCodeAt(0), 0) === parseInt(groups[groups.length - 1], 16);
    data.talker = groups[2];
    data.format = groups[3];
    data.payload = groups[4];
    return data;
}

const testGGA = function (_gga) {
    let gga = _gga || "$GPGGA,012906.00,2741.79668,N,12226.25185,E,1,11,0.86,14.2,M,15.5,M,,*60";
    let data = parse(gga);
    console.log('################################################################')
    console.log('Testing GGA decoder.');
    console.log(`Input: ${gga}`);
    console.log(`Talker: ${data.talker} - Format: ${data.format} - Valid: ${data.valid}`);
    if (data.valid) {
        console.log(`Time: ${data.time}`);
        console.log(`Position: φ ${data.lat.toFixed(5)} - λ ${data.lng.toFixed(5)}`);
        console.log(`Fix Type: ${data.fixType}`);
        console.log(`Satellite Count: ${data.sat_count} - Hdop: ${data.hdop}`);
        console.log(`Altitude: ${data.alt} m - Geoid Separation: ${data.geoid_sep} m`);
        console.log(`DGPS Age: ${data.dgps_age} - DGPS Station: ${data.dgps_stn}`);
        console.log(`FAA Mode: ${data.faa}`);
    }
    console.log('End of GGA decoder test.');
    console.log('################################################################')
    return (data.valid);
}

const testVTG = function (_vtg) {
    let vtg = _vtg || "$GPVTG,211.63,T,,M,12.947,N,23.977,K,A*3B";
    let data = parse(vtg);
    console.log('################################################################')
    console.log('Testing VTG decoder.');
    console.log(`Input: ${vtg}`);
    console.log(`Talker: ${data.talker} - Format: ${data.format} - Valid: ${data.valid}`);
    if (data.valid) {
        console.log(`True Track: ${data.trackTrue} - Magnetic Track: ${data.trackMagnet}`);
        console.log(`Speed: ${data.speedKnot} kn (${data.speedKmHr} km/h)`);
        console.log(`FAA Mode: ${data.faa}`);
    }
    console.log('End of VTG decoder test.');
    console.log('################################################################')
    return (data.valid);
}

const testRMC = function (_rmc) {
    let rmc = _rmc || "$GPRMC,123519,A,4807.038,N,01131.000,E,022.4,084.4,230394,003.1,W*6A"
    let data = parse(rmc);
    console.log('################################################################')
    console.log('Testing RMC decoder.');
    console.log(`Input: ${rmc}`);
    console.log(`Talker: ${data.talker} - Format: ${data.format} - Valid: ${data.valid}`);
    if (data.valid) {
        console.log(`Time: ${data.time}`);
        console.log(`Date: ${data.date}`);
        console.log(`Position: φ ${data.lat.toFixed(5)} - λ ${data.lng.toFixed(5)}`);
        console.log(`True Track: ${data.trackTrue}`);
        console.log(`Speed: ${data.speedKnot} kn`);
        console.log(`Magnetic Variation: ${data.variation}`);
    }
    console.log('End of RMC decoder test.');
    console.log('################################################################')
    return (data.valid);
}


module.exports = {
    parse: parse,
    testGGA: testGGA,
    testVTG: testVTG,
    testRMC: testRMC
};