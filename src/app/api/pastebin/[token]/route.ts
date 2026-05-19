import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

async function sha256(message: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, "0")).join("");
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;
  const password = request.nextUrl.searchParams.get("password");
  const supabase = createServerClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sb = supabase as any;

  const { data, error } = await sb
    .from("pastebin_entries")
    .select("*")
    .eq("share_token", token)
    .eq("is_public", true)
    .single() as { data: { password_hash: string | null; expires_at: string | null; title: string; id: string; [key: string]: unknown } | null; error: unknown };

  if (error || !data) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (data.expires_at && new Date(data.expires_at) < new Date()) {
    return NextResponse.json({ error: "Expired" }, { status: 410 });
  }

  // If password protected and no password provided
  if (data.password_hash && !password) {
    return NextResponse.json({ requiresPassword: true, title: data.title, id: data.id });
  }

  // If password provided, verify it
  if (data.password_hash && password) {
    const hash = await sha256(password);
    if (hash !== data.password_hash) {
      return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
    }
  }

  return NextResponse.json(data);
}
