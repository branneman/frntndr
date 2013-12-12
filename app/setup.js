//
// Install Sass & Grunt CLI if it's not installed yet
//

'use strict';

var exec = require('child_process').exec;
var existsInPath = require('node-fs-exists-in-path');

console.log('Installing Sass and Grunt CLI. This will take a while!');

// Install Sass
existsInPath('sass', function(exists) {

    if (exists) {
        return console.log('Sass seems to be already installed, skipping installation.');
    }

    exec('gem install sass --pre', function(err, stdout, stderr) {
        if (err) {
            console.log(stderr);
        } else {
            exec('sass -v', function(err, stdout) {
                console.log(stdout.replace(/\s+$/, '') + ' successfully installed.');
            });
        }
    });
});

// Install Grunt CLI
existsInPath('grunt', function(exists) {

    if (exists) {
        return console.log('grunt-cli seems to be already globally installed, skipping installation.');
    }

    exec('npm i -g grunt-cli', function(err, stdout, stderr) {
        console.log(err ? stderr : 'Grunt CLI successfully installed.');
    });
});
