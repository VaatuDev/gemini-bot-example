import "dotenv/config";

// Prefix, Token and your Gemini Key.
export const {
  TOKEN = "",
  PREFIX = "$",
  GEMINI_KEY = ""
} = process.env;