/*
*   Usage: var gcjloc = transformFromWGSToGCJ(lng,lat);
*   Source: https://github.com/hiwanz/wgs2mars.js.git
*/
(function(global){
    // const PI
    var PI = 3.14159265358979324;
    // Krasovsky 1940
    //
    // a = 6378245.0, 1/f = 298.3
    // b = a * (1 - f)
    // ee = (a^2 - b^2) / a^2;
    var a = 6378245.0;
    var ee = 0.00669342162296594323;

    function Rectangle(lng1, lat1, lng2, lat2) {
        this.west = Math.min(lng1, lng2);
        this.north = Math.max(lat1, lat2);
        this.east = Math.max(lng1, lng2);
        this.south = Math.min(lat1, lat2);
    }

    function isInRect(rect, lon, lat) {
        return rect.west <= lon && rect.east >= lon && rect.north >= lat && rect.south <= lat;
    }
    //China region - raw data
    var region = [
        new Rectangle(79.446200, 49.220400, 96.330000,42.889900),
        new Rectangle(109.687200, 54.141500, 135.000200, 39.374200),
        new Rectangle(73.124600, 42.889900, 124.143255, 29.529700),
        new Rectangle(82.968400, 29.529700, 97.035200, 26.718600),
        new Rectangle(97.025300, 29.529700, 124.367395, 20.414096),
        new Rectangle(107.975793, 20.414096, 111.744104, 17.871542)
    ];
    //China excluded region - raw data
    var exclude = [
        new Rectangle(119.921265, 25.398623, 122.497559, 21.785006),
        new Rectangle(101.865200, 22.284000, 106.665000, 20.098800),
        new Rectangle(106.452500, 21.542200, 108.051000, 20.487800),
        new Rectangle(109.032300, 55.817500, 119.127000, 50.325700),
        new Rectangle(127.456800, 55.817500, 137.022700, 49.557400),
        new Rectangle(131.266200, 44.892200, 137.022700, 42.569200)
    ];

    function isInChina(lon, lat) {
        for (var i = 0; i < region.length; i++) {
            if (isInRect(region[i], lon, lat))
            {
                for (var j = 0; j < exclude.length; j++)
                {
                    if (isInRect(exclude[j], lon, lat))
                    {
                        return false;
                    }
                }
                return true;
            }
        }
        return false;
    }

    function transformLat(x, y){
        var ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));
        ret += (20.0 * Math.sin(6.0 * x * PI) + 20.0 * Math.sin(2.0 * x * PI)) * 2.0 / 3.0;
        ret += (20.0 * Math.sin(y * PI) + 40.0 * Math.sin(y / 3.0 * PI)) * 2.0 / 3.0;
        ret += (160.0 * Math.sin(y / 12.0 * PI) + 320 * Math.sin(y * PI / 30.0)) * 2.0 / 3.0;
        return ret;
    }

    function transformLon(x, y){
        var ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
        ret += (20.0 * Math.sin(6.0 * x * PI) + 20.0 * Math.sin(2.0 * x * PI)) * 2.0 / 3.0;
        ret += (20.0 * Math.sin(x * PI) + 40.0 * Math.sin(x / 3.0 * PI)) * 2.0 / 3.0;
        ret += (150.0 * Math.sin(x / 12.0 * PI) + 300.0 * Math.sin(x / 30.0 * PI)) * 2.0 / 3.0;
        return ret;
    }

    // World Geodetic System ==> Mars Geodetic System
    function transform(wgLon,wgLat){
        var mgLoc = {};
        if (!isInChina(wgLon, wgLat)){
            mgLoc = {
                lat: wgLat,
                lng: wgLon
            };
            return mgLoc;
        }
        var dLat = transformLat(wgLon - 105.0, wgLat - 35.0);
        var dLon = transformLon(wgLon - 105.0, wgLat - 35.0);
        var radLat = wgLat / 180.0 * PI;
        var magic = Math.sin(radLat);
        magic = 1 - ee * magic * magic;
        var sqrtMagic = Math.sqrt(magic);
        dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * PI);
        dLon = (dLon * 180.0) / (a / sqrtMagic * Math.cos(radLat) * PI);
        mgLoc = {
            lat: wgLat + dLat,
            lng: wgLon + dLon
        };
            return mgLoc;
    }

    global.transformFromWGSToGCJ = transform;
})(window);