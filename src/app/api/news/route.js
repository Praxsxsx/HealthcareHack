import { NextResponse } from "next/server";

// SerpAPI Key
const API_KEY =
  "892ae319be8942b33fca9730138fc5087cd489a0dcbf7792329c7c99eae23eb1"; // Replace with your actual API key

export async function GET() {
  try {
    // SerpAPI URL with query and API key
    const url = `https://serpapi.com/search.json?engine=google_news&q=newdisease&hl=en&gl=us&google_domain=google.com&num=10&start=0&safe=active&api_key=${API_KEY}`;

    // Fetch data from SerpAPI
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Failed to fetch data from SerpAPI: ${res.statusText}`);
    }

    const data = await res.json();

    // Extract relevant data from news_results
    const articles = data.news_results.map((article) => ({
      title: article.title,
      link: article.link,
      source: article.source.name,
      thumbnail: article.thumbnail || null, // Add thumbnail with fallback to null if not available
      date: article.date,
    }));

    // Return articles in JSON format
    return NextResponse.json({ success: true, articles });
  } catch (error) {
    console.error("❌ Error fetching SerpAPI data:", error.message);
    return NextResponse.json(
      { success: false, error: "Error fetching news." },
      { status: 500 }
    );
  }
}
