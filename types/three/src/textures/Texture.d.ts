// https://threejs.org/docs/?q=texture#api/en/textures/Texture

import { Vector2 } from './../math/Vector2';
import { Matrix3 } from './../math/Matrix3';
import { Source } from './Source';
import { EventDispatcher } from './../core/EventDispatcher';
import {
    Mapping,
    Wrapping,
    TextureFilter,
    PixelFormat,
    PixelFormatGPU,
    TextureDataType,
    TextureEncoding,
    MagnificationTextureFilter,
    MinificationTextureFilter,
} from '../constants';

/** Shim for OffscreenCanvas. */
// tslint:disable-next-line:no-empty-interface
export interface OffscreenCanvas extends EventTarget {}

/**
 * Create a {@link Texture} to apply to a surface or as a reflection or refraction map.
 * @remarks
 * After the initial use of a texture, its **dimensions**, {@link format}, and {@link type} cannot be changed
 * Instead, call {@link dispose | .dispose()} on the {@link Texture} and instantiate a new {@link Texture}.
 * @example
 * ```typescript
 * // load a texture, set wrap mode to repeat
 * const texture = new THREE.TextureLoader().load("textures/water.jpg");
 * texture.wrapS = THREE.RepeatWrapping;
 * texture.wrapT = THREE.RepeatWrapping;
 * texture.repeat.set(4, 4);
 * ```
 * @see Example: {@link https://threejs.org/examples/#webgl_materials_texture_filters | webgl materials texture filters}
 * @see {@link https://threejs.org/docs/index.html#api/en/constants/Textures | Texture Constants}
 * @see {@link https://threejs.org/docs/index.html#api/en/Textures/Texture | Official Documentation}
 * @see {@link https://github.com/mrdoob/three.js/blob/master/src/Textures/Texture.js | Source}
 */
export class Texture extends EventDispatcher {
    /**
     * @param [image]
     * @param [mapping=THREE.Texture.DEFAULT_MAPPING]
     * @param [wrapS=THREE.ClampToEdgeWrapping]
     * @param [wrapT=THREE.ClampToEdgeWrapping]
     * @param [magFilter=THREE.LinearFilter]
     * @param [minFilter=THREE.LinearMipmapLinearFilter]
     * @param [format=THREE.RGBAFormat]
     * @param [type=THREE.UnsignedByteType]
     * @param [anisotropy=THREE.Texture.DEFAULT_ANISOTROPY]
     * @param [encoding=THREE.LinearEncoding]
     */
    constructor(
        image?: TexImageSource | OffscreenCanvas,
        mapping?: Mapping,
        wrapS?: Wrapping,
        wrapT?: Wrapping,
        magFilter?: TextureFilter,
        minFilter?: TextureFilter,
        format?: PixelFormat,
        type?: TextureDataType,
        anisotropy?: number,
        encoding?: TextureEncoding,
    );

    /**
     * Read-only flag to check if a given object is of type {@link Texture}.
     * @remarks This is a _constant_ value
     * @defaultValue `true`
     */
    readonly isTexture: true;

    /**
     * Unique number for this {@link Texture} instance.
     * @remarks Note that ids are assigned in chronological order: 1, 2, 3, ..., incrementing by one for each new object.
     * @remarks Expects a `Integer`
     */
    readonly id: number;

    /**
     * {@link http://en.wikipedia.org/wiki/Universally_unique_identifier | UUID} of this object instance.
     * @remarks This gets automatically assigned and shouldn't be edited.
     */
    uuid: string;

    /**
     * Optional name of the object
     * @remarks _(doesn't need to be unique)_.
     * @defaultValue `""`
     */
    name: string;

    /**
     * The data definition of a texture. A reference to the data source can be shared across textures.
     * This is often useful in context of spritesheets where multiple textures render the same data
     * but with different {@link Texture} transformations.
     */
    source: Source;

    /**
     * An image object, typically created using the {@link THREE.TextureLoader.load | TextureLoader.load()} method.
     * This can be any image (e.g., PNG, JPG, GIF, DDS) or video (e.g., MP4, OGG/OGV) type supported by three.js.
     * @remarks To use video as a {@link Texture} you need to have a playing HTML5 video element as a source
     * for your {@link Texture} image and continuously update this {@link Texture}
     * as long as video is playing - the {@link THREE.VideoTexture | VideoTexture} class handles this automatically.
     */
    get image(): any;

    /**
     * An image object, typically created using the {@link THREE.TextureLoader.load | TextureLoader.load()} method.
     * This can be any image (e.g., PNG, JPG, GIF, DDS) or video (e.g., MP4, OGG/OGV) type supported by three.js.
     * @remarks To use video as a {@link Texture} you need to have a playing HTML5 video element as a source
     * for your {@link Texture} image and continuously update this {@link Texture}
     * as long as video is playing - the {@link THREE.VideoTexture | VideoTexture} class handles this automatically.
     * @param data
     */
    set image(data: any);

    /**
     * Array of user-specified mipmaps
     * @defaultValue `[]`
     */
    mipmaps: any[]; // ImageData[] for 2D textures and CubeTexture[] for cube textures;

