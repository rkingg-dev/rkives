"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

const logos = [
  "SnapShot", ".inc", "acme", "U-Turn", "Sitemark",
  "Vertigo", "Nextmove", "Delaware", "Circle", "Waveless", "Border",
];

function LogoMarquee() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-20 border-t border-white/[0.06]">
      <div className="marquee-track py-4">
        {[...logos, ...logos].map((name, i) => (
          <span
            key={i}
            className="mx-10 text-[13px] font-medium tracking-wide text-white/25 whitespace-nowrap"
          >
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

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-8 py-6">
        <span
          className="text-base font-medium text-white"
          style={{ fontFamily: "var(--font-satoshi)" }}
        >
          RKINGG//
        </span>
        <span
          className="text-base font-medium text-white"
          style={{ fontFamily: "var(--font-satoshi)" }}
        >
          ©2025
        </span>
      </header>

      {/* Hero — full viewport */}
      <section className="relative flex h-screen items-center justify-center">
        {/* Giant background text — spans full width */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span
            className="font-bold leading-none tracking-tight"
            style={{
              fontFamily: "var(--font-satoshi)",
              fontSize: "clamp(8rem, 20vw, 22rem)",
              color: "rgba(160, 20, 20, 0.4)",
              letterSpacing: "-0.02em",
            }}
          >
            RKINGG
          </span>
        </div>

        {/* Image cards — overlapping, centered */}
        <div className="relative z-10 flex items-center justify-center">
          {/* Card 1 — left, slightly rotated */}
          <div
            className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/60 transition-all duration-700 ease-out hover:scale-[1.03] hover:z-20"
            style={{
              width: "clamp(180px, 22vw, 300px)",
              height: "clamp(260px, 32vw, 420px)",
              marginRight: "-5%",
              transform: "rotate(-3deg)",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-red-500 to-red-700" />
          </div>

          {/* Card 2 — center, tallest, on top */}
          <div
            className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/60 z-10 transition-all duration-700 ease-out hover:scale-[1.03] hover:z-20"
            style={{
              width: "clamp(200px, 25vw, 340px)",
              height: "clamp(300px, 40vw, 500px)",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-orange-500 to-amber-600" />
          </div>

          {/* Card 3 — right, slightly rotated */}
          <div
            className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/60 transition-all duration-700 ease-out hover:scale-[1.03] hover:z-20"
            style={{
              width: "clamp(160px, 20vw, 280px)",
              height: "clamp(240px, 30vw, 380px)",
              marginLeft: "-5%",
              transform: "rotate(3deg)",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-amber-600 via-orange-600 to-red-800" />
          </div>
        </div>
      </section>

      {/* Logo Marquee */}
      <LogoMarquee />
    </div>
  );
}
