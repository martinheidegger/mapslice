var test = require('tap').test
var MapSlicer = require('../lib/MapSlicer')

test('regular instantiation', function (t) {
	new MapSlicer({
		outputFolder: '.',
		file: '.'
	})
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
