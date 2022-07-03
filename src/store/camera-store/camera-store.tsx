import { types, Instance, flow } from 'mobx-state-tree';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import { db } from '../../../firebase/firebase-config';
import { doc, updateDoc, deleteField, getDoc } from 'firebase/firestore';
import { LocalStorage } from '../../utils/local-storage';
import { UserDataType } from '../../types/profile/profile';

const firestoreUsersDocName = 'users'

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

        // Get Profile picture
        const getProfilePicture = flow(function* () {
            self.loading = true
            try {
                const userData = yield LocalStorage.getItem('user_data')
                if (userData) {
                    const user: UserDataType = JSON.parse(userData)
                    const userDataFromDB = yield getDoc(doc(db, firestoreUsersDocName, user.id));
                    if (userDataFromDB.exists()) {
                        const data = userDataFromDB.data()
                        hasProfileImg(data)
                    }
                }
            } catch (error) {
                console.error(error);
            } finally {
                self.loading = false
            }
        });

        // Validate if the user has a image, if user has profile picture load to local variable imageProfile
        const hasProfileImg = (userData: UserDataType) => {
            if (userData.imgUri) {
                self.imageProfile = userData.imgUri;
                self.isImageProfile = true;
            }
        };

        // Take photo and save in store.
        const takePhotoCamera = flow(function* (cameraRef) {
            self.loading = true;
            try {
                let result = yield cameraRef.current.takePictureAsync({
                    allowsEditing: true,
                    aspect: [4, 3],
                    quality: 1,
                });
                const userData = yield LocalStorage.getItem('user_data')
                if (userData) {
                    const user: UserDataType = JSON.parse(userData)
                    const profileImg = {
                        imgUri: result.uri
                    }
                    yield updateDoc(doc(db, firestoreUsersDocName, user.id), { ...profileImg })
                    self.imageProfile = result.uri;
                    self.isImageProfile = true;
                }
                self.imageProfile = result.uri;
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
                    const userData = yield LocalStorage.getItem('user_data')
                    if (userData) {
                        const user: UserDataType = JSON.parse(userData)
                        const profileImg = {
                            imgUri: result.uri
                        }
                        yield updateDoc(doc(db, firestoreUsersDocName, user.id), { ...profileImg })
                        self.imageProfile = result.uri;
                        self.isImageProfile = true;
                    }
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
                const userData = yield LocalStorage.getItem('user_data')
                if (userData) {
                    const user: UserDataType = JSON.parse(userData)
                    yield updateDoc(doc(db, firestoreUsersDocName, user.id), { imgUri: deleteField() })
                    self.imageProfile = '';
                    self.isImageProfile = false;
                }
            } catch (error) {
                console.error(error);
            } finally {
                self.loading = false;
            }
        });

        return { getCameraPermissions, takePhotoCamera, pickProfileImage, deleteProfileImage, getProfilePicture };
    });

export type CameraStore = Instance<typeof CameraStore>;

export function initCameraStore() {
    return CameraStore.create({
        loading: false,
        imageProfile: '',
        isImageProfile: false
    });
}
