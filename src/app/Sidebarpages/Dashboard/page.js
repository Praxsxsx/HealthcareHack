"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";
import { useState } from "react";

export default function Dashboard() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <h4 className="sidebar-title">Menu</h4>
        <ul className="sidebar-menu">
          <li>
            <Link href="/">
              <span className="menu-icon">
                <img
                  src="/dashboard-2-48.png"
                  width="20"
                  height="20"
                  alt="Dashboard"
                />
              </span>{" "}
              Home
            </Link>
          </li>
          <li>
            <Link href="/Sidebarpages/settings">
              <span className="menu-icon">
                <img
                  src="/gear-48.png"
                  width="20"
                  height="20"
                  alt="Settings"
                />
              </span>{" "}
              Settings
            </Link>
          </li>
          <li>
            <Link href="/Sidebarpages/ai-doctor">
              <span className="menu-icon">
                <img
                  src="/appointment-reminders-48.png"
                  width="20"
                  height="20"
                  alt="AI Doctor"
                />
              </span>{" "}
              AI Doctor
            </Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className={`main-content ${isSidebarOpen ? "shifted" : ""}`}>
        {/* Navbar */}
        <nav className="navbar navbar-expand-lg navbar-light bg-light px-3 fixed-top d-flex align-items-center">
          <button
            className="btn bg-black text-white"
            onClick={() => setSidebarOpen(!isSidebarOpen)}
          >
            ☰
          </button>
          <div className="ms-auto">
            <Link href="/profile">
              <button className="btn btn-dark me-2">Profile</button>
            </Link>
            <Link href="/settings">
              <button className="btn btn-dark">Settings</button>
            </Link>
          </div>
        </nav>

        {/* Dashboard Content */}
        <div className="container py-5 mt-5">
          <h1 className="fw-bold text-center">Welcome to Your Dashboard</h1>
          <p className="text-muted text-center">
            Access key insights, manage your profile, and monitor progress.
          </p>

          {/* Dashboard Stats Section */}
          <div className="row mt-5">
            <div className="col-md-4">
              <div className="card shadow-lg p-3 mb-5 bg-white rounded">
                <h5 className="card-title text-center">Appointments</h5>
                <p className="card-text text-center text-muted">15 Scheduled</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow-lg p-3 mb-5 bg-white rounded">
                <h5 className="card-title text-center">Health Reports</h5>
                <p className="card-text text-center text-muted">8 Completed</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow-lg p-3 mb-5 bg-white rounded">
                <h5 className="card-title text-center">AI Recommendations</h5>
                <p className="card-text text-center text-muted">5 Pending</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="text-center mt-4">
            <Link href="/ai-doctor">
              <button className="btn btn-dark me-3">Go to AI Doctor</button>
            </Link>
            <Link href="/settings">
              <button className="btn btn-secondary">Update Settings</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
