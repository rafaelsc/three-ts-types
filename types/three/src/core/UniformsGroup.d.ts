import { EventDispatcher } from './EventDispatcher';
import { Uniform } from './Uniform';
import { Usage } from '../constants';
import { Disposable, DisposableEventMap } from '../types';

/**
 * @see Example: {@link https://threejs.org/examples/#webgl2_ubo | WebGL2 / UBO}
 * @see {@link https://github.com/mrdoob/three.js/blob/master/src/core/UniformsGroup.js | Source}
 */
export class UniformsGroup extends EventDispatcher<DisposableEventMap> implements Disposable {
    constructor();

    readonly isUniformsGroup: true;

    id: number;

    usage: Usage;

    uniforms: Uniform[];

    add(uniform: Uniform): this;

    remove(uniform: Uniform): this;

    setName(name: string): this;

    setUsage(value: Usage): this;

    dispose(): this;

    copy(source: UniformsGroup): this;

    clone(): UniformsGroup;
}
