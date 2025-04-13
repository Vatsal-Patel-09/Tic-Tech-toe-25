// app/api/career-advisory/route.js
import { NextResponse } from "next/server";
import { askCareerAdvisory } from "@/actions/career-guidance"; // Ensure this path is correct

export async function POST(request) {
  try {
    const body = await request.json();
    const { message, chatHistory } = body;
    const advisory = await askCareerAdvisory({
      userMessage: message,
      chatHistory,
    });
    return NextResponse.json({ advisory });
  } catch (error) {
    console.error("Error in career advisory API:", error);
    return NextResponse.json(
      { error: "Failed to generate advisory" },
      { status: 500 }
    );
  }
}
