"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import {
    doc,
    getDoc,
    updateDoc,
} from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";
import { auth, db, onAuthStateChanged } from "./firebaseConfig";

export default function Settings() {
  const [user, setUser] = useState(null);
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    language: "en",
  });

  // Fetch user data and settings
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setSettings(userDoc.data().settings || settings);
        }
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // Update settings in Firestore
  const handleSaveSettings = async () => {
    if (user) {
      const userDocRef = doc(db, "users", user.uid);
      await updateDoc(userDocRef, {
        settings,
      });
      alert("Settings updated successfully! ✅");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">⚙️ Settings</h2>
      {user ? (
        <div className="card p-4 shadow">
          <div className="mb-3">
            <label className="form-label">🔔 Notifications</label>
            <select
              className="form-select"
              value={settings.notifications ? "on" : "off"}
              onChange={(e) =>
                setSettings({ ...settings, notifications: e.target.value === "on" })
              }
            >
              <option value="on">Enabled</option>
              <option value="off">Disabled</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">🌙 Dark Mode</label>
            <select
              className="form-select"
              value={settings.darkMode ? "enabled" : "disabled"}
              onChange={(e) =>
                setSettings({ ...settings, darkMode: e.target.value === "enabled" })
              }
            >
              <option value="enabled">Enabled</option>
              <option value="disabled">Disabled</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">🌐 Language</label>
            <select
              className="form-select"
              value={settings.language}
              onChange={(e) =>
                setSettings({ ...settings, language: e.target.value })
              }
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
            </select>
          </div>

          <button className="btn btn-primary w-100" onClick={handleSaveSettings}>
            Save Changes 💾
          </button>
        </div>
      ) : (
        <div className="text-center">
          <p>Please <Link href="/Authpages/LogIn">login</Link> to manage your settings.</p>
        </div>
      )}
    </div>
  );
}
