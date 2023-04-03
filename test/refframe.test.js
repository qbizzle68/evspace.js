const answers = require('./answers.json');
const { Vector, Matrix } = require('../src/types.js');
const { Angles } = require('../src/angles');
const { Order, Axis, XYZ, XZY, YXZ, YZX, ZXY, ZYX,
    XYX, XZX, YXY, YZY, ZXZ, ZYZ } = require('../src/order.js');
const { getMatrixAxis, getMatrixEuler, getMatrixFromTo, rotateAxisTo,
        rotateAxisFrom, rotateEulerTo, rotateEulerFrom,
        rotateMatrixTo, rotateMatrixFrom, rotateOffsetTo, rotateOffsetFrom } = require('../src/rotation');
const { ReferenceFrame } = require('../src/refframe.js');

function getCloseVector(vec) {
    rtn = []
    for (let i = 0; i < 3; i++) {
        rtn[i] = expect.closeTo(vec[i], 5);
    }
    return rtn;
}

function getCloseMatrix(mat) {
    rtn = [...Array(3)].map(e => Array(3));
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            rtn[i][j] = expect.closeTo(mat[i][j], 5);
        }
    }
    return rtn;
}

const orders = [XYZ, XZY, YXZ, YZX, ZXY, ZYX, XYX, XZX, YXY, YZY, ZXZ, ZYZ];
const axes = [Axis.X_AXIS, Axis.Y_AXIS, Axis.Z_AXIS];
const vectors = [new Vector(1, 0, 0), new Vector(0, 1, 0), new Vector(0, 0, 1)];
const PIO2 = Math.PI / 2;
const angs90 = new Angles(PIO2, PIO2, PIO2);
const offset = new Vector(1, 1, 1);
const offset2 = new Vector(-1, -1, -1);

test('reference frame rotate to', () => {
    for (let order of orders) {
        const ref = new ReferenceFrame(order, angs90);
        for (let i = 0; i < 3; i++) {
            const ans = getCloseVector(answers.rotation_euler_to[order][axes[i]]);
            const vec = ref.rotateTo(vectors[i]);
            expect(vec.toArray()).toEqual(ans);
        }
    }
});

test('reference frame rotate from', () => {
    for (let order of orders) {
        const ref = new ReferenceFrame(order, angs90);
        for (let i = 0; i < 3; i++) {
            const ans = getCloseVector(answers.rotation_euler_from[order][axes[i]]);
            const vec = ref.rotateFrom(vectors[i]);
            expect(vec.toArray()).toEqual(ans);
        }
    }
});

test('reference frame to reference frame', () => {
    for (let order1 of orders) {
        const ref1 = new ReferenceFrame(order1, angs90);
        for (let order2 of orders) {
            const ref2 = new ReferenceFrame(order2, angs90);
            for (let i = 0; i < 3; i++) {
                const ans = getCloseVector(answers.rotation_ref_to_ref[order1][order2][axes[i]]);
                const vec = ref1.rotateToFrame(ref2, vectors[i]);
                expect(vec.toArray()).toEqual(ans);
            }
        }
    }
});

test('reference frame from reference frame', () => {
    for (let order1 of orders) {
        const ref1 = new ReferenceFrame(order1, angs90);
        for (let order2 of orders) {
            const ref2 = new ReferenceFrame(order2, angs90);
            for (let i = 0; i < 3; i++) {
                const ans = getCloseVector(answers.rotation_ref_from_ref[order1][order2][axes[i]]);
                const vec = ref1.rotateFromFrame(ref2, vectors[i]);
                expect(vec.toArray()).toEqual(ans);
            }
        }
    }
});

test('reference frame to offset', () => {
    for (let order1 of orders) {
        const ref1 = new ReferenceFrame(order1, angs90);
        for (let order2 of orders) {
            const ref2 = new ReferenceFrame(order2, angs90, offset);
            for (let i = 0; i < 3; i++) {
                const ans = getCloseVector(answers.rotation_ref_to_ref_offset[order1][order2][axes[i]]);
                const vec = ref1.rotateToFrame(ref2, vectors[i]);
                expect(vec.toArray()).toEqual(ans);
            }
        }
    }
});

test('reference frame from offset', () => {
    for (let order1 of orders) {
        const ref1 = new ReferenceFrame(order1, angs90);
        for (let order2 of orders) {
            const ref2 = new ReferenceFrame(order2, angs90, offset);
            for (let i = 0; i < 3; i++) {
                const ans = getCloseVector(answers.rotation_ref_from_ref_offset[order1][order2][axes[i]]);
                const vec = ref1.rotateFromFrame(ref2, vectors[i]);
                expect(vec.toArray()).toEqual(ans);
            }
        }
    }
});

test('reference frame offset to', () => {
    for (let order of orders) {
        const ref = new ReferenceFrame(order, angs90, offset);
        for (let i = 0; i < 3; i++) {
            const ans = getCloseVector(answers.rotation_offset_to[order][axes[i]]);
            const vec = ref.rotateTo(vectors[i]);
            expect(vec.toArray()).toEqual(ans);
        }
    }
});

test('reference frame offset from', () => {
    for (let order of orders) {
        const ref = new ReferenceFrame(order, angs90, offset);
        for (let i = 0; i < 3; i++) {
            const ans = getCloseVector(answers.rotation_offset_from[order][axes[i]]);
            const vec = ref.rotateFrom(vectors[i]);
            expect(vec.toArray()).toEqual(ans);
        }
    }
});

