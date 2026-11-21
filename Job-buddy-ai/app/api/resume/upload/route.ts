export const runtime = "nodejs";
import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { users, resumes } from "@/lib/db/schema";
import { syncUser } from "@/lib/db/user-sync";
import { extractResumeText } from "@/lib/resume/extractText";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export async function POST(request: Request) {
  try {
    // Use auth() first (session token) — works reliably with middleware
    const { userId: clerkId } = await auth();

    if (!clerkId) {
      return NextResponse.json(
        { error: "Unauthorized. Please sign in to upload your resume." },
        { status: 401 }
      );
    }

    // Get full user object for email
    const user = await currentUser();
    const email = user?.emailAddresses[0]?.emailAddress ?? "";

    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "No resume file provided." },
        { status: 400 }
      );
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Only PDF and DOCX files are supported." },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "Resume must be smaller than 5 MB." },
        { status: 400 }
      );
    }

    const text = await extractResumeText(file);

    if (!text) {
      return NextResponse.json(
        {
          error:
            "Could not extract text from this resume. Please upload a text-based PDF or DOCX.",
        },
        { status: 400 }
      );
    }

    // Find or auto-sync user record
    let databaseUser: typeof users.$inferSelect | undefined;
    const existing = await db
      .select()
      .from(users)
      .where(eq(users.clerkId, clerkId))
      .limit(1);

    if (existing.length > 0) {
      databaseUser = existing[0];
    } else if (email) {
      databaseUser = await syncUser({
        id: clerkId,
        email,
        firstName: user?.firstName,
        lastName: user?.lastName,
      });
    }

    if (!databaseUser) {
      return NextResponse.json(
        {
          error:
            "User account has not been synchronized yet. Please wait a moment and try again.",
        },
        { status: 400 }
      );
    }

    const [resume] = await db
      .insert(resumes)
      .values({
        userId: databaseUser.id,
        fileName: file.name,
        fileType: file.type,
        extractedText: text,
        isPrimary: true,
      })
      .returning();

    return NextResponse.json({
      success: true,
      resume: {
        id: resume.id,
        fileName: resume.fileName,
        fileType: resume.fileType,
        textLength: text.length,
      },
    });
  } catch (error) {
    console.error("Resume upload error:", error);

    return NextResponse.json(
      { error: "Failed to process resume." },
      { status: 500 }
    );
  }
}
