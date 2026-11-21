"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Search,
  CheckCircle2,
  HelpCircle,
  Copy,
  Check,
  BrainCircuit,
  Lightbulb,
  ArrowRight,
  Eye,
  EyeOff,
  Flame,
} from "lucide-react";

type Question = {
  id: string;
  question: string;
  answer: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  tags: string[];
  tip?: string;
  followUp?: string;
};

type TopicDetail = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  emoji: string;
  color: string;
  questionCount: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  tags: string[];
  questions: Question[];
};

const difficultyColors = {
  Beginner: "text-green-400 bg-green-400/10 border-green-400/20",
  Intermediate: "text-amber-400 bg-amber-400/10 border-amber-400/20",
  Advanced: "text-red-400 bg-red-400/10 border-red-400/20",
};

export default function TopicDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);

  const [topic, setTopic] = useState<TopicDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [mode, setMode] = useState<"study" | "practice">("study");
  const [revealedIds, setRevealedIds] = useState<Record<string, boolean>>({});
  const [filterDiff, setFilterDiff] = useState<string>("All");

  useEffect(() => {
    fetch(`/api/interview/topics/${slug}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.success && data.topic) {
          setTopic(data.topic);
          // By default expand first 2 questions
          const initial: Record<string, boolean> = {};
          data.topic.questions.slice(0, 2).forEach((q: Question) => {
            initial[q.id] = true;
          });
          setExpandedIds(initial);
        }
      })
      .finally(() => setLoading(false));
  }, [slug]);

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleReveal = (id: string) => {
    setRevealedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const copyToClipboard = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const expandAll = () => {
    if (!topic) return;
    const all: Record<string, boolean> = {};
    topic.questions.forEach((q) => {
      all[q.id] = true;
    });
    setExpandedIds(all);
  };

  const collapseAll = () => {
    setExpandedIds({});
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#030308] text-white">
        <div className="flex items-center gap-3 text-zinc-400">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-red-500 border-t-transparent" />
          <span>Loading interview questions…</span>
        </div>
      </div>
    );
  }

  if (!topic) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#030308] px-4 text-center text-white">
        <h2 className="text-xl font-bold">Topic not found</h2>
        <p className="mt-2 text-sm text-zinc-400">
          The requested interview topic does not exist.
        </p>
        <Link
          href="/dashboard/interview"
          className="mt-6 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white"
        >
          Back to Interview Prep
        </Link>
      </div>
    );
  }

  const filteredQuestions = topic.questions.filter((q) => {
    const matchSearch =
      !search ||
      q.question.toLowerCase().includes(search.toLowerCase()) ||
      q.answer.toLowerCase().includes(search.toLowerCase()) ||
      q.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    const matchDiff = filterDiff === "All" || q.difficulty === filterDiff;
    return matchSearch && matchDiff;
  });

  return (
    <div className="min-h-screen bg-[#030308] text-white">
      {/* Background ambient */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 top-10 h-[500px] w-[500px] rounded-full bg-red-700/[0.07] blur-[150px]" />
        <div className="absolute right-[-80px] top-[20%] h-[600px] w-[600px] rounded-full bg-red-900/[0.08] blur-[180px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:py-12">
        {/* Navigation */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/dashboard/interview"
            className="group inline-flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3.5 py-2 text-xs font-medium text-zinc-400 backdrop-blur-md transition-all hover:border-red-500/40 hover:bg-red-500/10 hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
            Back to Topics
          </Link>

          <Link
            href={`/dashboard/interview/mock?topic=${topic.slug}`}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-red-500 to-rose-500 px-4 py-2 text-xs font-semibold text-white shadow-[0_0_20px_rgba(239,68,68,0.25)] transition-all hover:shadow-[0_0_30px_rgba(239,68,68,0.4)]"
          >
            <BrainCircuit className="h-3.5 w-3.5" />
            Mock Interview This Topic
          </Link>
        </div>

        {/* Topic Header Card */}
        <div className="mb-8 rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.04] to-transparent p-6 backdrop-blur-xl sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl border border-white/[0.1] bg-white/[0.05] text-3xl">
                {topic.emoji}
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-red-500/30 bg-red-500/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-red-300">
                    {topic.subtitle}
                  </span>
                  <span
                    className={`rounded-full border px-2.5 py-0.5 text-[10px] font-semibold ${difficultyColors[topic.difficulty]}`}
                  >
                    {topic.difficulty}
                  </span>
                </div>
                <h1 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  {topic.title}
                </h1>
                <p className="mt-2 text-sm text-zinc-400">
                  {topic.questionCount} real interview questions asked by top tech
                  companies with detailed reference answers and tips.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 self-start sm:max-w-[220px]">
              {topic.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-lg border border-white/[0.06] bg-white/[0.03] px-2 py-0.5 text-[10px] text-zinc-400"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Controls Bar */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Mode Switcher */}
          <div className="inline-flex rounded-xl border border-white/[0.08] bg-white/[0.03] p-1">
            <button
              onClick={() => setMode("study")}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                mode === "study"
                  ? "bg-red-500/20 text-red-300 shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <BookOpen className="h-3.5 w-3.5" />
              Study Mode
            </button>
            <button
              onClick={() => setMode("practice")}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                mode === "practice"
                  ? "bg-red-500/20 text-red-300 shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <EyeOff className="h-3.5 w-3.5" />
              Flashcard Mode
            </button>
          </div>

          {/* Search & Difficulty Filter */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-500" />
              <input
                type="text"
                placeholder="Search questions…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-8 w-44 rounded-lg border border-white/[0.08] bg-white/[0.03] pl-8 pr-3 text-xs text-white placeholder-zinc-500 outline-none focus:border-red-500/40 sm:w-52"
              />
            </div>

            {["All", "Beginner", "Intermediate", "Advanced"].map((d) => (
              <button
                key={d}
                onClick={() => setFilterDiff(d)}
                className={`rounded-lg border px-2.5 py-1 text-[11px] font-medium transition-all ${
                  filterDiff === d
                    ? "border-red-500/50 bg-red-500/15 text-red-300"
                    : "border-white/[0.07] bg-white/[0.03] text-zinc-500 hover:text-white"
                }`}
              >
                {d}
              </button>
            ))}

            {mode === "study" && (
              <div className="hidden sm:flex sm:items-center sm:gap-1.5">
                <button
                  onClick={expandAll}
                  className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-2 py-1 text-[11px] text-zinc-400 hover:text-white"
                >
                  Expand all
                </button>
                <button
                  onClick={collapseAll}
                  className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-2 py-1 text-[11px] text-zinc-400 hover:text-white"
                >
                  Collapse
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Questions List */}
        <div className="space-y-4">
          {filteredQuestions.map((q, idx) => {
            const isExpanded = mode === "study" ? !!expandedIds[q.id] : !!revealedIds[q.id];

            return (
              <div
                key={q.id}
                className="overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025] backdrop-blur-sm transition-all duration-200 hover:border-white/[0.12]"
              >
                {/* Question Header */}
                <div
                  onClick={() =>
                    mode === "study" ? toggleExpand(q.id) : toggleReveal(q.id)
                  }
                  className="flex cursor-pointer items-start justify-between gap-4 p-5"
                >
                  <div className="flex items-start gap-3">
                    <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.04] text-xs font-bold text-zinc-400">
                      {idx + 1}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`rounded-md border px-2 py-0.5 text-[10px] font-semibold ${difficultyColors[q.difficulty]}`}
                        >
                          {q.difficulty}
                        </span>
                        {q.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] text-zinc-500"
                          >
                            • {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="mt-2 text-sm font-semibold text-white sm:text-base">
                        {q.question}
                      </h3>
                    </div>
                  </div>

                  <div className="flex flex-shrink-0 items-center gap-2">
                    {mode === "practice" && (
                      <span className="flex items-center gap-1 rounded-lg border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-xs text-zinc-400">
                        {isExpanded ? (
                          <>
                            <EyeOff className="h-3 w-3" /> Hide
                          </>
                        ) : (
                          <>
                            <Eye className="h-3 w-3" /> Reveal Answer
                          </>
                        )}
                      </span>
                    )}

                    {mode === "study" && (
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.02] text-zinc-400">
                        {isExpanded ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Answer Accordion */}
                {isExpanded && (
                  <div className="border-t border-white/[0.06] bg-black/40 p-5">
                    {/* Model Answer */}
                    <div className="relative">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-red-400">
                          Model Answer
                        </span>
                        <button
                          onClick={() => copyToClipboard(q.id, q.answer)}
                          className="flex items-center gap-1 text-[11px] text-zinc-500 transition-colors hover:text-white"
                        >
                          {copiedId === q.id ? (
                            <>
                              <Check className="h-3 w-3 text-green-400" />
                              <span className="text-green-400">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="h-3 w-3" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>

                      <p className="text-sm leading-relaxed text-zinc-300">
                        {q.answer}
                      </p>
                    </div>

                    {/* Interview Tip */}
                    {q.tip && (
                      <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-amber-500/20 bg-amber-500/[0.06] p-3 text-xs text-amber-200">
                        <Lightbulb className="h-4 w-4 flex-shrink-0 text-amber-400" />
                        <div>
                          <span className="font-semibold text-amber-300">
                            Pro Interview Tip:{" "}
                          </span>
                          {q.tip}
                        </div>
                      </div>
                    )}

                    {/* Follow-up question */}
                    {q.followUp && (
                      <div className="mt-3 flex items-start gap-2.5 rounded-xl border border-blue-500/20 bg-blue-500/[0.06] p-3 text-xs text-blue-200">
                        <HelpCircle className="h-4 w-4 flex-shrink-0 text-blue-400" />
                        <div>
                          <span className="font-semibold text-blue-300">
                            Likely Follow-up:{" "}
                          </span>
                          {q.followUp}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}

          {filteredQuestions.length === 0 && (
            <div className="rounded-2xl border border-white/[0.06] py-16 text-center text-zinc-500">
              <Search className="mx-auto mb-2 h-6 w-6 opacity-30" />
              <p>No questions matched your filter.</p>
            </div>
          )}
        </div>

        {/* Bottom CTA to Mock Interview */}
        <div className="mt-12 text-center">
          <p className="text-sm text-zinc-400">
            Ready to test your knowledge on this topic?
          </p>
          <Link
            href={`/dashboard/interview/mock?topic=${topic.slug}`}
            className="mt-3 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-red-500 to-rose-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_30px_rgba(239,68,68,0.25)] transition-all hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(239,68,68,0.4)]"
          >
            <Sparkles className="h-4 w-4" />
            Start AI Mock Interview
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
