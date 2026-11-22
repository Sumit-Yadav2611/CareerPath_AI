"use client";

import { useEffect, useState } from "react";
import { Sparkles, Brain, Cpu, Zap, Shield, Activity, Target } from "lucide-react";

export default function FloatingAiModel() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative h-full w-full select-none">
      {/* =========================================================
          BACKGROUND GLOWS & AMBIENCE
      ========================================================== */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        {/* Core crimson plasma bloom */}
        <div className="h-[420px] w-[420px] rounded-full bg-red-600/[0.18] blur-[100px] animate-pulse" />
        {/* Inner intense core */}
        <div className="absolute left-1/2 top-1/2 h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose-500/[0.22] blur-[60px]" />
      </div>

      {/* =========================================================
          ORBITAL GYROSCOPE RINGS (Holographic effect)
      ========================================================== */}
      {/* Outer Gyro Ring */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[460px] w-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-red-500/20"
        style={{
          transform: "translate(-50%, -50%) rotateX(65deg) rotateY(15deg)",
          boxShadow: "0 0 40px rgba(239, 68, 68, 0.12)",
          animation: "spin 28s linear infinite",
        }}
      >
        {/* Satellite particle on outer ring */}
        <div className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-red-400 shadow-[0_0_12px_rgba(248,113,113,1)]" />
      </div>

      {/* Middle Gyro Ring (Counter-rotating) */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-red-400/25 border-dashed"
        style={{
          transform: "translate(-50%, -50%) rotateX(55deg) rotateY(-30deg)",
          animation: "spin 20s linear infinite reverse",
        }}
      >
        <div className="absolute -bottom-1 left-1/3 h-2 w-2 rounded-full bg-rose-300 shadow-[0_0_10px_rgba(253,164,175,1)]" />
      </div>

      {/* Inner Precision Radar Ring */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[290px] w-[290px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-red-500/30"
        style={{
          transform: "translate(-50%, -50%) rotateX(40deg) rotateZ(25deg)",
          boxShadow: "inset 0 0 30px rgba(239, 68, 68, 0.15)",
        }}
      />

      {/* Crosshair telemetry lines */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-px -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-transparent via-red-500/25 to-transparent" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-px w-[520px] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-red-500/25 to-transparent" />

      {/* =========================================================
          MAIN FLOATING AI CORE / CYBERNETIC ENTITY
      ========================================================== */}
      <div
        className="relative mx-auto flex h-full w-full items-center justify-center"
        style={{
          animation: "float 6s ease-in-out infinite",
        }}
      >
        {/* Holographic Hexagonal Shield Container */}
        <div className="relative flex h-[340px] w-[340px] items-center justify-center rounded-3xl border border-white/[0.08] bg-gradient-to-br from-[#0c0512]/90 via-[#06040a]/95 to-[#020205] p-6 shadow-[0_0_80px_rgba(220,38,38,0.22)] backdrop-blur-2xl">
          {/* Corner accents */}
          <div className="absolute -left-1 -top-1 h-4 w-4 border-l-2 border-t-2 border-red-500" />
          <div className="absolute -right-1 -top-1 h-4 w-4 border-r-2 border-t-2 border-red-500" />
          <div className="absolute -bottom-1 -left-1 h-4 w-4 border-b-2 border-l-2 border-red-500" />
          <div className="absolute -bottom-1 -right-1 h-4 w-4 border-b-2 border-r-2 border-red-500" />

          {/* Top telemetry tag */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border border-red-500/30 bg-black/80 px-3 py-0.5 text-[9px] font-semibold tracking-widest text-red-300 backdrop-blur-md">
            SYS.AI // NEURAL CORE v4.8
          </div>

          {/* Scanning laser beam overlay */}
          <div
            className="pointer-events-none absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-red-400 to-transparent opacity-60 shadow-[0_0_15px_rgba(248,113,113,0.9)]"
            style={{
              animation: "scan 4s ease-in-out infinite",
            }}
          />

          {/* ── VECTOR CYBERNETIC AI ENTITY ── */}
          <div className="relative flex h-full w-full items-center justify-center">
            {/* Ambient inner glow */}
            <div className="absolute h-44 w-44 rounded-full bg-red-500/20 blur-2xl animate-pulse" />

            <svg
              viewBox="0 0 200 200"
              className="h-56 w-56 drop-shadow-[0_0_30px_rgba(239,68,68,0.55)]"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="cyberGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f87171" />
                  <stop offset="50%" stopColor="#ef4444" />
                  <stop offset="100%" stopColor="#991b1b" />
                </linearGradient>
                <linearGradient id="cyberMetal" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#27272a" />
                  <stop offset="50%" stopColor="#18181b" />
                  <stop offset="100%" stopColor="#09090b" />
                </linearGradient>
                <linearGradient id="visorGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity="0.2" />
                  <stop offset="50%" stopColor="#fca5a5" stopOpacity="1" />
                  <stop offset="100%" stopColor="#ef4444" stopOpacity="0.2" />
                </linearGradient>
                <radialGradient id="reactorGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#fee2e2" />
                  <stop offset="40%" stopColor="#ef4444" />
                  <stop offset="100%" stopColor="#7f1d1d" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Outer Hex Shield Wireframe */}
              <polygon
                points="100,16 172,58 172,142 100,184 28,142 28,58"
                stroke="url(#cyberGrad1)"
                strokeWidth="1.5"
                strokeOpacity="0.6"
                strokeDasharray="6 4"
              />

              {/* Inner Hex Shield Wireframe */}
              <polygon
                points="100,28 160,64 160,136 100,172 40,136 40,64"
                fill="url(#cyberMetal)"
                stroke="#ef4444"
                strokeWidth="1.2"
                strokeOpacity="0.8"
              />

              {/* Circuit Lattice Nodes & Traces */}
              <path
                d="M40 100 H 65 L 75 85 H 100"
                stroke="#f87171"
                strokeWidth="1"
                strokeOpacity="0.7"
              />
              <path
                d="M160 100 H 135 L 125 115 H 100"
                stroke="#f87171"
                strokeWidth="1"
                strokeOpacity="0.7"
              />
              <path
                d="M100 28 V 55 L 85 70"
                stroke="#ef4444"
                strokeWidth="1"
                strokeOpacity="0.7"
              />
              <path
                d="M100 172 V 145 L 115 130"
                stroke="#ef4444"
                strokeWidth="1"
                strokeOpacity="0.7"
              />

              {/* Cybernetic Android Visor Face Silhouette */}
              {/* Forehead Armor Plate */}
              <polygon
                points="72,56 128,56 138,72 62,72"
                fill="#1c1917"
                stroke="#ef4444"
                strokeWidth="1"
              />
              {/* Temples */}
              <polygon
                points="62,72 54,92 70,96 76,82"
                fill="#1c1917"
                stroke="#f87171"
                strokeWidth="0.8"
              />
              <polygon
                points="138,72 146,92 130,96 124,82"
                fill="#1c1917"
                stroke="#f87171"
                strokeWidth="0.8"
              />

              {/* Glowing Cybernetic Eye Visor */}
              <polygon
                points="70,82 130,82 126,94 74,94"
                fill="#000000"
                stroke="#f87171"
                strokeWidth="1.5"
              />
              {/* Laser Core Eyeline */}
              <line
                x1="74"
                y1="88"
                x2="126"
                y2="88"
                stroke="url(#visorGlow)"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <circle cx="100" cy="88" r="3" fill="#ffffff" />

              {/* Lower Jaw / Chin Plate */}
              <polygon
                points="74,104 126,104 116,132 84,132"
                fill="#18181b"
                stroke="#ef4444"
                strokeWidth="1"
              />
              {/* Breathing / Voder grille slots */}
              <line x1="88" y1="112" x2="112" y2="112" stroke="#f87171" strokeWidth="1" />
              <line x1="90" y1="118" x2="110" y2="118" stroke="#f87171" strokeWidth="1" />
              <line x1="93" y1="124" x2="107" y2="124" stroke="#f87171" strokeWidth="1" />

              {/* Pulsing Quantum Neural Core (Center Reactor) */}
              <circle
                cx="100"
                cy="148"
                r="12"
                fill="url(#reactorGlow)"
              />
              <circle
                cx="100"
                cy="148"
                r="6"
                fill="#ffffff"
                stroke="#ef4444"
                strokeWidth="1.5"
              />
              <circle
                cx="100"
                cy="148"
                r="18"
                stroke="#f87171"
                strokeWidth="1"
                strokeDasharray="4 3"
              />

              {/* Corner Node Dots */}
              <circle cx="100" cy="16" r="3" fill="#f87171" />
              <circle cx="172" cy="58" r="2.5" fill="#f87171" />
              <circle cx="172" cy="142" r="2.5" fill="#f87171" />
              <circle cx="100" cy="184" r="3" fill="#f87171" />
              <circle cx="28" cy="142" r="2.5" fill="#f87171" />
              <circle cx="28" cy="58" r="2.5" fill="#f87171" />
            </svg>
          </div>

          {/* Bottom Telemetry Bar */}
          <div className="absolute -bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/10 bg-black/90 px-3 py-1 shadow-lg backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>
            <span className="text-[10px] font-medium tracking-wider text-slate-300">
              CAREER AGENT ACTIVE
            </span>
          </div>
        </div>
      </div>

      {/* =========================================================
          FLOATING SATELLITE CHIPS & TELEMETRY BADGES
      ========================================================== */}
      {/* Chip 1: Top Right */}
      <div
        className="absolute -right-4 top-[14%] z-30 hidden rounded-2xl border border-red-500/30 bg-[#08080c]/85 p-3 shadow-[0_10px_30px_rgba(239,68,68,0.18)] backdrop-blur-xl sm:flex items-center gap-3"
        style={{ animation: "float 5s ease-in-out infinite 0.5s" }}
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-red-500/30 bg-red-500/10 text-red-400">
          <Brain className="h-4 w-4" />
        </div>
        <div>
          <div className="text-[11px] font-bold text-white">Career Intelligence</div>
          <div className="text-[10px] text-zinc-400">Adaptive AI Roadmap</div>
        </div>
      </div>

      {/* Chip 2: Bottom Right */}
      <div
        className="absolute -right-8 bottom-[18%] z-30 hidden rounded-2xl border border-white/[0.08] bg-[#08080c]/85 p-3 shadow-xl backdrop-blur-xl sm:flex items-center gap-3"
        style={{ animation: "float 6s ease-in-out infinite 1.2s" }}
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-green-500/30 bg-green-500/10 text-green-400">
          <Zap className="h-4 w-4" />
        </div>
        <div>
          <div className="text-[11px] font-bold text-white">98.4% Match Rate</div>
          <div className="text-[10px] text-zinc-400">Skills to Job Profiles</div>
        </div>
      </div>

      {/* Chip 3: Bottom Left */}
      <div
        className="absolute -left-6 bottom-[26%] z-30 hidden rounded-2xl border border-white/[0.08] bg-[#08080c]/85 p-3 shadow-xl backdrop-blur-xl sm:flex items-center gap-3"
        style={{ animation: "float 7s ease-in-out infinite 2s" }}
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-400">
          <Target className="h-4 w-4" />
        </div>
        <div>
          <div className="text-[11px] font-bold text-white">Mock Interview AI</div>
          <div className="text-[10px] text-zinc-400">360+ Curated Questions</div>
        </div>
      </div>

      {/* CSS Keyframes for smooth animations */}
      <style jsx>{`
        @keyframes spin {
          from {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-12px);
          }
        }
        @keyframes scan {
          0% {
            top: 5%;
          }
          50% {
            top: 90%;
          }
          100% {
            top: 5%;
          }
        }
      `}</style>
    </div>
  );
}
