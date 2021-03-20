/* global describe, it */
let assert = require('assert')
let transform = require('../lib/wgs2mars.min')

describe('Transform WGS-84 to GCJ-02', function () {

  it('Get right value', function () {
    let gcjloc = transform(119.3122312, 26.0240049)

    assert.strictEqual(119.31705425869873, gcjloc.lng)
    assert.strictEqual(26.02096344048847, gcjloc.lat)

  })
})
