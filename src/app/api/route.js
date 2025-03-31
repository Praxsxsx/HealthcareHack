// /src/app/api/news/route.js
import { NextResponse } from "next/server";
import { getJson } from "serpapi"; // Importing the correct method

const API_KEY = "892ae319be8942b33fca9730138fc5087cd489a0dcbf7792329c7c99eae23eb1"; // Replace with your actual API key

export async function GET() {
  try {
    // Fetching Google News data from SerpAPI using getJson
    const newsData = await new Promise((resolve, reject) => {
      getJson(
        {
          engine: "google_news",
          q: "health", // Query keyword
          gl: "us", // Geolocation (US)
          hl: "en", // Language (English)
          api_key: API_KEY, // API key
        },
        (error, json) => {
          if (error) {
            reject(error);
          } else {
            resolve(json);
          }
        }
      );
    });

    // Check if articles are present
    if (!newsData.news_results || newsData.news_results.length === 0) {
      return NextResponse.json(
        { success: false, error: "No articles found." },
        { status: 404 }
      );
    }

    // Format the articles for frontend
    const articles = newsData.news_results.map((article) => ({
      title: article.title,
      link: article.link,
      source: article.source,
      publishedAt: article.date,
      thumbnail: article.thumbnail || null, // Optional thumbnail
    }));

    return NextResponse.json({ success: true, articles });
  } catch (error) {
    console.error("Error fetching SerpAPI:", error.message);
    return NextResponse.json(
      { success: false, error: "Error fetching news." },
      { status: 500 }
    );
  }
}
