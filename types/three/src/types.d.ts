import { EventMap } from './core/EventDispatcher';

// tslint:disable-next-line:interface-over-type-literal
export interface DisposableEventMap extends EventMap {
    dispose: {};
}

export interface Disposable {
    /**
     * Frees resources allocated by this instance.
     * @remarks Call this method whenever this instance is no longer used in your app.
     */
    dispose(): void;
}
