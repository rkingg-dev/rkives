"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import type { Database } from "@/lib/supabase/types";

type TableName = keyof Database["public"]["Tables"];

export function useSupabaseMutation<T extends TableName>(table: T) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function insert(row: any) {
    setLoading(true);
    setError(null);
    try {
      const { data, error: queryError } = await (supabase as any)
        .from(table)
        .insert(row)
        .select()
        .single();
      if (queryError) throw queryError;
      return data as Database["public"]["Tables"][T]["Row"];
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Insert failed";
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function update(id: string, row: any) {
    setLoading(true);
    setError(null);
    try {
      const { data, error: queryError } = await (supabase as any)
        .from(table)
        .update(row)
        .eq("id", id)
        .select()
        .single();
      if (queryError) throw queryError;
      return data as Database["public"]["Tables"][T]["Row"];
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Update failed";
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }

  async function remove(id: string) {
    setLoading(true);
    setError(null);
    try {
      const { error: queryError } = await (supabase as any)
        .from(table)
        .delete()
        .eq("id", id);
      if (queryError) throw queryError;
      return true;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Delete failed";
      setError(message);
      return false;
    } finally {
      setLoading(false);
    }
  }

  return { insert, update, remove, loading, error };
}
