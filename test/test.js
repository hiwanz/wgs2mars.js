/* global describe, it */
var assert = require('assert');
var transform = require('../lib/wgs2mars.min');

describe('Transform WGS-84 to GCJ-02', function () {

  it('Get right value', function (done) {
    var gcjloc = transform(119.3122312,26.0240049);
    assert.equal(119.31705425869873, gcjloc.lng);
    assert.equal(26.02096344048847, gcjloc.lat);
    done();
  });

});