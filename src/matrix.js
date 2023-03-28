const Vector = require('./vector.js');

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
            throw 'arr must have 3 rows';
        }
        for (let i = 0; i < 3; i++) {
            if (arr[i].length != 3) {
                throw `row ${i} must have 3 columns`;
            }
            for (let j = 0; j < 3; j++) {
                if (isNaN(arr[i][j])) {
                    throw `element [${i}][${j}] is not a number`;
                }
                this.#data[i][j] = arr[i][j];
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
            throw 'rhs is not a Matrix';
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
            throw 'rhs is not a Matrix';
        }
        const rtn = new Matrix();
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                rtn.#data[i][j] = this.#data[i][j] - rhs.#data[i][j];
            }
        }
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
        throw 'rhs is not a Matrix, Vector or number';
    }

    divide(rhs) {
        if (isNaN(rhs)) {
            throw 'rhs is not a number';
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
            throw 'rhs is not a Matrix';
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
            throw 'rhs is not a Matrix';
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
        throw 'rhs is not a Matrix or number';
    }

    divideEqual(rhs) {
        if (isNaN(rhs)) {
            throw 'rhs is not a number';
        }
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                this.#data[i][j] /= rhs;
            }
        }
        return this;
    }

    neg() {
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
            throw 'row index is not a number';
        } else if (isNaN(col)) {
            throw 'column index is not a number';
        }
        if (row < 0 || row > 2) {
            throw `row index out of bounds (row = ${row})`;
        } else if (col < 0 || col > 2) {
            throw `column index out of bounds (col = ${col})`;
        }
        return this.#data[row][col];
    }

    set(row, col, val) {
        if (isNaN(row)) {
            throw 'row index is not a number';
        } else if (isNaN(col)) {
            throw 'column index is not a number';
        } else if (isNaN(val)) {
            throw 'val is not a number';
        }
        if (row < 0 || row > 2) {
            throw `row index out of bounds (row = ${row})`;
        } else if (col < 0 || col > 2) {
            throw `column index out of bounds (col = ${col})`;
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
        return {row0: {col0: this.#data[0][0], col1: this.#data[0][1], col2: this.#data[0][2]},
                row1: {col0: this.#data[1][0], col1: this.#data[1][1], col2: this.#data[1][2]},
                row2: {col0: this.#data[2][0], col1: this.#data[2][1], col2: this.#data[2][2]}};
    }

}

module.exports = Matrix;
