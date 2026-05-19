"use client";

import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  pageSize: number;
  onPageSizeChange: (size: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange, totalItems, pageSize, onPageSizeChange }: PaginationProps) {
  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, totalItems);

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const visiblePages = pages.filter((p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1);

  return (
    <div className="flex items-center justify-between px-5 py-3 border-t border-border">
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground">Show</span>
        <div className="flex gap-1 bg-card border border-border rounded-lg p-0.5">
          {[10, 25, 50].map((size) => (
            <button
              key={size}
              onClick={() => onPageSizeChange(size)}
              className={cn(
                "px-2 py-1 text-xs font-medium rounded-md transition-colors",
                pageSize === size ? "bg-[var(--accent-brand)] text-white shadow-sm" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {size}
            </button>
          ))}
        </div>
        <span className="text-xs text-muted-foreground">
          {start}\u2013{end} of {totalItems}
        </span>
      </div>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="h-8 w-8 flex items-center justify-center rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground hover:bg-muted transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        {visiblePages.map((page, i) => {
          const prev = visiblePages[i - 1];
          const showEllipsis = prev && page - prev > 1;
          return (
            <span key={page} className="flex items-center gap-1">
              {showEllipsis && <span className="text-xs text-muted-foreground px-1">...</span>}
              <button
                onClick={() => onPageChange(page)}
                className={cn(
                  "h-8 w-8 flex items-center justify-center rounded-lg border text-xs font-medium transition-colors",
                  currentPage === page
                    ? "bg-muted border-border text-foreground shadow-sm"
                    : "bg-card border-border text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                {page}
              </button>
            </span>
          );
        })}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="h-8 w-8 flex items-center justify-center rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground hover:bg-muted transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
