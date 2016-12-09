module.exports = function (grunt) {

    grunt.initConfig({

        // CLEAN UP COVERAGE OUTPUT DIRECTORY
        clean: {
            src: 'coverage'
        },

        // CODE STANDARDS
        eslint: {
            options: {
                config: '.eslintrc.json'
            },
            target: ['gruntfile.js', 'tasks/**/*.js', 'example/**/*.js']
        },

        // EXAMPLES
        cucumber_coverage: {
            exampleOne: {
                src: 'example/features',
                options: {
                    print: 'detail',
                    tags: ['@Shapes'],
                    target: 'example/src'
                }
            },
            exampleTwo: {
                src: 'example/features',
                options: {
                    check: {
                        lines: 100,
                        statements: 100,
                        functions: 100,
                        branches: 100,
                        force: true
                    },
                    format: 'progress',
                    print: 'detail',
                    report: 'lcovonly',
                    steps: 'example/features/step_definitions',
                    tags: ['~@Ignore'],
                    target: 'example/src'
                }
            }
        }
    });

    require('load-grunt-tasks')(grunt, { scope: 'devDependencies' });

    grunt.loadTasks('tasks');

    grunt.registerTask('test', ['default']);

    grunt.registerTask('default', ['clean', 'eslint', 'cucumber_coverage']);

};
