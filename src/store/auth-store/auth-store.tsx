import { types, Instance, flow } from 'mobx-state-tree';
import { auth } from '../../../firebase/firebase-config';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth';

export const AuthStore = types.model({
    loading: types.boolean,
})
    .views(self => ({}))
    .actions(self => {
        // Login with firebase auth service
        const firebaseLogin = flow(function* (email: string, pass: string) {
            self.loading = true;
            try {
                const response = yield signInWithEmailAndPassword(auth, email, pass);
                if (response.user.uid) {
                    return true;
                }
            } catch (error) {
            } finally {
                self.loading = false;
            }
        });

        const firebaseRegister = flow(function* (email: string, pass: string) {
            self.loading = true;
            try {
                const response = yield createUserWithEmailAndPassword(auth, email, pass);
                if (response.user.uid) {
                    return true;
                }
            } catch (error) {
            } finally {
                self.loading = false;
            }
        })

        const firebaseSignOut = flow(function* () {
            self.loading = true;
            try {
                yield signOut(auth);
            } catch (error) {
            } finally {
                self.loading = false;
                return true;
            }
        });

        return {
            firebaseLogin,
            firebaseRegister,
            firebaseSignOut
        };
    });

export type AuthStore = Instance<typeof AuthStore>;

export function initAuthStore() {
    return AuthStore.create({
        loading: false,
    });
}