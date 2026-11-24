/* ==========================================================================
   AGENCY CONFIG — the ONLY file you edit for a new agency (~15 min).
   Checklist:
   1. name / logoText (or logo image path)          5. cars[] (photo, price, specs, available)
   2. whatsapp  → international format, digits only  6. rules (age, licence, deposit)
   3. tagline + defaultLang / languages              7. brand colours
   4. locations[] (cities + airports, optional fee)  8. supabase (optional, leave off for v1)
   ========================================================================== */
window.AGENCY_CONFIG = {
  name: "Soft Drive Car",          // CHANGE: agency name (header, footer, WhatsApp message)
  logo: "public/logo.svg",                             // CHANGE: e.g. "assets/logo.png" — empty = text logo
  logoText: "Soft Drive Car",                    // short brand text used when no logo image
  whatsapp: "212660996180",          // wa.me format (no +)
  whatsappDisplay: "+212 6 60 99 61 80",
  email: "",       // shown in footer (optional, "" to hide)
  currency: "MAD",                       // shown next to prices ("DH" or "MAD")

  defaultLang: "fr",                    // "fr" | "en" | "ar"
  languages: ["fr", "en"],              // add "ar" to enable Arabic (RTL is automatic; edit src/data/i18n.js → ar)

  brand: { primary: "#7F1D1D", accent: "#DC2626" },   // CHANGE: brand colours (hex)

  tagline: {
    fr: "Location de voitures et livraison partout au Maroc",
    en: "Car rental and delivery across Morocco",
    ar: "كراء السيارات والتوصيل في جميع أنحاء المغرب"
  },


  // Pickup places. fee = optional delivery/airport fee in DH added to the total (0 = free).
  locations: [
    { id: "office", fr: "Je récupère au bureau (Soft Drive Car)", en: "I'll pick up at the office (Soft Drive Car)", ar: "", fee: 0 },
    { id: "cmn-airport", fr: "Casablanca — Aéroport Mohammed V", en: "Casablanca — Mohammed V Airport", ar: "", fee: 100 },
    { id: "cmn-city", fr: "Casablanca — Centre-ville", en: "Casablanca — City centre", ar: "", fee: 0 },
    { id: "rak-airport", fr: "Marrakech — Aéroport Menara", en: "Marrakech — Menara Airport", ar: "", fee: 100 },
    { id: "rak-city", fr: "Marrakech — Centre-ville", en: "Marrakech — City centre", ar: "", fee: 50 },
    { id: "aga-airport", fr: "Agadir — Aéroport Al Massira", en: "Agadir — Al Massira Airport", ar: "", fee: 100 },
    { id: "tng-airport", fr: "Tanger — Aéroport Ibn Battouta", en: "Tangier — Ibn Battouta Airport", ar: "", fee: 100 },
    { id: "rab-airport", fr: "Rabat — Aéroport Rabat-Salé", en: "Rabat — Rabat-Salé Airport", ar: "", fee: 100 },
    { id: "rab-city", fr: "Rabat — Centre-ville", en: "Rabat — City centre", ar: "", fee: 50 }
  ],


  rules: { minAge: 21, licenseYears: 2, deposit: 3000, mileage: "250 km/jour", mileageAr: "250 كم/يوم" },   // CHANGE: used in terms + form note

  // Fleet. image: "" shows a clean placeholder; use "assets/cars/dacia-logan.jpg" for real photos.
  // category: economy | comfort | suv | premium   transmission: manual | auto   fuel: diesel | petrol | hybrid
  // available: false → card is greyed out with "Indisponible", booking disabled.
  // transmission: manual | auto | both
  cars: [
    { id: "sportage", name: "Kia Sportage", category: "suv", image: "assets/cars/kia-sportage.webp", price: 550, transmission: "auto", fuel: "diesel", seats: 5, available: true },
    { id: "i20", name: "Hyundai i20 Automatic", category: "economy", image: "assets/cars/hyundai-i20.webp", price: 300, transmission: "auto", fuel: "petrol", seats: 5, available: true },
    { id: "troc", name: "Volkswagen T-Roc 2025", category: "suv", image: "assets/cars/vw-troc.webp", price: 600, transmission: "auto", fuel: "diesel", seats: 5, available: true },
    { id: "duster", name: "Dacia Duster 2025", category: "suv", image: "assets/cars/dacia-duster.webp", price: 420, transmission: "both", fuel: "diesel", seats: 5, available: true },
    { id: "208", name: "Peugeot 208", category: "economy", image: "assets/cars/peugeot-208.webp", price: 320, transmission: "auto", fuel: "diesel", seats: 5, available: true },
    { id: "clio24", name: "Renault Clio 5 2024", category: "economy", image: "assets/cars/renault-clio-2024.webp", price: 300, transmission: "manual", fuel: "diesel", seats: 5, available: true },
    { id: "tucson", name: "Hyundai Tucson", category: "suv", image: "assets/cars/hyundai-tucson.webp", price: 550, transmission: "auto", fuel: "diesel", seats: 5, available: true },
    { id: "logan", name: "Dacia Logan", category: "economy", image: "assets/cars/dacia-logan.webp", price: 250, transmission: "manual", fuel: "diesel", seats: 5, available: true },
    { id: "creta", name: "Hyundai Creta", category: "suv", image: "assets/cars/hyundai-creta.webp", price: 450, transmission: "auto", fuel: "diesel", seats: 5, available: true },
    { id: "corsa", name: "Opel Corsa 2024", category: "economy", image: "assets/cars/opel-corsa.webp", price: 300, transmission: "manual", fuel: "diesel", seats: 5, available: true },
    { id: "clio23", name: "Renault Clio 5 2023", category: "economy", image: "assets/cars/renault-clio-2023.webp", price: 280, transmission: "manual", fuel: "diesel", seats: 5, available: true }
  ],


  // Agency location + social (button "Voir sur Google Maps")
  map: {
    url: "https://www.google.com/maps/place/Soft+drive+car/@33.6034172,-7.4909698,17z/data=!3m1!4b1!4m6!3m5!1s0xda7cb3438a3df1b:0xde547e6538d06d45!8m2!3d33.6034172!4d-7.4909698!16s%2Fg%2F11wj5f6pq0",
    directions: "https://www.google.com/maps/dir/?api=1&destination=33.6034172,-7.4909698"
  },
  instagram: "https://www.instagram.com/softdrivecar/",

  // OPTIONAL — logged leads. Keep enabled:false and the site works 100% via WhatsApp.
  // See src/services/leads.js for the SQL to create the table.
  supabase: { enabled: false, url: "", anonKey: "", table: "leads" }
};
