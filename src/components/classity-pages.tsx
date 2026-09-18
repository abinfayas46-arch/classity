import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowDownToLine, ArrowUpRight, Bell, CalendarDays, Check, ChevronLeft, ChevronRight, ClipboardCheck, Download, FilePlus2, Filter, ImagePlus, LogIn, LogOut, MessageCircle, MoreHorizontal, Pencil, Plus, Search, Send, Settings2, Sparkles, Trash2, Users, WalletCards } from "lucide-react";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AppShell, SectionHeader, Surface } from "@/components/classity-shell";
import { useAuth } from "@/contexts/auth-context";
import { homePathForRole } from "@/lib/auth";
import { attendanceBatches, attendanceForDate, attendanceRows, attendanceStatuses, batchHealthReportRows, batchRows, buildMonthGrid, centreHolidays, collectionReportRows, exportRowsToExcel, feeRows, formatAttendanceDate, formatInr, isIsoWeekend, monthLabel, notificationsForRole, receiptPaymentModes, receiptRows, receiptStatuses, toIsoDate, type AttendanceRow, type AttendanceStatus, type CentreHoliday, type ReceiptStatus } from "@/lib/classity-data";

const studentRows: Array<[string, string, string, string, string, string]> = [
  ["Aarav Menon", "AM", "JEE 2027", "Ramesh Menon", "₹3,000", "Partial"],
  ["Diya Sharma", "DS", "NEET 2027", "Sunita Sharma", "₹4,500", "Overdue"],
  ["Ishaan Nair", "IN", "Class 10 Maths", "Deepa Nair", "Paid", "Active"],
  ["Ananya Iyer", "AI", "Class 12 Physics", "Anil Soman", "₹2,500", "Pending"],
  ["Kabir Thomas", "KT", "JEE 2027", "Maya Thomas", "Paid", "Active"],
  ["Meera Pillai", "MP", "NEET 2027", "Suresh Pillai", "₹4,500", "Due today"],
];

