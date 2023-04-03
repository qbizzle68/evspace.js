import json

import pyevspace as evs

from math import pi

answers = {}

def toList(obj):
    arr = []
    if isinstance(obj, evs.Matrix):
        for i in range(3):
            colArr = []
            for j in range(3):
                colArr.append(obj[i][j])
            arr.append(colArr)
    elif isinstance(obj, evs.Vector):
        for i in range(3):
            arr.append(obj[i])
    return arr

def toString(obj):
    if isinstance(obj, evs.Order):
        return str(obj)
    elif obj is evs.X_AXIS:
        return 'X_AXIS'
    elif obj is evs.Y_AXIS:
        return 'Y_AXIS'
    elif obj is evs.Z_AXIS:
        return 'Z_AXIS'
    raise TypeError('obj not Order or an axis')


PIO4 = pi / 4

rotation_xaxis_answers = [toList(evs.getMatrixAxis(evs.X_AXIS, PIO4 * i)) for i in range(8)]
rotation_yaxis_answers = [toList(evs.getMatrixAxis(evs.Y_AXIS, PIO4 * i)) for i in range(8)]
rotation_zaxis_answers = [toList(evs.getMatrixAxis(evs.Z_AXIS, PIO4 * i)) for i in range(8)]

rotation_matrix_answers = {
    toString(evs.X_AXIS): rotation_xaxis_answers,
    toString(evs.Y_AXIS): rotation_yaxis_answers,
    toString(evs.Z_AXIS): rotation_zaxis_answers
}

orders = [evs.XYZ, evs.XZY, evs.YXZ, evs.YZX, evs.ZXY, evs.ZYX,
          evs.XYX, evs.XZX, evs.YXY, evs.YZY, evs.ZXZ, evs.ZYZ]

rotation_euler_answers = {toString(o): [toList(evs.getMatrixEuler(o, evs.Angles(PIO4 * i, PIO4 * i, PIO4 * i))) for i in range(8)] for o in orders}

vectors = [evs.Vector.e1, evs.Vector.e2, evs.Vector.e3]
axes = [evs.X_AXIS, evs.Y_AXIS, evs.Z_AXIS]
PIO2 = pi / 2

rotation_axis_to_answers = {toString(axis): {toString(axisRot): toList(evs.rotateAxisTo(axis, PIO2, vectors[axisRot])) for axisRot in axes} for axis in axes}
rotation_axis_from_answers = {toString(axis): {toString(axisRot): toList(evs.rotateAxisFrom(axis, PIO2, vectors[axisRot])) for axisRot in axes} for axis in axes}

angs90 = evs.Angles(pi/2, pi/2, pi/2)

rotation_euler_to_answers = {toString(order): {toString(axisRot): toList(evs.rotateEulerTo(order, angs90, vectors[axisRot])) for axisRot in axes} for order in orders}
rotation_euler_from_answers = {toString(order): {toString(axisRot): toList(evs.rotateEulerFrom(order, angs90, vectors[axisRot])) for axisRot in axes} for order in orders}

offset = evs.Vector(1, 1, 1)

rotation_offset_to_answers = {
    toString(order): {
        toString(axisRot): toList(evs.rotateOffsetTo(evs.getMatrixEuler(order, angs90), offset, vectors[axisRot])) for axisRot in axes
    } for order in orders
}
rotation_offset_from_answers = {
    toString(order): {
        toString(axisRot): toList(evs.rotateOffsetFrom(evs.getMatrixEuler(order, angs90), offset, vectors[axisRot])) for axisRot in axes
    } for order in orders
}

rotation_from_to_answers = {
    toString(orderFrom): {
        toString(orderTo): 
            toList(evs.getMatrixFromTo(orderFrom, angs90, orderTo, angs90)) for orderTo in orders
    } for orderFrom in orders
}

# from ref frame to offset ref frame
rotation_ref_to_ref_offset = {
    toString(order1): {
        toString(order2): {
            toString(axes[i]):
                toList(evs.ReferenceFrame(order1, angs90).rotateToFrame(evs.ReferenceFrame(order2, angs90, offset=offset), vectors[i])) for i in range(3)
        } for order2 in orders
    } for order1 in orders
}

# from ref frame from offset ref frame
rotation_ref_from_ref_offset = {
    toString(order1): {
        toString(order2): {
            toString(axes[i]):
                toList(evs.ReferenceFrame(order1, angs90).rotateFromFrame(evs.ReferenceFrame(order2, angs90, offset=offset), vectors[i])) for i in range(3)
        } for order2 in orders
    } for order1 in orders
}

