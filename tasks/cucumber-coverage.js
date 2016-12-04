module.exports = function (grunt) {

    grunt.registerMultiTask('cucumber_coverage', 'Execute cucumber with coverage', function () {
        const done = this.async();

        const features = this.filesSrc;
        const options = this.options();

        let coverage = grunt.option('coverage') || options.coverage;

        let args = ['node_modules/istanbul/lib/cli.js', 'cover'];

        args.push('--root', coverage);

        args.push('--print', 'summary');

        args = args.concat(['node_modules/.bin/cucumber-js']).concat(features.filter(Boolean));

        grunt.util.spawn({
            cmd: process.execPath,
            args: args,
            opts: {
                env: process.env
            }
        }, (err, result) => {
            console.info(result.stdout);
            done(err);
        });
    });
};
