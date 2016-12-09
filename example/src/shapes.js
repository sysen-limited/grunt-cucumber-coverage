const Calculate = require('./calculate');

class Shapes {
    areaSquare(a) {
        const calculator = new Calculate();
        return calculator.times(a, a);
    }

    areaRectangle(a, b) {
        const calculator = new Calculate();
        return calculator.times(a, b);
    }

    pythagoras(a, b) {
        const calculator = new Calculate();

        let sideOne = calculator.square(a);
        let sideTwo = calculator.square(b);
        let sideThree = calculator.sum(sideOne, sideTwo);

        return calculator.root(sideThree);
    }
}

module.exports = Shapes;
