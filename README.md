# node-gps-reader
basic nodejs gps parser.

Available sentences:
* GGA - Global Positioning System Fix Data.
* VTG - Track Made Good and Ground Speed.
* HDT - Heading, True.
* RMC - Track Made Good and Ground Speed.

Usage:
```js
const nmea = require('gps-reader')

//Test functions accept custom sentence. calling it without any argument to use built-in sentence.
nmea.testGGA();
################################################################
Testing GGA decoder.
Input: $GPGGA,012906.00,2741.79668,N,12226.25185,E,1,11,0.86,14.2,M,15.5,M,,*60
Talker: GP - Format: GGA - Valid: true
Time: 01,29,06,00
Position: φ 27.69661 - λ 122.43753
Fix Type: GPS fix (SPS)
Satellite Count: 11 - Hdop: 0.86
Altitude: 14.2 m - Geoid Separation: 15.5 m
DGPS Age: null - DGPS Station: null
FAA Mode: null
End of GGA decoder test.
################################################################

//nmea.testVTG();
//nmea.testRMC();

let data = nmea.parse("$GPGGA,012906.00,2741.79668,N,12226.25185,E,1,11,0.86,14.2,M,15.5,M,,*60");

{
  raw: '$GPGGA,012906.00,2741.79668,N,12226.25185,E,1,11,0.86,14.2,M,15.5,M,,*60',
  valid: true,
  talker: 'GP',
  format: 'GGA',
  payload: '012906.00,2741.79668,N,12226.25185,E,1,11,0.86,14.2,M,15.5,M,,',
  time: [ '01', '29', '06', '00' ],
  lat: 27.696611333333333,
  lng: 122.43753083333333,
  fixType: 'GPS fix (SPS)',
  sat_count: 11,
  hdop: 0.86,
  alt: 14.2,
  geoid_sep: 15.5,
  dgps_age: null,
  dgps_stn: null,
  faa: null
}
```

New decoder can be registered manually in src/decoder.js

Regular expression tested on [regexr.com](https://regexr.com/) 
