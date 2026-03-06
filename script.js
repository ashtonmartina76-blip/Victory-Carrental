// ===============================
// Victory Car Rental - script.js
// Adds: WhatsApp OR Email booking option (no WhatsApp account needed for email)
// ===============================

const COMPANY_WHATSAPP = "59996913342";
const COMPANY_EMAIL = "victorycarrental@outlook.com";
const USD_TO_XCG = 1.79;

// Types: mini | compact | compact_suv | seven_seater
const cars = [
  { id:"spark",       name:"Chevrolet Spark",                type:"mini",         price:37, minDays:3, img:"assets/cars/chevrolet-spark.JPG" },
  { id:"cruze",       name:"Chevrolet Cruze",                type:"compact",      price:43, minDays:3, img:"assets/cars/chevrolet-cruze.JPG" },
  { id:"versa",       name:"Nissan Versa",                   type:"compact",      price:46, minDays:3, img:"assets/cars/nissan-versa.JPG" },
  { id:"trax",        name:"Chevrolet Trax",                 type:"compact_suv",  price:51, minDays:3, img:"assets/cars/chevrolet-trax.JPG" },
  { id:"soul",        name:"Kia Soul",                       type:"compact",      price:51, minDays:3, img:"assets/cars/kia-soul.JPG" },
  { id:"venue",       name:"Hyundai Venue",                  type:"compact_suv",  price:54, minDays:3, img:"assets/cars/hyundai-venue.JPG" },
  { id:"trailblazer", name:"Chevrolet Trailblazer",          type:"compact_suv",  price:54, minDays:3, img:"assets/cars/chevrolet-trailblazer.JPG" },
  { id:"rogue",       name:"Nissan Rogue Sport",             type:"compact_suv",  price:63, minDays:3, img:"assets/cars/Nissan-Rogue-Sport.JPG" },
  { id:"blazer",      name:"Chevrolet Blazer",               type:"compact_suv",  price:72, minDays:3, img:"assets/cars/chevrolet-blazer.jpg" },
  { id:"traverse",    name:"Chevrolet Traverse (7 Seater)",  type:"seven_seater", price:83, minDays:3, img:"assets/cars/chevrolet-traverse.JPG" }
];

const $ = (sel, parent = document) => parent.querySelector(sel);
const $$ = (sel, parent = document) => Array.from(parent.querySelectorAll(sel));

const moneyUSD = (n) => `$${Number(n).toFixed(0)}`;
const moneyXCG = (usd) => `XCG ${(Number(usd) * USD_TO_XCG).toFixed(2)}`;

const TYPE_LABELS = {
  mini: "MINI",
  compact: "COMPACT",
  compact_suv: "COMPACT SUV",
  seven_seater: "7 SEATER"
};

