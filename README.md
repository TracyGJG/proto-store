# proto-store

A utility module to establish a convenient local storage facility for prototype development.

_Limitation_: The type of data that can be stored is restricted to those permitted by the [JSON specification](https://www.json.org/json-en.html), specifically: strings, numbers, Booleans, null, objects and arrays.

## Instantiation

On the initial creation of the ProtoStore, two arguments can be supplied although the second (referenc to `globalThis`) is only expected during testing. The optional first argument is an initial data structure used to prepopulate the data store.

Returned from the call are three methods:

### clear

Is used to completely remove the store from memory, usually so it can be recreated without corruption.

### drop(collectionName)

Again, is usually only called to remove the collection in order to refresh the environment.

### collection(collectionName)

This call is issued to register the initial state of the store and obtain the methods to be used to interact with it.

## Interaction

Calling the `collection` method returns an object presenting five operations:

### create(id, data)

This operation adds an object to the store containing the supplied data, registered using the given key (id). If an object already exists with the given key it will be overwritten.

### delete(id)

Removes the object from the store with the given key. If no object is found for the given key, no error is reported.

### read(id)

Retrieves the object from the store with the given key. `Null` is returned if no object is found for the key.

### list(where)

Without the optional `where` argument supplied this call retrieves all the objects in the collection. If a predicate function is supplied, only those objects that conform to the predicate will be returned in the list.

### update(id, data)

The `update` operation performs exactly the same as the `create` method but an object is expected to already exist. No error is reported if no object exists for the key. Instead an object will be created.
