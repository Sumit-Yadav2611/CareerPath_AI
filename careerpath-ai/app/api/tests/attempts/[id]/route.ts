import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getAttemptById } from "@/lib/tests/testStorage";

export async function GET(
  _request: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth();
    const { id } = await props.params;

    const attempt = await getAttemptById(id, userId || undefined);

    if (!attempt) {
      return NextResponse.json(
        { success: false, error: "Test attempt not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      attempt,
    });
  } catch (error) {
    console.error("GET /api/tests/attempts/[id] error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch attempt details" },
      { status: 500 }
    );
  }
}
