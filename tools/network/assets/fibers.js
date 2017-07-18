// Patch file for fixing issue with native addons while packaging application into an exe using 'pkg' library
if (process.fiberLib) {
	module.exports = process.fiberLib;
} else {
	var fs = require('fs'), path = require('path');

	// Seed random numbers [gh-82]
	Math.random();

	// Look for binary for this platform
	var modPath = "./fibers.node";// path.join(__dirname, 'bin', process.platform+ '-'+ process.arch+ '-'+ process.versions.modules, 'fibers');
	try {
		fs.statSync(modPath);
	} catch (ex) {
		// No binary!
		console.error(
			'## There is an issue with `node-fibers` ##\n'+
			'`'+ modPath+ '.node` is missing.\n\n'+
			'Try running this to fix the issue: '+ process.execPath+ ' '+ __dirname.replace(' ', '\\ ')+ '/build'
		);
		throw new Error('Missing binary. See message above.');
	}

	// Pull in fibers implementation
	process.fiberLib = module.exports = require("./fibers.node").Fiber;
}
