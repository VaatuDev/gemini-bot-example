import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_KEY } from "./config.js";

const genAi = new GoogleGenerativeAI(GEMINI_KEY);
const model = genAi.getGenerativeModel({ model: "gemini-1.5-flash" });
model.generationConfig.maxOutputTokens = 500; // 500 tokens is around the 2k char limit from discord.js

/**
 * @param {string} prompt
 */
export async function getResponse(prompt) {
  return await model.generateContentStream(prompt);
}