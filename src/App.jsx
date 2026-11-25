import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation, useParams } from "react-router-dom";
import Header, { TopBar } from "./components/Header";
import Home from "./pages/Home";
import ProductPage, { NotFound } from "./pages/ProductPage";
import ScrollManager from "./components/ScrollManager";
import ScrollProgress from "./components/ScrollProgress";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import CheckoutModal from "./components/CheckoutModal";
import { useCart } from "./hooks/useCart";
import { useToast } from "./hooks/useToast";
import { I18nProvider, LANGS, detectLang, rememberLang, useI18n } from "./i18n";

/* URLs: /fr/…, /ar/…, /en/…  —  "/" and unprefixed URLs redirect to the visitor's language. */
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<ToPreferredLang />} />
      <Route path="/:lang/*" element={<LangGate />} />
    </Routes>
  );
}

function ToPreferredLang() {
  const { hash } = useLocation();
  return <Navigate to={`/${detectLang()}${hash}`} replace />;
}

function LangGate() {
  const { lang } = useParams();
  const { pathname, hash } = useLocation();
  // e.g. old link /products/ml150 → /fr/products/ml150
  if (!LANGS[lang]) return <Navigate to={`/${detectLang()}${pathname}${hash}`} replace />;
  return (
    <I18nProvider lang={lang}>
      <Shop />
    </I18nProvider>
  );
}

function Shop() {
  const { lang, dir, t, findProduct } = useI18n();
  const cart = useCart();
  const { pathname } = useLocation();
  const [toast, showToast] = useToast();
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [bumpKey, setBumpKey] = useState(0);

  // <html lang dir>, page title & description follow the language.
  useEffect(() => {
    const html = document.documentElement;
    html.lang = lang;
    html.dir = dir;
    document.title = t.meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", t.meta.description);
    rememberLang(lang);
  }, [lang, dir, t]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setCartOpen(false);
        setCheckoutOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const addToCart = (id) => {
    cart.add(id);
    setBumpKey((k) => k + 1);
    showToast(t.cart.added(findProduct(id).name));
  };

  const startCheckout = () => {
    if (!cart.count) return;
    setCartOpen(false);
    setCheckoutOpen(true);
  };

  const orderPlaced = (order) => {
    cart.clear();
    setCheckoutOpen(false);
    showToast(t.checkout.thanks(order.name.split(" ")[0]));
  };

  return (
    <>
      <ScrollManager />
      <ScrollProgress />
      <TopBar />
      <Header cartCount={cart.count} bumpKey={bumpKey} onOpenCart={() => setCartOpen(true)} />

      {/* key → the page fades in again on every route change */}
      <main key={pathname} className="page">
        <Routes>
          <Route index element={<Home onAdd={addToCart} />} />
          <Route path="products/:id" element={<ProductPage onAdd={addToCart} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />

      <CartDrawer open={cartOpen} cart={cart} onClose={() => setCartOpen(false)} onCheckout={startCheckout} />
      <CheckoutModal open={checkoutOpen} cart={cart} onClose={() => setCheckoutOpen(false)} onPlaced={orderPlaced} />

      <div className={`toast${toast.visible ? " show" : ""}`} role="status">
        {toast.message}
      </div>
    </>
  );
}