# from ref frame offset to ref frame non-offset
rotation_ref_offset_to_ref = {
    toString(order1): {
        toString(order2): {
            toString(axes[i]):
                toList(evs.ReferenceFrame(order1, angs90, offset=offset).rotateToFrame(evs.ReferenceFrame(order2, angs90), vectors[i])) for i in range(3)
        } for order2 in orders
    } for order1 in orders
}

# from ref frame offset from ref frame non-offset
rotation_ref_offset_from_ref = {
    toString(order1): {
        toString(order2): {
            toString(axes[i]):
                toList(evs.ReferenceFrame(order1, angs90, offset=offset).rotateFromFrame(evs.ReferenceFrame(order2, angs90), vectors[i])) for i in range(3)
        } for order2 in orders
    } for order1 in orders
}

# from ref frame to ref frame
rotation_ref_to_ref = {
    toString(order1): {
        toString(order2): {
            toString(axes[i]):
                toList(evs.ReferenceFrame(order1, angs90).rotateToFrame(evs.ReferenceFrame(order2, angs90), vectors[i])) for i in range(3)
        } for order2 in orders
    } for order1 in orders
}

# from ref frame from ref frame
rotation_ref_from_ref = {
    toString(order1): {
        toString(order2): {
            toString(axes[i]):
                toList(evs.ReferenceFrame(order1, angs90).rotateFromFrame(evs.ReferenceFrame(order2, angs90), vectors[i])) for i in range(3)
        } for order2 in orders
    } for order1 in orders
}

# from offset reference frame to non-offset reference frame
rotation_ref_offset_to_ref = {
    toString(order1): {
        toString(order2): {
            toString(axes[i]):
                toList(evs.ReferenceFrame(order1, angs90, offset=offset).rotateToFrame(evs.ReferenceFrame(order2, angs90), vectors[i])) for i in range(3)
        } for order2 in orders
    } for order1 in orders
}

# from offset reference frame from non-offset reference frame
rotation_ref_offset_from_ref = {
    toString(order1): {
        toString(order2): {
            toString(axes[i]):
                toList(evs.ReferenceFrame(order1, angs90, offset=offset).rotateFromFrame(evs.ReferenceFrame(order2, angs90), vectors[i])) for i in range(3)
        } for order2 in orders
    } for order1 in orders
}

offset2 = evs.Vector(-1, -1, -1)
rotation_ref_offset_to_offset = {
    toString(order1): {
        toString(order2): {
            toString(axes[i]):
                toList(evs.ReferenceFrame(order1, angs90, offset=offset).rotateToFrame(evs.ReferenceFrame(order2, angs90, offset=offset2), vectors[i])) for i in range(3)
        } for order2 in orders
    } for order1 in orders
}

rotation_ref_offset_from_offset = {
    toString(order1): {
        toString(order2): {
            toString(axes[i]):
                toList(evs.ReferenceFrame(order1, angs90, offset=offset).rotateFromFrame(evs.ReferenceFrame(order2, angs90, offset=offset2), vectors[i])) for i in range(3)
        } for order2 in orders
    } for order1 in orders
}


answers['rotation_matrix'] = rotation_matrix_answers
answers['rotation_euler'] = rotation_euler_answers
answers['rotation_axis_to'] = rotation_axis_to_answers
answers['rotation_axis_from'] = rotation_axis_from_answers
answers['rotation_euler_to'] = rotation_euler_to_answers
answers['rotation_euler_from'] = rotation_euler_from_answers
answers['rotation_offset_to'] = rotation_offset_to_answers
answers['rotation_offset_from'] = rotation_offset_from_answers
answers['rotation_from_to'] = rotation_from_to_answers
answers['rotation_ref_to_ref'] = rotation_ref_to_ref
answers['rotation_ref_from_ref'] = rotation_ref_from_ref
answers['rotation_ref_to_ref_offset'] = rotation_ref_to_ref_offset
answers['rotation_ref_from_ref_offset'] = rotation_ref_from_ref_offset
answers['rotation_ref_offset_to_ref'] = rotation_ref_offset_to_ref
answers['rotation_ref_offset_from_ref'] = rotation_ref_offset_from_ref
answers['rotation_ref_offset_to_offset'] = rotation_ref_offset_to_offset
answers['rotation_ref_offset_from_offset'] = rotation_ref_offset_from_offset
# answers['rotation_refframe_from_to_offset'] = rotation_refframe_from_to_offset_answers

if __name__ == '__main__':
    print(json.dumps(answers))
