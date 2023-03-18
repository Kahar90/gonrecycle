import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBE3hGqOSI5j1D40aTreuEb5W6h3kngcXs",
  authDomain: "gonrecycle-4e916.firebaseapp.com",
  projectId: "gonrecycle-4e916",
  storageBucket: "gonrecycle-4e916.appspot.com",
  messagingSenderId: "714182303175",
  appId: "1:714182303175:web:500a4c93eb46d0d6ce4de2",
  measurementId: "G-KMLHS5T9WD",
};

// Initialize Firebase

const appFirebase = initializeApp(firebaseConfig);
// const db = getFirestore(appFirebase);

export default appFirebase;
