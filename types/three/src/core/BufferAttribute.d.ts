import { Usage } from '../constants';
import { Matrix3 } from './../math/Matrix3';
import { Matrix4 } from './../math/Matrix4';

type int = number;
type uint = number;
type float = number;

type TypedArray = Int8Array
                  | Uint8Array 
                  | Uint8ClampedArray
                  | Int16Array
                  | Uint16Array
                  | Int32Array
                  | Uint32Array
                  | Float32Array
                  | Float64Array

type IntTypedArray = Int8Array
                     | Uint8Array 
                     | Uint8ClampedArray
                     | Int16Array
                     | Uint16Array
                     | Int32Array

type UIntTypedArray = Uint8Array 
                      | Uint8ClampedArray 
                      | Uint16Array

/**
 * see {@link https://github.com/mrdoob/three.js/blob/master/src/core/BufferAttribute.js|src/core/BufferAttribute.js}
 */
export class BufferAttribute<TArray extends TypedArray = TypedArray> {
    /**
     * @param array - Must be a TypedArray. Used to instantiate the buffer.
     * This array should have
     * ```
     * itemSize * numVertices
     * ```
     * elements, where numVertices is the number of vertices in the associated BufferGeometry.
     * @param itemSize - the number of values of the array that should be associated with a particular vertex.
     * For instance, if this attribute is storing a 3-component vector (such as a position, normal, or color),
     * then itemSize should be 3.
     * @param normalized - (optional) Applies to integer data only.
     * Indicates how the underlying data in the buffer maps to the values in the GLSL code.
     * For instance, if array is an instance of UInt16Array, and normalized is true,
     * the values 0 - +65535 in the array data will be mapped to 0.0f - +1.0f in the GLSL attribute.
     * An Int16Array (signed) would map from -32768 - +32767 to -1.0f - +1.0f.
     * If normalized is false, the values will be converted to floats unmodified,
     * i.e. 32767 becomes 32767.0f.
     */
    constructor(array: TArray, itemSize: number, normalized?: boolean); // array parameter should be TypedArray.

    /**
     * @default ''
     */
    name: string;
    array: TArray;
    itemSize: number;

    /**
     * @default THREE.StaticDrawUsage
     */
    usage: Usage;

    /**
     * @default { offset: number; count: number }
     */
    updateRange: { offset: number; count: number };

    /**
     * @default 0
     */
    version: number;

    /**
     * @default false
     */
    normalized: boolean;

    /**
     * @default 0
     */
    count: number;

    set needsUpdate(value: boolean);

    readonly isBufferAttribute: true;

    onUploadCallback: () => void;
    onUpload(callback: () => void): this;

    setUsage(usage: Usage): this;
    clone(): BufferAttribute<TArray>;
    
    copy<TOtherArray extends TypedArray>(source: BufferAttribute<TOtherArray>): asserts this is this & { array:TOtherArray };
    //copy<TOtherArray extends TypedArray>(source: BufferAttribute<TOtherArray>): asserts this is this & { array:TOtherArray };
    //copy<TOtherArray extends TypedArray>(source: BufferAttribute<TOtherArray>): asserts this is BufferAttribute<TOtherArray>;
    copyAt<TOtherArray extends TypedArray>(index1: number, attribute: BufferAttribute<TOtherArray>, index2: number): this;
    copyArray(array: TypedArray | Array<number>): this;
    
    applyMatrix3(m: Matrix3): this;
    applyMatrix4(m: Matrix4): this;
    applyNormalMatrix(m: Matrix3): this;
    transformDirection(m: Matrix4): this;
    
    set(value: ArrayLike<number> | TypedArray, offset?: number): this;
    getX(index: number): number;
    setX(index: number, x: number): this;
    getY(index: number): number;
    setY(index: number, y: number): this;
    getZ(index: number): number;
    setZ(index: number, z: number): this;
    getW(index: number): number;
    setW(index: number, z: number): this;
    setXY(index: number, x: number, y: number): this;
    setXYZ(index: number, x: number, y: number, z: number): this;
    setXYZW(index: number, x: number, y: number, z: number, w: number): this;
    
    toJSON(): {
        itemSize: number;
        type: string;
        array: number[];
        normalized: boolean;
    };
}

