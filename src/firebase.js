// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCGXpN83ds2cJ_-4csvbYUTsyBKTFRigYU",
  authDomain: "present-planner-6b07f.firebaseapp.com",
  projectId: "present-planner-6b07f",
  storageBucket: "present-planner-6b07f.appspot.com",
  messagingSenderId: "934911895863",
  appId: "1:934911895863:web:5779130161c2a5568252b2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// export const storage = getStorage(app);