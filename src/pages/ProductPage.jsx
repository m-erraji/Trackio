import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BuyButton from "../components/BuyButton";
import Reveal from "../components/Reveal";
import WhatsAppLink from "../components/WhatsAppLink";
import { ProductCard } from "../components/Products";
import { Check, ShieldIcon } from "../components/icons";
import { useI18n } from "../i18n";

export function NotFound() {
  const { t, to } = useI18n();
  return (
    <section className="section">
      <div className="container notfound">
        <h1>{t.pdp.notFound}</h1>
        <p className="section__lead">{t.pdp.notFoundText}</p>
        <Link to={to("#products")} className="button">{t.pdp.seeAll}</Link>
      </div>
    </section>
  );
}

export default function ProductPage({ onAdd }) {
  const { id } = useParams();
  const { t, to, price, products, findProduct, dir } = useI18n();
  const d = t.pdp;
  const p = findProduct(id);
  const [active, setActive] = useState(0);
  const [showBar, setShowBar] = useState(false);
  const actionsRef = useRef(null);
  const touchX = useRef(null);

  // Reset the gallery and the tab title when switching product or language.
  useEffect(() => {
    setActive(0);
    if (p) document.title = `${p.name} — Trackio`;
    return () => {
      document.title = t.meta.title;
    };
  }, [id, p, t]);

  // Phones: show a sticky buy bar once the main buttons have scrolled out of view.
  useEffect(() => {
    const el = actionsRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setShowBar(!e.isIntersecting && e.boundingClientRect.top < 0));
    io.observe(el);
    return () => io.disconnect();
  }, [id]);
  useEffect(() => {
    document.documentElement.classList.toggle("has-buybar", showBar);
    return () => document.documentElement.classList.remove("has-buybar");
  }, [showBar]);

  if (!p) return <NotFound />;

  // Swipe left/right on the main photo (mirrored in Arabic).
  const count = p.images.length;
  const onTouchStart = (e) => (touchX.current = e.touches[0].clientX);
  const onTouchEnd = (e) => {
    if (touchX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) < 40 || count < 2) return;
    const step = (dx < 0 ? 1 : -1) * (dir === "rtl" ? -1 : 1);
    setActive((a) => (a + step + count) % count);
  };

  const others = products.filter((x) => x.id !== p.id);
  const discount = p.price != null && p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;

  return (
    <>
      {/* ---------- Top: gallery + buy box ---------- */}
      <section className="pdp">
        <div className="container">
          <nav className="breadcrumb" aria-label={d.breadcrumb}>
            <Link to={to()}>{d.home}</Link>
            <span>/</span>
            <Link to={to("#products")}>{d.trackers}</Link>
            <span>/</span>
            <span aria-current="page">{p.name}</span>
          </nav>

          <div className="pdp__grid">
            <div className="gallery anim-in-left">
              <div className="gallery__main" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
                {p.featured && <span className="product__tag">{t.products.popular}</span>}
                <img
                  key={active}
                  className="gallery__img"
                  src={p.images[active]}
                  alt={d.photo(p.name, active + 1)}
                  width="1000"
                  height="1000"
                  draggable="false"
                />
                {count > 1 && (
                  <div className="gallery__dots" aria-hidden="true">
                    {p.images.map((_, i) => (
                      <span key={i} className={i === active ? "active" : ""} />
                    ))}
                  </div>
                )}
              </div>
              {p.images.length > 1 && (
                <div className="gallery__thumbs">
                  {p.images.map((src, i) => (
                    <button
                      key={src}
                      className={`gallery__thumb${i === active ? " active" : ""}`}
                      onClick={() => setActive(i)}
                      aria-label={d.showPhoto(i + 1)}
                    >
                      <img src={src} alt="" loading="lazy" width="120" height="120" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="pdp__info stagger">
              <p className="eyebrow">
                <span></span> {d.eyebrow}
              </p>
              <h1 className="pdp__title">{p.name}</h1>
              <p className="pdp__tagline">{p.tagline}</p>

              <div className="pdp__price">
                <strong className="num">{p.price != null ? price(p.price) : d.priceOnRequest}</strong>
                {discount > 0 && (
                  <>
                    <s className="num">{price(p.oldPrice)}</s>
                    <span className="pdp__save" dir="ltr">-{discount}%</span>
                  </>
                )}
              </div>

              <p className="pdp__intro">{p.intro}</p>

              <ul className="product__specs pdp__highlights">
                {p.specs.map((s) => (
                  <li key={s}>
                    <Check />
                    {s}
                  </li>
                ))}
              </ul>

              <div className="pdp__actions" ref={actionsRef}>
                <BuyButton product={p} onAdd={onAdd} />
                <WhatsAppLink className="button button--outline" message={t.wa.question(p.name)}>
                  {d.ask}
                </WhatsAppLink>
              </div>

              <ul className="pdp__perks">
                {d.perks.map((perk) => (
                  <li key={perk}><ShieldIcon size={16} /> {perk}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Key features ---------- */}
      <section className="section section--alt">
        <div className="container">
          <Reveal className="section__head">
            <p className="eyebrow">
              <span></span> {d.featuresEyebrow}
            </p>
            <h2>{d.featuresTitle(p.name.replace("MiCODUS ", ""))}</h2>
          </Reveal>
          <ul className="pdp__features">
            {p.features.map(([title, text], i) => (
              <Reveal as="li" key={title} delay={(i % 2) * 90 + Math.floor(i / 2) * 60}>
                <span className="pdp__feature-icon"><Check size={16} /></span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- Technical sheet ---------- */}
      <section className="section">
        <div className="container pdp__specs-grid">
          <Reveal variant="left">
            <p className="eyebrow">
              <span></span> {d.specsEyebrow}
            </p>
            <h2>{d.specsTitle}</h2>
            <p className="section__lead">{d.specsLead}</p>
            {p.docs?.length > 0 && (
              <ul className="pdp__docs">
                {p.docs.map(([label, url]) => (
                  <li key={url}>
                    <a href={url} target="_blank" rel="noopener noreferrer">
                      ↓ {label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </Reveal>
          <div className="spec-table">
            {p.specGroups.map(([group, rows], i) => (
              <Reveal className="spec-group" key={group} delay={i * 60}>
                <h3>{group}</h3>
                <dl>
                  {rows.map(([label, value]) => (
                    <div key={label}>
                      <dt>{label}</dt>
                      {/* dir="auto": technical values like "-20 °C – 75 °C" stay in the right order in Arabic */}
                      <dd dir="auto">{value}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Other products ---------- */}
      {others.length > 0 && (
        <section className="section section--alt">
          <div className="container">
            <Reveal className="section__head">
              <p className="eyebrow">
                <span></span> {d.otherEyebrow}
              </p>
              <h2>{d.otherTitle}</h2>
            </Reveal>
            <ul className="products-grid products-grid--two">
              {others.map((o, i) => (
                <ProductCard key={o.id} product={o} onAdd={onAdd} delay={i * 110} />
              ))}
            </ul>
          </div>
        </section>
      )}
      {/* ---------- Sticky buy bar (phones) ---------- */}
      <div className={`buybar${showBar ? " show" : ""}`} aria-hidden={!showBar}>
        <img src={p.images[0]} alt="" width="44" height="44" />
        <div className="buybar__info">
          <strong>{p.name.replace("MiCODUS ", "")}</strong>
          <span className="num">{p.price != null ? price(p.price) : t.products.onRequest}</span>
        </div>
        <BuyButton product={p} onAdd={onAdd} className="button--small" />
      </div>
    </>
  );
}
