'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        connect: {
            options: {
                hostname: 'localhost',
                keepalive: true,
                livereload: 35729,
            },
            dest: {
                options: {
                    port: 8811,
                    base: ['dist']
                }
            }
        },
        clean: {
            dest: ['dist']
        },
        copy: {
            dest: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: 'src',
                    src: ['**/*', '**/*.html', '!js/*.js', '!**/*.less'],
                    dest: 'dist',
                    filter: 'isFile'
                }]
            }
        },
        babel: {
            options: {
                sourceMap: false,
                // presets: ['babel-preset-es2015'],
                presets: ['minify']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src/js',
                    src: ['{,*/}*.js'],
                    dest: 'dist/js'
                },
                { 'dist/app.js': 'src/app.js' }]
            }
        },
        less: {
            css: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: 'src/less',
                    src: ['{,*/}*.less', '!{,*/}global.less', '!module/*.less'],
                    dest: 'dist/css',
                    ext: '.css'
                }]
            }
        },
        cssmin: {
            css: {
                files: [{
                    expand: true,
                    cwd: 'dist/css',
                    src: ['**/*.css'],
                    dest: 'dist/css'
                }]
            }
        }
    });

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.registerTask('default', [
        'clean',
        'copy',
        'babel',
        'less',
        'cssmin',
        'connect'
    ]);
};