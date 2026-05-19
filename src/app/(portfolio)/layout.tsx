import type { Metadata } from "next";

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
    <div className="min-h-screen bg-gray-950">
      {children}
    </div>
  );
}
