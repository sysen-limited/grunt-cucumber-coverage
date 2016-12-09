class Calculate {
    sum(a, b) {
        return a + b;
    }

    diff(a, b) {
        return a - b;
    }

    times(a, b) {
        return a * b;
    }

    square(a) {
        return Math.pow(a, 2);
    }

    root(a) {
        return Math.sqrt(a);
    }
}

module.exports = Calculate;
