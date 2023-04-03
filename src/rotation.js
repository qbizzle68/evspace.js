const {Vector, Matrix} = require('./types.js');
const {Angles} = require('./angles.js');
const {Order, Axis} = require('./order.js');

function getMatrixAxis(axis, angle) {
    if (!(axis instanceof Axis.Direction)) {
        throw 'axis is not an Axis.Direction';
    }
    if (isNaN(angle)) {
        throw 'angle is not a number';
    }
    return _getRotationMatrix(axis, angle);
}

function getMatrixEuler(order, angles) {
    if (!(order instanceof Order)) {
        throw 'order is not an Order type';
    }
    if (!(angles instanceof Angles)) {
        throw 'angles is not an Angles type';
    }
    return _getEulerMatrix(order, angles);
}

function getMatrixFromTo(orderFrom, anglesFrom, orderTo, anglesTo) {
    if (!(orderFrom instanceof Order)) {
        throw 'orderFrom is not an Order type';
    }
    if (!(orderTo instanceof Order)) {
        throw 'orderTo is not an Order type';
    }
    if (!(anglesFrom instanceof Angles)) {
        throw 'anglesFrom is not an Angles type';
    }
    if (!(anglesTo instanceof Angles)) {
        throw 'anglesTo is not an Angles type';
    }

    return _getMatrixFromTo(orderFrom, anglesFrom, orderTo, anglesTo);
}

function rotateAxisTo(axis, angle, vector) {
    if (!(axis instanceof Axis.Direction)) {
        throw 'axis is not an Axis.Direction';
    }
    if (isNaN(angle)) {
        throw 'angle is not a number';
    }
    if (!(vector instanceof Vector)) {
        throw 'vector is not a Vector';
    }

    const mat = _getRotationMatrix(axis, angle);
    return vector.multiply(mat);
}

function rotateAxisFrom(axis, angle, vector) {
    if (!(axis instanceof Axis.Direction)) {
        throw 'axis is not an Axis.Direction';
    }
    if (isNaN(angle)) {
        throw 'angle is not a number';
    }
    if (!(vector instanceof Vector)) {
        throw 'vector is not a Vector';
    }

    const mat = _getRotationMatrix(axis, angle);
    return mat.multiply(vector);
}

function rotateEulerTo(order, angles, vector) {
    if (!(order instanceof Order)) {
        throw 'order is not an Order';
    }
    if (!(angles instanceof Angles)) {
        throw 'angles is not an Angles';
    }
    if (!(vector instanceof Vector)) {
        throw 'vector is not a Vector';
    }

    const mat = _getEulerMatrix(order, angles);
    return vector.multiply(mat);
}

function rotateEulerFrom(order, angles, vector) {
    if (!(order instanceof Order)) {
        throw 'order is not an Order';
    }
    if (!(angles instanceof Angles)) {
        throw 'angles is not an Angles';
    }
    if (!(vector instanceof Vector)) {
        throw 'vector is not a Vector';
    }

    const mat = _getEulerMatrix(order, angles);
    return mat.multiply(vector);
}

function rotateMatrixTo(matrix, vector) {
    if (!(matrix instanceof Matrix)) {
        throw 'matrix is not a Matrix';
    }
    if (!(vector instanceof Vector)) {
        throw 'vector is not a Vector';
    }

    return vector.multiply(matrix);
}

function rotateMatrixFrom(matrix, vector) {
    if (!(matrix instanceof Matrix)) {
        throw 'matrix is not a Matrix';
    }
    if (!(vector instanceof Vector)) {
        throw 'vector is not a Vector';
    }

    return matrix.multiply(vector);
}

function rotateOffsetTo(matrix, offset, vector) {
    if (!(matrix instanceof Matrix)) {
        throw 'matrix is not a Matrix';
    }
    if (!(offset instanceof Vector)) {
        throw 'offset is not a Vector';
    }
    if (!(vector instanceof Vector)) {
        throw 'vector is not a Vector';
    }

    const relativeVector = vector.subtract(offset);
    return relativeVector.multiply(matrix);
}

function rotateOffsetFrom(matrix, offset, vector) {
    if (!(matrix instanceof Matrix)) {
        throw 'matrix is not a Matrix';
    }
    if (!(offset instanceof Vector)) {
        throw 'offset is not a Vector';
    }
    if (!(vector instanceof Vector)) {
        throw 'vector is not a Vector';
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
    else {
        throw `axis enumeration value ${axis} must be in [0-2]`;
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

// module.exports = { getMatrixAxis, getMatrixEuler, getMatrixFromTo, rotateAxisTo,
//     rotateAxisFrom, rotateEulerTo, rotateAxisFrom, rotateEulerTo, rotateEulerFrom,
//     rotateMatrixTo, rotateMatrixFrom, rotateOffsetTo, rotateOffsetFrom }
