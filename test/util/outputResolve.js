var test = require('tap').test
var outputResolve = require("../../lib/util/outputResolve")
var path = require("path")

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
	test("File resolving should apply templates. For example `" + key + "` should return `" + tests[key], function (t) {
		t.equals(outputResolve(key, z, y, x), tests[key]);
		t.end();
	});
});

test("Special patterns should include the `google` pattern", function (t) {
	t.equals(outputResolve("{google}", 1, 2, 3), path.join("1", "2", "3"))
	t.end()
})
