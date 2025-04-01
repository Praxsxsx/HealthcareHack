import { getAnalytics, isSupported } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDIBGi5QTFkpxisk6AA5Dr7EskNwkYc2yQ",
  authDomain: "virtualaiclinician.firebaseapp.com",
  projectId: "virtualaiclinician",
  storageBucket: "virtualaiclinician.firebasestorage.app",
  messagingSenderId: "701736821207",
  appId: "1:701736821207:web:f75e570604b0e483602b92",
  measurementId: "G-00PF9QGYCQ"
};

const app = initializeApp(firebaseConfig);

// Initialize Analytics only on the client side.
let analytics;
if (typeof window !== "undefined") {
  // Use isSupported to ensure Firebase Analytics is supported.
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

const auth = getAuth(app);

export { auth };
