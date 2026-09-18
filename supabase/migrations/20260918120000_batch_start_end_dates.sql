-- Add batch term dates for coaching cohort start/end tracking
alter table public.batches
  add column if not exists start_date date,
  add column if not exists end_date date;

alter table public.batches
  drop constraint if exists batches_date_range_check;

alter table public.batches
  add constraint batches_date_range_check
  check (end_date is null or start_date is null or end_date >= start_date);

update public.batches set start_date = '2025-06-01', end_date = '2027-04-30' where name = 'JEE 2027' and start_date is null;
update public.batches set start_date = '2025-06-15', end_date = '2027-05-15' where name = 'NEET 2027' and start_date is null;
update public.batches set start_date = '2026-04-01', end_date = '2027-03-31' where name = 'Class 10 Maths' and start_date is null;
update public.batches set start_date = '2026-05-01', end_date = '2027-03-15' where name = 'Class 12 Physics' and start_date is null;
