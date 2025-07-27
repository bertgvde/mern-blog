// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-7f74c.firebaseapp.com",
  projectId: "mern-blog-7f74c",
  storageBucket: "mern-blog-7f74c.firebasestorage.app",
  messagingSenderId: "264306967849",
  appId: "1:264306967849:web:ae3137fdd818a43ae86338"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
