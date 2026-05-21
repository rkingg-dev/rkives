"use client";

import { useState, useEffect } from "react";
import { StickyNote, Save } from "lucide-react";
import { toast } from "sonner";

const STORAGE_KEY = "rkives-dashboard-scratchpad";

export default function QuickNotes() {
  const [content, setContent] = useState("");
  const [saved, setSaved] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setContent(stored);
  }, []);

  function handleChange(value: string) {
    setContent(value);
    setSaved(false);
  }

  function handleSave() {
    localStorage.setItem(STORAGE_KEY, content);
    setSaved(true);
    toast.success("Scratchpad saved");
  }

  return (
    <div className="bg-card rounded-xl border border-border shadow-sm p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <StickyNote className="h-4 w-4 text-[var(--accent-brand)]" />
          Quick Notes
        </h3>
        <button
          onClick={handleSave}
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <Save className="h-3 w-3" />
          {saved ? "Saved" : "Save"}
        </button>
      </div>
      <textarea
        value={content}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Quick scratchpad — jot anything here..."
        className="w-full h-28 resize-none rounded-lg border border-border bg-muted/30 p-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
      />
    </div>
  );
}
