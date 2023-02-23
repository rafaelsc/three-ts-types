import { BufferAttribute } from './BufferAttribute';
import { TypedArray } from './types';
import { InterleavedBuffer } from './InterleavedBuffer';
import { Matrix4 } from './../math/Matrix4';
import { Matrix } from './../math/Matrix3';
/**
 * see {@link https://github.com/mrdoob/three.js/blob/master/src/core/InterleavedBufferAttribute.js|src/core/InterleavedBufferAttribute.js}
 */
export class InterleavedBufferAttribute<TArray extends TypedArray = TypedArray> {
    constructor(interleavedBuffer: InterleavedBuffer<TArray>, itemSize: number, offset: number, normalized?: boolean);

    /**
     * @default ''
     */
    name: string;
    data: InterleavedBuffer;
    itemSize: number;
    offset: number;

    /**
     * @default false
     */
    normalized: boolean;

    get count(): number;
    get array(): TArray;
    set needsUpdate(value: boolean);

    readonly isInterleavedBufferAttribute: true;

    applyMatrix4(m: Matrix4): this;
    applyNormalMatrix(matrix: Matrix): this;
    transformDirection(matrix: Matrix): this;

    clone(): BufferAttribute<TArray>;
    clone(data: object): InterleavedBufferAttribute<TArray>;

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

    toJSON(data?: object): {
        isInterleavedBufferAttribute: true;
        itemSize: number;
        data: string;
        offset: number;
        normalized: boolean;
    };
}
