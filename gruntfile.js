module.exports = function (grunt) {

    grunt.initConfig({

        // CODE STANDARDS
        eslint: {
            options: {
                config: '.eslintrc.json'
            },
            target: ['gruntfile.js', 'tasks/**/*.js', 'example/**/*.js']
        },

        // EXAMPLES
        cucumber_coverage: {
            example: {
                files: {
                    cwd: 'example/features',
                    src: '**/*.feature'
                },
                options: {
                    coverage: 'example/src'
                }
            }
        }
    });

    require('load-grunt-tasks')(grunt, { scope: 'devDependencies' });

    grunt.loadTasks('tasks');

    grunt.registerTask('test', ['default']);

    grunt.registerTask('default', ['eslint', 'cucumber_coverage']);

};
