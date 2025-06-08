const STORE_NAME = 'ProtoStore';

export default function ProtoStore(dataSet = {}, globalThis = globalThis) {
  const localStore = globalThis.localStorage.getItem(STORE_NAME);
  const dataStore = localStore
    ? JSON.parse(localStore)
    : structuredClone(dataSet);

  globalThis.localStorage.setItem(STORE_NAME, JSON.stringify(dataStore));

  return {
    collection(collectionName) {
      if (!dataStore[collectionName]) {
        dataStore[collectionName] = {};
        globalThis.localStorage.setItem(STORE_NAME, JSON.stringify(dataStore));
      }
      const _collection = dataStore[collectionName];

      return {
        create(id, data) {
          changeDataStore(id, data, collectionName);
        },
        delete(id) {
          if (_collection) {
            delete _collection[id];
            globalThis.localStorage.setItem(
              STORE_NAME,
              JSON.stringify(dataStore)
            );
          }
        },
        read(id) {
          return _collection?.[id] ? structuredClone(_collection[id]) : null;
        },
        list(where = (_) => _) {
          return structuredClone(Object.values(_collection).filter(where));
        },
        update(id, data) {
          changeDataStore(id, data, collectionName);
        },
      };
    },
    drop(collectionName) {
      if (dataStore[collectionName]) {
        delete dataStore[collectionName];
        globalThis.localStorage.setItem(STORE_NAME, JSON.stringify(dataStore));
      }
    },
    clear() {
      globalThis.localStorage.removeItem(STORE_NAME);
    },
  };

  function changeDataStore(id, data, collectionName) {
    dataStore[collectionName][id] = structuredClone(data);
    globalThis.localStorage.setItem(STORE_NAME, JSON.stringify(dataStore));
  }
}
