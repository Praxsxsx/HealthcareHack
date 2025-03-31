"use client";
import { useEffect, useState } from "react";
import "./article.css";

export default function NewsPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch("/api/news");
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || "Unexpected error fetching news.");

        // Use news_results from the API response
        setArticles(data.articles || []);
      } catch (error) {
        console.error("Error fetching news:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, []);

  return (
    <div>
      <h1>Latest Health News</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {!loading && !error && articles.length > 0 ? (
        <ul className="news-list">
          {articles.map((article, index) => (
            <li key={index} className="news-item">
              <h2>{article.title}</h2>
              <p><strong>Source:</strong> {article.source || "Unknown"}</p>
              <p><strong>Published on:</strong> {article.publishedAt || "Unknown"}</p>
              <a href={article.link} target="_blank" rel="noopener noreferrer">
                Read more
              </a>
            </li>
          ))}
        </ul>
      ) : (
        !loading && <p>No news available.</p>
      )}
    </div>
  );
}
