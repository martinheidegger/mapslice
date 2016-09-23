var test = require('tap').test
var MapSlicer = require('../lib/MapSlicer')

test('regular instantiation', function (t) {
  var n = (new MapSlicer({
    outputFolder: '.',
    file: '.'
  }))
  t.notEquals(n, null)
  t.end()
})
test('function instantiation', function (t) {
  MapSlicer({
    output: '.',
    file: '.'
  })
  t.end()
})
test('function instantiation', function (t) {
  MapSlicer({
    output: '.',
    file: '.',
    minWidth: 1000,
    minHeight: 1000
  })
  t.end()
})
