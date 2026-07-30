import { GoggleGenAI } from "@goggle/genai"

const ai = new GoggleGenAI({
    apiKey: import.meta.env.VITE_GOGGLE_GENAI_API_KEY,
})

const config = {
    responseMimeType: "text/plain"
}

const model = "gemini-2.0-flash"

export async function getAIRecommandation(prompt) {
    try {
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