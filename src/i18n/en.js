/* English — reference translation. Every key here must exist in fr.js and ar.js.
   Product texts in English live in ../products.js (this file only overrides UI text). */
export default {
  meta: {
    title: "Trackio — GPS Trackers for Your Car",
    description:
      "Real-time GPS trackers for cars. Live location, anti-theft alerts, trip history and geofencing — all from your phone.",
  },
  currency: "MAD",
  currencyAfter: true,

  topbar: { support: "Support available 7 days a week, 9:00 – 21:00", delivery: "Free delivery · Cash on delivery" },
  nav: { features: "Features", products: "Trackers", how: "How it works", faq: "FAQ", contact: "Contact" },
  header: { shop: "Shop trackers", openCart: "Open cart", menu: "Toggle menu", language: "Language", home: "Trackio — home" },
  logoTagline: "GPS TRACKERS",

  hero: {
    eyebrow: "GPS TRACKING FOR CARS",
    title: "Your car, always in sight.",
    titleEm: "Peace of mind returns.",
    intro:
      "Compact GPS trackers with live location, instant theft alerts and full trip history — right on your phone. Magnetic models need no installation at all.",
    cta: "See the trackers",
    whatsapp: "WhatsApp",
    note: "1-year warranty · 30-day money back · SIM card included",
    discover: "Discover the features",
    live: "Live · 52 km/h",
    captionTag: "01 / LIVE TRACKING",
    caption: "Know where your car is, every ten seconds.",
    badgeTitle: "Anti-theft armed",
    badgeText: "Instant alert if your car moves",
  },

  features: {
    eyebrow: "FEATURES",
    title: "Protection starts with knowing where your car is.",
    lead: "Powerful tracking in a device smaller than your palm. Everything you need, in one simple app for iOS and Android.",
    items: [
      ["Real-time location", "See your car on the map with updates every 10 seconds, anywhere with mobile coverage."],
      ["Instant theft alerts", "A push notification the moment your parked car moves, or the device is unplugged."],
      ["Geofencing", "Draw safe zones around home or work and know when the car enters or leaves them."],
      ["Trip history", "Replay every trip with routes, stops, distance and speed — up to 6 months back."],
    ],
  },

  products: {
    eyebrow: "OUR TRACKERS",
    title: "For every car, the right tracker.",
    lead: "All devices include the Trackio app, a SIM card and the first month of service free. Pay cash on delivery.",
    popular: "MOST POPULAR",
    price: "PRICE",
    onRequest: "On request",
    addToCart: "Add to cart",
    askPrice: "Ask for the price",
    details: "View details",
    view: (name) => `View ${name}`,
  },

  approach: {
    eyebrow: "OUR APPROACH",
    title: "Simple technology, done properly.",
    lead: "We test every device before it ships and stay with you after the sale. No hidden fees, no complicated setup.",
    points: [
      "Every device tested before delivery",
      "Clear prices, no hidden subscription fees",
      "Remote fuel cut-off on the MV710N",
      "Real people answer on WhatsApp",
    ],
    cta: "Ask us a question",
    phone: { car: "My car", parked: "Parked", today: "Today", trips: "Trips", battery: "Battery", alert: "🔔 Geofence “Home” — car arrived 18:42" },
    seal: ["1 YEAR", "WARRANTY", "INCLUDED"],
  },

  how: {
    eyebrow: "HOW IT WORKS",
    title: "Simple, from order to first trip.",
    steps: [
      ["Order your tracker", "Pick the device that fits your car. We deliver it ready to use, SIM card inside. Pay on delivery."],
      ["Place or install it", "Stick a magnetic tracker anywhere in the car, or have the wired MV710N connected to the car's power."],
      ["Track from your phone", "Scan the QR code, open the app and see your car live on the map. That's it."],
    ],
  },

  faq: {
    eyebrow: "FAQ",
    title: "Simply put.",
    lead: "The questions we hear most. Something else on your mind? Write to us on WhatsApp.",
    cta: "Ask on WhatsApp",
    items: [
      ["Do I need a subscription?", "Each device includes a SIM card and the first month free. After that, a small monthly plan keeps the tracker connected. You can cancel anytime."],
      ["Is installation difficult?", "Not at all for the magnetic ML150 and ML920G: just stick them anywhere metal in the car, no wiring. The MV710N is wired to the car's 12V/24V power (plus optional door and fuel cut-off wires) — any auto electrician can install it quickly."],
      ["Will it drain my car battery?", "No. The magnetic ML150 and ML920G run on their own rechargeable batteries. The wired MV710N draws only about 10 mA when the car is parked."],
      ["Can I track more than one car?", "Yes. Add as many devices as you like to one account and see them all on the same map — ideal for families and fleets."],
      ["What if a thief finds the tracker?", "Our devices are small enough to hide almost anywhere. If a wired unit is disconnected, you get an instant alert with its last known location."],
    ],
  },

  contact: {
    eyebrow: "CONTACT",
    title: "Let's find the right tracker for you.",
    lead: "Tell us about your vehicle and we'll recommend the right device. We usually reply within a few hours.",
    hours: "Hours",
    hoursValue: "Every day, 9:00 – 21:00",
    phone: "Phone",
    email: "Email",
    delivery: "Delivery",
    deliveryValue: "Free, cash on delivery",
    call: "Call now",
    whatsapp: "WhatsApp",
  },

  footer: {
    tagline: "Smart GPS trackers that keep your car safe, wherever it goes.",
    support: "SUPPORT",
    hours: "Every day, 9:00 – 21:00",
    delivery: "Free delivery nationwide",
    rights: "All rights reserved.",
    legal: "Legal notice",
    chat: "Chat on WhatsApp",
  },

  cart: {
    title: "Your cart",
    label: "Shopping cart",
    close: "Close cart",
    empty: "Your cart is empty.",
    emptyHint: "Pick a tracker to get started.",
    total: "Total",
    checkout: "Checkout",
    decrease: "Decrease",
    increase: "Increase",
    added: (name) => `${name} added to cart`,
  },

  checkout: {
    eyebrow: "CHECKOUT",
    title: "Complete your order",
    lead: "Pay cash on delivery. We'll call you to confirm.",
    name: "Full name",
    phone: "Phone",
    city: "City",
    address: "Address",
    total: "Order total",
    submit: "Place order",
    close: "Close",
    thanks: (first) => `Thanks ${first}! We'll call you to confirm your order.`,
    message: (o, lines, total) =>
      `New order — Trackio\n\n${lines}\nTotal: ${total}\n\nName: ${o.name}\nPhone: ${o.phone}\nCity: ${o.city}\nAddress: ${o.address}`,
  },

  wa: {
    default: "Hello Trackio, I'd like some information about your GPS trackers.",
    price: (name) => `Hello Trackio, I'd like the price of the ${name}.`,
    question: (name) => `Hello Trackio, I have a question about the ${name}.`,
  },

  pdp: {
    home: "Home",
    trackers: "Trackers",
    breadcrumb: "Breadcrumb",
    eyebrow: "GPS TRACKER",
    priceOnRequest: "Price on request",
    ask: "Ask a question",
    perks: ["1-year warranty", "Free delivery · cash on delivery", "30-day money back"],
    photo: (name, n) => `${name} — photo ${n}`,
    showPhoto: (n) => `Show photo ${n}`,
    featuresEyebrow: "KEY FEATURES",
    featuresTitle: (model) => `What the ${model} does for you.`,
    specsEyebrow: "SPECIFICATIONS",
    specsTitle: "Technical sheet.",
    specsLead: "Official manufacturer specifications.",
    docLabels: ["Catalogue (PDF)", "User guide (PDF)"],
    otherEyebrow: "ALSO AVAILABLE",
    otherTitle: "Compare with our other trackers.",
    notFound: "Page not found",
    notFoundText: "This page doesn't exist or is no longer available.",
    seeAll: "See all trackers",
  },
};
