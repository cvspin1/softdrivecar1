# Car rental template (Morocco) — WhatsApp booking

Zero build, zero backend. Static HTML/CSS/JS.

## New agency in ~15 min
1. Duplicate the repo. 2. Edit **`src/data/agencyConfig.js`** only (name, WhatsApp, locations, cars, rules, colours).
3. Drop car photos in `assets/cars/` and set `image` paths. 4. Push → deploy.

## Deploy
- **GitHub Pages**: Settings → Pages → deploy from `main` / root.
- **Vercel / Netlify**: import repo, no build command, output dir `.`.

## Languages
FR + EN by default. Arabic: add `"ar"` to `languages` in the config and translate `ar` in `src/data/i18n.js` (RTL switches automatically).

## Optional Supabase leads
Off by default. Set `supabase.enabled: true` + url/anonKey in the config and run the SQL at the top of `src/services/leads.js`.
Leads are saved best-effort before WhatsApp opens; failures never block the booking.

## Structure
```
index.html  app.js  styles.css
src/data/agencyConfig.js   ← the only file to edit per agency
src/data/i18n.js           ← FR / EN / AR (Arabic is complete, RTL automatic)
src/services/leads.js      ← optional Supabase leads
assets/cars/               ← car photos
```
Before going live: set the real `whatsapp` number, `name`, prices and car photos in `agencyConfig.js`.
