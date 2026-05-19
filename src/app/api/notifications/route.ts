import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = createServerClient();

  const now = new Date();
  const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString();

  const [dueTasks, expiringDomains, pendingPayments] = await Promise.all([
    supabase
      .from("tasks")
      .select("id, title, due_date, priority, website_id")
      .lte("due_date", weekFromNow)
      .not("status", "eq", "Done")
      .order("due_date", { ascending: true })
      .limit(5),
    supabase
      .from("websites")
      .select("id, name, domain_name, domain_expiry")
      .lte("domain_expiry", weekFromNow.split("T")[0])
      .limit(3),
    supabase
      .from("payments")
      .select("id, amount, client_id, billing_period")
      .eq("status", "Pending")
      .limit(3),
  ]);

  return NextResponse.json({
    dueTasks: dueTasks.data || [],
    expiringDomains: expiringDomains.data || [],
    pendingPayments: pendingPayments.data || [],
  });
}