    /**
     * How the image is applied to the object.
     * @see {@link https://threejs.org/docs/index.html#api/en/constants/Textures | Texture Constants}
     * @defaultValue _value of_ {@link THREE.Texture.DEFAULT_MAPPING}
     */
    mapping: Mapping;

    /**
     * This defines how the {@link Texture} is wrapped *horizontally* and corresponds to **U** in UV mapping.
     * @remarks for **WEBGL1** - tiling of images in textures only functions if image dimensions are powers of two
     * (2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, ...) in terms of pixels.
     * Individual dimensions need not be equal, but each must be a power of two. This is a limitation of WebGL1, not three.js.
     * **WEBGL2** does not have this limitation.
     * @see {@link https://threejs.org/docs/index.html#api/en/constants/Textures | Texture Constants}
     * @see {@link wrapT}
     * @see {@link repeat}
     * @defaultValue {@link THREE.ClampToEdgeWrapping}
     */
    wrapS: Wrapping;

    /**
     * This defines how the {@link Texture} is wrapped *vertically* and corresponds to **V** in UV mapping.
     * @remarks for **WEBGL1** - tiling of images in textures only functions if image dimensions are powers of two
     * (2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, ...) in terms of pixels.
     * Individual dimensions need not be equal, but each must be a power of two. This is a limitation of WebGL1, not three.js.
     * **WEBGL2** does not have this limitation.
     * @see {@link https://threejs.org/docs/index.html#api/en/constants/Textures | Texture Constants}
     * @see {@link wrapS}
     * @see {@link repeat}
     * @defaultValue {@link THREE.ClampToEdgeWrapping}
     */
    wrapT: Wrapping;

    /**
     * How the {@link Texture} is sampled when a texel covers more than one pixel.
     * @see {@link https://threejs.org/docs/index.html#api/en/constants/Textures | Texture Constants}
     * @see {@link minFilter}
     * @see {@link THREE.MagnificationTextureFilter}
     * @defaultValue {@link THREE.LinearFilter}
     */
    magFilter: MagnificationTextureFilter;

    /**
     * How the {@link Texture} is sampled when a texel covers less than one pixel.
     * @see {@link https://threejs.org/docs/index.html#api/en/constants/Textures | Texture Constants}
     * @see {@link magFilter}
     * @see {@link THREE.MinificationTextureFilter}
     * @defaultValue {@link THREE.LinearMipmapLinearFilter}
     */
    minFilter: MinificationTextureFilter;

    /**
     * The number of samples taken along the axis through the pixel that has the highest density of texels.
     * @remarks A higher value gives a less blurry result than a basic mipmap, at the cost of more {@link Texture} samples being used.
     * @remarks Use {@link THREE.WebGLCapabilities.getMaxAnisotropy() | renderer.capabilities.getMaxAnisotropy()} to find the maximum valid anisotropy value for the GPU;
     * @remarks This value is usually a power of 2.
     * @default 1
     */
    anisotropy: number;

    /**
     * These define how elements of a 2D texture, or texels, are read by shaders.
     * @see {@link https://threejs.org/docs/index.html#api/en/constants/Textures | Texture Constants}
     * @see {@link THREE.PixelFormat}
     * @defaultValue {@link THREE.RGBAFormat}.
     */
    format: PixelFormat;

    /**
     * This must correspond to the {@link Texture.format | .format}.
     * @remarks {@link THREE.UnsignedByteType}, is the type most used by Texture formats.
     * @see {@link https://threejs.org/docs/index.html#api/en/constants/Textures | Texture Constants}
     * @see {@link THREE.TextureDataType}
     * @defaultValue {@link THREE.UnsignedByteType}
     */
    type: TextureDataType;

    /**
     * The GPU Pixel Format allows the developer to specify how the data is going to be stored on the GPU.
     * @remarks Compatible only with {@link WebGL2RenderingContext | WebGL 2 Rendering Context}.
     * @see {@link https://threejs.org/docs/index.html#api/en/constants/Textures | Texture Constants}
     * @defaultValue The default value is obtained using a combination of {@link Texture.format | .format} and {@link Texture.type | .type}.
     */
    internalFormat: PixelFormatGPU | null;

    /**
     * The uv-transform matrix for the texture.
     * @remarks
     * When {@link Texture.matrixAutoUpdate | .matrixAutoUpdate} property is `true`.
     * Will be updated by the renderer from the properties:
     *  - {@link Texture.offset | .offset}
     *  - {@link Texture.repeat | .repeat}
     *  - {@link Texture.rotation | .rotation}
     *  - {@link Texture.center | .center}
     * @remarks
     * When {@link Texture.matrixAutoUpdate | .matrixAutoUpdate} property is `false`.
     * This matrix may be set manually.
     * @see {@link matrixAutoUpdate | .matrixAutoUpdate}
     * @defaultValue `new THREE.Matrix3()`
     */
    matrix: Matrix3;

