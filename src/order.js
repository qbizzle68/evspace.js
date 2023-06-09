class Order {
    #first = Axis.X_AXIS;
    #second = Axis.Y_AXIS;
    #third = Axis.Z_AXIS;

    constructor(first, second, third) {
        if (!(first instanceof Axis.Direction)) {
            throw TypeError('first axis is not an Axis.Direction');
        }
        else if (!(second instanceof Axis.Direction)) {
            throw TypeError('second axis is not an Axis.Direction');
        }
        else if (!(third instanceof Axis.Direction)) {
            throw TypeError('third axis is not an Axis.Direction');
        }

        this.#first = first;
        this.#second = second;
        this.#third = third;
    }

    get first() {
        return this.#first;
    }

    get second() {
        return this.#second;
    }

    get third() {
        return this.#third;
    }

    get(index) {
        if (isNaN(index)) {
            throw TypeError('index is not a number');
        }
        if (index == 0) {
            return this.#first;
        } else if (index == 1) {
            return this.#second;
        } else if (index == 2) {
            return this.#third;
        }
        throw RangeError(`index is out of range (index = ${index})`);
    }

    toString() {
        const first = this.#first.toString();
        const second = this.#second.toString();
        const third = this.#third.toString();

        return `[${first}, ${second}, ${third}]`;
    }

    toObject() {
        return {first: this.#first.value(), second: this.#second.value(), third: this.#third.value()};
    }
}

class Axis {
    static Direction = class {
        #val
        constructor(val) {
            if (isNaN(val)) {
                throw TypeError('axis direction is not a number');
            }
            else if (val < 0 || val > 2) {
                throw RangeError(`axis direction is out of bounds (val = ${val})`);
            }
            this.#val = val;
        }

        value() {
            return this.#val;
        }

        toString() {
            if (this.#val == 0) {
                return 'X_AXIS';
            }
            else if (this.#val == 1) {
                return 'Y_AXIS';
            }
            else if (this.#val == 2) {
                return 'Z_AXIS';
            }
        }
    }

    static X_AXIS = new this.Direction(0);
    static Y_AXIS = new this.Direction(1);
    static Z_AXIS = new this.Direction(2);
}

const XYZ = new Order(Axis.X_AXIS, Axis.Y_AXIS, Axis.Z_AXIS);
const XZY = new Order(Axis.X_AXIS, Axis.Z_AXIS, Axis.Y_AXIS);
const YXZ = new Order(Axis.Y_AXIS, Axis.X_AXIS, Axis.Z_AXIS);
const YZX = new Order(Axis.Y_AXIS, Axis.Z_AXIS, Axis.X_AXIS);
const ZXY = new Order(Axis.Z_AXIS, Axis.X_AXIS, Axis.Y_AXIS);
const ZYX = new Order(Axis.Z_AXIS, Axis.Y_AXIS, Axis.X_AXIS);
const XYX = new Order(Axis.X_AXIS, Axis.Y_AXIS, Axis.X_AXIS);
const XZX = new Order(Axis.X_AXIS, Axis.Z_AXIS, Axis.X_AXIS);
const YXY = new Order(Axis.Y_AXIS, Axis.X_AXIS, Axis.Y_AXIS);
const YZY = new Order(Axis.Y_AXIS, Axis.Z_AXIS, Axis.Y_AXIS);
const ZXZ = new Order(Axis.Z_AXIS, Axis.X_AXIS, Axis.Z_AXIS);
const ZYZ = new Order(Axis.Z_AXIS, Axis.Y_AXIS, Axis.Z_AXIS);

module.exports.Order = Order;
module.exports.Axis = Axis;
module.exports.XYZ = XYZ;
module.exports.XZY = XZY;
module.exports.YXZ = YXZ;
module.exports.YZX = YZX;
module.exports.ZXY = ZXY;
module.exports.ZYX = ZYX;
module.exports.XYX = XYX;
module.exports.XZX = XZX;
module.exports.YXY = YXY;
module.exports.YZY = YZY;
module.exports.ZXZ = ZXZ;
module.exports.ZYZ = ZYZ;
