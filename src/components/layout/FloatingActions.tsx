"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Plus, X, CheckSquare, CreditCard, StickyNote } from "lucide-react";
import { Modal, ModalTrigger, ModalContent, ModalHeader, ModalTitle, ModalDescription } from "@/components/ui/modal";
import { TaskForm } from "@/components/forms/TaskForm";
import { PaymentForm } from "@/components/forms/PaymentForm";
import { NoteForm } from "@/components/forms/NoteForm";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "rkives-fab-position";

function loadPosition(): { x: number; y: number } {
  if (typeof window === "undefined") return { x: 0, y: 0 };
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : { x: 0, y: 0 };
  } catch { return { x: 0, y: 0 }; }
}

function savePosition(pos: { x: number; y: number }) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(pos));
}

export default function FloatingActions() {
  const [expanded, setExpanded] = useState(false);
  const [taskOpen, setTaskOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [noteOpen, setNoteOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [hasMoved, setHasMoved] = useState(false);
  const bubbleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPosition(loadPosition());
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    setDragging(true);
    setHasMoved(false);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, [position]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging) return;
    const dx = Math.abs(e.clientX - dragStart.x - position.x);
    const dy = Math.abs(e.clientY - dragStart.y - position.y);
    if (dx > 5 || dy > 5) setHasMoved(true);
    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;
    setPosition({ x: newX, y: newY });
  }, [dragging, dragStart, position]);

  const handlePointerUp = useCallback(() => {
    if (dragging) {
      setDragging(false);
      savePosition(position);
    }
  }, [dragging, position]);

  function handleClick() {
    if (!hasMoved) {
      setExpanded(!expanded);
    }
  }

  function handleAction(action: () => void) {
    setExpanded(false);
    action();
  }

  const actions = [
    { label: "Task", icon: CheckSquare, onClick: () => handleAction(() => setTaskOpen(true)), color: "bg-blue-500" },
    { label: "Payment", icon: CreditCard, onClick: () => handleAction(() => setPaymentOpen(true)), color: "bg-emerald-500" },
    { label: "Note", icon: StickyNote, onClick: () => handleAction(() => setNoteOpen(true)), color: "bg-amber-500" },
  ];

  return (
    <>
      <div
        ref={bubbleRef}
        className="fixed z-[90] select-none"
        style={position.x === 0 && position.y === 0
          ? { right: 20, bottom: 20 }
          : { left: position.x, top: position.y }
        }
      >
        {/* Expanded actions */}
        {expanded && (
          <div className="absolute bottom-16 right-0 flex flex-col gap-2 items-end mb-1">
            {actions.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.label}
                  onClick={action.onClick}
                  className="flex items-center gap-2 px-3 py-2 bg-card border border-border rounded-xl shadow-lg text-xs font-medium hover:bg-muted/50 transition-colors whitespace-nowrap"
                >
                  <Icon className="h-4 w-4" />
                  {action.label}
                </button>
              );
            })}
          </div>
        )}

        {/* Main bubble */}
        <div
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onClick={handleClick}
          className={cn(
            "h-12 w-12 rounded-full shadow-lg flex items-center justify-center cursor-grab active:cursor-grabbing transition-all duration-200",
            expanded
              ? "bg-muted border border-border rotate-45"
              : "bg-foreground hover:opacity-90"
          )}
        >
          {expanded ? (
            <X className="h-5 w-5 text-foreground" />
          ) : (
            <Plus className="h-5 w-5 text-primary-foreground" />
          )}
        </div>
      </div>

      {/* Modals */}
      <Modal open={taskOpen} onOpenChange={setTaskOpen}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Quick Add Task</ModalTitle>
            <ModalDescription>Create a new task.</ModalDescription>
          </ModalHeader>
          <TaskForm onSuccess={() => { setTaskOpen(false); toast.success("Task created"); }} />
        </ModalContent>
      </Modal>

      <Modal open={paymentOpen} onOpenChange={setPaymentOpen}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Quick Add Payment</ModalTitle>
            <ModalDescription>Record a new payment.</ModalDescription>
          </ModalHeader>
          <PaymentForm onSuccess={() => { setPaymentOpen(false); toast.success("Payment recorded"); }} />
        </ModalContent>
      </Modal>

      <Modal open={noteOpen} onOpenChange={setNoteOpen}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Quick Add Note</ModalTitle>
            <ModalDescription>Create a new note.</ModalDescription>
          </ModalHeader>
          <NoteForm onSuccess={() => { setNoteOpen(false); toast.success("Note created"); }} />
        </ModalContent>
      </Modal>
    </>
  );
}
