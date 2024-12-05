import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyABpqG17UBokPhnWdsGsEoPO-6EII0h1h0",
  authDomain: "filmzone-3902e.firebaseapp.com",
  projectId: "filmzone-3902e",
  storageBucket: "filmzone-3902e.firebasestorage.app",
  messagingSenderId: "375815783577",
  appId: "1:375815783577:web:8436bed658830869c2e408",
  measurementId: "G-B8NGV2ZRDQ"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();