const answers = require('./answers.json');
const { Vector, Matrix } = require('../src/types.js');
const { Angles } = require('../src/angles');
const { Order, Axis, XYZ, XZY, YXZ, YZX, ZXY, ZYX,
    XYX, XZX, YXY, YZY, ZXZ, ZYZ } = require('../src/order.js');
const { getMatrixAxis, getMatrixEuler, getMatrixFromTo, rotateAxisTo,
        rotateAxisFrom, rotateEulerTo, rotateEulerFrom,
        rotateMatrixTo, rotateMatrixFrom, rotateOffsetTo, rotateOffsetFrom } = require('../src/rotation');

        
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
        
const PIO4 = Math.PI / 4;
const axes = [Axis.X_AXIS, Axis.Y_AXIS, Axis.Z_AXIS];
const orders = [XYZ, XZY, YXZ, YZX, ZXY, ZYX, XYX, XZX, YXY, YZY, ZXZ, ZYZ]
const PIO2 = Math.PI / 2;
const offset = new Vector(1, 1, 1);
const angs90 = new Angles(PIO2, PIO2, PIO2);
const vectors = [new Vector(1, 0, 0), new Vector(0, 1, 0), new Vector(0, 0, 1)];

test('axis rotation matrices', () => {
    for (let axis of axes) {
        for (let i = 0; i < 8; i++) {
            const ans = getCloseMatrix(answers.rotation_matrix[axis][i]);
            const mat = getMatrixAxis(axis, PIO4 * i);
            expect(mat.toArray()).toEqual(ans);
        }
    }
});

test('euler rotation matrices', () => {
    for (let o of orders) {
        for (let i = 0; i < 8; i++) {
            const ans = getCloseMatrix(answers.rotation_euler[o.toString()][i]);
            const mat = getMatrixEuler(o, new Angles(PIO4 * i, PIO4 * i, PIO4 * i));
            expect(mat.toArray()).toEqual(ans);
        }
    }
});

test('get matrix exceptions', () => {
    expect(() => {getMatrixAxis(5, 1);}).toThrow(TypeError);
    expect(() => {getMatrixAxis(Axis.X_AXIS, 'a');}).toThrow(TypeError);

    expect(() => {getMatrixEuler(2.1, angs90);}).toThrow(TypeError);
    expect(() => {getMatrixEuler(XYZ, 'abc');}).toThrow(TypeError);

    expect(() => {getMatrixFromTo(0, angs90, XYZ, angs90);}).toThrow(TypeError);
    expect(() => {getMatrixFromTo(XYZ, 'a', ZYX, angs90);}).toThrow(TypeError);
    expect(() => {getMatrixFromTo(XYZ, angs90, {}, angs90);}).toThrow(TypeError);
    expect(() => {getMatrixFromTo(XYZ, angs90, XYZ, 4.2);}).toThrow(TypeError);
});

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

test('rotate axis expections', () => {
    expect(() => {rotateAxisTo(0, 1, offset);}).toThrow(TypeError);
    expect(() => {rotateAxisTo(Axis.X_AXIS, 'a', offset);}).toThrow(TypeError);
    expect(() => {rotateAxisTo(Axis.X_AXIS, 2, {});}).toThrow(TypeError);

    expect(() => {rotateAxisFrom(0, 1, offset);}).toThrow(TypeError);
    expect(() => {rotateAxisFrom(Axis.X_AXIS, 'a', offset);}).toThrow(TypeError);
    expect(() => {rotateAxisFrom(Axis.X_AXIS, 2, {});}).toThrow(TypeError);
});

test('euler to rotation', () => {
    for (let order of orders) {
        for (let i = 0; i < 3; i++) {
            const ans = getCloseVector(answers.rotation_euler_to[order][axes[i]]);
            const vec = rotateEulerTo(order, angs90, vectors[i]);
            expect(vec.toArray()).toEqual(ans);
        }
    }
});

test('euler from rotation', () => {
    for (let order of orders) {
        for (let i = 0; i < 3; i++) {
            const ans = getCloseVector(answers.rotation_euler_from[order][axes[i]]);
            const vec = rotateEulerFrom(order, angs90, vectors[i]);
            expect(vec.toArray()).toEqual(ans);
        }
    }
});

test('rotate euler exceptions', () => {
    expect(() => {rotateEulerTo(1, angs90, offset);}).toThrow(TypeError);
    expect(() => {rotateEulerTo(XYZ, 'abd', offset);}).toThrow(TypeError);
    expect(() => {rotateEulerTo(XYZ, angs90, new Matrix());}).toThrow(TypeError);

    expect(() => {rotateEulerFrom('a', angs90, offset);}).toThrow(TypeError);
    expect(() => {rotateEulerFrom(XYZ, {}, offset);}).toThrow(TypeError);
    expect(() => {rotateEulerFrom(XYZ, angs90, 3.14);}).toThrow(TypeError);
});

test('rotation matrix to', () => {
    for (let order of orders) {
        for (let i = 0; i < 3; i++) {
            const ans = getCloseVector(answers.rotation_euler_to[order][axes[i]]);
            const mat = getMatrixEuler(order, angs90);
            const vec = rotateMatrixTo(mat, vectors[i]);
            expect(vec.toArray()).toEqual(ans);
        }
    }
});

test('rotation matrix from', () => {
    for (let order of orders) {
        for (let i = 0; i < 3; i++) {
            const ans = getCloseVector(answers.rotation_euler_from[order][axes[i]]);
            const mat = getMatrixEuler(order, angs90);
            const vec = rotateMatrixFrom(mat, vectors[i]);
            expect(vec.toArray()).toEqual(ans);
        }
    }
});

test('rotate matrix exceptions', () => {
    expect(() => {rotateMatrixTo(0, offset);}).toThrow(TypeError);
    expect(() => {rotateMatrixTo(new Matrix(), 'abc');}).toThrow(TypeError);

    expect(() => {rotateMatrixFrom(0, offset);}).toThrow(TypeError);
    expect(() => {rotateMatrixFrom(new Matrix(), new Matrix());}).toThrow(TypeError);
});

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

test('rotation offset exceptions', () => {
    expect(() => {rotateOffsetTo(1, offset, offset);}).toThrow(TypeError);
    expect(() => {rotateOffsetTo(new Matrix(), 0, offset);}).toThrow(TypeError);
    expect(() => {rotateOffsetTo(new Matrix(), offset, 'abcd');}).toThrow(TypeError);

    expect(() => {rotateOffsetFrom(3.14, offset, offset);}).toThrow(TypeError);
    expect(() => {rotateOffsetFrom(new Matrix(), new Matrix(), offset);}).toThrow(TypeError);
    expect(() => {rotateOffsetFrom(new Matrix(), offset, {});}).toThrow(TypeError);
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
