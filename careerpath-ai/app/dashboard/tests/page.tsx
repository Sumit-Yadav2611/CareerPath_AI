"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  GraduationCap,
  Sparkles,
  Search,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  TrendingUp,
  BrainCircuit,
  Trophy,
  BarChart3,
  Flame,
  PlusCircle,
  Loader2,
  RefreshCw,
} from "lucide-react";

type TestSummary = {
  id: string;
  slug: string;
  title: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  description: string;
  durationMinutes: number;
  totalQuestions: number;
  passingScore: number;
  skillsCovered: string[];
  userStats?: {
    attemptsCount: number;
    bestScore: number;
    lastTaken: string;
  } | null;
};

type AttemptSummary = {
  id: string;
  testTitle: string;
  category: string;
  difficulty: string;
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  completedAt: string;
  aiAnalysis?: {
    careerReadinessScore?: number;
    readinessLevel?: string;
    summary?: string;
  };
};

type ProgressSummary = {
  totalTestsTaken: number;
  averageScore: number;
  highestScore: number;
  testsPassed: number;
  averageReadinessScore: number;
  overallReadinessTier: string;
  skillsMastery: {
    skill: string;
    averageScore: number;
    testsCount: number;
    status: string;
  }[];
  recentAttempts: AttemptSummary[];
};

