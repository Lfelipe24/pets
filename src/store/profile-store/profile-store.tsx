import { types, Instance, flow } from 'mobx-state-tree';
import { LocalStorage } from '../../utils/local-storage';
import { UserDataType } from '../../types/profile/profile';

export const ProfileStore = types.model({
    loading: types.boolean,
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

        return { getUserData };
    });

export type ProfileStore = Instance<typeof ProfileStore>;

export function initProfileStore() {
    return ProfileStore.create({
        loading: false,
    });
}
