import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

type GeminiAction =
  | "ping"
  | "no_action"
  | "clean_text"
  | "summarize"
  | "extract_key_points"
  | "extract_action_items"
  | "sentiment_analysis"
  | "tag_category";

export async function gemini(action: GeminiAction, input?: string) {
  if (!input && action !== "ping") {
    throw new Error("Input is required for this action");
  }

  switch (action) {
    //non-llm actions
    case "ping":
      return "PONG";

    case "no_action":
      return "";

    case "clean_text":
      return input!
        .replace(/\s+/g, " ")
        .replace(/[^\w\s.,!?-]/g, "")
        .trim();

    case "sentiment_analysis":
      const positiveWords = ["good", "great", "happy", "excellent", "love"];
      const negativeWords = ["bad", "sad", "terrible", "hate", "poor"];

      const lower = input!.toLowerCase();

      const positiveScore = positiveWords.filter((w) =>
        lower.includes(w)
      ).length;

      const negativeScore = negativeWords.filter((w) =>
        lower.includes(w)
      ).length;

      if (positiveScore > negativeScore) return "Positive";
      if (negativeScore > positiveScore) return "Negative";
      return "Neutral";

    //llm actions

    case "summarize":
      return await callLLM(`
        Summarize the following text clearly and concisely:

        ${input}
      `);

    case "extract_key_points":
      return await callLLM(`
        Extract key points from the following text.
        Return them as bullet points:

        ${input}
      `);

    case "extract_action_items":
      return await callLLM(`
        Extract actionable tasks from the following text.
        Return them as a numbered list:

        ${input}
      `);

    case "tag_category":
      return await callLLM(`
        Categorize the following text into one short category label.
        Only return the category name:

        ${input}
      `);

    default:
      throw new Error("Invalid Gemini action");
  }
}

async function callLLM(prompt: string) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response.text?.trim() ?? "";
}
