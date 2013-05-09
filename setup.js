var exec = require('child_process').exec;

console.log('Installing dependencies...');

/**
 * Install Sass
 */
exec('gem install sass', function(err, stdout, stderr) {
    if (err) {
        console.log(stderr);
    } else {
        exec('sass -v', function(err, stdout, stderr) {
            console.log(stdout.replace(/\s+$/, '') + ' successfully installed.');
        });
    }
});

/**
 * Install Grunt CLI
 */
exec('npm install -g grunt-cli', function(err, stdout, stderr) {
    console.log(err ? stderr : 'Grunt CLI successfully installed.');
});