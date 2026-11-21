import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getTopicBySlug } from "@/lib/interview/topics";
import { evaluateMockInterviewAnswers } from "@/lib/interview/mockInterviewAI";

export async function POST(request: Request) {
  try {
    const { userId } = await auth();
    const effectiveUserId = userId || "guest-user";

    const body = await request.json();
    const { topicSlug, answers = {} } = body;

    if (!topicSlug) {
      return NextResponse.json(
        { success: false, error: "Topic slug is required." },
        { status: 400 }
      );
    }

    const topic = getTopicBySlug(topicSlug);
    if (!topic) {
      return NextResponse.json(
        { success: false, error: "Topic not found." },
        { status: 404 }
      );
    }

    // Run AI evaluation
    const evaluation = await evaluateMockInterviewAnswers({
      topicTitle: topic.title,
      questions: topic.questions,
      answers,
    });

    const session = {
      id: `session-${Date.now()}-${effectiveUserId.slice(0, 8)}`,
      userId: effectiveUserId,
      topicSlug,
      topicTitle: topic.title,
      questions: topic.questions,
      answers,
      feedback: evaluation.feedback,
      overallScore: evaluation.overallScore,
      overallFeedback: evaluation.overallFeedback,
      strengths: evaluation.strengths,
      improvements: evaluation.improvements,
      startedAt: new Date().toISOString(),
      completedAt: new Date().toISOString(),
      status: "completed" as const,
    };

    return NextResponse.json({ success: true, session });
  } catch (error) {
    console.error("Mock interview evaluation error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to evaluate mock interview." },
      { status: 500 }
    );
  }
}
