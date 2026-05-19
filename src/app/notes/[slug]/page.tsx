"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { hashPassword } from "@/lib/crypto";
import { Lock, FileText } from "lucide-react";

export default function PublicNotePage() {
  const params = useParams();
  const slug = params.slug as string;
  const [note, setNote] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [pwError, setPwError] = useState("");

  useEffect(() => {
    fetch(`/api/notes/${slug}`)
      .then(r => r.json())
      .then(data => {
        if (data.error) {
          setError(data.error);
        } else {
          setNote(data);
          if (!data.password_hash) setAuthenticated(true);
        }
        setLoading(false);
      })
      .catch(() => { setError("Failed to load note"); setLoading(false); });
  }, [slug]);

  async function handlePassword(e: React.FormEvent) {
    e.preventDefault();
    const hash = await hashPassword(password);
    if (hash === note.password_hash) {
      setAuthenticated(true);
      setPwError("");
    } else {
      setPwError("Incorrect password");
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
        <p className="text-sm text-muted-foreground mb-6">Enter the password to view this note.</p>
        <form onSubmit={handlePassword} className="space-y-3">
          {pwError && <p className="text-sm text-red-500">{pwError}</p>}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full h-11 rounded-md border border-border bg-card px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent-brand)]"
            autoFocus
          />
          <button type="submit" className="w-full h-11 bg-foreground text-primary-foreground rounded-lg text-sm font-medium hover:bg-foreground/90 transition-colors">
            View Note
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="w-full max-w-2xl">
        <div className="mb-8 flex items-center gap-3">
          <FileText className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Shared note</span>
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-4">{note.title}</h1>
        {note.tags && note.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {note.tags.map((tag: string) => (
              <span key={tag} className="text-xs bg-muted px-2 py-1 rounded-md text-muted-foreground">{tag}</span>
            ))}
          </div>
        )}
        <div className="prose prose-invert max-w-none">
          <p className="text-foreground whitespace-pre-wrap leading-relaxed">{note.content}</p>
        </div>
        <div className="mt-12 pt-6 border-t border-border">
          <p className="text-xs text-muted-foreground">Shared via rkives</p>
        </div>
      </div>
    </div>
  );
}
