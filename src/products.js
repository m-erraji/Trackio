/* =========================================================
   Trackio — product catalogue
   Data source: official MiCODUS product pages (micodus.com).
   Photos live in /public/products/<id>/ (1.jpg is the main photo).

   Fields:
     price      number, or null → "On request" + WhatsApp button instead of "Add to cart"
     oldPrice   optional crossed-out price
     featured   highlights the card with a "MOST POPULAR" tag
     images     gallery, first one is used on the product card
     specs      4 short points for the product card
     features   [title, text] — "Key features" on the product page
     specGroups [group, [[label, value], ...]] — full technical sheet
     docs       [label, url] — downloadable PDFs
   ========================================================= */

const gallery = (id, n) => Array.from({ length: n }, (_, i) => `/products/${id}/${i + 1}.jpg`);

export const PRODUCTS = [
  {
    id: "mv710n",
    name: "MiCODUS MV710N",
    tagline: "Wired · 2G · door alarm & fuel cut-off",
    price: null, // TODO: set your price
    oldPrice: null,
    images: gallery("mv710n", 5),
    specs: [
      "Remote fuel / engine cut-off",
      "Door-open & ignition (ACC) alerts",
      "Anti-jamming: cuts fuel if signal is jammed",
      "Fits 12 V & 24 V vehicles (9–95 V input)",
    ],
    intro:
      "An ultra-compact wired tracker that delivers essential vehicle security at a low cost. It runs on 9–95 V, so it fits cars, motorbikes and trucks, and adds remote fuel cut-off, door-open and ignition detection, plus vibration and low-voltage alarms. GPS + BeiDou + GLONASS positioning and a backup battery keep it reporting even if the power is cut.",
    features: [
      ["Anti-jamming", "Automatically cuts the fuel if a thief uses a signal jammer near your vehicle."],
      ["Open-door alarm", "Instant alert when a door is opened, and a log of every door event."],
      ["Remote fuel cut-off", "Stop the engine remotely from the app — and restore it in one click."],
      ["Ignition (ACC) detection", "Know exactly when the engine is switched on or off."],
      ["Geofence & overspeed", "Alerts when the car leaves a zone or goes over your speed limit."],
      ["Low-voltage & wire-cut alarms", "Warns you early about a weak car battery or a cut power wire."],
      ["180-day route replay", "Replay every trip from the last six months."],
      ["Real-time tracking", "GPS + BDS + GLONASS + LBS positioning, live in the app."],
    ],
    specGroups: [
      ["General", [
        ["Model", "MV710N"],
        ["Dimensions", "75 × 26 × 12 mm"],
        ["Weight", "31.6 g"],
        ["Working voltage", "DC 9 V – 95 V"],
        ["Working temperature", "-20 °C – 75 °C"],
        ["Working humidity", "10 % – 85 % RH"],
        ["Offline memory", "320 GPS points stored when there is no network"],
      ]],
      ["Positioning", [
        ["Positioning type", "GPS + BDS + GLONASS + LBS + AGPS"],
        ["Accuracy", "< 10 m (1σ)"],
        ["Hot / cold start", "< 1 s / < 32 s (open sky)"],
        ["GPS channels", "32"],
        ["Tracking sensitivity", "-162 dBm"],
      ]],
      ["Network", [
        ["Technology", "2G GSM"],
        ["Frequencies", "GSM 850 / 900 / 1800 / 1900 MHz"],
        ["SIM card", "Micro SIM"],
      ]],
      ["Power", [
        ["Backup battery", "3.7 V 140 mAh polymer"],
        ["Working current", "12 V / avg. 35 mA"],
        ["Sleep current", "12 V / avg. 10 mA"],
      ]],
      ["Interfaces", [
        ["Digital inputs", "1 × door sensor, 1 × ignition detection"],
        ["Digital output", "1 × fuel cut-off"],
        ["LED indicators", "GSM, GPS, charging"],
        ["Firmware update", "OTA & UART"],
        ["Certifications", "CE, RoHS, FCC, UKCA, ISED"],
      ]],
    ],
    docs: [
      ["Catalogue (PDF)", "https://micodus.com/UpLoad/Files/202604/bda3p3bbsxkw.pdf"],
      ["User guide (PDF)", "https://micodus.com/UpLoad/Files/202604/bda28qvbyjuo.pdf"],
    ],
  },
  {
    id: "ml920g",
    name: "MiCODUS ML920G",
    tagline: "Magnetic · 4G LTE · 20,000 mAh",
    price: 1699, // TODO: confirm your price
    oldPrice: 2199,
    featured: true,
    images: gallery("ml920g", 5),
    specs: [
      "Up to 120 days standby (20,000 mAh)",
      "4G LTE network",
      "Teardown, movement & overspeed alerts",
      "IP65 waterproof, strong magnet, no wiring",
    ],
    intro:
      "A 20,000 mAh battery gives the ML920G months of standby — far beyond typical trackers. Its very strong magnet mounts it on any metal surface without tools, and IP65 waterproofing makes it at home outdoors. Real-time 4G LTE tracking, geofencing, vibration and teardown alarms make it ideal for cars, trailers, equipment and fleets.",
    features: [
      ["20,000 mAh battery", "25–30 days in tracking mode and up to 120 days in standby."],
      ["Strong magnet", "Sticks to any metal surface — no drilling, no wiring, no installer."],
      ["4G LTE", "Fast, reliable connection on modern networks, with 2G fallback."],
      ["IP65 waterproof", "Resists splashes and dust, so it can be mounted outside the cabin."],
      ["Teardown alarm", "Alerts you if someone removes or opens the tracker."],
      ["Movement, vibration & overspeed alarms", "Know immediately when something unusual happens."],
      ["Voice monitoring", "Listen to the surroundings remotely (where permitted by law)."],
      ["Type-C charging", "Recharges through a standard USB Type-C cable."],
    ],
    specGroups: [
      ["General", [
        ["Model", "ML920G"],
        ["Dimensions", "115 × 65 × 47 mm"],
        ["Weight", "467 g"],
        ["Working temperature", "-20 °C – 60 °C"],
        ["Working humidity", "10 % – 85 % RH"],
        ["Waterproof", "IP65"],
        ["Offline memory", "3,000 GPS points stored when there is no network"],
      ]],
      ["Positioning", [
        ["Positioning type", "GPS + GLONASS + BDS + AGPS"],
        ["Accuracy", "GNSS < 5 m (open sky) · LBS 100–2000 m"],
        ["Hot / warm / cold start", "< 3 s / < 35 s / < 45 s (open sky)"],
        ["Tracking sensitivity", "-162 dBm"],
      ]],
      ["Network", [
        ["Technology", "4G LTE Cat 1 + 2G GSM"],
        ["Frequencies", "Depends on version (EU / SA / Global)"],
        ["SIM card", "Standard SIM"],
      ]],
      ["Power", [
        ["Battery", "3.7 V 20,000 mAh Li-ion polymer"],
        ["Charging", "USB Type-C, about 15 hours"],
        ["Standby — tracking mode", "About 25–30 days"],
        ["Standby — power saving", "About 60 days"],
        ["Standby — hibernate", "About 120 days"],
      ]],
      ["Other", [
        ["LED indicators", "GSM, GPS, charging"],
        ["Firmware update", "OTA & UART"],
        ["Certifications", "CE, RoHS, FCC, UKCA, ISED"],
      ]],
    ],
    docs: [
      ["Catalogue (PDF)", "https://micodus.com/UpLoad/Files/202604/bda3sm8h2jgg.pdf"],
      ["User guide (PDF)", "https://micodus.com/UpLoad/Files/202604/bda29yozttz4.pdf"],
    ],
  },
  {
    id: "ml150",
    name: "MiCODUS ML150",
    tagline: "Magnetic · 2G · mini size",
    price: null, // TODO: set your price
    oldPrice: null,
    images: gallery("ml150", 4),
    specs: [
      "Up to 18 days standby (1,500 mAh)",
      "Remote voice monitoring",
      "Strong magnet, no wiring or drilling",
      "IP65 splash & dust proof",
    ],
    intro:
      "The ML150 is an ultra-compact tracker for vehicles, cargo and valuables. Its built-in magnet attaches in seconds to any metal surface for discreet, hidden installation. Small enough to hide almost anywhere, it gives you flexible, covert monitoring for personal or professional use.",
    features: [
      ["Mini size", "Only 36 × 23 × 54 mm — easy to hide anywhere."],
      ["Strong magnet", "Attach and remove in seconds, no drilling or wiring."],
      ["Voice monitoring", "Listen to the surroundings remotely (where permitted by law)."],
      ["IP65 waterproof", "Resists splashes and dust."],
      ["Movement & vibration alarms", "Instant alert the moment your parked car moves."],
      ["Geofence & overspeed", "Alerts when the car leaves a zone or drives too fast."],
      ["Low-battery alarm", "Reminds you to recharge before tracking stops."],
      ["180-day route replay", "Replay every trip from the last six months."],
    ],
    specGroups: [
      ["General", [
        ["Model", "ML150"],
        ["Dimensions", "36 × 23 × 54 mm"],
        ["Weight", "58.4 g"],
        ["Working temperature", "-20 °C – 75 °C"],
        ["Working humidity", "10 % – 85 % RH"],
        ["Waterproof", "IP65"],
        ["Offline memory", "320 GPS points stored when there is no network"],
      ]],
      ["Positioning", [
        ["Positioning type", "GPS + BeiDou + LBS + AGPS"],
        ["Accuracy", "GNSS < 5 m (open sky) · LBS 100–2000 m"],
        ["Hot / cold start", "≤ 1 s / ≤ 32 s"],
        ["GPS channels", "64"],
        ["Tracking sensitivity", "-162 dBm"],
      ]],
      ["Network", [
        ["Technology", "2G GSM"],
        ["Frequencies", "GSM 850 / 900 / 1800 / 1900 MHz"],
        ["SIM card", "Nano SIM"],
      ]],
      ["Power", [
        ["Battery", "3.7 V 1,500 mAh Li-polymer"],
        ["Charging", "USB, about 2 hours"],
        ["Standby — tracking mode", "About 3–5 days"],
        ["Standby — power saving", "About 6–8 days"],
        ["Standby — hibernate", "About 12–18 days"],
      ]],
      ["Other", [
        ["LED indicators", "GSM, GPS, charging"],
        ["Firmware update", "OTA & UART"],
        ["Certifications", "CE, RoHS, FCC, UKCA, ISED"],
      ]],
    ],
    docs: [
      ["Catalogue (PDF)", "https://micodus.com/UpLoad/Files/202604/bda3t6d542rk.pdf"],
      ["User guide (PDF)", "https://micodus.com/UpLoad/Files/202604/bda2a9x4efwg.pdf"],
    ],
  },
];

export const findProduct = (id) => PRODUCTS.find((p) => p.id === id);
