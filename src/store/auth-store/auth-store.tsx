import { types, Instance, flow } from 'mobx-state-tree';
import { auth, db } from '../../../firebase/firebase-config';
import {
    UserCredential,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth';
import {doc, setDoc, getDoc, DocumentSnapshot} from 'firebase/firestore';
import {LocalStorage} from '../../utils/local-storage';

export const AuthStore = types.model({
    loading: types.boolean,
})
    .views(self => ({}))
    .actions(self => {
        // Login with firebase auth service
        const firebaseLogin = flow(function* (email: string, pass: string) {
            self.loading = true;
            try {
                const response: UserCredential = yield signInWithEmailAndPassword(auth, email, pass);
                if (response.user.uid) {
                    const userData: DocumentSnapshot = yield getDoc(doc(db, 'users', response.user.uid));
                    if (userData.exists()) {
                        yield LocalStorage.setItem('user_data', JSON.stringify(userData.data()));
                        return true;
                    }
                }
            } catch (error) {
                console.error(error)
            } finally {
                self.loading = false;
            }
        });

        const firebaseRegister = flow(function* (name: string, email: string, pass: string) {
            self.loading = true;
            try {
                const response = yield createUserWithEmailAndPassword(auth, email, pass);
                if (response.user.uid) {
                    const userData = {
                        name: name,
                        email: email
                    }
                    yield setDoc(doc(db, 'users', response.user.uid), { ...userData })
                    yield LocalStorage.setItem('user_data', JSON.stringify(userData));
                    return true;
                }
            } catch (error) {
                console.error(error)
            } finally {
                self.loading = false;
            }
        })

        const firebaseSignOut = flow(function* () {
            self.loading = true;
            try {
                yield signOut(auth);
                yield LocalStorage.removeItem('user_data')
            } catch (error) {
                console.error(error)
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