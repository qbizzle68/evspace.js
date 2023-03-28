const Matrix = require('./matrix.js');

class Vector {
    #data = [0, 0, 0];
    constructor(x, y, z) {
        if (isNaN(x)) {
            throw 'x component is not a number';
        }
        if (isNaN(y)) {
            throw 'y component is not a number';
        }
        if (isNaN(z)) {
            throw 'z component is not a number';
        }

        this.#data = [x, y, z];
    }

    add(rhs) {
        if (!(rhs instanceof Vector)) {
            throw 'rhs is not a Vector';
        }
        return new Vector(this.#data[0] + rhs.#data[0],
                          this.#data[1] + rhs.#data[1],
                          this.#data[2] + rhs.#data[2]);
    }

    sub(rhs) {
        if (!(rhs instanceof Vector)) {
            throw 'rhs is not a Vector';
        }
        return new Vector(this.#data[0] - rhs.#data[0],
                          this.#data[1] - rhs.#data[1],
                          this.#data[2] - rhs.#data[2]);
    }

    mult(rhs) {
        if (rhs instanceof Matrix) {
            let rtn = Vector();
            for (let i = 0; i < 3; i++) {
                let sum = 0;
                for (let j = 0; j < 3; j++) {
                    sum += rhs.get(j, i) * this.#data[j];
                }
                rtn.#data[i];
            }
            return rtn;
        } else if (rhs instanceof Number) {
            return new Vector(this.#data[0] * rhs,
                              this.#data[1] * rhs,
                              this.#data[2] * rhs);
        }
        throw 'rhs is not a number';
    }

    div(rhs) {
        if (isNaN(rhs)) {
            throw 'rhs is not a number';
        }
        return new Vector(this.#data[0] / rhs,
                          this.#data[1] / rhs,
                          this.#data[2] / rhs);
    }

    addEqual(rhs) {
        if (!(rhs instanceof Vector)) {
            throw 'rhs is not a Vector';
        }
        this.#data[0] += rhs.#data[0];
        this.#data[1] += rhs.#data[1];
        this.#data[2] += rhs.#data[2];
        return this;
    }

    subEqual(rhs) {
        if (!(rhs instanceof Vector)) {
            throw 'rhs is not a Vector';
        }
        this.#data[0] -= rhs.#data[0];
        this.#data[1] -= rhs.#data[1];
        this.#data[2] -= rhs.#data[2];
        return this;
    }

    multEqual(rhs) {
        if (rhs instanceof Number) {
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
        throw 'rhs is not a Number';
    }

    divEqual(rhs) {
        if (isNaN(rhs)) {
            throw 'rhs is not a Number';
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
            throw 'index is not a number';
        }
        return this.#data[index];
    }

    set(index, value) {
        if (isNaN(index)) {
            throw 'index is not a number';
        }
        if (isNaN(value)) {
            throw 'value is not a number';
        }
        this.#data[index] = value;
    }

    mag() {
        const arg = this.#data[0] * this.#data[0]
                  + this.#data[1] * this.#data[1]
                  + this.#data[2] * this.#data[2];
        return Math.sqrt(arg);
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

}

module.exports = Vector;
