"use client"; // Ensure this runs on the client

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDIBGi5QTFkpxisk6AA5Dr7EskNwkYc2yQ",
  authDomain: "virtualaiclinician.firebaseapp.com",
  projectId: "virtualaiclinician",
  storageBucket: "virtualaiclinician.appspot.com",
  messagingSenderId: "701736821207",
  appId: "1:701736821207:web:f75e570604b0e483602b92",
  measurementId: "G-00PF9QGYCQ"
};

// Initialize Firebase only in the browser
let app;
if (typeof window !== "undefined") {
  app = initializeApp(firebaseConfig);
}

const auth = getAuth();
const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    console.log("User signed in:", result.user);
  } catch (error) {
    console.error("Google Sign-In Error:", error);
  }
};
