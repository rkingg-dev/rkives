import { NextResponse } from "next/server";

export async function GET() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return NextResponse.json({ error: "No GitHub token configured" }, { status: 500 });
  }

  const res = await fetch("https://api.github.com/user/pulls?state=open&per_page=20", {
    headers: {
      Authorization: `token ${token}`,
      Accept: "application/vnd.github.v3+json",
    },
  });

  const pulls = await res.json();
  return NextResponse.json(pulls);
}
