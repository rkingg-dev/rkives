"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function WorkMarquee() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-20 border-t border-white/[0.06]">
      <div className="marquee-track py-4">
        {[...Array(8)].map((_, i) => (
          <span key={i} className="mx-8 text-[11px] font-medium tracking-[0.2em] text-white/25 uppercase whitespace-nowrap">
            AVAILABLE FOR WORK <span className="text-[#e8734a] mx-4">&bull;</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function PortfolioPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const statementRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const carouselTrackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Pin hero for full scroll duration ──
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: "top top",
        end: "+=800",
        pin: true,
        anticipatePin: 1,
      });

      // ── Hero zooms out as statement covers it ──
      gsap.to(heroContentRef.current, {
        scale: 0.7,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "+=400",
          scrub: true,
        },
      });

      // ── Statement slides up like a card over hero ──
      gsap.set(statementRef.current, { yPercent: 100 });

      gsap.to(statementRef.current, {
        yPercent: 0,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "+=400",
          scrub: true,
        },
      });

      // ── Contact: scattered letters coming from bottom ──
      const contactChars = contactRef.current?.querySelectorAll(".char span");
      if (contactChars?.length) {
        // Each letter starts scattered with random position and rotation
        contactChars.forEach((char) => {
          gsap.set(char, {
            x: gsap.utils.random(-80, 80),
            y: gsap.utils.random(100, 300),
            rotation: gsap.utils.random(-40, 40),
            opacity: 0,
          });
        });

        const contactTl = gsap.timeline({
          scrollTrigger: {
            trigger: contactRef.current,
            start: "top bottom",
            end: "top 30%",
            scrub: 1,
          },
        });

        // Whole text moves from bottom and stops at center
        contactTl.fromTo(
          contactRef.current,
          { y: "50vh" },
          { y: "0%", ease: "power2.out" },
          0
        );

        // Letters settle into correct positions as it arrives
        contactTl.to(contactChars, {
          x: 0,
          y: 0,
          rotation: 0,
          opacity: 1,
          ease: "power3.out",
          stagger: 0.015,
        }, 0);
      }

      // ── Vertical carousel ──
      if (carouselRef.current && carouselTrackRef.current) {
        const items = Array.from(carouselTrackRef.current.querySelectorAll(".carousel-item"));
        const numItems = items.length;
        const focusW = 1000;
        const focusH = 650;
        const smallW = 120;
        const smallH = 160;
        const step = 1 / (numItems - 1); // progress per item transition

        ScrollTrigger.create({
          trigger: carouselRef.current,
          start: "top top",
          end: "bottom bottom",
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress;

            items.forEach((item, i) => {
              const itemCenter = i * step;
              const dist = Math.abs(p - itemCenter);
              const range = step * 0.8;
              const t = Math.max(0, 1 - dist / range);
              const ease = t * t * (3 - 2 * t); // smoothstep

              const w = smallW + (focusW - smallW) * ease;
              const h = smallH + (focusH - smallH) * ease;
              const y = (1 - ease) * (i % 2 === 0 ? -80 : 80); // slight offset for non-focused
              const opacity = 0.2 + 0.8 * ease;

              gsap.set(item, {
                width: w,
                height: h,
                y: y,
                opacity,
                zIndex: Math.round(ease * 10),
              });

              // Show label when focused
              const label = item.querySelector(".carousel-label") as HTMLElement | null;
              if (label) {
                label.style.opacity = ease > 0.9 ? "1" : "0";
              }
            });
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative bg-[#0a0a0a]">
      {/* ─── Hero / Hello Section (pinned) ─── */}
      <section
        ref={heroRef}
        className="relative h-screen flex flex-col items-center justify-center px-8 py-32 overflow-hidden z-0"
      >
        <div ref={heroContentRef} className="flex flex-col items-center will-change-transform">
          {/* Photo card — Instax style */}
          <div className="bg-[#e8e4de] p-4 w-full max-w-[30rem]">
            <h2 className="font-bold text-[#0a0a0a] mb-4 uppercase" style={{ fontSize: '3.5rem', lineHeight: '3.25rem' }}>
              HELLO MY NAME IS<br />RKINGG
            </h2>

            <div className="relative w-full aspect-[4/3] bg-[#0a0a0a] flex items-center justify-center overflow-hidden">
              <pre className="text-[#e8e4de] select-none whitespace-pre" style={{ fontSize: '0.38rem', lineHeight: '0.46rem', letterSpacing: '0.02em' }}>
{`                 ..-::::::-..
             .:+++++++++++++:.
           .++++++++++++++++++.
         .++++++++++++++++++++++.
        .++++++++++++++++++++++++.
       .++++++++++++++++++++++++++.
      .++++++++++++++++++++++++++++.
     .++++++++++++++++++++++++++++++.
    .++++++++++++++++++++++++++++++++.
    .++++++++++++++++++++++++++++++++.
    .++++++++++++++++++++++++++++++++.
    .++++++++++++++++++++++++++++++++.
    .++++++++++++++++++++++++++++++++.
    .++++++++==========++++++++++++++.
    .++++++++==========++++++++++++++.
    .++++++++++++++++++++++++++++++++.
    .++++++++++++++++++++++++++++++++.
    .++++++++++++++++++++++++++++++++.
    .++++++++++++++++++++++++++++++++.
    .++++++++++++++++++++++++++++++++.
    .++++++++++++++++++++++++++  .++++.
    .+++++++++++++++++++++++++    +++.
    .++++++++++++++++++++++++     +++.
    .+++++++++++++++++++++++       ++.
    .++++++++++++++++++++++         +.
     .++++++++++++++++++++        .+.
      .++++++++++++++++++      .:+.
       .++++++++++++++++    .:+:.
        .++++++++++++++   :+:.
         .++++++++++++  :+:.
          .++++++++++ :+.
    .       +++++++++.+       .
   :+:      ++++++++ .      :+:
  ::::      +++++++         ::::
 :::::       +++++         :::::
:::::.       +++++        .:::::
':::::'-------++++-------':::::'
  ''''---------++---------''''`}</pre>
            </div>
          </div>

          {/* Info below card */}
          <div className="mt-6 w-full max-w-[30rem] flex items-start justify-between">
            <div className="text-[14px] font-medium text-white uppercase tracking-wider leading-relaxed">
              WEB DEVELOPMENT RKINGG<br />
              DIGITAL PRODUCT DESIGNER<br />
              MANILA, PH<br />
              UI/UX DESIGNER
            </div>
            <div className="text-right uppercase">
              <span className="text-[14px] font-medium text-white block">RKINGG//</span>
              <span className="text-[14px] font-medium text-white tracking-widest block mt-1">&quot;PORTFOLIO&quot;</span>
              <span className="text-[14px] font-medium text-white block mt-1">&copy;2026</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Statement Section (slides up over hero) ─── */}
      <section
        ref={statementRef}
        className="relative h-screen flex flex-col justify-center px-8 lg:px-16 bg-[#0a0a0a] z-10 -mt-screen"
      >
        <div className="max-w-5xl mx-auto">
          <p className="text-[clamp(2rem,5vw,4.5rem)] font-medium leading-[1.05] tracking-tight text-white">
            I blend <span className="text-[#e8734a]">creativity with purpose</span>, creating visuals that are as functional as they are beautiful, ensuring that they contribute to the overall success.
          </p>
        </div>
      </section>

      {/* ─── Selected Works Carousel ─── */}
      <section
        ref={carouselRef}
        className="relative bg-[#0a0a0a] z-30 h-[400vh]"
      >
        <div className="sticky top-0 h-screen flex items-center justify-center">
          <div ref={carouselTrackRef} className="relative flex flex-col items-center">
            {[
              { src: "https://cdn.prod.website-files.com/67520d315f4e283ed68209b7/676074aa08da6755095bd683_Hero%20Image%20Scale.jpg", name: "Carrera", year: "2025" },
              { src: "https://cdn.prod.website-files.com/67520d315f4e283ed68209b7/67634767a7b878787205ead8_Hero%20Cards%20Image.jpg", name: "Lumina", year: "2025" },
              { src: "https://cdn.prod.website-files.com/660d9820899830015451c830/660ed1275f1e40147e8c83a3_blog-01.jpg", name: "Pulse", year: "2024" },
              { src: "https://cdn.prod.website-files.com/67520d315f4e283ed68209b7/676074aa08da6755095bd683_Hero%20Image%20Scale.jpg", name: "Vertex", year: "2024" },
            ].map((project, i) => (
              <div key={i} className="carousel-item absolute rounded-lg overflow-hidden" style={{ width: '120px', height: '160px', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                <img src={project.src} alt={project.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="carousel-label absolute bottom-3 left-3 right-3 flex justify-between items-end opacity-0">
                  <span className="text-white text-sm font-medium">{project.name}</span>
                  <span className="text-white/60 text-xs">{project.year}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Contact Section (text from bottom) ─── */}
      <section
        ref={contactRef}
        className="relative h-screen flex items-center justify-center bg-[#0a0a0a] z-20 -mt-72"
      >
        <div className="px-8 lg:px-16 max-w-5xl mx-auto w-full text-center">
          <a
            href="mailto:hello@rkingg.com"
            className="text-[clamp(2rem,6vw,5rem)] font-medium text-white hover:text-[#e8734a] transition-colors"
          >
          {"hello@rkingg.com".split("").map((char, i) => (
            <span key={i} className="char inline-block overflow-hidden">
              <span className="inline-block">{char === " " ? "\u00A0" : char}</span>
            </span>
          ))}
          </a>
        </div>
      </section>

      {/* Logo Marquee — only on contact */}
      <WorkMarquee />
    </div>
  );
}
