export default class Angles {
    constructor(axis1, axis2, axis3) {
        this.alpha = axis1;
        this.beta = axis2;
        this.gamma = axis3;
    }

    get(index) {
        if (isNaN(index)) {
            throw 'index is not a number';
        }
        if (index == 0) {
            return this.alpha;
        } else if (index == 1) {
            return this.beta;
        } else if (index == 2) {
            return this.gamma;
        }
        throw 'index out of range';
    }

    toString() {
        const angs = [];
        for (let i = 0; i < 3; i++) {
            if (this.get(i) == 0) {
                angs[0] = 'X_AXIS';
            } else if (this.get(i) == 1) {
                angs[1] = 'Y_AXIS';
            } else if (this.get(i) == 2) {
                angs[2] = 'Z_AXIS';
            }
        }
        return `[${angs[0]}, ${angs[1]}, ${angs[2]}]`;
    }

}

export class Axis {
    static X_AXIS = 0;
    static Y_AXIS = 1;
    static Z_AXIS = 2;
}

export const XYZ = new Angles(Axis.X_AXIS, Axis.Y_AXIS, Axis.Z_AXIS);
export const XZY = new Angles(Axis.X_AXIS, Axis.Z_AXIS, Axis.Y_AXIS);
export const YXZ = new Angles(Axis.Y_AXIS, Axis.X_AXIS, Axis.Z_AXIS);
export const YZX = new Angles(Axis.Y_AXIS, Axis.Z_AXIS, Axis.X_AXIS);
export const ZXY = new Angles(Axis.Z_AXIS, Axis.X_AXIS, Axis.Y_AXIS);
export const ZYX = new Angles(Axis.Z_AXIS, Axis.Y_AXIS, Axis.X_AXIS);
export const XYX = new Angles(Axis.X_AXIS, Axis.Y_AXIS, Axis.X_AXIS);
export const XZX = new Angles(Axis.X_AXIS, Axis.Z_AXIS, Axis.X_AXIS);
export const YXY = new Angles(Axis.Y_AXIS, Axis.X_AXIS, Axis.Y_AXIS);
export const YZY = new Angles(Axis.Y_AXIS, Axis.Z_AXIS, Axis.Y_AXIS);
export const ZXZ = new Angles(Axis.Z_AXIS, Axis.X_AXIS, Axis.Z_AXIS);
export const ZYZ = new Angles(Axis.Z_AXIS, Axis.Y_AXIS, Axis.Z_AXIS);
