// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIRBASE_API_KEY,
  authDomain: "mern-auth-8e208.firebaseapp.com",
  projectId: "mern-auth-8e208",
  storageBucket: "mern-auth-8e208.appspot.com",
  messagingSenderId: "727503574231",
  appId: "1:727503574231:web:1a9607597c2db9327c4c92"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);