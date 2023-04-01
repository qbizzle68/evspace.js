// const Vector = require('../src/vector.js');
// const Matrix = require('../src/matrix.js');
const { Vector, Matrix } = require('../src/types.js');

test('construct vectors', () => {
    let ans = new Vector()
    expect([ans.get(0), ans.get(1), ans.get(2)]).toEqual([0, 0, 0]);
    ans = new Vector(1, 2, 3);
    expect([ans.get(0), ans.get(1), ans.get(2)]).toEqual([1, 2, 3]);

    function failConstructorX() {
        const vec = new Vector(0, 'abc', 2);
    }
    function failConstructorY() {
        const vec = new Vector('abc', 1, 2);
    }
    function failConstructorZ() {
        const vec = new Vector(0, 1, 'abc');
    }
    expect(failConstructorX).toThrow(TypeError);
    expect(failConstructorY).toThrow(TypeError);
    expect(failConstructorZ).toThrow(TypeError);
});

test('iterating vectors', () => {
    const vec = new Vector(1, 2, 3);
    let cnt = 0;
    for (const i of vec) {
        expect(i).toBe(++cnt);
    }
})

test('adding vectors', () => {
    const vec1 = new Vector(1, 2, 3);
    const vec2 = new Vector(2, 3, 4);
    expect(vec1.add(vec2)).toStrictEqual(new Vector(3, 5, 7));
    expect(vec1.add(vec2).add(vec1)).toStrictEqual(new Vector(4, 7, 10));

    function failAdd() {
        vec1.add(7);
    }
    expect(failAdd).toThrow(TypeError);
})

test('subtracting vectors', () => {
    const vec1 = new Vector(1, 2, 3);
    const vec2 = new Vector(2, 3, 4);
    expect(vec1.subtract(vec2)).toStrictEqual(new Vector(-1, -1, -1));
    expect(vec2.subtract(vec1).subtract(vec1)).toStrictEqual(new Vector(0, -1, -2));

    function failSubtract() {
        vec1.subtract('abc');
    }
    expect(failSubtract).toThrow(TypeError);
});

test('multiplying vectors', () => {
    const vec1 = new Vector(1, 2, 3);
    expect(vec1.multiply(2.5)).toStrictEqual(new Vector(2.5, 5,  7.5));
    const mat = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
    expect(vec1.multiply(mat)).toStrictEqual(new Vector(30, 36, 42));

    function failMultiply() {
        vec1.multiply([0, 1, 2]);
    }
    expect(failMultiply).toThrow(TypeError);
});

test('dividing vectors', () => {
    const vec1 = new Vector(2.5, 5.0, 7.5);
    expect(vec1.divide(2.5)).toStrictEqual(new Vector(1, 2, 3));

    function failDivide() {
        vec1.divide('a');
    }
    expect(failDivide).toThrow(TypeError);
});

test('add assignment', () => {
    let vec1 = new Vector(1, 2, 3);
    const vec2 = new Vector(2, 3, 4);
    expect(vec1.addEqual(vec2)).toStrictEqual(new Vector(3, 5, 7));
    vec1 = new Vector(1, 2, 3);
    vec1.addEqual(vec2);
    expect(vec1).toStrictEqual(new Vector(3, 5, 7));
    vec1 = new Vector(1, 2, 3);
    let vec3 = vec1.addEqual(vec2).add(vec2);
    expect(vec1).toStrictEqual(new Vector(3, 5, 7));
    expect(vec3).toStrictEqual(new Vector(5, 8, 11));

    function failAddEqual() {
        vec1.addEqual('abc');
    }
    expect(failAddEqual).toThrow(TypeError);
});

test('subtract assignment', () => {
    let vec1 = new Vector(1, 2, 3);
    const vec2 = new Vector(2, 3, 4);
    expect(vec1.subtractEqual(vec2)).toStrictEqual(new Vector(-1, -1, -1));
    vec1 = new Vector(1, 2, 3);
    vec1.subtractEqual(vec2);
    expect(vec1).toStrictEqual(new Vector(-1, -1, -1));
    vec1 = new Vector(1, 2, 3);
    let vec3 = vec1.subtractEqual(vec2).subtract(vec2);
    expect(vec1).toStrictEqual(new Vector(-1, -1, -1));
    expect(vec3).toStrictEqual(new Vector(-3, -4, -5));

    function failSubtractEqual() {
        vec1.subtractEqual({});
    }
    expect(failSubtractEqual).toThrow(TypeError);
});

