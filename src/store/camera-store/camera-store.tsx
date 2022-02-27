import { types, Instance, flow } from 'mobx-state-tree';
import { Camera } from 'expo-camera';

export const CameraStore = types.model({
    loading: types.boolean,
    imageProfile: types.string
})
    .views(self => ({}))
    .actions(self => {
        // Open camera for take a profile photo.
        const getCameraPermissions = flow(function* () {
            self.loading = true;
            try {
                const status = yield Camera.requestCameraPermissionsAsync();
                if (status != 'granted') {
                    return true;
                }
            } catch (error) {
                console.error(error);
            } finally {
                self.loading = false;
            }
        });

        return { getCameraPermissions };
    });

export type CameraStore = Instance<typeof CameraStore>;

export function initCameraStore() {
    return CameraStore.create({
        loading: false,
        imageProfile: ''
    });
}
