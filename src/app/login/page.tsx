"use client";

import { useState } from "react";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-foreground relative overflow-hidden items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-transparent to-pink-500/20" />
        <div className="relative z-10 text-center">
          <div className="h-16 w-16 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-6">
            <svg className="h-10 w-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 10h.01M15 10h.01M12 2a8 8 0 0 0-8 8v4l-2 2h20l-2-2v-4a8 8 0 0 0-8-8z" fill="currentColor" stroke="none"/>
              <rect x="7" y="13" width="10" height="3" rx="1.5" fill="currentColor" stroke="none"/>
              <circle cx="9.5" cy="10.5" r="1" fill="currentColor" stroke="none"/>
              <circle cx="14.5" cy="10.5" r="1" fill="currentColor" stroke="none"/>
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">rkives</h1>
          <p className="text-white/60 text-sm max-w-xs mx-auto">Your personal web development workspace. Manage clients, websites, tasks, and more.</p>
        </div>
        {/* Decorative circles */}
        <div className="absolute top-20 left-20 h-32 w-32 rounded-full border border-white/10" />
        <div className="absolute bottom-32 right-16 h-48 w-48 rounded-full border border-white/5" />
        <div className="absolute top-1/3 right-1/4 h-20 w-20 rounded-full bg-orange-500/10" />
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-3 mb-10">
            <div className="h-10 w-10 rounded-xl bg-foreground flex items-center justify-center">
              <svg className="h-6 w-6 text-primary-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 10h.01M15 10h.01M12 2a8 8 0 0 0-8 8v4l-2 2h20l-2-2v-4a8 8 0 0 0-8-8z" fill="currentColor" stroke="none"/>
                <rect x="7" y="13" width="10" height="3" rx="1.5" fill="currentColor" stroke="none"/>
                <circle cx="9.5" cy="10.5" r="1" fill="currentColor" stroke="none"/>
                <circle cx="14.5" cy="10.5" r="1" fill="currentColor" stroke="none"/>
              </svg>
            </div>
            <span className="text-lg font-semibold text-foreground">rkives</span>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground">Welcome back</h2>
            <p className="text-sm text-muted-foreground mt-1">Sign in to your workspace</p>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="text-[11px] text-muted-foreground uppercase tracking-wider">Email</label>
              <input
                type="email"
                placeholder="rking@rkives.io"
                className="mt-1.5 w-full h-11 rounded-xl border border-border bg-card px-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[var(--accent-brand)] focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="text-[11px] text-muted-foreground uppercase tracking-wider">Password</label>
              <div className="relative mt-1.5">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full h-11 rounded-xl border border-border bg-card px-4 pr-11 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[var(--accent-brand)] focus:border-transparent transition-all"
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

            <Link
              href="/dashboard"
              className="flex items-center justify-center gap-2 w-full h-11 bg-foreground text-primary-foreground rounded-xl text-sm font-medium hover:bg-foreground/90 transition-colors"
            >
              Sign in <ArrowRight className="h-4 w-4" />
            </Link>
          </form>

          <div className="mt-8 pt-6 border-t border-border text-center">
            <p className="text-xs text-muted-foreground">
              Built by <span className="text-foreground font-medium">rkingg</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