export default function CareerTestsPage() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<"available" | "generator" | "progress">("available");
  const [tests, setTests] = useState<TestSummary[]>([]);
  const [progress, setProgress] = useState<ProgressSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Custom AI Generator state
  const [genTopic, setGenTopic] = useState("");
  const [genDifficulty, setGenDifficulty] = useState<"Beginner" | "Intermediate" | "Advanced">("Intermediate");
  const [genCount, setGenCount] = useState(5);
  const [generating, setGenerating] = useState(false);
  const [genError, setGenError] = useState("");

  const categories = [
    "All",
    "Frontend",
    "Backend",
    "Full Stack",
    "Python & DSA",
    "Data Science & AI",
    "DevOps & Cloud",
  ];

  async function loadData() {
    try {
      setLoading(true);
      const [testsRes, progressRes] = await Promise.all([
        fetch("/api/tests", { cache: "no-store" }),
        fetch("/api/tests/attempts", { cache: "no-store" }),
      ]);

      if (testsRes.ok) {
        const testsData = await testsRes.json();
        if (testsData.success && Array.isArray(testsData.tests)) {
          setTests(testsData.tests);
        }
      }

      if (progressRes.ok) {
        const progressData = await progressRes.json();
        if (progressData.success && progressData.progress) {
          setProgress(progressData.progress);
        }
      }
    } catch (err) {
      console.error("Failed to load test hub data:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handleGenerateCustomTest(e: React.FormEvent) {
    e.preventDefault();
    if (!genTopic.trim()) {
      setGenError("Please enter a skill or topic.");
      return;
    }

    try {
      setGenerating(true);
      setGenError("");

      const res = await fetch("/api/tests/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: genTopic.trim(),
          difficulty: genDifficulty,
          questionCount: genCount,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to generate test");
      }

      // Navigate to the newly generated test
      router.push(`/dashboard/tests/${data.test.id}`);
    } catch (err: any) {
      setGenError(err.message || "Failed to generate test. Please try again.");
    } finally {
      setGenerating(false);
    }
  }

  const filteredTests = tests.filter((test) => {
    const matchesCategory =
      selectedCategory === "All" || test.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === "" ||
      test.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.skillsCovered.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#030102] text-white">
      {/* Background ambient lighting */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute left-[-10%] top-[10%] h-[500px] w-[500px] rounded-full bg-red-600/[0.06] blur-[140px]" />
        <div className="absolute right-[-10%] top-[25%] h-[600px] w-[600px] rounded-full bg-rose-600/[0.05] blur-[150px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* =======================================================
            HEADER BANNER
        ======================================================== */}
        <div className="relative overflow-hidden rounded-3xl border border-red-500/20 bg-gradient-to-br from-[#0c0406]/90 via-[#060203]/90 to-[#020102]/95 p-6 shadow-2xl backdrop-blur-xl sm:p-10">
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-red-500/10 blur-[80px]" />

          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/[0.08] px-3.5 py-1.5 text-xs font-semibold text-red-300">
                <Sparkles className="h-3.5 w-3.5 text-red-400" />
                <span>CareerPath Skill Testing & AI Analysis</span>
              </div>

              <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Evaluate Your Knowledge,
                <br />
                <span className="bg-gradient-to-r from-red-400 via-rose-300 to-white bg-clip-text text-transparent">
                  Track Your AI Career Readiness
                </span>
              </h1>

              <p className="mt-3 text-sm leading-6 text-slate-400 sm:text-base">
                Take verified domain tests or create on-demand custom AI assessments.
                CareerPath AI evaluates your answers, identifies knowledge gaps, and maps out your career growth.
              </p>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-center backdrop-blur-md">
                <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400">
                  <Trophy className="h-3.5 w-3.5 text-amber-400" />
                  <span>Tests Taken</span>
                </div>
                <p className="mt-2 text-2xl font-bold text-white">
                  {progress?.totalTestsTaken || 0}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-center backdrop-blur-md">
                <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400">
                  <TrendingUp className="h-3.5 w-3.5 text-red-400" />
                  <span>Avg Score</span>
                </div>
                <p className="mt-2 text-2xl font-bold text-red-400">
                  {progress ? `${progress.averageScore}%` : "—"}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-center backdrop-blur-md">
                <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400">
                  <BrainCircuit className="h-3.5 w-3.5 text-cyan-400" />
                  <span>AI Readiness</span>
                </div>
                <p className="mt-2 text-lg font-bold text-cyan-300">
                  {progress?.overallReadinessTier || "Beginner"}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-center backdrop-blur-md">
                <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Passed</span>
                </div>
                <p className="mt-2 text-2xl font-bold text-emerald-400">
                  {progress?.testsPassed || 0}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="mt-8 flex flex-wrap gap-2 border-t border-white/10 pt-6">
            <button
              onClick={() => setActiveTab("available")}
              className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${
                activeTab === "available"
                  ? "bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-lg shadow-red-500/25"
                  : "border border-white/10 bg-white/[0.03] text-slate-300 hover:border-red-500/30 hover:text-white"
              }`}
            >
              <GraduationCap className="h-4 w-4" />
              Available Career Tests ({tests.length})
            </button>

            <button
              onClick={() => setActiveTab("generator")}
              className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${
                activeTab === "generator"
                  ? "bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-lg shadow-red-500/25"
                  : "border border-white/10 bg-white/[0.03] text-slate-300 hover:border-red-500/30 hover:text-white"
              }`}
            >
              <Sparkles className="h-4 w-4 text-red-400" />
              AI Custom Test Generator
            </button>

            <button
              onClick={() => setActiveTab("progress")}
              className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${
                activeTab === "progress"
                  ? "bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-lg shadow-red-500/25"
                  : "border border-white/10 bg-white/[0.03] text-slate-300 hover:border-red-500/30 hover:text-white"
              }`}
            >
              <BarChart3 className="h-4 w-4" />
              Progress & AI Analytics ({progress?.recentAttempts.length || 0})
            </button>
          </div>
        </div>

        {/* =======================================================
            TAB 1: AVAILABLE TESTS
        ======================================================== */}
        {activeTab === "available" && (
          <div className="mt-8 space-y-6">
            {/* Filter & Search Bar */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              {/* Category Pills */}
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`rounded-xl px-3.5 py-1.5 text-xs font-medium transition-all ${
                      selectedCategory === cat
                        ? "border border-red-500/40 bg-red-500/20 text-red-200 shadow-sm"
                        : "border border-white/5 bg-white/[0.02] text-slate-400 hover:border-white/20 hover:text-slate-200"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Search input */}
              <div className="relative min-w-[260px]">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search skills, tests, topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-2 pl-10 pr-4 text-xs text-white placeholder-slate-500 backdrop-blur-md transition focus:border-red-500/50 focus:outline-none focus:ring-1 focus:ring-red-500/50"
                />
              </div>
            </div>

            {/* Test Cards Grid */}
            {loading ? (
              <div className="flex min-h-[300px] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-red-400" />
              </div>
            ) : filteredTests.length === 0 ? (
              <div className="flex min-h-[260px] flex-col items-center justify-center rounded-2xl border border-white/5 bg-white/[0.02] p-8 text-center">
                <GraduationCap className="h-10 w-10 text-slate-600" />
                <h3 className="mt-3 text-base font-semibold text-white">No tests match your criteria</h3>
                <p className="mt-1 text-xs text-slate-400">
                  Try clearing the search query or generate an AI test on this topic!
                </p>
                <button
                  onClick={() => setActiveTab("generator")}
                  className="mt-4 rounded-xl bg-red-500 px-4 py-2 text-xs font-semibold text-white hover:bg-red-400"
                >
                  Create Custom Test
                </button>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredTests.map((test) => {
                  const hasTaken = Boolean(test.userStats && test.userStats.attemptsCount > 0);
                  const bestScore = test.userStats?.bestScore || 0;
                  const isPassed = bestScore >= test.passingScore;

                  return (
                    <div
                      key={test.id}
                      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[#090305]/80 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-red-500/35 hover:shadow-[0_10px_35px_rgba(239,68,68,0.12)]"
                    >
                      {/* Top Badges */}
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <span className="rounded-lg border border-red-500/25 bg-red-500/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-red-300">
                            {test.category}
                          </span>

                          <span
                            className={`rounded-lg px-2.5 py-0.5 text-[11px] font-medium ${
                              test.difficulty === "Advanced"
                                ? "bg-purple-500/15 text-purple-300 border border-purple-500/30"
                                : test.difficulty === "Intermediate"
                                ? "bg-amber-500/15 text-amber-300 border border-amber-500/30"
                                : "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
                            }`}
                          >
                            {test.difficulty}
                          </span>
                        </div>

                        {/* Title & Description */}
                        <h3 className="mt-4 text-xl font-bold text-white transition-colors group-hover:text-red-200">
                          {test.title}
                        </h3>

                        <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-400">
                          {test.description}
                        </p>

                        {/* Skills Covered Pills */}
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {test.skillsCovered.slice(0, 4).map((skill) => (
                            <span
                              key={skill}
                              className="rounded-md border border-white/5 bg-white/[0.03] px-2 py-0.5 text-[10px] text-slate-400"
                            >
                              {skill}
                            </span>
                          ))}
                          {test.skillsCovered.length > 4 && (
                            <span className="rounded-md border border-white/5 bg-white/[0.03] px-1.5 py-0.5 text-[10px] text-slate-500">
                              +{test.skillsCovered.length - 4}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Bottom Info & Action */}
                      <div className="mt-6 border-t border-white/5 pt-4">
                        <div className="flex items-center justify-between text-xs text-slate-500">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5 text-slate-400" />
                            {test.durationMinutes} mins
                          </span>
                          <span>{test.totalQuestions} Questions</span>
                          <span>Pass: {test.passingScore}%</span>
                        </div>

                        {/* Past Attempt Status */}
                        {hasTaken && (
                          <div className="mt-3 flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.02] px-3 py-1.5 text-xs">
                            <span className="text-slate-400">Best Score</span>
                            <span
                              className={`font-semibold ${
                                isPassed ? "text-emerald-400" : "text-amber-400"
                              }`}
                            >
                              {bestScore}% {isPassed ? "✓ Passed" : "Needs Practice"}
                            </span>
                          </div>
                        )}

                        <div className="mt-4">
                          <Link
                            href={`/dashboard/tests/${test.id}`}
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-500 to-rose-500 py-2.5 text-xs font-semibold text-white shadow-md shadow-red-500/20 transition-all hover:brightness-110"
                          >
                            <span>{hasTaken ? "Retake Test" : "Start Test"}</span>
                            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* =======================================================
            TAB 2: AI CUSTOM TEST GENERATOR
        ======================================================== */}
        {activeTab === "generator" && (
          <div className="mt-8 mx-auto max-w-3xl">
            <div className="rounded-3xl border border-red-500/25 bg-[#090305]/90 p-8 shadow-2xl backdrop-blur-xl sm:p-10">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-red-500/30 bg-red-500/10">
                  <Sparkles className="h-6 w-6 text-red-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    Create Custom AI Test
                  </h2>
                  <p className="text-xs text-slate-400">
                    Type any programming language, framework, or concept. CareerPath AI will instantly generate a tailored assessment!
                  </p>
                </div>
              </div>

              <form onSubmit={handleGenerateCustomTest} className="mt-8 space-y-6">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                    Target Skill / Topic
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Next.js 15 Server Actions, TypeScript Generics, Redis Caching, Kubernetes..."
                    value={genTopic}
                    onChange={(e) => setGenTopic(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-slate-500 transition focus:border-red-500/50 focus:outline-none focus:ring-1 focus:ring-red-500/50"
                  />
                  <p className="mt-1.5 text-[11px] text-slate-500">
                    Examples: GraphQL APIs, Golang Goroutines, System Design & Microservices, SQL Performance Optimization.
                  </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                      Difficulty Level
                    </label>
                    <select
                      value={genDifficulty}
                      onChange={(e) => setGenDifficulty(e.target.value as any)}
                      className="mt-2 w-full rounded-xl border border-white/10 bg-[#12070a] px-4 py-3 text-sm text-white transition focus:border-red-500/50 focus:outline-none"
                    >
                      <option value="Beginner">Beginner (Foundations & Core Concepts)</option>
                      <option value="Intermediate">Intermediate (Real-World Patterns & Workflows)</option>
                      <option value="Advanced">Advanced (High Scale, Performance & Edge Cases)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                      Number of Questions
                    </label>
                    <select
                      value={genCount}
                      onChange={(e) => setGenCount(Number(e.target.value))}
                      className="mt-2 w-full rounded-xl border border-white/10 bg-[#12070a] px-4 py-3 text-sm text-white transition focus:border-red-500/50 focus:outline-none"
                    >
                      <option value={5}>5 Questions (Fast 10-Min Check)</option>
                      <option value={8}>8 Questions (Standard Evaluation)</option>
                      <option value={10}>10 Questions (Comprehensive Exam)</option>
                    </select>
                  </div>
                </div>

                {genError && (
                  <div className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-300">
                    <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
                    <span>{genError}</span>
                  </div>
                )}

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={generating || !genTopic.trim()}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-500 via-rose-500 to-red-600 py-3.5 text-sm font-semibold text-white shadow-xl shadow-red-500/25 transition-all hover:brightness-110 disabled:opacity-50"
                  >
                    {generating ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Generating questions with CareerPath AI...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4" />
                        <span>Generate & Start AI Test</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* =======================================================
            TAB 3: PROGRESS & AI ANALYTICS
        ======================================================== */}
        {activeTab === "progress" && (
          <div className="mt-8 space-y-8">
            {/* Top Stats Overview */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-white/10 bg-[#0a0406]/80 p-5 backdrop-blur-xl">
                <span className="text-xs text-slate-400">Total Attempts</span>
                <p className="mt-1 text-3xl font-bold text-white">
                  {progress?.totalTestsTaken || 0}
                </p>
                <span className="mt-2 text-[11px] text-slate-500">
                  Across all categories
                </span>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#0a0406]/80 p-5 backdrop-blur-xl">
                <span className="text-xs text-slate-400">Average Performance</span>
                <p className="mt-1 text-3xl font-bold text-red-400">
                  {progress?.averageScore || 0}%
                </p>
                <span className="mt-2 text-[11px] text-slate-500">
                  Highest Score: {progress?.highestScore || 0}%
                </span>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#0a0406]/80 p-5 backdrop-blur-xl">
                <span className="text-xs text-slate-400">Career Readiness Tier</span>
                <p className="mt-1 text-2xl font-bold text-cyan-300">
                  {progress?.overallReadinessTier || "Beginner"}
                </p>
                <span className="mt-2 text-[11px] text-slate-500">
                  Readiness Score: {progress?.averageReadinessScore || 0} / 100
                </span>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#0a0406]/80 p-5 backdrop-blur-xl">
                <span className="text-xs text-slate-400">Passing Rate</span>
                <p className="mt-1 text-3xl font-bold text-emerald-400">
                  {progress && progress.totalTestsTaken > 0
                    ? `${Math.round((progress.testsPassed / progress.totalTestsTaken) * 100)}%`
                    : "0%"}
                </p>
                <span className="mt-2 text-[11px] text-slate-500">
                  {progress?.testsPassed || 0} of {progress?.totalTestsTaken || 0} passed
                </span>
              </div>
            </div>

            {/* Skills Mastery Matrix */}
            {progress?.skillsMastery && progress.skillsMastery.length > 0 && (
              <div className="rounded-3xl border border-white/10 bg-[#090305]/80 p-6 backdrop-blur-xl sm:p-8">
                <h3 className="text-lg font-bold text-white">
                  AI Skill Mastery Breakdown
                </h3>
                <p className="mt-1 text-xs text-slate-400">
                  Evaluated from your test performances and answered questions
                </p>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  {progress.skillsMastery.map((item) => (
                    <div
                      key={item.skill}
                      className="rounded-xl border border-white/5 bg-white/[0.02] p-4"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-white">
                          {item.skill}
                        </span>
                        <span
                          className={`rounded-md px-2 py-0.5 text-[10px] font-semibold ${
                            item.status === "Mastered"
                              ? "bg-emerald-500/15 text-emerald-300"
                              : item.status === "Proficient"
                              ? "bg-cyan-500/15 text-cyan-300"
                              : "bg-amber-500/15 text-amber-300"
                          }`}
                        >
                          {item.status} ({item.averageScore}%)
                        </span>
                      </div>

                      {/* Progress bar */}
                      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/10">
                        <div
                          className={`h-full transition-all duration-500 ${
                            item.averageScore >= 80
                              ? "bg-gradient-to-r from-emerald-500 to-teal-400"
                              : item.averageScore >= 60
                              ? "bg-gradient-to-r from-cyan-500 to-blue-400"
                              : "bg-gradient-to-r from-amber-500 to-red-400"
                          }`}
                          style={{ width: `${item.averageScore}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recent Attempts History */}
            <div className="rounded-3xl border border-white/10 bg-[#090305]/80 p-6 backdrop-blur-xl sm:p-8">
              <h3 className="text-lg font-bold text-white">
                Test History & AI Reports
              </h3>
              <p className="mt-1 text-xs text-slate-400">
                Click on any test attempt to view the in-depth AI analysis, explanations, and learning roadmap
              </p>

              {(!progress || progress.recentAttempts.length === 0) ? (
                <div className="mt-6 rounded-2xl border border-white/5 bg-white/[0.02] p-8 text-center">
                  <GraduationCap className="mx-auto h-8 w-8 text-slate-600" />
                  <p className="mt-2 text-sm text-slate-400">
                    You haven&apos;t completed any tests yet.
                  </p>
                  <button
                    onClick={() => setActiveTab("available")}
                    className="mt-4 rounded-xl bg-red-500 px-4 py-2 text-xs font-semibold text-white hover:bg-red-400"
                  >
                    Take Your First Test
                  </button>
                </div>
              ) : (
                <div className="mt-6 space-y-3">
                  {progress.recentAttempts.map((attempt) => {
                    const isPassed = attempt.score >= 70;
                    const dateFormatted = new Date(attempt.completedAt).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });

                    return (
                      <div
                        key={attempt.id}
                        className="group flex flex-col gap-3 rounded-2xl border border-white/5 bg-white/[0.02] p-4 transition-all hover:border-red-500/30 hover:bg-white/[0.04] sm:flex-row sm:items-center sm:justify-between"
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                              isPassed
                                ? "border border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                                : "border border-amber-500/30 bg-amber-500/10 text-amber-400"
                            }`}
                          >
                            {isPassed ? (
                              <CheckCircle2 className="h-5 w-5" />
                            ) : (
                              <AlertCircle className="h-5 w-5" />
                            )}
                          </div>

                          <div>
                            <h4 className="text-sm font-semibold text-white group-hover:text-red-200">
                              {attempt.testTitle}
                            </h4>
                            <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                              <span>{attempt.category}</span>
                              <span>•</span>
                              <span>{attempt.difficulty}</span>
                              <span>•</span>
                              <span>{dateFormatted}</span>
                              <span>•</span>
                              <span>
                                {attempt.correctAnswers} of {attempt.totalQuestions} correct
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <span
                              className={`text-lg font-bold ${
                                isPassed ? "text-emerald-400" : "text-amber-400"
                              }`}
                            >
                              {attempt.score}%
                            </span>
                            <p className="text-[10px] text-slate-500">
                              {isPassed ? "Passed" : "Needs Review"}
                            </p>
                          </div>

                          <Link
                            href={`/dashboard/tests/results/${attempt.id}`}
                            className="flex items-center gap-1.5 rounded-xl border border-red-500/30 bg-red-500/10 px-3.5 py-2 text-xs font-semibold text-red-300 transition-all hover:bg-red-500 hover:text-white"
                          >
                            <span>AI Report</span>
                            <ArrowRight className="h-3 w-3" />
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
