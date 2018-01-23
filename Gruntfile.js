'use strict'

module.exports = function (grunt) {
    grunt.initConfig({
        connect: {
            options: {
                hostname: 'localhost',
                // keepalive: true,
                livereload: true,
                open: true
            },
            dest: {
                options: {
                    port: 666,
                    base: ['dist']
                }
            },
            build: {
                options: {
                    port: 888,
                    base: ['build']
                }
            }
        },
        watch: {
            options: {
                livereload: true
            },
            dest: {
                files: ['src/**/*.html', 'src/**/*.js', 'src/**/*.less', 'src/images/**/*.{png,jpg,jpeg,gif,webp}'],
                tasks: ['clean:dest', 'less', 'postcss', 'merge:dest', 'copy:dest']
            },
            build: {
                files: ['src/**/*.html', 'src/**/*.js', 'src/**/*.less', 'src/images/**/*.{png,jpg,jpeg,gif,webp}'],
                tasks: ['clean:dest', 'less', 'postcss', 'cssmin', 'merge:build', 'clean:build', 'copy:build', 'babel', 'htmlmin']
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
                    src: ['**/*', '!**/*.less', '!**/*.js'],
                    dest: 'dist',
                    filter: 'isFile'
                }]
            },
            build: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: 'src',
                    src: ['**/*', '!**/*.less', '!**/*.js'],
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
                    cwd: 'src',
                    src: ['**/*.less', '!less/global.less', '!less/base.less', '!less/animation.less', '!less/module/*.less'],
                    dest: 'dist',
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
        merge: {
            options: {
                target: ['src/js/mrem.js', 'src/js/game.js', 'src/js/slider.js']
            },
            dest: {
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: ['**/*.js', '!js/**/*.js'],
                    dest: 'dist'
                }]
            },
            build: {
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: ['**/*.js', '!js/**/*.js'],
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
                    cwd: 'build',
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

    grunt.event.on('watch', function (action, filepath, target) {
        grunt.log.writeln(target + ': ' + filepath + ' has ' + action)
    })

    grunt.registerMultiTask('merge', 'merge javascript file', function () {
        let _count = 0
        let mergeCode = ''
        let options = this.options({
            target: '',
            separate: ';'
        })
        let _target = options.target

        if (typeof _target === 'string') {
            mergeCode = grunt.file.read(_target) + options.separate
        }
        else if (Object.prototype.toString.call(_target) === '[object Array]') {
            _target.forEach(function (item) {
                mergeCode += grunt.file.read(item) + options.separate
            })
        }

        this.files.forEach(function (f) {
            let fileList = f.src.filter(function (filepath) {
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file "' + filepath + '" not found.')
                    return false
                } else {
                    return true
                }

            }).map(function (filepath) {
                let srcCode = grunt.file.read(filepath)
                grunt.file.write(f.dest, mergeCode + srcCode);
                grunt.log.oklns('File ' + f.dest + ' created.');
                _count++;
            });
        });
        grunt.log.oklns(_count + ' files created.');
    })

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks)

    grunt.registerTask('default', ['clean:dest'])


    return grunt.registerTask('server', function (target) {
        if (target !== 'dest') {
            return grunt.task.run([
                'clean:dest',
                'less',
                'postcss',
                'merge:dest',
                'copy:dest',
                'connect:dest',
                'watch:dest'
            ])
        }
        else {
            return grunt.task.run([
                'clean:dest',
                'less',
                'postcss',
                'merge:build',
                'cssmin',
                'clean:build',
                'copy:build',
                'babel',
                'htmlmin',
                'connect:build',
                'watch:build'
            ])
        }
    })
}