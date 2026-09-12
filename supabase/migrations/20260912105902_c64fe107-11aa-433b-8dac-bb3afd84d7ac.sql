create extension if not exists pgcrypto;

create table public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  owner_name text not null,
  phone text,
  email text,
  city text,
  country text default 'India',
  logo_url text,
  onboarding_step integer not null default 1,
  trial_ends_at timestamptz not null default (now() + interval '14 days'),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select, insert, update, delete on public.organizations to authenticated;
grant all on public.organizations to service_role;
alter table public.organizations enable row level security;
create type public.app_role as enum ('owner', 'admin', 'manager', 'accountant', 'staff', 'teacher');
create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  organization_id uuid not null references public.organizations(id) on delete cascade,
  role public.app_role not null default 'staff',
  created_at timestamptz not null default now(),
  unique (user_id, organization_id, role)
);
grant select, insert, update, delete on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;
create policy "Members can view organisation roles" on public.user_roles for select to authenticated using (exists (select 1 from public.user_roles viewer where viewer.organization_id = organization_id and viewer.user_id = auth.uid()));
create policy "Owners can manage organisation roles" on public.user_roles for all to authenticated using (exists (select 1 from public.user_roles owner_role where owner_role.organization_id = organization_id and owner_role.user_id = auth.uid() and owner_role.role = 'owner')) with check (exists (select 1 from public.user_roles owner_role where owner_role.organization_id = organization_id and owner_role.user_id = auth.uid() and owner_role.role = 'owner'));

create policy "Members can view their organisations" on public.organizations for select to authenticated using (exists (select 1 from public.user_roles ur where ur.organization_id = id and ur.user_id = auth.uid()));
create policy "Owners can manage their organisations" on public.organizations for all to authenticated using (exists (select 1 from public.user_roles ur where ur.organization_id = id and ur.user_id = auth.uid() and ur.role = 'owner')) with check (exists (select 1 from public.user_roles ur where ur.organization_id = id and ur.user_id = auth.uid() and ur.role = 'owner'));

