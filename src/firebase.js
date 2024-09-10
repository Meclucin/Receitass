import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCejriCrC1d4lv9AHvCiVdadobb1DdxuvA",
  authDomain: "bancodedadostb.firebaseapp.com",
  projectId: "bancodedadostb",
  storageBucket: "bancodedadostb.appspot.com",
  messagingSenderId: "343428094094",
  appId: "1:343428094094:web:316ee2a2a1e70c99fed1df",
  measurementId: "G-WR0262PNB2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and Firestore
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };