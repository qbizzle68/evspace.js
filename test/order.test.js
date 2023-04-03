const { Order, Axis, XYZ } = require('../src/order.js');

test('order construction', () => {
    const XYZ = new Order(Axis.X_AXIS, Axis.Y_AXIS, Axis.Z_AXIS);
    expect(XYZ.first).toStrictEqual(Axis.X_AXIS);
    expect(XYZ.second).toStrictEqual(Axis.Y_AXIS);
    expect(XYZ.third).toStrictEqual(Axis.Z_AXIS);

    expect(() => {new Order(0, Axis.Y_AXIS, Axis.Z_AXIS);}).toThrow(TypeError);
    expect(() => {new Order(Axis.Y_AXIS, 'a', Axis.Z_AXIS);}).toThrow(TypeError);
    expect(() => {new Order(Axis.Y_AXIS, Axis.Z_AXIS, {});}).toThrow(TypeError);
});

test('order get operator', () => {
    expect(XYZ.get(0)).toStrictEqual(Axis.X_AXIS);
    expect(XYZ.get(1)).toStrictEqual(Axis.Y_AXIS);
    expect(XYZ.get(2)).toStrictEqual(Axis.Z_AXIS);

    expect(() => {XYZ.get('a');}).toThrow(TypeError);
    expect(() => {XYZ.get(-1);}).toThrow(RangeError);
    expect(() => {XYZ.get(3);}).toThrow(RangeError);
});

test('order toString', () => {
    expect(XYZ.toString()).toBe('[X_AXIS, Y_AXIS, Z_AXIS]');
});

test('order toObject', () => {
    expect(XYZ.toObject()).toStrictEqual({first: 0, second: 1, third: 2});
})

test('axis construction exceptions', () => {
    expect(() => {new Axis.Direction('a');}).toThrow(TypeError);
    expect(() => {new Axis.Direction(-1);}).toThrow(RangeError);
    expect(() => {new Axis.Direction(3);}).toThrow(RangeError);
})
