import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { findTestByIdOrSlug, saveAttemptToDbOrLocal } from "@/lib/tests/testStorage";
import { analyzeTestProgress } from "@/lib/tests/aiAnalysis";

export async function POST(request: Request) {
  try {
    const { userId } = await auth();
    const effectiveUserId = userId || "guest-user";

    const body = await request.json();
    const { testId, userAnswers = {}, timeSpentSeconds = 0 } = body;

    if (!testId) {
      return NextResponse.json(
        { success: false, error: "Test ID is required for submission." },
        { status: 400 }
      );
    }

    const test = findTestByIdOrSlug(testId);
    if (!test) {
      return NextResponse.json(
        { success: false, error: "Test not found." },
        { status: 404 }
      );
    }

    // Calculate score
    let correctCount = 0;
    const totalQuestions = test.questions.length;

    for (const q of test.questions) {
      const selectedOptionIndex = userAnswers[q.id];
      if (typeof selectedOptionIndex === "number" && selectedOptionIndex === q.correctAnswer) {
        correctCount += 1;
      }
    }

    const scorePercentage = Math.round((correctCount / totalQuestions) * 100);

    // AI Progress Analysis with Gemini
    const aiAnalysis = await analyzeTestProgress({
      testTitle: test.title,
      category: test.category,
      difficulty: test.difficulty,
      questions: test.questions,
      userAnswers,
      score: scorePercentage,
      timeSpentSeconds,
    });

    // Save attempt to database and local store
    const savedAttempt = await saveAttemptToDbOrLocal({
      userId: effectiveUserId,
      testId: test.id,
      testTitle: test.title,
      category: test.category,
      difficulty: test.difficulty,
      score: scorePercentage,
      totalQuestions,
      correctAnswers: correctCount,
      timeSpentSeconds,
      userAnswers,
      questionsSnapshot: test.questions,
      aiAnalysis,
    });

    return NextResponse.json({
      success: true,
      attemptId: savedAttempt.id,
      attempt: savedAttempt,
    });
  } catch (error) {
    console.error("POST /api/tests/submit error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to evaluate test and process AI analysis." },
      { status: 500 }
    );
  }
}
