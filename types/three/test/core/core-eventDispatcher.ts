import * as THREE from 'three';

// Test for legacy usage
const eveDisForAnyEvent = new THREE.EventDispatcher();
eveDisForAnyEvent.addEventListener('eventA', e => {
    e.type; // $ExpectType "eventA"
    e.target; // $ExpectType EventDispatcher<{}>
    // @ts-expect-error
    e.bar();
});
eveDisForAnyEvent.dispatchEvent({ type: 'eventA' });
eveDisForAnyEvent.dispatchEvent({ type: 'eventB', otherProp: 42 });

eveDisForAnyEvent.removeEventListener('eventA', e => {
    e.type; // $ExpectType "eventA"
    e.target; // $ExpectType EventDispatcher<{}>
});
eveDisForAnyEvent.hasEventListener('eventA', e => {
    e.type; // $ExpectType "eventA"
    e.target; // $ExpectType EventDispatcher<{}>
});

// Test for typed events
interface TestEvent {
    foo: { foo: number };
    bar: { bar: string };
}

const eveDisForTestEvent = new THREE.EventDispatcher<TestEvent>();
eveDisForTestEvent.addEventListener('foo', e => {
    e.type; // $ExpectType "foo"
    e.target; // $ExpectType EventDispatcher<TestEvent>

    // NOTE: Error in ts lower than 3.9. The minimum typescript version cannot be raised from 3.6 because of the dependency from aframe.
    // e.foo; // $ExpectType number
    // @ts-expect-error
    e.bar;
});
// call addEventListener with an invalid event
// ts-expect-error
eveDisForTestEvent.addEventListener('baz', e => {
    e.type; // $ExpectType "baz"
});

eveDisForTestEvent.addEventListener('foo', e => {});

eveDisForTestEvent.dispatchEvent({ type: 'foo', foo: 42 });
// eveDisForTestEvent.dispatchEvent<{ type: 'foo', foo: number },TestEvent>({ type: 'foo', foo: 42 });
eveDisForTestEvent.dispatchEvent({ type: 'bar', bar: '42' });
eveDisForTestEvent.dispatchEvent({ type: 'zzzz', shouldWork: '42' }); // Should fire a non strongType event / unknown event.
eveDisForTestEvent.dispatchEvent({ type: 'eventA' }); // Should fire a non strongType event / unknown event.

// call dispatchEvent with an invalid event
// @ts-expect-error
eveDisForTestEvent.dispatchEvent({ type: 'foo', foo: '42' });
// @ts-expect-error
eveDisForTestEvent.dispatchEvent({ type: 'foo', bar: '42' });
// @ts-expect-error
eveDisForTestEvent.dispatchEvent({ type: 'bar', bar: 42 });
// @ts-expect-error
eveDisForTestEvent.dispatchEvent({ bar: 42 });

eveDisForTestEvent.removeEventListener('bar', () => {});
eveDisForTestEvent.hasEventListener('bar', () => {});
