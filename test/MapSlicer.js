const test = require('tap').test
const MapSlicer = require('../lib/MapSlicer')

test('any instantiation should work', function (t) {
  const n = new MapSlicer({
    outputFolder: '.',
    file: '.'
  })
  t.notEquals(n, null)
  t.end()
})

test('function instantiation minWidth/minHeight', function (t) {
  const n = new MapSlicer({
    output: '.',
    file: '.',
    minWidth: 1000,
    minHeight: 1000
  })
  t.notEquals(n, null)
  t.end()
})
