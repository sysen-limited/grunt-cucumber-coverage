const path = require('path');

class World {
    set source(src) {
        this.src = src;
    }

    get source() {
        return this.src;
    }

    set module(target) {
        let script = path.join(__dirname, this.src, target);
        this.target = require(script);
    }

    get module() {
        return this.target;
    }

    set result(res) {
        this.res = res;
    }

    get result() {
        return this.res;
    }
}

module.exports.World = World;
