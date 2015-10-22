var t = require("../_test")(),
    createHash = require("../../lib/util/createHash"),
    pairs = {
    	"a": "86f7e437faa5a7fce15d1ddcb9eaeaea377667b8",
    	"b": "e9d71f5ee7c92d6dc9e92ffdad17b8bd49418f98"
    };

t.describe("createHash should", function () {
	Object.keys(pairs).forEach(function (key) {
		t.it("return " + pairs[key] + " for " + key, function (done) {
			t.expect(createHash(key)).to.be.equals(pairs[key])	
			done()
		})
	})
})

module.exports = t