test('multiply assignment', () => {
    let vec1 = new Vector(1, 2, 3);
    const mat = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
    expect(vec1.multiplyEqual(mat)).toStrictEqual(new Vector(30, 36, 42));
    vec1 = new Vector(1, 2, 3);
    expect(vec1.multiplyEqual(1.1).toArray()).toEqual([1.1, 2.2, expect.closeTo(3.3)])
    vec1 = new Vector(1, 2, 3);
    vec1.multiplyEqual(mat).multiplyEqual(1.1);
    expect(vec1).toStrictEqual(new Vector(33, 39.6, 46.2));

    function failMultiplyEqual() {
        vec1.multiplyEqual('a');
    }
    expect(failMultiplyEqual).toThrow(TypeError);
});

test('divide assignment', () => {
    let vec1 = new Vector(1, 2, 3);
    expect(vec1.divideEqual(2).toArray()).toEqual([expect.closeTo(0.5), expect.closeTo(1.0), expect.closeTo(1.5)]);
    vec1 = new Vector(2.5, 5, 7.5);
    vec1.divideEqual(2.5);
    expect(vec1).toEqual(new Vector(1, 2, 3));

    function failDivideEqual() {
        vec1.divideEqual(new Vector());
    }
    expect(failDivideEqual).toThrow(TypeError);
});

test('negative operator', () => {
    const vec1 = new Vector(1, 2, 3);
    const vec2 = vec1.negative();
    expect(vec2).toStrictEqual(new Vector(-1, -2, -3));
});

test('get operator', () => {
    const vec1 = new Vector(1, 2, 3);
    expect(vec1.get(0)).toBe(1);
    expect(vec1.get(1)).toBe(2);
    expect(vec1.get(2)).toBe(3);

    function failGet() {
        vec1.get(failIndex);
    }
    let failIndex = -1;
    expect(failGet).toThrow(RangeError);
    failIndex = 3;
    expect(failGet).toThrow(RangeError);
    failIndex = 'q';
    expect(failGet).toThrow(TypeError);
});

test('set operator', () => {
    const vec1 = new Vector(1, 2, 3);
    vec1.set(0, 68);
    expect(vec1).toStrictEqual(new Vector(68, 2, 3));
    vec1.set(1, 42);
    expect(vec1).toStrictEqual(new Vector(68, 42, 3));
    vec1.set(2, 21);
    expect(vec1).toStrictEqual(new Vector(68, 42, 21));

    function failSet() {
        vec1.set(failIndex, failValue);
    }
    let failIndex = 0, failValue = 'a';
    expect(failSet).toThrow(TypeError);
    failIndex = -1, failValue = 1;
    expect(failSet).toThrow(RangeError);
    failIndex = 3;
    expect(failSet).toThrow(RangeError);
});

test('magnitude test', () => {
    let vec = new Vector(1, 2, 3);
    expect(vec.magnitude()).toBeCloseTo(3.7416573867739413, 5);
    vec = new Vector(2.5, 5, 7.5);
    expect(vec.magnitude()).toBeCloseTo(9.354143466934854, 5);
});

test('magnitude squared test', () => {
    let vec = new Vector(1, 2, 3);
    expect(vec.magnitude2()).toBe(14);
    vec = new Vector(3, 4, 0);
    expect(vec.magnitude2()).toBe(25);
});

test('normalize vector', () => {
    let vec = new Vector(1, 2, 3);
    vec.normalize();
    expect(vec.toArray()).toEqual([expect.closeTo(0.2672612419124244, 5), expect.closeTo(0.5345224838248488, 5), expect.closeTo(0.8017837257372732, 5)]);
    vec = new Vector(4, 0, 3);
    expect(vec.normalize().toArray()).toEqual([expect.closeTo(.8, 5), 0, expect.closeTo(.6, 5)]);
});

test('toArray test', () => {
    let vec = new Vector(1, 2, 3);
    expect(vec.toArray()).toEqual([1, 2, 3]);

});

test('toObject test', () => {
    let vec = new Vector(1, 2, 3);
    expect(vec.toObject()).toStrictEqual({x: 1, y: 2, z: 3});
})
