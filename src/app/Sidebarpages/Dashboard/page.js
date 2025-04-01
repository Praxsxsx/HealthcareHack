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
          <li >
            <Link href="/Sidebarpages/Dashboard" aria-label="Go to Dashboard">
              <span className="menu-icon" style={{ margin: "5px" }}><img src="/dashboard-2-48.png" width="20" height="20"/></span>    Dashboard
            </Link>
          </li>
          <li>
            <Link href="/Sidebarpages/settings" aria-label="Go to Settings">
              <span className="menu-icon" style={{ margin: "5px" }}><img src="/gear-48.png" width="20" height="20"/></span> Settings
            </Link>
          </li>
          <li>
            <Link href="/Sidebarpages/ai-doctor" aria-label="Go to AI Doctor">
              <span className="menu-icon" style={{ margin: "5px" }}><img src="/appointment-reminders-48.png" width="20" height="20"/></span> Appointments
            </Link>
          </li>
          <li>
            <Link href="/myhealth-tracker" aria-label="Go to MyHealth Tracker">
              <span className="menu-icon" style={{ margin: "5px" }}><img src="/report-2-48.png" width="20" height="20"/></span> MyHealth Tracker
            </Link>
          </li>
          <li>
            <Link href="/special-care" aria-label="Go to Special Care Hub">
              <span className="menu-icon" style={{ margin: "5px" }}><img src="/baby-48.png" width="20" height="20"/></span> Special Care Hub
            </Link>
          </li>
          <li>
            <Link href="/Sidebarpages/xray">
              <span className="menu-icon" style={{ margin: "5px" }}><img src="/xray-48.png" width="20" height="20"/></span> AI X-Ray Analyzer
            </Link>
          </li>
          <li>
            <Link href="/Sidebarpages/article" aria-label="Go to Disease Prevention">
              <span className="menu-icon" style={{ margin: "5px" }}><img src="/virus.png" width="20" height="20"/></span> Disease Prevention
            </Link>
          </li>
          <li>
            <Link href="/Sidebarpages/profile" aria-label="Go to Profile">
             <span className="menu-icon" style={{ margin: "5px" }}><img src="/user-48.png" width="20" height="20"/></span> Profile
            </Link>
          </li>
        </ul>
      </div>
      

      {/* Main Content */}
      <div className={`main-content ${isSidebarOpen ? "shifted" : ""}`}>
        {/* Navbar */}
        <nav className="navbar navbar-expand-lg navbar-light bg-light px-3 fixed-top d-flex align-items-center">
        <div className="d-flex align-items-center">
          <button
            className="btn bg-black text-white me-2"
            onClick={() => setSidebarOpen(!isSidebarOpen)}
          >
            ☰
          </button>
          <div className="navbar-brand">
            <Link href="/" className="custom-link">
              AlphaWell
            </Link>
          </div>
        </div>
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

          {/* Recent Conversations Section */}
          <div className="mt-4">
            <h4 className="fw-bold text-center mb-4">Recent Conversations</h4>
            <div className="row">
              <div className="col-md-12">
                <div className="card shadow p-3 mb-4 bg-light">
                  <p className="text-muted mb-1">📚 Chat with AI Doctor</p>
                  <small className="text-muted">3 days ago</small>
                </div>
                <div className="card shadow p-3 mb-4 bg-light">
                  <p className="text-muted mb-1">💡 Health Report Analysis</p>
                  <small className="text-muted">5 days ago</small>
                </div>
                <div className="card shadow p-3 mb-4 bg-light">
                  <p className="text-muted mb-1">🏥 Appointment Summary</p>
                  <small className="text-muted">1 week ago</small>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="text-center mt-4">
            <Link href="/Sidebarpages/ai-doctor">
              <button className="btn btn-dark me-3">Go to AI Doctor</button>
            </Link>
            <Link href="/Sidebarpages/chat-history">
              <button className="btn btn-secondary me-3">View Chat History</button>
            </Link>
            <Link href="/settings">
              <button className="btn btn-outline-secondary">Update Settings</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