create table public.branches (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  name text not null,
  city text not null,
  phone text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select, insert, update, delete on public.branches to authenticated;
grant all on public.branches to service_role;
alter table public.branches enable row level security;
create policy "Members can view organisation branches" on public.branches for select to authenticated using (exists (select 1 from public.user_roles ur where ur.organization_id = organization_id and ur.user_id = auth.uid()));
create policy "Managers can manage organisation branches" on public.branches for all to authenticated using (exists (select 1 from public.user_roles ur where ur.organization_id = organization_id and ur.user_id = auth.uid() and ur.role in ('owner','admin','manager'))) with check (exists (select 1 from public.user_roles ur where ur.organization_id = organization_id and ur.user_id = auth.uid() and ur.role in ('owner','admin','manager')));

create table public.parents (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  name text not null,
  relationship text not null default 'Parent',
  mobile text not null,
  whatsapp text,
  email text,
  address text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select, insert, update, delete on public.parents to authenticated;
grant all on public.parents to service_role;
alter table public.parents enable row level security;
create policy "Members can manage organisation parents" on public.parents for all to authenticated using (exists (select 1 from public.user_roles ur where ur.organization_id = organization_id and ur.user_id = auth.uid())) with check (exists (select 1 from public.user_roles ur where ur.organization_id = organization_id and ur.user_id = auth.uid()));

create table public.batches (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  branch_id uuid references public.branches(id) on delete set null,
  name text not null,
  course text not null,
  subject text,
  teacher_name text,
  schedule text,
  capacity integer,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select, insert, update, delete on public.batches to authenticated;
grant all on public.batches to service_role;
alter table public.batches enable row level security;
create policy "Members can manage organisation batches" on public.batches for all to authenticated using (exists (select 1 from public.user_roles ur where ur.organization_id = organization_id and ur.user_id = auth.uid())) with check (exists (select 1 from public.user_roles ur where ur.organization_id = organization_id and ur.user_id = auth.uid()));

create table public.fee_plans (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  name text not null,
  amount numeric(12,2) not null check (amount >= 0),
  frequency text not null check (frequency in ('monthly','quarterly','half_yearly','annual','one_time','custom')),
  due_day integer check (due_day between 1 and 31),
  late_fee numeric(12,2) not null default 0 check (late_fee >= 0),
  grace_period_days integer not null default 0 check (grace_period_days >= 0),
  status text not null default 'active' check (status in ('active','archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select, insert, update, delete on public.fee_plans to authenticated;
grant all on public.fee_plans to service_role;
alter table public.fee_plans enable row level security;
create policy "Members can manage organisation fee plans" on public.fee_plans for all to authenticated using (exists (select 1 from public.user_roles ur where ur.organization_id = organization_id and ur.user_id = auth.uid())) with check (exists (select 1 from public.user_roles ur where ur.organization_id = organization_id and ur.user_id = auth.uid()));

create table public.students (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  branch_id uuid references public.branches(id) on delete set null,
  parent_id uuid references public.parents(id) on delete set null,
  batch_id uuid references public.batches(id) on delete set null,
  fee_plan_id uuid references public.fee_plans(id) on delete set null,
  student_code text not null,
  name text not null,
  date_of_birth date,
  gender text,
  school text,
  class_name text,
  joining_date date not null default current_date,
  fee_amount numeric(12,2) not null default 0 check (fee_amount >= 0),
  discount numeric(12,2) not null default 0 check (discount >= 0),
  next_due_date date,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (organization_id, student_code)
);
grant select, insert, update, delete on public.students to authenticated;
grant all on public.students to service_role;
alter table public.students enable row level security;
create policy "Members can manage organisation students" on public.students for all to authenticated using (exists (select 1 from public.user_roles ur where ur.organization_id = organization_id and ur.user_id = auth.uid())) with check (exists (select 1 from public.user_roles ur where ur.organization_id = organization_id and ur.user_id = auth.uid()));

create table public.fees (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  student_id uuid not null references public.students(id) on delete cascade,
  fee_plan_id uuid references public.fee_plans(id) on delete set null,
  invoice_number text not null,
  period_label text not null,
  amount numeric(12,2) not null check (amount >= 0),
  due_date date not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (organization_id, invoice_number)
);
grant select, insert, update, delete on public.fees to authenticated;
grant all on public.fees to service_role;
alter table public.fees enable row level security;
create policy "Members can manage organisation fees" on public.fees for all to authenticated using (exists (select 1 from public.user_roles ur where ur.organization_id = organization_id and ur.user_id = auth.uid())) with check (exists (select 1 from public.user_roles ur where ur.organization_id = organization_id and ur.user_id = auth.uid()));

create table public.payments (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  student_id uuid not null references public.students(id) on delete restrict,
  fee_id uuid references public.fees(id) on delete set null,
  receipt_number text not null,
  amount numeric(12,2) not null check (amount > 0),
  payment_method text not null check (payment_method in ('upi','cash','card','bank_transfer','cheque','other')),
  transaction_id text,
  notes text,
  paid_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  unique (organization_id, receipt_number)
);
grant select, insert, update, delete on public.payments to authenticated;
grant all on public.payments to service_role;
alter table public.payments enable row level security;
create policy "Members can manage organisation payments" on public.payments for all to authenticated using (exists (select 1 from public.user_roles ur where ur.organization_id = organization_id and ur.user_id = auth.uid())) with check (exists (select 1 from public.user_roles ur where ur.organization_id = organization_id and ur.user_id = auth.uid()));

create table public.receipts (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  payment_id uuid not null references public.payments(id) on delete cascade,
  receipt_number text not null,
  issued_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  unique (organization_id, receipt_number)
);
grant select, insert, update, delete on public.receipts to authenticated;
grant all on public.receipts to service_role;
alter table public.receipts enable row level security;
create policy "Members can manage organisation receipts" on public.receipts for all to authenticated using (exists (select 1 from public.user_roles ur where ur.organization_id = organization_id and ur.user_id = auth.uid())) with check (exists (select 1 from public.user_roles ur where ur.organization_id = organization_id and ur.user_id = auth.uid()));

create or replace function public.update_updated_at_column() returns trigger language plpgsql set search_path = public as $$ begin new.updated_at = now(); return new; end; $$;
create trigger update_organizations_updated_at before update on public.organizations for each row execute function public.update_updated_at_column();
create trigger update_branches_updated_at before update on public.branches for each row execute function public.update_updated_at_column();
create trigger update_parents_updated_at before update on public.parents for each row execute function public.update_updated_at_column();
create trigger update_batches_updated_at before update on public.batches for each row execute function public.update_updated_at_column();
create trigger update_fee_plans_updated_at before update on public.fee_plans for each row execute function public.update_updated_at_column();
create trigger update_students_updated_at before update on public.students for each row execute function public.update_updated_at_column();
create trigger update_fees_updated_at before update on public.fees for each row execute function public.update_updated_at_column();

create or replace function public.provision_organization(p_name text, p_owner_name text, p_email text default null)
returns uuid language plpgsql security definer set search_path = public as $$
declare new_org_id uuid; safe_slug text;
begin
  if auth.uid() is null then raise exception 'Authentication required'; end if;
  if length(trim(p_name)) < 2 or length(trim(p_name)) > 120 then raise exception 'Centre name must be between 2 and 120 characters'; end if;
  if length(trim(p_owner_name)) < 2 or length(trim(p_owner_name)) > 120 then raise exception 'Owner name must be between 2 and 120 characters'; end if;
  safe_slug := regexp_replace(lower(trim(p_name)), '[^a-z0-9]+', '-', 'g') || '-' || substr(replace(auth.uid()::text, '-', ''), 1, 8);
  insert into public.organizations (name, slug, owner_name, email) values (trim(p_name), safe_slug, trim(p_owner_name), nullif(trim(p_email), '')) returning id into new_org_id;
  insert into public.user_roles (user_id, organization_id, role) values (auth.uid(), new_org_id, 'owner');
  insert into public.branches (organization_id, name, city) values (new_org_id, 'Main Branch', 'Kochi');
  return new_org_id;
end; $$;
grant execute on function public.provision_organization(text, text, text) to authenticated;

insert into public.organizations (id, name, slug, owner_name, phone, email, city, onboarding_step)
values ('10000000-0000-0000-0000-000000000001', 'Bright Future Academy', 'bright-future-academy-demo', 'Rajesh Arjun', '+91 98470 22118', 'hello@brightfuture.academy', 'Kochi', 7);
insert into public.branches (id, organization_id, name, city) values
('20000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', 'Kochi Central', 'Kochi'),
('20000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000001', 'Trivandrum', 'Trivandrum');
insert into public.batches (id, organization_id, branch_id, name, course, subject, teacher_name, schedule, capacity) values
('30000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001', 'JEE 2027', 'JEE', 'Physics + Maths', 'Arun Menon', 'Mon, Wed, Fri · 5:30 PM', 60),
('30000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001', 'NEET 2027', 'NEET', 'Biology + Chemistry', 'Divya Nair', 'Tue, Thu, Sat · 6:00 PM', 60),
('30000000-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000002', 'Class 10 Maths', 'Class 10', 'Mathematics', 'Meera Krishnan', 'Mon, Wed · 4:00 PM', 40),
('30000000-0000-0000-0000-000000000004', '10000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001', 'Class 12 Physics', 'Class 12', 'Physics', 'Karthik Soman', 'Tue, Fri · 4:30 PM', 40);
insert into public.fee_plans (id, organization_id, name, amount, frequency, due_day, late_fee, grace_period_days) values
('40000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', 'JEE Monthly', 5000, 'monthly', 10, 250, 3),
('40000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000001', 'NEET Monthly', 4500, 'monthly', 10, 250, 3),
('40000000-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000001', 'School Support', 3000, 'monthly', 5, 150, 5);
insert into public.parents (id, organization_id, name, relationship, mobile, whatsapp, email) values
('50000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', 'Ramesh Menon', 'Father', '+91 98470 33118', '+91 98470 33118', 'ramesh.menon@example.com'),
('50000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000001', 'Sunita Sharma', 'Mother', '+91 98950 47212', '+91 98950 47212', 'sunita.sharma@example.com'),
('50000000-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000001', 'Deepa Nair', 'Mother', '+91 97460 11892', '+91 97460 11892', 'deepa.nair@example.com'),
('50000000-0000-0000-0000-000000000004', '10000000-0000-0000-0000-000000000001', 'Anil Soman', 'Father', '+91 98472 66824', '+91 98472 66824', 'anil.soman@example.com');
insert into public.students (id, organization_id, branch_id, parent_id, batch_id, fee_plan_id, student_code, name, school, class_name, fee_amount, discount, next_due_date) values
('60000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001', '50000000-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000001', '40000000-0000-0000-0000-000000000001', 'STU-1024', 'Aarav Menon', 'Chinmaya Vidyalaya', 'Class 12', 5000, 0, current_date + 2),
('60000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001', '50000000-0000-0000-0000-000000000002', '30000000-0000-0000-0000-000000000002', '40000000-0000-0000-0000-000000000002', 'STU-1025', 'Diya Sharma', 'Kendriya Vidyalaya', 'Class 12', 4500, 0, current_date - 6),
('60000000-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000002', '50000000-0000-0000-0000-000000000003', '30000000-0000-0000-0000-000000000003', '40000000-0000-0000-0000-000000000003', 'STU-1026', 'Ishaan Nair', 'St. Thomas School', 'Class 10', 3000, 500, current_date),
('60000000-0000-0000-0000-000000000004', '10000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001', '50000000-0000-0000-0000-000000000004', '30000000-0000-0000-0000-000000000004', '40000000-0000-0000-0000-000000000003', 'STU-1027', 'Ananya Iyer', 'Loyola School', 'Class 12', 3000, 0, current_date + 5);
insert into public.fees (id, organization_id, student_id, fee_plan_id, invoice_number, period_label, amount, due_date) values
('70000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', '60000000-0000-0000-0000-000000000001', '40000000-0000-0000-0000-000000000001', 'INV-SEP-1024', 'September 2026', 5000, current_date - 6),
('70000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000001', '60000000-0000-0000-0000-000000000002', '40000000-0000-0000-0000-000000000002', 'INV-SEP-1025', 'September 2026', 4500, current_date - 6),
('70000000-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000001', '60000000-0000-0000-0000-000000000003', '40000000-0000-0000-0000-000000000003', 'INV-SEP-1026', 'September 2026', 2500, current_date - 11),
('70000000-0000-0000-0000-000000000004', '10000000-0000-0000-0000-000000000001', '60000000-0000-0000-0000-000000000004', '40000000-0000-0000-0000-000000000003', 'INV-SEP-1027', 'September 2026', 3000, current_date + 5);
insert into public.payments (id, organization_id, student_id, fee_id, receipt_number, amount, payment_method, transaction_id, paid_at) values
('80000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', '60000000-0000-0000-0000-000000000001', '70000000-0000-0000-0000-000000000001', 'RCT-2026-0891', 2000, 'upi', 'UPI-AX91K2', now() - interval '2 days'),
('80000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000001', '60000000-0000-0000-0000-000000000003', '70000000-0000-0000-0000-000000000003', 'RCT-2026-0892', 2500, 'cash', null, now() - interval '5 days'),
('80000000-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000001', '60000000-0000-0000-0000-000000000004', '70000000-0000-0000-0000-000000000004', 'RCT-2026-0893', 500, 'bank_transfer', 'NEFT-7HT22', now() - interval '1 day');
insert into public.receipts (organization_id, payment_id, receipt_number) values
('10000000-0000-0000-0000-000000000001', '80000000-0000-0000-0000-000000000001', 'RCT-2026-0891'),
('10000000-0000-0000-0000-000000000001', '80000000-0000-0000-0000-000000000002', 'RCT-2026-0892'),
('10000000-0000-0000-0000-000000000001', '80000000-0000-0000-0000-000000000003', 'RCT-2026-0893') on conflict do nothing;