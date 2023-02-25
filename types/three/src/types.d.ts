import { EventMap } from './core/EventDispatcher';

export interface DisposableEventMap extends EventMap {
    dispose: Event;
};

export interface Disposable {
    /**
     * Frees resources allocated by this instance.
     * @remarks Call this method whenever this instance is no longer used in your app.
     */
    dispose(): void;
}