/* =========================
   i18n
========================= */
const i18n = {
  en: {
    language: "Language",
    topbar_location: "Curaçao, Willemstad • Airport pickup & drop-off",
    brand_tag: "Champ in price & service",
    nav_fleet: "Fleet",
    nav_services: "Services",
    nav_contact: "Contact",
    nav_book: "Book Now",

    best_prices: "Best prices in town",
    open_247: "Open 24/7 • No business hours",

    hero_title: "Simple, affordable car rentals in Curaçao",
    hero_lead:
      "Daily, weekly & monthly rentals. Free airport pickup & drop-off. Delivery anywhere on the island. No credit card required.",
    hero_cta1: "View Cars & Prices",
    hero_cta2: "Get a Quote",
    badge_airport: "✅ Airport Pickup",
    badge_delivery: "✅ Delivery Islandwide",
    badge_insurance: "✅ Insurance Options",
    fx_note: "Prices shown in USD and XCG (fixed rate: 1 USD = 1.79 XCG).",

    qq_title: "Quick Quote",
    qq_sub: "Tell us your dates — we’ll confirm availability fast.",
    pickup_date: "Pickup date",
    return_date: "Return date",
    pickup_location: "Pickup location",
    pickup_placeholder: "Airport / Willemstad / etc.",
    car_type: "Car type",
    qq_note: "This is a request — we’ll confirm final price & availability with you.",

    fleet_title: "Our Fleet",
    fleet_sub: "Starting rates shown below (minimum 3 days).",
    filter_all: "All",
    filter_mini: "Mini",
    filter_compact: "Compact",
    filter_compact_suv: "SUV",
    filter_7seater: "7 Seater",

    services_title: "Services",
    services_sub: "Clear, simple, and convenient.",
    srv1_title: "Rentals",
    srv1_1: "Daily, weekly & monthly rentals",
    srv1_2: "No credit card required",
    srv1_3: "Insurance options included",
    srv2_title: "Pickup & Delivery",
    srv2_1: "Free airport pickup & drop-off",
    srv2_2: "Delivery anywhere on the island",
    srv2_3: "Fast and easy process",
    srv3_title: "Vehicle Features",
    srv3_1: "A/C in all cars",
    srv3_2: "Bluetooth in all cars",
    srv3_3: "Automatic & manual transmission available",

    contact_title: "Contact",
    contact_sub: "Send your dates + preferred car and we’ll confirm availability.",
    phone: "Phone",
    email: "Email",
    instagram: "Instagram",
    facebook: "Facebook",
    call_now: "Call Now",
    min_days_note: "Minimum 3 days on listed offers.",
    name: "Name",
    name_placeholder: "Your name",
    preferred_car: "Preferred car",
    message: "Message",
    message_placeholder: "Airport pickup? Delivery address? Child seat?",
    rights: "All rights reserved.",

    cur_title: "About Curaçao",
    cur_subline: "A little history, a lot of adventure — and beaches you’ll never forget.",
    cur_story_badge: "Island story",
    cur_desc:
      "Curaçao is more than a sunny island — it’s a place where history and adventure live side by side. Long before the colorful waterfront of Willemstad became famous, the island was shaped by trade routes, cultures, and the sea. Today you can still feel that story in the UNESCO-listed streets of Willemstad: pastel Dutch architecture, floating bridges, and murals that bring the city to life. Start your morning with coffee by the Handelskade, then follow the road as it curves along the coast and the landscape changes from lively city views to wild, open nature.\n\nIf you’re looking for adventure, Curaçao rewards you the moment you explore beyond the main roads. Drive out to the dramatic cliffs and blowholes, stop at viewpoints where the ocean stretches forever, and take your time discovering hidden coves. Spend a day beach-hopping — feel the energy at Mambo Beach, then escape to calmer water at Playa Lagun. Don’t miss the postcard-perfect views at Grote Knip (Playa Kenepa Grandi), and if you want that turquoise ‘wow’ moment, Cas Abao is unforgettable. And when the sun starts to drop, you’ll find the island turns golden — perfect for a sunset drive back toward town.\n\nThat’s the best part about Curaçao: everything is close, but every drive feels like a new chapter. With the right car, your trip becomes simple — more freedom, more beaches, more local spots, and more memories you’ll want to bring home.",
    cur_beaches_title: "Beautiful beaches",
    cur_company_title: "Victory Car Rental",
    cur_company_desc:
      "Established since 2009 — helping visitors explore the island with comfort and the best prices in town.",
    follow_instagram: "Follow us on Instagram",

    footer_name: "Victory Car Rental Lease & Sale",
    payments_title: "Payment methods accepted",

    from: "From",
    per_day: "/day",
    minimum: "Minimum",
    days: "days",
    airport_pickup_available: "Airport pickup available",
    book: "Book",
    call: "Call",

    send_whatsapp: "Send via WhatsApp",
    send_email: "Send via Email",
    booking_note: "No WhatsApp? Use Email — it works without an account."
  },

  nl: {
    language: "Taal",
    topbar_location: "Curaçao, Willemstad • Ophalen & afzetten bij de luchthaven",
    brand_tag: "Kampioen in prijs & service",
    nav_fleet: "Auto’s",
    nav_services: "Service",
    nav_contact: "Contact",
    nav_book: "Boek nu",

    best_prices: "Beste prijzen in de stad",
    open_247: "24/7 open • Geen openingstijden",

    hero_title: "Eenvoudige, betaalbare autoverhuur op Curaçao",
    hero_lead:
      "Dagelijks, wekelijks & maandelijks huren. Gratis ophalen & afzetten bij de luchthaven. Levering overal op het eiland. Geen creditcard nodig.",
    hero_cta1: "Bekijk auto’s & prijzen",
    hero_cta2: "Offerte aanvragen",
    badge_airport: "✅ Luchthaven ophalen",
    badge_delivery: "✅ Levering op het eiland",
    badge_insurance: "✅ Verzekeringsopties",
    fx_note: "Prijzen worden weergegeven in USD en XCG (vaste koers: 1 USD = 1.79 XCG).",

    qq_title: "Snelle offerte",
    qq_sub: "Geef je data door — we bevestigen snel beschikbaarheid.",
    pickup_date: "Ophaaldatum",
    return_date: "Inleverdatum",
    pickup_location: "Ophaallocatie",
    pickup_placeholder: "Luchthaven / Willemstad / etc.",
    car_type: "Type auto",
    qq_note: "Dit is een aanvraag — we bevestigen de definitieve prijs & beschikbaarheid.",

    fleet_title: "Onze vloot",
    fleet_sub: "Starttarieven hieronder (minimaal 3 dagen).",
    filter_all: "Alles",
    filter_mini: "Mini",
    filter_compact: "Compact",
    filter_compact_suv: "SUV",
    filter_7seater: "7-zitter",

    services_title: "Services",
    services_sub: "Duidelijk, eenvoudig en handig.",
    srv1_title: "Verhuur",
    srv1_1: "Dagelijks, wekelijks & maandelijks",
    srv1_2: "Geen creditcard nodig",
    srv1_3: "Verzekeringsopties inbegrepen",
    srv2_title: "Ophalen & bezorgen",
    srv2_1: "Gratis ophalen & afzetten bij de luchthaven",
    srv2_2: "Bezorging overal op het eiland",
    srv2_3: "Snel en eenvoudig",
    srv3_title: "Auto functies",
    srv3_1: "Airco in alle auto’s",
    srv3_2: "Bluetooth in alle auto’s",
    srv3_3: "Automaat & handgeschakeld beschikbaar",

    contact_title: "Contact",
    contact_sub: "Stuur je data + gewenste auto — we bevestigen beschikbaarheid.",
    phone: "Telefoon",
    email: "E-mail",
    instagram: "Instagram",
    facebook: "Facebook",
    call_now: "Bel nu",
    min_days_note: "Minimaal 3 dagen op aanbiedingen.",
    name: "Naam",
    name_placeholder: "Jouw naam",
    preferred_car: "Gewenste auto",
    message: "Bericht",
    message_placeholder: "Ophalen luchthaven? Bezorgadres? Kinderzitje?",
    rights: "Alle rechten voorbehouden.",

    cur_title: "Over Curaçao",
    cur_subline: "Een beetje geschiedenis, veel avontuur — en stranden die je nooit vergeet.",
    cur_story_badge: "Eilandverhaal",
    cur_desc:
      "Curaçao is meer dan alleen zon en strand — het is een eiland waar geschiedenis en avontuur naast elkaar bestaan. Lang voordat de kleurrijke gevels van Willemstad wereldberoemd werden, werd het eiland gevormd door handelsroutes, verschillende culturen en de zee. In de straten van Willemstad voel je dat verleden nog steeds: de UNESCO-werelderfgoedwijk, de pastelgekleurde Nederlandse architectuur, de drijvende pontjesbrug en de muurschilderingen die de stad tot leven brengen. Begin je dag met een koffie bij de Handelskade en volg daarna de kustweg terwijl het uitzicht verandert van levendige stad naar ruige natuur.\n\nWie avontuur zoekt, wordt op Curaçao meteen beloond zodra je verder rijdt dan de bekende plekken. Ontdek kliffen en uitzichtpunten waar de oceaan eindeloos lijkt, stop bij verborgen baaitjes en neem de tijd om het eiland echt te leren kennen. Maak er een beach-hop dag van: geniet van de gezelligheid bij Mambo Beach en rijd daarna naar het rustige, heldere water van Playa Lagun. De iconische ansichtkaart-uitzichten bij Grote Knip (Playa Kenepa Grandi) wil je niet missen, en voor dat echte turquoise ‘wow’-moment is Cas Abao een aanrader. En zodra de zon lager komt te staan, kleurt het eiland goud — ideaal voor een mooie zonsondergangrit terug richting de stad.\n\nDat is het mooie aan Curaçao: alles is dichtbij, maar elke rit voelt als een nieuw avontuur. Met de juiste auto wordt je vakantie eenvoudiger — meer vrijheid, meer stranden, meer lokale plekjes en meer herinneringen om mee naar huis te nemen.",
    cur_beaches_title: "Mooie stranden",
    cur_company_title: "Victory Car Rental",
    cur_company_desc:
      "Opgericht sinds 2009 — we helpen bezoekers het eiland te verkennen met comfort en de beste prijzen in de stad.",
    follow_instagram: "Volg ons op Instagram",

    footer_name: "Victory Car Rental Lease & Sale",
    payments_title: "Betaalmethoden",

    from: "Vanaf",
    per_day: "/dag",
    minimum: "Minimum",
    days: "dagen",
    airport_pickup_available: "Ophalen luchthaven mogelijk",
    book: "Boek",
    call: "Bel",

    send_whatsapp: "Verstuur via WhatsApp",
    send_email: "Verstuur via e-mail",
    booking_note: "Geen WhatsApp? Gebruik e-mail — werkt zonder account."
  },

  es: {
    language: "Idioma",
    topbar_location: "Curaçao, Willemstad • Recogida y entrega en el aeropuerto",
    brand_tag: "Campeón en precio y servicio",
    nav_fleet: "Autos",
    nav_services: "Servicios",
    nav_contact: "Contacto",
    nav_book: "Reservar",

    best_prices: "Los mejores precios de la ciudad",
    open_247: "Abierto 24/7 • Sin horario",

    hero_title: "Alquiler de autos fácil y económico en Curaçao",
    hero_lead:
      "Alquiler diario, semanal y mensual. Recogida y entrega gratis en el aeropuerto. Entrega en toda la isla. No se requiere tarjeta de crédito.",
    hero_cta1: "Ver autos y precios",
    hero_cta2: "Solicitar cotización",
    badge_airport: "✅ Recogida en aeropuerto",
    badge_delivery: "✅ Entrega en la isla",
    badge_insurance: "✅ Opciones de seguro",
    fx_note: "Precios en USD y XCG (tasa fija: 1 USD = 1.79 XCG).",

    qq_title: "Cotización rápida",
    qq_sub: "Envíanos tus fechas — confirmamos disponibilidad rápido.",
    pickup_date: "Fecha de recogida",
    return_date: "Fecha de devolución",
    pickup_location: "Lugar de recogida",
    pickup_placeholder: "Aeropuerto / Willemstad / etc.",
    car_type: "Tipo de auto",
    qq_note: "Esto es una solicitud — confirmaremos precio final y disponibilidad.",

    fleet_title: "Nuestra flota",
    fleet_sub: "Tarifas desde (mínimo 3 días).",
    filter_all: "Todos",
    filter_mini: "Mini",
    filter_compact: "Compacto",
    filter_compact_suv: "SUV",
    filter_7seater: "7 plazas",

    services_title: "Servicios",
    services_sub: "Claro, simple y conveniente.",
    srv1_title: "Alquiler",
    srv1_1: "Alquiler diario, semanal y mensual",
    srv1_2: "No se requiere tarjeta de crédito",
    srv1_3: "Opciones de seguro incluidas",
    srv2_title: "Recogida y entrega",
    srv2_1: "Recogida y entrega gratis en el aeropuerto",
    srv2_2: "Entrega en cualquier parte de la isla",
    srv2_3: "Proceso rápido y fácil",
    srv3_title: "Características del auto",
    srv3_1: "A/C en todos los autos",
    srv3_2: "Bluetooth en todos los autos",
    srv3_3: "Transmisión automática y manual disponible",

    contact_title: "Contacto",
    contact_sub: "Envíanos fechas + auto preferido y confirmamos disponibilidad.",
    phone: "Teléfono",
    email: "Correo",
    instagram: "Instagram",
    facebook: "Facebook",
    call_now: "Llamar",
    min_days_note: "Mínimo 3 días en ofertas.",
    name: "Nombre",
    name_placeholder: "Tu nombre",
    preferred_car: "Auto preferido",
    message: "Mensaje",
    message_placeholder: "¿Recogida en aeropuerto? ¿Dirección de entrega? ¿Asiento de niño?",
    rights: "Todos los derechos reservados.",

    cur_title: "Sobre Curaçao",
    cur_subline: "Un poco de historia, mucha aventura — y playas que nunca olvidarás.",
    cur_story_badge: "Historia de la isla",
    cur_desc:
      "Curaçao es mucho más que sol y mar: es una isla donde la historia y la aventura van de la mano. Mucho antes de que el paseo colorido de Willemstad se hiciera famoso, la isla fue moldeada por rutas comerciales, culturas distintas y el Caribe. Hoy todavía se siente ese pasado en las calles de Willemstad: su zona declarada Patrimonio de la Humanidad por la UNESCO, la arquitectura holandesa en tonos pastel, el puente flotante y los murales que llenan la ciudad de vida. Empieza la mañana con un café frente a la Handelskade y luego sigue la carretera costera mientras el paisaje cambia de la ciudad vibrante a una naturaleza más salvaje y abierta.\n\nSi buscas aventura, Curaçao te recompensa en cuanto sales de las rutas principales. Conduce hasta acantilados dramáticos y miradores donde el océano parece infinito; detente en calas escondidas y descubre rincones que no aparecen en todas las guías. Dedica un día a recorrer playas: vive el ambiente de Mambo Beach y luego escápate a la tranquilidad de Playa Lagun. No te pierdas las vistas icónicas de Grote Knip (Playa Kenepa Grandi), y si quieres ese momento ‘wow’ de agua turquesa, Cas Abao es inolvidable. Cuando el sol empieza a caer, la isla se vuelve dorada: perfecta para un paseo al atardecer de regreso a la ciudad.\n\nLo mejor de Curaçao es que todo está cerca, pero cada trayecto se siente como un capítulo nuevo. Con el auto adecuado, tu viaje se vuelve sencillo: más libertad, más playas, más lugares locales y más recuerdos para llevar contigo.",
    cur_beaches_title: "Playas hermosas",
    cur_company_title: "Victory Car Rental",
    cur_company_desc:
      "Establecidos desde 2009 — ayudamos a los visitantes a explorar la isla con comodidad y los mejores precios de la ciudad.",
    follow_instagram: "Síguenos en Instagram",

    footer_name: "Victory Car Rental Lease & Sale",
    payments_title: "Métodos de pago",

    from: "Desde",
    per_day: "/día",
    minimum: "Mínimo",
    days: "días",
    airport_pickup_available: "Recogida en aeropuerto disponible",
    book: "Reservar",
    call: "Llamar",

    send_whatsapp: "Enviar por WhatsApp",
    send_email: "Enviar por correo",
    booking_note: "¿No tienes WhatsApp? Usa el correo — funciona sin cuenta."
  }
};

