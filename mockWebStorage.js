function mockWebStorage() {
  let _store = {};

  return {
    getItem(key) {
      return _store[key];
    },

    setItem(key, value) {
      _store[key] = value;
    },

    removeItem(key) {
      delete _store[key];
    },

    clear() {
      _store = {};
    },

    get store() {
      return _store;
    },

    get json() {
      return JSON.stringify(_store, 2);
    },
  };
}

export const sessionStorage = mockWebStorage();
export const localStorage = mockWebStorage();

export default {
  localStorage,
  sessionStorage,
};
