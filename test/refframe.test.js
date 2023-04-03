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

const orders = [XYZ, XZY, YXZ, YZX, ZXY, ZYX, XYX, XZX, YXY, YZY, ZXZ, ZYZ];
axes = [Axis.X_AXIS, Axis.Y_AXIS, Axis.Z_AXIS];
vectors = [new Vector(1, 0, 0), new Vector(0, 1, 0), new Vector(0, 0, 1)];
const PIO2 = Math.PI / 2;
const angs90 = new Angles(PIO2, PIO2, PIO2);
const offset = new Vector(1, 1, 1);

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