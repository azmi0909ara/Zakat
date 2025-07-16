// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCHcSR5LIuYTmCp9fr4ugbPpyFNecuvJvY",
  authDomain: "zakat-c1ad1.firebaseapp.com",
  projectId: "zakat-c1ad1",
  storageBucket: "zakat-c1ad1.firebasestorage.app",
  messagingSenderId: "736619142514",
  appId: "1:736619142514:web:1ab7f222a2363d1637d1eb",
  measurementId: "G-KBQK5E1EHY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app);



