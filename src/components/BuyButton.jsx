import WhatsAppLink from "./WhatsAppLink";
import { useI18n } from "../i18n";

/** "Add to cart" when the product has a price, otherwise "Ask for the price" on WhatsApp. */
export default function BuyButton({ product: p, onAdd, outline = false, className = "" }) {
  const { t } = useI18n();
  const cls = `button ${outline ? "button--outline" : ""} ${className}`.trim();
  return p.price != null ? (
    <button className={cls} onClick={() => onAdd(p.id)}>
      {t.products.addToCart}
    </button>
  ) : (
    <WhatsAppLink className={cls} message={t.wa.price(p.name)}>
      {t.products.askPrice}
    </WhatsAppLink>
  );
}
