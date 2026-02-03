
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are the "Aurelia Luxe AI Concierge," a world-class jewelry specialist at a high-end boutique. 
Your tone is sophisticated, elegant, helpful, and exclusive. 

Your knowledge includes:
1. The 4Cs of Diamonds (Cut, Color, Clarity, Carat).
2. Styling advice for various occasions (Galas, Weddings, Everyday Luxury).
3. Gift recommendations for anniversaries, birthdays, and milestones.
4. Jewelry care and heritage.

Guidelines:
- Always speak with grace and poise.
- Use words like "Exquisite," "Timeless," "Radiant," and "Masterpiece."
- If asked about prices, explain that Aurelia Luxe offers bespoke pricing based on material purity and stone quality.
- Keep responses relatively concise but luxurious.
`;

export const getGeminiResponse = async (userMessage: string, history: {role: string, parts: {text: string}[]}[] = []) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...history,
        { role: 'user', parts: [{ text: userMessage }] }
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
        topP: 0.95,
      }
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Forgive me, but I am momentarily unable to access our records. How else may I assist you with your inquiries today?";
  }
};
