const STORE_NAME = 'ProtoStore';

export default function ProtoStore(dataSet = {}) {
  const localStore = window.localStorage.getItem(STORE_NAME);
  const dataStore = localStore
    ? JSON.parse(localStore)
    : structuredClone(dataSet);
  return {
    collection(collectionName) {
      const _collection = dataStore[collectionName];
      return {
        create(id, data) {
          !_collection && (dataStore[collectionName] = {});
          dataStore[collectionName][id] = structuredClone(data);
          window.localStorage.setItem(STORE_NAME, JSON.stringify(dataStore));
        },
        delete(id) {
          if (_collection) {
            delete _collection[id];
            window.localStorage.setItem(STORE_NAME, JSON.stringify(dataStore));
          }
        },
        read(id) {
          return _collection?.[id] ? structuredClone(_collection[id]) : null;
        },
        list() {
          return _collection ? structuredClone(Object.values(_collection)) : [];
        },
        update(id, data) {
          !_collection && (dataStore[collectionName] = {});
          dataStore[collectionName][id] = structuredClone(data);
          window.localStorage.setItem(STORE_NAME, JSON.stringify(dataStore));
        },
      };
    },
    drop(collectionName) {
      if (dataStore[collectionName]) {
        delete dataStore[collectionName];
        window.localStorage.setItem(STORE_NAME, JSON.stringify(dataStore));
      }
    },
    clear() {
      window.localStorage.removeItem(STORE_NAME);
    },
  };
}
