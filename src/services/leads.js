/* Optional lead logging (Supabase REST, no SDK needed). Disabled by default.
   To enable: set supabase.enabled=true + url + anonKey in agencyConfig.js, then run in Supabase SQL editor:
   create table leads (id bigint generated always as identity primary key, created_at timestamptz default now(),
     name text, phone text, car text, pickup text, date_from date, date_to date, days int, total int, lang text);
   alter table leads enable row level security;
   create policy "anon insert" on leads for insert to anon with check (true);
   Dashboard add-on later: add a listLeads() here (needs an authenticated user; never allow anon reads). */
window.Leads = {
  async save(lead) {
    const s = window.AGENCY_CONFIG.supabase;
    if (!s || !s.enabled) return false;
    try {
      const r = await fetch(`${s.url}/rest/v1/${s.table}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", apikey: s.anonKey, Authorization: `Bearer ${s.anonKey}`, Prefer: "return=minimal" },
        body: JSON.stringify(lead), keepalive: true
      });
      return r.ok;
    } catch (e) { console.warn("Lead not saved", e); return false; }   // never block the WhatsApp flow
  }
};
