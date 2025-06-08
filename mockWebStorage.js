function mockWebStorage() {
  let store = {};

  return {
    getItem(key) {
      return store[key];
    },

    setItem(key, value) {
      store[key] = value;
    },

    removeItem(key) {
      delete store[key];
    },
  };
}

export const sessionStorage = mockWebStorage();
export const localStorage = mockWebStorage();

export default {
  localStorage,
  sessionStorage,
};
