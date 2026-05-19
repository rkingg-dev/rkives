"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { supabase } from "@/lib/supabase";
import type { Database } from "@/lib/supabase/types";

type TableName = keyof Database["public"]["Tables"];

interface UseSupabaseQueryOptions<T extends TableName> {
  table: T;
  columns?: string;
  filters?: Record<string, unknown>;
  orderBy?: { column: string; ascending?: boolean };
  limit?: number;
  enabled?: boolean;
}

export function useSupabaseQuery<T extends TableName>(
  options: UseSupabaseQueryOptions<T>
) {
  const [data, setData] = useState<Database["public"]["Tables"][T]["Row"][]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const mountedRef = useRef(true);

  const fetchData = useCallback(async () => {
    if (options.enabled === false) return;
    setLoading(true);
    setError(null);
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let query = (supabase as any)
        .from(options.table)
        .select(options.columns || "*");

      if (options.filters) {
        for (const [key, value] of Object.entries(options.filters)) {
          if (value !== undefined && value !== null && value !== "") {
            query = query.eq(key, value);
          }
        }
      }

      if (options.orderBy) {
        query = query.order(options.orderBy.column, {
          ascending: options.orderBy.ascending ?? true,
        });
      }

      if (options.limit) {
        query = query.limit(options.limit);
      }

      const { data: result, error: queryError } = await query;

      if (queryError) throw queryError;
      if (mountedRef.current) {
        setData((result || []) as Database["public"]["Tables"][T]["Row"][]);
      }
    } catch (err: unknown) {
      if (mountedRef.current) {
        setError(err instanceof Error ? err.message : "An error occurred");
      }
    } finally {
      if (mountedRef.current) {
        setLoading(false);
      }
    }
  }, [options.table, options.columns, JSON.stringify(options.filters), options.limit, options.orderBy?.column, options.orderBy?.ascending, options.enabled]);

  useEffect(() => {
    mountedRef.current = true;
    fetchData();
    return () => {
      mountedRef.current = false;
    };
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
