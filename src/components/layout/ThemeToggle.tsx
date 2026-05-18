"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const isDark = stored === "dark" || (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches);
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  }

  return (
    <button
      onClick={toggle}
      className="relative h-7 w-12 rounded-full bg-muted border border-border transition-colors duration-300"
      aria-label="Toggle dark mode"
    >
      <motion.div
        className="absolute top-0.5 left-0.5 h-6 w-6 rounded-full bg-card border border-border shadow-sm flex items-center justify-center"
        animate={{ x: dark ? 20 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        <span className="text-xs">{dark ? "\u263E" : "\u2600"}</span>
      </motion.div>
    </button>
  );
}
