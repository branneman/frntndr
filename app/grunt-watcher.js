var exec = require('child_process').exec,
    ansi = require('ansi-styles');

module.exports = function gruntWatcher() {

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

};
