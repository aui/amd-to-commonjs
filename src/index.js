'use strict';

const path = require('path');
const Runner = require('jscodeshift/dist/Runner.js');
const transform = path.resolve(__dirname, 'transforms', 'amd-to-commonjs.js');

module.exports = files => {
    return Runner.run(transform, files, {
        verbose: 0,
        babel: true,
        extensions: 'js',
        runInBand: false,
        parser: 'babel'
    });
};