"use client";

import { useState } from "react";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/supabase/auth";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error: authError } = await signIn(email, password);

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="mx-auto mb-4">
            <svg className="h-12 w-12" viewBox="0 0 64 64" fill="none" aria-hidden="true">
              <path d="M16 54V25.5C16 14.6 22.7 7 32 7s16 7.6 16 18.5V54l-4.6-3.4L38.8 54l-4.6-3.4L29.6 54 25 50.6 20.4 54 16 50.6Z" fill="currentColor" className="text-foreground" />
              <path d="M21.5 29.2c3.1-2.5 7.4-2.9 11-.9l-1.2 5.2c-3.4-1-6.8-.7-10.1.9l.3-5.2Zm15.9-.9c3.7-2 8-1.6 11.1.9l.3 5.2c-3.3-1.6-6.7-1.9-10.1-.9l-1.3-5.2Z" fill="#f97316" />
              <path d="M34 30.6c1.5-.5 3.1-.5 4.6 0" stroke="#f97316" strokeWidth="2" strokeLinecap="round" />
              <path d="M31 41.5c2.2 1.1 4.6 1.1 6.8 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-foreground" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-foreground">rkives</h1>
          <p className="text-sm text-muted-foreground mt-1">Sign in to your workspace</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {error && (
            <div className="p-3 rounded-md bg-red-500/10 border border-red-500/20 text-sm text-red-500">
              {error}
            </div>
          )}

          <div>
            <label className="text-xs text-muted-foreground uppercase tracking-wider">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="rking@rkives.io"
              required
              className="mt-1.5 w-full h-11 rounded-md border border-border bg-card px-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[var(--accent-brand)] focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="text-xs text-muted-foreground uppercase tracking-wider">Password</label>
            <div className="relative mt-1.5">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full h-11 rounded-md border border-border bg-card px-4 pr-11 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[var(--accent-brand)] focus:border-transparent transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-muted transition-colors"
              >
                {showPassword ? <EyeOff className="h-4 w-4 text-muted-foreground" /> : <Eye className="h-4 w-4 text-muted-foreground" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded" />
              <span className="text-sm text-muted-foreground">Remember me</span>
            </label>
            <button type="button" className="text-sm text-[var(--accent-brand)] hover:underline">
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 w-full h-11 bg-foreground text-primary-foreground rounded-lg text-sm font-medium hover:bg-foreground/90 transition-colors disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign in"} <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        <p className="text-center text-xs text-muted-foreground mt-8">
          Built by <span className="text-foreground font-medium">rkingg</span>
        </p>
      </div>
    </div>
  );
}
