"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";
import { auth, db } from "./firebaseConfig";

export default function Profile() {
  const [user, setUser] = useState(null); // Store user data
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserData(user.uid); // Get user details from Firestore
      } else {
        console.log("No user is signed in");
        setLoading(false);
      }
    });
    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  // Fetch User Data from Firestore
  const fetchUserData = async (uid) => {
    const userRef = doc(db, "users", uid);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      const userData = docSnap.data();
      setUser(userData);
      setFormData(userData);
    } else {
      console.log("No user data found");
    }
    setLoading(false);
  };

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Save Profile Changes
  const handleSave = async () => {
    if (!auth.currentUser) return;

    const userRef = doc(db, "users", auth.currentUser.uid);
    await updateDoc(userRef, formData);

    setUser(formData);
    setIsEditing(false);
    console.log("Profile updated successfully!");
  };

  if (loading) {
    return <div className="text-center mt-5">Loading profile...</div>;
  }

  if (!user) {
    return (
      <div className="text-center mt-5">
        <h4>Please log in to access your profile.</h4>
        <Link href="/Authpages/LogIn">
          <button className="btn btn-dark mt-3">Login</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-lg p-4 mb-5 bg-white rounded">
            <div className="text-center">
              <img
                src={user.profilePic || "/default-profile.png"}
                alt="Profile Picture"
                className="rounded-circle profile-pic"
                width="120"
                height="120"
              />
              <h3 className="mt-3 fw-bold">{user.name}</h3>
              <p className="text-muted">{user.email}</p>
            </div>

            {/* Profile Details */}
            <div className="mt-4">
              {isEditing ? (
                // Edit Mode
                <form>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Phone</label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone || ""}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Age</label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age || ""}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">Address</label>
                    <textarea
                      name="address"
                      value={formData.address || ""}
                      onChange={handleChange}
                      className="form-control"
                      rows="2"
                    />
                  </div>
                  <button
                    type="button"
                    className="btn btn-success me-2"
                    onClick={handleSave}
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </button>
                </form>
              ) : (
                // View Mode
                <div>
                  <p>
                    <strong>Phone:</strong> {user.phone || "N/A"}
                  </p>
                  <p>
                    <strong>Age:</strong> {user.age || "N/A"}
                  </p>
                  <p>
                    <strong>Address:</strong> {user.address || "N/A"}
                  </p>
                  <button
                    className="btn btn-dark me-2"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit Profile
                  </button>
                  <Link href="/dashboard">
                    <button className="btn btn-secondary">Go to Dashboard</button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
