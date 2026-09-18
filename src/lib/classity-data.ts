import type { AppRole } from "@/lib/auth";

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

export type AttendanceStatus = "Present" | "Absent" | "Late" | "Half Day" | "Leave";

export type AttendanceRow = {
  id: string;
  studentId: string;
  name: string;
  initials: string;
  batch: string;
  date: string;
  checkIn: string | null;
  checkOut: string | null;
  duration: string | null;
  status: AttendanceStatus;
  remarks: string | null;
};

export const feeRows: FeeRow[] = [
  { id: "STU-1024", name: "Aarav Menon", initials: "AM", batch: "JEE 2027", parent: "Ramesh Menon", pending: 3000, due: "12 Oct", status: "PARTIAL", tone: "accent" },
  { id: "STU-1025", name: "Diya Sharma", initials: "DS", batch: "NEET 2027", parent: "Sunita Sharma", pending: 4500, due: "6 Oct", status: "OVERDUE", tone: "bad" },
  { id: "STU-1026", name: "Ishaan Nair", initials: "IN", batch: "Class 10 Maths", parent: "Deepa Nair", pending: 0, due: "1 Oct", status: "PAID", tone: "good" },
  { id: "STU-1027", name: "Ananya Iyer", initials: "AI", batch: "Class 12 Physics", parent: "Anil Soman", pending: 2500, due: "15 Oct", status: "PENDING", tone: "brand" },
];

export type ReceiptStatus = "Issued" | "Shared" | "Draft";
export type ReceiptPaymentMode = "UPI" | "Cash" | "Card" | "Bank transfer" | "Cheque";

export type ReceiptRow = {
  id: string;
  studentId: string;
  studentName: string;
  initials: string;
  batch: string;
  parent: string;
  amount: number;
  paymentMode: ReceiptPaymentMode;
  issuedOn: string;
  status: ReceiptStatus;
};

export const receiptRows: ReceiptRow[] = [
  { id: "RCP-9104", studentId: "STU-1024", studentName: "Aarav Menon", initials: "AM", batch: "JEE 2027", parent: "Ramesh Menon", amount: 2000, paymentMode: "UPI", issuedOn: "2026-09-05", status: "Shared" },
  { id: "RCP-9105", studentId: "STU-1026", studentName: "Ishaan Nair", initials: "IN", batch: "Class 10 Maths", parent: "Deepa Nair", amount: 3000, paymentMode: "Cash", issuedOn: "2026-09-28", status: "Issued" },
  { id: "RCP-9106", studentId: "STU-1028", studentName: "Kabir Thomas", initials: "KT", batch: "JEE 2027", parent: "Maya Thomas", amount: 5000, paymentMode: "UPI", issuedOn: "2026-10-02", status: "Shared" },
  { id: "RCP-9107", studentId: "STU-1027", studentName: "Ananya Iyer", initials: "AI", batch: "Class 12 Physics", parent: "Anil Soman", amount: 2500, paymentMode: "Cheque", issuedOn: "2026-09-10", status: "Draft" },
  { id: "RCP-9108", studentId: "STU-1024", studentName: "Aarav Menon", initials: "AM", batch: "JEE 2027", parent: "Ramesh Menon", amount: 1500, paymentMode: "Card", issuedOn: "2026-08-12", status: "Shared" },
  { id: "RCP-9109", studentId: "STU-1029", studentName: "Meera Pillai", initials: "MP", batch: "NEET 2027", parent: "Suresh Pillai", amount: 4500, paymentMode: "Bank transfer", issuedOn: "2026-09-20", status: "Issued" },
  { id: "RCP-9110", studentId: "STU-1025", studentName: "Diya Sharma", initials: "DS", batch: "NEET 2027", parent: "Sunita Sharma", amount: 1000, paymentMode: "UPI", issuedOn: "2026-07-18", status: "Shared" },
  { id: "RCP-9111", studentId: "STU-1026", studentName: "Ishaan Nair", initials: "IN", batch: "Class 10 Maths", parent: "Deepa Nair", amount: 1500, paymentMode: "Cash", issuedOn: "2026-08-28", status: "Issued" },
];

