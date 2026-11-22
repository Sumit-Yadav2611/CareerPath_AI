"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Clock,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Sparkles,
  Loader2,
  Flag,
} from "lucide-react";

type SafeQuestion = {
  id: number;
  question: string;
  codeSnippet?: string;
  options: string[];
  skill: string;
};

type TestData = {
  id: string;
  slug: string;
  title: string;
  category: string;
  difficulty: string;
  description: string;
  durationMinutes: number;
  totalQuestions: number;
  passingScore: number;
  skillsCovered: string[];
  questions: SafeQuestion[];
};

export default function TakeTestPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();

  const [test, setTest] = useState<TestData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [flagged, setFlagged] = useState<Record<number, boolean>>({});
  const [secondsRemaining, setSecondsRemaining] = useState<number>(15 * 60);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitStep, setSubmitStep] = useState("Evaluating answers...");

  useEffect(() => {
    async function fetchTest() {
      try {
        setLoading(true);
        const res = await fetch(`/api/tests/${id}`);
        const data = await res.json();

        if (!res.ok || !data.success || !data.test) {
          throw new Error(data.error || "Failed to load test questions");
        }

        setTest(data.test);
        setSecondsRemaining(data.test.durationMinutes * 60);
      } catch (err: any) {
        setError(err.message || "Failed to load test");
      } finally {
        setLoading(false);
      }
    }

    fetchTest();
  }, [id]);

  // Timer countdown
  useEffect(() => {
    if (!test || secondsRemaining <= 0 || submitting) return;

    const interval = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [test, secondsRemaining, submitting]);

  function handleSelectOption(questionId: number, optionIndex: number) {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  }

  function toggleFlag(questionId: number) {
    setFlagged((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  }

  async function handleSubmitTest() {
    if (!test) return;

    try {
      setSubmitting(true);
      setShowSubmitModal(false);

      setSubmitStep("Evaluating answer accuracy...");
      const timeSpent = test.durationMinutes * 60 - Math.max(0, secondsRemaining);

      setTimeout(() => {
        setSubmitStep("CareerPath AI is diagnosing skill gaps & strengths...");
      }, 900);

      const res = await fetch("/api/tests/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          testId: test.id,
          userAnswers: answers,
          timeSpentSeconds: timeSpent,
        }),
      });

      setSubmitStep("Generating personalized career progress report...");

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to submit test");
      }

      router.push(`/dashboard/tests/results/${data.attemptId}`);
    } catch (err: any) {
      alert(`Submission error: ${err.message}`);
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#030102]">
        <div className="text-center">
          <Loader2 className="mx-auto h-10 w-10 animate-spin text-red-500" />
          <p className="mt-4 text-sm font-medium text-slate-300">
            Loading your assessment room...
          </p>
        </div>
      </div>
    );
  }

  if (error || !test) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#030102] p-4 text-center">
        <AlertCircle className="h-12 w-12 text-red-500" />
        <h2 className="mt-4 text-xl font-bold text-white">Unable to open test</h2>
        <p className="mt-2 text-sm text-slate-400">{error || "Test could not be found."}</p>
        <Link
          href="/dashboard/tests"
          className="mt-6 rounded-xl bg-red-500 px-5 py-2.5 text-xs font-semibold text-white hover:bg-red-400"
        >
          Back to Tests Hub
        </Link>
      </div>
    );
  }

  const currentQ = test.questions[currentIndex];
  const totalQuestions = test.questions.length;
  const answeredCount = Object.keys(answers).length;
  const progressPercent = Math.round(((currentIndex + 1) / totalQuestions) * 100);

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const timeFormatted = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  const isTimeCritical = secondsRemaining < 120; // less than 2 mins

  return (
    <div className="min-h-screen bg-[#030102] text-white">
      {/* Submitting Loading Overlay with AI Animation */}
      {submitting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md">
          <div className="mx-4 max-w-md rounded-3xl border border-red-500/30 bg-[#090305] p-8 text-center shadow-2xl">
            <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-red-500/40 bg-red-500/10">
              <Sparkles className="h-8 w-8 animate-pulse text-red-400" />
              <div className="absolute inset-0 rounded-2xl bg-red-500/20 blur-xl animate-ping" />
            </div>

            <h3 className="mt-6 text-xl font-bold text-white">
              CareerPath AI Processing
            </h3>

            <p className="mt-2 text-xs text-red-300 font-medium">
              {submitStep}
            </p>

            <div className="mt-6 flex justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-red-500" />
            </div>

            <p className="mt-4 text-[11px] text-slate-500">
              Synthesizing question responses, calculating career readiness tier, and constructing your custom learning roadmap...
            </p>
          </div>
        </div>
      )}

      {/* Top Test Header */}
      <header className="sticky top-0 z-40 border-b border-red-500/15 bg-[#050203]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6">
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard/tests"
              className="rounded-lg border border-white/10 bg-white/[0.03] p-2 text-slate-400 transition hover:bg-white/10 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>

            <div>
              <h1 className="text-sm font-bold text-white sm:text-base">
                {test.title}
              </h1>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span>{test.category}</span>
                <span>•</span>
                <span>{test.difficulty}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Timer */}
            <div
              className={`flex items-center gap-2 rounded-xl border px-3.5 py-1.5 text-xs font-mono font-semibold transition-colors ${
                isTimeCritical
                  ? "border-red-500 bg-red-500/20 text-red-300 animate-pulse"
                  : "border-white/10 bg-white/[0.04] text-slate-200"
              }`}
            >
              <Clock className="h-4 w-4 text-red-400" />
              <span>{timeFormatted}</span>
            </div>

            {/* Submit Button */}
            <button
              onClick={() => setShowSubmitModal(true)}
              className="rounded-xl bg-gradient-to-r from-red-500 to-rose-500 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-red-500/25 transition hover:brightness-110"
            >
              Submit Test
            </button>
          </div>
        </div>

        {/* Progress line */}
        <div className="h-1 w-full bg-white/5">
          <div
            className="h-full bg-gradient-to-r from-red-500 via-rose-500 to-red-400 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </header>

      {/* Main Test Layout */}
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-[1fr_260px]">
          {/* Main Question Panel */}
          <div className="rounded-3xl border border-white/10 bg-[#090305]/80 p-6 backdrop-blur-xl sm:p-10">
            {/* Question Counter & Skill Badge */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Question {currentIndex + 1} of {totalQuestions}
              </span>

              <div className="flex items-center gap-2">
                <span className="rounded-md border border-red-500/25 bg-red-500/10 px-2.5 py-1 text-[11px] font-medium text-red-300">
                  {currentQ.skill}
                </span>

                <button
                  onClick={() => toggleFlag(currentQ.id)}
                  title="Flag for review"
                  className={`rounded-md p-1.5 transition ${
                    flagged[currentQ.id]
                      ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                      : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  <Flag className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Question Text */}
            <h2 className="mt-6 text-lg font-semibold leading-relaxed text-white sm:text-xl">
              {currentQ.question}
            </h2>

            {/* Optional code snippet */}
            {currentQ.codeSnippet && (
              <pre className="mt-4 overflow-x-auto rounded-xl border border-white/10 bg-[#020102] p-4 text-xs font-mono text-slate-300">
                <code>{currentQ.codeSnippet}</code>
              </pre>
            )}

            {/* Multiple Choice Options */}
            <div className="mt-8 space-y-3">
              {currentQ.options.map((option, index) => {
                const isSelected = answers[currentQ.id] === index;
                const optionLetter = String.fromCharCode(65 + index);

                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleSelectOption(currentQ.id, index)}
                    className={`flex w-full items-start gap-3.5 rounded-2xl border p-4 text-left transition-all ${
                      isSelected
                        ? "border-red-500/60 bg-red-500/15 text-white shadow-lg shadow-red-500/10"
                        : "border-white/10 bg-white/[0.02] text-slate-300 hover:border-white/20 hover:bg-white/[0.04]"
                    }`}
                  >
                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-xs font-bold transition ${
                        isSelected
                          ? "bg-red-500 text-white"
                          : "border border-white/10 bg-white/5 text-slate-400"
                      }`}
                    >
                      {optionLetter}
                    </span>
                    <span className="text-sm leading-6">{option}</span>
                  </button>
                );
              })}
            </div>

            {/* Bottom Question Controls */}
            <div className="mt-10 flex items-center justify-between border-t border-white/10 pt-6">
              <button
                type="button"
                disabled={currentIndex === 0}
                onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-semibold text-slate-300 transition hover:bg-white/10 disabled:opacity-30"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Previous
              </button>

              {currentIndex < totalQuestions - 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrentIndex((prev) => Math.min(totalQuestions - 1, prev + 1))}
                  className="flex items-center gap-2 rounded-xl bg-white px-5 py-2 text-xs font-semibold text-black transition hover:bg-slate-200"
                >
                  Next
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowSubmitModal(true)}
                  className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-red-500 to-rose-500 px-6 py-2 text-xs font-semibold text-white shadow-lg shadow-red-500/25 hover:brightness-110"
                >
                  Submit & Analyze
                  <Sparkles className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Right Question Tracker Grid */}
          <div className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-[#090305]/80 p-5 backdrop-blur-xl">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Question Tracker
              </h3>

              <div className="mt-4 grid grid-cols-4 gap-2">
                {test.questions.map((q, idx) => {
                  const isAnswered = typeof answers[q.id] === "number";
                  const isCurrent = idx === currentIndex;
                  const isFlagged = flagged[q.id];

                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentIndex(idx)}
                      className={`relative flex h-10 w-full items-center justify-center rounded-xl text-xs font-bold transition ${
                        isCurrent
                          ? "border-2 border-red-500 bg-red-500/20 text-white"
                          : isAnswered
                          ? "border border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                          : "border border-white/10 bg-white/[0.03] text-slate-400 hover:border-white/20"
                      }`}
                    >
                      <span>{idx + 1}</span>
                      {isFlagged && (
                        <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-amber-400" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Status Legend */}
              <div className="mt-6 space-y-2 border-t border-white/10 pt-4 text-[11px] text-slate-400">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                    Answered
                  </span>
                  <span className="font-semibold text-white">{answeredCount}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-slate-600" />
                    Unanswered
                  </span>
                  <span className="font-semibold text-white">
                    {totalQuestions - answeredCount}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                    Flagged
                  </span>
                  <span className="font-semibold text-white">
                    {Object.values(flagged).filter(Boolean).length}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Tips */}
            <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4 text-xs text-slate-500">
              <span className="font-semibold text-slate-400">Tips:</span> All questions carry equal weight. When submitted, CareerPath AI processes every choice to diagnose specific strengths and critical gaps.
            </div>
          </div>
        </div>
      </main>

      {/* Confirmation Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border border-red-500/30 bg-[#0a0305] p-6 shadow-2xl sm:p-8">
            <h3 className="text-xl font-bold text-white">Ready to submit?</h3>
            <p className="mt-2 text-xs leading-5 text-slate-400">
              You have answered <strong className="text-white">{answeredCount}</strong> out of{" "}
              <strong className="text-white">{totalQuestions}</strong> questions.
              {totalQuestions - answeredCount > 0 && (
                <span className="block mt-1 text-amber-300">
                  ⚠️ You still have {totalQuestions - answeredCount} unanswered question(s).
                </span>
              )}
            </p>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowSubmitModal(false)}
                className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-xs font-semibold text-slate-300 hover:bg-white/10"
              >
                Continue Test
              </button>

              <button
                type="button"
                onClick={handleSubmitTest}
                className="rounded-xl bg-gradient-to-r from-red-500 to-rose-500 px-5 py-2.5 text-xs font-semibold text-white shadow-lg shadow-red-500/25 hover:brightness-110"
              >
                Yes, Submit with AI Analysis
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
