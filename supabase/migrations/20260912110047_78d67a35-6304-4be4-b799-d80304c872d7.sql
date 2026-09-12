create schema if not exists private;
create or replace function private.is_org_member(p_user_id uuid, p_org_id uuid)
returns boolean language sql stable security definer set search_path = public, private as $$
  select exists (select 1 from public.user_roles where user_id = p_user_id and organization_id = p_org_id);
$$;
create or replace function private.is_org_owner(p_user_id uuid, p_org_id uuid)
returns boolean language sql stable security definer set search_path = public, private as $$
  select exists (select 1 from public.user_roles where user_id = p_user_id and organization_id = p_org_id and role = 'owner');
$$;
revoke all on function private.is_org_member(uuid, uuid) from public;
revoke all on function private.is_org_owner(uuid, uuid) from public;
grant execute on function private.is_org_member(uuid, uuid) to authenticated;
grant execute on function private.is_org_owner(uuid, uuid) to authenticated;

drop policy if exists "Members can view their organisations" on public.organizations;
drop policy if exists "Owners can manage their organisations" on public.organizations;
create policy "Members can view their organisations" on public.organizations for select to authenticated using (private.is_org_member(auth.uid(), id));
create policy "Owners can manage their organisations" on public.organizations for all to authenticated using (private.is_org_owner(auth.uid(), id)) with check (private.is_org_owner(auth.uid(), id));

drop policy if exists "Members can view organisation roles" on public.user_roles;
drop policy if exists "Owners can manage organisation roles" on public.user_roles;
create policy "Members can view organisation roles" on public.user_roles for select to authenticated using (private.is_org_member(auth.uid(), organization_id));
create policy "Owners can manage organisation roles" on public.user_roles for all to authenticated using (private.is_org_owner(auth.uid(), organization_id)) with check (private.is_org_owner(auth.uid(), organization_id));

drop policy if exists "Members can view organisation branches" on public.branches;
drop policy if exists "Managers can manage organisation branches" on public.branches;
create policy "Members can view organisation branches" on public.branches for select to authenticated using (private.is_org_member(auth.uid(), organization_id));
create policy "Managers can manage organisation branches" on public.branches for all to authenticated using (private.is_org_member(auth.uid(), organization_id)) with check (private.is_org_member(auth.uid(), organization_id));

drop policy if exists "Members can manage organisation parents" on public.parents;
create policy "Members can manage organisation parents" on public.parents for all to authenticated using (private.is_org_member(auth.uid(), organization_id)) with check (private.is_org_member(auth.uid(), organization_id));

drop policy if exists "Members can manage organisation batches" on public.batches;
create policy "Members can manage organisation batches" on public.batches for all to authenticated using (private.is_org_member(auth.uid(), organization_id)) with check (private.is_org_member(auth.uid(), organization_id));

drop policy if exists "Members can manage organisation fee plans" on public.fee_plans;
create policy "Members can manage organisation fee plans" on public.fee_plans for all to authenticated using (private.is_org_member(auth.uid(), organization_id)) with check (private.is_org_member(auth.uid(), organization_id));

drop policy if exists "Members can manage organisation students" on public.students;
create policy "Members can manage organisation students" on public.students for all to authenticated using (private.is_org_member(auth.uid(), organization_id)) with check (private.is_org_member(auth.uid(), organization_id));

drop policy if exists "Members can manage organisation fees" on public.fees;
create policy "Members can manage organisation fees" on public.fees for all to authenticated using (private.is_org_member(auth.uid(), organization_id)) with check (private.is_org_member(auth.uid(), organization_id));

drop policy if exists "Members can manage organisation payments" on public.payments;
create policy "Members can manage organisation payments" on public.payments for all to authenticated using (private.is_org_member(auth.uid(), organization_id)) with check (private.is_org_member(auth.uid(), organization_id));

drop policy if exists "Members can manage organisation receipts" on public.receipts;
create policy "Members can manage organisation receipts" on public.receipts for all to authenticated using (private.is_org_member(auth.uid(), organization_id)) with check (private.is_org_member(auth.uid(), organization_id));