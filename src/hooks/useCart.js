import { useEffect, useMemo, useState } from "react";
import { findProduct } from "../config";

const STORAGE_KEY = "trackio-cart";

const load = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
};

/** Cart state: { [productId]: quantity }, persisted to localStorage. */
export function useCart() {
  const [cart, setCart] = useState(load);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const items = useMemo(
    () =>
      Object.entries(cart)
        .map(([id, qty]) => ({ product: findProduct(id), qty }))
        .filter((x) => x.product),
    [cart]
  );

  const count = items.reduce((sum, x) => sum + x.qty, 0);
  const total = items.reduce((sum, x) => sum + x.product.price * x.qty, 0);

  const changeQty = (id, delta) =>
    setCart((c) => {
      const next = { ...c, [id]: (c[id] || 0) + delta };
      if (next[id] <= 0) delete next[id];
      return next;
    });

  const add = (id) => changeQty(id, 1);
  const clear = () => setCart({});

  return { items, count, total, add, changeQty, clear };
}
