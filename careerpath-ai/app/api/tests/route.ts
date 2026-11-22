import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getAllTests, getUserAttempts } from "@/lib/tests/testStorage";

export async function GET() {
  try {
    const { userId } = await auth();
    const tests = getAllTests();

    let userAttemptsMap: Record<string, { attemptsCount: number; bestScore: number; lastTaken: string }> = {};

    if (userId) {
      try {
        const attempts = await getUserAttempts(userId);
        for (const attempt of attempts) {
          const key = attempt.testId || attempt.testTitle;
          if (!userAttemptsMap[key]) {
            userAttemptsMap[key] = {
              attemptsCount: 0,
              bestScore: 0,
              lastTaken: attempt.completedAt,
            };
          }
          userAttemptsMap[key].attemptsCount += 1;
          userAttemptsMap[key].bestScore = Math.max(userAttemptsMap[key].bestScore, attempt.score);
        }
      } catch (err) {
        console.warn("Failed to load user attempts for test listing:", err);
      }
    }

    // Hide answers from test listing
    const sanitizedTests = tests.map((t) => {
      const stats = userAttemptsMap[t.id] || userAttemptsMap[t.slug] || userAttemptsMap[t.title];
      return {
        id: t.id,
        slug: t.slug,
        title: t.title,
        category: t.category,
        difficulty: t.difficulty,
        description: t.description,
        durationMinutes: t.durationMinutes,
        totalQuestions: t.totalQuestions,
        passingScore: t.passingScore,
        skillsCovered: t.skillsCovered,
        userStats: stats || null,
      };
    });

    return NextResponse.json({
      success: true,
      tests: sanitizedTests,
    });
  } catch (error) {
    console.error("GET /api/tests error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch tests" },
      { status: 500 }
    );
  }
}
