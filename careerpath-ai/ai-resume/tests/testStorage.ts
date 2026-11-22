import fs from "fs";
import path from "path";
import { eq, desc } from "drizzle-orm";
import { db } from "@/lib/db";
import { testAttempts, users } from "@/lib/db/schema";
import { CURATED_CAREER_TESTS } from "./curatedTests";
import { CareerTest, StudentOverallProgress, TestAttempt } from "./types";

const LOCAL_STORAGE_DIR = path.join(process.cwd(), ".data");
const ATTEMPTS_FILE = path.join(LOCAL_STORAGE_DIR, "test_attempts.json");
const CUSTOM_TESTS_FILE = path.join(LOCAL_STORAGE_DIR, "custom_tests.json");

function ensureStorageDir() {
  try {
    if (!fs.existsSync(LOCAL_STORAGE_DIR)) {
      fs.mkdirSync(LOCAL_STORAGE_DIR, { recursive: true });
    }
  } catch {
    // Ignore error if directory cannot be created
  }
}

function readLocalAttempts(): TestAttempt[] {
  try {
    ensureStorageDir();
    if (fs.existsSync(ATTEMPTS_FILE)) {
      const data = fs.readFileSync(ATTEMPTS_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch {
    // Return empty on file read error
  }
  return [];
}

function writeLocalAttempts(attempts: TestAttempt[]) {
  try {
    ensureStorageDir();
    fs.writeFileSync(ATTEMPTS_FILE, JSON.stringify(attempts, null, 2), "utf-8");
  } catch {
    // Ignore write error
  }
}

function readCustomTests(): CareerTest[] {
  try {
    ensureStorageDir();
    if (fs.existsSync(CUSTOM_TESTS_FILE)) {
      const data = fs.readFileSync(CUSTOM_TESTS_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch {
    // Return empty
  }
  return [];
}

export function saveCustomTest(test: CareerTest) {
  try {
    ensureStorageDir();
    const existing = readCustomTests();
    const filtered = existing.filter((t) => t.id !== test.id && t.slug !== test.slug);
    filtered.unshift(test);
    fs.writeFileSync(CUSTOM_TESTS_FILE, JSON.stringify(filtered.slice(0, 30), null, 2), "utf-8");
  } catch {
    // Ignore error
  }
}

export function getAllTests(): CareerTest[] {
  const customTests = readCustomTests();
  const all = [...customTests, ...CURATED_CAREER_TESTS];
  const seen = new Set<string>();
  return all.filter((test) => {
    if (seen.has(test.id) || seen.has(test.slug)) return false;
    seen.add(test.id);
    seen.add(test.slug);
    return true;
  });
}

export function findTestByIdOrSlug(idOrSlug: string): CareerTest | null {
  const all = getAllTests();
  return (
    all.find((t) => t.id === idOrSlug || t.slug === idOrSlug) ||
    CURATED_CAREER_TESTS.find((t) => t.id === idOrSlug || t.slug === idOrSlug) ||
    null
  );
}

export async function saveAttemptToDbOrLocal(params: {
  userId: string;
  testId?: string | null;
  testTitle: string;
  category: string;
  difficulty: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timeSpentSeconds: number;
  userAnswers: Record<number, number>;
  questionsSnapshot: any[];
  aiAnalysis: any;
}): Promise<TestAttempt> {
  const newAttemptId = `attempt-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  const now = new Date().toISOString();

  const fullAttempt: TestAttempt = {
    id: newAttemptId,
    userId: params.userId,
    testId: params.testId || null,
    testTitle: params.testTitle,
    category: params.category,
    difficulty: params.difficulty,
    score: params.score,
    totalQuestions: params.totalQuestions,
    correctAnswers: params.correctAnswers,
    timeSpentSeconds: params.timeSpentSeconds,
    userAnswers: params.userAnswers,
    questionsSnapshot: params.questionsSnapshot,
    aiAnalysis: params.aiAnalysis,
    status: "completed",
    completedAt: now,
    createdAt: now,
  };

  // Try DB first if connected
  try {
    const [dbUser] = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.clerkId, params.userId))
      .limit(1);

    if (dbUser) {
      await db.insert(testAttempts).values({
        userId: dbUser.id,
        testTitle: params.testTitle,
        category: params.category,
        difficulty: params.difficulty,
        score: params.score,
        totalQuestions: params.totalQuestions,
        correctAnswers: params.correctAnswers,
        timeSpentSeconds: params.timeSpentSeconds,
        userAnswers: JSON.stringify(params.userAnswers),
        questionsSnapshot: JSON.stringify(params.questionsSnapshot),
        aiAnalysis: JSON.stringify(params.aiAnalysis),
        status: "completed",
      });
    }
  } catch (err) {
    // Database write failed (e.g. offline sandbox); we gracefully fall back to local file storage
    console.warn("DB save for test attempt fell back to local file storage:", err);
  }

  // Always save to local backup store as well
  const localList = readLocalAttempts();
  localList.unshift(fullAttempt);
  writeLocalAttempts(localList);

  return fullAttempt;
}

export async function getUserAttempts(clerkUserId: string): Promise<TestAttempt[]> {
  // Try DB
  try {
    const [dbUser] = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.clerkId, clerkUserId))
      .limit(1);

    if (dbUser) {
      const rows = await db
        .select()
        .from(testAttempts)
        .where(eq(testAttempts.userId, dbUser.id))
        .orderBy(desc(testAttempts.createdAt))
        .limit(50);

      if (rows && rows.length > 0) {
        return rows.map((row) => ({
          id: row.id,
          userId: clerkUserId,
          testId: row.testId,
          testTitle: row.testTitle,
          category: row.category,
          difficulty: row.difficulty,
          score: row.score,
          totalQuestions: row.totalQuestions,
          correctAnswers: row.correctAnswers,
          timeSpentSeconds: row.timeSpentSeconds,
          userAnswers: JSON.parse(row.userAnswers || "{}"),
          questionsSnapshot: JSON.parse(row.questionsSnapshot || "[]"),
          aiAnalysis: JSON.parse(row.aiAnalysis || "{}"),
          status: row.status as "completed",
          completedAt: row.completedAt.toISOString(),
          createdAt: row.createdAt.toISOString(),
        }));
      }
    }
  } catch (err) {
    console.warn("Failed to query DB attempts, falling back to local file store:", err);
  }

  // Fallback to local
  const localList = readLocalAttempts();
  return localList.filter((a) => a.userId === clerkUserId || !a.userId || a.userId === "guest");
}

export async function getAttemptById(attemptId: string, clerkUserId?: string): Promise<TestAttempt | null> {
  const localList = readLocalAttempts();
  const found = localList.find((a) => a.id === attemptId);
  if (found) return found;

  try {
    const [row] = await db
      .select()
      .from(testAttempts)
      .where(eq(testAttempts.id, attemptId))
      .limit(1);

    if (row) {
      return {
        id: row.id,
        userId: clerkUserId || "user",
        testId: row.testId,
        testTitle: row.testTitle,
        category: row.category,
        difficulty: row.difficulty,
        score: row.score,
        totalQuestions: row.totalQuestions,
        correctAnswers: row.correctAnswers,
        timeSpentSeconds: row.timeSpentSeconds,
        userAnswers: JSON.parse(row.userAnswers || "{}"),
        questionsSnapshot: JSON.parse(row.questionsSnapshot || "[]"),
        aiAnalysis: JSON.parse(row.aiAnalysis || "{}"),
        status: row.status as "completed",
        completedAt: row.completedAt.toISOString(),
        createdAt: row.createdAt.toISOString(),
      };
    }
  } catch {
    // Ignore error
  }

  return null;
}

export async function computeStudentProgress(clerkUserId: string): Promise<StudentOverallProgress> {
  const attempts = await getUserAttempts(clerkUserId);

  if (attempts.length === 0) {
    return {
      totalTestsTaken: 0,
      averageScore: 0,
      highestScore: 0,
      testsPassed: 0,
      averageReadinessScore: 0,
      overallReadinessTier: "Beginner",
      skillsMastery: [],
      recentAttempts: [],
    };
  }

  const totalTestsTaken = attempts.length;
  const totalScore = attempts.reduce((acc, a) => acc + a.score, 0);
  const averageScore = Math.round(totalScore / totalTestsTaken);
  const highestScore = Math.round(Math.max(...attempts.map((a) => a.score)));
  const testsPassed = attempts.filter((a) => a.score >= 70).length;

  const totalReadiness = attempts.reduce(
    (acc, a) => acc + (a.aiAnalysis?.careerReadinessScore || a.score),
    0
  );
  const averageReadinessScore = Math.round(totalReadiness / totalTestsTaken);

  let overallReadinessTier: StudentOverallProgress["overallReadinessTier"] = "Beginner";
  if (averageReadinessScore >= 80) overallReadinessTier = "Job Ready";
  else if (averageReadinessScore >= 70) overallReadinessTier = "Near Ready";
  else if (averageReadinessScore >= 50) overallReadinessTier = "Developing";

  // Aggregate skill mastery
  const skillMap: Record<string, { totalScore: number; count: number }> = {};
  for (const attempt of attempts) {
    if (attempt.aiAnalysis?.skillBreakdown) {
      for (const item of attempt.aiAnalysis.skillBreakdown) {
        if (!skillMap[item.skill]) {
          skillMap[item.skill] = { totalScore: 0, count: 0 };
        }
        skillMap[item.skill].totalScore += item.score;
        skillMap[item.skill].count += 1;
      }
    }
  }

  const skillsMastery = Object.entries(skillMap)
    .map(([skill, data]) => {
      const avg = Math.round(data.totalScore / data.count);
      let status: "Mastered" | "Proficient" | "Needs Practice" = "Needs Practice";
      if (avg >= 85) status = "Mastered";
      else if (avg >= 70) status = "Proficient";
      return {
        skill,
        averageScore: avg,
        testsCount: data.count,
        status,
      };
    })
    .sort((a, b) => b.averageScore - a.averageScore);

  return {
    totalTestsTaken,
    averageScore,
    highestScore,
    testsPassed,
    averageReadinessScore,
    overallReadinessTier,
    skillsMastery,
    recentAttempts: attempts.slice(0, 10),
  };
}
