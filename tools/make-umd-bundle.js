//https://github.com/ReactiveX/rxjs/blob/master/tools/make-umd-bundle.js
var rollup = require('rollup');
var fs = require('fs');
var path = require('path');

rollup.rollup({
    entry: './dist/esm_es5/src/index.js'
}).then(function (bundle) {
    var result = bundle.generate({
        format: 'umd',
        moduleName: 'powerfp',
        sourceMap: true
    });

    fs.writeFileSync('./npmpackage/bundles/powerfp.es5.js', result.code);
    fs.writeFileSync('./npmpackage/bundles/powerfp.es5.map', result.map);
});