import { describe, it } from 'node:test';
import assert from 'node:assert';

import window from './mockWebStorage.js';

describe('mockWebStorage', () => {
  it('can be instantiated', () => {
    assert.ok(window);
    assert.ok(window.sessionStorage);
    assert.ok(window.localStorage);

    assert.ok(window.localStorage.getItem);
    assert.ok(window.localStorage.setItem);
    assert.ok(window.localStorage.removeItem);
    assert.ok(window.localStorage.clear);

    assert.ok(window.localStorage.store);
    assert.ok(window.localStorage.json);
  });

  it('can be exercised', () => {
    assert.deepEqual(window.localStorage.store, {});
    assert.equal(window.localStorage.json, '{}');

    window.localStorage.setItem('hello', 'world');
    assert.equal(window.localStorage.getItem('hello'), 'world');

    window.localStorage.setItem('meaning', 42);
    assert.equal(window.localStorage.getItem('meaning'), 42);
    assert.deepEqual(window.localStorage.store, {
      hello: 'world',
      meaning: 42,
    });
    assert.equal(window.localStorage.json, '{"hello":"world","meaning":42}');

    window.localStorage.removeItem('meaning');
    assert.deepEqual(window.localStorage.store, {
      hello: 'world',
    });
    assert.equal(window.localStorage.json, '{"hello":"world"}');

    window.localStorage.clear();
    assert.deepEqual(window.localStorage.store, {});
    assert.equal(window.localStorage.json, '{}');
  });
});