export const receiptPaymentModes = ["All modes", "UPI", "Cash", "Card", "Bank transfer", "Cheque"] as const;
export const receiptStatuses: Array<ReceiptStatus | "All statuses"> = ["All statuses", "Issued", "Shared", "Draft"];

export const attendanceRows: AttendanceRow[] = [
  { id: "ATT-2401", studentId: "STU-1024", name: "Aarav Menon", initials: "AM", batch: "JEE 2027", date: "2026-09-18", checkIn: "08:12", checkOut: "13:05", duration: "4h 53m", status: "Present", remarks: null },
  { id: "ATT-2402", studentId: "STU-1025", name: "Diya Sharma", initials: "DS", batch: "NEET 2027", date: "2026-09-18", checkIn: "08:41", checkOut: "13:02", duration: "4h 21m", status: "Late", remarks: "Arrived after first period" },
  { id: "ATT-2403", studentId: "STU-1026", name: "Ishaan Nair", initials: "IN", batch: "Class 10 Maths", date: "2026-09-18", checkIn: null, checkOut: null, duration: null, status: "Absent", remarks: "No check-in recorded" },
  { id: "ATT-2404", studentId: "STU-1027", name: "Ananya Iyer", initials: "AI", batch: "Class 12 Physics", date: "2026-09-18", checkIn: "08:05", checkOut: "11:30", duration: "3h 25m", status: "Half Day", remarks: "Left early for exam" },
  { id: "ATT-2405", studentId: "STU-1028", name: "Kabir Thomas", initials: "KT", batch: "JEE 2027", date: "2026-09-18", checkIn: null, checkOut: null, duration: null, status: "Leave", remarks: "Medical leave approved" },
  { id: "ATT-2406", studentId: "STU-1029", name: "Meera Pillai", initials: "MP", batch: "NEET 2027", date: "2026-09-18", checkIn: "08:08", checkOut: "13:10", duration: "5h 02m", status: "Present", remarks: null },
  { id: "ATT-2391", studentId: "STU-1024", name: "Aarav Menon", initials: "AM", batch: "JEE 2027", date: "2026-09-17", checkIn: "08:10", checkOut: "13:00", duration: "4h 50m", status: "Present", remarks: null },
  { id: "ATT-2392", studentId: "STU-1025", name: "Diya Sharma", initials: "DS", batch: "NEET 2027", date: "2026-09-17", checkIn: null, checkOut: null, duration: null, status: "Absent", remarks: "Parent informed late" },
  { id: "ATT-2393", studentId: "STU-1026", name: "Ishaan Nair", initials: "IN", batch: "Class 10 Maths", date: "2026-09-17", checkIn: "08:55", checkOut: "13:05", duration: "4h 10m", status: "Late", remarks: null },
  { id: "ATT-2394", studentId: "STU-1027", name: "Ananya Iyer", initials: "AI", batch: "Class 12 Physics", date: "2026-09-17", checkIn: "08:02", checkOut: "13:08", duration: "5h 06m", status: "Present", remarks: null },
  { id: "ATT-2395", studentId: "STU-1028", name: "Kabir Thomas", initials: "KT", batch: "JEE 2027", date: "2026-09-17", checkIn: "08:15", checkOut: "12:00", duration: "3h 45m", status: "Half Day", remarks: "Family function" },
  { id: "ATT-2396", studentId: "STU-1029", name: "Meera Pillai", initials: "MP", batch: "NEET 2027", date: "2026-09-17", checkIn: null, checkOut: null, duration: null, status: "Leave", remarks: "Festival leave" },
  { id: "ATT-2381", studentId: "STU-1024", name: "Aarav Menon", initials: "AM", batch: "JEE 2027", date: "2026-09-16", checkIn: "08:05", checkOut: "13:02", duration: "4h 57m", status: "Present", remarks: null },
  { id: "ATT-2382", studentId: "STU-1025", name: "Diya Sharma", initials: "DS", batch: "NEET 2027", date: "2026-09-16", checkIn: "08:12", checkOut: "13:00", duration: "4h 48m", status: "Present", remarks: null },
  { id: "ATT-2383", studentId: "STU-1026", name: "Ishaan Nair", initials: "IN", batch: "Class 10 Maths", date: "2026-09-16", checkIn: null, checkOut: null, duration: null, status: "Absent", remarks: null },
  { id: "ATT-2371", studentId: "STU-1024", name: "Aarav Menon", initials: "AM", batch: "JEE 2027", date: "2026-09-15", checkIn: "08:48", checkOut: "13:10", duration: "4h 22m", status: "Late", remarks: "Traffic delay" },
  { id: "ATT-2372", studentId: "STU-1027", name: "Ananya Iyer", initials: "AI", batch: "Class 12 Physics", date: "2026-09-15", checkIn: "08:10", checkOut: "13:05", duration: "4h 55m", status: "Present", remarks: null },
  { id: "ATT-2361", studentId: "STU-1024", name: "Aarav Menon", initials: "AM", batch: "JEE 2027", date: "2026-09-12", checkIn: "08:08", checkOut: "13:00", duration: "4h 52m", status: "Present", remarks: null },
  { id: "ATT-2362", studentId: "STU-1025", name: "Diya Sharma", initials: "DS", batch: "NEET 2027", date: "2026-09-12", checkIn: null, checkOut: null, duration: null, status: "Leave", remarks: "Family function" },
  { id: "ATT-2351", studentId: "STU-1024", name: "Aarav Menon", initials: "AM", batch: "JEE 2027", date: "2026-09-11", checkIn: null, checkOut: null, duration: null, status: "Absent", remarks: "Fever" },
  { id: "ATT-2352", studentId: "STU-1026", name: "Ishaan Nair", initials: "IN", batch: "Class 10 Maths", date: "2026-09-11", checkIn: "08:14", checkOut: "13:00", duration: "4h 46m", status: "Present", remarks: null },
  { id: "ATT-2341", studentId: "STU-1024", name: "Aarav Menon", initials: "AM", batch: "JEE 2027", date: "2026-09-10", checkIn: "08:11", checkOut: "12:00", duration: "3h 49m", status: "Half Day", remarks: "Left for counselling" },
  { id: "ATT-2331", studentId: "STU-1024", name: "Aarav Menon", initials: "AM", batch: "JEE 2027", date: "2026-09-09", checkIn: "08:06", checkOut: "13:08", duration: "5h 02m", status: "Present", remarks: null },
  { id: "ATT-2321", studentId: "STU-1024", name: "Aarav Menon", initials: "AM", batch: "JEE 2027", date: "2026-09-08", checkIn: "08:09", checkOut: "13:01", duration: "4h 52m", status: "Present", remarks: null },
  { id: "ATT-2311", studentId: "STU-1024", name: "Aarav Menon", initials: "AM", batch: "JEE 2027", date: "2026-09-04", checkIn: "08:15", checkOut: "13:05", duration: "4h 50m", status: "Present", remarks: null },
  { id: "ATT-2301", studentId: "STU-1024", name: "Aarav Menon", initials: "AM", batch: "JEE 2027", date: "2026-09-03", checkIn: "08:40", checkOut: "13:00", duration: "4h 20m", status: "Late", remarks: null },
  { id: "ATT-2291", studentId: "STU-1024", name: "Aarav Menon", initials: "AM", batch: "JEE 2027", date: "2026-09-02", checkIn: "08:07", checkOut: "13:04", duration: "4h 57m", status: "Present", remarks: null },
  { id: "ATT-2281", studentId: "STU-1024", name: "Aarav Menon", initials: "AM", batch: "JEE 2027", date: "2026-09-01", checkIn: "08:10", checkOut: "13:00", duration: "4h 50m", status: "Present", remarks: null },
];

