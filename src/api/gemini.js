/**
 * Utility for interacting with Google Gemini API
 */

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

/**
 * Generate text content using Gemini 2.5 Flash
 * @param {string} prompt - The text prompt to send to the AI
 * @param {string} systemInstruction - Optional system instruction to guide the AI's behavior
 * @returns {Promise<string>} - The generated text response
 */
export const generateText = async (prompt, systemInstruction = null) => {
  if (!API_KEY) {
    throw new Error("API Key is missing. Please add VITE_GEMINI_API_KEY to your .env file.");
  }

  const payload = {
    contents: [
      {
        parts: [{ text: prompt }]
      }
    ],
    generationConfig: {
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 2048,
    }
  };

  // Add system instruction if provided
  if (systemInstruction) {
    payload.systemInstruction = {
      parts: [{ text: systemInstruction }]
    };
  }

  try {
    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Gemini API Error details:", errorData);
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    // Extract text from standard response format
    if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0].text) {
      return data.candidates[0].content.parts[0].text;
    } else {
      console.error("Unexpected response structure:", data);
      throw new Error("Received an unexpected response structure from the API.");
    }
    
  } catch (error) {
    console.error("Error in generateText:", error);
    throw error;
  }
};
