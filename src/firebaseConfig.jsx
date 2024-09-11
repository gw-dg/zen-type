// Import the necessary functions from Firebase SDK
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLJqotiUpDVacspkBbfBHVayoYt_5LciQ",
  authDomain: "zen-type.firebaseapp.com",
  projectId: "zen-type",
  storageBucket: "zen-type.appspot.com",
  messagingSenderId: "498365941041",
  appId: "1:498365941041:web:40573589b20f5ded5b1c10",
  measurementId: "G-NQF7RT8375",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export { auth, db };