export function StudentsPage() {
  const [query, setQuery] = useState("");
  const [createOpen, setCreateOpen] = useState(false);
  const filtered = useMemo(() => studentRows.filter((row) => row.join(" ").toLowerCase().includes(query.toLowerCase())), [query]);
  return (
    <AppShell title="Students">
      <div className="animate-classity-rise space-y-4">
        <SectionHeader eyebrow="Student directory" title="Students" description="Keep every learner, parent, batch, and fee plan in one place." action={<Button variant="accent" onClick={() => setCreateOpen(true)}><Plus /> Add student</Button>} />
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4"><MiniMetric label="Total students" value="172" /><MiniMetric label="Active this term" value="168" /><MiniMetric label="New this month" value="12" tone="good" /><MiniMetric label="Missing parent info" value="4" tone="warn" /></div>
        <Surface>
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex min-w-[15rem] flex-1 items-center gap-2 rounded-lg border border-input bg-background px-3"><Search className="size-4 text-muted-foreground" /><Input aria-label="Search students" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by student, parent, or batch" className="border-0 bg-transparent shadow-none focus-visible:ring-0" /></div>
            <Button variant="outline" onClick={() => setCreateOpen(true)}><Filter /> Quick add</Button>
            <Button variant="outline" className="hidden sm:inline-flex" onClick={() => setCreateOpen(true)}><Download /> Export list</Button>
          </div>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[680px] text-left">
              <thead><tr className="border-b border-border text-[11px] uppercase tracking-wider text-muted-foreground"><th className="pb-3 pl-2">Student</th><th className="pb-3">Batch</th><th className="pb-3">Parent</th><th className="pb-3">Outstanding</th><th className="pb-3">Status</th><th className="pb-3"></th></tr></thead>
              <tbody className="divide-y divide-border">
                {filtered.map(([name, initials, batch, parent, amount, status]) => (
                  <tr key={name} className="group">
                    <td className="py-3 pl-2"><div className="flex items-center gap-3"><span className="grid size-8 place-items-center rounded-full bg-brand-soft text-[11px] font-bold text-brand">{initials}</span><span className="text-sm font-semibold">{name}</span></div></td>
                    <td className="py-3 text-xs text-muted-foreground">{batch}</td>
                    <td className="py-3 text-xs text-muted-foreground">{parent}</td>
                    <td className={`py-3 text-sm font-mono font-semibold ${amount === "Paid" ? "text-good" : ""}`}>{amount}</td>
                    <td className="py-3"><StatusPill value={status} /></td>
                    <td className="py-3 text-right"><Button variant="ghost" size="icon" aria-label={`Open ${name}`} onClick={() => setCreateOpen(true)}><ChevronRight /></Button></td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && <p className="py-10 text-center text-sm text-muted-foreground">No students match “{query}”.</p>}
          </div>
        </Surface>
      </div>
      {createOpen && (
        <CreateFormDialog
          eyebrow="New record"
          title="Add a student"
          description="Create a learner profile for Bright Future Academy."
          submitLabel="Save student"
          successTitle="Student saved in demo mode"
          successMessage="Connect your centre account to persist this student."
          fields={[
            { key: "studentPhoto", label: "Student photo", type: "image", accept: "image/png,image/jpeg,image/webp", span: 2 },
            { key: "studentName", label: "Student name", placeholder: "e.g. Aarav Menon", required: true, span: 2 },
            { key: "parentName", label: "Parent / guardian name", placeholder: "e.g. Ramesh Menon", required: true },
            { key: "mobileNumber", label: "Parent mobile number", placeholder: "+91 98…", type: "tel" },
            { key: "batchName", label: "Batch name", type: "select", options: ["JEE 2027", "NEET 2027", "Class 10 Maths", "Class 12 Physics"], required: true },
            { key: "feePlanName", label: "Fee plan name", type: "select", options: ["JEE Monthly · ₹5,000", "NEET Monthly · ₹4,500", "Class 10 Monthly · ₹3,000"] },
          ]}
          onClose={() => setCreateOpen(false)}
        />
      )}
    </AppShell>
  );
}

export function FeesPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [importOpen, setImportOpen] = useState(false);
  const [collectName, setCollectName] = useState<string | null>(null);

  return (
    <AppShell title="Fee Collection">
      <div className="animate-classity-rise space-y-4">
        <SectionHeader
          eyebrow="Daily operations"
          title="Fee collection"
          description="Review dues, follow up quickly, and keep the ledger current."
          action={
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setImportOpen(true)}><ArrowDownToLine /> Import</Button>
              <Button variant="accent" onClick={() => setPaymentOpen(true)}><WalletCards /> New payment</Button>
            </div>
          }
        />
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4"><MiniMetric label="Due today" value="₹1,02,400" /><MiniMetric label="Collected today" value="₹38,500" tone="good" /><MiniMetric label="Overdue" value="₹48,200" tone="bad" /><MiniMetric label="Collection rate" value="79.4%" /></div>
        <Surface>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div><h2 className="font-bold">Outstanding fees</h2><p className="text-xs text-muted-foreground">{feeRows.length} priority records need a decision</p></div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setPaymentOpen(true)}><Filter /> Record payment</Button>
              <Button variant="outline" size="sm" onClick={() => setImportOpen(true)}><Download /> Export</Button>
            </div>
          </div>
          <div className="mt-3 divide-y divide-border">
            {feeRows.filter((row) => row.pending > 0).map((row) => (
              <div key={row.id} className="flex flex-wrap items-center gap-3 py-3">
                <div className="grid size-9 place-items-center rounded-full bg-brand-soft text-xs font-bold text-brand">{row.initials}</div>
                <div className="min-w-[11rem] flex-1"><p className="text-sm font-semibold">{row.name}</p><p className="text-xs text-muted-foreground">{row.batch} · Due {row.due}</p></div>
                <StatusPill value={row.status} />
                <div className="w-24 text-right font-mono text-sm font-semibold">{formatInr(row.pending)}</div>
                <Button size="sm" variant="outline" onClick={() => { setSelected(row.name); setSent(false); }}><MessageCircle /> Remind</Button>
                <Button size="sm" variant="accent" onClick={() => setCollectName(row.name)}>Collect</Button>
              </div>
            ))}
          </div>
        </Surface>
      </div>
      {selected && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/20 p-0 sm:items-center sm:p-4">
          <div className="w-full max-w-md rounded-t-3xl bg-popover p-6 shadow-2xl sm:rounded-2xl">
            {sent ? (
              <div className="py-4 text-center">
                <div className="mx-auto grid size-12 place-items-center rounded-full bg-good/15 text-good"><Check /></div>
                <h2 className="mt-3 font-extrabold">Reminder queued</h2>
                <p className="mt-1 text-sm text-muted-foreground">The message is ready for {selected}'s parent.</p>
                <Button className="mt-5" variant="accent" onClick={() => setSelected(null)}>Done</Button>
              </div>
            ) : (
              <>
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand">WhatsApp reminder</p>
                <h2 className="mt-1 text-xl font-extrabold">Remind {selected}?</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">A polite reminder will include the outstanding amount and the centre's payment instructions.</p>
                <div className="mt-5 rounded-xl bg-muted p-3 text-sm">“Hello, this is a reminder from Bright Future Academy. Your fee balance is ready for payment. Please reply if you need help.”</div>
                <div className="mt-5 flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setSelected(null)}>Cancel</Button>
                  <Button variant="accent" onClick={() => setSent(true)}><Send /> Queue reminder</Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
      {paymentOpen && (
        <CreateFormDialog
          eyebrow="Collect fee"
          title="New payment"
          description="Record a payment against an outstanding student balance."
          submitLabel="Record payment"
          successTitle="Payment recorded"
          successMessage="Demo mode saved this payment locally for review."
          fields={[
            { key: "studentName", label: "Student name", type: "select", options: feeRows.map((row) => `${row.name} · ${row.id}`), required: true, span: 2 },
            { key: "paymentAmount", label: "Payment amount (₹)", placeholder: "2000", type: "number", required: true },
            { key: "paymentMethod", label: "Payment method", type: "select", options: ["UPI", "Cash", "Card", "Bank transfer", "Cheque"], required: true },
            { key: "paymentProofImage", label: "Payment proof image", type: "image", accept: "image/png,image/jpeg,image/webp", span: 2 },
            { key: "paymentRemarks", label: "Payment remarks", placeholder: "Optional note", span: 2 },
          ]}
          onClose={() => setPaymentOpen(false)}
        />
      )}
      {collectName && (
        <CreateFormDialog
          eyebrow="Collect fee"
          title={`Collect from ${collectName}`}
          description="Enter the amount received today."
          submitLabel="Record payment"
          successTitle="Payment recorded"
          successMessage={`Demo payment for ${collectName} was saved locally.`}
          fields={[
            { key: "paymentAmount", label: "Payment amount (₹)", placeholder: "2000", type: "number", required: true },
            { key: "paymentMethod", label: "Payment method", type: "select", options: ["UPI", "Cash", "Card", "Bank transfer"], required: true },
            { key: "paymentProofImage", label: "Payment proof image", type: "image", accept: "image/png,image/jpeg,image/webp", span: 2 },
            { key: "paymentRemarks", label: "Payment remarks", placeholder: "Optional note", span: 2 },
          ]}
          onClose={() => setCollectName(null)}
        />
      )}
      {importOpen && (
        <CreateFormDialog
          eyebrow="Ledger tools"
          title="Import / export fees"
          description="Upload a CSV of payments or prepare an export of outstanding dues."
          submitLabel="Start import"
          successTitle="Import queued"
          successMessage="Demo mode accepted the file reference. Connect storage to process imports."
          fields={[
            { key: "importSource", label: "Import source", type: "select", options: ["CSV upload", "Bank statement", "UPI settlement"], required: true, span: 2 },
            { key: "statementImage", label: "Statement / screenshot image", type: "image", accept: "image/png,image/jpeg,image/webp", span: 2 },
            { key: "importFileName", label: "Import file name", placeholder: "fees-september.csv", span: 2 },
          ]}
          onClose={() => setImportOpen(false)}
        />
      )}
    </AppShell>
  );
}

export function FeePlansPage() {
  const [saved, setSaved] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [editTitle, setEditTitle] = useState<string | null>(null);

  return (
    <AppShell title="Fee Plans">
      <div className="animate-classity-rise space-y-4">
        <SectionHeader eyebrow="Pricing and cycles" title="Fee plans" description="Set clear recurring fees for every batch." action={<Button variant="accent" onClick={() => setCreateOpen(true)}><Plus /> Create plan</Button>} />
        <div className="grid gap-4 md:grid-cols-3">
          <PlanCard title="JEE Monthly" detail="JEE 2027 · 42 students" amount="₹5,000" accent="Current" onEdit={() => setEditTitle("JEE Monthly")} />
          <PlanCard title="NEET Monthly" detail="NEET 2027 · 38 students" amount="₹4,500" accent="Current" onEdit={() => setEditTitle("NEET Monthly")} />
          <PlanCard title="Class 10 Monthly" detail="Class 10 Maths · 26 students" amount="₹3,000" accent="Current" onEdit={() => setEditTitle("Class 10 Monthly")} />
        </div>
        <Surface>
          <div className="flex items-center justify-between"><div><h2 className="font-bold">Plan settings</h2><p className="text-xs text-muted-foreground">Choose when fees are generated and reminders begin.</p></div><Settings2 className="size-5 text-muted-foreground" /></div>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <label className="grid gap-1.5 text-sm font-semibold">Default due day<select className="h-10 rounded-md border border-input bg-background px-3 text-sm font-normal"><option>5th of every month</option><option>10th of every month</option><option>15th of every month</option></select></label>
            <label className="grid gap-1.5 text-sm font-semibold">Grace period<select className="h-10 rounded-md border border-input bg-background px-3 text-sm font-normal"><option>3 days</option><option>5 days</option><option>7 days</option></select></label>
            <label className="grid gap-1.5 text-sm font-semibold">Late reminder<select className="h-10 rounded-md border border-input bg-background px-3 text-sm font-normal"><option>On due date</option><option>After 3 days</option><option>After 7 days</option></select></label>
          </div>
          <Button className="mt-5" variant="accent" onClick={() => setSaved(true)}>{saved ? <><Check /> Saved</> : "Save preferences"}</Button>
        </Surface>
      </div>
      {createOpen && (
        <CreateFormDialog
          eyebrow="Pricing"
          title="Create fee plan"
          description="Define a recurring plan for a batch."
          submitLabel="Create plan"
          successTitle="Fee plan created"
          successMessage="Demo mode saved this plan locally."
          fields={[
            { key: "planName", label: "Fee plan name", placeholder: "e.g. JEE Monthly", required: true, span: 2 },
            { key: "batchName", label: "Batch name", type: "select", options: ["JEE 2027", "NEET 2027", "Class 10 Maths", "Class 12 Physics"], required: true },
            { key: "planAmount", label: "Plan amount (₹)", placeholder: "5000", type: "number", required: true },
            { key: "billingCycle", label: "Billing cycle", type: "select", options: ["Monthly", "Quarterly", "Yearly"], required: true },
            { key: "planCoverImage", label: "Plan cover image", type: "image", accept: "image/png,image/jpeg,image/webp", span: 2 },
          ]}
          onClose={() => setCreateOpen(false)}
        />
      )}
      {editTitle && (
        <CreateFormDialog
          eyebrow="Edit plan"
          title={`Edit ${editTitle}`}
          description="Update amount or billing cycle for this plan."
          submitLabel="Save changes"
          successTitle="Plan updated"
          successMessage="Demo mode saved your plan changes locally."
          fields={[
            { key: "planAmount", label: "Plan amount (₹)", placeholder: "5000", type: "number", required: true },
            { key: "billingCycle", label: "Billing cycle", type: "select", options: ["Monthly", "Quarterly", "Yearly"], required: true },
            { key: "planCoverImage", label: "Plan cover image", type: "image", accept: "image/png,image/jpeg,image/webp", span: 2 },
            { key: "internalNote", label: "Internal note", placeholder: "Optional staff note", span: 2 },
          ]}
          onClose={() => setEditTitle(null)}
        />
      )}
    </AppShell>
  );
}

export function AttendancePage() {
  const { user } = useAuth();
  const isStudent = user?.role === "student";
  const [rows, setRows] = useState(attendanceRows);
  const [query, setQuery] = useState("");
  const [dateFrom, setDateFrom] = useState("2026-09-17");
  const [dateTo, setDateTo] = useState("2026-09-18");
  const [batch, setBatch] = useState<(typeof attendanceBatches)[number]>("All batches");
  const [status, setStatus] = useState<(typeof attendanceStatuses)[number]>("All statuses");
  const [loading, setLoading] = useState(true);
  const [markOpen, setMarkOpen] = useState(false);
  const [editing, setEditing] = useState<AttendanceRow | null>(null);
  const [exportOpen, setExportOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = window.setTimeout(() => setLoading(false), 450);
    return () => window.clearTimeout(timer);
  }, [dateFrom, dateTo, batch, status, query]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((row) => {
      const inRange = row.date >= dateFrom && row.date <= dateTo;
      const batchOk = batch === "All batches" || row.batch === batch;
      const statusOk = status === "All statuses" || row.status === status;
      const queryOk = !q || row.name.toLowerCase().includes(q) || row.studentId.toLowerCase().includes(q) || row.batch.toLowerCase().includes(q);
      return inRange && batchOk && statusOk && queryOk;
    });
  }, [batch, dateFrom, dateTo, query, rows, status]);

  const deleteRow = (id: string) => {
    setRows((current) => current.filter((row) => row.id !== id));
  };

  const summary = useMemo(() => {
    const counts = { total: filtered.length, present: 0, absent: 0, late: 0, leave: 0, half: 0 };
    for (const row of filtered) {
      if (row.status === "Present") counts.present += 1;
      else if (row.status === "Absent") counts.absent += 1;
      else if (row.status === "Late") counts.late += 1;
      else if (row.status === "Leave") counts.leave += 1;
      else if (row.status === "Half Day") counts.half += 1;
    }
    return counts;
  }, [filtered]);

  const clearFilters = () => {
    setQuery("");
    setDateFrom("2026-09-17");
    setDateTo("2026-09-18");
    setBatch("All batches");
    setStatus("All statuses");
  };

  return (
    <AppShell title="Attendance">
      <div className="animate-classity-rise space-y-4">
        <SectionHeader
          eyebrow="Daily classroom ops"
          title="Attendance"
          description="Track check-ins, absences, and leave across every batch in one clear register."
          action={
            isStudent ? undefined : (
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" onClick={clearFilters}><Filter /> Reset filters</Button>
                <Button variant="accent" onClick={() => setMarkOpen(true)}><ClipboardCheck /> Mark attendance</Button>
              </div>
            )
          }
        />

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
          <MiniMetric label="Total students" value={String(summary.total)} />
          <MiniMetric label="Present" value={String(summary.present)} tone="good" />
          <MiniMetric label="Absent" value={String(summary.absent)} tone="bad" />
          <MiniMetric label="Late" value={String(summary.late)} tone="warn" />
          <MiniMetric label="On leave" value={String(summary.leave)} />
        </div>

        <Surface>
          <div className="flex flex-wrap items-end gap-3">
            <label className="grid min-w-[10rem] flex-1 gap-1.5 text-xs font-semibold text-muted-foreground">
              From
              <Input type="date" aria-label="Attendance from date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className="font-normal text-foreground" />
            </label>
            <label className="grid min-w-[10rem] flex-1 gap-1.5 text-xs font-semibold text-muted-foreground">
              To
              <Input type="date" aria-label="Attendance to date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className="font-normal text-foreground" />
            </label>
            <label className="grid min-w-[11rem] flex-1 gap-1.5 text-xs font-semibold text-muted-foreground">
              Batch
              <select aria-label="Filter by batch" value={batch} onChange={(e) => setBatch(e.target.value as (typeof attendanceBatches)[number])} className="h-10 rounded-md border border-input bg-background px-3 text-sm font-normal text-foreground">
                {attendanceBatches.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
            </label>
            <label className="grid min-w-[11rem] flex-1 gap-1.5 text-xs font-semibold text-muted-foreground">
              Status
              <select aria-label="Filter by attendance status" value={status} onChange={(e) => setStatus(e.target.value as (typeof attendanceStatuses)[number])} className="h-10 rounded-md border border-input bg-background px-3 text-sm font-normal text-foreground">
                {attendanceStatuses.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
            </label>
            <div className="flex min-w-[15rem] flex-[1.4] items-center gap-2 rounded-lg border border-input bg-background px-3">
              <Search className="size-4 shrink-0 text-muted-foreground" />
              <Input aria-label="Search attendance by student" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search student, ID, or batch" className="border-0 bg-transparent shadow-none focus-visible:ring-0" />
            </div>
            <Button variant="outline" className="hidden sm:inline-flex" onClick={() => setExportOpen(true)}><Download /> Export</Button>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 className="font-bold">Attendance register</h2>
              <p className="text-xs text-muted-foreground">
                {loading ? "Refreshing records…" : `${filtered.length} record${filtered.length === 1 ? "" : "s"} in selected range`}
                {summary.half > 0 && !loading ? ` · ${summary.half} half day` : ""}
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {(["Present", "Absent", "Late", "Half Day", "Leave"] as AttendanceStatus[]).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setStatus(status === item ? "All statuses" : item)}
                  className={`rounded-full px-2.5 py-1 text-[10px] font-bold transition-colors ${status === item ? attendanceStatusClass(item) : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="mt-4 space-y-3" aria-live="polite" aria-busy="true">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="h-14 animate-pulse rounded-xl bg-muted/70" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="mt-6 flex flex-col items-center justify-center py-12 text-center">
              <div className="grid size-14 place-items-center rounded-2xl bg-brand-soft text-brand"><ClipboardCheck className="size-6" /></div>
              <h3 className="mt-4 text-lg font-extrabold">No attendance records</h3>
              <p className="mt-1 max-w-sm text-sm text-muted-foreground">Nothing matches these filters. Widen the date range or clear filters to see the full register.</p>
              <div className="mt-5 flex flex-wrap justify-center gap-2">
                <Button variant="outline" onClick={clearFilters}>Clear filters</Button>
                {!isStudent && <Button variant="accent" onClick={() => setMarkOpen(true)}><Plus /> Mark attendance</Button>}
              </div>
            </div>
          ) : (
            <>
              <div className="mt-4 hidden overflow-x-auto md:block">
                <table className="w-full min-w-[920px] text-left">
                  <thead>
                    <tr className="border-b border-border text-[11px] uppercase tracking-wider text-muted-foreground">
                      <th className="pb-3 pl-2">Student</th>
                      <th className="pb-3">Date</th>
                      <th className="pb-3">Check-in</th>
                      <th className="pb-3">Check-out</th>
                      <th className="pb-3">Duration</th>
                      <th className="pb-3">Status</th>
                      <th className="pb-3">Remarks</th>
                      <th className="pb-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filtered.map((row) => (
                      <tr key={row.id} className="group">
                        <td className="py-3 pl-2">
                          <div className="flex items-center gap-3">
                            <span className="grid size-8 shrink-0 place-items-center rounded-full bg-brand-soft text-[11px] font-bold text-brand">{row.initials}</span>
                            <div>
                              <p className="text-sm font-semibold">{row.name}</p>
                              <p className="text-[11px] text-muted-foreground">{row.studentId} · {row.batch}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 text-xs font-medium">{formatAttendanceDate(row.date)}</td>
                        <td className="py-3 font-mono text-sm">{row.checkIn ? <span className="inline-flex items-center gap-1"><LogIn className="size-3 text-muted-foreground" />{row.checkIn}</span> : <span className="text-muted-foreground">—</span>}</td>
                        <td className="py-3 font-mono text-sm">{row.checkOut ? <span className="inline-flex items-center gap-1"><LogOut className="size-3 text-muted-foreground" />{row.checkOut}</span> : <span className="text-muted-foreground">—</span>}</td>
                        <td className="py-3 font-mono text-sm font-semibold">{row.duration ?? <span className="font-sans font-medium text-muted-foreground">—</span>}</td>
                        <td className="py-3"><AttendanceStatusPill value={row.status} /></td>
                        <td className="max-w-[12rem] py-3 text-xs text-muted-foreground">{row.remarks ?? "—"}</td>
                        <td className="py-3 text-right">
                          {!isStudent && (
                            <div className="inline-flex items-center gap-1.5">
                              <Button size="sm" variant="outline" onClick={() => { setEditing(row); setMarkOpen(false); }} aria-label={`Edit attendance for ${row.name}`}><Pencil /> Edit</Button>
                              <Button size="sm" variant="outline" className="text-bad hover:text-bad" onClick={() => deleteRow(row.id)} aria-label={`Delete attendance for ${row.name}`}><Trash2 /> Delete</Button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 space-y-3 md:hidden">
                {filtered.map((row) => (
                  <div key={row.id} className="rounded-xl bg-muted/45 p-3 ring-1 ring-border">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-brand-soft text-xs font-bold text-brand">{row.initials}</span>
                        <div>
                          <p className="text-sm font-semibold">{row.name}</p>
                          <p className="text-[11px] text-muted-foreground">{row.studentId} · {row.batch}</p>
                        </div>
                      </div>
                      <AttendanceStatusPill value={row.status} />
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                      <div><p className="text-muted-foreground">Date</p><p className="mt-0.5 font-semibold">{formatAttendanceDate(row.date)}</p></div>
                      <div><p className="text-muted-foreground">Duration</p><p className="mt-0.5 font-mono font-semibold">{row.duration ?? "—"}</p></div>
                      <div><p className="text-muted-foreground">Check-in</p><p className="mt-0.5 font-mono">{row.checkIn ?? "—"}</p></div>
                      <div><p className="text-muted-foreground">Check-out</p><p className="mt-0.5 font-mono">{row.checkOut ?? "—"}</p></div>
                    </div>
                    {row.remarks && <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{row.remarks}</p>}
                    {!isStudent && (
                      <div className="mt-3 flex gap-2">
                        <Button size="sm" variant="outline" className="flex-1" onClick={() => { setEditing(row); setMarkOpen(false); }}><Pencil /> Edit</Button>
                        <Button size="sm" variant="outline" className="flex-1 text-bad hover:text-bad" onClick={() => deleteRow(row.id)}><Trash2 /> Delete</Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </Surface>
      </div>

      {markOpen && <MarkAttendanceDialog onClose={() => setMarkOpen(false)} />}
      {editing && (
        <MarkAttendanceDialog
          row={editing}
          onClose={() => setEditing(null)}
          onSave={(updated) => {
            setRows((current) => current.map((row) => (row.id === updated.id ? updated : row)));
            setEditing(null);
          }}
        />
      )}
      {exportOpen && (
        <CreateFormDialog
          eyebrow="Attendance"
          title="Export register"
          description="Download attendance for the selected filters."
          submitLabel="Export CSV"
          successTitle="Export ready"
          successMessage="Demo export prepared for the current attendance filters."
          fields={[
            { key: "exportFormat", label: "Export format", type: "select", options: ["CSV", "PDF summary"], required: true, span: 2 },
            { key: "exportScope", label: "Export scope", type: "select", options: ["Current filters", "Full month", "Selected batch only"], required: true, span: 2 },
          ]}
          onClose={() => setExportOpen(false)}
        />
      )}
    </AppShell>
  );
}

export function CalendarPage() {
  const { user } = useAuth();
  const isStudent = user?.role === "student";
  const isAdmin = user?.role === "admin";
  const todayIso = useMemo(() => {
    const now = new Date();
    return toIsoDate(now.getFullYear(), now.getMonth(), now.getDate());
  }, []);
  const [cursor, setCursor] = useState(() => {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() };
  });
  const [selectedDate, setSelectedDate] = useState(todayIso);
  const [batch, setBatch] = useState<(typeof attendanceBatches)[number]>("All batches");
  const [holidays, setHolidays] = useState(centreHolidays);
  const [holidayOpen, setHolidayOpen] = useState(false);

  const findHoliday = (date: string) => holidays.find((item) => item.date === date) ?? null;

  const cells = useMemo(() => buildMonthGrid(cursor.year, cursor.month), [cursor]);

  const scopedAttendance = useMemo(() => {
    const base = isStudent && user ? attendanceRows.filter((row) => row.name === user.name) : attendanceRows;
    if (batch === "All batches" || isStudent) return base;
    return base.filter((row) => row.batch === batch);
  }, [batch, isStudent, user]);

  const monthPrefix = `${cursor.year}-${String(cursor.month + 1).padStart(2, "0")}`;

  const monthAttendance = useMemo(
    () => scopedAttendance.filter((row) => row.date.startsWith(monthPrefix)),
    [monthPrefix, scopedAttendance],
  );

  const monthHolidays = useMemo(
    () => holidays.filter((item) => item.date.startsWith(monthPrefix)).sort((a, b) => a.date.localeCompare(b.date)),
    [holidays, monthPrefix],
  );

  const summary = useMemo(() => {
    const counts = { present: 0, absent: 0, late: 0, leave: 0, half: 0, holidays: monthHolidays.length };
    for (const row of monthAttendance) {
      if (row.status === "Present") counts.present += 1;
      else if (row.status === "Absent") counts.absent += 1;
      else if (row.status === "Late") counts.late += 1;
      else if (row.status === "Leave") counts.leave += 1;
      else if (row.status === "Half Day") counts.half += 1;
    }
    return counts;
  }, [monthAttendance, monthHolidays.length]);

  const selectedHoliday = findHoliday(selectedDate);
  const selectedIsWeekend = isIsoWeekend(selectedDate);
  const selectedRows = useMemo(() => {
    const rows = attendanceForDate(selectedDate, isStudent && user ? user.name : undefined);
    if (batch === "All batches" || isStudent) return rows;
    return rows.filter((row) => row.batch === batch);
  }, [batch, isStudent, selectedDate, user]);

  const shiftMonth = (delta: number) => {
    setCursor((current) => {
      const next = new Date(current.year, current.month + delta, 1);
      return { year: next.getFullYear(), month: next.getMonth() };
    });
  };

  const goToday = () => {
    const now = new Date();
    setCursor({ year: now.getFullYear(), month: now.getMonth() });
    setSelectedDate(toIsoDate(now.getFullYear(), now.getMonth(), now.getDate()));
  };

  const dayTone = (iso: string, inMonth: boolean, isWeekend: boolean) => {
    if (!inMonth) return "outside";
    const holiday = findHoliday(iso);
    if (holiday) return "holiday";
    if (isWeekend) return "weekend";
    const rows = monthAttendance.filter((row) => row.date === iso);
    if (rows.length === 0) return "empty";
    if (isStudent) return rows[0]?.status ?? "empty";
    if (rows.some((row) => row.status === "Absent")) return "Absent";
    if (rows.some((row) => row.status === "Leave")) return "Leave";
    if (rows.some((row) => row.status === "Late" || row.status === "Half Day")) return "Late";
    if (rows.every((row) => row.status === "Present")) return "Present";
    return "mixed";
  };

  const dayCellClass = (tone: string, selected: boolean, isToday: boolean) => {
    const ring = selected ? "ring-2 ring-brand shadow-sm" : isToday ? "ring-2 ring-brand/50" : "ring-1 ring-border/60";
    if (tone === "outside") return `${ring} bg-muted/25 text-muted-foreground/70`;
    if (tone === "holiday") return `${ring} bg-accent/20`;
    if (tone === "weekend") return `${ring} bg-muted/40`;
    if (tone === "Present") return `${ring} bg-good/10`;
    if (tone === "Absent") return `${ring} bg-bad/10`;
    if (tone === "Late" || tone === "Half Day") return `${ring} bg-accent/20`;
    if (tone === "Leave") return `${ring} bg-brand-soft`;
    if (tone === "mixed") return `${ring} bg-muted/55`;
    return `${ring} bg-background`;
  };

  const addHoliday = (holiday: CentreHoliday) => {
    setHolidays((current) => {
      const withoutSameDate = current.filter((item) => item.date !== holiday.date);
      return [...withoutSameDate, holiday].sort((a, b) => a.date.localeCompare(b.date));
    });
    setSelectedDate(holiday.date);
    const match = /^(\d{4})-(\d{2})-\d{2}$/.exec(holiday.date);
    if (match) {
      setCursor({ year: Number(match[1]), month: Number(match[2]) - 1 });
    }
  };

  const weekdayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <AppShell title="Calendar">
      <div className="animate-classity-rise space-y-4">
        <SectionHeader
          eyebrow="Attendance calendar"
          title="Calendar"
          description={isStudent ? "Track your presence, absences, leave, weekends, and centre holidays by month." : "Review centre attendance, weekends, holidays, and day-wise presence across batches."}
          action={
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" onClick={goToday}>Today</Button>
              {isAdmin && (
                <Button variant="outline" onClick={() => setHolidayOpen(true)}><CalendarDays /> Add holiday</Button>
              )}
              <Button variant="accent" asChild><Link to="/attendance"><ClipboardCheck /> Open attendance</Link></Button>
            </div>
          }
        />

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          <MiniMetric label="Present" value={String(summary.present)} tone="good" />
          <MiniMetric label="Absent" value={String(summary.absent)} tone="bad" />
          <MiniMetric label="Late" value={String(summary.late)} tone="warn" />
          <MiniMetric label="Leave" value={String(summary.leave)} />
          <MiniMetric label="Half day" value={String(summary.half)} tone="warn" />
          <MiniMetric label="Holidays" value={String(summary.holidays)} />
        </div>

        <div className="grid gap-4 xl:grid-cols-[minmax(0,1.7fr)_minmax(17rem,0.85fr)]">
          <Surface className="overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Button size="icon" variant="outline" aria-label="Previous month" onClick={() => shiftMonth(-1)}><ChevronLeft /></Button>
                <div className="min-w-[10rem] text-center sm:text-left">
                  <h2 className="text-lg font-extrabold tracking-tight sm:text-xl">{monthLabel(cursor.year, cursor.month)}</h2>
                  <p className="text-xs text-muted-foreground">Sunday – Saturday · full month grid</p>
                </div>
                <Button size="icon" variant="outline" aria-label="Next month" onClick={() => shiftMonth(1)}><ChevronRight /></Button>
              </div>
              {!isStudent && (
                <label className="grid min-w-[11rem] gap-1.5 text-xs font-semibold text-muted-foreground">
                  Batch
                  <select
                    aria-label="Filter calendar by batch"
                    value={batch}
                    onChange={(e) => setBatch(e.target.value as (typeof attendanceBatches)[number])}
                    className="h-10 rounded-md border border-input bg-background px-3 text-sm font-normal text-foreground"
                  >
                    {attendanceBatches.map((item) => <option key={item} value={item}>{item}</option>)}
                  </select>
                </label>
              )}
            </div>

            <div className="mt-4 overflow-x-auto">
              <div className="min-w-[34rem]">
                <div className="grid grid-cols-7 border-b border-border text-center text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  {weekdayLabels.map((label) => (
                    <div key={label} className={`py-2 ${label === "Sun" || label === "Sat" ? "text-accent-deep" : ""}`}>{label}</div>
                  ))}
                </div>

                <div className="grid grid-cols-7 border-l border-t border-border">
                  {cells.map((cell) => {
                    const holiday = findHoliday(cell.iso);
                    const rows = cell.inMonth ? monthAttendance.filter((row) => row.date === cell.iso) : [];
                    const selected = selectedDate === cell.iso;
                    const isToday = cell.iso === todayIso;
                    const tone = dayTone(cell.iso, cell.inMonth, cell.isWeekend);
                    return (
                      <button
                        key={cell.key}
                        type="button"
                        onClick={() => {
                          setSelectedDate(cell.iso);
                          if (!cell.inMonth) {
                            const match = /^(\d{4})-(\d{2})-\d{2}$/.exec(cell.iso);
                            if (match) setCursor({ year: Number(match[1]), month: Number(match[2]) - 1 });
                          }
                        }}
                        className={`relative flex min-h-[4.5rem] flex-col items-stretch border-b border-r border-border p-1.5 text-left transition-colors hover:bg-brand-soft/40 sm:min-h-[5.75rem] sm:p-2 ${dayCellClass(tone, selected, isToday)}`}
                      >
                        <div className="flex items-center justify-between gap-1">
                          <span
                            className={`grid size-6 place-items-center rounded-full text-xs font-bold sm:size-7 sm:text-sm ${
                              isToday ? "bg-brand text-primary-foreground" : cell.inMonth ? "text-foreground" : "text-muted-foreground"
                            }`}
                          >
                            {cell.day}
                          </span>
                          {holiday && cell.inMonth && <CalendarDays className="size-3 shrink-0 text-accent-deep" />}
                        </div>
                        {cell.inMonth && holiday ? (
                          <p className="mt-auto line-clamp-2 pt-1 text-[9px] font-semibold leading-tight text-accent-deep sm:text-[10px]">{holiday.name}</p>
                        ) : cell.inMonth && isStudent && rows[0] ? (
                          <p className="mt-auto pt-1 text-[9px] font-bold sm:text-[10px]">{rows[0].status}</p>
                        ) : cell.inMonth && rows.length > 0 ? (
                          <div className="mt-auto flex flex-wrap gap-0.5 pt-1">
                            {rows.slice(0, 4).map((row) => (
                              <span
                                key={row.id}
                                className={`size-1.5 rounded-full sm:size-2 ${row.status === "Present" ? "bg-good" : row.status === "Absent" ? "bg-bad" : row.status === "Leave" ? "bg-brand" : "bg-accent"}`}
                                title={`${row.name}: ${row.status}`}
                              />
                            ))}
                          </div>
                        ) : cell.inMonth && cell.isWeekend ? (
                          <p className="mt-auto pt-1 text-[9px] font-medium text-muted-foreground sm:text-[10px]">Weekend</p>
                        ) : null}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2 border-t border-border pt-4">
              {[
                { label: "Present", className: "bg-good/10 text-good" },
                { label: "Absent", className: "bg-bad/10 text-bad" },
                { label: "Late / Half day", className: "bg-accent/20 text-accent-deep" },
                { label: "Leave", className: "bg-brand-soft text-brand" },
                { label: "Holiday", className: "bg-accent/20 text-accent-deep" },
                { label: "Weekend", className: "bg-muted text-muted-foreground" },
              ].map((item) => (
                <span key={item.label} className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${item.className}`}>{item.label}</span>
              ))}
            </div>
          </Surface>

          <div className="space-y-4">
            <Surface>
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand">Selected day</p>
              <h3 className="mt-1 text-xl font-extrabold">{formatAttendanceDate(selectedDate)}</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                {new Intl.DateTimeFormat("en-IN", { weekday: "long" }).format(new Date(`${selectedDate}T00:00:00`))}
                {selectedIsWeekend ? " · Weekend" : ""}
                {selectedDate === todayIso ? " · Today" : ""}
              </p>
              {selectedHoliday ? (
                <div className="mt-3 rounded-xl bg-accent/15 p-3 ring-1 ring-accent/20">
                  <p className="text-sm font-bold text-accent-deep">{selectedHoliday.name}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{selectedHoliday.type} holiday · Centre closed</p>
                </div>
              ) : selectedIsWeekend ? (
                <div className="mt-3 rounded-xl bg-muted/50 p-3 ring-1 ring-border">
                  <p className="text-sm font-semibold">Weekend</p>
                  <p className="mt-1 text-xs text-muted-foreground">No regular classes scheduled.</p>
                </div>
              ) : selectedRows.length === 0 ? (
                <p className="mt-3 text-sm text-muted-foreground">No attendance records for this day.</p>
              ) : (
                <div className="mt-3 space-y-2">
                  {selectedRows.map((row) => (
                    <div key={row.id} className="rounded-xl bg-muted/45 p-3 ring-1 ring-border">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-sm font-semibold">{isStudent ? row.batch : row.name}</p>
                          <p className="text-[11px] text-muted-foreground">{isStudent ? row.studentId : `${row.studentId} · ${row.batch}`}</p>
                        </div>
                        <AttendanceStatusPill value={row.status} />
                      </div>
                      <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                        <div><p className="text-muted-foreground">Check-in</p><p className="font-mono font-semibold">{row.checkIn ?? "—"}</p></div>
                        <div><p className="text-muted-foreground">Check-out</p><p className="font-mono font-semibold">{row.checkOut ?? "—"}</p></div>
                      </div>
                      {row.remarks && <p className="mt-2 text-xs text-muted-foreground">{row.remarks}</p>}
                    </div>
                  ))}
                </div>
              )}
              {isAdmin && !selectedHoliday && (
                <Button className="mt-4 w-full" variant="outline" onClick={() => setHolidayOpen(true)}>
                  <CalendarDays /> Mark {formatAttendanceDate(selectedDate)} as holiday
                </Button>
              )}
            </Surface>

            <Surface>
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-bold">Holidays this month</h3>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">{monthHolidays.length}</span>
                  {isAdmin && (
                    <Button size="sm" variant="outline" onClick={() => setHolidayOpen(true)}><Plus /> Add</Button>
                  )}
                </div>
              </div>
              <div className="mt-3 space-y-2">
                {monthHolidays.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No holidays listed for this month.</p>
                ) : (
                  monthHolidays.map((item) => (
                    <button
                      key={`${item.date}-${item.name}`}
                      type="button"
                      onClick={() => setSelectedDate(item.date)}
                      className={`flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left ring-1 transition-colors ${selectedDate === item.date ? "bg-accent/15 ring-accent/30" : "bg-muted/40 ring-border hover:bg-muted/70"}`}
                    >
                      <div>
                        <p className="text-sm font-semibold">{item.name}</p>
                        <p className="text-[11px] text-muted-foreground">{formatAttendanceDate(item.date)} · {item.type}</p>
                      </div>
                      <CalendarDays className="size-4 text-accent-deep" />
                    </button>
                  ))
                )}
              </div>
            </Surface>
          </div>
        </div>
      </div>
      {holidayOpen && isAdmin && (
        <AddHolidayDialog
          defaultDate={selectedDate}
          onClose={() => setHolidayOpen(false)}
          onSave={addHoliday}
        />
      )}
    </AppShell>
  );
}

