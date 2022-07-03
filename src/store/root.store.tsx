import { applySnapshot, Instance, types } from "mobx-state-tree";
import { useMemo } from 'react';

import { NavigationStore, initNavigationStore } from './navigation-store/navigation-store';
import { AuthStore, initAuthStore } from './auth-store/auth-store';
import { ProfileStore, initProfileStore } from './profile-store/profile-store';
import { CameraStore, initCameraStore } from './camera-store/camera-store';

const RootStore = types.model({
    loading: types.boolean,
    navigationStore: NavigationStore,
    authStore: AuthStore,
    profileStore: ProfileStore,
    cameraStore: CameraStore,
});

export type RootStoreType = Instance<typeof RootStore>;

let store: RootStoreType;

export function intializeRootStore(snapshot = null) {
    const _store = store ??
        RootStore.create({
            loading: false,
            navigationStore: initNavigationStore(),
            authStore: initAuthStore(),
            profileStore: initProfileStore(),
            cameraStore: initCameraStore(),
        });
    if (snapshot) {
        applySnapshot(_store, snapshot);
    }

    if (typeof window === 'undefined') {
        return _store;
    }

    if (!store) {
        store = _store;
    }

    return store;
}

export function useStore(initialState: any): Instance<typeof RootStore> {
    return useMemo(() => intializeRootStore(initialState), [initialState]);
}
