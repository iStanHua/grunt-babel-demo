'use strict'

module.exports = function (grunt) {
    grunt.initConfig({
        connect: {
            options: {
                hostname: 'localhost',
                keepalive: true,
                livereload: 35729,
                open: true
            },
            dest: {
                options: {
                    port: 2018,
                    base: ['dist']
                }
            },
            build: {
                options: {
                    port: 2818,
                    base: ['build']
                }
            }
        },
        clean: {
            dest: ['dist', 'build'],
            build: ['dist']
        },
        copy: {
            dest: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: 'src',
                    src: ['**/*', '!less/**/*.less'],
                    dest: 'dist',
                    filter: 'isFile'
                }]
            },
            build: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: 'src',
                    src: ['**/*', '!less/**/*.less', '!pages/**/*.js'],
                    dest: 'build',
                    filter: 'isFile'
                }]
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
            build: {
                files: [{
                    expand: true,
                    cwd: 'dist',
                    src: ['**/*.css'],
                    dest: 'build'
                }]
            }
        },
        babel: {
            options: {
                sourceMap: false,
                presets: ['minify']
            },
            build: {
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: ['**/*.js', '!lib/**/*.js'],
                    dest: 'build'
                }]
            }
        },
        htmlmin: {
            options: {
                removeComments: true,
                collapseWhitespace: true
            },
            build: {
                files: [{
                    expand: true,
                    cwd: 'build',
                    src: ['**/*.html'],
                    dest: 'build'
                }]
            }
        },
        postcss: {
            options: {
                map: true,
                processors: [
                    require('autoprefixer')
                ]
            },
            dist: {
                src: 'dist/**/*.css'
            }
        }
    })

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks)

    grunt.registerTask('default', ['clean:dest'])

    return grunt.registerTask('server', function (target) {
        if (target !== 'dest') {
            return grunt.task.run([
                'clean:dest',
                'less',
                'postcss',
                'copy:dest',
                'connect:dest'
            ])
        }
        else {
            return grunt.task.run([
                'clean:dest',
                'less',
                'postcss',
                'cssmin',
                'clean:build',
                'copy:build',
                'babel',
                'htmlmin',
                'connect:build'
            ])
        }
    })
}