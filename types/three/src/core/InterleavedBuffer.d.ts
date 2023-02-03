import { InterleavedBufferAttribute } from './InterleavedBufferAttribute';
import { Usage } from '../constants';
import { TypedArray } from './BufferAttribute';

/**
 * see {@link https://github.com/mrdoob/three.js/blob/master/src/core/InterleavedBuffer.js|src/core/InterleavedBuffer.js}
 */
export class InterleavedBuffer<TArray extends TypedArray = TypedArray> {
    constructor(array: TArray, stride: number);

    array: TArray;
    stride: number;

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

    length: number;

    /**
     * @default 0
     */
    count: number;
    needsUpdate: boolean;
    uuid: string;

    setUsage(usage: Usage): this;
    clone(data: object): InterleavedBuffer<TArray>;
    copy(source: InterleavedBuffer): this;
    copyAt(index1: number, attribute: InterleavedBufferAttribute, index2: number): this;
    set(value: ArrayLike<number>, index: number): this;
    
    toJSON(data: object): {
        uuid: string;
        buffer: string;
        type: string;
        stride: number;
    };
}
