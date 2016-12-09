# Cucumber Coverage

[![Build Status](https://travis-ci.org/sysen-limited/grunt-cucumber-coverage.svg?branch=master)](https://travis-ci.org/sysen-limited/grunt-cucumber-coverage)

Coverage reporting for Node projects using Cucumber with Grunt.

This project is aimed at those using Cucumber to execute tests and need to gain coverage information,
while coverage reporters are available for use with tools like Selenium and Protractor this is aimed at those running Node tests without a browser.
Both ES5 and ES6 code bases have been tested to ensure current practices are supported.

Runs your tests by executing feature files with [cucumber](https://github.com/cucumber/cucumber-js) and gathers coverage information of source code with [istanbul](https://github.com/gotwarlost/istanbul).

## Getting Started

Get the project as a dependency;

```
npm install --save-dev grunt-cucumber-coverage
```

Add the task to your gruntfile script;

```
grunt.loadNpmTasks('grunt-cucumber-coverage');
```

> Tip:  
> We recommend when using grunt to use the project [load-grunt-tasks](https://www.github.com/sindresorhus/load-grunt-tasks) to simplify your inclusion of grunt task dependencies.

## Usage Examples

```
cucumber_coverage: {
    example: {
        src: 'example/features',                            // folder to the tests to execute
        options: {
            coverage: 'example/src',                        // target source code to perform coverage of
            check: {                                        // check coverage meets minimum requirements of project
                lines: 100,
                statements: 100,
                functions: 100,
                branches: 100                               // all are percentages to use during checks
            },
            format: 'pretty',                               // showing output of feature execution (default: pretty)
            print: 'detail',                                // display results of coverage to console (default: summary)
            report: 'html',                                 // generate a coverage report (default: lcov)
            steps: 'example/features/step_definitions',     // location of step definitions to support feature tests
            tags: '~@Ignore'                                // Any tags you might want to limit / exclude from running
        }
    }
}

grunt.registerTask('test', ['cucumber_coverage']);
```

> Note:  
> The **src** value should be set to the location of your cucumber / feature files.

## Options

### options.check
This enables coverage checking of thresholds, if set to true then default values are used.

Type: `Object` or `Boolean`
Default: `false`

| key | default |
| :--- | :--- |
| lines | 80 |
| statements | 80 |
| functions | 80 |
| branches | 80 |

This equates to the `--lines` `--statements` `--functions` `--branches` options for istanbul check-coverage.

> Hint:  
> You can also change just individual keys if required and defaults will be used for others.

> Note:  
> The default **false** value will mean that coverage levels are not checked and low coverage will not result in a grunt error.

### options.coverage
This is the source code folder for which coverage reporting will be made.

Type: `String`  
Default: `null`

This equates to the `--root` option for istanbul coverage.

### options.format
Execution report of the features which are passing or failing.

Type: `String`  
Default: `pretty`

Options for formatting are;

> `pretty` - show feature execution as it occurs with each step occurring  
> `progress` - displays a single character to signify a pass or failure of each scenario step executed  
> `json` - outputs a json formatted data as the results of feature execution  
> `summary` - provides a summary of execution only after all features and scenarios have completed

This equates to the `--reporter` option for cucumber.

### options.print
Results of the coverage shown in stdout (console) after feature execution completes.

Type: `String`  
Default: `summary`

Options for formatting are;

> `none` - do not provide any coverage information  
> `summary` - show just to total coverage percentages for all source files  
> `detail` - information about every source file with coverage details  
> `both` - shows both the detail output followed by the summary result

This equates to the `--print` option for istanbul coverage.

### options.report
Select the output format of test coverage report to be produced.

Type: `String`
Default: `lcov`

Options for the report are;

> `html` - creates HTML files with annotations for source code covered  
> `lcovonly` - creates only an lcov.info file as output  
> `lcov` - generates both the HTML and lcov.info reports  
> `cobertura` - create a cobertura-coverage.xml report to use with Hudson CI  
> `text-summary` - a simple text summary of the coverage result, output is to stdout (console)  
> `text` - a more detailed text report showing information about all source files covered  
> `teamcity` - generates a series of message used by Team City for coverage reporting

This equates to the `--report` option for istanbul coverage.

### options.steps
Specify where step definitions are located from project root directory.

Type: `String`  
Default: `<src>/step_definitions`

This equates to the `--require` option for cucumber.

### options.tags
Run just a specific tag or tags for a feature file set.

Type: `String` or `Array`  
Default: `null`

This equates to the `--tags` option for cucumber.

> Hint:  
> Run just one tag `@tag`  
> Run several tags `@tag,@special`  
> Exclude a tag `~@ignore`  
> Run a mix `['@tag,@special', '~@ignore']`

## License

Apache 2.0 © [Sysen Limited](http://www.sysen.co.uk)
