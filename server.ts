import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json({ limit: "10mb" }));

const PORT = 3000;

// Lazy initialization of Gemini client
const getGenAI = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

// --- API Endpoints ---

// Health Check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", academy: "Crimivex Academy of Forensic Sciences", version: "2.4.0" });
});

// AI Case File Analysis Endpoint
app.post("/api/ai/analyze-case", async (req, res) => {
  try {
    const { caseTitle, evidenceList, suspectStatement, question } = req.body;
    const ai = getGenAI();

    if (!ai) {
      return res.status(500).json({
        error: "GEMINI_API_KEY is missing. Please configure your API key in Settings > Secrets.",
      });
    }

    const prompt = `You are Farah Abdi Hassan, Founder & Instructor at CRIMIVEX Academy.
Provide an expert educational forensic analysis of the following case:
Case Title: ${caseTitle || "Unspecified Case"}
Evidence Collected: ${JSON.stringify(evidenceList || [])}
Suspect Statement: ${suspectStatement || "None provided"}
Cadet Inquiry: ${question || "Provide a comprehensive forensic evaluation and breakdown of key leads."}

Structure your response clearly with:
1. **Primary Educational Assessment**: Summary of evidence integrity and key findings.
2. **Inconsistencies & Red Flags**: Discrepancies between physical evidence and testimonies.
3. **Recommended Next Investigative Steps**: Strategic instructions for the cadet.
4. **Relevant Criminology Science & Legal Precedent**: Educational takeaway explaining the criminological concepts applied.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
    });

    res.json({ analysis: response.text });
  } catch (err: any) {
    console.error("AI Analysis error:", err);
    res.status(500).json({ error: err.message || "Failed to run AI case analysis." });
  }
});

// AI Dynamic Case Generator Endpoint
app.post("/api/ai/generate-case", async (req, res) => {
  try {
    const { difficulty, track } = req.body;
    const ai = getGenAI();

    if (!ai) {
      return res.status(500).json({
        error: "GEMINI_API_KEY is missing. Please configure your API key in Settings > Secrets.",
      });
    }

    const prompt = `Generate an interactive mystery training case file for Crimivex Academy cadets.
Specialized Track: ${track || "Cyber Forensics & Homicide"}
Difficulty: ${difficulty || "Intermediate"}

Respond strictly in valid JSON format matching this schema:
{
  "id": "CASE-GEN-${Date.now()}",
  "title": "Case Name",
  "codename": "Operation Code",
  "track": "${track || "Cyber Forensics"}",
  "difficulty": "${difficulty || "Intermediate"}",
  "summary": "Brief 2-3 sentence overview of the incident",
  "location": "Primary scene location",
  "timestamp": "Date and time of occurrence",
  "victim": "Victim background or affected system",
  "suspects": [
    {
      "name": "Suspect Full Name",
      "role": "Motive / Relationship",
      "alibi": "Claimed alibi",
      "suspicionLevel": "Low / Medium / High",
      "keyQuote": "Notable quote during preliminary interrogation"
    }
  ],
  "evidence": [
    {
      "id": "EV-101",
      "name": "Evidence Item Name",
      "type": "Physical / Digital / Trace / Biological / Document",
      "description": "Technical forensic description",
      "significance": "Why this evidence matters"
    }
  ],
  "forensicPuzzle": {
    "question": "The primary core deduction question the cadet must answer to solve the case",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctIndex": 0,
    "explanation": "Detailed breakdown explaining why this is correct based on forensic science principles"
  }
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const caseData = JSON.parse(response.text || "{}");
    res.json({ caseData });
  } catch (err: any) {
    console.error("AI Case Generation error:", err);
    res.status(500).json({ error: err.message || "Failed to generate dynamic case file." });
  }
});

// AI Interrogation Simulation Endpoint
app.post("/api/ai/interrogate-suspect", async (req, res) => {
  try {
    const { suspectName, suspectRole, caseContext, chatHistory, cadetQuestion } = req.body;
    const ai = getGenAI();

    if (!ai) {
      return res.status(500).json({
        error: "GEMINI_API_KEY is missing. Please configure your API key in Settings > Secrets.",
      });
    }

    const prompt = `You are roleplaying as suspect "${suspectName}" (${suspectRole}) in a criminal investigation.
Case Context: ${caseContext}
Previous Chat History: ${JSON.stringify(chatHistory || [])}

The cadet asking you a question is an investigator at Crimivex Academy.
Cadet's Question: "${cadetQuestion}"

Respond in character. Be realistic: if you are guilty or hiding something, show subtle defensive cues, hesitation, or calculated misdirection. If defensive, react accordingly. Keep responses concise (2-4 sentences max).

Also include a secret JSON metadata header at the end formatted as [EVALUATION: {"deceptionScore": 0-100, "stressLevel": "Low/Medium/High", "microExpression": "brief psychological cue"}].`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
    });

    const rawText = response.text || "";
    let replyText = rawText;
    let evaluation = { deceptionScore: 45, stressLevel: "Medium", microExpression: "Avoided direct eye contact" };

    const evalMatch = rawText.match(/\[EVALUATION:\s*({.*?})\]/s);
    if (evalMatch && evalMatch[1]) {
      try {
        evaluation = JSON.parse(evalMatch[1]);
        replyText = rawText.replace(/\[EVALUATION:\s*({.*?})\]/s, "").trim();
      } catch (e) {
        // Fallback cleanup if JSON parse fails
        replyText = rawText.replace(/\[EVALUATION:.*$/s, "").trim();
      }
    }

    res.json({ reply: replyText, evaluation });
  } catch (err: any) {
    console.error("AI Interrogation error:", err);
    res.status(500).json({ error: err.message || "Failed to process interrogation response." });
  }
});

// AI Academy Tutor Endpoint
app.post("/api/ai/tutor", async (req, res) => {
  try {
    const { question, topic } = req.body;
    const ai = getGenAI();

    if (!ai) {
      return res.status(500).json({
        error: "GEMINI_API_KEY is missing. Please configure your API key in Settings > Secrets.",
      });
    }

    const prompt = `You are Farah Abdi Hassan, Founder & Lead Instructor at CRIMIVEX Academy.
The cadet is asking about: Topic: ${topic || "General Forensics & Criminology"}
Question: "${question}"

Provide an authoritative, detailed educational answer with:
- Clear criminological principles and legal standards.
- Practical application in criminal investigation or court testimony.
- Key terminology definitions.
- Keep tone professional, academic, encouraging, and rigorous.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
    });

    res.json({ answer: response.text });
  } catch (err: any) {
    console.error("AI Tutor error:", err);
    res.status(500).json({ error: err.message || "Failed to get response from AI Professor." });
  }
});

// Start Server & Vite Integration
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Crimivex Academy] Server active on port ${PORT}`);
  });
}

startServer();
