const nmea = require('./src/index.js');

let data;

console.log('################################################################');

console.log('Testing GGA decoder.');
data = nmea.parse("$GPGGA,012906.00,2741.79668,N,12226.25185,E,1,11,0.86,14.2,M,15.5,M,,*60");
console.log(`Raw: ${data.raw}`);
console.log(`Checksum valid: ${data.valid}`);
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

console.log('################################################################');

console.log('Testing VTG decoder.');
data = nmea.parse("$GPVTG,211.63,T,,M,12.947,N,23.977,K,A*3B");
console.log(`Raw: ${data.raw}`);
console.log(`Checksum valid: ${data.valid}`);
if (data.valid) {
    console.log(`True Track: ${data.trackTrue} - Magnetic Track: ${data.trackMagnet}`);
    console.log(`Speed: ${data.speedKnot} kn (${data.speedKmHr} km/h)`);
    console.log(`FAA Mode: ${data.faa}`);
}
console.log('End of VTG decoder test.');

console.log('################################################################');

console.log('Testing RMC decoder.');
data = nmea.parse("$GPRMC,123519,A,4807.038,N,01131.000,E,022.4,084.4,230394,003.1,W*6A");
console.log(`Raw: ${data.raw}`);
console.log(`Checksum valid: ${data.valid}`);
if (data.valid) {
    console.log(`Time: ${data.time}`);
    console.log(`Date: ${data.date}`);
    console.log(`Position: φ ${data.lat.toFixed(5)} - λ ${data.lng.toFixed(5)}`);
    console.log(`Fix Status: ${data.status}`);
    console.log(`True Track: ${data.trackTrue}`);
    console.log(`Speed: ${data.speedKnot} kn`);
    console.log(`Magnetic Variation: ${data.variation}`);
}
console.log('End of RMC decoder test.');

console.log('################################################################');

console.log('Testing GLL decoder.');
data = nmea.parse("$GPGLL,4916.45,N,12311.12,W,225444,A*31");
console.log(`Raw: ${data.raw}`);
console.log(`Checksum valid: ${data.valid}`);
if (data.valid) {
    console.log(`Time: ${data.time}`);
    console.log(`Position: φ ${data.lat.toFixed(5)} - λ ${data.lng.toFixed(5)}`);
    console.log(`Fix Status: ${data.status}`);
}
console.log('End of GLL decoder test.');

console.log('################################################################');