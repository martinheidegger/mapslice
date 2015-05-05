var t = require("../_test")()
var isPowerOfTwo = require("../../lib/util/isPowerOfTwo")

var powers = [1]
var num = 1
for (var i = 1; i<20; ++i) {
	powers.push(num *= 2);
}

t.describe("isPowerOfTwo", function () {
    t.it("should match values that are power of two", function (done) {
    	powers.forEach(function (valid) {
    		t.expect(isPowerOfTwo(valid)).to.equal(true);
    	})
        done();
    });
    t.it("should not match values that are not power of two", function (done) {
        for (var i=0; i<10000; ++i) {
        	if (powers.indexOf(i) === -1) {
        		t.expect(isPowerOfTwo(i)).to.be.equal(false);
        	}
        }
        done();
    });
});

module.exports = t