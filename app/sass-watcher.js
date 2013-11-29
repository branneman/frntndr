'use strict';

var exec = require('child_process').exec;

module.exports = function() {

    // Start grunt watcher (which in turn starts sass watcher and autoprefixer)
    var sassProcess = exec('grunt watcher', function(err, stdout, stderr) {
        console.log(err, stdout, stderr);
    });

    // Exit watcher when node.js is getting killed
    process.on('SIGINT', function() {
        sassProcess.kill();
        process.exit();
    });

};
