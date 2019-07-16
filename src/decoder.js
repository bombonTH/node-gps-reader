let decoder = {};

const GPS_QUALITY = {
    '0': 'Invalid',
    '1': 'GPS fix (SPS)',
    '2': 'DGPS fix',
    '3': 'PPS fix',
    '4': 'Real Time Kinematic',
    '5': 'Float RTK',
    '6': 'Estimated (Dead reckoning) (2.3 feature)',
    '7': 'Manual input mode',
    '8': 'Simulation mode'
}

const GPS_FAAMODE = {
    A: 'Autonomous',
    D: 'Differential',
    E: 'Estimated',
    M: 'Manual input',
    S: 'Simulated',
    N: 'Not Valid',
    P: 'Precise'
}

function decodeGGA(data) {
    const gpgga = /(\d{2})(\d{2})(\d{2})\.?(\d+)?,(\d{2})(\d{2}\.\d+),([NS]),(\d{3})(\d{2}\.\d+),([EW]),([0-8]),(\d{1,2}),(\d{1,3}(?:\.\d+)?),(-?|-?\d+(?:\.\d+)?),[M-]?,(-?|-?\d+(?:\.\d+)?),[M-]?,(-?|\d+(?:\.\d+)?),(\d{4}|\w{4})?,?([ADEMSNP])?/;
    let groups = gpgga.exec(data.payload);
    if (!groups) {
        data.valid = false;
        return;
    }
    data.time = [groups[1], groups[2], groups[3], groups[4] || 0];
    data.lat = (parseInt(groups[5]) + (groups[6] / 60)) * (groups[7] === "N" ? 1 : -1);
    data.lng = (parseInt(groups[8]) + (groups[9] / 60)) * (groups[10] === "E" ? 1 : -1);
    data.fixType = GPS_QUALITY[groups[11]];
    data.sat_count = parseInt(groups[12]);
    data.hdop = parseFloat(groups[13]);
    data.alt = parseFloat(groups[14]);
    data.geoid_sep = parseFloat(groups[15]);
    data.dgps_age = (groups[16] ? parseInt(groups[16]) : null);
    data.dgps_stn = (groups[17] ? groups[17] : null);
    data.faa = (groups[18] ? GPS_FAAMODE[groups[18]] : null);
}

function decodeVTG(data) {
    const gpvtg = /(\d{3}(?:\.\d+)?)?,T,(\d{3}(?:\.\d+)?)?,M,(\d+\.\d+),N,(\d+\.\d+),K,?([ADEMSNP])?/;
    let groups = gpvtg.exec(data.payload);
    if (!groups) {
        data.valid = false;
        return data;
    }
    data.trackTrue = parseFloat(groups[1]) || null;
    data.trackMagnet = parseFloat(groups[2]) || null;
    data.speedKnot = parseFloat(groups[3]);
    data.speedKmHr = parseFloat(groups[4]);
    data.faa = (groups[5] ? GPS_FAAMODE[groups[5]] : null);
}

function decodeHDT(data) {
    const hehdt = /(\d+(?:\.\d+)),T/;
    let groups = hehdt.exec(data.payload);
    if (!groups) {
        data.valid = false;
        return data;
    }
    data.heading = groups[1]
}

function decodeRMC(data) {
    const gprmc = /(\d{2})(\d{2})(\d{2})\.?(\d+)?,([AV]),(\d{2})(\d{2}\.\d+),([NS]),(\d{3})(\d{2}\.\d+),([EW]),(\d{3}\.\d+),(\d{3}\.\d+),(\d{2})(\d{2})(\d{2}),(\d{3}\.\d+),([EW])/;
    let groups = gprmc.exec(data.payload);
    if (!groups) {
        data.valid = false;
        return data;
    }
    data.time = [groups[1], groups[2], groups[3], groups[4] || 0];
    data.date = [groups[16], groups[15], groups[14]];
    data.lat = (parseInt(groups[6]) + (groups[7] / 60)) * (groups[8] === "N" ? 1 : -1);
    data.lng = (parseInt(groups[9]) + (groups[10] / 60)) * (groups[11] === "E" ? 1 : -1);
    data.speedKnot = parseFloat(groups[12]);
    data.trackTrue = parseFloat(groups[13]);
    data.variation = parseFloat(groups[17]) * (groups[18] === "E" ? 1 : -1);
}

decoder.GGA = decodeGGA;
decoder.VTG = decodeVTG;
decoder.HDT = decodeHDT;
decoder.RMC = decodeRMC;

module.exports = decoder;