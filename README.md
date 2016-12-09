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
> We recommend using the project [load-grunt-tasks](https://www.github.com/sindresorhus/load-grunt-tasks) to simplify your inclusion of grunt task dependencies.

## Usage

Below is an example of the plugin being used and the outputs it provides, you can also see the code in the example folder of this project and it will run if tryng this project locally.

### Gruntfile example

The minimum required configuration to use this plugin with a standard project using a cucumber setup may look like this.

```javascript
cucumber_coverage: {
    example: {
        src: 'example/features',
        options: {
            target: 'example/src'
        }
    }
}
```

This gruntfile implementation shows all the possible options we currently support being configured for execution, this allows for more custom implementations of cucumber being used in a project.

```javascript
cucumber_coverage: {
    example: {
        src: 'example/features',                            // folder to the tests to execute
        options: {
            coverage: 'logs/coverage',                      // set where coverage reports will be stored in relation to gruntfile
            check: {                                        // check coverage meets minimum requirements of project
                lines: 100,
                statements: 100,
                functions: 100,
                branches: 100,                              // all coverage levels are percentages to use during checks
                force: true                                 // when using tags checking is not performed, set force to still check coverage levels
            },
            format: 'pretty',                               // showing output of feature execution (default: pretty)
            print: 'detail',                                // display results of coverage to console (default: summary)
            report: 'html',                                 // generate a coverage report (default: lcov)
            steps: 'example/features/step_definitions',     // location of step definitions to support feature tests
            tags: '~@Ignore',                               // Any tags you might want to limit / exclude from running
            target: 'example/src'                           // target source code to perform coverage of
        }
    }
}

grunt.registerTask('test', ['cucumber_coverage']);
```

> Note:  
> The **src** value should be set to the location of your cucumber / feature files.

### Report output (console)

This is the output captured when running the `exampleOne` task in this projects gruntfile. It does not perform coverage checking and mostly uses default settings.

```
$ grunt
 Running "clean:src" (clean) task
 >> 1 path cleaned.
 
 Running "eslint:target" (eslint) task
 
 Running "cucumber_coverage:exampleOne" (cucumber_coverage) task
 @Shapes
 Feature: Example tests for shapes script
 
   @Shapes @Run
   Scenario: This tests our area calculation for a square
   ✔ Given I have a script called "shapes.js"
   ✔ When I call the "areaSquare" method with value 10
   ✔ Then The result should be 100
 
   @Shapes @Run
   Scenario: This tests our area calculation for a square
   ✔ Given I have a script called "shapes.js"
   ✔ When I call the "areaRectangle" method with values 10 and 20
   ✔ Then The result should be 200
 
   @Shapes @Run
   Scenario: This tests our area calculation for a square
   ✔ Given I have a script called "shapes.js"
   ✔ When I call the "pythagoras" method with values 3 and 4
   ✔ Then The result should be 5
 
 3 scenarios (3 passed)
 9 steps (9 passed)
 0m00.021s
 
 ---------------|----------|----------|----------|----------|----------------|
 File           |  % Stmts | % Branch |  % Funcs |  % Lines |Uncovered Lines |
 ---------------|----------|----------|----------|----------|----------------|
  src/          |    94.12 |      100 |     87.5 |    94.12 |                |
   calculate.js |    83.33 |      100 |       80 |    83.33 |              7 |
   shapes.js    |      100 |      100 |      100 |      100 |                |
 ---------------|----------|----------|----------|----------|----------------|
 All files      |    94.12 |      100 |     87.5 |    94.12 |                |
 ---------------|----------|----------|----------|----------|----------------|
 
 >> Coverage report created.
```

### Report output (html)

The following are some screenshots from the HTML produced report for the above tests being executed.

![html-report](https://cloud.githubusercontent.com/assets/773633/21051809/ca2ac38c-be19-11e6-9e72-7811e2fcb73c.png)

## Options

### options.coverage
This allows for setting the coverage output directory location for reports to be generated. Helpful for running multiple coverage reports or wanting a single location for all temporary assets in a project.

Type: `String`  
Default: `coverage`

This equates to the `--dir` option for istanbul coverage.

### options.check
This enables coverage checking of thresholds, if set to true then default values are used.

Type: `Object` or `Boolean`  
Default: `false`

> Note:  
> The default **false** value will mean that coverage levels are not checked and low coverage will not result in a grunt error.

When using `true` and not an object then the following defaults are used;

> `check.lines` - 80  
> `check.statements` - 80  
> `check.functions` - 80  
> `check.branches` - 80

In addition you can specify `check.force` to be `true`. When this is set coverage checking will always occur even when using tags that might lower coverage levels.

This equates to the `--lines` `--statements` `--functions` `--branches` options for istanbul check-coverage.

> Hint:  
> You can also change just individual keys if required and defaults will be used for others.

### options.format
Execution report of the features which are passing or failing.

Type: `String`  
Default: `pretty`

This equates to the `--format` option for cucumber.

> Options are:  
> `pretty` - show feature execution as it occurs with each step occurring  
> `progress` - displays a single character to signify a pass or failure of each scenario step executed  
> `json` - outputs a json formatted data as the results of feature execution  
> `summary` - provides a summary of execution only after all features and scenarios have completed

### options.print
Results of the coverage shown in stdout (console) after feature execution completes.

Type: `String`  
Default: `summary`

This equates to the `--print` option for istanbul coverage.

> Options are:  
> `none` - do not provide any coverage information  
> `summary` - show just to total coverage percentages for all source files  
> `detail` - information about every source file with coverage details  
> `both` - shows both the detail output followed by the summary result

### options.report
Select the output format of test coverage report to be produced.

Type: `String`  
Default: `lcov`

This equates to the `--report` option for istanbul coverage.

> Options are:  
> `html` - creates HTML files with annotations for source code covered  
> `lcovonly` - creates only an lcov.info file as output  
> `lcov` - generates both the HTML and lcov.info reports  
> `cobertura` - create a cobertura-coverage.xml report to use with Hudson CI  
> `text-summary` - a simple text summary of the coverage result, output is to process.stdout (console)  
> `text` - a more detailed text report showing information about all source files covered  
> `teamcity` - generates a series of message used by Team City for coverage reporting

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

### options.target
This is the source code folder for which any coverage reporting will be made.

Type: `String`  
Default: `null`

This equates to the `--root` option for istanbul coverage.

## License

Apache 2.0 © [Sysen Limited](http://www.sysen.co.uk)
