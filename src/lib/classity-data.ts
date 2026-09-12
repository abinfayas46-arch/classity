export type FeeStatus = "PAID" | "PARTIAL" | "PENDING" | "OVERDUE";

export type FeeRow = {
  id: string;
  name: string;
  initials: string;
  batch: string;
  parent: string;
  pending: number;
  due: string;
  status: FeeStatus;
  tone: "brand" | "accent" | "good" | "bad";
};

export const feeRows: FeeRow[] = [
  { id: "STU-1024", name: "Aarav Menon", initials: "AM", batch: "JEE 2027", parent: "Ramesh Menon", pending: 3000, due: "12 Oct", status: "PARTIAL", tone: "accent" },
  { id: "STU-1025", name: "Diya Sharma", initials: "DS", batch: "NEET 2027", parent: "Sunita Sharma", pending: 4500, due: "6 Oct", status: "OVERDUE", tone: "bad" },
  { id: "STU-1026", name: "Ishaan Nair", initials: "IN", batch: "Class 10 Maths", parent: "Deepa Nair", pending: 0, due: "1 Oct", status: "PAID", tone: "good" },
  { id: "STU-1027", name: "Ananya Iyer", initials: "AI", batch: "Class 12 Physics", parent: "Anil Soman", pending: 2500, due: "15 Oct", status: "PENDING", tone: "brand" },
];

export const formatInr = (value: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);

export const navItems = [
  { label: "Dashboard", to: "/" as const, icon: "layout" },
  { label: "Students", to: "/students" as const, icon: "users" },
  { label: "Fee Collection", to: "/fees" as const, icon: "wallet" },
  { label: "Fee Plans", to: "/fee-plans" as const, icon: "receipt" },
  { label: "WhatsApp", to: "/whatsapp" as const, icon: "message" },
  { label: "Receipts", to: "/receipts" as const, icon: "file" },
  { label: "Batches", to: "/batches" as const, icon: "layers" },
  { label: "Reports", to: "/reports" as const, icon: "chart" },
];