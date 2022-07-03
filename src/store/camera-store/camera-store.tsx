import { types, Instance, flow } from 'mobx-state-tree';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';

export const CameraStore = types.model({
    loading: types.boolean,
    imageProfile: types.string,
    isImageProfile: types.boolean
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

        // Take photo and save in store.
        const takePhotoCamera = flow(function* (cameraRef) {
            self.loading = true;
            try {
                let photo = yield cameraRef.current.takePictureAsync({
                    allowsEditing: true,
                    aspect: [4, 3],
                    quality: 1,
                });
                self.imageProfile = photo.uri;
                self.isImageProfile = true;
            } catch (error) {
                console.error(error);
                return false;
            } finally {
                self.loading = false;
                return true;
            }
        });

        // Pick image profile in camera roll.
        const pickProfileImage = flow(function* () {
            self.loading = true;
            try {
                let result = yield ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.All,
                    allowsEditing: true,
                    aspect: [4, 3],
                    quality: 1,
                });
                if (!result.cancelled) {
                    self.imageProfile = result.uri;
                    self.isImageProfile = true;
                } else {
                    return false;
                }
            } catch (error) {
                console.error(error);
                return false;
            } finally {
                self.loading = false;
                return true;
            }
        });

        // Delete Profile image.
        const deleteProfileImage = flow(function* () {
            self.loading = true;
            try {
                self.imageProfile = '';
                self.isImageProfile = false;
            } catch (error) {
                console.error(error);
            } finally {
                self.loading = false;
            }
        });

        return { getCameraPermissions, takePhotoCamera, pickProfileImage, deleteProfileImage };
    });

export type CameraStore = Instance<typeof CameraStore>;

export function initCameraStore() {
    return CameraStore.create({
        loading: false,
        imageProfile: '',
        isImageProfile: false
    });
}
