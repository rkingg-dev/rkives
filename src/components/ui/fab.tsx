"use client";

import { useState } from "react";
import { Plus, X, CheckSquare, CreditCard, StickyNote, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

const actions = [
  { label: "New Task", icon: CheckSquare, href: "/dashboard/tasks" },
  { label: "Record Payment", icon: CreditCard, href: "/dashboard/payments" },
  { label: "Add Note", icon: StickyNote, href: "/dashboard/notes" },
  { label: "Add Website", icon: Globe, href: "/dashboard/websites" },
];

export default function Fab() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <div className="fixed bottom-6 right-6 z-50 md:hidden">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-14 right-0 bg-card border border-border rounded-xl shadow-lg p-2 mb-2 min-w-[160px]"
          >
            {actions.map((a) => (
              <button
                key={a.label}
                onClick={() => { router.push(a.href); setOpen(false); }}
                className="flex items-center gap-2 w-full px-3 py-2.5 text-sm text-foreground hover:bg-muted rounded-lg transition-colors"
              >
                <a.icon className="h-4 w-4 text-muted-foreground" />
                {a.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen(!open)}
        className="h-14 w-14 rounded-full bg-foreground text-primary-foreground shadow-lg flex items-center justify-center hover:opacity-90 transition-opacity"
      >
        {open ? <X className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
      </button>
    </div>
  );
}
