const path = require('path');

module.exports = function (grunt) {

    let executeCoverage = (grunt, features, options) => {
        return new Promise((resolve, reject) => {
            let coverage = grunt.option('coverage') || options.coverage;
            let steps = grunt.option('steps') || options.steps;

            features = features.filter(Boolean);

            if (!features.length) {
                return grunt.log.error('No feature files found.');
            }

            let args = ['node_modules/istanbul/lib/cli.js', 'cover'];

            args.push('--root', coverage);

            args.push('--print', 'summary');

            args.push('node_modules/.bin/cucumber-js');

            args.push('--require', steps || path.join(grunt.file.isDir(features[0]) ? features[0] : '', 'step_definitions'));

            args = args.concat(features);

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

    let executeCheck = (grunt, check) => {
        return new Promise((resolve, reject) => {

            let args = ['node_modules/istanbul/lib/cli.js', 'check-coverage'];

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
                    reject(err);
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
            .then((err) => check ? executeCheck(grunt, check) : err)
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
