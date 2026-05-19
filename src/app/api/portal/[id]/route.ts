import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = createServerClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sb = supabase as any;

  const { data: client } = await sb.from("clients").select("*").eq("id", id).single();
  if (!client) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const [websitesRes, tasksRes, paymentsRes] = await Promise.all([
    sb.from("websites").select("*").eq("client_id", id),
    sb.from("tasks").select("*").in("website_id",
      (await sb.from("websites").select("id").eq("client_id", id)).data?.map((w: any) => w.id) || []
    ).order("created_at", { ascending: false }).limit(10),
    sb.from("payments").select("*").eq("client_id", id).order("created_at", { ascending: false }).limit(10),
  ]);

  return NextResponse.json({
    client,
    websites: websitesRes.data || [],
    tasks: tasksRes.data || [],
    payments: paymentsRes.data || [],
  });
}
