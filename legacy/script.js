/* =========================================================
   Trackio — store logic
   Edit the settings and PRODUCTS below to change what you sell.
   ========================================================= */

const CURRENCY = "$";          // e.g. "MAD", "€", "$"
const CURRENCY_AFTER = false;  // true → "499 MAD", false → "$499"

// Your WhatsApp number in international format, digits only (e.g. "212600000000").
// Leave empty to disable WhatsApp links and order hand-off.
const WHATSAPP_NUMBER = "";

const PRODUCTS = [
  {
    id: "mini",
    name: "Trackio Mini",
    tagline: "Wireless · hide it anywhere",
    price: 49,
    oldPrice: 69,
    specs: ["Up to 60-day battery", "Magnetic waterproof case", "Live location & history", "Movement alerts"],
  },
  {
    id: "pro",
    name: "Trackio Pro",
    tagline: "Wired · maximum protection",
    price: 79,
    oldPrice: 109,
    featured: true,
    specs: ["Remote engine cut-off", "Power-disconnect alarm", "Geofencing & speed alerts", "4G LTE + backup battery"],
  },
  {
    id: "obd",
    name: "Trackio Plug",
    tagline: "OBD-II · plug & track",
    price: 59,
    oldPrice: null,
    specs: ["Installs in 10 seconds", "No wiring needed", "Driving behaviour reports", "Trip history 12 months"],
  },
];

/* ---------- Helpers ---------- */
const $ = (sel) => document.querySelector(sel);
const fmt = (n) => (CURRENCY_AFTER ? `${n} ${CURRENCY}` : `${CURRENCY}${n}`);
const waLink = (text = "") =>
  WHATSAPP_NUMBER ? `https://wa.me/${WHATSAPP_NUMBER}${text ? `?text=${encodeURIComponent(text)}` : ""}` : "#contact";

const CHECK = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m5 12 5 5L20 7"/></svg>`;

function deviceSVG() {
  return `
  <svg viewBox="0 0 120 120" aria-hidden="true">
    <rect x="22" y="32" width="76" height="58" rx="12" fill="#203b32"/>
    <rect x="28" y="38" width="64" height="46" rx="8" fill="#294539"/>
    <circle cx="60" cy="57" r="13" fill="#ddc49a" opacity=".2"/>
    <path d="M60 46a8.5 8.5 0 0 0-8.5 8.5c0 6.4 8.5 15 8.5 15s8.5-8.6 8.5-15A8.5 8.5 0 0 0 60 46zm0 11.6a3.1 3.1 0 1 1 0-6.2 3.1 3.1 0 0 1 0 6.2z" fill="#ddc49a"/>
    <circle cx="83" cy="76" r="2.8" fill="#b5cd9b"/>
    <rect x="35" y="75" width="18" height="2.5" rx="1.25" fill="#496050"/>
  </svg>`;
}

/* ---------- Render products ---------- */
function renderProducts() {
  $("#productsGrid").innerHTML = PRODUCTS.map(
    (p, i) => `
    <li class="product reveal ${p.featured ? "featured" : ""}">
      <div class="product__media">
        ${p.featured ? '<span class="product__tag">MOST POPULAR</span>' : ""}
        <span class="product__index">0${i + 1}</span>
        ${deviceSVG()}
      </div>
      <div class="product__body">
        <h3>${p.name}</h3>
        <p class="product__tagline">${p.tagline}</p>
        <ul class="product__specs">${p.specs.map((s) => `<li>${CHECK}${s}</li>`).join("")}</ul>
        <div class="product__price">
          <div><span>PRICE</span><strong class="num">${fmt(p.price)}</strong></div>
          ${p.oldPrice ? `<s class="num">${fmt(p.oldPrice)}</s>` : ""}
        </div>
        <button class="button ${p.featured ? "" : "button--outline"} btn-block" data-add="${p.id}">Add to cart</button>
      </div>
    </li>`
  ).join("");
}

/* ---------- Cart ---------- */
let cart = JSON.parse(localStorage.getItem("trackio-cart") || "{}");

const saveCart = () => localStorage.setItem("trackio-cart", JSON.stringify(cart));
const findProduct = (id) => PRODUCTS.find((x) => x.id === id);
const cartTotal = () =>
  Object.entries(cart).reduce((sum, [id, qty]) => {
    const p = findProduct(id);
    return p ? sum + p.price * qty : sum;
  }, 0);
const cartCount = () =>
  Object.entries(cart).reduce((a, [id, q]) => (findProduct(id) ? a + q : a), 0);

