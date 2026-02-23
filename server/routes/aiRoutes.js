import express from "express";
import axios from "axios";

const router = express.Router();

router.post("/", async (req, res) => {
  const { marketingClaim } = req.body;
  if (!marketingClaim) return res.status(400).json({ error: "marketingClaim is required" });

  try {
    const response = await axios.post("http://localhost:8000/analyze", { marketingClaim });
    res.json(response.data);
  } catch (err) {
    console.error("Local LLM call failed:", err.message);

    // Fallback rule-based detection
    const suspiciousWords = ["zero emission", "carbon free", "eco friendly", "100% green", "sustainable", "climate neutral"];
    const warning = suspiciousWords.some(word => marketingClaim.toLowerCase().includes(word));
    res.json({
      confidenceScore: warning ? 85 : 10,
      warning,
      explanation: warning ? "Claim contains suspicious sustainability language." : "Claim seems safe.",
      rawAI: "Fallback rule-based detection used"
    });
  }
});

export default router;