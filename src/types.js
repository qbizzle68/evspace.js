class Vector {
    #data;

    constructor(x, y, z) {
        if ((x||false) && isNaN(x)) {
            throw TypeError('x component is not a number');
        }
        if ((y||false) && isNaN(y)) {
            throw TypeError('y component is not a number');
        }
        if ((z||false) && isNaN(z)) {
            throw TypeError('z component is not a number');
        }

        this.#data = [x || 0, y || 0, z || 0];
    }

    [Symbol.iterator]() {
        let _index = 0;
        let _data = this.#data;

        return {
            next() {
                return {value: _data[_index], done: !(_index++ in _data)};
            }
        };
    }

    add(rhs) {
        if (!(rhs instanceof Vector)) {
            throw TypeError('rhs is not a Vector');
        }
        return new Vector(this.#data[0] + rhs.#data[0],
                          this.#data[1] + rhs.#data[1],
                          this.#data[2] + rhs.#data[2]);
    }

    subtract(rhs) {
        if (!(rhs instanceof Vector)) {
            throw TypeError('rhs is not a Vector');
        }
        return new Vector(this.#data[0] - rhs.#data[0],
                          this.#data[1] - rhs.#data[1],
                          this.#data[2] - rhs.#data[2]);
    }

    multiply(rhs) {
        if (rhs instanceof Matrix) {
            const rtn = new Vector();
            for (let i = 0; i < 3; i++) {
                let sum = 0;
                for (let j = 0; j < 3; j++) {
                    sum += rhs.get(j, i) * this.#data[j];
                }
                rtn.#data[i] = sum;
            }
            return rtn;
        } else if (!isNaN(rhs)) {
            return new Vector(this.#data[0] * rhs,
                              this.#data[1] * rhs,
                              this.#data[2] * rhs);
        }
        throw TypeError('rhs is not a Matrix or number');
    }

    divide(rhs) {
        if (isNaN(rhs)) {
            throw TypeError('rhs is not a number');
        }
        return new Vector(this.#data[0] / rhs,
                          this.#data[1] / rhs,
                          this.#data[2] / rhs);
    }

    addEqual(rhs) {
        if (!(rhs instanceof Vector)) {
            throw TypeError('rhs is not a Vector');
        }
        this.#data[0] += rhs.#data[0];
        this.#data[1] += rhs.#data[1];
        this.#data[2] += rhs.#data[2];
        return this;
    }

    subtractEqual(rhs) {
        if (!(rhs instanceof Vector)) {
            throw TypeError('rhs is not a Vector');
        }
        this.#data[0] -= rhs.#data[0];
        this.#data[1] -= rhs.#data[1];
        this.#data[2] -= rhs.#data[2];
        return this;
    }

    multiplyEqual(rhs) {
        if (!isNaN(rhs)) {
            this.#data[0] *= rhs;
            this.#data[1] *= rhs;
            this.#data[2] *= rhs;
            return this;
        } else if (rhs instanceof Matrix) {
            let arr = Array.from(this.#data);
            for (let i = 0; i < 3; i++) {
                let sum = 0;
                for (let j = 0; j < 3; j++) {
                    sum += rhs.get(j, i) * arr[j];
                }
                this.#data[i] = sum;
            }
            return this;
        }
        throw TypeError('rhs is not a Matrix or number');
    }

    divideEqual(rhs) {
        if (isNaN(rhs)) {
            throw TypeError('rhs is not a number');
        }

        this.#data[0] /= rhs;
        this.#data[1] /= rhs;
        this.#data[2] /= rhs;

        return this;
    }

    negative() {
        return new Vector(-this.#data[0], -this.#data[1], -this.#data[2]);
    }

    get(index) {
        if (isNaN(index)) {
            throw TypeError('index is not a number');
        }
        if (index < 0 || index > 2) {
            throw RangeError(`index is out of bounds (index = ${index})`);
        }

        return this.#data[index];
    }

    set(index, value) {
        if (isNaN(index)) {
            throw TypeError('index is not a number');
        } else if (isNaN(value)) {
            throw TypeError('value is not a number');
        } else if (index < 0 || index > 2) {
            throw RangeError(`index is out of bounds (index=${index})`);
        }

        this.#data[index] = value;
    }

    magnitude() {
        return Math.sqrt(this.magnitude2());
    }

    magnitude2() {
        return this.#data[0] * this.#data[0]
             + this.#data[1] * this.#data[1]
             + this.#data[2] * this.#data[2];
    }

    normalize() {
        const mag = this.magnitude();

        this.#data[0] /= mag;
        this.#data[1] /= mag;
        this.#data[2] /= mag;
        return this;
    }

    toString(places = -1) {
        let x, y, z;
        if (places >= 0) {
            x = this.#data[0].toFixed(places);
            y = this.#data[1].toFixed(places);
            z = this.#data[2].toFixed(places);
        } else {
            x = this.#data[0];
            y = this.#data[1];
            z = this.#data[2];
        }
        return `[ ${x}, ${y}, ${z} ]`;
    }

    toArray() {
        return Array.from(this.#data);
    }

    toObject() {
        return { x: this.#data[0], y: this.#data[1], z: this.#data[2] };
    }

}

class Matrix {
    #data = Array(3).fill(new Array(3));

    constructor(arr) {
        if (arr == undefined) {
            this.#data = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
            return;
        } else {
            this.#data = [...Array(3)].map(e => Array(3));
        }
        if (arr.length != 3) {
            throw RangeError('arr must have 3 rows');
        }
        for (let i = 0; i < 3; i++) {
            if (arr[i].length != 3) {
                throw RangeError(`row ${i} must have 3 columns`);
            }
            for (let j = 0; j < 3; j++) {
                if ((arr[i][j] || false) && isNaN(arr[i][j])) {
                    throw TypeError(`element [${i}][${j}] is not a number`);
                }

                this.#data[i][j] = arr[i][j] || 0;
            }
        }
    }

    [Symbol.iterator]() {
        let _row = 0;
        let _data = this.#data;

        return {
            next: function() {
                return {value: _data[_row], done: !(_row++ in _data)}
            }
        }
    }

    add(rhs) {
        if (!(rhs instanceof Matrix)) {
            throw TypeError('rhs is not a Matrix');
        }
        const rtn = new Matrix();
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                rtn.#data[i][j] = this.#data[i][j] + rhs.#data[i][j];
            }
        }
        return rtn;
    }

    subtract(rhs) {
        if (!(rhs instanceof Matrix)) {
            throw TypeError('rhs is not a Matrix');
        }
        const rtn = new Matrix();
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                rtn.#data[i][j] = this.#data[i][j] - rhs.#data[i][j];
            }
        }
        return rtn;
    }

    multiply(rhs) {
        if (rhs instanceof Matrix) {
            let rtn = new Matrix();
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    let sum = 0;
                    for (let k = 0; k < 3; k++) {
                        sum += this.#data[i][k] * rhs.#data[k][j];
                    }
                    rtn.#data[i][j] = sum;
                }
            }
            return rtn;
        } else if (rhs instanceof Vector) {
            let rtn = new Vector();
            for (let i = 0; i < 3; i++) {
                let sum = 0;
                for (let j = 0; j < 3; j++) {
                    sum += this.#data[i][j] * rhs.get(j);
                }
                rtn.set(i, sum);
            }
            return rtn;
        } else if (!isNaN(rhs)) {
            let rtn = new Matrix();
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    rtn.#data[i][j] = this.#data[i][j] * rhs;
                }
            }
            return rtn;
        }
        throw TypeError('rhs is not a Matrix, Vector or number');
    }

    divide(rhs) {
        if (isNaN(rhs)) {
            throw TypeError('rhs is not a number');
        }
        let rtn = new Matrix();
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                rtn.#data[i][j] = this.#data[i][j] / rhs;
            }
        }
        return rtn;
    }

    addEqual(rhs) {
        if (!(rhs instanceof Matrix)) {
            throw TypeError('rhs is not a Matrix');
        }
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                this.#data[i][j] += rhs.#data[i][j];
            }
        }
        return this;
    }

    subtractEqual(rhs) {
        if (!(rhs instanceof Matrix)) {
            throw TypeError('rhs is not a Matrix');
        }
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                this.#data[i][j] -= rhs.#data[i][j];
            }
        }
        return this;
    }

    multiplyEqual(rhs) {
        if (rhs instanceof Matrix) {
            let arr = JSON.parse(JSON.stringify(this.#data));
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    let sum = 0;
                    for (let k = 0; k < 3; k++) {
                        sum += arr[i][k] * rhs.#data[k][j];
                    }
                    this.#data[i][j] = sum;
                }
            }
            return this;
        } else if (!isNaN(rhs)) {
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    this.#data[i][j] *= rhs;
                }
            }
            return this;
        }
        throw TypeError('rhs is not a Matrix or number');
    }

    divideEqual(rhs) {
        if (isNaN(rhs)) {
            throw TypeError('rhs is not a number');
        }
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                this.#data[i][j] /= rhs;
            }
        }
        return this;
    }

    negative() {
        let rtn = new Matrix();
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                rtn.#data[i][j] = -this.#data[i][j];
            }
        }
        return rtn;
    }

    get(row, col) {
        if (isNaN(row)) {
            throw TypeError('row index is not a number');
        } else if (isNaN(col)) {
            throw TypeError('column index is not a number');
        }
        if (row < 0 || row > 2) {
            throw RangeError(`row index out of bounds (row = ${row})`);
        } else if (col < 0 || col > 2) {
            throw RangeError(`column index out of bounds (col = ${col})`);
        }
        return this.#data[row][col];
    }

    set(row, col, val) {
        if (isNaN(row)) {
            throw TypeError('row index is not a number');
        } else if (isNaN(col)) {
            throw TypeError('column index is not a number');
        } else if (isNaN(val)) {
            throw TypeError('val is not a number');
        }
        if (row < 0 || row > 2) {
            throw RangeError(`row index out of bounds (row = ${row})`);
        } else if (col < 0 || col > 2) {
            throw RangeError(`column index out of bounds (col = ${col})`);
        }
        this.#data[row][col] = val;
    }

    toString(places = -1) {
        let strArray = [];
        for (let i = 0; i < 3; i++) {
            let x, y, z;
            if (places >= 0) {
                x = this.#data[i][0].toFixed(places);
                y = this.#data[i][1].toFixed(places);
                z = this.#data[i][2].toFixed(places);
            } else {
                x = this.#data[i][0];
                y = this.#data[i][1];
                z = this.#data[i][2];
            }
            strArray[i] = `[ ${x}, ${y}, ${z} ]`;
        }
        return `[${strArray[0]}\n${strArray[1]}\n${strArray[2]}]`;
    }

    toArray() {
        return JSON.parse(JSON.stringify(this.#data));
    }

    toObject() {
        return {r0: {c0: this.#data[0][0], c1: this.#data[0][1], c2: this.#data[0][2]},
                r1: {c0: this.#data[1][0], c1: this.#data[1][1], c2: this.#data[1][2]},
                r2: {c0: this.#data[2][0], c1: this.#data[2][1], c2: this.#data[2][2]}};
    }

}

module.exports.Vector = Vector;
module.exports.Matrix = Matrix;