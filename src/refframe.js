import {Vector} from './vector.js';
import { getMatrixEuler, rotateOffsetFrom, rotateOffsetTo } from './rotation';
import Order from './order.js';
import Angles from './angles.js';

export default class ReferenceFrame {
    #order;
    #angles;
    #matrix;
    #offset;
    constructor(order, angles, offset='') {
        if (!(order instanceof Order)) {
            throw 'order is not an Order';
        }
        if (!(angles instanceof Angles)) {
            throw 'angles is not an Angles';
        }
        if (offset != '' && !(offset instanceof Vector)) {
            throw 'offset is not a Vector';
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
            throw 'angs is not an Angles';
        }

        this.#angles = angs;
        this.#matrix = getMatrixEuler(this.#order, angs);
    }

    set alpha(angle) {
        if (isNaN(angle)) {
            throw 'angle is not a number';
        }

        this.#angles.alpha = angle;
        this.#matrix = getMatrixEuler(this.#order, this.#angles);
    }

    set beta(angle) {
        if (isNaN(angle)) {
            throw 'angle is not a number';
        }

        this.#angles.beta = angle;
        this.#matrix = getMatrixEuler(this.#order, this.#angles);
    }

    set gamma(angle) {
        if (isNaN(angle)) {
            throw 'angle is not a number';
        }

        this.#angles.gamma = angle;
        this.#matrix = getMatrixEuler(this.#order, this.#angles);
    }

    set offset(vec) {
        if (!(vec instanceof Vector)) {
            throw 'vec is not a Vector';
        }

        this.#offset = vec;
    }

    rotateTo(vector) {
        if (!(vector instanceof Vector)) {
            throw 'vector is not a Vector';
        }

        if (this.#offset == '') {
            return vector.mult(this.#matrix);
        }
        else {
            return rotateOffsetTo(this.#matrix, this.#offset, vector);
        }
    }

    rotateFrom(vector) {
        if (!(vector instanceof Vector)) {
            throw 'vector is not a Vector';
        }

        if (this.#offset == '') {
            return this.#matrix.mult(vector);
        }
        else {
            return rotateOffsetFrom(this.#matrix, this.#offset, vector);
        }
    }

    rotateToFrame(frame, vector) {
        if (!(frame instanceof ReferenceFrame)) {
            throw 'frame is not a ReferenceFrame';
        }
        if (!(vector instanceof Vector)) {
            throw 'vector is not a Vector';
        }

        let tmp;
        if (this.#offset == '') {
            tmp = this.#matrix.mult(vector);
        }
        else {
            tmp = rotateOffsetFrom(this.#matrix, this.#offset, vector);
        }

        if (frame.#offset == '') {
            return tmp.mult(this.#matrix);
        }
        else {
            return rotateOffsetTo(frame.#matrix, from.#offset, tmp);
        }
    }

    rotateFromFrame(frame, vector) {
        if (!(frame instanceof ReferenceFrame)) {
            throw 'frame is not a ReferenceFrame';
        }
        if (!(vector instanceof Vector)) {
            throw 'vector is not a Vector';
        }

        let tmp;
        if (this.#offset == '') {
            tmp = frame.#matrix.mult(vector);
        }
        else {
            tmp = rotateOffsetFrom(frame.#matrix, frame.#offset, vector)
        }

        if (frame.#offset == '') {
            return this.#matrix.mult(tmp);
        }
        else {
            return rotateOffsetTo(this.#matrix, this.#offset, tmp);
        }
    }

}