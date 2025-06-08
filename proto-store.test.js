import { describe, it } from 'node:test';
import assert from 'node:assert';

import window from './mockWebStorage.js';

import ProtoStore from './proto-store.js';

describe('PROTO STORE', () => {
  describe('can can be instantiated', () => {
    it('without an initial store', () => {
      assert.ok(window.localStorage);
      window.localStorage.setItem('ProtoStore', '{}');
      assert.deepEqual(window.localStorage.store, { ProtoStore: '{}' });

      const PROTO_STORE = ProtoStore({}, window);
      assert.ok(PROTO_STORE);
      assert.deepEqual(window.localStorage.store, { ProtoStore: '{}' });

      window.localStorage.clear();
      assert.deepEqual(window.localStorage.store, {});
    });

    it('with a default store', () => {
      assert.ok(window.localStorage);
      assert.deepEqual(window.localStorage.store, {});

      const PROTO_STORE = ProtoStore({}, window);
      assert.ok(PROTO_STORE);
      assert.deepEqual(window.localStorage.store, { ProtoStore: '{}' });

      window.localStorage.clear();
      assert.deepEqual(window.localStorage.store, {});
    });

    it('with a defined store', () => {
      assert.ok(window.localStorage);
      assert.deepEqual(window.localStorage.store, {});

      const PROTO_STORE = ProtoStore({ TEST: { hello: 'world' } }, window);
      assert.ok(PROTO_STORE);
      assert.deepEqual(window.localStorage.store, {
        ProtoStore: '{"TEST":{"hello":"world"}}',
      });

      window.localStorage.clear();
      assert.deepEqual(window.localStorage.store, {});
    });

    it('and expose interaction methods', () => {
      const PROTO_STORE = ProtoStore({}, window);
      assert.ok(PROTO_STORE);
      assert.deepEqual(window.localStorage.store, { ProtoStore: '{}' });

      assert.ok(PROTO_STORE.collection);
      const COLLECTION = PROTO_STORE.collection('TEST_COLLECTION');
      assert.ok(COLLECTION.create);
      assert.ok(COLLECTION.delete);
      assert.ok(COLLECTION.read);
      assert.ok(COLLECTION.list);
      assert.ok(COLLECTION.update);

      assert.deepEqual(window.localStorage.store, {
        ProtoStore: '{"TEST_COLLECTION":{}}',
      });

      assert.ok(PROTO_STORE.drop);
      PROTO_STORE.drop('TEST_COLLECTION');
      assert.deepEqual(window.localStorage.store, { ProtoStore: '{}' });

      assert.ok(PROTO_STORE.clear);
      PROTO_STORE.clear();
      assert.deepEqual(window.localStorage.store, {});
    });
  });

  describe('can support interactions:', () => {
    const PROTO_STORE = ProtoStore({}, window);
    const COLLECTION = PROTO_STORE.collection('TEST_COLLECTION');
    assert.deepEqual(window.localStorage.store, {
      ProtoStore: '{"TEST_COLLECTION":{}}',
    });

    it('create', () => {
      COLLECTION.create('one', { hello: 'world' });
      assert.deepEqual(window.localStorage.store, {
        ProtoStore: '{"TEST_COLLECTION":{"one":{"hello":"world"}}}',
      });
    });

    it('read', () => {
      let result = COLLECTION.read('one');
      assert.deepEqual(result, { hello: 'world' });
      result = COLLECTION.read('two');
      assert.deepEqual(result, null);
    });

    it('update and create', () => {
      COLLECTION.update('one', { hello: 'again' });
      COLLECTION.create('two', { meaning: 42 });
      assert.deepEqual(window.localStorage.store, {
        ProtoStore:
          '{"TEST_COLLECTION":{"one":{"hello":"again"},"two":{"meaning":42}}}',
      });
    });

    it('list', () => {
      const result = COLLECTION.list();
      assert.deepEqual(result, [{ hello: 'again' }, { meaning: 42 }]);

      const filtered = COLLECTION.list((_) => _.meaning);
      assert.deepEqual(filtered, [{ meaning: 42 }]);
    });

    it('delete and list', () => {
      COLLECTION.delete('one');
      const result = COLLECTION.list();
      assert.deepEqual(result, [{ meaning: 42 }]);
    });
  });
});
