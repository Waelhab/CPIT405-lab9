// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCDCy8Oq9jFStLmcVHhbh5bye-XlCv5aso",
    authDomain: "cpit405-bb3a6.firebaseapp.com",
    projectId: "cpit405-bb3a6",
    storageBucket: "cpit405-bb3a6.firebasestorage.app",
    messagingSenderId: "560377175333",
    appId: "1:560377175333:web:f0059914035e04e12c8ecc",
    measurementId: "G-56JSN8JQ3P"
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
