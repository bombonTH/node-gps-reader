# node-gps-reader
basic nodejs gps parser.

Available sentences:
* GGA - Global Positioning System Fix Data.
* VTG - Track Made Good and Ground Speed.
* HDT - Heading, True.
* RMC - Track Made Good and Ground Speed.
* GLL - Geographic Position, Latitude / Longitude and time.

Function:
* parse(nmea_sentence) - return parsed data object.
* getChecksum(nmea_sentence) - return checksum in DEC (use toString(16) to convert to HEX if needed).

Remarks:
* NMEA checksum comprised of everything between (EXCLUSIVELY) the start delimiter (!/$) and the asterisk (*).

Usage:
* Check example.js

```js
const nmea = require('gps-reader')

################################################################
Testing GGA decoder.
Raw: $GPGGA,012906.00,2741.79668,N,12226.25185,E,1,11,0.86,14.2,M,15.5,M,,*60
Checksum valid: true
Time: 01,29,06,00
Position: φ 27.69661 - λ 122.43753
Fix Type: GPS fix (SPS)
Satellite Count: 11 - Hdop: 0.86
Altitude: 14.2 m - Geoid Separation: 15.5 m
DGPS Age: null - DGPS Station: null
FAA Mode: null
End of GGA decoder test.
################################################################
Testing VTG decoder.
Raw: $GPVTG,211.63,T,,M,12.947,N,23.977,K,A*3B
Checksum valid: true
True Track: 211.63 - Magnetic Track: null
Speed: 12.947 kn (23.977 km/h)
FAA Mode: Autonomous
End of VTG decoder test.
################################################################
Testing RMC decoder.
Raw: $GPRMC,123519,A,4807.038,N,01131.000,E,022.4,084.4,230394,003.1,W*6A
Checksum valid: true
Time: 12,35,19,0
Date: 94,03,23
Position: φ 48.11730 - λ 11.51667
Fix Status: A
True Track: 84.4
Speed: 22.4 kn
Magnetic Variation: -3.1
End of RMC decoder test.
################################################################
Testing GLL decoder.
Raw: $GPGLL,4916.45,N,12311.12,W,225444,A*31
Checksum valid: true
Time: 22,54,44,0
Position: φ 49.27417 - λ -123.18533
Fix Status: A
End of GLL decoder test.
################################################################
```

New decoder can be registered manually in src/decoder.js

Regular expression tested on [regexr.com](https://regexr.com/) 
