"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function generateCareerAdvice(data) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  const prompt = `
    You are an AI Career Counselor.

    Based on the following user profile, suggest personalized career paths, relevant industries, potential job roles, and next steps for career growth. Also suggest useful certifications or skills the user can gain.

    User Profile:
    - Name: ${user.name}
    - Education: ${user.education}
    - Interests: ${user.interests?.join(", ")}
    - Skills: ${user.skills?.join(", ")}
    - Experience: ${user.experience}
    - Goals: ${user.careerGoals}

    Guidelines:
    1. Keep the tone friendly, helpful, and encouraging.
    2. Provide clear, structured advice in markdown format.
    3. Include a short summary at the beginning.
    4. Add tips for improving career prospects and confidence.

    Format everything neatly in markdown.
  `;

  try {
    const result = await model.generateContent(prompt);
    const content = result.response.text().trim();

    const guidance = await db.careerAdvice.create({
      data: {
        content,
        userId: user.id,
        status: "completed",
      },
    });

    return guidance;
  } catch (error) {
    console.error("Error generating career guidance:", error.message);
    throw new Error("Failed to generate career guidance");
  }
}

export async function getCareerGuidance() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  return await db.careerAdvice.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });
}

export async function getCareerAdvice(id) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  return await db.careerAdvice.findUnique({
    where: { id, userId: user.id },
  });
}

export async function deleteCareerAdvice(id) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  return await db.careerAdvice.delete({
    where: { id, userId: user.id },
  });
}
