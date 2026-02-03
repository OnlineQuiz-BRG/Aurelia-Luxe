
import { GoogleGenAI, Type } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are the "Aurelia Luxe AI Concierge," a world-class jewelry specialist. 
Your tone is sophisticated, elegant, and exclusive. 

Your knowledge includes:
1. The 4Cs of Diamonds.
2. Styling advice for high-end fashion.
3. Gift recommendations.
4. Analyzing user outfits/styles to match with jewelry.

Guidelines:
- Always speak with grace and poise.
- Use words like "Exquisite," "Timeless," "Radiant," and "Masterpiece."
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

    return response.text || "Forgive me, but I am at a loss for words.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Forgive me, but I am momentarily unable to access our records. How else may I assist you with your inquiries today?";
  }
};

export const analyzeStyleMatch = async (base64Image: string, products: any[]) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    const productContext = products.map(p => `${p.name} (SKU: ${p.sku}): ${p.description}`).join('\n');
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: base64Image.split(',')[1],
            },
          },
          {
            text: `As the Aurelia Luxe Concierge, analyze this person's style and outfit. Then, select exactly 3 pieces from our catalog that would perfectly complement their look. 
            
            Catalog:
            ${productContext}
            
            Provide your response in JSON format with the following structure:
            {
              "analysis": "A sophisticated paragraph about their style.",
              "matches": [
                { "sku": "SKU_HERE", "reason": "Why this piece matches their specific look." }
              ]
            }
            Maintain your luxurious persona in the 'analysis' and 'reason' fields.`
          }
        ]
      },
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            analysis: { type: Type.STRING },
            matches: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  sku: { type: Type.STRING },
                  reason: { type: Type.STRING }
                },
                required: ['sku', 'reason']
              }
            }
          },
          required: ['analysis', 'matches']
        }
      }
    });

    const responseText = response.text;
    if (!responseText) {
      throw new Error("The AI returned an empty response.");
    }
    return JSON.parse(responseText);
  } catch (error) {
    console.error("Style Matcher Error:", error);
    return null;
  }
};
