var fs = require('fs');
var os = require('os');

var tslib = fs.readFileSync('./node_modules/tslib/tslib.js', 'utf8');

var jsFiles = [
    // './npmpackage/esm_es5/enumerable_.js',
    './npmpackage/bundles/powerfp.es5.js'
];

for (var filePath of jsFiles) {
    if (fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, tslib + os.EOL + fs.readFileSync(filePath, "utf8"));
        console.log(`file "${filePath}" has been modified`)
    }
}
