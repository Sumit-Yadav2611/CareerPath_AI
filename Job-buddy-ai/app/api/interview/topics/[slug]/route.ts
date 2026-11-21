import { NextResponse } from "next/server";
import { getTopicBySlug } from "@/lib/interview/topics";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const topic = getTopicBySlug(slug);

    if (!topic) {
      return NextResponse.json(
        { success: false, error: "Topic not found." },
        { status: 404 }
      );
    }

    // Return full topic with questions (but without answers for browse mode)
    const safeQuestions = topic.questions.map((q) => ({
      id: q.id,
      question: q.question,
      difficulty: q.difficulty,
      tags: q.tags,
      tip: q.tip,
      followUp: q.followUp,
      // answer is included for study mode — users read reference answers
      answer: q.answer,
    }));

    return NextResponse.json({
      success: true,
      topic: {
        ...topic,
        questions: safeQuestions,
      },
    });
  } catch (error) {
    console.error("Interview topic detail error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to load topic." },
      { status: 500 }
    );
  }
}
