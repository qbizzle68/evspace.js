(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.EVSpace = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const { Vector, Matrix } = require('./src/types.js');
const { Angles } = require('./src/angles.js');
const { Order, Axis, XYZ, XZY, YXZ, YZX, ZXY, ZYX, XYX,
    XZX, YXY, YZY, ZXZ, ZYZ } = require('./src/order.js');
const { getMatrixAxis, getMatrixEuler, getMatrixFromTo, rotateAxisTo,
    rotateAxisFrom, rotateEulerTo, rotateEulerFrom, rotateMatrixTo,
    rotateMatrixFrom, rotateOffsetTo, rotateOffsetFrom } = require('./src/rotation.js');
const { ReferenceFrame } = require('./src/refframe.js');

module.exports = { Vector, Matrix, Angles, Order, Axis, XYZ, XZY, YXZ, YZX, ZXY,
    ZYX, XYX, XZX, YXY, YZY, ZXZ, ZYZ, getMatrixAxis, getMatrixEuler,
    getMatrixFromTo, rotateAxisTo, rotateAxisFrom, rotateEulerTo,
    rotateEulerFrom, rotateMatrixTo, rotateMatrixFrom,
    rotateOffsetTo, rotateOffsetFrom, ReferenceFrame };
},{"./src/angles.js":2,"./src/order.js":3,"./src/refframe.js":4,"./src/rotation.js":5,"./src/types.js":6}],2:[function(require,module,exports){
class Angles {
    #alpha;
    #beta;
    #gamma;

    constructor(alpha, beta, gamma) {
        if (isNaN(alpha)) {
            throw TypeError('alpha is not a number');
        }
        if (isNaN(beta)) {
            throw TypeError('beta is not a number');
        }
        if (isNaN(gamma)) {
            throw TypeError('gamma is not a number');
        }

        this.#alpha = alpha;
        this.#beta = beta;
        this.#gamma = gamma;
    }

    get alpha() {
        return this.#alpha;
    }

    get beta() {
        return this.#beta;
    }

    get gamma() {
        return this.#gamma;
    }

    set alpha(val) {
        if (isNaN(val)) {
            throw TypeError('value is not a number');
        }

        this.#alpha = val;
    }

    set beta(val) {
        if (isNaN(val)) {
            throw TypeError('value is not a number');
        }

        this.#beta = val;
    }

    set gamma(val) {
        if (isNaN(val)) {
            throw TypeError('value is not a number');
        }
        
        this.#gamma = val;
    }

    toString(places=-1, degrees=false) {
        let a, b, c;
        if (degrees) {
            a = this.#alpha * 180 / Math.PI;
            b = this.#beta * 180 / Math.PI;
            c = this.#gamma * 180 / Math.PI;
        } else {
            a = this.#alpha;
            b = this.#beta;
            c = this.#gamma;
        }
        if (places >= 0) {
            a = a.toFixed(places);
            b = b.toFixed(places);
            c = c.toFixed(places);
        }
        return `[ ${a}, ${b}, ${c} ]`;
    }

    toObject() {
        return {alpha: this.#alpha, beta: this.#beta, gamma: this.#gamma};
    }
}

module.exports.Angles = Angles;

},{}],3:[function(require,module,exports){
class Order {
    #first = Axis.X_AXIS;
    #second = Axis.Y_AXIS;
    #third = Axis.Z_AXIS;

    constructor(first, second, third) {
        if (!(first instanceof Axis.Direction)) {
            throw TypeError('first axis is not an Axis.Direction');
        }
        else if (!(second instanceof Axis.Direction)) {
            throw TypeError('second axis is not an Axis.Direction');
        }
        else if (!(third instanceof Axis.Direction)) {
            throw TypeError('third axis is not an Axis.Direction');
        }

        this.#first = first;
        this.#second = second;
        this.#third = third;
    }

    get first() {
        return this.#first;
    }

    get second() {
        return this.#second;
    }

    get third() {
        return this.#third;
    }

    get(index) {
        if (isNaN(index)) {
            throw TypeError('index is not a number');
        }
        if (index == 0) {
            return this.#first;
        } else if (index == 1) {
            return this.#second;
        } else if (index == 2) {
            return this.#third;
        }
        throw RangeError(`index is out of range (index = ${index})`);
    }

    toString() {
        const first = this.#first.toString();
        const second = this.#second.toString();
        const third = this.#third.toString();

        return `[${first}, ${second}, ${third}]`;
    }

    toObject() {
        return {first: this.#first.value(), second: this.#second.value(), third: this.#third.value()};
    }
}

class Axis {
    static Direction = class {
        #val
        constructor(val) {
            if (isNaN(val)) {
                throw TypeError('axis direction is not a number');
            }
            else if (val < 0 || val > 2) {
                throw RangeError(`axis direction is out of bounds (val = ${val})`);
            }
            this.#val = val;
        }

        value() {
            return this.#val;
        }

        toString() {
            if (this.#val == 0) {
                return 'X_AXIS';
            }
            else if (this.#val == 1) {
                return 'Y_AXIS';
            }
            else if (this.#val == 2) {
                return 'Z_AXIS';
            }
        }
    }

    static X_AXIS = new this.Direction(0);
    static Y_AXIS = new this.Direction(1);
    static Z_AXIS = new this.Direction(2);
}

const XYZ = new Order(Axis.X_AXIS, Axis.Y_AXIS, Axis.Z_AXIS);
const XZY = new Order(Axis.X_AXIS, Axis.Z_AXIS, Axis.Y_AXIS);
const YXZ = new Order(Axis.Y_AXIS, Axis.X_AXIS, Axis.Z_AXIS);
const YZX = new Order(Axis.Y_AXIS, Axis.Z_AXIS, Axis.X_AXIS);
const ZXY = new Order(Axis.Z_AXIS, Axis.X_AXIS, Axis.Y_AXIS);
const ZYX = new Order(Axis.Z_AXIS, Axis.Y_AXIS, Axis.X_AXIS);
const XYX = new Order(Axis.X_AXIS, Axis.Y_AXIS, Axis.X_AXIS);
const XZX = new Order(Axis.X_AXIS, Axis.Z_AXIS, Axis.X_AXIS);
const YXY = new Order(Axis.Y_AXIS, Axis.X_AXIS, Axis.Y_AXIS);
const YZY = new Order(Axis.Y_AXIS, Axis.Z_AXIS, Axis.Y_AXIS);
const ZXZ = new Order(Axis.Z_AXIS, Axis.X_AXIS, Axis.Z_AXIS);
const ZYZ = new Order(Axis.Z_AXIS, Axis.Y_AXIS, Axis.Z_AXIS);

module.exports.Order = Order;
module.exports.Axis = Axis;
module.exports.XYZ = XYZ;
module.exports.XZY = XZY;
module.exports.YXZ = YXZ;
module.exports.YZX = YZX;
module.exports.ZXY = ZXY;
module.exports.ZYX = ZYX;
module.exports.XYX = XYX;
module.exports.XZX = XZX;
module.exports.YXY = YXY;
module.exports.YZY = YZY;
module.exports.ZXZ = ZXZ;
module.exports.ZYZ = ZYZ;

},{}],4:[function(require,module,exports){
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

},{"./angles.js":2,"./order.js":3,"./rotation.js":5,"./types.js":6}],5:[function(require,module,exports){
const {Vector, Matrix} = require('./types.js');
const {Angles} = require('./angles.js');
const {Order, Axis} = require('./order.js');

function getMatrixAxis(axis, angle) {
    if (!(axis instanceof Axis.Direction)) {
        throw TypeError('axis is not an Axis.Direction');
    }
    if (isNaN(angle)) {
        throw TypeError('angle is not a number');
    }
    return _getRotationMatrix(axis, angle);
}

function getMatrixEuler(order, angles) {
    if (!(order instanceof Order)) {
        throw TypeError('order is not an Order type');
    }
    if (!(angles instanceof Angles)) {
        throw TypeError('angles is not an Angles type');
    }
    return _getEulerMatrix(order, angles);
}

function getMatrixFromTo(orderFrom, anglesFrom, orderTo, anglesTo) {
    if (!(orderFrom instanceof Order)) {
        throw TypeError('orderFrom is not an Order type');
    }
    if (!(orderTo instanceof Order)) {
        throw TypeError('orderTo is not an Order type');
    }
    if (!(anglesFrom instanceof Angles)) {
        throw TypeError('anglesFrom is not an Angles type');
    }
    if (!(anglesTo instanceof Angles)) {
        throw TypeError('anglesTo is not an Angles type');
    }

    return _getMatrixFromTo(orderFrom, anglesFrom, orderTo, anglesTo);
}

function rotateAxisTo(axis, angle, vector) {
    if (!(axis instanceof Axis.Direction)) {
        throw TypeError('axis is not an Axis.Direction');
    }
    if (isNaN(angle)) {
        throw TypeError('angle is not a number');
    }
    if (!(vector instanceof Vector)) {
        throw TypeError('vector is not a Vector');
    }

    const mat = _getRotationMatrix(axis, angle);
    return vector.multiply(mat);
}

function rotateAxisFrom(axis, angle, vector) {
    if (!(axis instanceof Axis.Direction)) {
        throw TypeError('axis is not an Axis.Direction');
    }
    if (isNaN(angle)) {
        throw TypeError('angle is not a number');
    }
    if (!(vector instanceof Vector)) {
        throw TypeError('vector is not a Vector');
    }

    const mat = _getRotationMatrix(axis, angle);
    return mat.multiply(vector);
}

function rotateEulerTo(order, angles, vector) {
    if (!(order instanceof Order)) {
        throw TypeError('order is not an Order');
    }
    if (!(angles instanceof Angles)) {
        throw TypeError('angles is not an Angles');
    }
    if (!(vector instanceof Vector)) {
        throw TypeError('vector is not a Vector');
    }

    const mat = _getEulerMatrix(order, angles);
    return vector.multiply(mat);
}

function rotateEulerFrom(order, angles, vector) {
    if (!(order instanceof Order)) {
        throw TypeError('order is not an Order');
    }
    if (!(angles instanceof Angles)) {
        throw TypeError('angles is not an Angles');
    }
    if (!(vector instanceof Vector)) {
        throw TypeError('vector is not a Vector');
    }

    const mat = _getEulerMatrix(order, angles);
    return mat.multiply(vector);
}

function rotateMatrixTo(matrix, vector) {
    if (!(matrix instanceof Matrix)) {
        throw TypeError('matrix is not a Matrix');
    }
    if (!(vector instanceof Vector)) {
        throw TypeError('vector is not a Vector');
    }

    return vector.multiply(matrix);
}

function rotateMatrixFrom(matrix, vector) {
    if (!(matrix instanceof Matrix)) {
        throw TypeError('matrix is not a Matrix');
    }
    if (!(vector instanceof Vector)) {
        throw TypeError('vector is not a Vector');
    }

    return matrix.multiply(vector);
}

function rotateOffsetTo(matrix, offset, vector) {
    if (!(matrix instanceof Matrix)) {
        throw TypeError('matrix is not a Matrix');
    }
    if (!(offset instanceof Vector)) {
        throw TypeError('offset is not a Vector');
    }
    if (!(vector instanceof Vector)) {
        throw TypeError('vector is not a Vector');
    }

    const relativeVector = vector.subtract(offset);
    return relativeVector.multiply(matrix);
}

function rotateOffsetFrom(matrix, offset, vector) {
    if (!(matrix instanceof Matrix)) {
        throw TypeError('matrix is not a Matrix');
    }
    if (!(offset instanceof Vector)) {
        throw TypeError('offset is not a Vector');
    }
    if (!(vector instanceof Vector)) {
        throw TypeError('vector is not a Vector');
    }

    const rotatedVector = matrix.multiply(vector);
    return rotatedVector.add(offset);
}

function _getXRotation(angle) {
    const cAngle = Math.cos(angle);
    const sAngle = Math.sin(angle);

    return new Matrix([[1, 0, 0], [0, cAngle, -sAngle], [0, sAngle, cAngle]]);
}

function _getYRotation(angle) {
    const cAngle = Math.cos(angle);
    const sAngle = Math.sin(angle);

    return new Matrix([[cAngle, 0, sAngle], [0, 1, 0], [-sAngle, 0, cAngle]]);
}

function _getZRotation(angle) {
    const cAngle = Math.cos(angle);
    const sAngle = Math.sin(angle);

    return new Matrix([[cAngle, -sAngle, 0], [sAngle, cAngle, 0], [0, 0, 1]]);
}

function _getRotationMatrix(axis, angle) {
    if (axis == Axis.X_AXIS) {
        return _getXRotation(angle);
    }
    else if (axis == Axis.Y_AXIS) {
        return _getYRotation(angle);
    }
    else if (axis == Axis.Z_AXIS) {
        return _getZRotation(angle);
    }
}

function _getEulerMatrix(order, angles) {
    let ans = _getRotationMatrix(order.first, angles.alpha);

    ans.multiplyEqual(_getRotationMatrix(order.second, angles.beta));
    ans.multiplyEqual(_getRotationMatrix(order.third, angles.gamma));
    return ans;
}

function __transposeInplace(mat) {
    const tmp = [mat.get(0, 1), mat.get(0, 2), mat.get(1, 2)];
    mat.set(0, 1, mat.get(1, 0));
    mat.set(0, 2, mat.get(2, 0));
    mat.set(1, 2, mat.get(2, 1));
    mat.set(1, 0, tmp[0]);
    mat.set(2, 0, tmp[1]);
    mat.set(2, 1, tmp[2]);
}

function _getMatrixFromTo(orderFrom, anglesFrom, orderTo, anglesTo) {
    const from = _getEulerMatrix(orderFrom, anglesFrom);
    const to = _getEulerMatrix(orderTo, anglesTo);
    
    __transposeInplace(to);
    return to.multiply(from);
}

module.exports.getMatrixAxis = getMatrixAxis
module.exports.getMatrixEuler = getMatrixEuler
module.exports.getMatrixFromTo = getMatrixFromTo
module.exports.rotateAxisTo = rotateAxisTo
module.exports.rotateAxisFrom = rotateAxisFrom
module.exports.rotateEulerTo = rotateEulerTo
module.exports.rotateEulerFrom = rotateEulerFrom
module.exports.rotateMatrixTo = rotateMatrixTo
module.exports.rotateMatrixFrom = rotateMatrixFrom
module.exports.rotateOffsetTo = rotateOffsetTo
module.exports.rotateOffsetFrom = rotateOffsetFrom

},{"./angles.js":2,"./order.js":3,"./types.js":6}],6:[function(require,module,exports){
class Vector {
    #data;

    constructor(x, y, z) {
        if ((x||false) && isNaN(x)) {
            throw TypeError('x component is not a number');
        }
        if ((y||false) && isNaN(y)) {
            throw TypeError('y component is not a number');
        }
        if ((z||false) && isNaN(z)) {
            throw TypeError('z component is not a number');
        }

        this.#data = [x || 0, y || 0, z || 0];
    }

    [Symbol.iterator]() {
        let _index = 0;
        let _data = this.#data;

        return {
            next() {
                return {value: _data[_index], done: !(_index++ in _data)};
            }
        };
    }

    add(rhs) {
        if (!(rhs instanceof Vector)) {
            throw TypeError('rhs is not a Vector');
        }
        return new Vector(this.#data[0] + rhs.#data[0],
                          this.#data[1] + rhs.#data[1],
                          this.#data[2] + rhs.#data[2]);
    }

    subtract(rhs) {
        if (!(rhs instanceof Vector)) {
            throw TypeError('rhs is not a Vector');
        }
        return new Vector(this.#data[0] - rhs.#data[0],
                          this.#data[1] - rhs.#data[1],
                          this.#data[2] - rhs.#data[2]);
    }

    multiply(rhs) {
        if (rhs instanceof Matrix) {
            const rtn = new Vector();
            for (let i = 0; i < 3; i++) {
                let sum = 0;
                for (let j = 0; j < 3; j++) {
                    sum += rhs.get(j, i) * this.#data[j];
                }
                rtn.#data[i] = sum;
            }
            return rtn;
        } else if (!isNaN(rhs)) {
            return new Vector(this.#data[0] * rhs,
                              this.#data[1] * rhs,
                              this.#data[2] * rhs);
        }
        throw TypeError('rhs is not a Matrix or number');
    }

    divide(rhs) {
        if (isNaN(rhs)) {
            throw TypeError('rhs is not a number');
        }
        return new Vector(this.#data[0] / rhs,
                          this.#data[1] / rhs,
                          this.#data[2] / rhs);
    }

    addEqual(rhs) {
        if (!(rhs instanceof Vector)) {
            throw TypeError('rhs is not a Vector');
        }
        this.#data[0] += rhs.#data[0];
        this.#data[1] += rhs.#data[1];
        this.#data[2] += rhs.#data[2];
        return this;
    }

    subtractEqual(rhs) {
        if (!(rhs instanceof Vector)) {
            throw TypeError('rhs is not a Vector');
        }
        this.#data[0] -= rhs.#data[0];
        this.#data[1] -= rhs.#data[1];
        this.#data[2] -= rhs.#data[2];
        return this;
    }

    multiplyEqual(rhs) {
        if (!isNaN(rhs)) {
            this.#data[0] *= rhs;
            this.#data[1] *= rhs;
            this.#data[2] *= rhs;
            return this;
        } else if (rhs instanceof Matrix) {
            let arr = Array.from(this.#data);
            for (let i = 0; i < 3; i++) {
                let sum = 0;
                for (let j = 0; j < 3; j++) {
                    sum += rhs.get(j, i) * arr[j];
                }
                this.#data[i] = sum;
            }
            return this;
        }
        throw TypeError('rhs is not a Matrix or number');
    }

    divideEqual(rhs) {
        if (isNaN(rhs)) {
            throw TypeError('rhs is not a number');
        }

        this.#data[0] /= rhs;
        this.#data[1] /= rhs;
        this.#data[2] /= rhs;

        return this;
    }

    negative() {
        return new Vector(-this.#data[0], -this.#data[1], -this.#data[2]);
    }

    get(index) {
        if (isNaN(index)) {
            throw TypeError('index is not a number');
        }
        if (index < 0 || index > 2) {
            throw RangeError(`index is out of bounds (index = ${index})`);
        }

        return this.#data[index];
    }

    set(index, value) {
        if (isNaN(index)) {
            throw TypeError('index is not a number');
        } else if (isNaN(value)) {
            throw TypeError('value is not a number');
        } else if (index < 0 || index > 2) {
            throw RangeError(`index is out of bounds (index=${index})`);
        }

        this.#data[index] = value;
    }

    magnitude() {
        return Math.sqrt(this.magnitude2());
    }

    magnitude2() {
        return this.#data[0] * this.#data[0]
             + this.#data[1] * this.#data[1]
             + this.#data[2] * this.#data[2];
    }

    normalize() {
        const mag = this.magnitude();

        this.#data[0] /= mag;
        this.#data[1] /= mag;
        this.#data[2] /= mag;
        return this;
    }

    toString(places = -1) {
        let x, y, z;
        if (places >= 0) {
            x = this.#data[0].toFixed(places);
            y = this.#data[1].toFixed(places);
            z = this.#data[2].toFixed(places);
        } else {
            x = this.#data[0];
            y = this.#data[1];
            z = this.#data[2];
        }
        return `[ ${x}, ${y}, ${z} ]`;
    }

    toArray() {
        return Array.from(this.#data);
    }

    toObject() {
        return { x: this.#data[0], y: this.#data[1], z: this.#data[2] };
    }

}

class Matrix {
    #data = Array(3).fill(new Array(3));

    constructor(arr) {
        if (arr == undefined) {
            this.#data = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
            return;
        } else {
            this.#data = [...Array(3)].map(e => Array(3));
        }
        if (arr.length != 3) {
            throw RangeError('arr must have 3 rows');
        }
        for (let i = 0; i < 3; i++) {
            if (arr[i].length != 3) {
                throw RangeError(`row ${i} must have 3 columns`);
            }
            for (let j = 0; j < 3; j++) {
                if ((arr[i][j] || false) && isNaN(arr[i][j])) {
                    throw TypeError(`element [${i}][${j}] is not a number`);
                }

                this.#data[i][j] = arr[i][j] || 0;
            }
        }
    }

    [Symbol.iterator]() {
        let _row = 0;
        let _data = this.#data;

        return {
            next: function() {
                return {value: _data[_row], done: !(_row++ in _data)}
            }
        }
    }

    add(rhs) {
        if (!(rhs instanceof Matrix)) {
            throw TypeError('rhs is not a Matrix');
        }
        const rtn = new Matrix();
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                rtn.#data[i][j] = this.#data[i][j] + rhs.#data[i][j];
            }
        }
        return rtn;
    }

    subtract(rhs) {
        if (!(rhs instanceof Matrix)) {
            throw TypeError('rhs is not a Matrix');
        }
        const rtn = new Matrix();
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                rtn.#data[i][j] = this.#data[i][j] - rhs.#data[i][j];
            }
        }
        return rtn;
    }

    multiply(rhs) {
        if (rhs instanceof Matrix) {
            let rtn = new Matrix();
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    let sum = 0;
                    for (let k = 0; k < 3; k++) {
                        sum += this.#data[i][k] * rhs.#data[k][j];
                    }
                    rtn.#data[i][j] = sum;
                }
            }
            return rtn;
        } else if (rhs instanceof Vector) {
            let rtn = new Vector();
            for (let i = 0; i < 3; i++) {
                let sum = 0;
                for (let j = 0; j < 3; j++) {
                    sum += this.#data[i][j] * rhs.get(j);
                }
                rtn.set(i, sum);
            }
            return rtn;
        } else if (!isNaN(rhs)) {
            let rtn = new Matrix();
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    rtn.#data[i][j] = this.#data[i][j] * rhs;
                }
            }
            return rtn;
        }
        throw TypeError('rhs is not a Matrix, Vector or number');
    }

    divide(rhs) {
        if (isNaN(rhs)) {
            throw TypeError('rhs is not a number');
        }
        let rtn = new Matrix();
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                rtn.#data[i][j] = this.#data[i][j] / rhs;
            }
        }
        return rtn;
    }

    addEqual(rhs) {
        if (!(rhs instanceof Matrix)) {
            throw TypeError('rhs is not a Matrix');
        }
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                this.#data[i][j] += rhs.#data[i][j];
            }
        }
        return this;
    }

    subtractEqual(rhs) {
        if (!(rhs instanceof Matrix)) {
            throw TypeError('rhs is not a Matrix');
        }
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                this.#data[i][j] -= rhs.#data[i][j];
            }
        }
        return this;
    }

    multiplyEqual(rhs) {
        if (rhs instanceof Matrix) {
            let arr = JSON.parse(JSON.stringify(this.#data));
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    let sum = 0;
                    for (let k = 0; k < 3; k++) {
                        sum += arr[i][k] * rhs.#data[k][j];
                    }
                    this.#data[i][j] = sum;
                }
            }
            return this;
        } else if (!isNaN(rhs)) {
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    this.#data[i][j] *= rhs;
                }
            }
            return this;
        }
        throw TypeError('rhs is not a Matrix or number');
    }

    divideEqual(rhs) {
        if (isNaN(rhs)) {
            throw TypeError('rhs is not a number');
        }
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                this.#data[i][j] /= rhs;
            }
        }
        return this;
    }

    negative() {
        let rtn = new Matrix();
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                rtn.#data[i][j] = -this.#data[i][j];
            }
        }
        return rtn;
    }

    get(row, col) {
        if (isNaN(row)) {
            throw TypeError('row index is not a number');
        } else if (isNaN(col)) {
            throw TypeError('column index is not a number');
        }
        if (row < 0 || row > 2) {
            throw RangeError(`row index out of bounds (row = ${row})`);
        } else if (col < 0 || col > 2) {
            throw RangeError(`column index out of bounds (col = ${col})`);
        }
        return this.#data[row][col];
    }

    set(row, col, val) {
        if (isNaN(row)) {
            throw TypeError('row index is not a number');
        } else if (isNaN(col)) {
            throw TypeError('column index is not a number');
        } else if (isNaN(val)) {
            throw TypeError('val is not a number');
        }
        if (row < 0 || row > 2) {
            throw RangeError(`row index out of bounds (row = ${row})`);
        } else if (col < 0 || col > 2) {
            throw RangeError(`column index out of bounds (col = ${col})`);
        }
        this.#data[row][col] = val;
    }

    toString(places = -1) {
        let strArray = [];
        for (let i = 0; i < 3; i++) {
            let x, y, z;
            if (places >= 0) {
                x = this.#data[i][0].toFixed(places);
                y = this.#data[i][1].toFixed(places);
                z = this.#data[i][2].toFixed(places);
            } else {
                x = this.#data[i][0];
                y = this.#data[i][1];
                z = this.#data[i][2];
            }
            strArray[i] = `[ ${x}, ${y}, ${z} ]`;
        }
        return `[${strArray[0]}\n${strArray[1]}\n${strArray[2]}]`;
    }

    toArray() {
        return JSON.parse(JSON.stringify(this.#data));
    }

    toObject() {
        return {r0: {c0: this.#data[0][0], c1: this.#data[0][1], c2: this.#data[0][2]},
                r1: {c0: this.#data[1][0], c1: this.#data[1][1], c2: this.#data[1][2]},
                r2: {c0: this.#data[2][0], c1: this.#data[2][1], c2: this.#data[2][2]}};
    }

}

module.exports.Vector = Vector;
module.exports.Matrix = Matrix;
},{}]},{},[1])(1)
});