export type CentreHoliday = {
  date: string;
  name: string;
  type: "Public" | "Centre";
};

/** Centre closed / holiday dates shown on the Calendar (Kerala 2026). */
export const centreHolidays: CentreHoliday[] = [
  { date: "2026-08-15", name: "Independence Day", type: "Public" },
  { date: "2026-08-25", name: "First Onam (Uthradam)", type: "Public" },
  { date: "2026-08-26", name: "Thiruvonam", type: "Public" },
  { date: "2026-08-27", name: "Third Onam", type: "Public" },
  { date: "2026-08-28", name: "Fourth Onam", type: "Public" },
  { date: "2026-09-04", name: "Sreekrishna Jayanthi", type: "Public" },
  { date: "2026-09-12", name: "Second Saturday", type: "Centre" },
  { date: "2026-09-21", name: "Sree Narayana Guru Samadhi", type: "Public" },
  { date: "2026-10-02", name: "Gandhi Jayanti", type: "Public" },
];

export function holidayOn(date: string) {
  return centreHolidays.find((item) => item.date === date) ?? null;
}

export function attendanceForDate(date: string, studentName?: string) {
  return attendanceRows.filter((row) => row.date === date && (!studentName || row.name === studentName));
}

export function monthLabel(year: number, monthIndex: string | number) {
  return new Intl.DateTimeFormat("en-IN", { month: "long", year: "numeric" }).format(new Date(year, Number(monthIndex), 1));
}

