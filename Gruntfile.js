module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        clean: {
            dist: {
                src: ['build/*']
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
                    var files = grunt.file.readJSON('build/static/js/all.json').files;
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
        }

    });

    // Load plugins
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('svgo-grunt');

    // Default task(s).
    grunt.registerTask('default', ['clean', 'copy', 'sass', 'concat', 'uglify', 'svgo']);

};