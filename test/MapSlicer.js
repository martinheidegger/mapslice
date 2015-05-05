var t = require('./_test')()
var MapSlicer = require('../lib/MapSlicer')

t.describe('Instantiation', function () {
	t.it('regular instantiation', function (done) {
		new MapSlicer({
			outputFolder: '.',
			file: '.'
		})
		done()
	})
	t.it('function instantiation', function (done) {
		MapSlicer({
			output: '.',
			file: '.'
		})
		done()
	})
	t.it('function instantiation', function (done) {
		MapSlicer({
			output: '.',
			file: '.',
			minWidth: 1000,
			minHeight: 1000
		})
		done()
	})
})

module.exports = t