export function toIsoDate(year: number, monthIndex: number, day: number) {
  const mm = String(monthIndex + 1).padStart(2, "0");
  const dd = String(day).padStart(2, "0");
  return `${year}-${mm}-${dd}`;
}

/** Build a Sunday-first month grid including leading/trailing days from adjacent months. */
export function buildMonthGrid(year: number, monthIndex: number) {
  const first = new Date(year, monthIndex, 1);
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const startPad = first.getDay(); // 0 = Sunday
  const cells: Array<{
    key: string;
    day: number;
    iso: string;
    inMonth: boolean;
    weekday: number;
    isWeekend: boolean;
  }> = [];

  const prevDays = new Date(year, monthIndex, 0).getDate();
  for (let i = startPad - 1; i >= 0; i -= 1) {
    const day = prevDays - i;
    const date = new Date(year, monthIndex - 1, day);
    const iso = toIsoDate(date.getFullYear(), date.getMonth(), day);
    const weekday = date.getDay();
    cells.push({ key: `prev-${iso}`, day, iso, inMonth: false, weekday, isWeekend: weekday === 0 || weekday === 6 });
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    const iso = toIsoDate(year, monthIndex, day);
    const weekday = new Date(year, monthIndex, day).getDay();
    cells.push({ key: iso, day, iso, inMonth: true, weekday, isWeekend: weekday === 0 || weekday === 6 });
  }

  let nextDay = 1;
  while (cells.length % 7 !== 0 || cells.length < 42) {
    const date = new Date(year, monthIndex + 1, nextDay);
    const iso = toIsoDate(date.getFullYear(), date.getMonth(), nextDay);
    const weekday = date.getDay();
    cells.push({ key: `next-${iso}`, day: nextDay, iso, inMonth: false, weekday, isWeekend: weekday === 0 || weekday === 6 });
    nextDay += 1;
    if (cells.length >= 42) break;
  }

  return cells;
}

export function isIsoWeekend(iso: string) {
  const weekday = new Date(`${iso}T00:00:00`).getDay();
  return weekday === 0 || weekday === 6;
}

export const attendanceBatches = ["All batches", "JEE 2027", "NEET 2027", "Class 10 Maths", "Class 12 Physics"] as const;

export const attendanceStatuses: Array<AttendanceStatus | "All statuses"> = [
  "All statuses",
  "Present",
  "Absent",
  "Late",
  "Half Day",
  "Leave",
];

export const formatInr = (value: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);

