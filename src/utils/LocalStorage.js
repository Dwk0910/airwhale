class LocalStorageClass {
    set(key, value) {
        localStorage.setItem("whale_" + key, value);
    }

    remove(key) {
        localStorage.removeItem("whale_" + key);
    }

    get(key) {
        return localStorage.getItem("whale_" + key);
    }
}

function LocalStorage() {
    return new LocalStorageClass();
}

export default LocalStorage;