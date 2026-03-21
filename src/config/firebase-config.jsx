// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB10_rQzCXn8so9ljwcFTL15eNvKU-7Uuw",
  authDomain: "invoq-ced09.firebaseapp.com",
  projectId: "invoq-ced09",
  storageBucket: "invoq-ced09.firebasestorage.app",
  messagingSenderId: "924699651627",
  appId: "1:924699651627:web:931c1de6c9bda5b91a846e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// export const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);
export { db, auth, signInWithEmailAndPassword };
