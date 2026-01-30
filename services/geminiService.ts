
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export async function getCourseAdvice(userPrompt: string) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userPrompt,
      config: {
        systemInstruction: "You are a helpful language school advisor for Linguistique Academy. We offer French, English, and Spanish courses. Based on the user's goals, suggest which language or level they should consider. Keep it brief and encouraging.",
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having a bit of trouble connecting right now, but feel free to check our course plans below!";
  }
}
