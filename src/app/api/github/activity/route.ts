import { NextResponse } from "next/server";

export async function GET() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return NextResponse.json({ error: "No GitHub token configured" }, { status: 500 });
  }

  const res = await fetch("https://api.github.com/user/events/public?per_page=30", {
    headers: {
      Authorization: `token ${token}`,
      Accept: "application/vnd.github.v3+json",
    },
  });

  const events = await res.json();
  return NextResponse.json(events);
}