function getSavedLang(){ return localStorage.getItem("vcr_lang") || "en"; }
function setSavedLang(lang){ localStorage.setItem("vcr_lang", lang); }

function applyI18n(lang){
  const dict = i18n[lang] || i18n.en;

  $$("[data-i18n]").forEach((el)=>{
    const key = el.getAttribute("data-i18n");
    if(dict[key]) el.textContent = dict[key];
  });

  $$("[data-i18n-placeholder]").forEach((el)=>{
    const key = el.getAttribute("data-i18n-placeholder");
    if(dict[key]) el.setAttribute("placeholder", dict[key]);
  });

  populateSelects(lang);
  renderFleet(getActiveFilter(), lang);
}

function getActiveFilter(){
  const active = document.querySelector(".chip.is-active");
  return active ? active.dataset.filter : "all";
}

/* Rendering */
const fleetGrid = $("#fleetGrid");
const quickCarSelect = $("#quickCarSelect");
const contactCarSelect = $("#contactCarSelect");

function renderFleet(filter="all", lang="en"){
  if(!fleetGrid) return;
  const dict = i18n[lang] || i18n.en;

  fleetGrid.innerHTML = "";
  const list = (filter === "all") ? cars : cars.filter(c => c.type === filter);

  list.forEach((car)=>{
    const xcg = moneyXCG(car.price);
    const typeLabel = TYPE_LABELS[car.type] || car.type.toUpperCase();

    const el = document.createElement("div");
    el.className = "card car";
    el.innerHTML = `
      <div class="car__img">
        <img src="${car.img}" alt="${car.name}"
          onerror="this.style.display='none'; this.parentElement.textContent='Image missing';" />
      </div>

      <div class="car__body">
        <div class="car__top">
          <div>
            <div class="car__title">${car.name} <span class="car__similar">/ Similar</span></div>
            <div class="car__type">${typeLabel}</div>
          </div>

          <div class="car__pricewrap">
            <div class="car__price">${dict.from} ${moneyUSD(car.price)}${dict.per_day}</div>
            <div class="car__xcg">${xcg}${dict.per_day}</div>
          </div>
        </div>

        <div class="car__meta">
          ${dict.minimum} ${car.minDays} ${dict.days} • ${dict.airport_pickup_available}
        </div>

        <div class="car__actions">
          <button class="btn btn--primary" data-pick="${car.id}">${dict.book}</button>
          <a class="btn btn--outline" href="tel:+59996913342">${dict.call}</a>
        </div>
      </div>
    `;
    fleetGrid.appendChild(el);
  });
}

