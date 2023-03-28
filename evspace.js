
const Vector = require('./src/vector.js');
const Matrix = require('./src/matrix.js');
const Angles = require('./src/angles.js');
const { XYZ, XZY, YXZ, YZX, ZXY, ZYX, XYX,
    XZX, YXY, YZY, ZXZ, ZYZ } = require('./src/order.js');
const { getMatrixAxis, getMatrixEuler, getMatrixFromTo, rotateAxisTo,
    rotateAxisFrom, rotateEulerTo, rotateAxisFrom, rotateEulerTo,
    rotateEulerFrom, rotateMatrixTo, rotateMatrixFrom, rotateOffsetTo,
    rotateOffsetFrom } = require('./src/rotation.js');
const ReferenceFrame = require('./src/refframe.js');

module.exports = { Vector, Matrix, Angles, XYZ, XZY, YXZ, YZX, ZXY, ZYX, XYX, XZX,
    YXY, YZY, ZXZ, ZYZ, getMatrixAxis, getMatrixEuler, getMatrixFromTo, rotateAxisTo,
    rotateAxisFrom, rotateEulerTo, rotateAxisFrom, rotateEulerTo, rotateEulerFrom,
    rotateMatrixTo, rotateMatrixFrom, rotateOffsetTo, rotateOffsetFrom, ReferenceFrame };