import { describe, it, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert';

import window from './mockWebStorage.js';

import ProtoStore from './proto-store.js';

describe('PROTO STORE', () => {
  it('can stringify BigInts and Date objects', () => {
    assert.strictEqual(window, undefined);
  });
});
