import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
} from "lucide-react";

import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import CareerPathAiBotHero from "@/components/hero/CareerPathAiBotHero";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#030303] text-white selection:bg-red-500/30">
      {/* =========================================================
          GLOBAL ATMOSPHERE
      ========================================================== */}

      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        {/* Left red glow */}
        <div className="absolute -left-[18%] top-[8%] h-[760px] w-[760px] rounded-full bg-red-700/[0.10] blur-[170px]" />

        {/* Right red glow */}
        <div className="absolute -right-[16%] top-[12%] h-[700px] w-[700px] rounded-full bg-red-600/[0.08] blur-[170px]" />

        {/* Bottom glow */}
        <div className="absolute bottom-[-30%] left-[30%] h-[700px] w-[700px] rounded-full bg-red-900/[0.15] blur-[180px]" />

        {/* Center atmosphere */}
        <div className="absolute left-1/2 top-[40%] h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-red-600/[0.035] blur-[140px]" />

        {/* Technical grid */}
        <div
          className="absolute inset-0 opacity-[0.055]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.55) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.55) 1px, transparent 1px)",
            backgroundSize: "52px 52px",
            maskImage:
              "radial-gradient(ellipse at center, black 15%, transparent 82%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black 15%, transparent 82%)",
          }}
        />

        {/* Ambient particles */}
        <span className="absolute left-[8%] top-[27%] h-1.5 w-1.5 animate-pulse rounded-full bg-red-400 shadow-[0_0_18px_rgba(248,113,113,1)]" />

        <span className="absolute left-[19%] top-[62%] h-1 w-1 rounded-full bg-red-300 shadow-[0_0_14px_rgba(248,113,113,1)]" />

        <span className="absolute right-[14%] top-[22%] h-1.5 w-1.5 animate-pulse rounded-full bg-red-400 shadow-[0_0_18px_rgba(248,113,113,1)]" />

        <span className="absolute right-[24%] top-[68%] h-1 w-1 rounded-full bg-red-300 shadow-[0_0_14px_rgba(248,113,113,1)]" />

        <span className="absolute left-[48%] top-[15%] h-1 w-1 rounded-full bg-red-400 shadow-[0_0_12px_rgba(248,113,113,0.8)]" />

        <span className="absolute right-[36%] top-[78%] h-1.5 w-1.5 rounded-full bg-red-300 shadow-[0_0_18px_rgba(248,113,113,0.8)]" />
      </div>

      {/* =========================================================
          NAVBAR
      ========================================================== */}

      <header className="relative z-50 px-4 pt-4 sm:px-6 lg:px-8">
        <nav
          className="
            mx-auto
            flex
            h-[68px]
            max-w-[1400px]
            items-center
            justify-between
            rounded-[22px]
            border
            border-red-500/20
            bg-[#080808]/85
            px-5
            shadow-[0_0_60px_rgba(0,0,0,0.5)]
            backdrop-blur-2xl
            sm:px-7
          "
        >
          {/* Logo */}

          <Link
            href="/"
            className="group flex items-center gap-3"
          >
            <div
              className="
                relative
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                border
                border-red-400/30
                bg-red-500/[0.07]
                shadow-[0_0_25px_rgba(239,68,68,0.12)]
                transition-all
                duration-300
                group-hover:border-red-400/60
                group-hover:bg-red-500/[0.13]
                group-hover:shadow-[0_0_35px_rgba(239,68,68,0.28)]
              "
            >
              <Sparkles
                className="
                  relative
                  z-10
                  h-5
                  w-5
                  text-red-400
                  transition-transform
                  duration-300
                  group-hover:rotate-12
                "
              />

              <div className="absolute inset-0 rounded-xl bg-red-500/10 blur-xl" />
            </div>

            <div className="text-xl font-bold tracking-tight sm:text-[22px]">
              CareerPath{" "}
              <span className="text-red-500">AI</span>
            </div>
          </Link>

          {/* Navigation */}

          <div className="hidden items-center gap-9 md:flex">
            <Link
              href="#features"
              className="
                text-sm
                text-slate-400
                transition-all
                duration-300
                hover:text-white
              "
            >
              Features
            </Link>

            <Link
              href="#how-it-works"
              className="
                text-sm
                text-slate-400
                transition-all
                duration-300
                hover:text-white
              "
            >
              How it works
            </Link>

            <Link
              href="/about"
              className="
                text-sm
                text-slate-400
                transition-all
                duration-300
                hover:text-white
              "
            >
              About
            </Link>

            <Link
              href="/pricing"
              className="
                text-sm
                text-slate-400
                transition-all
                duration-300
                hover:text-white
              "
            >
              Pricing
            </Link>
          </div>

          {/* Actions */}

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/login"
              className="
                rounded-xl
                border
                border-red-500/25
                bg-black/30
                px-4
                py-2.5
                text-sm
                font-medium
                text-slate-200
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:border-red-400/50
                hover:bg-red-500/[0.07]
                hover:text-white
                hover:shadow-[0_0_25px_rgba(239,68,68,0.15)]
              "
            >
              Login
            </Link>

            <Link
              href="/signup"
              className="
                group
                inline-flex
                items-center
                gap-2
                rounded-xl
                bg-gradient-to-r
                from-red-500
                via-red-500
                to-rose-500
                px-5
                py-2.5
                text-sm
                font-semibold
                text-white
                shadow-[0_0_30px_rgba(239,68,68,0.30)]
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:shadow-[0_0_45px_rgba(239,68,68,0.48)]
              "
            >
              Get Started

              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </nav>
      </header>

      {/* =========================================================
          HERO VIEWPORT (AI COPILOT BOT & FLOATING MESSAGE BOXES)
      ========================================================== */}

      <section className="relative z-10 overflow-hidden border-b border-red-500/10 pt-2 pb-6 sm:pt-4 sm:pb-8">
        <CareerPathAiBotHero />
      </section>

      {/* =========================================================
          EXISTING WEBSITE SECTIONS
      ========================================================== */}
      <div className="relative z-30 bg-[#030303]">
        <HowItWorks />
        <Features />
        <CTA />
        <Footer />
      </div>
    </main>
  );
}