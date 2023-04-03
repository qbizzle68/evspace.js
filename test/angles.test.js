const { Angles } = require('../src/angles.js');

test('angles constructor test', () => {
    const angs = new Angles(1, 2, 3);
    expect(angs.toObject()).toStrictEqual({alpha: 1, beta: 2, gamma: 3});

    expect(() => {new Angles('a', 2, 3);}).toThrow(TypeError);
    expect(() => {new Angles(1, {}, 3);}).toThrow(TypeError);
    expect(() => {new Angles(1, 2, 'abc');}).toThrow(TypeError);
});

test('angles property test', () => {
    const angs = new Angles(1, 2, 3);
    expect(angs.alpha).toBe(1);
    expect(angs.beta).toBe(2);
    expect(angs.gamma).toBe(3);

    angs.alpha = 2;
    angs.beta = 4;
    angs.gamma = 6;
    expect(angs.toObject()).toStrictEqual({alpha: 2, beta: 4, gamma: 6});

    expect(() => {angs.alpha = 'a';}).toThrow(TypeError);
    expect(() => {angs.beta = {};}).toThrow(TypeError);
    expect(() => {angs.gamma = 'abc';}).toThrow(TypeError);
});

test('angles toString test', () => {
    const angs = new Angles(1.2345678, 2.3456789, 3.456789);

    expect(angs.toString()).toBe('[ 1.2345678, 2.3456789, 3.456789 ]');
    expect(angs.toString(5)).toBe('[ 1.23457, 2.34568, 3.45679 ]');
    expect(angs.toString(-1, true)).toBe('[ 70.73552446275112, 134.39750106288946, 198.05942036724835 ]');
    expect(angs.toString(5, true)).toBe('[ 70.73552, 134.39750, 198.05942 ]');
});

test('angles toObject test', () => {
    const angs = new Angles(1, 2, 3);
    expect(angs.toObject()).toStrictEqual({alpha: 1, beta: 2, gamma: 3});
});