export const formatAttendanceDate = (value: string) =>
  new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric" }).format(new Date(`${value}T00:00:00`));

export type CollectionReportRow = {
  studentId: string;
  studentName: string;
  batchName: string;
  feePlanName: string;
  expectedAmount: number;
  collectedAmount: number;
  pendingAmount: number;
  collectionStatus: FeeStatus;
  dueDate: string;
  lastPaymentDate: string;
};

export type BatchHealthReportRow = {
  batchName: string;
  enrolledStudents: number;
  activeStudents: number;
  expectedFees: number;
  collectedFees: number;
  overdueCount: number;
  attendanceRate: string;
  startDate: string;
  endDate: string;
};

export type BatchRow = {
  id: string;
  name: string;
  course: string;
  subject: string;
  teacherName: string;
  schedule: string;
  capacity: number;
  enrolled: number;
  feePlanName: string;
  startDate: string;
  endDate: string;
  status: "Active" | "Upcoming" | "Completed";
};

export const batchRows: BatchRow[] = [
  { id: "BAT-1001", name: "JEE 2027", course: "JEE", subject: "Physics + Maths", teacherName: "Arun Menon", schedule: "Mon, Wed, Fri · 5:30 PM", capacity: 60, enrolled: 42, feePlanName: "JEE Monthly · ₹5,000", startDate: "2025-06-01", endDate: "2027-04-30", status: "Active" },
  { id: "BAT-1002", name: "NEET 2027", course: "NEET", subject: "Biology + Chemistry", teacherName: "Divya Nair", schedule: "Tue, Thu, Sat · 6:00 PM", capacity: 60, enrolled: 38, feePlanName: "NEET Monthly · ₹4,500", startDate: "2025-06-15", endDate: "2027-05-15", status: "Active" },
  { id: "BAT-1003", name: "Class 10 Maths", course: "Class 10", subject: "Mathematics", teacherName: "Meera Krishnan", schedule: "Mon, Wed · 4:00 PM", capacity: 40, enrolled: 26, feePlanName: "Class 10 Monthly · ₹3,000", startDate: "2026-04-01", endDate: "2027-03-31", status: "Active" },
  { id: "BAT-1004", name: "Class 12 Physics", course: "Class 12", subject: "Physics", teacherName: "Karthik Soman", schedule: "Tue, Fri · 4:30 PM", capacity: 40, enrolled: 22, feePlanName: "JEE Monthly · ₹5,000", startDate: "2026-05-01", endDate: "2027-03-15", status: "Active" },
];

export const collectionReportRows: CollectionReportRow[] = [
  { studentId: "STU-1024", studentName: "Aarav Menon", batchName: "JEE 2027", feePlanName: "JEE Monthly", expectedAmount: 5000, collectedAmount: 2000, pendingAmount: 3000, collectionStatus: "PARTIAL", dueDate: "12 Oct 2026", lastPaymentDate: "5 Sep 2026" },
  { studentId: "STU-1025", studentName: "Diya Sharma", batchName: "NEET 2027", feePlanName: "NEET Monthly", expectedAmount: 4500, collectedAmount: 0, pendingAmount: 4500, collectionStatus: "OVERDUE", dueDate: "6 Oct 2026", lastPaymentDate: "—" },
  { studentId: "STU-1026", studentName: "Ishaan Nair", batchName: "Class 10 Maths", feePlanName: "Class 10 Monthly", expectedAmount: 3000, collectedAmount: 3000, pendingAmount: 0, collectionStatus: "PAID", dueDate: "1 Oct 2026", lastPaymentDate: "28 Sep 2026" },
  { studentId: "STU-1027", studentName: "Ananya Iyer", batchName: "Class 12 Physics", feePlanName: "JEE Monthly", expectedAmount: 5000, collectedAmount: 2500, pendingAmount: 2500, collectionStatus: "PENDING", dueDate: "15 Oct 2026", lastPaymentDate: "10 Sep 2026" },
  { studentId: "STU-1028", studentName: "Kabir Thomas", batchName: "JEE 2027", feePlanName: "JEE Monthly", expectedAmount: 5000, collectedAmount: 5000, pendingAmount: 0, collectionStatus: "PAID", dueDate: "12 Oct 2026", lastPaymentDate: "2 Oct 2026" },
  { studentId: "STU-1029", studentName: "Meera Pillai", batchName: "NEET 2027", feePlanName: "NEET Monthly", expectedAmount: 4500, collectedAmount: 0, pendingAmount: 4500, collectionStatus: "PENDING", dueDate: "12 Oct 2026", lastPaymentDate: "—" },
];

