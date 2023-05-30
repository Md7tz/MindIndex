class Storage {
    static get(key) {
        return localStorage.getItem(key);
    }

    static multiGet(keys) {
        return keys.map(key => Storage.get(key));
    }

    static set(key, value) {
        localStorage.setItem(key, value);
    }

    static multiSet(keyValuePairs) {
        keyValuePairs.forEach(keyValuePair => Storage.set(keyValuePair[0], keyValuePair[1]));
    }

    static remove(key) {
        localStorage.removeItem(key);
    }

    static clear() {
        localStorage.clear();
    }
}