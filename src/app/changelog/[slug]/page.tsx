import { createServerClient } from "@/lib/supabase/server";

export default async function PublicChangelogPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = createServerClient();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sb = supabase as any;
  const { data: website } = await sb
    .from("websites")
    .select("*")
    .eq("slug", slug)
    .single();

  const { data: entries } = await sb
    .from("changelog_entries")
    .select("*")
    .eq("website_id", website?.id)
    .eq("is_published", true)
    .order("published_at", { ascending: false });

  if (!website) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Website not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto py-16 px-6">
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-foreground">{website.name}</h1>
          <p className="text-muted-foreground mt-2">Changelog & updates</p>
        </div>

        {!entries || entries.length === 0 ? (
          <p className="text-muted-foreground">No updates yet.</p>
        ) : (
          <div className="space-y-8">
            {entries.map((entry: { id: string; published_at: string; version: string; entry_type: string; title: string; content: string }) => (
              <div key={entry.id} className="border-l-2 border-border pl-6">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-semibold text-muted-foreground">
                    {entry.published_at ? new Date(entry.published_at).toLocaleDateString() : ""}
                  </span>
                  {entry.version && (
                    <span className="text-xs font-mono bg-muted px-2 py-0.5 rounded">{entry.version}</span>
                  )}
                  <span className="text-xs font-medium text-muted-foreground">{entry.entry_type}</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground">{entry.title}</h3>
                <p className="text-sm text-muted-foreground mt-1 whitespace-pre-wrap">{entry.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
