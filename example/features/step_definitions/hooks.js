let exampleHooks = function () {

    this.World = require('../support/world').World;

    this.Before(function () {
        this.source = '../../src';
    });
};

module.exports = exampleHooks;
