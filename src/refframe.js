const { Vector } = require('./types.js');
const { getMatrixEuler, rotateOffsetFrom, rotateOffsetTo } = require('./rotation.js');
const { Order } = require('./order.js');
const { Angles } = require('./angles.js');

class ReferenceFrame {
    #order;
    #angles;
    #matrix;
    #offset;
    constructor(order, angles, offset='') {
        if (!(order instanceof Order)) {
            throw TypeError('order is not an Order');
        }
        if (!(angles instanceof Angles)) {
            throw TypeError('angles is not an Angles');
        }
        if (offset != '' && !(offset instanceof Vector)) {
            throw TypeError('offset is not a Vector');
        }

        this.#order = order;
        this.#angles = angles;
        if (offset != '') {
            this.#offset = offset;
        }
        else {
            this.#offset = '';
        }
        this.#matrix = getMatrixEuler(order, angles);
    }
    // todo: make a .fromMatrix to derive a reference frame

    get order() {
        return this.#order;
    }

    get angles() {
        return this.#angles;
    }

    get matrix() {
        return this.#matrix;
    }

    get offset() {
        return this.#offset;
    }

    set angles(angs) {
        if (!(angs instanceof Angles)) {
            throw TypeError('angs is not an Angles');
        }

        this.#angles = angs;
        this.#matrix = getMatrixEuler(this.#order, angs);
    }

    set alpha(angle) {
        if (isNaN(angle)) {
            throw TypeError('angle is not a number');
        }

        this.#angles.alpha = angle;
        this.#matrix = getMatrixEuler(this.#order, this.#angles);
    }

    set beta(angle) {
        if (isNaN(angle)) {
            throw TypeError('angle is not a number');
        }

        this.#angles.beta = angle;
        this.#matrix = getMatrixEuler(this.#order, this.#angles);
    }

    set gamma(angle) {
        if (isNaN(angle)) {
            throw TypeError('angle is not a number');
        }

        this.#angles.gamma = angle;
        this.#matrix = getMatrixEuler(this.#order, this.#angles);
    }

    set offset(vec) {
        if (!(vec instanceof Vector)) {
            throw TypeError('vec is not a Vector');
        }

        this.#offset = vec;
    }

    rotateTo(vector) {
        if (!(vector instanceof Vector)) {
            throw TypeError('vector is not a Vector');
        }

        if (this.#offset == '') {
            return vector.multiply(this.#matrix);
        }
        else {
            return rotateOffsetTo(this.#matrix, this.#offset, vector);
        }
    }

    rotateFrom(vector) {
        if (!(vector instanceof Vector)) {
            throw TypeError('vector is not a Vector');
        }

        if (this.#offset == '') {
            return this.#matrix.multiply(vector);
        }
        else {
            return rotateOffsetFrom(this.#matrix, this.#offset, vector);
        }
    }

    rotateToFrame(frame, vector) {
        if (!(frame instanceof ReferenceFrame)) {
            throw TypeError('frame is not a ReferenceFrame');
        }
        if (!(vector instanceof Vector)) {
            throw TypeError('vector is not a Vector');
        }

        let tmp;
        if (this.#offset == '') {
            tmp = this.#matrix.multiply(vector);
        }
        else {
            tmp = rotateOffsetFrom(this.#matrix, this.#offset, vector);
        }

        if (frame.#offset == '') {
            return tmp.multiply(frame.#matrix);
        }
        else {
            return rotateOffsetTo(frame.#matrix, frame.#offset, tmp);
        }
    }

    rotateFromFrame(frame, vector) {
        if (!(frame instanceof ReferenceFrame)) {
            throw TypeError('frame is not a ReferenceFrame');
        }
        if (!(vector instanceof Vector)) {
            throw TypeError('vector is not a Vector');
        }

        let tmp;
        if (frame.#offset == '') {
            tmp = frame.#matrix.multiply(vector);
        }
        else {
            tmp = rotateOffsetFrom(frame.#matrix, frame.#offset, vector)
        }

        if (this.#offset == '') {
            return tmp.multiply(this.#matrix);
        }
        else {
            return rotateOffsetTo(this.#matrix, this.#offset, tmp);
        }
    }

}

module.exports.ReferenceFrame = ReferenceFrame;
