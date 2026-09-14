import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini AI Client lazily or safely
  const getGeminiClient = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return null;
    return new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  };

  // Health API
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", service: "DISHA AI Engine" });
  });

  // AI Recommendation Summary API
  app.post("/api/recommend", async (req, res) => {
    try {
      const { profile, calculatedCutoff } = req.body;
      const ai = getGeminiClient();

      if (!ai) {
        return res.json({
          summary: `Based on your cutoff score of ${calculatedCutoff} in ${profile.category || 'Engineering'} and your preferred location (${profile.preferredDistrict || 'Tamil Nadu'}), you have strong opportunities in leading Tamil Nadu institutions. Continue exploring top course matches tailored to your skills.`
        });
      }

      const prompt = `You are DISHA AI, an expert academic counselor for 12th standard Tamil Nadu students.
Student Details:
- Name: ${profile.name || 'Student'}
- Stream: ${profile.stream || 'Computer Science'}
- Category: ${profile.category || 'Engineering'}
- Cutoff Score / Percentage: ${calculatedCutoff}
- Preferred District: ${profile.preferredDistrict || 'All Districts'}
- Skills: ${profile.skills?.join(', ') || 'General'}
- Interests: ${profile.interests?.join(', ') || 'General'}

Provide a 3-sentence personalized AI recommendation summary advising the student on their college admission prospects, top recommended branches, and strategic guidance for TNEA / NEET / Counselling in Tamil Nadu. Keep it encouraging, authoritative, and concise.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt
      });

      const summaryText = response.text || "Your calculated cutoff positions you well for top-tier colleges in Tamil Nadu.";
      res.json({ summary: summaryText });
    } catch (err: any) {
      console.error("Gemini API error:", err);
      res.json({
        summary: `Your calculated cutoff score puts you in an advantageous position for Tamil Nadu counseling. Explore target colleges and career pathways below.`
      });
    }
  });

  // AI Chat Assistant Endpoint ("Ask DISHA AI")
  app.post("/api/chat", async (req, res) => {
    try {
      const { message } = req.body;
      const ai = getGeminiClient();

      if (!ai) {
        return res.json({
          reply: `### 📌 DISHA AI Guidance
- **TNEA Engineering Cutoff:** \`Mathematics + (Physics / 2) + (Chemistry / 2)\` (Out of 200)
- **Agriculture Cutoff:** \`Biology/2 + Math/2 + Physics/2 + Chemistry/2\` (Out of 200)
- Ask me about top TN colleges, cutoffs, or course comparisons!`
        });
      }

      const systemInstruction = `You are DISHA AI, an expert, friendly college & career counselor for 12th-grade students in Tamil Nadu.

STRICT FORMATTING RULES:
1. ALWAYS structure your answer clearly with markdown headers (###), bullet points (-), and bold key concepts (**text**).
2. NEVER use raw LaTeX math syntax like $$\text{...}$$ or \left(\frac{...}\right). Write formulas in clear text like: \`Cutoff = Mathematics + (Physics / 2) + (Chemistry / 2)\`.
3. Use step-by-step numbered lists (1., 2., 3.) for calculations or procedures.
4. Keep paragraph lengths short (2-3 sentences max) with double line breaks between sections.
5. Provide relevant Tamil Nadu college names (e.g. CEG Guindy, MIT Chromepet, PSG Tech, SSN, TCE Madurai, TNAU, MMC) and cutoffs when asked.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: `${systemInstruction}\n\nStudent Question: ${message}`
      });

      res.json({ reply: response.text || "I am here to guide your college and career choices in Tamil Nadu." });
    } catch (err: any) {
      console.error("Gemini Chat error:", err);
      res.json({
        reply: `### 📌 DISHA AI Quick Info
- **TNEA Formula:** \`Cutoff = Mathematics + (Physics / 2) + (Chemistry / 2)\`
- Use the **DISHA AI Form** tab to calculate your exact cutoff and view matched TN colleges!`
      });
    }
  });

  // Vite middleware setup for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`DISHA AI Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
