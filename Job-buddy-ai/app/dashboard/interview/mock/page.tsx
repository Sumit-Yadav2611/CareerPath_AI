"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  BrainCircuit,
  Sparkles,
  Clock,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  RotateCcw,
  Trophy,
  Loader2,
  ThumbsUp,
  Target,
  Lightbulb,
  Check,
} from "lucide-react";

type TopicOption = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  emoji: string;
};

type Question = {
  id: string;
  question: string;
  difficulty: string;
  tags: string[];
  tip?: string;
  answer?: string;
};

type QuestionFeedback = {
  score: number;
  isCorrect: boolean;
  feedback: string;
  keyPoints: string[];
  missedConcepts: string[];
  betterAnswer: string;
};

type MockSessionResult = {
  id: string;
  topicTitle: string;
  overallScore: number;
  overallFeedback: string;
  strengths: string[];
  improvements: string[];
  questions: Question[];
  answers: Record<string, string>;
  feedback: Record<string, QuestionFeedback>;
};

export default function MockInterviewPage() {
  const searchParams = useSearchParams();
  const initialTopic = searchParams.get("topic") || "";

  const [topics, setTopics] = useState<TopicOption[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<string>(initialTopic);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [topicLoading, setTopicLoading] = useState(false);
  const [activeStep, setActiveStep] = useState<"select" | "interview" | "evaluating" | "results">(
    initialTopic ? "interview" : "select"
  );

  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [result, setResult] = useState<MockSessionResult | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Fetch topics list
  useEffect(() => {
    fetch("/api/interview/topics")
      .then((r) => r.json())
      .then((data) => {
        if (data.success) {
          setTopics(data.topics);
          if (!selectedTopic && data.topics.length > 0) {
            setSelectedTopic(data.topics[0].slug);
          }
        }
      });
  }, []);

  // When selected topic changes and we are in interview mode, load questions
  useEffect(() => {
    if (!selectedTopic) return;
    setTopicLoading(true);
    fetch(`/api/interview/topics/${selectedTopic}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.success && data.topic) {
          // Take first 5 questions for a focused mock interview
          setQuestions(data.topic.questions.slice(0, 5));
        }
      })
      .finally(() => setTopicLoading(false));
  }, [selectedTopic]);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerActive) {
      interval = setInterval(() => {
        setSecondsElapsed((s) => s + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive]);

  const startInterview = () => {
    setCurrentIdx(0);
    setAnswers({});
    setSecondsElapsed(0);
    setTimerActive(true);
    setActiveStep("interview");
  };

  const handleAnswerChange = (val: string) => {
    if (!questions[currentIdx]) return;
    setAnswers((prev) => ({ ...prev, [questions[currentIdx].id]: val }));
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const submitInterview = async () => {
    setTimerActive(false);
    setActiveStep("evaluating");
    setSubmitting(true);

    try {
      const res = await fetch("/api/interview/mock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topicSlug: selectedTopic,
          answers,
        }),
      });

      const data = await res.json();
      if (data.success && data.session) {
        setResult(data.session);
        setActiveStep("results");
      } else {
        alert("Evaluation failed. Please try again.");
        setActiveStep("interview");
      }
    } catch {
      alert("Error submitting interview. Please try again.");
      setActiveStep("interview");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030308] text-white">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 top-10 h-[500px] w-[500px] rounded-full bg-red-700/[0.07] blur-[150px]" />
        <div className="absolute right-[-80px] top-[20%] h-[600px] w-[600px] rounded-full bg-red-900/[0.08] blur-[180px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:py-12">
        {/* Navigation */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/dashboard/interview"
            className="group inline-flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3.5 py-2 text-xs font-medium text-zinc-400 backdrop-blur-md transition-all hover:border-red-500/40 hover:bg-red-500/10 hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
            Back to Topics
          </Link>

          {activeStep === "interview" && (
            <div className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3.5 py-1.5 text-xs text-zinc-300">
              <Clock className="h-3.5 w-3.5 text-red-400" />
              <span>{formatTime(secondsElapsed)}</span>
            </div>
          )}
        </div>

        {/* ── STEP 1: Select Topic ── */}
        {activeStep === "select" && (
          <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-6 backdrop-blur-xl sm:p-8">
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-red-500/25 bg-red-500/[0.06] px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-red-300">
                <BrainCircuit className="h-3.5 w-3.5" />
                Step 1: Choose Your Topic
              </div>
              <h1 className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Start an AI Mock Interview
              </h1>
              <p className="mt-2 text-sm text-zinc-400">
                You will be asked 5 real interview questions. Type your answers and our
                Gemini AI interviewer will analyze your performance with detailed
                feedback.
              </p>
            </div>

            <div className="space-y-3">
              {topics.map((t) => (
                <div
                  key={t.id}
                  onClick={() => setSelectedTopic(t.slug)}
                  className={`flex cursor-pointer items-center justify-between rounded-2xl border p-4 transition-all ${
                    selectedTopic === t.slug
                      ? "border-red-500/50 bg-red-950/20 shadow-[0_0_20px_rgba(239,68,68,0.15)]"
                      : "border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{t.emoji}</span>
                    <div>
                      <h4 className="text-sm font-semibold text-white">{t.title}</h4>
                      <p className="text-xs text-zinc-500">{t.subtitle}</p>
                    </div>
                  </div>
                  <div
                    className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                      selectedTopic === t.slug
                        ? "border-red-500 bg-red-500 text-white"
                        : "border-zinc-700"
                    }`}
                  >
                    {selectedTopic === t.slug && <Check className="h-3 w-3" />}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={startInterview}
              disabled={!selectedTopic || topicLoading}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-500 to-rose-500 py-3.5 text-sm font-semibold text-white shadow-[0_0_25px_rgba(239,68,68,0.3)] transition-all hover:shadow-[0_0_35px_rgba(239,68,68,0.45)] disabled:opacity-50"
            >
              {topicLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Loading questions…
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" /> Start Interview (5 Questions)
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        )}

        {/* ── STEP 2: Answering Questions ── */}
        {activeStep === "interview" && questions.length > 0 && (
          <div>
            {/* Progress Bar */}
            <div className="mb-6 flex items-center justify-between text-xs text-zinc-400">
              <span>
                Question {currentIdx + 1} of {questions.length}
              </span>
              <span>
                {Math.round(((currentIdx + 1) / questions.length) * 100)}% Complete
              </span>
            </div>
            <div className="mb-6 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.08]">
              <div
                className="h-full bg-gradient-to-r from-red-500 to-rose-500 transition-all duration-300"
                style={{
                  width: `${((currentIdx + 1) / questions.length) * 100}%`,
                }}
              />
            </div>

            {/* Question Card */}
            <div className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-6 backdrop-blur-xl sm:p-8">
              <div className="mb-4 flex items-center gap-2">
                <span className="rounded-md border border-red-500/30 bg-red-500/10 px-2 py-0.5 text-[11px] font-semibold text-red-300">
                  {questions[currentIdx]?.difficulty || "Intermediate"}
                </span>
                {questions[currentIdx]?.tags.map((t) => (
                  <span key={t} className="text-xs text-zinc-500">
                    #{t}
                  </span>
                ))}
              </div>

              <h2 className="text-lg font-bold text-white sm:text-xl">
                {questions[currentIdx]?.question}
              </h2>

              {questions[currentIdx]?.tip && (
                <div className="mt-4 flex items-start gap-2 rounded-xl border border-amber-500/20 bg-amber-500/[0.05] p-3 text-xs text-amber-200">
                  <Lightbulb className="h-4 w-4 flex-shrink-0 text-amber-400" />
                  <div>
                    <span className="font-semibold text-amber-300">Tip: </span>
                    {questions[currentIdx].tip}
                  </div>
                </div>
              )}

              {/* Text Area */}
              <div className="mt-6">
                <label className="mb-2 block text-xs font-medium text-zinc-400">
                  Your Answer:
                </label>
                <textarea
                  rows={7}
                  placeholder="Type your structured answer here. Include examples, key principles, or trade-offs where applicable…"
                  value={answers[questions[currentIdx]?.id] || ""}
                  onChange={(e) => handleAnswerChange(e.target.value)}
                  className="w-full rounded-2xl border border-white/[0.08] bg-black/40 p-4 text-sm leading-relaxed text-white placeholder-zinc-600 outline-none transition-all focus:border-red-500/50 focus:bg-black/60 focus:ring-1 focus:ring-red-500/30"
                />
                <div className="mt-2 flex justify-between text-[11px] text-zinc-500">
                  <span>
                    Word count:{" "}
                    {
                      (answers[questions[currentIdx]?.id] || "")
                        .split(/\s+/)
                        .filter(Boolean).length
                    }
                  </span>
                  <span>Aim for 40–100 words with specific details</span>
                </div>
              </div>

              {/* Navigation buttons */}
              <div className="mt-8 flex items-center justify-between gap-3 border-t border-white/[0.06] pt-6">
                <button
                  type="button"
                  onClick={() => setCurrentIdx((i) => Math.max(0, i - 1))}
                  disabled={currentIdx === 0}
                  className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-xs font-semibold text-zinc-300 transition-all hover:bg-white/[0.07] disabled:opacity-40"
                >
                  Previous
                </button>

                {currentIdx < questions.length - 1 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentIdx((i) => i + 1)}
                    className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-red-500 to-rose-500 px-5 py-2.5 text-xs font-semibold text-white shadow-[0_0_20px_rgba(239,68,68,0.25)] transition-all hover:shadow-[0_0_30px_rgba(239,68,68,0.4)]"
                  >
                    Next Question
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={submitInterview}
                    className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-2.5 text-xs font-bold text-white shadow-[0_0_25px_rgba(34,197,94,0.3)] transition-all hover:shadow-[0_0_35px_rgba(34,197,94,0.45)]"
                  >
                    <Sparkles className="h-3.5 w-3.5" />
                    Submit &amp; Get AI Feedback
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── STEP 3: Evaluating ── */}
        {activeStep === "evaluating" && (
          <div className="flex min-h-[400px] flex-col items-center justify-center rounded-3xl border border-white/[0.08] bg-white/[0.03] p-10 text-center">
            <div className="relative mb-6">
              <div className="h-16 w-16 animate-spin rounded-full border-4 border-red-500/20 border-t-red-500" />
              <BrainCircuit className="absolute left-1/2 top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 text-red-400" />
            </div>
            <h2 className="text-xl font-bold text-white">
              AI Interviewer is analyzing your answers…
            </h2>
            <p className="mt-2 max-w-md text-sm text-zinc-400">
              Evaluating technical accuracy, depth, key terminology, and formatting a
              personalized score report with model answers.
            </p>
          </div>
        )}

        {/* ── STEP 4: Results ── */}
        {activeStep === "results" && result && (
          <div className="space-y-6">
            {/* Scorecard Hero */}
            <div className="overflow-hidden rounded-3xl border border-red-500/30 bg-gradient-to-br from-red-950/40 via-black/80 to-[#030308] p-6 backdrop-blur-xl sm:p-8">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-300">
                    <Trophy className="h-3.5 w-3.5 text-red-400" />
                    Mock Interview Report
                  </div>
                  <h1 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
                    {result.topicTitle}
                  </h1>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-zinc-300">
                    {result.overallFeedback}
                  </p>
                </div>

                {/* Score badge */}
                <div className="flex flex-col items-center justify-center rounded-2xl border border-red-500/30 bg-black/60 px-8 py-5 text-center backdrop-blur-md">
                  <div className="text-4xl font-extrabold text-white">
                    {result.overallScore}
                    <span className="text-lg font-normal text-zinc-500">/100</span>
                  </div>
                  <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-red-400">
                    {result.overallScore >= 75
                      ? "Interview Ready 🎉"
                      : result.overallScore >= 50
                        ? "Good Foundation 👍"
                        : "Needs Practice 📚"}
                  </div>
                </div>
              </div>

              {/* Strengths & Improvements */}
              <div className="mt-8 grid gap-4 border-t border-white/[0.08] pt-6 sm:grid-cols-2">
                <div className="rounded-2xl border border-green-500/20 bg-green-500/[0.04] p-4">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-green-400">
                    <CheckCircle2 className="h-4 w-4" />
                    Key Strengths
                  </div>
                  <ul className="mt-3 space-y-1.5 text-xs text-zinc-300">
                    {result.strengths.map((s, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-green-400">•</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border border-amber-500/20 bg-amber-500/[0.04] p-4">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
                    <Target className="h-4 w-4" />
                    Areas to Improve
                  </div>
                  <ul className="mt-3 space-y-1.5 text-xs text-zinc-300">
                    {result.improvements.map((imp, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-amber-400">•</span>
                        <span>{imp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Question Breakdown */}
            <div>
              <h3 className="mb-4 text-base font-bold text-white">
                Question-by-Question Review
              </h3>

              <div className="space-y-4">
                {result.questions.map((q, idx) => {
                  const fb = result.feedback[q.id];
                  const userAnswer = result.answers[q.id];

                  return (
                    <div
                      key={q.id}
                      className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 backdrop-blur-sm"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.04] text-xs font-bold text-zinc-400">
                            {idx + 1}
                          </span>
                          <div>
                            <h4 className="text-sm font-semibold text-white">
                              {q.question}
                            </h4>
                          </div>
                        </div>

                        {fb && (
                          <span
                            className={`flex-shrink-0 rounded-lg border px-2.5 py-1 text-xs font-bold ${
                              fb.score >= 7
                                ? "border-green-500/30 bg-green-500/10 text-green-300"
                                : fb.score >= 4
                                  ? "border-amber-500/30 bg-amber-500/10 text-amber-300"
                                  : "border-red-500/30 bg-red-500/10 text-red-300"
                            }`}
                          >
                            {fb.score}/10
                          </span>
                        )}
                      </div>

                      {/* Your Answer */}
                      <div className="mt-4 rounded-xl border border-white/[0.06] bg-black/40 p-3.5">
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                          Your Answer:
                        </span>
                        <p className="mt-1 text-xs leading-relaxed text-zinc-300">
                          {userAnswer || "(No answer entered)"}
                        </p>
                      </div>

                      {/* AI Feedback */}
                      {fb && (
                        <div className="mt-3 rounded-xl border border-red-500/20 bg-red-500/[0.04] p-3.5">
                          <span className="text-[11px] font-semibold uppercase tracking-wider text-red-400">
                            AI Feedback:
                          </span>
                          <p className="mt-1 text-xs leading-relaxed text-zinc-300">
                            {fb.feedback}
                          </p>

                          {fb.betterAnswer && (
                            <div className="mt-3 border-t border-red-500/10 pt-2.5">
                              <span className="text-[11px] font-semibold text-red-300">
                                Recommended Answer:
                              </span>
                              <p className="mt-1 text-xs text-zinc-400">
                                {fb.betterAnswer}
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:items-center sm:justify-center">
              <button
                onClick={startInterview}
                className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-500 to-rose-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_25px_rgba(239,68,68,0.25)] transition-all hover:shadow-[0_0_35px_rgba(239,68,68,0.4)]"
              >
                <RotateCcw className="h-4 w-4" />
                Retake This Interview
              </button>

              <Link
                href="/dashboard/interview"
                className="flex items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-6 py-3 text-sm font-semibold text-zinc-300 transition-all hover:bg-white/[0.07] hover:text-white"
              >
                Explore Other Topics
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
