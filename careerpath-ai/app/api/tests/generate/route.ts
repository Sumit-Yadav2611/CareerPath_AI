import { NextResponse } from "next/server";
import { generateCustomAITest } from "@/lib/tests/generateTest";
import { saveCustomTest } from "@/lib/tests/testStorage";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { topic, difficulty, questionCount } = body;

    if (!topic || typeof topic !== "string" || topic.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid topic for test generation." },
        { status: 400 }
      );
    }

    const test = await generateCustomAITest({
      topic: topic.trim(),
      difficulty: difficulty || "Intermediate",
      questionCount: Number(questionCount) || 5,
    });

    // Save test so it can be retaken or retrieved
    saveCustomTest(test);

    return NextResponse.json({
      success: true,
      test: {
        id: test.id,
        slug: test.slug,
        title: test.title,
        category: test.category,
        difficulty: test.difficulty,
        description: test.description,
        durationMinutes: test.durationMinutes,
        totalQuestions: test.totalQuestions,
        passingScore: test.passingScore,
        skillsCovered: test.skillsCovered,
      },
    });
  } catch (error) {
    console.error("POST /api/tests/generate error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to generate AI custom test." },
      { status: 500 }
    );
  }
}
