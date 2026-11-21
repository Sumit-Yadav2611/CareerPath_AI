"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  MessageSquareText,
  BookOpen,
  Sparkles,
  ChevronRight,
  Search,
  Trophy,
  Flame,
  Clock,
  CheckCircle2,
  ArrowRight,
  BrainCircuit,
  Star,
  Zap,
} from "lucide-react";

type TopicSummary = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  emoji: string;
  color: string;
  questionCount: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  tags: string[];
};

const difficultyColors = {
  Beginner: "text-green-400 bg-green-400/10 border-green-400/20",
  Intermediate: "text-amber-400 bg-amber-400/10 border-amber-400/20",
  Advanced: "text-red-400 bg-red-400/10 border-red-400/20",
};

export default function InterviewPrepPage() {
  const [topics, setTopics] = useState<TopicSummary[]>([]);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterDiff, setFilterDiff] = useState<string>("All");

  useEffect(() => {
    fetch("/api/interview/topics")
      .then((r) => r.json())
      .then((data) => {
        if (data.success) {
          setTopics(data.topics);
          setTotalQuestions(data.totalQuestions);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const filtered = topics.filter((t) => {
    const matchSearch =
      !search ||
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()));
    const matchDiff = filterDiff === "All" || t.difficulty === filterDiff;
    return matchSearch && matchDiff;
  });

  return (
    <div className="min-h-screen bg-[#030308] text-white">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-red-700/[0.07] blur-[150px]" />
        <div className="absolute right-[-100px] top-[30%] h-[600px] w-[600px] rounded-full bg-red-900/[0.08] blur-[180px]" />
        <div className="absolute bottom-[-100px] left-[40%] h-[400px] w-[400px] rounded-full bg-red-600/[0.05] blur-[130px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:py-14">

        {/* ── Top Back Button ── */}
        <div className="mb-6 flex justify-center">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-indigo-600/30 px-5 py-2 text-xs font-semibold text-white shadow-lg backdrop-blur-md transition-all hover:bg-indigo-600/50 hover:shadow-indigo-500/20"
          >
            <span>‹</span> Back
          </Link>
        </div>

        {/* ── Header ── */}
        <div className="mb-10">
          {/* Badge */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-3.5 py-1.5 backdrop-blur-md">
            <span className="text-xs">📄</span>
            <span className="text-xs font-medium text-zinc-300">
              360+ questions with answers
            </span>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Interview{" "}
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400 bg-clip-text text-transparent">
                  preparation
                </span>
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">
                Real questions that companies in India ask for AI roles. Browse by topic
                if you are studying a specific area, or by role if you have an interview
                coming up.
              </p>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.03] px-5 py-4 backdrop-blur-md">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{totalQuestions}+</div>
                <div className="text-[11px] text-zinc-500">Questions</div>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{topics.length}</div>
                <div className="text-[11px] text-zinc-500">Topics</div>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div className="text-center">
                <div className="text-2xl font-bold text-white">AI</div>
                <div className="text-[11px] text-zinc-500">Feedback</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Mock Interview CTA ── */}
        <div className="mb-10 overflow-hidden rounded-3xl border border-red-500/20 bg-gradient-to-br from-red-950/40 via-black/60 to-black/80 p-6 backdrop-blur-xl sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl border border-red-500/30 bg-red-500/[0.08]">
                <BrainCircuit className="h-6 w-6 text-red-400" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-semibold text-white">AI Mock Interview</h2>
                  <span className="rounded-full border border-red-500/30 bg-red-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-red-400">
                    New
                  </span>
                </div>
                <p className="mt-1 max-w-lg text-sm text-zinc-400">
                  Pick a topic, write your answers to real interview questions, and get
                  instant AI-powered feedback with scores, key points, and a better
                  model answer for each question.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Link
                href="/dashboard/interview/mock"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-500 to-rose-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_30px_rgba(239,68,68,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(239,68,68,0.4)]"
              >
                <Sparkles className="h-4 w-4" />
                Start Mock Interview
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* ── Filters ── */}
        <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              placeholder="Search topics or tags…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-10 rounded-xl border border-white/[0.08] bg-white/[0.03] pl-9 pr-4 text-sm text-white placeholder-zinc-600 outline-none transition-all focus:border-red-500/40 focus:bg-red-500/[0.03]"
            />
          </div>
          <div className="flex items-center gap-2">
            {["All", "Beginner", "Intermediate", "Advanced"].map((d) => (
              <button
                key={d}
                onClick={() => setFilterDiff(d)}
                className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
                  filterDiff === d
                    ? "border-red-500/50 bg-red-500/15 text-red-300"
                    : "border-white/[0.07] bg-white/[0.03] text-zinc-500 hover:text-white"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* ── Browse by Topic heading ── */}
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-white">
            Browse by{" "}
            <span className="bg-gradient-to-r from-red-400 to-rose-500 bg-clip-text text-transparent">
              topic
            </span>
          </h2>
          <p className="mt-1 text-sm text-zinc-500">
            Pick a topic to study every question related to it.
          </p>
        </div>

        {/* ── Topic Grid ── */}
        {loading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-36 animate-pulse rounded-2xl border border-white/[0.05] bg-white/[0.02]"
              />
            ))}
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((topic) => (
              <Link
                key={topic.id}
                href={`/dashboard/interview/topic/${topic.slug}`}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-red-500/25 hover:bg-red-950/[0.08] hover:shadow-[0_15px_50px_rgba(220,38,38,0.1)]"
              >
                {/* Top glow on hover */}
                <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500/20 via-pink-500/15 to-transparent border border-white/10 text-2xl shadow-inner">
                    {topic.emoji}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-semibold leading-snug text-white transition-colors group-hover:text-purple-200">
                      {topic.title}
                    </h3>
                    <p className="mt-1 text-xs font-medium text-purple-300/80">
                      {topic.subtitle}
                    </p>
                  </div>
                  <ChevronRight className="h-4 w-4 flex-shrink-0 text-zinc-600 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-purple-400" />
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {topic.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/[0.06] bg-white/[0.03] px-2 py-0.5 text-[10px] text-zinc-500"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-1 text-zinc-500">
                    <BookOpen className="h-3 w-3" />
                    <span className="text-xs">{topic.questionCount}q</span>
                  </div>
                </div>
              </Link>
            ))}

            {filtered.length === 0 && (
              <div className="col-span-3 py-16 text-center text-zinc-500">
                <Search className="mx-auto mb-3 h-8 w-8 opacity-30" />
                <p>No topics found for &quot;{search}&quot;</p>
              </div>
            )}
          </div>
        )}

        {/* ── Tips section ── */}
        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          {[
            {
              icon: BookOpen,
              title: "Study Mode",
              desc: "Read questions and reference answers. Understand key concepts before your interview.",
            },
            {
              icon: Zap,
              title: "Mock Interview",
              desc: "Write answers under time pressure and get AI feedback on each response instantly.",
            },
            {
              icon: Star,
              title: "Track Progress",
              desc: "See your scores improve over time as you practice more mock interviews.",
            },
          ].map((tip) => (
            <div
              key={tip.title}
              className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5"
            >
              <tip.icon className="mb-3 h-5 w-5 text-red-400" />
              <h3 className="text-sm font-semibold text-white">{tip.title}</h3>
              <p className="mt-1.5 text-xs leading-5 text-zinc-500">{tip.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
