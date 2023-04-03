// const Vector = require('../src/vector.js');
// const Matrix = require('../src/matrix.js');
const exp = require('constants');
const { Vector, Matrix } = require('../src/types.js');

test('construct matrices', () => {
    let mat = new Matrix();
    expect(mat.toArray()).toEqual([[0, 0, 0], [0, 0, 0], [0, 0, 0]]);
    mat = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
    expect(mat.toArray()).toEqual([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);

    function failConstructorLength2() {
        const mat = new Matrix([[1, 2, 3], [4, 5, 6]]);
    }
    function failConstructorLength4() {
        const mat = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11, 12]]);
    }
    expect(failConstructorLength2).toThrow(RangeError);
    expect(failConstructorLength4).toThrow(RangeError);
    expect(()=>{new Matrix([[1, 2, 3, 4], [1, 2, 3], [1, 2, 3]])}).toThrow(RangeError);
    expect(()=>{new Matrix([[1, 2], [1, 2, 3], [1, 2, 3]])}).toThrow(RangeError);
    expect(()=>{new Matrix([[1, 2, 3], [1, 2, 3, 4], [1, 2, 3]])}).toThrow(RangeError);
    expect(()=>{new Matrix([[1, 2, 3], [1, 2], [1, 2, 3]])}).toThrow(RangeError);
    expect(()=>{new Matrix([[1, 2, 3], [1, 2, 3], [1, 2, 3, 4]])}).toThrow(RangeError);
    expect(()=>{new Matrix([[1, 2, 3], [1, 2, 3], [1, 2]])}).toThrow(RangeError);
    expect(()=>{new Matrix([[1, 2, 3], [1, 'a', 3], [1, 2, 3]])}).toThrow(TypeError);

});

test('iterating matrix rows', () => {
    const mat = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
    let cnt = 0;
    for (const row of mat) {
        for (const i of row) {
            expect(i).toBe(++cnt);
        }
    }
});

test('adding matrices', () => {
    const mat1 = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
    const mat2 = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);

    expect(mat1.add(mat2)).toStrictEqual(new Matrix([[2, 4, 6], [8, 10, 12], [14, 16, 18]]));

    expect(()=>{mat1.add(1);}).toThrow(TypeError);
});

test('subtracting matrices', () => {
    const mat1 = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
    const mat2 = new Matrix([[4, 5, 6], [7, 8, 9], [10, 11, 12]]);

    expect(mat1.subtract(mat2)).toStrictEqual(new Matrix([[-3, -3, -3], [-3, -3, -3], [-3, -3, -3]]));

    expect(() => {mat1.subtract({});}).toThrow(TypeError);
});

test('multiplying matrices', () => {
    const mat1 = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
    const mat2 = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
    const vec = new Vector(1, 2, 3);

    expect(mat1.multiply(2)).toStrictEqual(new Matrix([[2, 4, 6], [8, 10, 12], [14, 16, 18]]));
    expect(mat1.multiply(mat2)).toStrictEqual(new Matrix([[30, 36, 42], [66, 81, 96], [102, 126, 150]]));
    expect(mat1.multiply(vec)).toStrictEqual(new Vector(14, 32, 50));

    expect(() => {mat1.multiply('abc');}).toThrow(TypeError);
});

test('dividing matrices', () => {
    const mat1 = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);

    expect(mat1.divide(0.5).toArray()).toEqual([[2, 4, 6], [8, 10, 12], [14, 16, 18]]);

    expect(() => {mat1.divide(new Matrix());}).toThrow(TypeError);
});

test('add assignment', () => {
    const mat1 = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
    const mat2 = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
    const ans = new Matrix([[2, 4, 6], [8, 10, 12], [14, 16, 18]]);

    expect(mat1.addEqual(mat2)).toStrictEqual(ans);
    expect(mat1).toStrictEqual(ans);

    expect(() => {mat1.addEqual(2);}).toThrow(TypeError);
});

test('subtract assignment', () => {
    const mat1 = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
    const mat2 = new Matrix([[2, 4, 6], [8, 10, 12], [14, 16, 18]]);
    const ans = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);

    expect(mat2.subtractEqual(mat1)).toStrictEqual(ans);
    expect(mat2).toStrictEqual(ans);

    expect(() => {mat1.subtractEqual('a');}).toThrow(TypeError);
});

