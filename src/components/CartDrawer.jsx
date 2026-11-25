import { DeviceSVG } from "./icons";
import { useI18n } from "../i18n";

export default function CartDrawer({ open, cart, onClose, onCheckout }) {
  const { t, price, findProduct } = useI18n();
  const c = t.cart;
  return (
    <>
      <div className={`overlay${open ? " open" : ""}`} onClick={onClose}></div>
      <aside className={`drawer${open ? " open" : ""}`} aria-label={c.label} aria-hidden={!open}>
        <div className="drawer__head">
          <h3>{c.title}</h3>
          <button className="icon-btn" aria-label={c.close} onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="drawer__body">
          {cart.items.length ? (
            cart.items.map(({ product, qty }, i) => {
              const p = findProduct(product.id) || product;
              return (
                <div className="cart-item" key={p.id} style={{ "--i": i }}>
                  <div className="cart-item__thumb">
                    {p.images?.[0] ? <img src={p.images[0]} alt="" /> : <DeviceSVG />}
                  </div>
                  <div className="cart-item__info">
                    <strong>{p.name}</strong>
                    <span className="num">{price(p.price)}</span>
                  </div>
                  <div className="qty" dir="ltr">
                    <button aria-label={c.decrease} onClick={() => cart.changeQty(p.id, -1)}>
                      −
                    </button>
                    <span key={qty} className="qty__num">{qty}</span>
                    <button aria-label={c.increase} onClick={() => cart.changeQty(p.id, 1)}>
                      +
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="cart-empty">
              {c.empty}
              <br />
              {c.emptyHint}
            </div>
          )}
        </div>

        <div className="drawer__foot">
          <div className="total-row">
            <span>{c.total}</span>
            <strong key={cart.total} className="num total-pop">{price(cart.total)}</strong>
          </div>
          <button className="button btn-block" disabled={cart.count === 0} onClick={onCheckout}>
            {c.checkout}
          </button>
        </div>
      </aside>
    </>
  );
}
