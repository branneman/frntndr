'use strict';

var exec   = require('child_process').exec,
    config = require('../config.json');

module.exports = function() {

    // Start Sass watcher
    var sassCwd  = './src/static/',
        sassCmd  = 'sass -t ' + config.server.sassOutputStyle + ' --sourcemap --no-cache --watch scss:css',
        sassProc = exec(sassCmd, {cwd: sassCwd}, function(err, stdout, stderr) {});

    // Exit watcher when node.js is getting killed
    process.on('SIGINT', function() {
        sassProc.kill();
        process.exit();
    });

};