test('reference frame offset to reference frame', () => {
    for (let order1 of orders) {
        const ref1 = new ReferenceFrame(order1, angs90, offset);
        for (let order2 of orders) {
            const ref2 = new ReferenceFrame(order2, angs90);
            for (let i = 0; i < 3; i++) {
                const ans = getCloseVector(answers.rotation_ref_offset_to_ref[order1][order2][axes[i]]);
                const vec = ref1.rotateToFrame(ref2, vectors[i]);
                expect(vec.toArray()).toEqual(ans);
            }
        }
    }
});

test('reference frame offset from reference frame', () => {
    for (let order1 of orders) {
        const ref1 = new ReferenceFrame(order1, angs90, offset);
        for (let order2 of orders) {
            const ref2 = new ReferenceFrame(order2, angs90);
            for (let i = 0; i < 3; i++) {
                const ans = getCloseVector(answers.rotation_ref_offset_from_ref[order1][order2][axes[i]]);
                const vec = ref1.rotateFromFrame(ref2, vectors[i]);
                expect(vec.toArray()).toEqual(ans);
            }
        }
    }
});

test('reference frame offset to reference frame offset', () => {
    for (let order1 of orders) {
        const ref1 = new ReferenceFrame(order1, angs90, offset);
        for (let order2 of orders) {
            const ref2 = new ReferenceFrame(order2, angs90, offset2);
            for (let i = 0; i < 3; i++) {
                const ans = getCloseVector(answers.rotation_ref_offset_to_offset[order1][order2][axes[i]]);
                const vec = ref1.rotateToFrame(ref2, vectors[i]);
                expect(vec.toArray()).toEqual(ans);
            }
        }
    }
});

test('reference frame offset from reference frame offset', () => {
    for (let order1 of orders) {
        const ref1 = new ReferenceFrame(order1, angs90, offset);
        for (let order2 of orders) {
            const ref2 = new ReferenceFrame(order2, angs90, offset2);
            for (let i = 0; i < 3; i++) {
                const ans = getCloseVector(answers.rotation_ref_offset_from_offset[order1][order2][axes[i]]);
                const vec = ref1.rotateFromFrame(ref2, vectors[i]);
                expect(vec.toArray()).toEqual(ans);
            }
        }
    }
});

test('reference frame get properties', () => {
    ref = new ReferenceFrame(XYZ, angs90, offset);

    expect(ref.order).toStrictEqual(XYZ);
    expect(ref.angles).toStrictEqual(angs90);
    expect(ref.matrix.toArray()).toStrictEqual(getMatrixEuler(XYZ, angs90).toArray());
    expect(ref.offset.toArray()).toStrictEqual(offset.toArray());
});

test('reference frame set properties', () => {
    ref = new ReferenceFrame(XYZ, angs90, offset);

    const zeros = new Angles(0, 0, 0);
    ref.angles = zeros;
    expect(ref.angles.alpha).toBe(0);
    expect(ref.angles.beta).toBe(0);
    expect(ref.angles.gamma).toBe(0);
    expect(ref.matrix.toArray()).toEqual(getCloseMatrix(getMatrixEuler(XYZ, zeros).toArray()));

    ref.alpha = 1;
    expect(ref.angles.alpha).toBe(1);
    expect(ref.matrix.toArray()).toEqual(getCloseMatrix(getMatrixEuler(XYZ, new Angles(1, 0, 0)).toArray()));

    ref.beta = 1;
    expect(ref.angles.beta).toBe(1);
    expect(ref.matrix.toArray()).toEqual(getCloseMatrix(getMatrixEuler(XYZ, new Angles(1, 1, 0)).toArray()));

    ref.gamma = 1;
    expect(ref.angles.gamma).toBe(1);
    expect(ref.matrix.toArray()).toEqual(getCloseMatrix(getMatrixEuler(XYZ, new Angles(1, 1, 1)).toArray()));

    ref.offset = new Vector();
    expect(ref.offset.toArray()).toEqual(getCloseVector((new Vector()).toArray()));
});

test('reference frame construction exceptions', () => {
    expect(() => {new ReferenceFrame(0, angs90, offset);}).toThrow(TypeError);
    expect(() => {new ReferenceFrame(XYZ, 'a', offset);}).toThrow(TypeError);
    expect(() => {new ReferenceFrame(XYZ, angs90, {});}).toThrow(TypeError);
});

test('reference frame set properties exceptions', () => {
    const ref = new ReferenceFrame(XYZ, angs90);
    
    expect(() => {ref.angles = 0;}).toThrow(TypeError);
    expect(() => {ref.alpha = 'a';}).toThrow(TypeError);
    expect(() => {ref.beta = 'b';}).toThrow(TypeError);
    expect(() => {ref.gamma = 'g';}).toThrow(TypeError);
    expect(() => {ref.offset = 1;}).toThrow(TypeError);
});

test('reference frame rotation exceptions', () => {
    const ref1 = new ReferenceFrame(XYZ, angs90);
    const ref2 = new ReferenceFrame(XYZ, angs90);

    expect(() => {ref1.rotateTo(0);}).toThrow(TypeError);
    expect(() => {ref1.rotateFrom('a');}).toThrow(TypeError);
    expect(() => {ref1.rotateToFrame(0, offset);}).toThrow(TypeError);
    expect(() => {ref1.rotateToFrame(ref2, 'a');}).toThrow(TypeError);
    expect(() => {ref1.rotateFromFrame(0, offset);}).toThrow(TypeError);
    expect(() => {ref1.rotateFromFrame(ref2, 'a');}).toThrow(TypeError);
});
