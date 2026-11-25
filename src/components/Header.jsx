import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";
import { BagIcon, PhoneIcon } from "./icons";
import { PHONE_DISPLAY, PHONE_TEL } from "../config";
import { LANGS, rememberLang, useI18n } from "../i18n";

/** Section links, shared by the header and the footer. */
export function useNav() {
  const { t, to } = useI18n();
  return [
    [to("#features"), t.nav.features],
    [to("#products"), t.nav.products],
    [to("#how"), t.nav.how],
    [to("#faq"), t.nav.faq],
    [to("#contact"), t.nav.contact],
  ];
}

export function TopBar() {
  const { t } = useI18n();
  return (
    <div className="topbar">
      <div className="container topbar__inner">
        <span>
          <i className="status-dot"></i> {t.topbar.support}
        </span>
        <span className="hide-mobile">{t.topbar.delivery}</span>
      </div>
    </div>
  );
}

/** FR · ع · EN — keeps the current page and section when switching. */
export function LangSwitch() {
  const { lang, t } = useI18n();
  const { pathname, hash } = useLocation();
  const rest = pathname.replace(/^\/[^/]+/, "");
  return (
    <div className="lang-switch" role="group" aria-label={t.header.language}>
      {Object.entries(LANGS).map(([code, L]) => (
        <Link
          key={code}
          to={`/${code}${rest}${hash}`}
          lang={code}
          hrefLang={code}
          title={L.name}
          aria-label={L.name}
          aria-current={code === lang ? "true" : undefined}
          className={`lang-switch__item${code === lang ? " active" : ""}`}
          onClick={() => rememberLang(code)}
        >
          {L.label}
        </Link>
      ))}
    </div>
  );
}

export default function Header({ cartCount, bumpKey, onOpenCart }) {
  const { t, to } = useI18n();
  const nav = useNav();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`header${scrolled ? " scrolled" : ""}`}>
      <div className="container header__inner">
        <Logo />

        <nav className={`nav${menuOpen ? " open" : ""}`}>
          {nav.map(([href, label]) => (
            <Link key={href} to={href} onClick={() => setMenuOpen(false)}>
              {label}
            </Link>
          ))}
        </nav>

        <div className="header__actions">
          <a href={`tel:${PHONE_TEL}`} className="header__phone hide-mobile">
            <PhoneIcon />
            <span className="num" dir="ltr">{PHONE_DISPLAY}</span>
          </a>
          <LangSwitch />
          <button className="cart-btn" aria-label={t.header.openCart} onClick={onOpenCart}>
            <BagIcon />
            {/* Changing `key` remounts the badge, restarting the bump animation. */}
            <span
              key={bumpKey}
              className={`cart-count${cartCount > 0 ? " show" : ""}${bumpKey > 0 ? " bump" : ""}`}
            >
              {cartCount}
            </span>
          </button>
          <Link to={to("#products")} className="button button--small hide-mobile">
            {t.header.shop}
          </Link>
          <button
            className={`menu-toggle${menuOpen ? " open" : ""}`}
            aria-label={t.header.menu}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
}
