/**
 * Event object.
 */
export interface Event<TType extends string = string> {
    readonly type: TType;
}

export type EventMap = {
    [index: string]: Event;
};

export type FiredEvent<TType extends string, TEvent extends Event, TSource> = TEvent & {
    readonly type: TType;
    readonly target: TSource;
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
export class EventDispatcher<TEventMap extends EventMap = {}> {
    /**
     * Creates {@link THREE.EventDispatcher | EventDispatcher} object.
     */
    constructor();

    /**
     * Adds a listener to an event type.
     * @param type The type of event to listen to.
     * @param listener The function that gets called when the event is fired.
     */
    addEventListener<E extends keyof TEventMap & string>(type: E, listener: (ev: FiredEvent<E, TEventMap[E], this>) => void): void;
    addEventListener<E extends string>(type: E, listener: (ev: FiredEvent<E, Event<E>, this>) => void): void;

    /**
     * Checks if listener is added to an event type.
     * @param type The type of event to listen to.
     * @param listener The function that gets called when the event is fired.
     */
    hasEventListener<E extends keyof TEventMap & string>(type: E, listener: (ev: FiredEvent<E, TEventMap[E], this>) => void): boolean;
    hasEventListener<E extends string>(type: E, listener: (ev: FiredEvent<E, Event<E>, this>) => void): boolean;

    /**
     * Removes a listener from an event type.
     * @param type The type of the listener that gets removed.
     * @param listener The listener function that gets removed.
     */
    removeEventListener<E extends keyof TEventMap & string>(type: E, listener: (ev: FiredEvent<E, TEventMap[E], this>) => void): void;
    removeEventListener<E extends string>(type: E, listener: (ev: FiredEvent<E, Event<E>, this>) => void): void;

    /**
     * Fire an event type.
     * @param event The event that gets fired.
     */
    dispatchEvent<E extends keyof TEventMap>(event: TEventMap[E]): void;
    dispatchEvent(event: Event): void;
}
