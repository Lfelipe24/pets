import { types, Instance, flow } from 'mobx-state-tree';
import { LocalStorage } from '../../utils/local-storage';
import { UserDataType } from '../../types/profile/profile';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';

export const ProfileStore = types.model({
    loading: types.boolean,
    imageProfile: types.string
})
    .views(self => ({}))
    .actions(self => {
        // Get data profile from local storage.
        const getUserData = flow(function* () {
            self.loading = true;
            try {
                let userInfo = yield LocalStorage.getItem('user_data');
                if (userInfo) {
                    const user: UserDataType = JSON.parse(userInfo)
                    return user.name
                }
            } catch (error) {
                console.error(error);
            } finally {
                self.loading = false;
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
                }
            } catch (error) {
                console.error(error);
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
            } catch (error) {
                console.error(error);
            } finally {
                self.loading = false;
            }
        });

        return { getUserData, pickProfileImage, deleteProfileImage };
    });

export type ProfileStore = Instance<typeof ProfileStore>;

export function initProfileStore() {
    return ProfileStore.create({
        loading: false,
        imageProfile: ''
    });
}
