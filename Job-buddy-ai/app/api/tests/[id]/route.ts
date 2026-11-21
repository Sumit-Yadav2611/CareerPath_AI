import { NextResponse } from "next/server";
import { findTestByIdOrSlug } from "@/lib/tests/testStorage";

export async function GET(
  _request: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await props.params;
    const test = findTestByIdOrSlug(id);

    if (!test) {
      return NextResponse.json(
        { success: false, error: "Test not found" },
        { status: 404 }
      );
    }

    // Return test without exposing correctAnswer to client
    const safeQuestions = test.questions.map((q) => ({
      id: q.id,
      question: q.question,
      codeSnippet: q.codeSnippet,
      options: q.options,
      skill: q.skill,
    }));

    return NextResponse.json({
      success: true,
      test: {
        ...test,
        questions: safeQuestions,
      },
    });
  } catch (error) {
    console.error("GET /api/tests/[id] error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch test details" },
      { status: 500 }
    );
  }
}
