var t = require("../_test")()
var pow2roundup = require("../../lib/util/pow2roundup")

t.describe("Rounding up to the next power of two should", function () {
	var tests = {
		0: 1,
		1: 1,
		2: 2,
		3: 4,
		4: 4,
		5: 8,
		8: 8,
		9: 16,
		15: 16,
		16: 16,
		17: 32
	};
	Object.keys(tests).forEach(function (key) {
		var num = +key
		t.it(" result in " + tests[key] + " for " + key, function (done) {
			t.expect(pow2roundup(key)).to.be.equals(tests[key])
			done()
		})
	})
})

module.exports = t