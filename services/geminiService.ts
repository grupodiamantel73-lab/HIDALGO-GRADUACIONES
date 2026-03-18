import { GoogleGenAI, Type } from "@google/genai";
import { AISuggestion } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export const generateSocialMediaStrategy = async (
  releaseTitle: string,
  description: string,
  releaseDate: string,
  targetAudience: string
): Promise<AISuggestion[]> => {
  const model = "gemini-3.1-pro-preview";
  
  const prompt = `
    As an expert music marketing strategist, generate a social media promotion strategy for a new music release.
    Release Title: ${releaseTitle}
    Description: ${description}
    Release Date: ${releaseDate}
    Target Audience: ${targetAudience}

    Suggest 3-5 social media posts across different platforms (Instagram, TikTok, Twitter, Facebook).
    For each post, provide:
    1. The platform.
    2. The best time to post (considering the release date and audience).
    3. A compelling reason for that time and platform.
    4. A draft of the content.
    5. A list of relevant hashtags.
  `;

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            platform: { type: Type.STRING },
            bestTime: { type: Type.STRING },
            reason: { type: Type.STRING },
            contentDraft: { type: Type.STRING },
            hashtags: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["platform", "bestTime", "reason", "contentDraft", "hashtags"]
        }
      }
    }
  });

  try {
    return JSON.parse(response.text || "[]");
  } catch (error) {
    console.error("Error parsing AI response:", error);
    return [];
  }
};

export const generateImagePrompt = async (postContent: string): Promise<string> => {
  const model = "gemini-3-flash-preview";
  const prompt = `Create a detailed image generation prompt for an AI image generator based on this social media post content: "${postContent}". The image should be visually striking and relevant to a music release.`;
  
  const response = await ai.models.generateContent({
    model,
    contents: prompt
  });
  
  return response.text || "A vibrant music-themed abstract background.";
};

export const generateVideoPrompt = async (postContent: string): Promise<string> => {
  const model = "gemini-3-flash-preview";
  const prompt = `Create a detailed video generation prompt for an AI video generator based on this social media post content: "${postContent}". The video should be dynamic and suitable for a short-form video platform like TikTok or Instagram Reels.`;
  
  const response = await ai.models.generateContent({
    model,
    contents: prompt
  });
  
  return response.text || "A dynamic montage of music production and performance.";
};
