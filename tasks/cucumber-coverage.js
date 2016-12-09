const path = require('path');

module.exports = function (grunt) {

    let executeCoverage = (grunt, features, options) => {
        return new Promise((resolve, reject) => {
            let target = grunt.option('target') || options.target;
            let format = grunt.option('format') || options.format;
            let print = grunt.option('print') || options.print;
            let report = grunt.option('report') || options.report;
            let steps = grunt.option('steps') || options.steps;
            let tags = grunt.option('tags') || options.tags;

            if (!features.length) {
                return grunt.log.error('No feature files found.');
            }

            let args = ['node_modules/.bin/istanbul', 'cover'];

            args.push('--root', target);

            args.push('--print', print || 'summary');

            args.push('--report', report || 'lcov');

            args.push('node_modules/.bin/cucumber-js', '--', [...features.filter((feature) => grunt.file.exists(feature))]);

            args.push('--require', steps || path.join(grunt.file.isDir(features[0]) ? features[0] : '', 'step_definitions'));

            args.push('--format', format || 'pretty');

            if(tags) {
                if(tags instanceof Array) {
                    tags.forEach((tag) => {
                        args.push('--tags', tag);
                    });
                } else {
                    args.push('--tags', tags);
                }
            }

            let spawn = grunt.util.spawn({
                cmd: process.execPath,
                args: args,
                opts: {
                    env: process.env
                }
            }, (err) => {
                if (err) {
                    reject(new Error('Feature execution failures have occurred, please fix failing tests.'));
                } else {
                    resolve('Coverage report created.');
                }
            });

            spawn.stdout.pipe(process.stdout);
        });
    };

    let executeCheck = (grunt, check, options) => {
        return new Promise((resolve, reject) => {
            let tags = grunt.option('tags') || options.tags;

            let args = ['node_modules/.bin/istanbul', 'check-coverage'];

            args.push('--lines', check.lines || 80);

            args.push('--statements', check.statements || 80);

            args.push('--functions', check.functions || 80);

            args.push('--branches', check.branches || 80);

            grunt.util.spawn({
                cmd: process.execPath,
                args: args,
                opts: {
                    env: process.env
                }
            }, (err) => {
                if (err) {
                    if(tags && !check.force) {
                        grunt.log.warn('Coverage threshold not reached.');
                        resolve('Threshold checking ignored while using tags.');
                    } else {
                        reject(err);
                    }
                } else {
                    resolve('Coverage threshold successful.');
                }
            });
        });
    };

    grunt.registerMultiTask('cucumber_coverage', 'Execute cucumber with coverage', function () {
        const done = this.async();

        const features = this.filesSrc;
        const options = this.options();

        let check = grunt.option('check') || options.check;

        executeCoverage(grunt, features, options)
            .then((err) => check ? executeCheck(grunt, check, options) : err)
            .then((result) => {
                grunt.log.ok(result);
                done(true);
            })
            .catch((err) => {
                grunt.log.error(err.message);
                done(false);
            });
    });
};
