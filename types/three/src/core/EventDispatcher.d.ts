/**
 * Event object.
 */
export interface Event<TType extends string = string> {
    type: TType;
}

export type EventMap<K extends string, T> = {
    [P in K]: T;
};

export type FiredEvent<TType extends string, TEvent extends Event<TType>, TSource> = TEvent & {
    target: TSource;
};

/**
 * JavaScript events for custom objects
 * @example
 * ```typescript
 * // Adding events to a custom object
 * class Car extends EventDispatcher {
 *   start() {
 *     this.dispatchEvent( { type: 'start', message: 'vroom vroom!' } );
 *   }
 * };
 * // Using events with the custom object
 * const car = new Car();
 * car.addEventListener( 'start', ( event ) => {
 *   alert( event.message );
 * } );
 * car.start();
 * ```
 * @see {@link https://github.com/mrdoob/eventdispatcher.js | mrdoob EventDispatcher on GitHub}
 * @see {@link https://threejs.org/docs/index.html#api/en/core/EventDispatcher | Official Documentation}
 * @see {@link https://github.com/mrdoob/three.js/blob/master/src/core/EventDispatcher.js | Source}
 */
export class EventDispatcher<TEventMap extends EventMap<string, Event> = {}> {
    /**
     * Creates {@link THREE.EventDispatcher | EventDispatcher} object.
     * @remarks
     * It needs to be call with {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call | Function.prototype.call()}
     * to add the functionality to an object.
     */
    constructor();

    /**
     * Adds a listener to an event type.
     * @param type The type of event to listen to.
     * @param listener The function that gets called when the event is fired.
     */
    addEventListener<E extends keyof TEventMap>(type: E, listener: (ev: FiredEvent<E, TEventMap[E], this>) => void): void;
    addEventListener<E extends string>(type: E, listener: (ev: FiredEvent<E, Event<E>, this>) => void): void;

    /**
     * Checks if listener is added to an event type.
     * @param type The type of event to listen to.
     * @param listener The function that gets called when the event is fired.
     */
    hasEventListener<E extends keyof TEventMap>(type: E, listener: (ev: FiredEvent<E, TEventMap[E], this>) => void): boolean;
    hasEventListener<E extends string>(type: string, listener: (ev: FiredEvent<E, Event<E>, this>) => void): boolean;

    /**
     * Removes a listener from an event type.
     * @param type The type of the listener that gets removed.
     * @param listener The listener function that gets removed.
     */
    removeEventListener<E extends keyof TEventMap>(type: E, listener: (ev: FiredEvent<E, TEventMap[E], this>) => void): void;
    removeEventListener<E extends string>(type: string, listener: (ev: FiredEvent<E, Event<E>, this>) => void): void;

    /**
     * Fire an event type.
     * @param event The event that gets fired.
     */
    dispatchEvent<E extends keyof TEventMap>(event: TEventMap[E]): void;
    dispatchEvent<E extends Event>(event: E): void;
}