function AddHolidayDialog({
  defaultDate,
  onClose,
  onSave,
}: {
  defaultDate: string;
  onClose: () => void;
  onSave: (holiday: CentreHoliday) => void;
}) {
  const [date, setDate] = useState(defaultDate);
  const [name, setName] = useState("");
  const [type, setType] = useState<CentreHoliday["type"]>("Centre");
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState(false);
  const canSubmit = Boolean(date && name.trim());

  const submit = () => {
    if (!canSubmit) return;
    onSave({ date, name: name.trim(), type });
    setSaved(true);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-foreground/25 p-0 sm:items-center sm:p-4">
      <div role="dialog" aria-modal="true" aria-labelledby="holiday-dialog-title" className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-popover p-5 shadow-2xl sm:rounded-2xl sm:p-6">
        {saved ? (
          <div className="py-5 text-center">
            <div className="mx-auto grid size-14 place-items-center rounded-full bg-good/15 text-good"><Check className="size-7" /></div>
            <h2 id="holiday-dialog-title" className="mt-4 text-xl font-extrabold">Holiday added</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {name.trim()} is marked for {formatAttendanceDate(date)}. Demo mode keeps this change in the current session.
            </p>
            <Button className="mt-5" variant="accent" onClick={onClose}>Done</Button>
          </div>
        ) : (
          <>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand">Centre calendar</p>
                <h2 id="holiday-dialog-title" className="mt-1 text-xl font-extrabold">Add holiday</h2>
                <p className="mt-1 text-sm text-muted-foreground">Mark a public or centre holiday so attendance stays closed that day.</p>
              </div>
              <Button size="icon" variant="ghost" aria-label="Close dialog" onClick={onClose}>×</Button>
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <label className="grid gap-1.5 text-sm font-semibold">
                Holiday date
                <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="font-normal" />
              </label>
              <label className="grid gap-1.5 text-sm font-semibold">
                Holiday type
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as CentreHoliday["type"])}
                  className="h-10 rounded-md border border-input bg-background px-3 text-sm font-normal"
                >
                  <option value="Public">Public</option>
                  <option value="Centre">Centre</option>
                </select>
              </label>
              <label className="grid gap-1.5 text-sm font-semibold sm:col-span-2">
                Holiday name
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Staff training day"
                  maxLength={80}
                  className="font-normal"
                />
              </label>
              <label className="grid gap-1.5 text-sm font-semibold sm:col-span-2">
                Internal note
                <Input
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Optional note for staff"
                  maxLength={120}
                  className="font-normal"
                />
              </label>
            </div>
            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <Button variant="outline" onClick={onClose}>Cancel</Button>
              <Button variant="accent" disabled={!canSubmit} onClick={submit}><CalendarDays /> Save holiday</Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function attendanceStatusClass(value: AttendanceStatus) {
  if (value === "Present") return "bg-good/10 text-good";
  if (value === "Absent") return "bg-bad/10 text-bad";
  if (value === "Late" || value === "Half Day") return "bg-accent/20 text-accent-deep";
  return "bg-brand-soft text-brand";
}

function AttendanceStatusPill({ value }: { value: AttendanceStatus }) {
  return <span className={`rounded-full px-2 py-1 text-[10px] font-bold ${attendanceStatusClass(value)}`}>{value}</span>;
}

function MarkAttendanceDialog({ row, onClose, onSave }: { row?: AttendanceRow; onClose: () => void; onSave?: (row: AttendanceRow) => void }) {
  const isEdit = Boolean(row);
  const [saved, setSaved] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<AttendanceStatus>(row?.status ?? "Present");
  const [checkIn, setCheckIn] = useState(row?.checkIn ?? "08:15");
  const [checkOut, setCheckOut] = useState(row?.checkOut ?? "13:00");
  const [remarks, setRemarks] = useState(row?.remarks ?? "");
  const [date, setDate] = useState(row?.date ?? "2026-09-18");

  const save = () => {
    if (row && onSave) {
      onSave({
        ...row,
        date,
        checkIn: checkIn || null,
        checkOut: checkOut || null,
        duration: checkIn && checkOut ? row.duration ?? "—" : null,
        status: selectedStatus,
        remarks: remarks.trim() || null,
      });
      return;
    }
    setSaved(true);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-foreground/25 p-0 sm:items-center sm:p-4">
      <div role="dialog" aria-modal="true" aria-labelledby="mark-attendance-title" className="w-full max-w-lg rounded-t-3xl bg-popover p-5 shadow-2xl sm:rounded-2xl sm:p-6">
        {saved ? (
          <div className="py-5 text-center">
            <div className="mx-auto grid size-14 place-items-center rounded-full bg-good/15 text-good"><Check className="size-7" /></div>
            <h2 id="mark-attendance-title" className="mt-4 text-xl font-extrabold">Attendance marked</h2>
            <p className="mt-1 text-sm text-muted-foreground">Demo mode saved this entry locally for the selected student.</p>
            <Button className="mt-5" variant="accent" onClick={onClose}>Done</Button>
          </div>
        ) : (
          <>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand">{isEdit ? "Edit record" : "Quick mark"}</p>
                <h2 id="mark-attendance-title" className="mt-1 text-xl font-extrabold">{isEdit ? "Edit attendance" : "Mark attendance"}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{isEdit ? `Update the register entry for ${row?.name}.` : "Record today’s status for a student in a few taps."}</p>
              </div>
              <Button size="icon" variant="ghost" aria-label="Close mark attendance dialog" onClick={onClose}>×</Button>
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <label className="grid gap-1.5 text-sm font-semibold sm:col-span-2">Student
                <select disabled={isEdit} defaultValue={row ? `${row.name} · ${row.studentId}` : undefined} className="h-10 rounded-md border border-input bg-background px-3 text-sm font-normal disabled:opacity-70">
                  {row ? <option>{row.name} · {row.studentId}</option> : null}
                  <option>Aarav Menon · STU-1024</option>
                  <option>Diya Sharma · STU-1025</option>
                  <option>Ishaan Nair · STU-1026</option>
                  <option>Ananya Iyer · STU-1027</option>
                </select>
              </label>
              <label className="grid gap-1.5 text-sm font-semibold">Date
                <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
              </label>
              <label className="grid gap-1.5 text-sm font-semibold">Batch
                <select disabled={isEdit} defaultValue={row?.batch} className="h-10 rounded-md border border-input bg-background px-3 text-sm font-normal disabled:opacity-70">
                  <option>JEE 2027</option>
                  <option>NEET 2027</option>
                  <option>Class 10 Maths</option>
                  <option>Class 12 Physics</option>
                </select>
              </label>
              <label className="grid gap-1.5 text-sm font-semibold">Check-in
                <Input type="time" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
              </label>
              <label className="grid gap-1.5 text-sm font-semibold">Check-out
                <Input type="time" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
              </label>
            </div>
            <p className="mt-4 text-xs font-semibold text-muted-foreground">Status</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {(["Present", "Absent", "Late", "Half Day", "Leave"] as AttendanceStatus[]).map((item) => (
                <button key={item} type="button" onClick={() => setSelectedStatus(item)} className={`rounded-full px-2.5 py-1.5 text-[11px] font-bold ${selectedStatus === item ? attendanceStatusClass(item) : "bg-muted text-muted-foreground"}`}>{item}</button>
              ))}
            </div>
            <label className="mt-4 grid gap-1.5 text-sm font-semibold">Remarks
              <Input placeholder="Optional note for staff" maxLength={120} value={remarks} onChange={(e) => setRemarks(e.target.value)} />
            </label>
            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <Button variant="outline" onClick={onClose}>Cancel</Button>
              <Button variant="accent" onClick={save}>{isEdit ? "Save changes" : "Save attendance"}</Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export function AccountantDashboardPage() {
  const { user } = useAuth();
  const firstName = user?.name.split(" ")[0] ?? "Priya";
  const outstanding = feeRows.filter((row) => row.pending > 0);

  return (
    <AppShell title="Accountant Dashboard">
      <div className="animate-classity-rise space-y-4">
        <SectionHeader
          eyebrow="Finance workspace"
          title={`Good morning, ${firstName}`}
          description="Collections, outstanding balances, and receipts that need your attention today."
          action={
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" asChild><Link to="/reports">Open reports</Link></Button>
              <Button variant="accent" asChild><Link to="/fees"><WalletCards /> Collect fees</Link></Button>
            </div>
          }
        />
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <MiniMetric label="Collected today" value="₹38,500" tone="good" />
          <MiniMetric label="Due today" value="₹1,02,400" />
          <MiniMetric label="Overdue ledger" value="₹48,200" tone="bad" />
          <MiniMetric label="Receipts issued" value="214" />
        </div>
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <Surface>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="font-bold">Priority collections</h2>
                <p className="text-xs text-muted-foreground">Highest-value unpaid fees ready to chase</p>
              </div>
              <Button variant="outline" size="sm" asChild><Link to="/fees">View all</Link></Button>
            </div>
            <div className="mt-3 divide-y divide-border">
              {outstanding.map((row) => (
                <div key={row.id} className="flex flex-wrap items-center gap-3 py-3">
                  <div className="grid size-9 place-items-center rounded-full bg-brand-soft text-xs font-bold text-brand">{row.initials}</div>
                  <div className="min-w-[10rem] flex-1">
                    <p className="text-sm font-semibold">{row.name}</p>
                    <p className="text-xs text-muted-foreground">{row.batch} · Due {row.due}</p>
                  </div>
                  <StatusPill value={row.status} />
                  <div className="w-24 text-right font-mono text-sm font-semibold">{formatInr(row.pending)}</div>
                  <Button size="sm" variant="accent" asChild><Link to="/fees">Collect</Link></Button>
                </div>
              ))}
            </div>
          </Surface>
          <Surface className="bg-brand-deep text-sidebar-foreground">
            <h2 className="text-base font-bold tracking-tight">Cash position</h2>
            <p className="mt-1 text-xs text-sidebar-foreground/70">Month-to-date snapshot</p>
            <div className="mt-5 space-y-3">
              <div className="rounded-xl bg-sidebar-foreground/5 p-3 ring-1 ring-sidebar-foreground/10">
                <p className="text-[11px] text-sidebar-foreground/60">Expected this month</p>
                <p className="mt-1 font-mono text-xl font-extrabold">₹6,07,300</p>
              </div>
              <div className="rounded-xl bg-sidebar-foreground/5 p-3 ring-1 ring-sidebar-foreground/10">
                <p className="text-[11px] text-sidebar-foreground/60">Collected</p>
                <p className="mt-1 font-mono text-xl font-extrabold text-sidebar-primary">₹4,82,500</p>
              </div>
              <div className="rounded-xl bg-sidebar-foreground/5 p-3 ring-1 ring-sidebar-foreground/10">
                <p className="text-[11px] text-sidebar-foreground/60">Still open</p>
                <p className="mt-1 font-mono text-xl font-extrabold">₹1,24,800</p>
              </div>
            </div>
            <Button variant="accent" className="mt-4 w-full" asChild><Link to="/reports">Export report <ArrowUpRight /></Link></Button>
          </Surface>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <Link to="/fee-plans" className="glass-surface flex items-center gap-3 rounded-2xl p-4 transition-transform hover:-translate-y-0.5">
            <div className="grid size-9 place-items-center rounded-xl bg-brand-soft text-brand"><WalletCards className="size-4" /></div>
            <div><p className="text-sm font-bold">Fee plans</p><p className="text-xs text-muted-foreground">3 active cycles</p></div>
            <ChevronRight className="ml-auto size-4 text-muted-foreground" />
          </Link>
          <Link to="/receipts" className="glass-surface flex items-center gap-3 rounded-2xl p-4 transition-transform hover:-translate-y-0.5">
            <div className="grid size-9 place-items-center rounded-xl bg-brand-soft text-brand"><FilePlus2 className="size-4" /></div>
            <div><p className="text-sm font-bold">Receipts</p><p className="text-xs text-muted-foreground">214 this month</p></div>
            <ChevronRight className="ml-auto size-4 text-muted-foreground" />
          </Link>
          <Link to="/reports" className="glass-surface flex items-center gap-3 rounded-2xl p-4 transition-transform hover:-translate-y-0.5">
            <div className="grid size-9 place-items-center rounded-xl bg-brand-soft text-brand"><Sparkles className="size-4" /></div>
            <div><p className="text-sm font-bold">Reports</p><p className="text-xs text-muted-foreground">79.4% collection rate</p></div>
            <ChevronRight className="ml-auto size-4 text-muted-foreground" />
          </Link>
        </div>
      </div>
    </AppShell>
  );
}

export function StudentDashboardPage() {
  const { user } = useAuth();
  const firstName = user?.name.split(" ")[0] ?? "Aarav";
  const myFees = feeRows.find((row) => row.name === "Aarav Menon") ?? feeRows[0]!;
  const myAttendance = attendanceRows.filter((row) => row.studentId === "STU-1024").slice(0, 4);

  return (
    <AppShell title="Student Dashboard">
      <div className="animate-classity-rise space-y-4">
        <SectionHeader
          eyebrow="Student portal"
          title={`Hi, ${firstName}`}
          description="Your classes, attendance, and fee status in one place."
          action={
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" asChild><Link to="/attendance"><ClipboardCheck /> Attendance</Link></Button>
              <Button variant="accent" asChild><Link to="/receipts"><FilePlus2 /> Receipts</Link></Button>
            </div>
          }
        />
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <MiniMetric label="Batch" value="JEE 2027" />
          <MiniMetric label="Attendance" value="92%" tone="good" />
          <MiniMetric label="Outstanding" value={formatInr(myFees.pending)} tone={myFees.pending > 0 ? "warn" : "good"} />
          <MiniMetric label="Next due" value={myFees.due} />
        </div>
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <Surface>
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="font-bold">Recent attendance</h2>
                <p className="text-xs text-muted-foreground">Your latest check-ins for JEE 2027</p>
              </div>
              <Button variant="link" asChild><Link to="/attendance">View all <ChevronRight /></Link></Button>
            </div>
            <div className="mt-3 divide-y divide-border">
              {myAttendance.map((row) => (
                <div key={row.id} className="flex flex-wrap items-center gap-3 py-3">
                  <div className="min-w-[8rem] flex-1">
                    <p className="text-sm font-semibold">{formatAttendanceDate(row.date)}</p>
                    <p className="text-xs text-muted-foreground">{row.checkIn ? `In ${row.checkIn}` : "No check-in"}{row.checkOut ? ` · Out ${row.checkOut}` : ""}</p>
                  </div>
                  <span className={`rounded-full px-2 py-1 text-[10px] font-bold ${row.status === "Present" ? "bg-good/10 text-good" : row.status === "Absent" ? "bg-bad/10 text-bad" : "bg-accent/20 text-accent-deep"}`}>{row.status}</span>
                  <p className="w-20 text-right font-mono text-xs font-semibold">{row.duration ?? "—"}</p>
                </div>
              ))}
            </div>
          </Surface>
          <Surface>
            <h2 className="font-bold">Profile</h2>
            <p className="mt-1 text-xs text-muted-foreground">Linked to Bright Future Academy</p>
            <div className="mt-4 flex items-center gap-3">
              <div className="grid size-12 place-items-center rounded-full bg-brand-soft text-sm font-bold text-brand">{user?.initials ?? "AM"}</div>
              <div>
                <p className="text-sm font-semibold">{user?.name ?? "Aarav Menon"}</p>
                <p className="text-xs text-muted-foreground">STU-1024 · {user?.email}</p>
              </div>
            </div>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between rounded-lg bg-muted/60 px-3 py-2"><span className="text-muted-foreground">Parent</span><span className="font-semibold">Ramesh Menon</span></div>
              <div className="flex justify-between rounded-lg bg-muted/60 px-3 py-2"><span className="text-muted-foreground">Fee plan</span><span className="font-semibold">JEE Monthly</span></div>
              <div className="flex justify-between rounded-lg bg-muted/60 px-3 py-2"><span className="text-muted-foreground">Status</span><StatusPill value={myFees.status} /></div>
            </div>
          </Surface>
        </div>
        <Surface>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="font-bold">Fee & payments</h2>
              <p className="text-xs text-muted-foreground">Current balance and payment history shortcuts</p>
            </div>
            <Button variant="outline" size="sm" asChild><Link to="/receipts">View receipts</Link></Button>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl bg-muted/50 p-4 ring-1 ring-border">
              <p className="text-xs text-muted-foreground">Monthly fee</p>
              <p className="mt-1 font-mono text-xl font-extrabold">₹5,000</p>
            </div>
            <div className="rounded-xl bg-muted/50 p-4 ring-1 ring-border">
              <p className="text-xs text-muted-foreground">Paid this month</p>
              <p className="mt-1 font-mono text-xl font-extrabold text-good">₹2,000</p>
            </div>
            <div className="rounded-xl bg-muted/50 p-4 ring-1 ring-border">
              <p className="text-xs text-muted-foreground">Remaining</p>
              <p className="mt-1 font-mono text-xl font-extrabold text-accent-deep">{formatInr(myFees.pending)}</p>
            </div>
          </div>
        </Surface>
        <div className="grid gap-4 md:grid-cols-2">
          <Link to="/batches" className="glass-surface flex items-center gap-3 rounded-2xl p-4 transition-transform hover:-translate-y-0.5">
            <div className="grid size-9 place-items-center rounded-xl bg-brand-soft text-brand"><Users className="size-4" /></div>
            <div><p className="text-sm font-bold">My classes</p><p className="text-xs text-muted-foreground">JEE 2027 · Physics · Maths</p></div>
            <ChevronRight className="ml-auto size-4 text-muted-foreground" />
          </Link>
          <Link to="/attendance" className="glass-surface flex items-center gap-3 rounded-2xl p-4 transition-transform hover:-translate-y-0.5">
            <div className="grid size-9 place-items-center rounded-xl bg-brand-soft text-brand"><ClipboardCheck className="size-4" /></div>
            <div><p className="text-sm font-bold">Attendance register</p><p className="text-xs text-muted-foreground">Present 11 of 12 this week</p></div>
            <ChevronRight className="ml-auto size-4 text-muted-foreground" />
          </Link>
        </div>
      </div>
    </AppShell>
  );
}

export function ReportsPage() {
  const [tab, setTab] = useState<"collection" | "overdue" | "attendance" | "batches">("collection");
  const [query, setQuery] = useState("");

  const overdueRows = useMemo(
    () => collectionReportRows.filter((row) => row.collectionStatus === "OVERDUE" || row.pendingAmount > 0 && row.collectionStatus !== "PAID"),
    [],
  );

  const collectionFiltered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const source = tab === "overdue" ? overdueRows : collectionReportRows;
    if (!q) return source;
    return source.filter((row) =>
      [row.studentId, row.studentName, row.batchName, row.feePlanName, row.collectionStatus].join(" ").toLowerCase().includes(q),
    );
  }, [overdueRows, query, tab]);

  const attendanceFiltered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return attendanceRows;
    return attendanceRows.filter((row) =>
      [row.studentId, row.name, row.batch, row.status, row.date].join(" ").toLowerCase().includes(q),
    );
  }, [query]);

  const batchFiltered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return batchHealthReportRows;
    return batchHealthReportRows.filter((row) => row.batchName.toLowerCase().includes(q));
  }, [query]);

  const totals = useMemo(() => {
    const expected = collectionReportRows.reduce((sum, row) => sum + row.expectedAmount, 0);
    const collected = collectionReportRows.reduce((sum, row) => sum + row.collectedAmount, 0);
    const pending = collectionReportRows.reduce((sum, row) => sum + row.pendingAmount, 0);
    const overdue = collectionReportRows.filter((row) => row.collectionStatus === "OVERDUE").length;
    return { expected, collected, pending, overdue, rate: expected ? `${((collected / expected) * 100).toFixed(1)}%` : "0%" };
  }, []);

  const exportExcel = () => {
    if (tab === "collection" || tab === "overdue") {
      const rows = collectionFiltered.map((row) => [
        row.studentId,
        row.studentName,
        row.batchName,
        row.feePlanName,
        row.expectedAmount,
        row.collectedAmount,
        row.pendingAmount,
        row.collectionStatus,
        row.dueDate,
        row.lastPaymentDate,
      ]);
      exportRowsToExcel(
        tab === "overdue" ? "classity-overdue-report.xls" : "classity-collection-report.xls",
        ["Student ID", "Student name", "Batch name", "Fee plan name", "Expected amount (₹)", "Collected amount (₹)", "Pending amount (₹)", "Collection status", "Due date", "Last payment date"],
        rows,
      );
      return;
    }
    if (tab === "attendance") {
      exportRowsToExcel(
        "classity-attendance-report.xls",
        ["Attendance ID", "Student ID", "Student name", "Batch name", "Date", "Check-in time", "Check-out time", "Duration", "Attendance status", "Remarks"],
        attendanceFiltered.map((row) => [
          row.id,
          row.studentId,
          row.name,
          row.batch,
          formatAttendanceDate(row.date),
          row.checkIn ?? "—",
          row.checkOut ?? "—",
          row.duration ?? "—",
          row.status,
          row.remarks ?? "—",
        ]),
      );
      return;
    }
    exportRowsToExcel(
      "classity-batch-health-report.xls",
      ["Batch name", "Start date", "End date", "Enrolled students", "Active students", "Expected fees (₹)", "Collected fees (₹)", "Overdue count", "Attendance rate"],
      batchFiltered.map((row) => [
        row.batchName,
        formatAttendanceDate(row.startDate),
        formatAttendanceDate(row.endDate),
        row.enrolledStudents,
        row.activeStudents,
        row.expectedFees,
        row.collectedFees,
        row.overdueCount,
        row.attendanceRate,
      ]),
    );
  };

  const tabs = [
    { id: "collection" as const, label: "Collection" },
    { id: "overdue" as const, label: "Overdue" },
    { id: "attendance" as const, label: "Attendance" },
    { id: "batches" as const, label: "Batch health" },
  ];

  return (
    <AppShell title="Reports">
      <div className="animate-classity-rise space-y-4">
        <SectionHeader
          eyebrow="Centre intelligence"
          title="Reports"
          description="Review collection, overdue dues, attendance, and batch health in one place."
          action={
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" onClick={exportExcel}><Download /> Export Excel</Button>
              <Button variant="accent" onClick={exportExcel}><Sparkles /> Download report</Button>
            </div>
          }
        />

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
          <MiniMetric label="Expected fees" value={formatInr(totals.expected)} />
          <MiniMetric label="Collected" value={formatInr(totals.collected)} tone="good" />
          <MiniMetric label="Pending" value={formatInr(totals.pending)} tone="warn" />
          <MiniMetric label="Overdue students" value={String(totals.overdue)} tone="bad" />
          <MiniMetric label="Collection rate" value={totals.rate} />
        </div>

        <Surface>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex rounded-lg bg-muted/65 p-0.5 ring-1 ring-border">
              {tabs.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => { setTab(item.id); setQuery(""); }}
                  className={`rounded-md px-2.5 py-1.5 text-xs font-semibold ${tab === item.id ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground"}`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div className="flex min-w-[14rem] flex-1 items-center gap-2 rounded-lg border border-input bg-background px-3 sm:max-w-xs">
              <Search className="size-4 text-muted-foreground" />
              <Input
                aria-label="Search report rows"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search report rows"
                className="border-0 bg-transparent shadow-none focus-visible:ring-0"
              />
            </div>
            <Button variant="outline" size="sm" onClick={exportExcel}><FilePlus2 /> Export Excel</Button>
          </div>

          {(tab === "collection" || tab === "overdue") && (
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[960px] text-left">
                <thead>
                  <tr className="border-b border-border text-[11px] uppercase tracking-wider text-muted-foreground">
                    <th className="pb-3 pl-2">Student ID</th>
                    <th className="pb-3">Student name</th>
                    <th className="pb-3">Batch name</th>
                    <th className="pb-3">Fee plan name</th>
                    <th className="pb-3 text-right">Expected</th>
                    <th className="pb-3 text-right">Collected</th>
                    <th className="pb-3 text-right">Pending</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3">Due date</th>
                    <th className="pb-3">Last payment</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {collectionFiltered.map((row) => (
                    <tr key={`${tab}-${row.studentId}`}>
                      <td className="py-3 pl-2 font-mono text-xs">{row.studentId}</td>
                      <td className="py-3 text-sm font-semibold">{row.studentName}</td>
                      <td className="py-3 text-xs text-muted-foreground">{row.batchName}</td>
                      <td className="py-3 text-xs text-muted-foreground">{row.feePlanName}</td>
                      <td className="py-3 text-right font-mono text-sm">{formatInr(row.expectedAmount)}</td>
                      <td className="py-3 text-right font-mono text-sm text-good">{formatInr(row.collectedAmount)}</td>
                      <td className="py-3 text-right font-mono text-sm">{formatInr(row.pendingAmount)}</td>
                      <td className="py-3"><StatusPill value={row.collectionStatus} /></td>
                      <td className="py-3 text-xs">{row.dueDate}</td>
                      <td className="py-3 text-xs text-muted-foreground">{row.lastPaymentDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {collectionFiltered.length === 0 && <p className="py-10 text-center text-sm text-muted-foreground">No collection rows match your search.</p>}
            </div>
          )}

          {tab === "attendance" && (
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[920px] text-left">
                <thead>
                  <tr className="border-b border-border text-[11px] uppercase tracking-wider text-muted-foreground">
                    <th className="pb-3 pl-2">Attendance ID</th>
                    <th className="pb-3">Student ID</th>
                    <th className="pb-3">Student name</th>
                    <th className="pb-3">Batch name</th>
                    <th className="pb-3">Date</th>
                    <th className="pb-3">Check-in</th>
                    <th className="pb-3">Check-out</th>
                    <th className="pb-3">Duration</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3">Remarks</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {attendanceFiltered.map((row) => (
                    <tr key={row.id}>
                      <td className="py-3 pl-2 font-mono text-xs">{row.id}</td>
                      <td className="py-3 font-mono text-xs">{row.studentId}</td>
                      <td className="py-3 text-sm font-semibold">{row.name}</td>
                      <td className="py-3 text-xs text-muted-foreground">{row.batch}</td>
                      <td className="py-3 text-xs">{formatAttendanceDate(row.date)}</td>
                      <td className="py-3 font-mono text-sm">{row.checkIn ?? "—"}</td>
                      <td className="py-3 font-mono text-sm">{row.checkOut ?? "—"}</td>
                      <td className="py-3 font-mono text-sm">{row.duration ?? "—"}</td>
                      <td className="py-3"><span className={`rounded-full px-2 py-1 text-[10px] font-bold ${row.status === "Present" ? "bg-good/10 text-good" : row.status === "Absent" ? "bg-bad/10 text-bad" : "bg-accent/20 text-accent-deep"}`}>{row.status}</span></td>
                      <td className="max-w-[12rem] py-3 text-xs text-muted-foreground">{row.remarks ?? "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {attendanceFiltered.length === 0 && <p className="py-10 text-center text-sm text-muted-foreground">No attendance rows match your search.</p>}
            </div>
          )}

          {tab === "batches" && (
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[960px] text-left">
                <thead>
                  <tr className="border-b border-border text-[11px] uppercase tracking-wider text-muted-foreground">
                    <th className="pb-3 pl-2">Batch name</th>
                    <th className="pb-3">Start date</th>
                    <th className="pb-3">End date</th>
                    <th className="pb-3 text-right">Enrolled</th>
                    <th className="pb-3 text-right">Active</th>
                    <th className="pb-3 text-right">Expected fees</th>
                    <th className="pb-3 text-right">Collected fees</th>
                    <th className="pb-3 text-right">Overdue count</th>
                    <th className="pb-3 text-right">Attendance rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {batchFiltered.map((row) => (
                    <tr key={row.batchName}>
                      <td className="py-3 pl-2 text-sm font-semibold">{row.batchName}</td>
                      <td className="py-3 text-xs font-medium">{formatAttendanceDate(row.startDate)}</td>
                      <td className="py-3 text-xs font-medium">{formatAttendanceDate(row.endDate)}</td>
                      <td className="py-3 text-right font-mono text-sm">{row.enrolledStudents}</td>
                      <td className="py-3 text-right font-mono text-sm">{row.activeStudents}</td>
                      <td className="py-3 text-right font-mono text-sm">{formatInr(row.expectedFees)}</td>
                      <td className="py-3 text-right font-mono text-sm text-good">{formatInr(row.collectedFees)}</td>
                      <td className="py-3 text-right font-mono text-sm text-bad">{row.overdueCount}</td>
                      <td className="py-3 text-right text-sm font-semibold">{row.attendanceRate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {batchFiltered.length === 0 && <p className="py-10 text-center text-sm text-muted-foreground">No batch rows match your search.</p>}
            </div>
          )}
        </Surface>
      </div>
    </AppShell>
  );
}

export function SettingsPage() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);
  const [fullName, setFullName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [phone, setPhone] = useState("+91 98765 43210");
  const [centreName, setCentreName] = useState("Bright Future Academy");
  const [city, setCity] = useState("Kochi");
  const [language, setLanguage] = useState("English");
  const [timezone, setTimezone] = useState("Asia/Kolkata (IST)");
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [whatsappAlerts, setWhatsappAlerts] = useState(true);
  const [feeReminders, setFeeReminders] = useState(user?.role !== "student");
  const [attendanceAlerts, setAttendanceAlerts] = useState(true);

  useEffect(() => {
    setFullName(user?.name ?? "");
    setEmail(user?.email ?? "");
  }, [user]);

  const roleLabel = user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : "User";

  return (
    <AppShell title="Settings">
      <div className="animate-classity-rise space-y-4">
        <SectionHeader
          eyebrow="Account & preferences"
          title="Settings"
          description="Manage your profile, centre details, and notification preferences."
          action={
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" onClick={() => { signOut(); void navigate({ to: "/auth" }); }}><LogOut /> Sign out</Button>
              <Button variant="accent" onClick={() => setSaved(true)}>{saved ? <><Check /> Saved</> : "Save changes"}</Button>
            </div>
          }
        />

        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <div className="space-y-4">
            <Surface>
              <h2 className="font-bold">Profile</h2>
              <p className="mt-1 text-xs text-muted-foreground">Details shown across your Classity workspace.</p>
              <div className="mt-5 flex flex-wrap items-center gap-4">
                <div className="grid size-14 place-items-center rounded-full bg-brand-soft text-sm font-bold text-brand">{user?.initials ?? "—"}</div>
                <div>
                  <p className="text-sm font-semibold">{user?.name}</p>
                  <p className="text-xs text-muted-foreground">{user?.title}</p>
                  <span className="mt-2 inline-flex rounded-full bg-brand-soft px-2 py-0.5 text-[10px] font-bold text-brand">{roleLabel}</span>
                </div>
              </div>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <label className="grid gap-1.5 text-sm font-semibold">Full name<Input value={fullName} onChange={(e) => { setFullName(e.target.value); setSaved(false); }} /></label>
                <label className="grid gap-1.5 text-sm font-semibold">Work email<Input type="email" value={email} onChange={(e) => { setEmail(e.target.value); setSaved(false); }} /></label>
                <label className="grid gap-1.5 text-sm font-semibold">Mobile number<Input value={phone} onChange={(e) => { setPhone(e.target.value); setSaved(false); }} inputMode="tel" /></label>
                <label className="grid gap-1.5 text-sm font-semibold">Role
                  <Input value={roleLabel} disabled className="disabled:opacity-70" />
                </label>
              </div>
            </Surface>

            {(user?.role === "admin" || user?.role === "accountant") && (
              <Surface>
                <h2 className="font-bold">Centre details</h2>
                <p className="mt-1 text-xs text-muted-foreground">Shared information for Bright Future Academy.</p>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <label className="grid gap-1.5 text-sm font-semibold sm:col-span-2">Centre name<Input value={centreName} onChange={(e) => { setCentreName(e.target.value); setSaved(false); }} /></label>
                  <label className="grid gap-1.5 text-sm font-semibold">City<Input value={city} onChange={(e) => { setCity(e.target.value); setSaved(false); }} /></label>
                  <label className="grid gap-1.5 text-sm font-semibold">Timezone
                    <select className="h-10 rounded-md border border-input bg-background px-3 text-sm font-normal" value={timezone} onChange={(e) => { setTimezone(e.target.value); setSaved(false); }}>
                      <option>Asia/Kolkata (IST)</option>
                      <option>Asia/Dubai (GST)</option>
                      <option>UTC</option>
                    </select>
                  </label>
                </div>
              </Surface>
            )}

            {user?.role === "student" && (
              <Surface>
                <h2 className="font-bold">Student preferences</h2>
                <p className="mt-1 text-xs text-muted-foreground">How you receive updates about classes and fees.</p>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <label className="grid gap-1.5 text-sm font-semibold">Batch
                    <Input value="JEE 2027" disabled className="disabled:opacity-70" />
                  </label>
                  <label className="grid gap-1.5 text-sm font-semibold">Student ID
                    <Input value="STU-1024" disabled className="disabled:opacity-70" />
                  </label>
                </div>
              </Surface>
            )}

            <Surface>
              <h2 className="font-bold">Preferences</h2>
              <p className="mt-1 text-xs text-muted-foreground">Language and alert channels for this account.</p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <label className="grid gap-1.5 text-sm font-semibold">Language
                  <select className="h-10 rounded-md border border-input bg-background px-3 text-sm font-normal" value={language} onChange={(e) => { setLanguage(e.target.value); setSaved(false); }}>
                    <option>English</option>
                    <option>Malayalam</option>
                    <option>Hindi</option>
                  </select>
                </label>
                <label className="grid gap-1.5 text-sm font-semibold">Default landing page
                  <Input value={user ? homePathForRole(user.role) : "/"} disabled className="disabled:opacity-70" />
                </label>
              </div>
              <div className="mt-5 space-y-3">
                <SettingsToggle label="Email alerts" description="Receive important updates by email" checked={emailAlerts} onChange={(value) => { setEmailAlerts(value); setSaved(false); }} />
                <SettingsToggle label="WhatsApp alerts" description="Get reminders on WhatsApp" checked={whatsappAlerts} onChange={(value) => { setWhatsappAlerts(value); setSaved(false); }} />
                {(user?.role === "admin" || user?.role === "accountant") && (
                  <SettingsToggle label="Fee reminder digests" description="Daily summary of dues and collections" checked={feeReminders} onChange={(value) => { setFeeReminders(value); setSaved(false); }} />
                )}
                <SettingsToggle label="Attendance alerts" description="Notify when attendance is marked or missed" checked={attendanceAlerts} onChange={(value) => { setAttendanceAlerts(value); setSaved(false); }} />
              </div>
              <Button className="mt-5" variant="accent" onClick={() => setSaved(true)}>{saved ? <><Check /> Saved</> : "Save settings"}</Button>
            </Surface>
          </div>

          <div className="space-y-4">
            <Surface>
              <h2 className="font-bold">Session</h2>
              <p className="mt-1 text-xs text-muted-foreground">Signed in with the demo {roleLabel.toLowerCase()} account.</p>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between rounded-lg bg-muted/60 px-3 py-2"><span className="text-muted-foreground">Email</span><span className="font-semibold">{user?.email}</span></div>
                <div className="flex justify-between rounded-lg bg-muted/60 px-3 py-2"><span className="text-muted-foreground">Role</span><span className="font-semibold capitalize">{user?.role}</span></div>
              </div>
              <Button className="mt-4 w-full" variant="outline" asChild><Link to="/auth">Switch account</Link></Button>
              <Button className="mt-2 w-full" variant="accent" onClick={() => { signOut(); void navigate({ to: "/auth" }); }}>Sign out</Button>
            </Surface>
            {user?.role === "admin" && (
              <Surface>
                <h2 className="font-bold">Admin tools</h2>
                <p className="mt-1 text-xs text-muted-foreground">Shortcuts for centre operations.</p>
                <div className="mt-4 space-y-2">
                  <Button variant="outline" className="w-full justify-start" asChild><Link to="/students">Manage students</Link></Button>
                  <Button variant="outline" className="w-full justify-start" asChild><Link to="/fee-plans">Fee plans</Link></Button>
                  <Button variant="outline" className="w-full justify-start" asChild><Link to="/reports">Open reports</Link></Button>
                </div>
              </Surface>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function SettingsToggle({ label, description, checked, onChange }: { label: string; description: string; checked: boolean; onChange: (value: boolean) => void }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="flex w-full items-center justify-between gap-3 rounded-xl bg-muted/50 px-3 py-3 text-left ring-1 ring-border transition-colors hover:bg-muted/70"
    >
      <div>
        <p className="text-sm font-semibold">{label}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <span className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${checked ? "bg-primary" : "bg-muted-foreground/30"}`}>
        <span className={`absolute top-0.5 size-5 rounded-full bg-background shadow-sm transition-transform ${checked ? "left-5" : "left-0.5"}`} />
      </span>
    </button>
  );
}

export function NotificationsPage() {
  const { user } = useAuth();
  const role = user?.role ?? "admin";
  const [items, setItems] = useState(() => notificationsForRole(role));
  const [filter, setFilter] = useState<"all" | "unread">("all");

  useEffect(() => {
    setItems(notificationsForRole(role));
    setFilter("all");
  }, [role]);

  const visible = useMemo(
    () => (filter === "unread" ? items.filter((item) => !item.read) : items),
    [filter, items],
  );
  const unread = items.filter((item) => !item.read).length;

  const markAllRead = () => setItems((current) => current.map((item) => ({ ...item, read: true })));
  const markRead = (id: string) => setItems((current) => current.map((item) => (item.id === id ? { ...item, read: true } : item)));

  const toneClass = (tone: "brand" | "accent" | "good" | "bad") =>
    tone === "good" ? "bg-good/10 text-good" : tone === "bad" ? "bg-bad/10 text-bad" : tone === "accent" ? "bg-accent/20 text-accent-deep" : "bg-brand-soft text-brand";

  return (
    <AppShell title="Notifications">
      <div className="animate-classity-rise space-y-4">
        <SectionHeader
          eyebrow={`${role} inbox`}
          title="Notifications"
          description="Updates relevant to your role — fees, attendance, classes, and centre activity."
          action={
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" disabled={unread === 0} onClick={markAllRead}>Mark all read</Button>
            </div>
          }
        />
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          <MiniMetric label="Total" value={String(items.length)} />
          <MiniMetric label="Unread" value={String(unread)} tone={unread > 0 ? "warn" : "good"} />
          <MiniMetric label="Role" value={role.charAt(0).toUpperCase() + role.slice(1)} />
        </div>
        <Surface>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="font-bold">Your alerts</h2>
              <p className="text-xs text-muted-foreground">Only {role} notifications are shown here</p>
            </div>
            <div className="flex rounded-lg bg-muted/65 p-0.5 ring-1 ring-border">
              {(["all", "unread"] as const).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setFilter(item)}
                  className={`rounded-md px-2.5 py-1 text-xs font-semibold capitalize ${filter === item ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground"}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          {visible.length === 0 ? (
            <div className="mt-8 flex flex-col items-center py-10 text-center">
              <div className="grid size-14 place-items-center rounded-2xl bg-brand-soft text-brand"><Bell className="size-6" /></div>
              <h3 className="mt-4 text-lg font-extrabold">You're all caught up</h3>
              <p className="mt-1 max-w-sm text-sm text-muted-foreground">No {filter === "unread" ? "unread " : ""}notifications for your role right now.</p>
            </div>
          ) : (
            <div className="mt-4 divide-y divide-border">
              {visible.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => markRead(item.id)}
                  className={`flex w-full flex-col gap-2 py-4 text-left transition-colors sm:flex-row sm:items-start sm:gap-4 ${item.read ? "opacity-80" : ""}`}
                >
                  <span className={`mt-0.5 grid size-9 shrink-0 place-items-center rounded-xl text-[10px] font-bold ${toneClass(item.tone)}`}>{item.category.slice(0, 2).toUpperCase()}</span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-semibold">{item.title}</p>
                      {!item.read && <span className="rounded-full bg-accent/20 px-2 py-0.5 text-[10px] font-bold text-accent-deep">New</span>}
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${toneClass(item.tone)}`}>{item.category}</span>
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                    <p className="mt-2 text-[11px] font-medium text-muted-foreground">{item.time}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </Surface>
      </div>
    </AppShell>
  );
}

export function ReceiptsPage() {
  const { user } = useAuth();
  const isStudent = user?.role === "student";
  const [rows, setRows] = useState(receiptRows);
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState<(typeof receiptPaymentModes)[number]>("All modes");
  const [status, setStatus] = useState<(typeof receiptStatuses)[number]>("All statuses");
  const [createOpen, setCreateOpen] = useState(false);

  const scopedRows = useMemo(() => {
    if (!isStudent || !user) return rows;
    return rows.filter((row) => row.studentName === user.name || row.initials === user.initials);
  }, [isStudent, rows, user]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return scopedRows.filter((row) => {
      const modeOk = mode === "All modes" || row.paymentMode === mode;
      const statusOk = status === "All statuses" || row.status === status;
      const queryOk =
        !q ||
        [row.id, row.studentId, row.studentName, row.batch, row.parent, row.paymentMode, row.status].join(" ").toLowerCase().includes(q);
      return modeOk && statusOk && queryOk;
    });
  }, [mode, query, scopedRows, status]);

  const summary = useMemo(() => {
    const issued = scopedRows.reduce((sum, row) => sum + row.amount, 0);
    const shared = scopedRows.filter((row) => row.status === "Shared").length;
    const draft = scopedRows.filter((row) => row.status === "Draft").length;
    return { count: scopedRows.length, issued, shared, draft };
  }, [scopedRows]);

  const clearFilters = () => {
    setQuery("");
    setMode("All modes");
    setStatus("All statuses");
  };

  const deleteRow = (id: string) => {
    setRows((current) => current.filter((row) => row.id !== id));
  };

  const exportExcel = () => {
    exportRowsToExcel(
      "classity-receipts.xls",
      ["Receipt ID", "Student ID", "Student name", "Batch", "Parent", "Amount (₹)", "Payment mode", "Issued on", "Status"],
      filtered.map((row) => [
        row.id,
        row.studentId,
        row.studentName,
        row.batch,
        row.parent,
        row.amount,
        row.paymentMode,
        formatAttendanceDate(row.issuedOn),
        row.status,
      ]),
    );
  };

  return (
    <AppShell title="Receipts">
      <div className="animate-classity-rise space-y-4">
        <SectionHeader
          eyebrow="Proof of payment"
          title="Receipts"
          description={isStudent ? "Download and share receipts for your fee payments." : "Find, share, and print every receipt issued by your centre."}
          action={
            isStudent ? (
              <Button variant="outline" onClick={exportExcel}><Download /> Export Excel</Button>
            ) : (
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" onClick={exportExcel}><Download /> Export Excel</Button>
                <Button variant="accent" onClick={() => setCreateOpen(true)}><FilePlus2 /> Create receipt</Button>
              </div>
            )
          }
        />

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <MiniMetric label={isStudent ? "My receipts" : "Total receipts"} value={String(summary.count)} />
          <MiniMetric label="Amount issued" value={formatInr(summary.issued)} tone="good" />
          <MiniMetric label="Shared with parents" value={String(summary.shared)} />
          <MiniMetric label="Drafts" value={String(summary.draft)} tone={summary.draft ? "warn" : "default"} />
        </div>

        <Surface>
          <div className="flex flex-wrap items-end gap-3">
            <label className="grid min-w-[11rem] flex-1 gap-1.5 text-xs font-semibold text-muted-foreground">
              Payment mode
              <select
                aria-label="Filter by payment mode"
                value={mode}
                onChange={(e) => setMode(e.target.value as (typeof receiptPaymentModes)[number])}
                className="h-10 rounded-md border border-input bg-background px-3 text-sm font-normal text-foreground"
              >
                {receiptPaymentModes.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
            </label>
            <label className="grid min-w-[11rem] flex-1 gap-1.5 text-xs font-semibold text-muted-foreground">
              Status
              <select
                aria-label="Filter by receipt status"
                value={status}
                onChange={(e) => setStatus(e.target.value as (typeof receiptStatuses)[number])}
                className="h-10 rounded-md border border-input bg-background px-3 text-sm font-normal text-foreground"
              >
                {receiptStatuses.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
            </label>
            <div className="flex min-w-[15rem] flex-[1.4] items-center gap-2 rounded-lg border border-input bg-background px-3">
              <Search className="size-4 shrink-0 text-muted-foreground" />
              <Input
                aria-label="Search receipts"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search receipt, student, or parent"
                className="border-0 bg-transparent shadow-none focus-visible:ring-0"
              />
            </div>
            <Button variant="outline" onClick={clearFilters}><Filter /> Reset</Button>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 className="font-bold">{isStudent ? "My receipts" : "Issued receipts"}</h2>
              <p className="text-xs text-muted-foreground">
                {filtered.length} receipt{filtered.length === 1 ? "" : "s"}
                {filtered.length > 0 ? ` · ${formatInr(filtered.reduce((sum, row) => sum + row.amount, 0))} shown` : ""}
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {(["Issued", "Shared", "Draft"] as ReceiptStatus[]).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setStatus(status === item ? "All statuses" : item)}
                  className={`rounded-full px-2.5 py-1 text-[10px] font-bold transition-colors ${status === item ? receiptStatusClass(item) : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="mt-6 flex flex-col items-center justify-center py-12 text-center">
              <div className="grid size-14 place-items-center rounded-2xl bg-brand-soft text-brand"><FilePlus2 className="size-6" /></div>
              <h3 className="mt-4 text-lg font-extrabold">No receipts found</h3>
              <p className="mt-1 max-w-sm text-sm text-muted-foreground">Nothing matches these filters. Clear filters or create a new receipt.</p>
              <div className="mt-5 flex flex-wrap justify-center gap-2">
                <Button variant="outline" onClick={clearFilters}>Clear filters</Button>
                {!isStudent && <Button variant="accent" onClick={() => setCreateOpen(true)}><Plus /> Create receipt</Button>}
              </div>
            </div>
          ) : (
            <>
              <div className="mt-4 hidden overflow-x-auto md:block">
                <table className="w-full min-w-[920px] text-left">
                  <thead>
                    <tr className="border-b border-border text-[11px] uppercase tracking-wider text-muted-foreground">
                      <th className="pb-3 pl-2">Receipt</th>
                      <th className="pb-3">Student</th>
                      <th className="pb-3">Amount</th>
                      <th className="pb-3">Mode</th>
                      <th className="pb-3">Issued on</th>
                      <th className="pb-3">Status</th>
                      <th className="pb-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filtered.map((row) => (
                      <tr key={row.id} className="group">
                        <td className="py-3 pl-2">
                          <p className="font-mono text-sm font-semibold">{row.id}</p>
                          <p className="text-[11px] text-muted-foreground">{row.parent}</p>
                        </td>
                        <td className="py-3">
                          <div className="flex items-center gap-3">
                            <span className="grid size-8 shrink-0 place-items-center rounded-full bg-brand-soft text-[11px] font-bold text-brand">{row.initials}</span>
                            <div>
                              <p className="text-sm font-semibold">{row.studentName}</p>
                              <p className="text-[11px] text-muted-foreground">{row.studentId} · {row.batch}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 font-mono text-sm font-semibold">{formatInr(row.amount)}</td>
                        <td className="py-3 text-xs text-muted-foreground">{row.paymentMode}</td>
                        <td className="py-3 text-xs font-medium">{formatAttendanceDate(row.issuedOn)}</td>
                        <td className="py-3"><ReceiptStatusPill value={row.status} /></td>
                        <td className="py-3 text-right">
                          <div className="inline-flex items-center gap-1.5">
                            <Button size="sm" variant="outline" aria-label={`Download ${row.id}`}><Download /> Download</Button>
                            {!isStudent && (
                              <Button size="sm" variant="outline" className="text-bad hover:text-bad" onClick={() => deleteRow(row.id)} aria-label={`Delete ${row.id}`}><Trash2 /> Delete</Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 space-y-3 md:hidden">
                {filtered.map((row) => (
                  <div key={row.id} className="rounded-xl bg-muted/45 p-3 ring-1 ring-border">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-brand-soft text-xs font-bold text-brand">{row.initials}</span>
                        <div>
                          <p className="text-sm font-semibold">{row.studentName}</p>
                          <p className="text-[11px] text-muted-foreground">{row.id} · {row.batch}</p>
                        </div>
                      </div>
                      <ReceiptStatusPill value={row.status} />
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                      <div><p className="text-muted-foreground">Amount</p><p className="font-mono font-semibold">{formatInr(row.amount)}</p></div>
                      <div><p className="text-muted-foreground">Mode</p><p className="font-medium">{row.paymentMode}</p></div>
                      <div><p className="text-muted-foreground">Issued</p><p className="font-medium">{formatAttendanceDate(row.issuedOn)}</p></div>
                      <div><p className="text-muted-foreground">Parent</p><p className="font-medium">{row.parent}</p></div>
                    </div>
                    <div className="mt-3 flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1"><Download /> Download</Button>
                      {!isStudent && (
                        <Button size="sm" variant="outline" className="text-bad hover:text-bad" onClick={() => deleteRow(row.id)}><Trash2 /> Delete</Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </Surface>
      </div>

      {createOpen && (
        <CreateFormDialog
          eyebrow="Receipts"
          title="Create receipt"
          description="Issue a digital receipt for a recorded payment."
          submitLabel="Create receipt"
          successTitle="Receipt created"
          successMessage="Demo receipt is ready to share with the parent."
          fields={[
            { key: "studentName", label: "Student name", type: "select", options: feeRows.map((row) => row.name), required: true, span: 2 },
            { key: "receiptAmount", label: "Receipt amount (₹)", placeholder: "2000", type: "number", required: true },
            { key: "paymentMode", label: "Payment mode", type: "select", options: ["UPI", "Cash", "Card", "Bank transfer", "Cheque"], required: true },
            { key: "receiptImage", label: "Receipt image", type: "image", accept: "image/png,image/jpeg,image/webp", span: 2 },
          ]}
          onClose={() => setCreateOpen(false)}
        />
      )}
    </AppShell>
  );
}

function receiptStatusClass(value: ReceiptStatus) {
  if (value === "Shared") return "bg-good/10 text-good";
  if (value === "Draft") return "bg-accent/20 text-accent-deep";
  return "bg-brand-soft text-brand";
}

function ReceiptStatusPill({ value }: { value: ReceiptStatus }) {
  return <span className={`rounded-full px-2 py-1 text-[10px] font-bold ${receiptStatusClass(value)}`}>{value}</span>;
}

export function BatchesPage() {
  const { user } = useAuth();
  const isStudent = user?.role === "student";
  const [rows, setRows] = useState(batchRows);
  const [query, setQuery] = useState("");
  const [createOpen, setCreateOpen] = useState(false);

  const scopedRows = useMemo(() => {
    if (!isStudent) return rows;
    return rows.filter((row) => row.name === "JEE 2027");
  }, [isStudent, rows]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return scopedRows;
    return scopedRows.filter((row) =>
      [row.id, row.name, row.course, row.subject, row.teacherName, row.feePlanName, row.status, row.startDate, row.endDate].join(" ").toLowerCase().includes(q),
    );
  }, [query, scopedRows]);

  const summary = useMemo(() => {
    const enrolled = scopedRows.reduce((sum, row) => sum + row.enrolled, 0);
    const capacity = scopedRows.reduce((sum, row) => sum + row.capacity, 0);
    const active = scopedRows.filter((row) => row.status === "Active").length;
    return { count: scopedRows.length, enrolled, capacity, active };
  }, [scopedRows]);

  const deleteRow = (id: string) => {
    setRows((current) => current.filter((row) => row.id !== id));
  };

  const exportExcel = () => {
    exportRowsToExcel(
      "classity-batches.xls",
      ["Batch ID", "Batch name", "Course", "Subject", "Teacher", "Schedule", "Capacity", "Enrolled", "Fee plan", "Start date", "End date", "Status"],
      filtered.map((row) => [
        row.id,
        row.name,
        row.course,
        row.subject,
        row.teacherName,
        row.schedule,
        row.capacity,
        row.enrolled,
        row.feePlanName,
        formatAttendanceDate(row.startDate),
        formatAttendanceDate(row.endDate),
        row.status,
      ]),
    );
  };

  return (
    <AppShell title={isStudent ? "My Classes" : "Batches"}>
      <div className="animate-classity-rise space-y-4">
        <SectionHeader
          eyebrow={isStudent ? "Your timetable groups" : "Teaching groups"}
          title={isStudent ? "My Classes" : "Batches"}
          description={isStudent ? "See the batches, subjects, and term dates you are enrolled in." : "See capacity, fee plans, and term dates for every teaching group."}
          action={
            isStudent ? (
              <Button variant="outline" onClick={exportExcel}><Download /> Export Excel</Button>
            ) : (
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" onClick={exportExcel}><Download /> Export Excel</Button>
                <Button variant="accent" onClick={() => setCreateOpen(true)}><Users /> Add batch</Button>
              </div>
            )
          }
        />

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <MiniMetric label={isStudent ? "My classes" : "Total batches"} value={String(summary.count)} />
          <MiniMetric label="Active" value={String(summary.active)} tone="good" />
          <MiniMetric label="Enrolled" value={String(summary.enrolled)} />
          <MiniMetric label="Capacity" value={String(summary.capacity)} />
        </div>

        <Surface>
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex min-w-[15rem] flex-1 items-center gap-2 rounded-lg border border-input bg-background px-3">
              <Search className="size-4 text-muted-foreground" />
              <Input
                aria-label="Search batches"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by batch, teacher, or course"
                className="border-0 bg-transparent shadow-none focus-visible:ring-0"
              />
            </div>
            {!isStudent && <Button variant="outline" onClick={() => setCreateOpen(true)}><Plus /> Quick add</Button>}
          </div>

          <div className="mt-4">
            <h2 className="font-bold">{isStudent ? "Enrolled classes" : "Batch directory"}</h2>
            <p className="text-xs text-muted-foreground">{filtered.length} batch{filtered.length === 1 ? "" : "es"} with start and end dates</p>
          </div>

          {filtered.length === 0 ? (
            <div className="mt-6 flex flex-col items-center justify-center py-12 text-center">
              <div className="grid size-14 place-items-center rounded-2xl bg-brand-soft text-brand"><Users className="size-6" /></div>
              <h3 className="mt-4 text-lg font-extrabold">No batches found</h3>
              <p className="mt-1 max-w-sm text-sm text-muted-foreground">Nothing matches this search. Clear it or add a new batch with term dates.</p>
              {!isStudent && <Button className="mt-5" variant="accent" onClick={() => setCreateOpen(true)}><Plus /> Add batch</Button>}
            </div>
          ) : (
            <>
              <div className="mt-4 hidden overflow-x-auto md:block">
                <table className="w-full min-w-[980px] text-left">
                  <thead>
                    <tr className="border-b border-border text-[11px] uppercase tracking-wider text-muted-foreground">
                      <th className="pb-3 pl-2">Batch</th>
                      <th className="pb-3">Teacher</th>
                      <th className="pb-3">Start date</th>
                      <th className="pb-3">End date</th>
                      <th className="pb-3 text-right">Capacity</th>
                      <th className="pb-3">Status</th>
                      <th className="pb-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filtered.map((row) => (
                      <tr key={row.id} className="group">
                        <td className="py-3 pl-2">
                          <p className="text-sm font-semibold">{row.name}</p>
                          <p className="text-[11px] text-muted-foreground">{row.course} · {row.subject}</p>
                        </td>
                        <td className="py-3 text-xs text-muted-foreground">
                          <p className="font-medium text-foreground">{row.teacherName}</p>
                          <p>{row.schedule}</p>
                        </td>
                        <td className="py-3 text-xs font-medium">{formatAttendanceDate(row.startDate)}</td>
                        <td className="py-3 text-xs font-medium">{formatAttendanceDate(row.endDate)}</td>
                        <td className="py-3 text-right font-mono text-sm">{row.enrolled}/{row.capacity}</td>
                        <td className="py-3"><StatusPill value={row.status} /></td>
                        <td className="py-3 text-right">
                          {!isStudent && (
                            <div className="inline-flex items-center gap-1.5">
                              <Button size="sm" variant="outline" onClick={() => setCreateOpen(true)} aria-label={`Edit ${row.name}`}><Pencil /> Edit</Button>
                              <Button size="sm" variant="outline" className="text-bad hover:text-bad" onClick={() => deleteRow(row.id)} aria-label={`Delete ${row.name}`}><Trash2 /> Delete</Button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 space-y-3 md:hidden">
                {filtered.map((row) => (
                  <div key={row.id} className="rounded-xl bg-muted/45 p-3 ring-1 ring-border">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold">{row.name}</p>
                        <p className="text-[11px] text-muted-foreground">{row.course} · {row.teacherName}</p>
                      </div>
                      <StatusPill value={row.status} />
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                      <div><p className="text-muted-foreground">Start date</p><p className="font-medium">{formatAttendanceDate(row.startDate)}</p></div>
                      <div><p className="text-muted-foreground">End date</p><p className="font-medium">{formatAttendanceDate(row.endDate)}</p></div>
                      <div><p className="text-muted-foreground">Schedule</p><p className="font-medium">{row.schedule}</p></div>
                      <div><p className="text-muted-foreground">Seats</p><p className="font-mono font-semibold">{row.enrolled}/{row.capacity}</p></div>
                    </div>
                    {!isStudent && (
                      <div className="mt-3 flex gap-2">
                        <Button size="sm" variant="outline" className="flex-1" onClick={() => setCreateOpen(true)}><Pencil /> Edit</Button>
                        <Button size="sm" variant="outline" className="text-bad hover:text-bad" onClick={() => deleteRow(row.id)}><Trash2 /> Delete</Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </Surface>
      </div>

      {createOpen && (
        <CreateFormDialog
          eyebrow="Batches"
          title="Add batch"
          description="Create a teaching group with capacity, fee plan, and term dates."
          submitLabel="Add batch"
          successTitle="Batch created"
          successMessage="Demo mode saved this batch with start and end dates locally."
          fields={[
            { key: "batchName", label: "Batch name", placeholder: "e.g. JEE 2028", required: true, span: 2 },
            { key: "batchCapacity", label: "Batch capacity", placeholder: "40", type: "number", required: true },
            { key: "feePlanName", label: "Fee plan name", type: "select", options: ["JEE Monthly · ₹5,000", "NEET Monthly · ₹4,500", "Class 10 Monthly · ₹3,000"], required: true },
            { key: "startDate", label: "Start date", type: "date", required: true, defaultValue: "2026-06-01" },
            { key: "endDate", label: "End date", type: "date", required: true, defaultValue: "2027-04-30" },
            { key: "batchCoverImage", label: "Batch cover image", type: "image", accept: "image/png,image/jpeg,image/webp", span: 2 },
          ]}
          onClose={() => setCreateOpen(false)}
        />
      )}
    </AppShell>
  );
}

export function SimplePage({ kind }: { kind: "whatsapp" | "subscription" }) {
  const { user } = useAuth();
  const home = user ? homePathForRole(user.role) : "/";
  const [createOpen, setCreateOpen] = useState(false);

  const config = {
    whatsapp: {
      title: "WhatsApp reminders",
      eyebrow: "Parent communication",
      desc: "Keep payment follow-ups personal, timely, and easy to track.",
      icon: <MessageCircle />,
      action: "New reminder",
      modal: {
        eyebrow: "Reminders",
        title: "New WhatsApp reminder",
        description: "Queue a polite fee reminder for a parent.",
        submitLabel: "Queue reminder",
        successTitle: "Reminder queued",
        successMessage: "Demo mode prepared this message for review.",
        fields: [
          { key: "studentName", label: "Student name", type: "select" as const, options: feeRows.map((row) => row.name), required: true, span: 2 as const },
          { key: "reminderMessage", label: "Reminder message", placeholder: "Hello, this is a reminder…", required: true, span: 2 as const },
        ],
      },
    },
    subscription: {
      title: "Subscription",
      eyebrow: "Classity plan",
      desc: "Your centre's workspace, team access, and billing details.",
      icon: <WalletCards />,
      action: "Manage plan",
      modal: {
        eyebrow: "Subscription",
        title: "Manage plan",
        description: "Update seats or billing preference for your centre.",
        submitLabel: "Save plan",
        successTitle: "Plan updated",
        successMessage: "Demo subscription preferences were saved locally.",
        fields: [
          { key: "plan", label: "Plan", type: "select" as const, options: ["Starter", "Growth", "Scale"], required: true, span: 2 as const },
          { key: "seats", label: "Staff seats", placeholder: "5", type: "number" as const, required: true, span: 2 as const },
        ],
      },
    },
  }[kind];

  return (
    <AppShell title={config.title}>
      <div className="animate-classity-rise space-y-4">
        <SectionHeader
          eyebrow={config.eyebrow}
          title={config.title}
          description={config.desc}
          action={<Button variant="accent" onClick={() => setCreateOpen(true)}>{config.icon}{config.action}</Button>}
        />
        <Surface className="min-h-[24rem]">
          <div className="mx-auto flex max-w-md flex-col items-center justify-center py-10 text-center">
            <div className="grid size-14 place-items-center rounded-2xl bg-brand-soft text-brand">{config.icon}</div>
            <h2 className="mt-5 text-xl font-extrabold">
              {kind === "whatsapp" ? "18 reminders are ready" : "Growth plan · Active"}
            </h2>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {kind === "whatsapp"
                ? "Start with the 18 overdue parents in your queue. Messages are prepared for review before they go out."
                : "Your workspace includes 5 staff seats, all P0 fee operations, and priority support."}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              <Button variant="outline" asChild><Link to={home}>Back to dashboard</Link></Button>
              <Button variant="accent" onClick={() => setCreateOpen(true)}>{config.action} <ArrowUpRight /></Button>
            </div>
          </div>
        </Surface>
      </div>
      {createOpen && (
        <CreateFormDialog
          eyebrow={config.modal.eyebrow}
          title={config.modal.title}
          description={config.modal.description}
          submitLabel={config.modal.submitLabel}
          successTitle={config.modal.successTitle}
          successMessage={config.modal.successMessage}
          fields={config.modal.fields}
          onClose={() => setCreateOpen(false)}
        />
      )}
    </AppShell>
  );
}

type CreateField = {
  key: string;
  label: string;
  placeholder?: string;
  type?: "text" | "number" | "tel" | "select" | "image" | "date";
  options?: string[];
  accept?: string;
  required?: boolean;
  span?: 2;
  defaultValue?: string;
};

function CreateFormDialog({
  eyebrow,
  title,
  description,
  fields,
  submitLabel,
  successTitle,
  successMessage,
  onClose,
}: {
  eyebrow: string;
  title: string;
  description: string;
  fields: CreateField[];
  submitLabel: string;
  successTitle: string;
  successMessage: string;
  onClose: () => void;
}) {
  const [values, setValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(
      fields.map((field) => [
        field.key,
        field.type === "image" ? "" : field.defaultValue ?? field.options?.[0] ?? "",
      ]),
    ),
  );
  const [previews, setPreviews] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);
  const startDate = values["startDate"] ?? "";
  const endDate = values["endDate"] ?? "";
  const dateRangeInvalid = Boolean(startDate && endDate && endDate < startDate);
  const canSubmit = fields.every((field) => !field.required || Boolean(values[field.key]?.trim())) && !dateRangeInvalid;

  const onImageChange = (key: string, file: File | null) => {
    if (!file) {
      setValues((current) => ({ ...current, [key]: "" }));
      setPreviews((current) => {
        const next = { ...current };
        delete next[key];
        return next;
      });
      return;
    }
    setValues((current) => ({ ...current, [key]: file.name }));
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setPreviews((current) => ({ ...current, [key]: reader.result as string }));
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-foreground/25 p-0 sm:items-center sm:p-4">
      <div role="dialog" aria-modal="true" aria-labelledby="create-dialog-title" className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-popover p-5 shadow-2xl sm:rounded-2xl sm:p-6">
        {saved ? (
          <div className="py-5 text-center">
            <div className="mx-auto grid size-14 place-items-center rounded-full bg-good/15 text-good"><Check className="size-7" /></div>
            <h2 id="create-dialog-title" className="mt-4 text-xl font-extrabold">{successTitle}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{successMessage}</p>
            <Button className="mt-5" variant="accent" onClick={onClose}>Done</Button>
          </div>
        ) : (
          <>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand">{eyebrow}</p>
                <h2 id="create-dialog-title" className="mt-1 text-xl font-extrabold">{title}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{description}</p>
              </div>
              <Button size="icon" variant="ghost" aria-label="Close dialog" onClick={onClose}>×</Button>
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {fields.map((field) => (
                <label key={field.key} className={`grid gap-1.5 text-sm font-semibold ${field.span === 2 ? "sm:col-span-2" : ""}`}>
                  {field.label}
                  {field.type === "select" ? (
                    <select
                      className="h-10 rounded-md border border-input bg-background px-3 text-sm font-normal"
                      value={values[field.key] ?? ""}
                      onChange={(e) => setValues((current) => ({ ...current, [field.key]: e.target.value }))}
                    >
                      {(field.options ?? []).map((option) => <option key={option} value={option}>{option}</option>)}
                    </select>
                  ) : field.type === "image" ? (
                    <div className="rounded-xl border border-dashed border-input bg-muted/40 p-3">
                      <div className="flex flex-wrap items-center gap-3">
                        <div className="grid size-14 shrink-0 place-items-center overflow-hidden rounded-lg bg-brand-soft text-brand">
                          {previews[field.key] ? (
                            <img src={previews[field.key]} alt={`${field.label} preview`} className="size-full object-cover" />
                          ) : (
                            <ImagePlus className="size-5" />
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <Input
                            type="file"
                            accept={field.accept ?? "image/png,image/jpeg,image/webp"}
                            aria-label={field.label}
                            className="cursor-pointer border-0 bg-transparent px-0 shadow-none file:mr-3 file:rounded-md file:border-0 file:bg-brand-soft file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-brand"
                            onChange={(e) => onImageChange(field.key, e.target.files?.[0] ?? null)}
                          />
                          <p className="mt-1 text-[11px] font-medium text-muted-foreground">
                            {values[field.key] ? values[field.key] : "PNG, JPG, or WEBP up to demo size"}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Input
                      type={field.type === "number" ? "number" : field.type === "tel" ? "tel" : field.type === "date" ? "date" : "text"}
                      inputMode={field.type === "number" ? "numeric" : field.type === "tel" ? "tel" : undefined}
                      placeholder={field.placeholder}
                      value={values[field.key] ?? ""}
                      onChange={(e) => setValues((current) => ({ ...current, [field.key]: e.target.value }))}
                      maxLength={field.type === "date" ? undefined : 120}
                      min={field.key === "endDate" && startDate ? startDate : undefined}
                    />
                  )}
                </label>
              ))}
            </div>
            {dateRangeInvalid && (
              <p className="mt-3 text-sm text-bad">End date must be on or after the start date.</p>
            )}
            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <Button variant="outline" onClick={onClose}>Cancel</Button>
              <Button variant="accent" disabled={!canSubmit} onClick={() => setSaved(true)}>{submitLabel}</Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function MiniMetric({ label, value, tone = "default" }: { label: string; value: string; tone?: "default" | "good" | "bad" | "warn" }) { return <Surface className="min-h-24"><p className="text-xs text-muted-foreground">{label}</p><p className={`mt-2 text-xl font-extrabold tracking-tight ${tone === "good" ? "text-good" : tone === "bad" ? "text-bad" : tone === "warn" ? "text-accent-deep" : ""}`}>{value}</p></Surface>; }
function StatusPill({ value }: { value: string }) {
  const normalized = value.toUpperCase();
  const good = ["PAID", "ACTIVE", "PRESENT"].includes(normalized) || ["Paid", "Active"].includes(value);
  const bad = ["OVERDUE", "ABSENT"].includes(normalized) || value === "Overdue";
  return <span className={`rounded-full px-2 py-1 text-[10px] font-bold ${good ? "bg-good/10 text-good" : bad ? "bg-bad/10 text-bad" : "bg-accent/20 text-accent-deep"}`}>{value}</span>;
}
function PlanCard({ title, detail, amount, accent, onEdit }: { title: string; detail: string; amount: string; accent: string; onEdit?: () => void }) {
  return (
    <Surface>
      <div className="flex items-start justify-between"><div className="grid size-10 place-items-center rounded-xl bg-brand-soft text-brand"><WalletCards /></div><StatusPill value={accent} /></div>
      <h2 className="mt-5 font-bold">{title}</h2>
      <p className="mt-1 text-xs text-muted-foreground">{detail}</p>
      <p className="mt-5 font-mono text-2xl font-extrabold">{amount}<span className="text-xs font-sans font-medium text-muted-foreground"> / month</span></p>
      <Button variant="link" className="mt-3 px-0" onClick={onEdit}>Edit plan <ChevronRight /></Button>
    </Surface>
  );
}