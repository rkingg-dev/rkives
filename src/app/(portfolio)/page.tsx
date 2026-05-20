"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import Image from "next/image";

const logos = [
  "SnapShot", ".inc", "acme", "U-Turn", "Sitemark",
  "Vertigo", "Nextmove", "Delaware", "Circle", "Waveless", "Border",
];

const works = [
  { title: "BrightPath Academy", year: "2024" },
  { title: "SkillBridge Learning", year: "2024" },
  { title: "Elevate Studio", year: "2024" },
  { title: "CloudSync Pro", year: "2024" },
  { title: "RK Portfolio", year: "2024" },
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
        {/* Photo card — big, centered */}
        <div className="bg-[#e8e4de] rounded-sm p-8 max-w-lg w-full">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#0a0a0a] leading-tight mb-8" style={{ fontFamily: "var(--font-satoshi)" }}>
            HELLO<br />MY NAME IS<br />R KING
          </h2>
          <div className="relative w-full aspect-[4/3] bg-[#0a0a0a] rounded-sm overflow-hidden">
            <Image src="/placeholder-portrait.jpg" alt="R King Garcia" fill className="object-cover" />
          </div>
        </div>

        {/* Info below card */}
        <div className="mt-6 w-full max-w-lg flex items-start justify-between">
          <div className="text-[11px] text-white/40 uppercase tracking-wider leading-relaxed" style={{ fontFamily: "var(--font-satoshi)" }}>
            web development rkingg<br />
            digital product designer<br />
            manila, ph<br />
            ui/ux designer 09200-0240
          </div>
          <span className="text-[11px] text-white/30 uppercase tracking-widest" style={{ fontFamily: "var(--font-satoshi)" }}>"portfolio"</span>
        </div>
      </section>

      {/* ─── About Section ─── */}
      <section className="relative px-8 lg:px-16 py-24 border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-12 lg:gap-20">
            {/* Left — Number + Photo */}
            <div className="space-y-8">
              <span className="text-sm text-white/30 font-medium" style={{ fontFamily: "var(--font-satoshi)" }}>001 /</span>
              <div className="relative w-48 h-64 bg-[#1a1a1a] rounded-sm overflow-hidden">
                <Image src="/placeholder-about.jpg" alt="About" fill className="object-cover grayscale" />
              </div>
              <div className="text-[10px] text-white/30 uppercase tracking-wider leading-relaxed" style={{ fontFamily: "var(--font-satoshi)" }}>
                currently working as<br />
                a web app developer
              </div>
            </div>

            {/* Right — Content */}
            <div className="space-y-8">
              <h2 className="text-4xl lg:text-5xl font-bold text-white" style={{ fontFamily: "var(--font-satoshi)" }}>"ABOUT ME"</h2>

              <div className="space-y-6 text-[15px] text-white/70 leading-relaxed max-w-xl" style={{ fontFamily: "var(--font-satoshi)" }}>
                <p>Hello! I am R KING GARCIA a Web designer and developer based in Manila with years of experience in building products and appealing web experiences.</p>
                <p>I have experience working together with teams that are design-focused to create websites and microsites for businesses and individuals.</p>
                <p>I&apos;ve led engineering initiatives and worked on product teams for a number of years.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8 border-t border-white/[0.06]">
                <div>
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-2" style={{ fontFamily: "var(--font-satoshi)" }}>Creative Design</h3>
                  <p className="text-[12px] text-white/40 leading-relaxed" style={{ fontFamily: "var(--font-satoshi)" }}>Good designs do not gain traction since they effectively surprise recipients with new possibilities.</p>
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-2" style={{ fontFamily: "var(--font-satoshi)" }}>Best Experience</h3>
                  <p className="text-[12px] text-white/40 leading-relaxed" style={{ fontFamily: "var(--font-satoshi)" }}>What matters is to focus attention to the user experience in order to gain an advantage.</p>
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-2" style={{ fontFamily: "var(--font-satoshi)" }}>Customer Satisfaction</h3>
                  <p className="text-[12px] text-white/40 leading-relaxed" style={{ fontFamily: "var(--font-satoshi)" }}>As soon as you have decided to work with me, you will join a list of satisfied recipients and receive my support.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Selected Works Section ─── */}
      <section className="relative px-8 lg:px-16 py-24 border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-12 lg:gap-20">
            {/* Left — Number + Photo */}
            <div className="space-y-8">
              <span className="text-sm text-white/30 font-medium" style={{ fontFamily: "var(--font-satoshi)" }}>002 /</span>
              <div className="relative w-48 h-64 bg-[#1a1a1a] rounded-sm overflow-hidden">
                <Image src="/placeholder-works.jpg" alt="Works" fill className="object-cover grayscale" />
              </div>
              <div className="text-[10px] text-white/30 uppercase tracking-wider leading-relaxed" style={{ fontFamily: "var(--font-satoshi)" }}>
                web development rkingg<br />
                digital product designer<br />
                branding<br />
                ui/ux designer 09200-0240
              </div>
            </div>

            {/* Right — Work list */}
            <div className="space-y-8">
              <h2 className="text-4xl lg:text-5xl font-bold text-white" style={{ fontFamily: "var(--font-satoshi)" }}>"SELECTED WORKS"</h2>

              <div className="space-y-0">
                {works.map((work, i) => (
                  <div key={i} className="flex items-center justify-between py-6 border-b border-white/[0.08] group cursor-pointer hover:border-white/20 transition-colors">
                    <span className="text-xl lg:text-2xl font-bold text-white group-hover:text-orange-400 transition-colors" style={{ fontFamily: "var(--font-satoshi)" }}>{work.title}</span>
                    <span className="text-sm text-white/30" style={{ fontFamily: "var(--font-satoshi)" }}>{work.year}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
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
