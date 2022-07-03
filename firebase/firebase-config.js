import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyC7AdE3GeJRkI9WHzsoRQip_Pz8cFHe43k",
    authDomain: "pets---dev.firebaseapp.com",
    projectId: "pets---dev",
    storageBucket: "pets---dev.appspot.com",
    messagingSenderId: "671015206889",
    appId: "1:671015206889:web:11ebe5095fe0ff6722d578"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);