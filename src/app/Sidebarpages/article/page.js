'use client'; 

import { useEffect, useState } from "react";
import styles from "./article.module.css"; // Import as module
import "bootstrap/dist/css/bootstrap.min.css";
import Image from "next/image";
import Link from "next/link";

export default function ArticlePage() {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // Fetch news articles from /api/news
  const fetchNews = async () => {
    try {
      const res = await fetch("/api/news");

      if (!res.ok) {
        throw new Error("Failed to fetch news.");
      }

      const data = await res.json();
      if (data.success && data.articles && data.articles.length > 0) {
        setNewsData(data.articles);
      } else {
        setError("No articles found.");
      }
    } catch (err) {
      setError("Error fetching news.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component load
  useEffect(() => {
    fetchNews();
  }, []);

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
        </nav>

        {/* Article Section */}
        <div className={styles.container} style={{ marginTop: "80px" }}>
          <h1 className={styles.title}>DISEASE OUTBREAKS (HOT)</h1>

          {loading && <p className={styles.loading}>Loading articles...</p>}
          {error && <p className={styles.error}>{error}</p>}

          {!loading && !error && newsData.length > 0 && (
            <ul className={styles.list}>
              {newsData.slice(0, 30).map((article, index) => (
                <li key={index} className={styles.article}>
                  <a
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                  >
                    {article.title}
                  </a>
                  {article.thumbnail && (
                  <a href={article.link} target="_blank" rel="noopener noreferrer">
                    <img
                      src={article.thumbnail}
                      alt={article.title}
                      className={styles.thumbnail}
                    />
                  </a>
                  )}
                  <p className={styles.date}>{article.date}</p>
                </li>
              ))}
            </ul>
          )}

          {!loading && !error && newsData.length === 0 && (
            <p className={styles.noArticles}>No articles available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
