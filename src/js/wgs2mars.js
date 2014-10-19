/*
*	Usage: var gcjloc = transformFromWGSToGCJ(lng,lat);
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

    function outOfChina(lat, lon){
        if (lon < 72.004 || lon > 137.8347){
            return true;
        }
        if (lat < 0.8293 || lat > 55.8271){
            return true;
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
        if (outOfChina(wgLat, wgLon)){
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