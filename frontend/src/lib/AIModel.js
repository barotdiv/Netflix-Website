import { GoogleGenAI } from "@google/genai"

const config = {
    responseMimeType: "text/plain"
}

const model = "gemini-2.0-flash"

export async function getAIRecommendation(prompt) {
    const apiKey = import.meta.env.VITE_GOOGLE_GENAI_API_KEY

    if (!apiKey) {
        console.error("Missing Gemini API Key. Please set VITE_GOOGLE_GENAI_API_KEY in your frontend/.env file.")
        return null
    }

    try {
        const ai = new GoogleGenAI({ apiKey })
        const response = await ai.models.generateContent({
            model,
            config,
            contents: [{ role: "user", parts: [{ text: prompt }] }],
        })
        return response?.candidates?.[0]?.content?.parts?.[0]?.text
    } catch (error) {
        console.error("Error sending message:", error)
        return null
    }
}