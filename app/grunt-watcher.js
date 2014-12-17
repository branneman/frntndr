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
    var gruntProcess = exec('grunt watcher', function(err, stdout, stderr) {
        if (err) {
            console.log(ansi.red[0], err, stderr, ansi.red[1]);
        }
        console.log(stdout);
    });

    // Output data
    gruntProcess.stdout.pipe(process.stdout);
    gruntProcess.stderr.pipe(process.stderr);

    // Exit watcher when node.js is getting killed
    process.on('SIGINT', function() {
        gruntProcess.kill();
        process.exit();
    });

}
