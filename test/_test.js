
module.exports = function () {
	var Code = require('code');
	var Lab = require('lab');
	var lab = exports.lab = Lab.script();
	return {
		expect: Code.expect,
		lab: lab,
		before: lab.before,
		after: lab.after,
		it: lab.it,
		describe: lab.describe
	}
}