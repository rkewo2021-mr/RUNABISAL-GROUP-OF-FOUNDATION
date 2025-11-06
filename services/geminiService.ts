import { GoogleGenAI, Modality } from "@google/genai";

// Fix: Define and use a named interface `AIStudio` for `window.aistudio`
// to resolve declaration merging conflicts.
declare global {
  interface AIStudio {
    hasSelectedApiKey: () => Promise<boolean>;
    openSelectKey: () => Promise<void>;
  }
  interface Window {
    aistudio: AIStudio;
  }
}

async function checkAndSelectApiKey(): Promise<boolean> {
  try {
    if (await window.aistudio.hasSelectedApiKey()) {
      return true;
    }
    await window.aistudio.openSelectKey();
    // Assume success after prompt, as hasSelectedApiKey might have a race condition
    return true; 
  } catch (e) {
    console.error("API Key selection failed", e);
    return false;
  }
}

const getAiClient = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const describeFace = async (base64Image: string, mimeType: string): Promise<string> => {
  if (!process.env.API_KEY) throw new Error("API key not found");
  const ai = getAiClient();
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: {
      parts: [
        {
          inlineData: {
            mimeType: mimeType,
            data: base64Image,
          },
        },
        {
          text: 'Describe the key facial features of the person in this image in a concise, neutral, and descriptive way, focusing on hair color, eye color, face shape, and notable features. Example: "a person with brown hair, blue eyes, and a square jaw."'
        }
      ],
    },
  });
  return response.text;
};

export const generateVideo = async (faceDescription: string, templatePrompt: string): Promise<string> => {
  const apiKeyReady = await checkAndSelectApiKey();
  if (!apiKeyReady) {
    throw new Error("API Key not selected. Please select an API key to proceed.");
  }
  if (!process.env.API_KEY) throw new Error("API key not found after selection.");

  const ai = getAiClient();
  const prompt = templatePrompt.replace('{faceDescription}', faceDescription);
  
  try {
    let operation = await ai.models.generateVideos({
      model: 'veo-3.1-fast-generate-preview',
      prompt: prompt,
      config: {
        numberOfVideos: 1,
        resolution: '720p',
        aspectRatio: '9:16'
      }
    });

    while (!operation.done) {
      await new Promise(resolve => setTimeout(resolve, 10000));
      operation = await ai.operations.getVideosOperation({ operation: operation });
    }

    const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
    if (!downloadLink) {
      throw new Error("Video generation succeeded but no download link was found.");
    }
    
    const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
    const videoBlob = await response.blob();
    return URL.createObjectURL(videoBlob);

  } catch(e: any) {
    if(e.message && e.message.includes("Requested entity was not found.")){
       throw new Error("API Key validation failed. Please try selecting your API key again.");
    }
    throw e;
  }
};

export const animateImage = async (base64Image: string, mimeType: string, stylePrompt: string): Promise<string> => {
  if (!process.env.API_KEY) throw new Error("API key not found");
  const ai = getAiClient();
  
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        {
          inlineData: {
            data: base64Image,
            mimeType: mimeType,
          },
        },
        {
          text: `Recreate this image ${stylePrompt}`,
        },
      ],
    },
    config: {
        responseModalities: [Modality.IMAGE],
    },
  });

  const firstPart = response.candidates?.[0]?.content?.parts?.[0];
  if (firstPart && firstPart.inlineData) {
    const base64ImageBytes: string = firstPart.inlineData.data;
    return `data:${firstPart.inlineData.mimeType};base64,${base64ImageBytes}`;
  }

  throw new Error("Could not generate animated image.");
};