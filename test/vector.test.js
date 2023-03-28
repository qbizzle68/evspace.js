const Vector = require('../src/vector.js');

test('adds two vectors', () => {
    const v1 = new Vector(1, 2, 3);
    const v2 = new Vector(2, 3, 4);
    expect(v1.add(v2)).toStrictEqual(new Vector(3, 5, 7));
});