export const batchHealthReportRows: BatchHealthReportRow[] = [
  { batchName: "JEE 2027", enrolledStudents: 42, activeStudents: 40, expectedFees: 210000, collectedFees: 168000, overdueCount: 7, attendanceRate: "91%", startDate: "2025-06-01", endDate: "2027-04-30" },
  { batchName: "NEET 2027", enrolledStudents: 38, activeStudents: 36, expectedFees: 171000, collectedFees: 129000, overdueCount: 9, attendanceRate: "88%", startDate: "2025-06-15", endDate: "2027-05-15" },
  { batchName: "Class 10 Maths", enrolledStudents: 26, activeStudents: 26, expectedFees: 78000, collectedFees: 72000, overdueCount: 2, attendanceRate: "94%", startDate: "2026-04-01", endDate: "2027-03-31" },
  { batchName: "Class 12 Physics", enrolledStudents: 22, activeStudents: 21, expectedFees: 110000, collectedFees: 88000, overdueCount: 4, attendanceRate: "90%", startDate: "2026-05-01", endDate: "2027-03-15" },
];

/** Download a UTF-8 CSV that opens cleanly in Microsoft Excel. */
export function exportRowsToExcel(filename: string, headers: string[], rows: Array<Array<string | number>>) {
  const escapeCell = (value: string | number) => `"${String(value).replace(/"/g, '""')}"`;
  const csv = `\uFEFF${[headers.map(escapeCell).join(","), ...rows.map((row) => row.map(escapeCell).join(","))].join("\r\n")}`;
  const blob = new Blob([csv], { type: "application/vnd.ms-excel;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename.endsWith(".xls") || filename.endsWith(".csv") ? filename : `${filename}.xls`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

export type NavItem = {
  label: string;
  to: "/" | "/accountant" | "/student" | "/students" | "/attendance" | "/calendar" | "/fees" | "/fee-plans" | "/receipts" | "/batches" | "/reports" | "/whatsapp";
  icon: string;
  roles: AppRole[];
};

export const navItems: NavItem[] = [
  { label: "Dashboard", to: "/", icon: "layout", roles: ["admin"] },
  { label: "Dashboard", to: "/accountant", icon: "layout", roles: ["accountant"] },
  { label: "Dashboard", to: "/student", icon: "layout", roles: ["student"] },
  { label: "Students", to: "/students", icon: "users", roles: ["admin"] },
  { label: "Attendance", to: "/attendance", icon: "attendance", roles: ["admin", "student"] },
  { label: "Calendar", to: "/calendar", icon: "calendar", roles: ["admin", "student"] },
  { label: "Fee Collection", to: "/fees", icon: "wallet", roles: ["admin", "accountant"] },
  { label: "Fee Plans", to: "/fee-plans", icon: "receipt", roles: ["admin", "accountant"] },
  // { label: "WhatsApp", to: "/whatsapp", icon: "message", roles: ["admin"] },
  { label: "Receipts", to: "/receipts", icon: "file", roles: ["admin", "accountant", "student"] },
  { label: "Batches", to: "/batches", icon: "layers", roles: ["admin"] },
  { label: "My Classes", to: "/batches", icon: "layers", roles: ["student"] },
  { label: "Reports", to: "/reports", icon: "chart", roles: ["admin", "accountant"] },
];

export function navItemsForRole(role: AppRole) {
  return navItems.filter((item) => item.roles.includes(role));
}

export type NotificationTone = "brand" | "accent" | "good" | "bad";

export type AppNotification = {
  id: string;
  role: AppRole;
  title: string;
  body: string;
  time: string;
  read: boolean;
  tone: NotificationTone;
  category: string;
};

/** Role-scoped dummy notifications — each role only sees its own rows. */
export const notifications: AppNotification[] = [
  // Admin
  { id: "N-A1", role: "admin", title: "18 fees overdue", body: "JEE Batch A holds most of the overdue balance. Review reminders before evening.", time: "12 min ago", read: false, tone: "bad", category: "Fees" },
  { id: "N-A2", role: "admin", title: "New student enquiry", body: "Parent of Kabir Thomas requested a seat in JEE 2027 evening batch.", time: "45 min ago", read: false, tone: "brand", category: "Students" },
  { id: "N-A3", role: "admin", title: "Attendance gap flagged", body: "Class 10 Maths has 6 absences today — higher than the weekly average.", time: "2 hr ago", read: false, tone: "accent", category: "Attendance" },
  { id: "N-A4", role: "admin", title: "Staff seat used", body: "Priya Nambiar signed in as Accountant from Kochi office.", time: "Yesterday", read: true, tone: "good", category: "Team" },
  { id: "N-A5", role: "admin", title: "Batch capacity alert", body: "NEET 2027 is at 95% capacity. Consider opening a waitlist.", time: "Yesterday", read: true, tone: "accent", category: "Batches" },

  // Accountant
  { id: "N-C1", role: "accountant", title: "Payment received", body: "₹2,000 UPI payment recorded for Aarav Menon · Receipt ready to share.", time: "8 min ago", read: false, tone: "good", category: "Payments" },
  { id: "N-C2", role: "accountant", title: "Due today · ₹1,02,400", body: "27 fee records fall due today. Prioritise overdue parents first.", time: "30 min ago", read: false, tone: "accent", category: "Collections" },
  { id: "N-C3", role: "accountant", title: "Cheque pending clearance", body: "Ananya Iyer · ₹2,500 cheque marked as pending bank clearance.", time: "1 hr ago", read: false, tone: "brand", category: "Payments" },
  { id: "N-C4", role: "accountant", title: "Monthly report ready", body: "September collection summary is ready to export from Reports.", time: "Yesterday", read: true, tone: "brand", category: "Reports" },
  { id: "N-C5", role: "accountant", title: "Fee plan change", body: "Admin updated JEE Monthly grace period to 5 days.", time: "2 days ago", read: true, tone: "accent", category: "Fee plans" },

  // Student
  { id: "N-S1", role: "student", title: "Fee reminder", body: "₹3,000 remaining for September. Due by 12 Oct.", time: "20 min ago", read: false, tone: "accent", category: "Fees" },
  { id: "N-S2", role: "student", title: "Marked present", body: "Check-in recorded today at 08:12 for JEE 2027.", time: "1 hr ago", read: false, tone: "good", category: "Attendance" },
  { id: "N-S3", role: "student", title: "Class schedule update", body: "Physics lab moved to Saturday 10:00 AM this week.", time: "3 hr ago", read: false, tone: "brand", category: "Classes" },
  { id: "N-S4", role: "student", title: "Receipt available", body: "Your partial payment receipt for ₹2,000 is ready to download.", time: "Yesterday", read: true, tone: "good", category: "Receipts" },
  { id: "N-S5", role: "student", title: "Holiday notice", body: "Centre closed 25–28 Aug for Onam. Classes resume on Monday, 31 Aug.", time: "2 days ago", read: true, tone: "brand", category: "Announcements" },
];

export function notificationsForRole(role: AppRole) {
  return notifications.filter((item) => item.role === role);
}

export function unreadNotificationCount(role: AppRole) {
  return notificationsForRole(role).filter((item) => !item.read).length;
}
