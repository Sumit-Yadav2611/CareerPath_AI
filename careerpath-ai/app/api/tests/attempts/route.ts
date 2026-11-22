import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { computeStudentProgress, getUserAttempts } from "@/lib/tests/testStorage";

export async function GET() {
  try {
    const { userId } = await auth();
    const effectiveUserId = userId || "guest-user";

    const progress = await computeStudentProgress(effectiveUserId);
    const attempts = await getUserAttempts(effectiveUserId);

    return NextResponse.json({
      success: true,
      progress,
      attempts,
    });
  } catch (error) {
    console.error("GET /api/tests/attempts error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch test attempts and progress." },
      { status: 500 }
    );
  }
}
