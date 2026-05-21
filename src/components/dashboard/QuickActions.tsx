"use client";

import { useState } from "react";
import { CheckSquare, CreditCard, StickyNote } from "lucide-react";
import { Modal, ModalTrigger, ModalContent, ModalHeader, ModalTitle, ModalDescription } from "@/components/ui/modal";
import { TaskForm } from "@/components/forms/TaskForm";
import { PaymentForm } from "@/components/forms/PaymentForm";
import { NoteForm } from "@/components/forms/NoteForm";
import { toast } from "sonner";

export default function QuickActions() {
  const [taskOpen, setTaskOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [noteOpen, setNoteOpen] = useState(false);

  return (
    <div className="flex items-center gap-2">
      <Modal open={taskOpen} onOpenChange={setTaskOpen}>
        <ModalTrigger asChild>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-card border border-border rounded-lg hover:bg-muted/50 transition-colors">
            <CheckSquare className="h-3.5 w-3.5" />
            Task
          </button>
        </ModalTrigger>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Quick Add Task</ModalTitle>
            <ModalDescription>Create a new task.</ModalDescription>
          </ModalHeader>
          <TaskForm onSuccess={() => { setTaskOpen(false); toast.success("Task created"); }} />
        </ModalContent>
      </Modal>

      <Modal open={paymentOpen} onOpenChange={setPaymentOpen}>
        <ModalTrigger asChild>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-card border border-border rounded-lg hover:bg-muted/50 transition-colors">
            <CreditCard className="h-3.5 w-3.5" />
            Payment
          </button>
        </ModalTrigger>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Quick Add Payment</ModalTitle>
            <ModalDescription>Record a new payment.</ModalDescription>
          </ModalHeader>
          <PaymentForm onSuccess={() => { setPaymentOpen(false); toast.success("Payment recorded"); }} />
        </ModalContent>
      </Modal>

      <Modal open={noteOpen} onOpenChange={setNoteOpen}>
        <ModalTrigger asChild>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-card border border-border rounded-lg hover:bg-muted/50 transition-colors">
            <StickyNote className="h-3.5 w-3.5" />
            Note
          </button>
        </ModalTrigger>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Quick Add Note</ModalTitle>
            <ModalDescription>Create a new note.</ModalDescription>
          </ModalHeader>
          <NoteForm onSuccess={() => { setNoteOpen(false); toast.success("Note created"); }} />
        </ModalContent>
      </Modal>
    </div>
  );
}