export class Int8BufferAttribute extends BufferAttribute<Int8Array>  {
    constructor(
        length: number,
        itemSize: number,
        normalized?: boolean,
    );
    constructor(
        elements: Iterable<number>,
        itemSize: number,
        normalized?: boolean,
    );
    constructor(
        array: Iterable<number> | ArrayLike<number> | TypedArray | ArrayBufferLike,
        itemSize: number,
        normalized?: boolean,
    );
}

export class Uint8BufferAttribute extends BufferAttribute<Uint8Array>  {
    constructor(
        length: number,
        itemSize: number,
        normalized?: boolean,
    );
    constructor(
        elements: Iterable<number>,
        itemSize: number,
        normalized?: boolean,
    );
    constructor(
        array: Iterable<number> | ArrayLike<number> | TypedArray | ArrayBufferLike,
        itemSize: number,
        normalized?: boolean,
    );
}

export class Uint8ClampedBufferAttribute extends BufferAttribute<Uint8ClampedArray>  {
    constructor(
        length: number,
        itemSize: number,
        normalized?: boolean,
    );
    constructor(
        elements: Iterable<number>,
        itemSize: number,
        normalized?: boolean,
    );
    constructor(
        array: Iterable<number> | ArrayLike<number> | TypedArray | ArrayBufferLike,
        itemSize: number,
        normalized?: boolean,
    );
}

export class Int16BufferAttribute extends BufferAttribute<Int16Array> {
    constructor(
        length: number,
        itemSize: number,
        normalized?: boolean,
    );
    constructor(
        elements: Iterable<number>,
        itemSize: number,
        normalized?: boolean,
    );
    constructor(
        array: Iterable<number> | ArrayLike<number> | TypedArray | ArrayBufferLike,
        itemSize: number,
        normalized?: boolean,
    );
}

export class Uint16BufferAttribute extends BufferAttribute<Uint16Array> {
    constructor(
        length: number,
        itemSize: number,
        normalized?: boolean,
    );
    constructor(
        elements: Iterable<number>,
        itemSize: number,
        normalized?: boolean,
    );
    constructor(
        array: Iterable<number> | ArrayLike<number> | TypedArray | ArrayBufferLike,
        itemSize: number,
        normalized?: boolean,
    );
}

export class Int32BufferAttribute extends BufferAttribute<Int32Array>  {
    constructor(
        length: number,
        itemSize: number,
        normalized?: boolean,
    );
    constructor(
        elements: Iterable<number>,
        itemSize: number,
        normalized?: boolean,
    );
    constructor(
        array: Iterable<number> | ArrayLike<number> | TypedArray | ArrayBufferLike,
        itemSize: number,
        normalized?: boolean,
    );
}

export class Uint32BufferAttribute extends BufferAttribute<Uint32Array> {
    constructor(
        length: number,
        itemSize: number,
        normalized?: boolean,
    );
    constructor(
        elements: Iterable<number>,
        itemSize: number,
        normalized?: boolean,
    );
    constructor(
        array: Iterable<number> | ArrayLike<number> | TypedArray | ArrayBufferLike,
        itemSize: number,
        normalized?: boolean,
    );
}

export class Float16BufferAttribute extends BufferAttribute<Uint16Array> {
    constructor(
        length: number,
        itemSize: number,
        normalized?: boolean,
    );
    constructor(
        elements: Iterable<number>,
        itemSize: number,
        normalized?: boolean,
    );
    constructor(
        array: Iterable<number> | ArrayLike<number> | TypedArray | ArrayBufferLike,
        itemSize: number,
        normalized?: boolean,
    );
}

export class Float32BufferAttribute extends BufferAttribute<Float32Array> {
    constructor(
        length: number,
        itemSize: number,
        normalized?: boolean,
    );
    constructor(
        elements: Iterable<number>,
        itemSize: number,
        normalized?: boolean,
    );
    constructor(
        array: Iterable<number> | ArrayLike<number> | TypedArray | ArrayBufferLike,
        itemSize: number,
        normalized?: boolean,
    );
}

export class Float64BufferAttribute extends BufferAttribute<Float64Array> {
    constructor(
        length: number,
        itemSize: number,
        normalized?: boolean,
    );
    constructor(
        elements: Iterable<number>,
        itemSize: number,
        normalized?: boolean,
    );
    constructor(
        array: Iterable<number> | ArrayLike<number> | TypedArray | ArrayBufferLike,
        itemSize: number,
        normalized?: boolean,
    );
}
