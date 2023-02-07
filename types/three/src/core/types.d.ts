// type int = number;
// type uint = number;
// type float = number;

import { BufferAttribute, GLBufferAttribute, InstancedBufferAttribute, InterleavedBufferAttribute } from "three";

export type TypedArray =
    | Int8Array
    | Uint8Array
    | Uint8ClampedArray
    | Int16Array
    | Uint16Array
    | Int32Array
    | Uint32Array
    | Float32Array
    | Float64Array;

export type IntTypedArray = 
    | Int8Array 
    | Uint8Array 
    | Uint8ClampedArray 
    | Int16Array 
    | Uint16Array 
    | Int32Array;

export type UIntTypedArray = 
    | Uint8Array 
    | Uint8ClampedArray 
    | Uint16Array;


export type AttributeLike = 
    | BufferAttribute<TypedArray> 
    | InstancedBufferAttribute<TypedArray> 
    | InterleavedBufferAttribute 
    | InstancedInterleavedBufferAttribute 
    | GLBufferAttribute;