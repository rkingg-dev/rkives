import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.trim();

  if (!query || query.length < 2) {
    return NextResponse.json({ results: [] });
  }

  const supabase = createServerClient();
  const pattern = `%${query}%`;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sb = supabase as any;
  const [clients, websites, tasks, notes] = await Promise.all([
    sb.from("clients").select("*").ilike("name", pattern).limit(5),
    sb.from("websites").select("*").ilike("name", pattern).limit(5),
    sb.from("tasks").select("*").ilike("title", pattern).limit(5),
    sb.from("notes").select("*").ilike("title", pattern).limit(5),
  ]);

  const results = [
    ...(clients.data?.map((c: Record<string, unknown>) => ({ id: c.id, title: c.name, subtitle: c.company, type: "client", href: "/dashboard/clients" })) || []),
    ...(websites.data?.map((w: Record<string, unknown>) => ({ id: w.id, title: w.name, subtitle: w.url, type: "website", href: "/dashboard/websites" })) || []),
    ...(tasks.data?.map((t: Record<string, unknown>) => ({ id: t.id, title: t.title, subtitle: t.status, type: "task", href: "/dashboard/tasks" })) || []),
    ...(notes.data?.map((n: Record<string, unknown>) => ({ id: n.id, title: n.title, subtitle: n.slug, type: "note", href: "/dashboard/notes" })) || []),
  ];

  return NextResponse.json({ results });
}
