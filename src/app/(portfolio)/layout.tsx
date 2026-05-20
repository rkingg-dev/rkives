import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const neueMontreal = localFont({
  src: [
    { path: "../../../public/fonts/neue-montreal/PPNeueMontreal-Hairline.otf", weight: "100", style: "normal" },
    { path: "../../../public/fonts/neue-montreal/PPNeueMontreal-HairlineItalic.otf", weight: "100", style: "italic" },
    { path: "../../../public/fonts/neue-montreal/PPNeueMontreal-Light.otf", weight: "300", style: "normal" },
    { path: "../../../public/fonts/neue-montreal/PPNeueMontreal-LightItalic.otf", weight: "300", style: "italic" },
    { path: "../../../public/fonts/neue-montreal/PPNeueMontreal-Regular.otf", weight: "400", style: "normal" },
    { path: "../../../public/fonts/neue-montreal/PPNeueMontreal-Italic.otf", weight: "400", style: "italic" },
    { path: "../../../public/fonts/neue-montreal/PPNeueMontrealText-Book.otf", weight: "450", style: "normal" },
    { path: "../../../public/fonts/neue-montreal/PPNeueMontrealText-BookItalic.otf", weight: "450", style: "italic" },
    { path: "../../../public/fonts/neue-montreal/PPNeueMontreal-Semibold.otf", weight: "600", style: "normal" },
    { path: "../../../public/fonts/neue-montreal/PPNeueMontreal-SemiboldItalic.otf", weight: "600", style: "italic" },
    { path: "../../../public/fonts/neue-montreal/PPNeueMontreal-Extrabold.otf", weight: "800", style: "normal" },
    { path: "../../../public/fonts/neue-montreal/PPNeueMontreal-ExtraboldItalic.otf", weight: "800", style: "italic" },
  ],
  display: "swap",
  variable: "--font-neue-montreal",
});

export const metadata: Metadata = {
  title: "RKINGG//",
  description: "Portfolio and digital work by Roman King Garcia.",
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`min-h-screen bg-[#0a0a0a] text-white overflow-hidden ${neueMontreal.variable}`} style={{ fontFamily: "var(--font-neue-montreal)" }}>
      {children}
    </div>
  );
}
