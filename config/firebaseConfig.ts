// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBAC-dmrat9IkyeWRBepK-yC1VVyz4EVWU",
    authDomain: "reactnative-d80b4.firebaseapp.com",
    projectId: "reactnative-d80b4",
    storageBucket: "reactnative-d80b4.firebasestorage.app",
    messagingSenderId: "312752205144",
    appId: "1:312752205144:web:df341e4eaab4c83129c92d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const FirebaseDB = getFirestore(app);
export const FirebaseAuth = getAuth(app);