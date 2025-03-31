import { NextResponse } from "next/server";
import { SerpApi } from "serpapi"; // Corrected import

const API_KEY = "892ae319be8942b33fca9730138fc5087cd489a0dcbf7792329c7c99eae23eb1"; // Replace with your actual API key

export async function GET() {
  try {
    const client = new SerpApi(API_KEY);  // Initialize SerpApi with your API key

    // Fetching Google News data using SerpApi
    const newsData = await new Promise((resolve, reject) => {
      client.json(
        {
          engine: "google_news",
          q: "health",  // Query keyword (can be dynamic if needed)
          gl: "us",  // Geolocation (US)
          hl: "en",  // Language (English)
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

    // Check if articles are available
    if (!newsData.news_results || newsData.news_results.length === 0) {
      return NextResponse.json(
        { success: false, error: "No articles found." },
        { status: 404 }
      );
    }

    // Format the articles for frontend use
    const articles = newsData.news_results.map((article) => ({
      title: article.title,
      link: article.link,
      source: article.source,
      publishedAt: article.date,
      thumbnail: article.thumbnail || null,  // Optional thumbnail
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
