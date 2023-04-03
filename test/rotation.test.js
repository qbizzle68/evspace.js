const answers = require('./answers.json');
const { Vector, Matrix } = require('../src/types.js');
const { Angles } = require('../src/angles');
const { Order, Axis, XYZ, XZY, YXZ, YZX, ZXY, ZYX,
    XYX, XZX, YXY, YZY, ZXZ, ZYZ } = require('../src/order.js');
const { getMatrixAxis, getMatrixEuler, getMatrixFromTo, rotateAxisTo,
        rotateAxisFrom, rotateEulerTo, rotateEulerFrom,
        rotateMatrixTo, rotateMatrixFrom, rotateOffsetTo, rotateOffsetFrom } = require('../src/rotation');
const { ReferenceFrame } = require('../src/refframe.js');

const PIO4 = Math.PI / 4;

function getCloseMatrix(mat) {
    rtn = [...Array(3)].map(e => Array(3));
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            rtn[i][j] = expect.closeTo(mat[i][j], 5);
        }
    }
    return rtn;
}

function getCloseVector(vec) {
    rtn = []
    for (let i = 0; i < 3; i++) {
        rtn[i] = expect.closeTo(vec[i], 5);
    }
    return rtn;
}

const axes = [Axis.X_AXIS, Axis.Y_AXIS, Axis.Z_AXIS];

test('axis rotation matrices', () => {
    for (let axis of axes) {
        for (let i = 0; i < 8; i++) {
            const ans = getCloseMatrix(answers.rotation_matrix[axis][i]);
            const mat = getMatrixAxis(axis, PIO4 * i);
            expect(mat.toArray()).toEqual(ans);
        }
    }
});

const orders = [XYZ, XZY, YXZ, YZX, ZXY, ZYX, XYX, XZX, YXY, YZY, ZXZ, ZYZ]
const PIO2 = Math.PI / 2;

test('euler rotation matrices', () => {
    for (let o of orders) {
        for (let i = 0; i < 8; i++) {
            const ans = getCloseMatrix(answers.rotation_euler[o.toString()][i]);
            const mat = getMatrixEuler(o, new Angles(PIO4 * i, PIO4 * i, PIO4 * i));
            expect(mat.toArray()).toEqual(ans);
        }
    }
});

const vectors = [new Vector(1, 0, 0), new Vector(0, 1, 0), new Vector(0, 0, 1)];

test('axis to rotation', () => {
    for (let axis of axes) {
        for (let i = 0; i < 3; i++) {
            const ans = getCloseVector(answers.rotation_axis_to[axis][axes[i]]);
            const vec = rotateAxisTo(axis, PIO2, vectors[i]);
            expect(vec.toArray()).toEqual(ans);
        }
    }
});

test('axis from rotation', () => {
    for (let axis of axes) {
        for (let i = 0; i < 3; i++) {
            const ans = getCloseVector(answers.rotation_axis_from[axis][axes[i]]);
            const vec = rotateAxisFrom(axis, PIO2, vectors[i]);
            expect(vec.toArray()).toEqual(ans);
        }
    }
});

const angs90 = new Angles(PIO2, PIO2, PIO2);

test('euler to rotation', () => {
    for (let order of orders) {
        for (let i = 0; i < 3; i++) {
            const ans = getCloseVector(answers.rotation_euler_to[order][axes[i]]);
            const vec = rotateEulerTo(order, angs90, vectors[i]);
            expect(vec.toArray()).toEqual(ans);
        }
    }
});

test('euler to rotation', () => {
    for (let order of orders) {
        for (let i = 0; i < 3; i++) {
            const ans = getCloseVector(answers.rotation_euler_from[order][axes[i]]);
            const vec = rotateEulerFrom(order, angs90, vectors[i]);
            expect(vec.toArray()).toEqual(ans);
        }
    }
});

const offset = new Vector(1, 1, 1);

test('rotation offset to', () => {
    for (let order of orders) {
        for (let i = 0; i < 3; i++) {
            const ans = getCloseVector(answers.rotation_offset_to[order][axes[i]]);
            const mat = getMatrixEuler(order, angs90);
            const vec = rotateOffsetTo(mat, offset, vectors[i]);
            expect(vec.toArray()).toEqual(ans);
        }
    }
});

test('rotation offset from', () => {
    for (let order of orders) {
        for (let i = 0; i < 3; i++) {
            const ans = getCloseVector(answers.rotation_offset_from[order][axes[i]]);
            const mat = getMatrixEuler(order, angs90);
            const vec = rotateOffsetFrom(mat, offset, vectors[i]);
            expect(vec.toArray()).toEqual(ans);
        }
    }
});

test('rotation from to', () => {
    for (let orderFrom of orders) {
        for (orderTo of orders) {
            for (let i = 0; i < 3; i++) {
                const ans = getCloseMatrix(answers.rotation_from_to[orderFrom][orderTo]);
                const mat = getMatrixFromTo(orderFrom, angs90, orderTo, angs90);
                expect(mat.toArray()).toEqual(ans);
            }
        }
    }
});

test('reference frame from to offset', () => {
    for (let orderFrom of orders) {
        const refFrom = new ReferenceFrame(orderFrom, angs90);
        for (let orderTo of orders) {
            const refTo = new ReferenceFrame(orderTo, angs90, offset);
            for (let i = 0; i < 3; i++) {
                const ans = getCloseVector(answers.rotation_refframe_from_to_offset[orderFrom][orderTo][axes[i]]);
                const vec = refFrom.rotateToFrame(refTo, vectors[i]);
                expect(vec.toArray()).toEqual(ans);
            }
        }
    }
});
