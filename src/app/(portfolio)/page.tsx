"use client";

import { useEffect } from "react";

const logos = [
  "SnapShot", ".inc", "acme", "U-Turn", "Sitemark",
  "Vertigo", "Nextmove", "Delaware", "Circle", "Waveless", "Border",
];

function LogoMarquee() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-20 border-t border-white/10 bg-[#0a0a0a]/80 backdrop-blur-sm">
      <div className="marquee-track py-5">
        {[...logos, ...logos].map((name, i) => (
          <span
            key={i}
            className="mx-8 text-sm font-medium tracking-wide text-white/30 whitespace-nowrap"
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function PortfolioPage() {
  return (
    <div className="relative min-h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-8 py-6">
        <span className="text-sm font-bold tracking-widest text-white">
          RKINGG//
        </span>
        <span className="text-sm text-white/40">©2025</span>
      </header>

      {/* Hero — full viewport */}
      <section className="relative flex h-screen items-center justify-center">
        {/* Giant background text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span
            className="font-bold text-[18vw] leading-none tracking-tight"
            style={{
              color: "rgba(180, 30, 30, 0.35)",
              fontFamily: "var(--font-satoshi)",
            }}
          >
            RKINGG
          </span>
        </div>

        {/* Image grid — 3 overlapping cards */}
        <div className="relative z-10 flex items-center justify-center gap-0">
          {/* Card 1 — tall */}
          <div className="relative w-[280px] h-[380px] rounded-2xl overflow-hidden -mr-8 shadow-2xl shadow-black/50 rotate-[-2deg] transition-transform duration-500 hover:rotate-0 hover:scale-105 hover:z-20">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-red-600" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm" />
            </div>
          </div>

          {/* Card 2 — center, tallest */}
          <div className="relative w-[300px] h-[420px] rounded-2xl overflow-hidden z-10 shadow-2xl shadow-black/50 transition-transform duration-500 hover:scale-105 hover:z-20">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-amber-500" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-28 h-28 rounded-full bg-white/20 backdrop-blur-sm" />
            </div>
          </div>

          {/* Card 3 — shorter */}
          <div className="relative w-[260px] h-[340px] rounded-2xl overflow-hidden -ml-8 shadow-2xl shadow-black/50 rotate-[2deg] transition-transform duration-500 hover:rotate-0 hover:scale-105 hover:z-20">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-600 to-orange-700" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm" />
            </div>
          </div>
        </div>
      </section>

      {/* Logo Marquee */}
      <LogoMarquee />
    </div>
  );
}
