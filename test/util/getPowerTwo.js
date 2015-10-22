var t = require("../_test")()
var getPowerTwo = require("../../lib/util/getPowerTwo")

t.describe("getPowerTwo should", function () {
	var num = 1
	for (var i=0; i<12; i++) {
		(function (i, num) {
			t.it("return " + i + " for " + num, function (done) {
				t.expect(getPowerTwo(num)).to.be.equals(i)	
				done()
			})
		})(i, num)
		num *= 2
	}
})

module.exports = t