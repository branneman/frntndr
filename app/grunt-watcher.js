//
// Starts `grunt watcher` and keeps it running while node is active
//

'use strict';

var exec = require('child_process').exec;
var ansi = require('ansi-styles');

// Expose module
module.exports = gruntWatcher;

function gruntWatcher() {

    // Start grunt watcher (which in turn starts sass watcher and autoprefixer)
    var sassProcess = exec('grunt watcher', function(err, stdout, stderr) {
        if (err) {
            console.log(ansi.red[0], err, stderr, ansi.red[1]);
        }
        console.log(stdout);
    });

    // Exit watcher when node.js is getting killed
    process.on('SIGINT', function() {
        sassProcess.kill();
        process.exit();
    });

}
