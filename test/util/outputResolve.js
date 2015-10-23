var t = require("../_test")()
var outputResolve = require("../../lib/util/outputResolve")
var path = require("path")

t.describe("File resolving should apply templates. For example `", function () {
	var x = 1
	var y = 2
	var z = 3
	var tests = {
		"in {x} between": "in " + x + " between",
		"{y} at the beginning": y + " at the beginning",
		"at the end {z}": "at the end " + z,
		"all of them: {x} {y} {z}": "all of them: " + x + " " + y + " " + z
	}
	Object.keys(tests).forEach(function (key) {
		t.it(key + "` should return `" + tests[key], function (done) {
			t.expect(outputResolve(key, z, y, x)).to.be.equal(tests[key]);
			done();
		});
	})
});
t.describe("Special patterns", function () {
	t.it("Should include the `google` pattern", function (done) {
		t.expect(outputResolve("{google}", 1, 2, 3)).to.be.equal(path.join("1", "2", "3"))
		done()
	})
})

module.exports = t