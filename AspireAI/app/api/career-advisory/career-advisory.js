// pages/api/career-advisory.js
import { askCareerAdvisory } from "@/actions/career-guidance";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { message, chatHistory } = req.body;
      const advisory = await askCareerAdvisory({
        userMessage: message,
        chatHistory,
      });
      res.status(200).json({ advisory });
    } catch (error) {
      console.error("Error in career advisory API:", error);
      res.status(500).json({ error: "Failed to generate advisory" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
