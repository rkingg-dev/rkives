"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { ResponsiveGridLayout, verticalCompactor } from "react-grid-layout";
import { widgetRegistry, defaultLayout, defaultVisible } from "@/lib/widget-registry";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Settings, Plus, X, Check, GripVertical, RotateCcw } from "lucide-react";
import "react-grid-layout/css/styles.css";

const STORAGE_LAYOUT = "rkives-dashboard-layout";
const STORAGE_VISIBLE = "rkives-dashboard-visible";

function loadLayout() {
  if (typeof window === "undefined") return defaultLayout;
  try {
    const stored = localStorage.getItem(STORAGE_LAYOUT);
    return stored ? JSON.parse(stored) : defaultLayout;
  } catch { return defaultLayout; }
}

function loadVisible() {
  if (typeof window === "undefined") return defaultVisible;
  try {
    const stored = localStorage.getItem(STORAGE_VISIBLE);
    return stored ? JSON.parse(stored) : defaultVisible;
  } catch { return defaultVisible; }
}

function saveLayout(layout: any[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_LAYOUT, JSON.stringify(layout));
}

function saveVisible(visible: string[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_VISIBLE, JSON.stringify(visible));
}

export default function DashboardBuilder() {
  const [editMode, setEditMode] = useState(false);
  const [layout, setLayout] = useState(defaultLayout);
  const [visible, setVisible] = useState(defaultVisible);
  const [selectorOpen, setSelectorOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(1200);

  useEffect(() => {
    setLayout(loadLayout());
    setVisible(loadVisible());
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setWidth(entry.contentRect.width);
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const handleLayoutChange = useCallback((layout: readonly any[]) => {
    const mutable = layout.map((l) => ({ ...l }));
    setLayout(mutable);
    saveLayout(mutable);
  }, []);

  function toggleWidget(id: string) {
    setVisible((prev) => {
      const next = prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id];
      saveVisible(next);
      return next;
    });
  }

  function resetLayout() {
    setLayout(defaultLayout);
    setVisible(defaultVisible);
    saveLayout(defaultLayout);
    saveVisible(defaultVisible);
    toast.success("Layout reset to default");
  }

  function resizeWidget(id: string, cols: number) {
    setLayout((prev) => {
      const next = prev.map((l) => {
        if (l.i !== id) return l;
        return { ...l, w: cols, x: 0 };
      });
      saveLayout(next);
      return next;
    });
  }

  const activeWidgets = widgetRegistry.filter((w) => visible.includes(w.id));
  const hiddenWidgets = widgetRegistry.filter((w) => !visible.includes(w.id));

  const gridLayout = layout
    .filter((l) => visible.includes(l.i))
    .map((l) => ({
      ...l,
      static: !editMode,
    }));

  return (
    <div ref={containerRef}>
      {/* Edit bar */}
      <div className="flex items-center justify-between mb-4">
        <div />
        <div className="flex items-center gap-2">
          {editMode && (
            <button
              onClick={resetLayout}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground border border-border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset
            </button>
          )}
          <button
            onClick={() => setEditMode(!editMode)}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors",
              editMode
                ? "bg-emerald-500 text-white hover:bg-emerald-600"
                : "bg-card border border-border hover:bg-muted/50 text-foreground"
            )}
          >
            {editMode ? (
              <>
                <Check className="h-3.5 w-3.5" />
                Done
              </>
            ) : (
              <>
                <Settings className="h-3.5 w-3.5" />
                Edit
              </>
            )}
          </button>
        </div>
      </div>

      {/* Widget selector */}
      {editMode && (
        <div className="mb-4 p-4 bg-card rounded-xl border border-border">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-foreground">Widgets</h3>
            {hiddenWidgets.length > 0 && (
              <button
                onClick={() => setSelectorOpen(!selectorOpen)}
                className="flex items-center gap-1 text-xs text-[var(--accent-brand)] hover:underline"
              >
                <Plus className="h-3 w-3" />
                {selectorOpen ? "Hide" : `Add (${hiddenWidgets.length})`}
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2 mb-2">
            {activeWidgets.map((w) => {
              const Icon = w.icon;
              return (
                <div
                  key={w.id}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-muted/50 border border-border text-xs"
                >
                  <Icon className="h-3.5 w-3.5 text-foreground" />
                  <span className="text-foreground">{w.label}</span>
                  <button
                    onClick={() => toggleWidget(w.id)}
                    className="p-0.5 rounded hover:bg-red-500/10 transition-colors"
                  >
                    <X className="h-3 w-3 text-red-500" />
                  </button>
                </div>
              );
            })}
          </div>

          {selectorOpen && hiddenWidgets.length > 0 && (
            <div className="pt-2 border-t border-border">
              <p className="text-[10px] text-muted-foreground mb-2">Available widgets:</p>
              <div className="flex flex-wrap gap-2">
                {hiddenWidgets.map((w) => {
                  const Icon = w.icon;
                  return (
                    <button
                      key={w.id}
                      onClick={() => toggleWidget(w.id)}
                      className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-dashed border-border text-xs hover:border-solid hover:bg-muted/30 transition-colors"
                    >
                      <Plus className="h-3 w-3 text-muted-foreground" />
                      <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-muted-foreground">{w.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Grid */}
      <ResponsiveGridLayout
        layouts={{ lg: gridLayout }}
        breakpoints={{ lg: 1200, md: 996, sm: 768 }}
        cols={{ lg: 12, md: 12, sm: 12 }}
        width={width}
        rowHeight={60}
        margin={[16, 16]}
        containerPadding={[0, 0]}
        compactor={verticalCompactor}
        onLayoutChange={handleLayoutChange}
        dragConfig={{ enabled: editMode, handle: ".drag-handle", threshold: 3, bounded: false, cancel: "" }}
        resizeConfig={{ enabled: editMode, handles: ["se"] }}
      >
        {activeWidgets.map((w) => {
          const WidgetComponent = w.component;
          const currentW = layout.find((l) => l.i === w.id)?.w || w.defaultW;
          const sizes = [
            { label: "25%", cols: 3 },
            { label: "50%", cols: 6 },
            { label: "75%", cols: 9 },
            { label: "100%", cols: 12 },
          ];
          return (
            <div key={w.id} className="relative">
              {editMode && (
                <div className="absolute top-1 left-1 z-10 flex items-center gap-0.5">
                  <div className="drag-handle cursor-grab active:cursor-grabbing p-1 rounded bg-muted/80 hover:bg-muted transition-colors">
                    <GripVertical className="h-3.5 w-3.5 text-muted-foreground" />
                  </div>
                  <div className="flex items-center bg-muted/80 rounded overflow-hidden">
                    {sizes.map((s) => (
                      <button
                        key={s.cols}
                        onClick={() => resizeWidget(w.id, s.cols)}
                        className={cn(
                          "px-1.5 py-1 text-[9px] font-medium transition-colors",
                          currentW === s.cols
                            ? "bg-[var(--accent-brand)] text-white"
                            : "text-muted-foreground hover:bg-muted"
                        )}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <WidgetComponent />
            </div>
          );
        })}
      </ResponsiveGridLayout>
    </div>
  );
}
