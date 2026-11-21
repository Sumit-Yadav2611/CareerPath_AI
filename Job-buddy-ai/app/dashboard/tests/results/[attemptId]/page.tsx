"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Sparkles,
  Trophy,
  BrainCircuit,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  Clock,
  RotateCcw,
  GraduationCap,
  ChevronDown,
  ChevronUp,
  Loader2,
  Briefcase,
} from "lucide-react";
import { TestAttempt } from "@/lib/tests/types";

export default function TestResultPage({
  params,
}: {
  params: Promise<{ attemptId: string }>;
}) {
  const { attemptId } = use(params);

  const [attempt, setAttempt] = useState<TestAttempt | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedQuestions, setExpandedQuestions] = useState<Record<number, boolean>>({});

  useEffect(() => {
    async function loadAttempt() {
      try {
        setLoading(true);
        const res = await fetch(`/api/tests/attempts/${attemptId}`);
        const data = await res.json();

        if (!res.ok || !data.success || !data.attempt) {
          throw new Error(data.error || "Failed to load test report");
        }

        setAttempt(data.attempt);
      } catch (err: any) {
        setError(err.message || "Failed to load attempt");
      } finally {
        setLoading(false);
      }
    }

    loadAttempt();
  }, [attemptId]);

  function toggleQuestionExpand(qId: number) {
    setExpandedQuestions((prev) => ({
      ...prev,
      [qId]: !prev[qId],
    }));
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#030102]">
        <div className="text-center">
          <Loader2 className="mx-auto h-10 w-10 animate-spin text-red-500" />
          <p className="mt-4 text-sm font-medium text-slate-300">
            Synthesizing CareerPath AI progress report...
          </p>
        </div>
      </div>
    );
  }

  if (error || !attempt) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#030102] p-4 text-center">
        <XCircle className="h-12 w-12 text-red-500" />
        <h2 className="mt-4 text-xl font-bold text-white">Report Not Found</h2>
        <p className="mt-2 text-sm text-slate-400">{error || "Could not retrieve test report."}</p>
        <Link
          href="/dashboard/tests"
          className="mt-6 rounded-xl bg-red-500 px-5 py-2.5 text-xs font-semibold text-white hover:bg-red-400"
        >
          Back to Tests Hub
        </Link>
      </div>
    );
  }

  const isPassed = attempt.score >= 70;
  const ai = attempt.aiAnalysis;
  const timeMinutes = Math.floor(attempt.timeSpentSeconds / 60);
  const timeSeconds = attempt.timeSpentSeconds % 60;
  const timeDisplay = `${timeMinutes}m ${timeSeconds}s`;

  return (
    <div className="min-h-screen bg-[#030102] text-white">
      {/* Background Glows */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute left-[-10%] top-[10%] h-[500px] w-[500px] rounded-full bg-red-600/[0.07] blur-[150px]" />
        <div className="absolute right-[-10%] top-[30%] h-[600px] w-[600px] rounded-full bg-rose-600/[0.06] blur-[160px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between border-b border-white/10 pb-5">
          <Link
            href="/dashboard/tests"
            className="flex items-center gap-2 text-xs font-semibold text-slate-400 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Tests & Assessments
          </Link>

          <div className="flex items-center gap-2">
            {attempt.testId && (
              <Link
                href={`/dashboard/tests/${attempt.testId}`}
                className="flex items-center gap-1.5 rounded-xl border border-red-500/30 bg-red-500/10 px-3.5 py-1.5 text-xs font-semibold text-red-300 transition hover:bg-red-500 hover:text-white"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Retake Test</span>
              </Link>
            )}

            <Link
              href="/dashboard/tests"
              className="flex items-center gap-1.5 rounded-xl bg-white px-3.5 py-1.5 text-xs font-semibold text-black transition hover:bg-slate-200"
            >
              <GraduationCap className="h-3.5 w-3.5" />
              <span>All Tests</span>
            </Link>
          </div>
        </div>

        {/* =======================================================
            PRIMARY SCORECARD BANNER
        ======================================================== */}
        <div className="mt-8 relative overflow-hidden rounded-3xl border border-red-500/25 bg-gradient-to-br from-[#0c0406]/95 via-[#060203]/90 to-[#020102]/95 p-6 shadow-2xl backdrop-blur-xl sm:p-10">
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-red-500/10 blur-[80px]" />

          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/[0.08] px-3.5 py-1.5 text-xs font-semibold text-red-300">
                <Sparkles className="h-3.5 w-3.5 text-red-400" />
                <span>CareerPath AI Progress Analysis</span>
              </div>

              <h1 className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                {attempt.testTitle}
              </h1>

              <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-400">
                <span>{attempt.category}</span>
                <span>•</span>
                <span>{attempt.difficulty}</span>
                <span>•</span>
                <span>Completed {new Date(attempt.completedAt).toLocaleDateString()}</span>
              </div>

              {/* AI Summary Text */}
              {ai?.summary && (
                <p className="mt-4 text-xs leading-6 text-slate-300 sm:text-sm">
                  {ai.summary}
                </p>
              )}
            </div>

            {/* Score Ring / Metric */}
            <div className="flex flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/[0.02] p-6 text-center backdrop-blur-md min-w-[200px]">
              <div
                className={`flex h-24 w-24 items-center justify-center rounded-full border-4 ${
                  isPassed
                    ? "border-emerald-500 bg-emerald-500/10 shadow-[0_0_30px_rgba(16,185,129,0.3)]"
                    : "border-amber-500 bg-amber-500/10 shadow-[0_0_30px_rgba(245,158,11,0.25)]"
                }`}
              >
                <span className="text-3xl font-extrabold text-white">
                  {attempt.score}%
                </span>
              </div>

              <span
                className={`mt-3 rounded-full px-3 py-1 text-xs font-bold ${
                  isPassed
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                    : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                }`}
              >
                {isPassed ? "✓ Passed" : "Needs Practice"}
              </span>

              <div className="mt-3 flex items-center gap-4 text-xs text-slate-400">
                <span>{attempt.correctAnswers}/{attempt.totalQuestions} Correct</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {timeDisplay}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* =======================================================
            AI READINESS & STRENGTHS / WEAKNESSES
        ======================================================== */}
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {/* AI Career Readiness Card */}
          <div className="rounded-3xl border border-white/10 bg-[#090305]/80 p-6 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                AI Career Readiness
              </span>
              <BrainCircuit className="h-4 w-4 text-cyan-400" />
            </div>

            <div className="mt-4">
              <span className="text-3xl font-extrabold text-cyan-300">
                {ai?.careerReadinessScore || attempt.score}
              </span>
              <span className="text-xs text-slate-500"> / 100</span>
            </div>

            <div className="mt-2">
              <span className="inline-block rounded-md border border-cyan-400/30 bg-cyan-400/10 px-2.5 py-1 text-xs font-bold text-cyan-200">
                Tier: {ai?.readinessLevel || (isPassed ? "Job Ready" : "Developing")}
              </span>
            </div>

            <p className="mt-4 text-xs leading-5 text-slate-400">
              Evaluated based on algorithmic accuracy, knowledge breadth, and question difficulty.
            </p>
          </div>

          {/* Strengths Card */}
          <div className="rounded-3xl border border-emerald-500/20 bg-emerald-950/20 p-6 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300">
                Key Strengths
              </span>
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            </div>

            <ul className="mt-4 space-y-2">
              {ai?.strengths && ai.strengths.length > 0 ? (
                ai.strengths.map((str, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-emerald-100">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                    <span>{str}</span>
                  </li>
                ))
              ) : (
                <li className="text-xs text-slate-400">Consistent effort demonstrated across sections.</li>
              )}
            </ul>
          </div>

          {/* Weaknesses / Gaps Card */}
          <div className="rounded-3xl border border-amber-500/20 bg-amber-950/20 p-6 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-300">
                Areas for Improvement
              </span>
              <AlertTriangle className="h-4 w-4 text-amber-400" />
            </div>

            <ul className="mt-4 space-y-2">
              {ai?.weaknesses && ai.weaknesses.length > 0 ? (
                ai.weaknesses.map((weak, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-amber-100">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                    <span>{weak}</span>
                  </li>
                ))
              ) : (
                <li className="text-xs text-slate-400">No critical weaknesses identified.</li>
              )}
            </ul>
          </div>
        </div>

        {/* =======================================================
            SKILL-BY-SKILL BREAKDOWN
        ======================================================== */}
        {ai?.skillBreakdown && ai.skillBreakdown.length > 0 && (
          <div className="mt-8 rounded-3xl border border-white/10 bg-[#090305]/80 p-6 backdrop-blur-xl sm:p-8">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-red-400" />
              <h3 className="text-base font-bold text-white">
                Detailed Skill Diagnostic Matrix
              </h3>
            </div>
            <p className="mt-1 text-xs text-slate-400">
              Breakdown of individual technical sub-skills evaluated during this test
            </p>

            <div className="mt-6 space-y-4">
              {ai.skillBreakdown.map((item) => (
                <div
                  key={item.skill}
                  className="rounded-2xl border border-white/5 bg-white/[0.02] p-4"
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <span className="text-sm font-semibold text-white">{item.skill}</span>
                      <p className="mt-1 text-xs text-slate-400">{item.feedback}</p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span
                        className={`rounded-md px-2.5 py-0.5 text-xs font-semibold ${
                          item.status === "Mastered"
                            ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
                            : item.status === "Proficient"
                            ? "bg-cyan-500/15 text-cyan-300 border border-cyan-500/30"
                            : item.status === "Needs Practice"
                            ? "bg-amber-500/15 text-amber-300 border border-amber-500/30"
                            : "bg-red-500/15 text-red-300 border border-red-500/30"
                        }`}
                      >
                        {item.status} ({item.score}%)
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/10">
                    <div
                      className={`h-full transition-all duration-500 ${
                        item.score >= 80
                          ? "bg-emerald-400"
                          : item.score >= 60
                          ? "bg-cyan-400"
                          : item.score >= 40
                          ? "bg-amber-400"
                          : "bg-red-400"
                      }`}
                      style={{ width: `${item.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =======================================================
            ACTIONABLE RECOMMENDATIONS & CAREER ADVICE
        ======================================================== */}
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {/* Actionable Next Steps */}
          <div className="rounded-3xl border border-white/10 bg-[#090305]/80 p-6 backdrop-blur-xl sm:p-8">
            <div className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-amber-400" />
              <h3 className="text-base font-bold text-white">
                AI Recommended Study Roadmap
              </h3>
            </div>
            <p className="mt-1 text-xs text-slate-400">
              Targeted actions to close gaps before your next interview
            </p>

            <ul className="mt-6 space-y-3">
              {ai?.actionableRecommendations?.map((rec, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3.5 text-xs leading-5 text-slate-300"
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-500/20 text-[10px] font-bold text-red-300">
                    {idx + 1}
                  </span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Career Interview Advice */}
          <div className="rounded-3xl border border-white/10 bg-[#090305]/80 p-6 backdrop-blur-xl sm:p-8">
            <div className="flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-rose-400" />
              <h3 className="text-base font-bold text-white">
                Career Interview Strategy
              </h3>
            </div>
            <p className="mt-1 text-xs text-slate-400">
              How to position your skills for hiring managers in this domain
            </p>

            <div className="mt-6 rounded-2xl border border-white/5 bg-white/[0.02] p-5">
              <p className="text-xs leading-6 text-slate-300">
                {ai?.careerAdvice ||
                  "Highlight your demonstrated competencies in your resume and discuss the design decisions tested here during hiring interviews."}
              </p>
            </div>
          </div>
        </div>

        {/* =======================================================
            QUESTION-BY-QUESTION IN-DEPTH REVIEW
        ======================================================== */}
        <div className="mt-8 rounded-3xl border border-white/10 bg-[#090305]/80 p-6 backdrop-blur-xl sm:p-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">
                Question-by-Question Review & Explanations
              </h3>
              <p className="mt-1 text-xs text-slate-400">
                See your selected answers versus correct answers with detailed reasoning
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {attempt.questionsSnapshot.map((q, idx) => {
              const userChoice = attempt.userAnswers[q.id];
              const isCorrect = userChoice === q.correctAnswer;
              const isExpanded = expandedQuestions[q.id] ?? false;

              return (
                <div
                  key={q.id}
                  className={`rounded-2xl border p-5 transition-all ${
                    isCorrect
                      ? "border-emerald-500/25 bg-emerald-950/10"
                      : "border-red-500/25 bg-red-950/10"
                  }`}
                >
                  <div
                    onClick={() => toggleQuestionExpand(q.id)}
                    className="flex cursor-pointer items-start justify-between gap-4"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${
                          isCorrect
                            ? "bg-emerald-500/20 text-emerald-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {isCorrect ? (
                          <CheckCircle2 className="h-4 w-4" />
                        ) : (
                          <XCircle className="h-4 w-4" />
                        )}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-400">
                            Q{idx + 1}
                          </span>
                          <span className="rounded bg-white/5 px-2 py-0.5 text-[10px] text-slate-400">
                            {q.skill}
                          </span>
                        </div>
                        <h4 className="mt-1 text-sm font-semibold text-white">
                          {q.question}
                        </h4>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="text-slate-400 hover:text-white"
                    >
                      {isExpanded ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </button>
                  </div>

                  {/* Options & Explanation (collapsible or always visible) */}
                  <div className={`mt-4 space-y-2 border-t border-white/5 pt-4 ${isExpanded ? "block" : "hidden sm:block"}`}>
                    <div className="space-y-1.5">
                      {q.options.map((opt, optIdx) => {
                        const isUserSelected = userChoice === optIdx;
                        const isTheCorrectAnswer = q.correctAnswer === optIdx;

                        return (
                          <div
                            key={optIdx}
                            className={`flex items-start gap-2.5 rounded-xl px-3.5 py-2 text-xs ${
                              isTheCorrectAnswer
                                ? "border border-emerald-500/40 bg-emerald-500/15 font-medium text-emerald-200"
                                : isUserSelected && !isCorrect
                                ? "border border-red-500/40 bg-red-500/15 font-medium text-red-200"
                                : "text-slate-400"
                            }`}
                          >
                            <span className="font-bold">
                              {String.fromCharCode(65 + optIdx)}.
                            </span>
                            <span className="flex-1">{opt}</span>
                            {isTheCorrectAnswer && (
                              <span className="text-[10px] font-bold text-emerald-400 uppercase">
                                ✓ Correct Answer
                              </span>
                            )}
                            {isUserSelected && !isCorrect && (
                              <span className="text-[10px] font-bold text-red-400 uppercase">
                                ✗ Your Answer
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* AI Explanation Box */}
                    <div className="mt-3 rounded-xl border border-white/5 bg-[#020102] p-3 text-xs leading-5 text-slate-300">
                      <span className="font-bold text-red-300">CareerPath AI Explanation: </span>
                      {q.explanation}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 py-6">
          {attempt.testId && (
            <Link
              href={`/dashboard/tests/${attempt.testId}`}
              className="rounded-xl border border-red-500/30 bg-red-500/10 px-6 py-2.5 text-xs font-semibold text-red-300 hover:bg-red-500 hover:text-white"
            >
              Retake This Assessment
            </Link>
          )}

          <Link
            href="/dashboard/tests"
            className="rounded-xl bg-gradient-to-r from-red-500 to-rose-500 px-6 py-2.5 text-xs font-semibold text-white shadow-lg shadow-red-500/25 hover:brightness-110"
          >
            Explore More Career Tests
          </Link>
        </div>
      </div>
    </div>
  );
}
