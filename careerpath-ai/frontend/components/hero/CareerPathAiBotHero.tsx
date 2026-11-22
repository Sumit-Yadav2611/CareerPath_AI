"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FileText,
  GraduationCap,
  BriefcaseBusiness,
  MessageSquareText,
  TrendingUp,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Send,
  Zap,
} from "lucide-react";

export default function CareerPathAiBotHero() {
  const [activeBubble, setActiveBubble] = useState<number | null>(null);

  return (
    <div className="relative mx-auto w-full max-w-7xl px-4 pt-1 pb-6 sm:px-6 sm:pt-2 sm:pb-8 lg:px-8">
      {/* =========================================================
          HERO HEADLINE & CTAs (Clean, High-Impact, Compact Height)
      ========================================================== */}
      <div className="relative z-20 mx-auto max-w-3xl text-center">
        {/* Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/[0.08] px-3.5 py-1 backdrop-blur-xl shadow-[0_0_25px_rgba(239,68,68,0.15)]">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,1)]" />
          </span>
          <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.22em] text-red-300">
            India&apos;s AI Career Operating System
          </span>
        </div>

        {/* Title */}
        <h1 className="mt-2.5 text-3xl font-extrabold tracking-tight text-white sm:mt-3 sm:text-4xl lg:text-5xl">
          Meet Your Personal{" "}
          <span className="bg-gradient-to-r from-white via-red-200 to-red-500 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(239,68,68,0.35)]">
            AI Career Coach
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mt-2 max-w-xl text-xs leading-relaxed text-zinc-400 sm:text-sm">
          From analyzing your resume and testing your skills to AI mock interviews
          and automated job applications — all directed by your intelligent career assistant.
        </p>

        {/* Action Buttons */}
        <div className="mt-3.5 flex flex-wrap items-center justify-center gap-2.5 sm:mt-4 sm:gap-3">
          <Link
            href="/dashboard"
            className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-red-500 via-red-500 to-rose-500 px-5 py-2.5 text-xs font-bold text-white shadow-[0_0_35px_rgba(239,68,68,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_50px_rgba(239,68,68,0.55)] sm:px-6 sm:py-3 sm:text-sm"
          >
            <Sparkles className="h-4 w-4" />
            Find My Career Path
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>

          <Link
            href="/dashboard/tests"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-xs font-semibold text-zinc-200 backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-red-500/40 hover:bg-red-500/[0.08] hover:text-white sm:px-5 sm:py-3 sm:text-sm"
          >
            <GraduationCap className="h-4 w-4 text-red-400" />
            Take Skill Test
          </Link>

          <Link
            href="/dashboard/interview"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-xs font-semibold text-zinc-200 backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-red-500/40 hover:bg-red-500/[0.08] hover:text-white sm:px-5 sm:py-3 sm:text-sm"
          >
            <MessageSquareText className="h-4 w-4 text-red-400" />
            Interview Prep
          </Link>
        </div>
      </div>

      {/* =========================================================
          CENTRAL FLOATING AI ROBOT WITH ORBITING MESSAGE BOXES
          (Elevated position so entire robot & particles are visible)
      ========================================================== */}
      <div className="relative mt-2 flex min-h-[440px] w-full items-center justify-center sm:mt-4 sm:min-h-[460px] lg:min-h-[490px]">
        {/* Background Radial Glow */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/[0.14] blur-[130px]" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[240px] w-[240px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose-500/[0.20] blur-[70px]" />

        {/* Wireframe Grid Aura Ring */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-red-500/15 border-dashed" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-red-500/20" />

        {/* =======================================================
            MESSAGE BOX 1: Top Left (Resume Intelligence)
        ======================================================== */}
        <div
          className="absolute left-[2%] top-[1%] z-20 w-[220px] sm:w-[250px] lg:left-[6%] lg:top-[2%]"
          style={{ animation: "float-box 6s ease-in-out infinite 0s" }}
        >
          <div className="group relative rounded-2xl border border-red-500/25 bg-[#0a050d]/90 p-3 shadow-[0_10px_35px_rgba(239,68,68,0.18)] backdrop-blur-xl transition-all duration-300 hover:border-red-400/50 hover:bg-red-950/30">
            {/* Top Shine */}
            <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-red-400/50 to-transparent" />
            <div className="flex items-start gap-2.5">
              <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg border border-red-500/30 bg-red-500/10 text-red-400">
                <FileText className="h-3.5 w-3.5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-red-400">
                    Resume Intelligence
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-green-400 shadow-[0_0_6px_rgba(74,222,128,1)]" />
                </div>
                <p className="mt-0.5 text-xs font-semibold text-white">
                  14 Skills &amp; 3 Projects Parsed
                </p>
                <p className="mt-0.5 text-[10px] text-zinc-400">
                  PyTorch, Next.js, RAG, System Design
                </p>
              </div>
            </div>
            {/* Speech bubble tail pointer */}
            <div className="absolute -bottom-2 right-12 h-2.5 w-2.5 rotate-45 border-b border-r border-red-500/25 bg-[#0a050d]" />
          </div>
        </div>

        {/* =======================================================
            MESSAGE BOX 2: Top Right (Skill Test Performance)
        ======================================================== */}
        <div
          className="absolute right-[2%] top-[1%] z-20 w-[220px] sm:w-[250px] lg:right-[6%] lg:top-[2%]"
          style={{ animation: "float-box 6.5s ease-in-out infinite 0.7s" }}
        >
          <div className="group relative rounded-2xl border border-red-500/25 bg-[#0a050d]/90 p-3 shadow-[0_10px_35px_rgba(239,68,68,0.18)] backdrop-blur-xl transition-all duration-300 hover:border-red-400/50 hover:bg-red-950/30">
            <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-red-400/50 to-transparent" />
            <div className="flex items-start gap-2.5">
              <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg border border-rose-500/30 bg-rose-500/10 text-rose-400">
                <GraduationCap className="h-3.5 w-3.5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-rose-400">
                    AI Skill Assessment
                  </span>
                  <span className="rounded bg-red-500/20 px-1 text-[8px] font-bold text-red-300">
                    TOP 5%
                  </span>
                </div>
                <p className="mt-0.5 text-xs font-semibold text-white">
                  Score: 92/100 • Advanced
                </p>
                <p className="mt-0.5 text-[10px] text-zinc-400">
                  Full Stack AI Readiness Verified
                </p>
              </div>
            </div>
            <div className="absolute -bottom-2 left-12 h-2.5 w-2.5 rotate-45 border-b border-r border-red-500/25 bg-[#0a050d]" />
          </div>
        </div>

        {/* =======================================================
            MESSAGE BOX 3: Mid Left (Job Matching Engine)
        ======================================================== */}
        <div
          className="absolute left-[0.5%] top-[34%] z-20 hidden w-[220px] sm:block sm:w-[240px] lg:left-[4%] lg:top-[34%]"
          style={{ animation: "float-box 5.8s ease-in-out infinite 1.4s" }}
        >
          <div className="group relative rounded-2xl border border-red-500/25 bg-[#0a050d]/90 p-3 shadow-[0_10px_35px_rgba(239,68,68,0.18)] backdrop-blur-xl transition-all duration-300 hover:border-red-400/50 hover:bg-red-950/30">
            <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-red-400/50 to-transparent" />
            <div className="flex items-start gap-2.5">
              <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
                <BriefcaseBusiness className="h-3.5 w-3.5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-400">
                    Top Job Match
                  </span>
                  <span className="text-[10px] font-extrabold text-emerald-400">
                    96%
                  </span>
                </div>
                <p className="mt-0.5 text-xs font-semibold text-white">
                  Senior AI Engineer
                </p>
                <p className="mt-0.5 text-[10px] text-zinc-400">
                  ₹28L–36L • Bengaluru • 1-Click Apply
                </p>
              </div>
            </div>
            <div className="absolute -right-2 top-6 h-2.5 w-2.5 rotate-45 border-b border-r border-red-500/25 bg-[#0a050d]" />
          </div>
        </div>

        {/* =======================================================
            MESSAGE BOX 4: Mid Right (AI Mock Interview)
        ======================================================== */}
        <div
          className="absolute right-[0.5%] top-[34%] z-20 hidden w-[230px] sm:block sm:w-[250px] lg:right-[4%] lg:top-[34%]"
          style={{ animation: "float-box 6.2s ease-in-out infinite 2.1s" }}
        >
          <div className="group relative rounded-2xl border border-red-500/25 bg-[#0a050d]/90 p-3 shadow-[0_10px_35px_rgba(239,68,68,0.18)] backdrop-blur-xl transition-all duration-300 hover:border-red-400/50 hover:bg-red-950/30">
            <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-red-400/50 to-transparent" />
            <div className="flex items-start gap-2.5">
              <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg border border-purple-500/30 bg-purple-500/10 text-purple-400">
                <MessageSquareText className="h-3.5 w-3.5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-purple-400">
                    Interview Coach
                  </span>
                  <span className="text-[9px] text-zinc-500">360+ Q&amp;A</span>
                </div>
                <p className="mt-0.5 text-xs font-semibold text-white">
                  &ldquo;Explain Transformer Attention&rdquo;
                </p>
                <p className="mt-0.5 text-[10px] text-zinc-400">
                  Real-time scoring &amp; model answers
                </p>
              </div>
            </div>
            <div className="absolute -left-2 top-6 h-2.5 w-2.5 rotate-45 border-b border-r border-red-500/25 bg-[#0a050d]" />
          </div>
        </div>

        {/* =======================================================
            MESSAGE BOX 5: Bottom Left (Career Roadmap)
        ======================================================== */}
        <div
          className="absolute bottom-[0%] left-[2%] z-20 w-[220px] sm:bottom-[1%] sm:w-[250px] lg:left-[7%] lg:bottom-[1%]"
          style={{ animation: "float-box 6.7s ease-in-out infinite 1.8s" }}
        >
          <div className="group relative rounded-2xl border border-red-500/25 bg-[#0a050d]/90 p-3 shadow-[0_10px_35px_rgba(239,68,68,0.18)] backdrop-blur-xl transition-all duration-300 hover:border-red-400/50 hover:bg-red-950/30">
            <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-red-400/50 to-transparent" />
            <div className="flex items-start gap-2.5">
              <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg border border-amber-500/30 bg-amber-500/10 text-amber-400">
                <TrendingUp className="h-3.5 w-3.5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-amber-400">
                    Personalized Roadmap
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                </div>
                <p className="mt-0.5 text-xs font-semibold text-white">
                  Next: Master RAG &amp; Vector DBs
                </p>
                <p className="mt-0.5 text-[10px] text-zinc-400">
                  Target Role Readiness: 88%
                </p>
              </div>
            </div>
            <div className="absolute -top-2 right-12 h-2.5 w-2.5 rotate-45 border-b border-r border-red-500/25 bg-[#0a050d]" />
          </div>
        </div>

        {/* =======================================================
            MESSAGE BOX 6: Bottom Right (Application Automation)
        ======================================================== */}
        <div
          className="absolute bottom-[0%] right-[2%] z-20 w-[220px] sm:bottom-[1%] sm:w-[250px] lg:right-[7%] lg:bottom-[1%]"
          style={{ animation: "float-box 5.5s ease-in-out infinite 2.5s" }}
        >
          <div className="group relative rounded-2xl border border-red-500/25 bg-[#0a050d]/90 p-3 shadow-[0_10px_35px_rgba(239,68,68,0.18)] backdrop-blur-xl transition-all duration-300 hover:border-red-400/50 hover:bg-red-950/30">
            <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-red-400/50 to-transparent" />
            <div className="flex items-start gap-2.5">
              <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg border border-cyan-500/30 bg-cyan-500/10 text-cyan-400">
                <Send className="h-3.5 w-3.5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-cyan-400">
                    Smart Applications
                  </span>
                  <span className="text-[9px] font-bold text-cyan-400">AUTO</span>
                </div>
                <p className="mt-0.5 text-xs font-semibold text-white">
                  5 Tailored Resumes Dispatched
                </p>
                <p className="mt-0.5 text-[10px] text-zinc-400">
                  Status: Under Review at 3 Companies
                </p>
              </div>
            </div>
            <div className="absolute -top-2 left-12 h-2.5 w-2.5 rotate-45 border-b border-r border-red-500/25 bg-[#0a050d]" />
          </div>
        </div>

        {/* Small floating "..." typing bubble (Top Center) */}
        <div
          className="absolute left-[38%] top-[8%] z-20 hidden lg:block"
          style={{ animation: "float-box 4s ease-in-out infinite 0.2s" }}
        >
          <div className="flex items-center gap-1.5 rounded-full border border-red-500/30 bg-black/80 px-2.5 py-1 backdrop-blur-md">
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-red-400" />
            <span
              className="h-1.5 w-1.5 animate-bounce rounded-full bg-red-400"
              style={{ animationDelay: "0.2s" }}
            />
            <span
              className="h-1.5 w-1.5 animate-bounce rounded-full bg-red-400"
              style={{ animationDelay: "0.4s" }}
            />
          </div>
        </div>

        {/* Small floating "✓ Verified" bubble (Right) */}
        <div
          className="absolute right-[34%] top-[14%] z-20 hidden lg:block"
          style={{ animation: "float-box 4.5s ease-in-out infinite 1.1s" }}
        >
          <div className="flex items-center gap-1.5 rounded-full border border-red-500/30 bg-black/80 px-2.5 py-1 text-[9px] font-semibold text-red-300 backdrop-blur-md">
            <CheckCircle2 className="h-3 w-3 text-red-400" />
            AI Matched
          </div>
        </div>

        {/* =======================================================
            THE FLOATING AI BOT (CENTRAL FIGURE MATCHING USER IMAGE)
            (Slightly scaled and shifted up so body & particles show)
        ======================================================== */}
        <div
          className="relative z-10 -mt-4 flex flex-col items-center justify-center sm:-mt-6"
          style={{ animation: "float-bot 5s ease-in-out infinite" }}
        >
          {/* Main Bot SVG (Polygonal mesh & glowing eyes) */}
          <div className="relative h-52 w-52 sm:h-60 sm:w-60 lg:h-64 lg:w-64">
            <svg
              viewBox="0 0 300 320"
              className="h-full w-full drop-shadow-[0_0_50px_rgba(239,68,68,0.65)]"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Neon Red/Rose Wireframe Gradient */}
                <linearGradient id="botRedGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fca5a5" />
                  <stop offset="45%" stopColor="#ef4444" />
                  <stop offset="100%" stopColor="#991b1b" />
                </linearGradient>

                {/* Dark Metallic Shell */}
                <linearGradient id="botDarkShell" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#250810" />
                  <stop offset="60%" stopColor="#120409" />
                  <stop offset="100%" stopColor="#050103" />
                </linearGradient>

                {/* Intense Glowing Eye Gradient */}
                <radialGradient id="eyeGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="35%" stopColor="#fee2e2" />
                  <stop offset="70%" stopColor="#ef4444" />
                  <stop offset="100%" stopColor="#991b1b" stopOpacity="0" />
                </radialGradient>

                {/* Visor Screen Glass */}
                <linearGradient id="visorGlass" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#0f0508" />
                  <stop offset="100%" stopColor="#000000" />
                </linearGradient>
              </defs>

              {/* ── EAR / ANTENNA PODS ── */}
              {/* Left ear pod */}
              <ellipse
                cx="66"
                cy="110"
                rx="14"
                ry="18"
                fill="url(#botDarkShell)"
                stroke="url(#botRedGrad)"
                strokeWidth="2"
              />
              <circle cx="66" cy="110" r="5" fill="#ef4444" />

              {/* Right ear pod */}
              <ellipse
                cx="234"
                cy="110"
                rx="14"
                ry="18"
                fill="url(#botDarkShell)"
                stroke="url(#botRedGrad)"
                strokeWidth="2"
              />
              <circle cx="234" cy="110" r="5" fill="#ef4444" />

              {/* ── ROBOT HEAD (DOME) ── */}
              {/* Head outer shell */}
              <ellipse
                cx="150"
                cy="110"
                rx="85"
                ry="72"
                fill="url(#botDarkShell)"
                stroke="url(#botRedGrad)"
                strokeWidth="2.5"
              />

              {/* Head Polygonal Wireframe Mesh Lines */}
              {/* Latitudinal arches */}
              <path
                d="M75 90 Q 150 65 225 90"
                stroke="#f87171"
                strokeWidth="1"
                strokeOpacity="0.65"
              />
              <path
                d="M70 115 Q 150 100 230 115"
                stroke="#f87171"
                strokeWidth="1"
                strokeOpacity="0.5"
              />
              <path
                d="M80 145 Q 150 160 220 145"
                stroke="#f87171"
                strokeWidth="1"
                strokeOpacity="0.6"
              />

              {/* Longitudinal curves */}
              <path
                d="M150 38 Q 150 110 150 182"
                stroke="#f87171"
                strokeWidth="1"
                strokeOpacity="0.75"
              />
              <path
                d="M110 48 Q 95 110 110 175"
                stroke="#f87171"
                strokeWidth="0.8"
                strokeOpacity="0.6"
              />
              <path
                d="M190 48 Q 205 110 190 175"
                stroke="#f87171"
                strokeWidth="0.8"
                strokeOpacity="0.6"
              />

              {/* Diagonal triangulation facets */}
              <path
                d="M110 48 L 150 75 L 190 48 L 150 38 Z"
                stroke="#fca5a5"
                strokeWidth="0.8"
                strokeOpacity="0.7"
              />
              <path
                d="M75 90 L 110 115 L 150 90 L 190 115 L 225 90"
                stroke="#ef4444"
                strokeWidth="0.8"
                strokeOpacity="0.6"
              />
              <path
                d="M110 115 L 150 145 L 190 115"
                stroke="#ef4444"
                strokeWidth="0.8"
                strokeOpacity="0.6"
              />

              {/* ── VISOR SCREEN (Dark Glass Faceplate) ── */}
              <rect
                x="88"
                y="80"
                width="124"
                height="62"
                rx="28"
                fill="url(#visorGlass)"
                stroke="#ef4444"
                strokeWidth="1.5"
                strokeOpacity="0.9"
              />

              {/* ── GLOWING CIRCULAR ROBOT EYES (Iconic focal point) ── */}
              {/* Left Eye */}
              <g className="animate-pulse">
                <circle cx="120" cy="110" r="22" fill="url(#eyeGlow)" />
                <circle cx="120" cy="110" r="14" fill="#ffffff" />
                <circle cx="116" cy="106" r="4" fill="#ffffff" />
              </g>

              {/* Right Eye */}
              <g className="animate-pulse">
                <circle cx="180" cy="110" r="22" fill="url(#eyeGlow)" />
                <circle cx="180" cy="110" r="14" fill="#ffffff" />
                <circle cx="176" cy="106" r="4" fill="#ffffff" />
              </g>

              {/* Eye wireframe rings */}
              <circle
                cx="120"
                cy="110"
                r="16"
                stroke="#fca5a5"
                strokeWidth="1"
                strokeDasharray="2 2"
              />
              <circle
                cx="180"
                cy="110"
                r="16"
                stroke="#fca5a5"
                strokeWidth="1"
                strokeDasharray="2 2"
              />

              {/* ── NECK JOINT ── */}
              <rect
                x="138"
                y="180"
                width="24"
                height="8"
                rx="3"
                fill="#27272a"
                stroke="#ef4444"
                strokeWidth="1"
              />

              {/* ── TAPERED CONICAL / HEART BODY ── */}
              <path
                d="M110 190 C 110 190 95 240 150 270 C 205 240 190 190 190 190 Z"
                fill="url(#botDarkShell)"
                stroke="url(#botRedGrad)"
                strokeWidth="2"
              />

              {/* Body Wireframe Net */}
              <path
                d="M110 190 L 150 220 L 190 190"
                stroke="#f87171"
                strokeWidth="1"
                strokeOpacity="0.7"
              />
              <path
                d="M120 215 L 150 245 L 180 215"
                stroke="#f87171"
                strokeWidth="1"
                strokeOpacity="0.7"
              />
              <path
                d="M150 190 V 270"
                stroke="#ef4444"
                strokeWidth="1.2"
                strokeOpacity="0.8"
              />
              <path
                d="M130 240 L 150 270 L 170 240"
                stroke="#f87171"
                strokeWidth="1"
                strokeOpacity="0.7"
              />

              {/* Chest Core Indicator (CareerPath Logo Motif) */}
              <circle cx="150" cy="215" r="7" fill="#ef4444" />
              <circle cx="150" cy="215" r="3.5" fill="#ffffff" />

              {/* ── LEFT ARM (Resting / Floating by side) ── */}
              <path
                d="M98 195 Q 60 215 54 250 Q 75 245 92 215 Z"
                fill="url(#botDarkShell)"
                stroke="url(#botRedGrad)"
                strokeWidth="1.8"
              />
              <line x1="75" y1="210" x2="68" y2="240" stroke="#f87171" strokeWidth="0.8" />

              {/* ── RIGHT ARM (Raised & Waving Friendly like image) ── */}
              <g style={{ transformOrigin: "205px 195px", animation: "wave 3s ease-in-out infinite" }}>
                <path
                  d="M202 195 Q 240 190 258 155 Q 248 148 225 178 Z"
                  fill="url(#botDarkShell)"
                  stroke="url(#botRedGrad)"
                  strokeWidth="1.8"
                />
                {/* Hand / Palm */}
                <ellipse
                  cx="255"
                  cy="150"
                  rx="9"
                  ry="12"
                  fill="url(#botDarkShell)"
                  stroke="#fca5a5"
                  strokeWidth="1.5"
                  transform="rotate(25 255 150)"
                />
                <circle cx="255" cy="150" r="3.5" fill="#ef4444" />
              </g>

              {/* ── CONSTELLATION NODE DOTS ── */}
              <circle cx="150" cy="38" r="2.5" fill="#fca5a5" />
              <circle cx="75" cy="90" r="2.5" fill="#fca5a5" />
              <circle cx="225" cy="90" r="2.5" fill="#fca5a5" />
              <circle cx="150" cy="75" r="2.5" fill="#ffffff" />
              <circle cx="150" cy="270" r="3" fill="#ffffff" />
            </svg>
          </div>

          {/* ── STREAMING ENERGY PARTICLES BELOW ROBOT ── */}
          <div className="relative -mt-3 flex flex-col items-center">
            {/* Primary Thruster Glow */}
            <div className="h-6 w-12 rounded-full bg-red-500/80 blur-md animate-pulse" />
            {/* Dripping Sparkle Particles */}
            <div className="flex flex-col items-center gap-2 pt-2">
              <span className="h-2 w-2 rounded-full bg-red-300 shadow-[0_0_10px_rgba(248,113,113,1)] animate-ping" />
              <span className="h-1.5 w-1.5 rounded-full bg-red-400 shadow-[0_0_8px_rgba(239,68,68,1)]" />
              <span className="h-1 w-1 rounded-full bg-rose-400 opacity-60" />
              <span className="h-0.5 w-0.5 rounded-full bg-red-500 opacity-40" />
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================
          BOTTOM TRUST BAR
      ========================================================== */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] text-zinc-500 sm:mt-5 sm:gap-x-8 sm:text-xs">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-red-500" />
          <span>AI Resume Parsing</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-red-500" />
          <span>Real Skill Tests</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-red-500" />
          <span>360+ Interview Q&amp;A</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-red-500" />
          <span>Auto Application Tracker</span>
        </div>
      </div>

      {/* =========================================================
          KEYFRAME ANIMATIONS
      ========================================================== */}
      <style jsx>{`
        @keyframes float-bot {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-16px) rotate(1deg);
          }
        }
        @keyframes float-box {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes wave {
          0%,
          100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(14deg);
          }
          75% {
            transform: rotate(-8deg);
          }
        }
      `}</style>
    </div>
  );
}
