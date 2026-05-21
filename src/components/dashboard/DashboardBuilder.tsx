"use client";

import { useState, useEffect, useCallback } from "react";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const RGL = require("react-grid-layout");
const ResponsiveGrid = RGL.WidthProvider(RGL.Responsive);
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

  useEffect(() => {
    setLayout(loadLayout());
    setVisible(loadVisible());
  }, []);

  const handleLayoutChange = useCallback((newLayout: any[]) => {
    setLayout(newLayout);
    saveLayout(newLayout);
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

  const activeWidgets = widgetRegistry.filter((w) => visible.includes(w.id));
  const hiddenWidgets = widgetRegistry.filter((w) => !visible.includes(w.id));

  // Grid layout for react-grid-layout
  const gridLayout = layout
    .filter((l) => visible.includes(l.i))
    .map((l) => ({
      ...l,
      static: !editMode,
    }));

  return (
    <div>
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

      {/* Widget selector (in edit mode) */}
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

          {/* Active widgets */}
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

          {/* Hidden widgets to add */}
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
      <ResponsiveGrid
        layouts={{ lg: gridLayout }}
        breakpoints={{ lg: 1200, md: 996, sm: 768 }}
        cols={{ lg: 12, md: 12, sm: 12 }}
        rowHeight={50}
        margin={[16, 16]}
        containerPadding={[0, 0]}
        onLayoutChange={(newLayout: any[]) => handleLayoutChange(newLayout)}
        isDraggable={editMode}
        isResizable={editMode}
        draggableHandle=".drag-handle"
        compactType="vertical"
        useCSSTransforms
      >
        {activeWidgets.map((w) => {
          const WidgetComponent = w.component;
          return (
            <div key={w.id} className="relative">
              {editMode && (
                <div className="drag-handle absolute top-1 left-1 z-10 cursor-grab active:cursor-grabbing p-1 rounded bg-muted/80 hover:bg-muted transition-colors">
                  <GripVertical className="h-3.5 w-3.5 text-muted-foreground" />
                </div>
              )}
              <WidgetComponent />
            </div>
          );
        })}
      </ResponsiveGrid>
    </div>
  );
}
