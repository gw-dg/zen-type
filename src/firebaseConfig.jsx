import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBLJqotiUpDVacspkBbfBHVayoYt_5LciQ",
  authDomain: "zen-type.firebaseapp.com",
  projectId: "zen-type",
  storageBucket: "zen-type.appspot.com",
  messagingSenderId: "498365941041",
  appId: "1:498365941041:web:40573589b20f5ded5b1c10",
  measurementId: "G-NQF7RT8375",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

export default { auth, db };
