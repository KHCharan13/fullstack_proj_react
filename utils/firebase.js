// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import { getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    
  // apiKey: process.env.A_API_KEY,
  
  // authDomain: process.env.A_AUTH_DOMAIN,
  // projectId: process.env.A_PROJECT_ID,
  // storageBucket: process.env.A_STORAGE_BUCKET,
  // messagingSenderId: process.env.A_MESSAGING_SENDER_ID,
  // appId: process.env.A_PUBLIC_APP_ID

  apiKey: "AIzaSyAqwRQOoKodxJtgZUh7O24w3DTvzbkDcOM",
  authDomain: "weeblog-5c294.firebaseapp.com",
  projectId: "weeblog-5c294",
  storageBucket: "weeblog-5c294.appspot.com",
  messagingSenderId: "757596152863",
  appId: "1:757596152863:web:cb8cfd01a6ac45bb54a12a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth =getAuth();
export const db =getFirestore(app);