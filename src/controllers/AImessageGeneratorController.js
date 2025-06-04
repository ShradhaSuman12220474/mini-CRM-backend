// /pages/api/generateGeminiMessage.ts (Next.js API Route)

import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_API_KEY } from "../config/serverConfig.js";

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export default async function handler(req ,res) {
  if (req.method !== "GET") return res.status(405).json({ success: false, message: "Method not allowed" });

  const { name, rule } = req.body;
  if (!name || !rule) return res.status(400).json({ success: false, message: "Missing name or rule" });

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `Write a personalized marketing message for a campaign named "${name}" based on the following user segmentation rule: ${rule}.`;

    const result = await model.generateContent(prompt);
    const generatedMessage = result.response.text();

    return res.status(200).json({ success: true, message: generatedMessage });
  } catch (error) {
    console.error("Gemini Error:", error);
    return res.status(500).json({ success: false, message: "Gemini API call failed" });
  }
}
