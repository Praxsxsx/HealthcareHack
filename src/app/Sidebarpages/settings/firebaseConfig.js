// Import required Firebase modules
import { getAnalytics, isSupported } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDIBGi5QTFkpxisk6AA5Dr7EskNwkYc2yQ",
  authDomain: "virtualaiclinician.firebaseapp.com",
  projectId: "virtualaiclinician",
  storageBucket: "virtualaiclinician.appspot.com",
  messagingSenderId: "701736821207",
  appId: "1:701736821207:web:f75e570604b0e483602b92",
  measurementId: "G-00PF9QGYCQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Handle Analytics only in client-side
let analytics;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
      console.log("Firebase Analytics initialized");
    } else {
      console.warn("Firebase Analytics not supported in this environment.");
    }
  });
}

// ✅ Export auth, db, and onAuthStateChanged
export { auth, db, onAuthStateChanged };
