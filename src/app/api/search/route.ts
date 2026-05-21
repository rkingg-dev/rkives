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
  const [clients, websites, tasks, notes, payments, projects] = await Promise.all([
    sb.from("clients").select("*").ilike("name", pattern).limit(5),
    sb.from("websites").select("*").ilike("name", pattern).limit(5),
    sb.from("tasks").select("*").ilike("title", pattern).limit(5),
    sb.from("notes").select("*").ilike("title", pattern).limit(5),
    sb.from("payments").select("*, clients(name)").limit(5),
    sb.from("projects").select("*").ilike("name", pattern).limit(5),
  ]);

  const results = [
    ...(clients.data?.map((c: Record<string, unknown>) => ({ id: c.id, title: c.name, subtitle: c.company, type: "client", href: `/dashboard/clients/${c.id}` })) || []),
    ...(websites.data?.map((w: Record<string, unknown>) => ({ id: w.id, title: w.name, subtitle: w.url, type: "website", href: `/dashboard/websites/${w.id}` })) || []),
    ...(tasks.data?.map((t: Record<string, unknown>) => ({ id: t.id, title: t.title, subtitle: `${t.status} · ${t.priority}`, type: "task", href: "/dashboard/tasks" })) || []),
    ...(notes.data?.map((n: Record<string, unknown>) => ({ id: n.id, title: n.title, subtitle: n.slug, type: "note", href: "/dashboard/notes" })) || []),
    ...(payments.data?.filter((p: Record<string, string>) => {
      const amount = String(p.amount || "");
      const ref = String(p.reference_number || "");
      return amount.includes(query) || ref.toLowerCase().includes(query.toLowerCase());
    }).map((p: Record<string, unknown>) => ({
      id: p.id,
      title: `₱${Number(p.amount).toLocaleString()} payment`,
      subtitle: (p.clients as Record<string, string>)?.name || p.billing_period,
      type: "payment",
      href: "/dashboard/payments",
    })) || []),
    ...(projects.data?.map((p: Record<string, unknown>) => ({ id: p.id, title: p.name, subtitle: `${p.status} · ${p.progress}%`, type: "project", href: "/dashboard/projects" })) || []),
  ];

  return NextResponse.json({ results });
}
