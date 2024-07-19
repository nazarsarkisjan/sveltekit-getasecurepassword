import { writable, type Writable } from 'svelte/store';
import { browser } from '$app/environment';

function CreateStore<T>(path: string, startValue: T): {
    subscribe: Writable<T>['subscribe'],
    set: (value: T) => void,
    update: Writable<T>['update'],
} {
    const getPath = (obj: any, path: string, defaultValue: any) => {
        const pathArray = path.split('.');
        let value = obj;
        for (const key of pathArray) {
            if (value[key] !== undefined) {
                value = value[key];
            } else {
                return defaultValue;
            }
        }
        return value;
    };

    const setPath = (obj: any, path: string, value: any) => {
        const pathArray = path.split('.');
        let current = obj;
        for (let i = 0; i < pathArray.length - 1; i++) {
            if (current[pathArray[i]] === undefined) {
                current[pathArray[i]] = {};
            }
            current = current[pathArray[i]];
        }
        current[pathArray[pathArray.length - 1]] = value;
    };

    const [storeName, ...storePath] = path.split('.');
    const fullStore = browser ? JSON.parse(localStorage.getItem(storeName) || '{}') : {};
    const initialStoreValue = getPath(fullStore, storePath.join('.'), startValue);
    const { subscribe, set: originalSet, update } = writable<T>(initialStoreValue);

    let initialized = false;

    if (browser && typeof window !== 'undefined') {
        const storedValue = getPath(fullStore, storePath.join('.'), undefined);
        if (storedValue === undefined) {
            setPath(fullStore, storePath.join('.'), startValue);
            localStorage.setItem(storeName, JSON.stringify(fullStore));
        }

        subscribe((value) => {
            if (initialized) {
                const updatedStore = JSON.parse(localStorage.getItem(storeName) || '{}');
                setPath(updatedStore, storePath.join('.'), value);
                localStorage.setItem(storeName, JSON.stringify(updatedStore));
            }
        });

        initialized = true;
    }

    return {
        subscribe,
        set: (value: T) => {
            originalSet(value);
        },
        update
    };
}

export { CreateStore };
