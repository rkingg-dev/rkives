import type { Metadata } from "next";
import "./globals.css";

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
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden">
      {children}
    </div>
  );
}
