// /src/app/api/news/route.js
import { NextResponse } from "next/server";

const NEWS_API_KEY = "YOUR_NEWS_API_KEY"; // Replace with your News API key
const NEWS_API_URL = `https://newsapi.org/v2/top-headlines?country=in&category=health&apiKey=${NEWS_API_KEY}`;

export async function GET() {
  try {
    const res = await fetch(NEWS_API_URL);

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch news from the API" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json({ articles: data.articles });
  } catch (error) {
    console.error("Error fetching news:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
