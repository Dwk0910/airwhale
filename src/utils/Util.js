export function GetPid() {
    const urlParameter = new URL(window.location.href).searchParams;
    let pageId = urlParameter.get('pid');
    if (pageId === null) pageId = '1';

    return pageId;
}

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

export function LocalStorage() {
    return new LocalStorageClass();
}

export function Redirect(target, noHistory) {
    (noHistory) ? window.location.replace(target) : window.location.assign(target);
}