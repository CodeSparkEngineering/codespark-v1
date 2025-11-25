// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// TODO: Replace with your actual config object from the Firebase Console
// Go to https://console.firebase.google.com/
// Create a project -> Add App (Web) -> Copy config
const firebaseConfig = {
    apiKey: "AIzaSyBPcMJD0zifdCluOOTrej775AtDpUNOb_g",
    authDomain: "gen-lang-client-0982502069.firebaseapp.com",
    projectId: "gen-lang-client-0982502069",
    storageBucket: "gen-lang-client-0982502069.firebasestorage.app",
    messagingSenderId: "488844896337",
    appId: "1:488844896337:web:76c951b5edc8be468f7070",
    measurementId: "G-QFX1JY4GN3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
