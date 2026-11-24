(() => {
  const C = window.AGENCY_CONFIG, T = window.I18N, $ = s => document.querySelector(s);
  let lang = null, cat = "all", gb = "all";
  try { lang = localStorage.getItem("lang"); } catch (e) {}
  if (!C.languages.includes(lang)) lang = C.defaultLang;

  // ---- helpers -----------------------------------------------------------
  const t = (k, p = {}) => (T[lang]?.[k] ?? T.fr[k] ?? k).replace(/\{(\w+)\}/g, (_, x) => p[x] ?? "");
  const pv = { min: C.rules.minAge, years: C.rules.licenseYears, deposit: C.rules.deposit, km: C.rules.mileage };
  const pvOf = () => ({ ...pv, km: (lang === "ar" && C.rules.mileageAr) || C.rules.mileage, cur: C.currency });
  const money = n => new Intl.NumberFormat(lang === "en" ? "en-US" : "fr-FR").format(n) + " " + C.currency;
  const place = l => l[lang] || l.fr;
  const placeH = l => esc(place(l));
  const carById = id => C.cars.find(c => c.id === id);
  const locById = id => C.locations.find(l => l.id === id);
  const sil = {
    economy: '<path d="M12 74V62q2-6 14-8l32-5q14-20 40-22h50q22 2 36 22l30 6q12 4 14 14v6q0 4-6 4H12z"/><path class="gl" d="M70 47q12-14 32-15h46q16 2 28 17z"/>',
    suv: '<path d="M10 76V60q2-8 16-10l26-4q8-26 38-30h70q24 2 38 26l24 6q12 4 14 16v12q0 4-6 4H10z"/><path class="gl" d="M64 46q8-18 34-20h62q18 2 30 22z"/>'
  };
  const art = c => `<svg class="sil" viewBox="0 0 250 100" aria-hidden="true"><ellipse cx="125" cy="88" rx="105" ry="8" fill="url(#glowG)"/><g fill="url(#carG)">${sil[c.category] || sil.economy}</g><g fill="#0b0b0d" stroke="#d4d4d8" stroke-width="2.5"><circle cx="62" cy="78" r="14"/><circle cx="190" cy="78" r="14"/></g><circle cx="62" cy="78" r="4" fill="#DC2626"/><circle cx="190" cy="78" r="4" fill="#DC2626"/></svg>`;

  const esc = v => String(v).replace(/[&<>"']/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));

  const days = () => {
    const a = new Date($("#from").value), b = new Date($("#to").value);
    return isNaN(a) || isNaN(b) ? 0 : Math.round((b - a) / 864e5);
  };

  // ---- render ------------------------------------------------------------
  function applyLang() {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.querySelectorAll("[data-i18n]").forEach(e => e.textContent = t(e.dataset.i18n, pvOf()));
    $("#tagline").textContent = C.tagline[lang] || C.tagline.fr;
    $("#okText").textContent = t("ok_license", pvOf());
    $("#note").textContent = t("note", pvOf());
    $("#terms").innerHTML = [1, 2, 3, 4].map(i => `<li>${t("t" + i, pvOf())}</li>`).join("");
    $("#faqList").innerHTML = [1, 2, 3, 4].map(i => `<details><summary>${t("q" + i)}</summary><p>${t("a" + i)}</p></details>`).join("");
    $("#lang").innerHTML = C.languages.map(l => `<button type="button" data-l="${l}" aria-pressed="${l === lang}">${l.toUpperCase()}</button>`).join("");
    const keepLoc = $("#loc").value, keepCar = $("#car").value;
    const opts = C.locations.map(l => `<option value="${esc(l.id)}">${placeH(l)}</option>`).join("");
    $("#heroLoc").innerHTML = opts;
    $("#loc").innerHTML = opts;
    if (keepLoc) $("#loc").value = keepLoc;
    $("#heroLoc").value = $("#loc").value;
    $("#car").innerHTML = `<option value="">${t("choose")}</option>` + C.cars.map(c =>
      `<option value="${esc(c.id)}" ${c.available ? "" : "disabled"}>${esc(c.name)} — ${money(c.price)}</option>`).join("");
    if (keepCar) $("#car").value = keepCar;
    renderChips(); renderCars(); calc();
  }

  function renderChips() {
    const cats = ["all", ...new Set(C.cars.map(c => c.category))];
    $("#chips").innerHTML = cats.map(c => `<button type="button" data-c="${c}" aria-pressed="${c === cat}">${t(c === "all" ? "f_all" : c)}</button>`).join("");
    $("#gbChips").innerHTML = ["all", "manual", "auto"].map(g => `<button type="button" data-g="${g}" aria-pressed="${g === gb}">${t(g === "all" ? "f_all" : g)}</button>`).join("");
  }

  function renderCars() {
    $("#cars").innerHTML = C.cars.filter(c => (cat === "all" || c.category === cat) && (gb === "all" || c.transmission === gb || c.transmission === "both")).map(c => `
      <article class="car ${c.available ? "" : "off"}">
        <div class="ph"><span class="tag">${t(c.category)}</span>${c.image ? `<img src="${esc(c.image)}" alt="${esc(c.name)}" loading="lazy">` : art(c)}</div>
        <div class="in"><h3>${esc(c.name)}</h3>
          <div class="specs"><span>${t(c.transmission)}</span><span>${t(c.fuel)}</span><span>${t("seats", { n: c.seats })}</span></div>
          <div class="price"><span><strong>${money(c.price)}</strong> <small>${t("per_day")}</small></span></div>
          <button class="btn" type="button" data-book="${esc(c.id)}" ${c.available ? "" : "disabled"}>${c.available ? t("book") : t("unavailable")}</button>
        </div></article>`).join("");
  }

  function calc() {
    const n = days(), car = carById($("#car").value), loc = locById($("#loc").value);
    const fee = loc?.fee || 0, ok = n > 0 && car;
    $("#sDays").textContent = n > 0 ? t("days_n", { n }) : "—";
    $("#feeRow").hidden = !(fee && ok);
    $("#sFee").textContent = money(fee);
    $("#sTotal").textContent = ok ? money(n * car.price + fee) : "—";
    return ok ? { n, car, loc, total: n * car.price + fee } : null;
  }

  // ---- events ------------------------------------------------------------
  document.addEventListener("click", e => {
    const l = e.target.closest("[data-l]"), c = e.target.closest("[data-c]"), b = e.target.closest("[data-book]"), g = e.target.closest("[data-g]");
    if (l) { lang = l.dataset.l; try { localStorage.setItem("lang", lang); } catch (e) {} applyLang(); }
    if (c) { cat = c.dataset.c; renderChips(); renderCars(); }
    if (g) { gb = g.dataset.g; renderChips(); renderCars(); }
    if (b) { $("#car").value = b.dataset.book; calc(); $("#book").scrollIntoView(); $("#form [name=name]").focus({ preventScroll: true }); }
  });
  $("#heroLoc").addEventListener("change", e => { $("#loc").value = e.target.value; calc(); });
  $("#loc").addEventListener("change", e => { $("#heroLoc").value = e.target.value; });
  ["#loc", "#car", "#from", "#to"].forEach(s => $(s).addEventListener("change", () => {
    if (s === "#from") $("#to").min = $("#from").value;
    $("#err").hidden = true; calc();
  }));

  $("#form").addEventListener("submit", e => {
    e.preventDefault();
    const f = e.target, r = calc();
    if (!f.reportValidity()) return;
    if (!r) { $("#err").textContent = t("err_dates"); $("#err").hidden = false; return; }
    const fd = Object.fromEntries(new FormData(f));
    const d = v => new Date(v).toLocaleDateString(lang === "en" ? "en-GB" : "fr-FR");
    const msg = [
      `*${C.name}* — ${t("wa_head")}`, "",
      `${t("wa_car")}: ${r.car.name}`,
      `${t("wa_pick")}: ${place(r.loc)}`,
      `${t("wa_dates")}: ${d(fd.from)} → ${d(fd.to)}`,
      `${t("wa_days")}: ${t("days_n", { n: r.n })}`,
      `${t("wa_total")}: ${money(r.total)}`, "",
      `${t("wa_client")}: ${fd.name.trim()}`,
      `${t("wa_tel")}: ${fd.phone.trim()}`
    ].join("\n");
    window.Leads.save({ name: fd.name, phone: fd.phone, car: r.car.name, pickup: place(r.loc), date_from: fd.from, date_to: fd.to, days: r.n, total: r.total, lang });
    window.open(`https://wa.me/${C.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
  });

  // ---- init --------------------------------------------------------------
  document.title = C.name;
  document.documentElement.style.setProperty("--p", C.brand.primary);
  document.documentElement.style.setProperty("--a", C.brand.accent);
  $("#brand").innerHTML = C.logo ? `<img src="${esc(C.logo)}" alt="${esc(C.name)}">` : `<span>${esc(C.logoText || C.name)}</span>`;
  if (C.logo) $("#brand").classList.add("has-logo");
  if (C.whatsappDisplay) { $("#fWa").textContent = C.whatsappDisplay; $("#fWa").href = "https://wa.me/" + C.whatsapp; } else $("#fWa").hidden = true;
  $("#fName").textContent = "© " + new Date().getFullYear() + " " + C.name;
  if (C.email) { $("#fMail").textContent = C.email; $("#fMail").href = "mailto:" + C.email; }
  const M = C.map || {};
  [["#mapHero", M.url], ["#mapBtn", M.url], ["#dirBtn", M.directions || M.url]].forEach(([q, u]) => { const el = $(q); if (u) el.href = u; else el.hidden = true; });
  if (C.instagram) $("#fIg").href = C.instagram; else $("#fIg").hidden = true;
  const now = new Date(), today = new Date(now.getTime() - now.getTimezoneOffset() * 6e4).toISOString().slice(0, 10);
  $("#from").min = $("#to").min = today;
  applyLang();
})();
