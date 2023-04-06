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