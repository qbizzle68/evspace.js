export default class Order {
    #first = Axis.X_AXIS;
    #second = Axis.Y_AXIS;
    #third = Axis.Z_AXIS;

    constructor(first, second, third) {
        if (!(first instanceof Axis.Direction)) {
            throw 'first axis is not an Axis.Direction';
        }
        else if (!(second instanceof Axis.Direction)) {
            throw 'second axis is not an Axis.Direction';
        }
        else if (!(third instanceof Axis.Direction)) {
            throw 'third axis is not an Axis.Direction';
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

    toString() {
        const first = this.#first.toString();
        const second = this.#second.toString();
        const third = this.#third.toString();

        return `[${first}, ${second}, ${third}]`;
    }
}

export class Axis {
    static Direction = class {
        #val
        constructor(val) {
            if (isNaN(val)) {
                throw 'axis direction is not a number';
            }
            else if (val < 0 || val > 2) {
                throw `axis direction is out of bounds (val = ${val})`;
            }
            this.#val = val;
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

export const XYZ = new Order(Axis.X_AXIS, Axis.Y_AXIS, Axis.Z_AXIS);
export const XZY = new Order(Axis.X_AXIS, Axis.Z_AXIS, Axis.Y_AXIS);
export const YXZ = new Order(Axis.Y_AXIS, Axis.X_AXIS, Axis.Z_AXIS);
export const YZX = new Order(Axis.Y_AXIS, Axis.Z_AXIS, Axis.X_AXIS);
export const ZXY = new Order(Axis.Z_AXIS, Axis.X_AXIS, Axis.Y_AXIS);
export const ZYX = new Order(Axis.Z_AXIS, Axis.Y_AXIS, Axis.X_AXIS);
export const XYX = new Order(Axis.X_AXIS, Axis.Y_AXIS, Axis.X_AXIS);
export const XZX = new Order(Axis.X_AXIS, Axis.Z_AXIS, Axis.X_AXIS);
export const YXY = new Order(Axis.Y_AXIS, Axis.X_AXIS, Axis.Y_AXIS);
export const YZY = new Order(Axis.Y_AXIS, Axis.Z_AXIS, Axis.Y_AXIS);
export const ZXZ = new Order(Axis.Z_AXIS, Axis.X_AXIS, Axis.Z_AXIS);
export const ZYZ = new Order(Axis.Z_AXIS, Axis.Y_AXIS, Axis.Z_AXIS);
