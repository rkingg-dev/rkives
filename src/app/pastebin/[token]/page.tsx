"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { hashPassword } from "@/lib/crypto";
import { Lock, Code } from "lucide-react";

export default function PublicPastePage() {
  const params = useParams();
  const token = params.token as string;
  const [paste, setPaste] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [pwError, setPwError] = useState("");
  const [copying, setCopying] = useState(false);
  const [highlighted, setHighlighted] = useState("");

  useEffect(() => {
    fetch(`/api/pastebin/${token}`)
      .then(r => r.json())
      .then(data => {
        if (data.error === "Not found") {
          setError("Paste not found or has expired.");
        } else if (data.requiresPassword) {
          setPaste(data);
          setAuthenticated(false);
        } else {
          setPaste(data);
          setAuthenticated(true);
        }
        setLoading(false);
      })
      .catch(() => { setError("Failed to load paste"); setLoading(false); });
  }, [token]);

  useEffect(() => {
    if (paste?.content && paste?.language) {
      import("shiki").then(({ codeToHtml }) => {
        codeToHtml(paste.content, { lang: paste.language === "js" ? "javascript" : paste.language, theme: "github-dark" })
          .then((html) => setHighlighted(html))
          .catch(() => setHighlighted(""));
      });
    }
  }, [paste]);

  async function handlePassword(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch(`/api/pastebin/${token}?password=${encodeURIComponent(password)}`);
    const data = await res.json();
    if (data.error) {
      setPwError("Incorrect password");
    } else {
      setPaste(data);
      setAuthenticated(true);
    }
  }

  function handleCopy() {
    if (paste?.content) {
      navigator.clipboard.writeText(paste.content);
      setCopying(true);
      setTimeout(() => setCopying(false), 2000);
    }
  }

  if (loading) return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <p className="text-muted-foreground">Loading...</p>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <p className="text-muted-foreground">{error}</p>
    </div>
  );

  if (!authenticated) return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="w-full max-w-sm text-center">
        <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
          <Lock className="h-5 w-5 text-muted-foreground" />
        </div>
        <h2 className="text-lg font-semibold text-foreground mb-1">Password Protected</h2>
        <p className="text-sm text-muted-foreground mb-6">Enter the password to view this paste.</p>
        <form onSubmit={handlePassword} className="space-y-3">
          {pwError && <p className="text-sm text-red-500">{pwError}</p>}
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" className="w-full h-11 rounded-md border border-border bg-card px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent-brand)]" autoFocus />
          <button type="submit" className="w-full h-11 bg-foreground text-primary-foreground rounded-lg text-sm font-medium hover:bg-foreground/90 transition-colors">View Paste</button>
        </form>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="w-full max-w-3xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Code className="h-5 w-5 text-muted-foreground" />
            <h1 className="text-xl font-bold text-foreground">{paste.title}</h1>
            <span className="text-xs bg-muted px-2 py-0.5 rounded text-muted-foreground">{paste.language}</span>
          </div>
          <button onClick={handleCopy} className="px-3 py-1.5 text-xs font-medium rounded-md bg-muted hover:bg-muted/80 transition-colors">
            {copying ? "Copied!" : "Copy"}
          </button>
        </div>
        {highlighted ? (
          <div dangerouslySetInnerHTML={{ __html: highlighted }} className="bg-card border border-border rounded-xl overflow-hidden text-sm [&_pre]:p-6 [&_pre]:overflow-x-auto [&_pre]:leading-relaxed" />
        ) : (
          <pre className="bg-card border border-border rounded-xl p-6 overflow-x-auto text-sm font-mono text-foreground leading-relaxed">
            <code>{paste.content}</code>
          </pre>
        )}
        <div className="mt-8 pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground">Shared via rkives</p>
        </div>
      </div>
    </div>
  );
}
