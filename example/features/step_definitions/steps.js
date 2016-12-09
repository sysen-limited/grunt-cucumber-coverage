let exampleSteps = function () {

    const expect = require('chai').expect;
    this.World = require('../support/world').World;

    this.Given(/^I have a script called "([^"]*)"$/, function (script, callback) {
        this.module = script;
        callback();
    });

    this.When(/^I call the "([^"]*)" method with value (\d+)$/, function (method, argA, callback) {
        let instance = new this.module();
        this.result = instance[method].call(this, parseInt(argA));
        callback();
    });

    this.When(/^I call the "([^"]*)" method with values (\d+) and (\d+)$/, function (method, argA, argB, callback) {
        let instance = new this.module();
        this.result = instance[method].call(this, parseInt(argA), parseInt(argB));
        callback();
    });

    this.Then(/^The result should be (\d+)$/, function (check, callback) {
        expect(this.result).to.equal(parseInt(check));
        callback();
    });
};

module.exports = exampleSteps;
