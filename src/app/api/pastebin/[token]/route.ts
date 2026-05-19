import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: { token: string } }
) {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from("pastebin_entries")
    .select("*")
    .eq("share_token", params.token)
    .eq("is_public", true)
    .single() as { data: { expires_at: string | null; [key: string]: unknown } | null; error: unknown };

  if (error || !data) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (data.expires_at && new Date(data.expires_at) < new Date()) {
    return NextResponse.json({ error: "Expired" }, { status: 410 });
  }

  return NextResponse.json(data);
}