test('multiply assignment', () => {
    let mat1 = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
    const mat2 = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
    const ans = new Matrix([[2, 4, 6], [8, 10, 12], [14, 16, 18]]);
    const ans2 = new Matrix([[30, 36, 42], [66, 81, 96], [102, 126, 150]]);

    expect(mat1.multiplyEqual(2)).toStrictEqual(ans);
    expect(mat1).toStrictEqual(ans);
    mat1 = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
    expect(mat1.multiplyEqual(mat2)).toStrictEqual(ans2);
    expect(mat1).toStrictEqual(ans2);

    expect(() => {mat1.multiplyEqual(new Vector(1, 2, 3))}).toThrow(TypeError);
});

test('divide assignment', () => {
    const mat1 = new Matrix([[2, 4, 6], [8, 10, 12], [14, 16, 18]]);
    const ans = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);

    expect(mat1.divideEqual(2)).toStrictEqual(ans);
    expect(mat1).toStrictEqual(ans);

    expect(() => {mat1.divideEqual('a')}).toThrow(TypeError);
});

test('negative operator', () => {
    const mat1 = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
    const ans = new Matrix([[-1, -2, -3], [-4, -5, -6], [-7, -8, -9]]);

    expect(mat1.negative()).toStrictEqual(ans);
});

test('get operator', () => {
    const mat1 = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);

    let cnt = 0;
    for (let i = 0; i < 3; i++) {
        for (let j= 0; j < 3; j++) {
            expect(mat1.get(i, j)).toBe(++cnt);
        }
    }

    expect(() => {mat1.get(-1, 0)}).toThrow(RangeError);
    expect(() => {mat1.get(0, 4)}).toThrow(RangeError);
    expect(() => {mat1.get(0, -1)}).toThrow(RangeError);
    expect(() => {mat1.get(0, 4)}).toThrow(RangeError);
    expect(() => {mat1.get('i', 0)}).toThrow(TypeError);
    expect(() => {mat1.get(1, {})}).toThrow(TypeError);
});

test('set operator', () => {
    const mat1 = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
    const ans = new Matrix([[2, 4, 6], [8, 10, 12], [14, 16, 18]]);
    
    let cnt = 0;
    for (let i = 0; i < 3; i++) {
        for (let j= 0; j < 3; j++) {
            mat1.set(i, j, ++cnt * 2);
        }
    }
    expect(mat1).toStrictEqual(ans);

    expect(() => {mat1.set(-1, 0, 0)}).toThrow(RangeError);
    expect(() => {mat1.set(0, 4, 0)}).toThrow(RangeError);
    expect(() => {mat1.set(0, -1, 0)}).toThrow(RangeError);
    expect(() => {mat1.set(0, 4, 0)}).toThrow(RangeError);
    expect(() => {mat1.set('i', 0, 0)}).toThrow(TypeError);
    expect(() => {mat1.set(1, {}, 0)}).toThrow(TypeError);

    expect(() => {mat1.set(0, 0, 'a')}).toThrow(TypeError);
});

test('matrix toArray', () => {
    const mat1 = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
    expect(mat1.toArray()).toStrictEqual([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
});

test('matrix toObject', () => {
    const mat1 = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
    const ans = {r0: {c0: 1, c1: 2, c2: 3},
                 r1: {c0: 4, c1: 5, c2: 6},
                 r2: {c0: 7, c1: 8, c2: 9}};
    
    expect(mat1.toObject()).toStrictEqual(ans);    
});

test('matrix toString', () => {
    const mat = new Matrix([[1.2345, 1.2345, 1.2345], [1.2345, 1.2345, 1.2345], [1.2345, 1.2345, 1.2345]]);
    expect(mat.toString()).toBe('[[ 1.2345, 1.2345, 1.2345 ]\n[ 1.2345, 1.2345, 1.2345 ]\n[ 1.2345, 1.2345, 1.2345 ]]');
    expect(mat.toString(3)).toBe('[[ 1.234, 1.234, 1.234 ]\n[ 1.234, 1.234, 1.234 ]\n[ 1.234, 1.234, 1.234 ]]');
});
