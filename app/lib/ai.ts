import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

type GeminiAction =
  | "ping"
  | "clean_text"
  | "summarize"
  | "extract_key_points"
  | "tag_category";

export async function gemini(action: GeminiAction, input?: string) {
  let prompt = "";

  switch (action) {
    case "ping":
      prompt = "Reply with exactly: PONG";
      break;

    default:
      throw new Error("Invalid Gemini action");
  }

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response.text?.trim();
}
