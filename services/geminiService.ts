import { GoogleGenAI } from "@google/genai";
import type { SearchData } from '../types';

const performSearchAnalysis = async (query: string): Promise<SearchData> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set.");
  }
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    You are a Search Engine Relevance Engineer. Your goal is to analyze search results for a given query.
    
    1.  First, perform a Google Search for the user's query: "${query}"
    2.  Analyze the user's "Search Intent" (e.g., Informational, Transactional, Navigational).
    3.  Return a JSON object containing the intent analysis and a list of the top 8-10 most relevant results found.
    4.  For each result, you MUST provide:
        - A "relevance_score" from 1-100.
        - An "explanation" of why this result satisfies the query. Mention factors like keyword matching, domain authority, or content freshness if applicable.

    Return only a valid JSON object with this exact structure, with no markdown formatting:
    {
      "search_intent": "Brief description of what the user wants",
      "intent_type": "Informational" | "Transactional" | "Navigational",
      "results": [
        {
          "title": "Exact Page Title",
          "url": "Exact URL from search",
          "snippet": "Brief summary",
          "relevance_score": 95,
          "explanation": "Why this specific result is perfect for this query."
        }
      ]
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-09-2025", // Using the more specific preview model from original code
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    let textContent = response.text;
    
    if (!textContent) {
      throw new Error("No content generated. The model might have failed to run the search tool.");
    }
    
    // Clean up markdown code blocks if present (e.g. ```json ... ```)
    textContent = textContent.replace(/```json\n?|```/g, '').trim();

    const parsedData: SearchData = JSON.parse(textContent);
    return parsedData;

  } catch (error) {
    console.error("Gemini API call failed:", error);
    if (error instanceof Error) {
        throw new Error(`API Error: ${error.message}`);
    }
    throw new Error("An unexpected error occurred while calling the Gemini API.");
  }
};

export { performSearchAnalysis };
