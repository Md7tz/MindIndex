class Storage {
    static get(key) {
        return window.localStorage.getItem(key);
    }

    static multiGet(keys) {
        return keys.map(key => Storage.get(key));
    }

    static set(key, value) {
        window.localStorage.setItem(key, value);
    }

    static multiSet(keyValuePairs) {
        keyValuePairs.forEach(keyValuePair => Storage.set(keyValuePair[0], keyValuePair[1]));
    }

    static remove(key) {
        window.localStorage.removeItem(key);
    }

    static clear() {
        window.localStorage.clear();
    }
}


class MockStorage {
    static set(key, value) { }

    static get(key) {
        return null
    }

    static remove(key) { }

    static multiGet(keys) {
        return []
    }

    static multiSet(keyValuePairs) { }

    static clear() { }
}

let storage = (function () {
    return typeof window !== `undefined` ? Storage : MockStorage
})()

export default storage;

