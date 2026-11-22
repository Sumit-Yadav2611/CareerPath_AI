import { NextResponse } from "next/server";
import { getAllTopics, getTotalQuestionCount } from "@/lib/interview/topics";

export async function GET() {
  try {
    const topics = getAllTopics();
    const totalQuestions = getTotalQuestionCount();

    // Return topics without full question details for the listing page
    const topicSummaries = topics.map((t) => ({
      id: t.id,
      slug: t.slug,
      title: t.title,
      subtitle: t.subtitle,
      emoji: t.emoji,
      color: t.color,
      questionCount: t.questionCount,
      difficulty: t.difficulty,
      tags: t.tags,
    }));

    return NextResponse.json({
      success: true,
      topics: topicSummaries,
      totalQuestions,
    });
  } catch (error) {
    console.error("Interview topics error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to load interview topics." },
      { status: 500 }
    );
  }
}