    /**
     * Whether is to update the texture's uv-transform {@link matrix | .matrix}.
     * @remarks Set this to `false` if you are specifying the uv-transform {@link matrix} directly.
     * @see {@link matrix | .matrix}
     * @defaultValue `true`
     */
    matrixAutoUpdate: boolean;

    /**
     *
     * @default new THREE.Vector2( 0, 0 )
     */
    offset: Vector2;

    /**
     * How many times the texture is repeated across the surface, in each direction **U** and **V**.
     * @remarks
     * If repeat is set greater than `1` in either direction, the corresponding *Wrap* parameter should
     * also be set to {@link THREE.RepeatWrapping} or {@link THREE.MirroredRepeatWrapping} to achieve the desired tiling effect.
     * @remarks
     * Setting different repeat values for textures is restricted in the same way like {@link .offset | .offset}.
     * @see {@link wrapS}
     * @see {@link wrapT}
     * @defaultValue `new THREE.Vector2( 1, 1 )`
     */
    repeat: Vector2;

    /**
     * The point around which rotation occurs.
     * @remarks A value of `(0.5, 0.5)` corresponds to the center of the texture.
     * @defaultValue `new THREE.Vector2( 0, 0 )`, _lower left._
     */
    center: Vector2;

    /**
     * How much the texture is rotated around the center point, in radians.
     * @remarks Positive values are counter-clockwise.
     * @defaultValue `0`
     */
    rotation: number;

    /**
     * Whether to generate mipmaps, _(if possible)_ for a texture.
     * @remarks Set this to false if you are creating mipmaps manually.
     * @defaultValue true
     */
    generateMipmaps: boolean;

    /**
     * If set to `true`, the alpha channel, if present, is multiplied into the color channels when the texture is uploaded to the GPU.
     * @remarks
     * Note that this property has no effect for {@link https://developer.mozilla.org/en-US/docs/Web/API/ImageBitmap | ImageBitmap}.
     * You need to configure on bitmap creation instead. See {@link THREE.ImageBitmapLoader | ImageBitmapLoader}.
     * @see {@link THREE.ImageBitmapLoader | ImageBitmapLoader}.
     * @defaultValue `false`
     */
    premultiplyAlpha: boolean;

    /**
     * If set to `true`, the texture is flipped along the vertical axis when uploaded to the GPU.
     * @remarks
     * Note that this property has no effect for {@link https://developer.mozilla.org/en-US/docs/Web/API/ImageBitmap | ImageBitmap}.
     * You need to configure on bitmap creation instead. See {@link THREE.ImageBitmapLoader | ImageBitmapLoader}.
     * @see {@link THREE.ImageBitmapLoader | ImageBitmapLoader}.
     * @defaultValue `true`
     */
    flipY: boolean;

    /**
     * Specifies the alignment requirements for the start of each pixel row in memory.
     * @remarks
     * The allowable values are:
     *  - `1` (byte-alignment)
     *  - `2` (rows aligned to even-numbered bytes)
     *  - `4` (word-alignment)
     *  - `8` (rows start on double-word boundaries).
     * @see {@link http://www.khronos.org/opengles/sdk/docs/man/xhtml/glPixelStorei.xml | glPixelStorei} for more information.
     * @defaultValue 4
     */
    unpackAlignment: number;

    /**
     * The {@link Textures | {@link Texture} constants} page for details of other formats.
     * @remarks
     * Values of {@link encoding} !== {@link THREE.LinearEncoding} are only supported on _map_, _envMap_ and _emissiveMap_.
     * @remarks
     * Note that if this value is changed on a texture after the material has been used, it is necessary to trigger a {@link THREE.Material.needsUpdate} for this value to be realized in the shader.
     * @see {@link https://threejs.org/docs/index.html#api/en/constants/Textures | Texture Constants}
     * @see {@link THREE.TextureDataType}
     * @defaultValue {@link THREE.LinearEncoding}
     */
    encoding: TextureEncoding;

    /**
     * Indicates whether a texture belongs to a render target or not
     * @defaultValue `false`
     */
    isRenderTargetTexture: boolean;

    /**
     * Indicates whether this texture should be processed by {@link THREE.PMREMGenerator} or not.
     * @remarks Only relevant for render target textures.
     * @defaultValue `false`
     */
    needsPMREMUpdate: boolean;

    /**
     * An object that can be used to store custom data about the texture.
     * @remarks It should not hold references to functions as these will not be cloned.
     * @defaultValue `{}`
     */
    userData: any;

    /**
     * This starts at `0` and counts how many times {@link needsUpdate | .needsUpdate} is set to `true`.
     * @remarks Expects a `Integer`
     * @defaultValue `0``
     */
    version: number;

    /**
     * Set this to `true` to trigger an update next time the {@link Texture} is used. Particularly important for setting the wrap mode.
     */
    set needsUpdate(value: boolean);

    static DEFAULT_ANISOTROPY: number;
    static DEFAULT_IMAGE: any;
    static DEFAULT_MAPPING: Mapping;

    onUpdate: () => void;

    clone(): this;
    copy(source: Texture): this;
    toJSON(meta: any): any;
    transformUv(uv: Vector2): Vector2;
    updateMatrix(): void;

    dispose(): void;
}
