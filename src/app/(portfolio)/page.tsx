"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import Image from "next/image";

const logos = [
  "SnapShot", ".inc", "acme", "U-Turn", "Sitemark",
  "Vertigo", "Nextmove", "Delaware", "Circle", "Waveless", "Border",
];

function LogoMarquee() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-20 border-t border-white/[0.06]">
      <div className="marquee-track py-4">
        {[...logos, ...logos].map((name, i) => (
          <span key={i} className="mx-10 text-[13px] font-medium tracking-wide text-white/25 whitespace-nowrap">
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function PortfolioPage() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    function raf(time: number) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0a0a0a]">
      {/* ─── Header ─── */}
      <header className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-8 py-6">
        <span className="text-base font-medium text-white" style={{ fontFamily: "var(--font-satoshi)" }}>RKINGG//</span>
        <span className="text-base font-medium text-white" style={{ fontFamily: "var(--font-satoshi)" }}>©2025</span>
      </header>

      {/* ─── Hero / Hello Section ─── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-8 py-32">
        {/* Photo card — Instax style */}
        <div className="bg-[#e8e4de] rounded-sm p-6 w-full max-w-[40rem]">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#0a0a0a] leading-tight mb-6" style={{ fontFamily: "var(--font-satoshi)" }}>
            HELLO<br />MY NAME IS<br />R KING
          </h2>
          <div className="relative w-full aspect-[4/3] bg-[#0a0a0a] overflow-hidden">
            <Image src="/placeholder-portrait.jpg" alt="R King Garcia" fill className="object-cover" />
          </div>
        </div>

        {/* Info below card */}
        <div className="mt-6 w-full max-w-[40rem] flex items-start justify-between">
          <div className="text-[11px] text-white/40 uppercase tracking-wider leading-relaxed" style={{ fontFamily: "var(--font-satoshi)" }}>
            web development rkingg<br />
            digital product designer<br />
            manila, ph<br />
            ui/ux designer 09200-0240
          </div>
          <span className="text-[11px] text-white/30 uppercase tracking-widest" style={{ fontFamily: "var(--font-satoshi)" }}>"portfolio"</span>
        </div>
      </section>

      {/* ─── Contact / Business Card ─── */}
      <section className="relative px-8 lg:px-16 py-32 border-t border-white/[0.06] bg-[#e8e4de]">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-5xl lg:text-7xl font-bold text-[#0a0a0a]" style={{ fontFamily: "var(--font-satoshi)" }}>"BUSINESS CARD"</h2>
        </div>
        <div className="max-w-6xl mx-auto flex items-center justify-between mt-24">
          <a href="mailto:hello@rkingg.com" className="text-sm text-[#0a0a0a]/60 hover:text-[#0a0a0a] transition-colors" style={{ fontFamily: "var(--font-satoshi)" }}>hello@rkingg.com</a>
          <span className="text-sm text-[#0a0a0a]/40" style={{ fontFamily: "var(--font-satoshi)" }}>2022©</span>
        </div>
      </section>

      {/* ─── Footer bar ─── */}
      <div className="px-8 lg:px-16 py-6 bg-[#0a0a0a] flex items-center justify-between">
        <span className="text-[11px] text-white/30 uppercase tracking-wider" style={{ fontFamily: "var(--font-satoshi)" }}>RKINGG 0016/</span>
        <span className="text-[11px] text-white/30 uppercase tracking-wider" style={{ fontFamily: "var(--font-satoshi)" }}>MANILA PH</span>
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="text-[11px] text-white/30 uppercase tracking-wider hover:text-white transition-colors" style={{ fontFamily: "var(--font-satoshi)" }}>BACK</button>
      </div>

      {/* Logo Marquee */}
      <LogoMarquee />
    </div>
  );
}
