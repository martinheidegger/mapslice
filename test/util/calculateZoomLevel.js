'use strict'
const test = require('tap').test
const calculateZoomLevel = require('../../lib/util/calculateZoomLevel')

test('applying minWidth', t => {
  t.deepEquals(calculateZoomLevel(500, 200, { minWidth: 200 }), {
    minWidth: 200,
    minHeight: 80
  })
  t.end()
})

test('applying minHeight', t => {
  t.deepEquals(calculateZoomLevel(200, 500, { minHeight: 200 }), {
    minWidth: 80,
    minHeight: 200
  })
  t.end()
})

test('skipping minWidth', t => {
  t.deepEquals(calculateZoomLevel(2000, 1200, { zoomMin: 2, tileSize: 250 }), {
    zoomMin: 2,
    tileSize: 250,
    minWidth: 500,
    minHeight: 300
  })
  t.end()
})
