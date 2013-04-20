module.exports = function(grunt) {

    var pkg = grunt.file.readJSON('package.json'),
        cfg = grunt.file.readJSON('config.json');

    // Project configuration.
    grunt.initConfig({

        pkg: pkg,

        clean: {
            'dir': {
                src: ['build/*']
            },
            'zip': {
                src: ['<%= pkg.name %>.zip']
            },
            'scss': {
                src: ['build/**/*.scss']
            },
            'js': {
                src: ['build/**/*.js', 'build/**/*.json', '!build/static/js/all.js']
            }
        },

        copy: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: ['**'],
                    dest: 'build'
                }]
            }
        },

        sass: {
            options: {
                style: 'compressed'
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'build/',
                    src: ['**/*.scss', '!**/_*.scss'],
                    dest: 'build/',
                    ext: '.css'
                }]
            }
        },

        concat: {
            dist: {
                src: (function() {
                    var files = grunt.file.readJSON('src/static/js/all.json').files;
                    for (var i = 0; i < files.length; i++) {
                        files[i] = 'build/static/js/' + files[i];
                    }
                    return files;
                }()),
                dest: 'build/static/js/all.js'
            }
        },

        uglify: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'build/',
                    src: ['**/*.js'],
                    dest: 'build/'
                }]
            }
        },

        compress: {
            dist: {
                options: {
                    archive: '<%= pkg.name %>.zip'
                },
                src: ['build/**']
            }
        },

        httpcopy: {
            options: {
                serverUrl: 'http://localhost:' + cfg.server.port + '/',
                urlMapper: function (serverUrl, filePath) {
                    return serverUrl + filePath.replace(/^src\/views\/pages\//, '');
                }
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src/views/pages/',
                    src: ['**/*.html'],
                    dest: 'build/'
                }]
            }
        },

        'ftp-deploy': {
            build: {
                auth: {
                    host: cfg.deploy.host,
                    port: cfg.deploy.port,
                    authKey: 'dtg'
                },
                src: 'build',
                dest: cfg.deploy.dest,
                exclusions: ['**/.DS_Store', '**/Thumbs.db', '**/.gitignore']
            }
        }

    });

    // Load plugins
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('svgo-grunt');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-ftp-deploy');

    // Default task
    grunt.registerTask('default', [
        'clean:dir',
        'copy',
        'sass',
        'clean:scss',
        'concat',
        'uglify',
        'clean:js',
        'httpcopy'
    ]);

    // Zip task.
    grunt.registerTask('zip', [
        'clean:zip',
        'compress'
    ]);

    // Deploy task.
    grunt.registerTask('deploy', [
        'ftp-deploy'
    ]);

    // Define httpcopy task
    grunt.registerMultiTask('httpcopy', 'HTTP copy.', function () {

        var path = require('path'),
            http = require('http'),
            done = this.async();

        // File path (relative) to url mapper
        var urlMapper = function (serverUrl, filePath) {
            return serverUrl + filePath;
        };

        // Set options
        var options = this.options({
            serverUrl: 'http://localhost/',
            urlMapper: urlMapper
        });

        // Iterate over all src-dest file pairs.
        grunt.util.async.forEach(this.files, function (filePair, filePairDone) {

            grunt.util.async.forEach(filePair.src, function (filePath, fileCopyDone) {

                var url = options.urlMapper(options.serverUrl, filePath),
                    urlColored = grunt.log.wordlist([url], {color: 'cyan'});

                http.get(url, function (response) {

                    if (response.statusCode != 200) {
                        grunt.log.warn('Got response code ' + response.statusCode + ' while trying to copy ' + urlColored + ' -> ' + filePair.dest.cyan);
                    }

                    var data = '';
                    response.setEncoding('binary');
                    response.on('data', function (chunk) {
                        data += chunk;
                    });

                    response.on('end', function () {
                        grunt.file.mkdir(path.dirname(filePair.dest));
                        grunt.file.write(filePair.dest, data);
                        grunt.log.writeln('Copied ' + urlColored + ' -> ' + filePair.dest.cyan);
                        fileCopyDone();
                    });

                    response.on('error', function (e) {
                        grunt.fail.warn('Got error: ' + e.message);
                        fileCopyDone(false);
                    });
                }).on('error', function(e) {
                        grunt.fail.warn('Got error: ' + e.message);
                        fileCopyDone(false);
                    });
            }, filePairDone);
        }, done);
    });

};