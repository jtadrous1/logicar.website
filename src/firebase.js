// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDDoylejB4-t9ECZg31qb6WogBCZWYcNJ4",
  authDomain: "logicar-v1.firebaseapp.com",
  projectId: "logicar-v1",
  storageBucket: "logicar-v1.firebasestorage.app",
  messagingSenderId: "353265372997",
  appId: "1:353265372997:web:d3fe80492beb999b96382c",
  measurementId: "G-SQ6GYZTY6R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// eslint-disable-next-line no-unused-vars
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

