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

        svgo: {
            optimize: {
                files: 'build/**/*.svg'
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
        'svgo'
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

};