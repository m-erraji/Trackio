import { useState } from "react";
import { WHATSAPP_NUMBER, waLink } from "../config";
import { useI18n } from "../i18n";

const EMPTY = { name: "", phone: "", city: "", address: "" };
const FIELDS = [
  ["name", "text"],
  ["phone", "tel"],
  ["city", "text"],
  ["address", "text"],
];

export default function CheckoutModal({ open, cart, onClose, onPlaced }) {
  const { t, price } = useI18n();
  const c = t.checkout;
  const [form, setForm] = useState(EMPTY);

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    const order = {
      name: form.name.trim(),
      phone: form.phone.trim(),
      city: form.city.trim(),
      address: form.address.trim(),
      items: cart.items.map(({ product, qty }) => ({ id: product.id, name: product.name, qty })),
      total: cart.total,
    };

    if (WHATSAPP_NUMBER) {
      // Open WhatsApp with the order pre-filled, in the visitor's language.
      const lines = order.items.map((i) => `• ${i.qty} × ${i.name}`).join("\n");
      window.open(waLink(c.message(order, lines, price(order.total))), "_blank");
    } else {
      // TODO: set WHATSAPP_NUMBER in config.js, or send `order` to your backend / email here.
      console.log("New order:", order);
    }

    setForm(EMPTY);
    onPlaced(order);
  };

  return (
    <div
      className={`modal${open ? " open" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkoutTitle"
      aria-hidden={!open}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modal__card">
        <button className="icon-btn modal__close" aria-label={c.close} onClick={onClose}>
          ✕
        </button>
        <p className="eyebrow">
          <span></span> {c.eyebrow}
        </p>
        <h3 id="checkoutTitle">{c.title}</h3>
        <p className="muted">{c.lead}</p>
        <form onSubmit={submit}>
          {FIELDS.map(([key, type]) => (
            <div className="field" key={key}>
              <label htmlFor={`o-${key}`}>{c[key]}</label>
              <input
                id={`o-${key}`}
                type={type}
                dir={type === "tel" ? "ltr" : undefined}
                required
                value={form[key]}
                onChange={update(key)}
              />
            </div>
          ))}
          <div className="total-row">
            <span>{c.total}</span>
            <strong className="num">{price(cart.total)}</strong>
          </div>
          <button type="submit" className="button btn-block">
            {c.submit}
          </button>
        </form>
      </div>
    </div>
  );
}
