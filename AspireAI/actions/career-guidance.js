"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

/**
 * Generates personalized career advisory based on a user message and optional chat history.
 *
 * @param {Object} params - Function parameters.
 * @param {string} params.userMessage - The latest message/input from the user.
 * @param {string} [params.chatHistory] - Optional previous conversation history (as plain text).
 * @returns {Promise<string>} - A promise that resolves to the AI-generated response.
 */
export async function askCareerAdvisory({ userMessage, chatHistory = "" }) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  // Retrieve minimal user info to tailor the career advice.
  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
    select: {
      industry: true,
      experience: true,
      skills: true,
      bio: true,
    },
  });
  if (!user) throw new Error("User not found");

  // Build context from the user profile.
  const contextInfo = `User Profile:
Industry: ${user.industry || "N/A"}
Experience: ${user.experience || "N/A"}
Skills: ${user.skills && user.skills.length ? user.skills.join(", ") : "N/A"}
Bio: ${user.bio || "N/A"}`;

  // Optionally include previous conversation history, if any.
  const conversationContext = chatHistory ? `Conversation History:\n${chatHistory}\n\n` : "";

  // Construct the prompt for the AI model.
  const prompt = `${conversationContext}${contextInfo}

User: ${userMessage}

You are a professional career advisor. Based on the user profile provided above, offer personalized, actionable career advice. Provide a clear, concise response in plain text without asking clarifying questions.`;

  try {
    const result = await model.generateContent(prompt);
    const responseText = result.response.text().trim();
    return responseText;
  } catch (error) {
    console.error("Error generating career advisory response:", error);
    throw new Error("Failed to generate career advisory response");
  }
}
