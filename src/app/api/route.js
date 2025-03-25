import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyApOwzGaK53FPS76ejuim2ID_vkHJEhwb4");

export async function POST(req) {
  try {
    const { message } = await req.json();

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        temperature: 2,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 8192,
        responseMimeType: "text/plain",
      },
    });

    const result = await model.generateContent(message);
    const response = result.response;
    const text = await response.text();

    return new Response(JSON.stringify({ reply: text }), { status: 200 });
  } catch (error) {
    console.error("Error generating response:", error);
    return new Response(
      JSON.stringify({ error: "Failed to generate response" }),
      { status: 500 }
    );
  }
}