function populateSelects(lang="en"){
  const dict = i18n[lang] || i18n.en;
  const base = `<option value="">${dict.car_type}</option>`;

  const opts = cars.map((c)=>{
    const xcg = moneyXCG(c.price);
    return `<option value="${c.id}">${c.name} / Similar — ${moneyUSD(c.price)}${dict.per_day} / ${xcg}${dict.per_day} (${dict.minimum} ${c.minDays} ${dict.days})</option>`;
  }).join("");

  if(quickCarSelect) quickCarSelect.innerHTML = base + opts;
  if(contactCarSelect) contactCarSelect.innerHTML = base + opts;
}

/* =========================
   WhatsApp + Email handlers
========================= */
function openWhatsApp(message){
  const url = `https://wa.me/${COMPANY_WHATSAPP}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

function openEmail(subject, body){
  const mailto = `mailto:${COMPANY_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailto;
}

/**
 * Determine which submit button was pressed.
 * Works because each button has name="channel" value="whatsapp|email"
 */
function getSubmitChannel(evt){
  const btn = evt?.submitter;
  const channel = btn?.value || "whatsapp";
  return (channel === "email") ? "email" : "whatsapp";
}

function buildQuoteMessage({ dict, data, car }){
  const usd = car ? car.price : "";
  const xcg = car ? (usd * USD_TO_XCG).toFixed(2) : "";
  const carLine = car ? (car.name + " / Similar") : "";

  return (
`Hi Victory Car Rental 👋

${dict.pickup_date}: ${data.pickup_date}
${dict.return_date}: ${data.return_date}
${dict.pickup_location}: ${data.pickup_location}
${dict.car_type}: ${carLine}

${car ? `${dict.from} $${usd}${dict.per_day} / XCG ${xcg}${dict.per_day}` : ""}

${dict.minimum} 3 ${dict.days}.`
  ).trim();
}

function buildContactMessage({ dict, data, car }){
  const usd = car ? car.price : "";
  const xcg = car ? (usd * USD_TO_XCG).toFixed(2) : "";
  const carLine = car ? (car.name + " / Similar") : "";

  return (
`Hi Victory Car Rental 👋

${dict.name}: ${data.name}
${dict.phone}: ${data.phone || "N/A"}

${dict.pickup_date}: ${data.pickup_date}
${dict.return_date}: ${data.return_date}
${dict.pickup_location}: ${data.pickup_location}
${dict.car_type}: ${carLine}

${car ? `${dict.from} $${usd}${dict.per_day} / XCG ${xcg}${dict.per_day}` : ""}

${dict.message}: ${data.message}`
  ).trim();
}

/* Quick Quote submit */
$("#quickQuoteForm")?.addEventListener("submit", function(e){
  e.preventDefault();

  const lang = getSavedLang();
  const dict = i18n[lang] || i18n.en;
  const channel = getSubmitChannel(e);

  const d = new FormData(this);
  const car = cars.find(c => c.id === d.get("car_id"));

  const payload = {
    pickup_date: d.get("pickup_date"),
    return_date: d.get("return_date"),
    pickup_location: d.get("pickup_location"),
    car_id: d.get("car_id")
  };

  const msg = buildQuoteMessage({ dict, data: payload, car });

  if(channel === "email"){
    openEmail("Victory Car Rental — Quick Quote Request", msg);
  }else{
    openWhatsApp(msg);
  }
});

/* Contact submit */
$("#contactForm")?.addEventListener("submit", function(e){
  e.preventDefault();

  const lang = getSavedLang();
  const dict = i18n[lang] || i18n.en;
  const channel = getSubmitChannel(e);

  const d = new FormData(this);
  const car = cars.find(c => c.id === d.get("car_id"));

  const payload = {
    name: d.get("name"),
    phone: d.get("phone"),
    pickup_date: d.get("pickup_date"),
    return_date: d.get("return_date"),
    pickup_location: d.get("pickup_location"),
    car_id: d.get("car_id"),
    message: d.get("message")
  };

  const msg = buildContactMessage({ dict, data: payload, car });

  if(channel === "email"){
    openEmail("Victory Car Rental — Booking Request", msg);
  }else{
    openWhatsApp(msg);
  }
});

/* Filter chips */
$$(".chip").forEach((btn)=>{
  btn.addEventListener("click", ()=>{
    $$(".chip").forEach(b => b.classList.remove("is-active"));
    btn.classList.add("is-active");
    renderFleet(btn.dataset.filter, getSavedLang());
  });
});

/* Book button scroll + preselect car (Android-safe, no hash-jump interference) */
/* Book button scroll + preselect car (works on iOS + Android) */
(function () {

  function handleBookTap(e) {

    var btn = e.target.closest ? e.target.closest("[data-pick]") : null;
    if (!btn) return;

    if (e.cancelable) e.preventDefault();

    var id = btn.getAttribute("data-pick");
    if (!id) return;

    if (quickCarSelect) quickCarSelect.value = id;
    if (contactCarSelect) contactCarSelect.value = id;

    var contactSection = document.getElementById("contact");
    if (!contactSection) return;

    function doScroll(){
      var header = document.querySelector(".header");
      var headerH = header ? header.offsetHeight : 0;

      var y =
        contactSection.getBoundingClientRect().top +
        window.pageYOffset -
        headerH -
        12;

      window.scrollTo(0, y);
      try {
        window.scrollTo({ top: y, behavior: "smooth" });
      } catch(err){}
    }

    doScroll();
    if (window.requestAnimationFrame) requestAnimationFrame(doScroll);
    setTimeout(doScroll, 60);
    setTimeout(doScroll, 250);

    setTimeout(function(){
      if(history.replaceState){
        history.replaceState(null,"","#contact");
      }
    },400);
  }

  document.addEventListener("click", handleBookTap, true);
  document.addEventListener("touchend", handleBookTap, {capture:true, passive:false});

})();
});

/* Mobile menu */
const burger = $("#burger");
const nav = $("#nav");
burger?.addEventListener("click", ()=>{
  const open = nav.classList.toggle("is-open");
  burger.setAttribute("aria-expanded", String(open));
});

/* Close mobile nav when a link is clicked (helps Android tap reliability) */
if (nav) {
  nav.addEventListener("click", function (e) {
    var a = e.target && e.target.closest ? e.target.closest("a") : null;
    if (!a) return;
    if (nav.classList.contains("is-open")) {
      nav.classList.remove("is-open");
      if (burger) burger.setAttribute("aria-expanded", "false");
    }
  });
}

/* Language selector */
const langSelect = $("#langSelect");
if(langSelect){
  const initial = getSavedLang();
  langSelect.value = initial;

  langSelect.addEventListener("change", ()=>{
    const lang = langSelect.value;
    setSavedLang(lang);
    applyI18n(lang);
  });
}

/* Footer year */
$("#year").textContent = new Date().getFullYear();

/* Init */
applyI18n(getSavedLang());