function renderCart() {
  const ids = Object.keys(cart).filter(findProduct);
  const body = $("#cartItems");

  body.innerHTML = ids.length
    ? ids.map((id) => {
        const p = findProduct(id);
        return `
        <div class="cart-item">
          <div class="cart-item__thumb">${deviceSVG()}</div>
          <div class="cart-item__info">
            <strong>${p.name}</strong>
            <span class="num">${fmt(p.price)}</span>
          </div>
          <div class="qty">
            <button data-dec="${id}" aria-label="Decrease">−</button>
            <span>${cart[id]}</span>
            <button data-inc="${id}" aria-label="Increase">+</button>
          </div>
        </div>`;
      }).join("")
    : `<div class="cart-empty">Your cart is empty.<br/>Pick a tracker to get started.</div>`;

  const count = cartCount();
  const badge = $("#cartCount");
  badge.textContent = count;
  badge.classList.toggle("show", count > 0);
  $("#cartTotal").textContent = fmt(cartTotal());
  $("#modalTotal").textContent = fmt(cartTotal());
  $("#checkoutBtn").disabled = count === 0;
}

function addToCart(id) {
  cart[id] = (cart[id] || 0) + 1;
  saveCart();
  renderCart();
  const badge = $("#cartCount");
  badge.classList.remove("bump");
  void badge.offsetWidth; // restart animation
  badge.classList.add("bump");
  toast(`${findProduct(id).name} added to cart`);
}

function changeQty(id, delta) {
  cart[id] = (cart[id] || 0) + delta;
  if (cart[id] <= 0) delete cart[id];
  saveCart();
  renderCart();
}

/* ---------- UI: drawer, modal, toast ---------- */
const openCart = () => { $("#cartDrawer").classList.add("open"); $("#overlay").classList.add("open"); };
const closeCart = () => { $("#cartDrawer").classList.remove("open"); $("#overlay").classList.remove("open"); };
const openModal = () => $("#checkoutModal").classList.add("open");
const closeModal = () => $("#checkoutModal").classList.remove("open");

let toastTimer;
function toast(msg) {
  const t = $("#toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 2600);
}

/* ---------- Events ---------- */
document.addEventListener("click", (e) => {
  const add = e.target.closest("[data-add]");
  const inc = e.target.closest("[data-inc]");
  const dec = e.target.closest("[data-dec]");
  if (add) addToCart(add.dataset.add);
  if (inc) changeQty(inc.dataset.inc, 1);
  if (dec) changeQty(dec.dataset.dec, -1);
});

$("#cartBtn").addEventListener("click", openCart);
$("#closeCart").addEventListener("click", closeCart);
$("#overlay").addEventListener("click", closeCart);
$("#checkoutBtn").addEventListener("click", () => {
  if (!cartCount()) return;
  closeCart();
  openModal();
});
$("#closeModal").addEventListener("click", closeModal);
$("#checkoutModal").addEventListener("click", (e) => { if (e.target.id === "checkoutModal") closeModal(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") { closeCart(); closeModal(); } });

$("#checkoutForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const order = {
    name: $("#oName").value.trim(),
    phone: $("#oPhone").value.trim(),
    city: $("#oCity").value.trim(),
    address: $("#oAddress").value.trim(),
    items: Object.entries(cart).filter(([id]) => findProduct(id)),
    total: cartTotal(),
  };

  if (WHATSAPP_NUMBER) {
    // Open WhatsApp with the order pre-filled.
    const lines = order.items.map(([id, q]) => `• ${q} × ${findProduct(id).name}`).join("\n");
    const msg = `New order — Trackio\n\n${lines}\nTotal: ${fmt(order.total)}\n\nName: ${order.name}\nPhone: ${order.phone}\nCity: ${order.city}\nAddress: ${order.address}`;
    window.open(waLink(msg), "_blank");
  } else {
    // TODO: set WHATSAPP_NUMBER above, or send `order` to your backend / email here.
    console.log("New order:", order);
  }

  cart = {};
  saveCart();
  renderCart();
  e.target.reset();
  closeModal();
  toast(`Thanks ${order.name.split(" ")[0]}! We'll call you to confirm your order.`);
});

/* WhatsApp links */
document.querySelectorAll("[data-whatsapp]").forEach((a) => {
  a.href = waLink("Hello Trackio, I'd like some information about your GPS trackers.");
  if (WHATSAPP_NUMBER) { a.target = "_blank"; a.rel = "noopener"; }
});
if (!WHATSAPP_NUMBER) document.querySelector(".wa-fab").href = "#contact";

/* Mobile menu */
const menuToggle = $("#menuToggle");
const navLinks = $("#navLinks");
menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("open");
  navLinks.classList.toggle("open");
});
navLinks.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    menuToggle.classList.remove("open");
    navLinks.classList.remove("open");
  })
);

/* Header border on scroll */
window.addEventListener("scroll", () => {
  $("#header").classList.toggle("scrolled", window.scrollY > 10);
}, { passive: true });

/* ---------- Init ---------- */
renderProducts();
renderCart();
$("#year").textContent = new Date().getFullYear();

/* Reveal on scroll */
document.querySelectorAll(".feature, .steps li, .section__head, .faq__intro, .approach__copy").forEach((el) => el.classList.add("reveal"));
const io = new IntersectionObserver(
  (entries) => entries.forEach((en) => {
    if (en.isIntersecting) { en.target.classList.add("visible"); io.unobserve(en.target); }
  }),
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
