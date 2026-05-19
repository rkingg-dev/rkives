export interface InvoiceData {
  id: string;
  number: string;
  date: string;
  dueDate: string;
  from: { name: string; email: string; company: string };
  to: { name: string; email: string; company: string };
  items: { description: string; qty: number; rate: number; amount: number }[];
  subtotal: number;
  tax: number;
  total: number;
  status: string;
  notes: string;
}

export function generateInvoiceNumber(paymentId: string): string {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const short = paymentId.slice(0, 4).toUpperCase();
  return `INV-${year}${month}-${short}`;
}

export function buildInvoiceFromPayment(payment: any, client: any, site: any): InvoiceData {
  return {
    id: payment.id,
    number: generateInvoiceNumber(payment.id),
    date: payment.created_at?.split("T")[0] || new Date().toLocaleDateString(),
    dueDate: payment.paid_at?.split("T")[0] || "Upon receipt",
    from: {
      name: "R King Garcia",
      email: "rking@rkives.io",
      company: "RKives",
    },
    to: {
      name: client?.name || "Client",
      email: client?.email || "",
      company: client?.company || "",
    },
    items: [
      {
        description: `${payment.payment_type}${site ? ` — ${site.name}` : ""}`,
        qty: 1,
        rate: payment.amount || 0,
        amount: payment.amount || 0,
      },
    ],
    subtotal: payment.amount || 0,
    tax: 0,
    total: payment.amount || 0,
    status: payment.status,
    notes: payment.notes || "",
  };
}
