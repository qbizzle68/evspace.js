const Matrix = require('./matrix.js');

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
            const rtn = Vector();
            for (let i = 0; i < 3; i++) {
                let sum = 0;
                for (let j = 0; j < 3; j++) {
                    sum += rhs.get(j, i) * this.#data[j];
                }
                rtn.#data[i];
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

    neg() {
        return new Vector(-this.#data[0], -this.#data[1], -this.#data[2]);
    }

    get(index) {
        if (isNaN(index)) {
            throw TypeError('index is not a number');
        }

        return this.#data[index];
    }

    set(index, value) {
        if (isNaN(index)) {
            throw 'index is not a number';
        } else if (isNaN(value)) {
            throw 'value is not a number';
        } else if (index < 0 || index > 2) {
            throw `index is out of bounds (index=${index})`;
        }

        this.#data[index] = value;
    }

    mag() {
        return Math.sqrt(this.mag2());
    }

    mag2() {
        return this.#data[0] * this.#data[0]
             + this.#data[1] * this.#data[1]
             + this.#data[2] * this.#data[2];
    }

    normalize() {
        const mag = this.mag();

        this.#data[0] /= mag;
        this.#data[1] /= mag;
        this.#data[2] /= mag;
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

module.exports = Vector;
