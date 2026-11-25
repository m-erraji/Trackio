import { Link } from "react-router-dom";
import Reveal from "./Reveal";
import BuyButton from "./BuyButton";
import { Check, DeviceSVG } from "./icons";
import { useI18n } from "../i18n";

export function ProductCard({ product: p, index, onAdd, delay = 0 }) {
  const { t, to, price } = useI18n();
  const url = to(`/products/${p.id}`);
  return (
    <Reveal as="li" className={`product${p.featured ? " featured" : ""}`} delay={delay}>
      <Link to={url} className="product__media" aria-label={t.products.view(p.name)}>
        {p.featured && <span className="product__tag">{t.products.popular}</span>}
        {index != null && <span className="product__index">{String(index + 1).padStart(2, "0")}</span>}
        {p.images?.length ? (
          <img className="product__img" src={p.images[0]} alt={p.name} loading="lazy" decoding="async" width="1000" height="1000" />
        ) : (
          <DeviceSVG />
        )}
      </Link>
      <div className="product__body">
        <h3>
          <Link to={url} className="product__name">{p.name}</Link>
        </h3>
        <p className="product__tagline">{p.tagline}</p>
        <ul className="product__specs">
          {p.specs.map((s) => (
            <li key={s}>
              <Check />
              {s}
            </li>
          ))}
        </ul>
        <div className="product__price">
          <div>
            <span>{t.products.price}</span>
            <strong className="num">{p.price != null ? price(p.price) : t.products.onRequest}</strong>
          </div>
          {p.price != null && p.oldPrice && <s className="num">{price(p.oldPrice)}</s>}
        </div>
        <div className="product__actions">
          <BuyButton product={p} onAdd={onAdd} outline={!p.featured} />
          <Link to={url} className="product__more">
            {t.products.details} <span className="arrow">→</span>
          </Link>
        </div>
      </div>
    </Reveal>
  );
}

export default function Products({ onAdd }) {
  const { t, products } = useI18n();
  const s = t.products;
  return (
    <section className="section" id="products">
      <div className="container">
        <Reveal className="section__head section__head--split">
          <div>
            <p className="eyebrow">
              <span></span> {s.eyebrow}
            </p>
            <h2>{s.title}</h2>
          </div>
          <p className="section__lead">{s.lead}</p>
        </Reveal>

        <ul className="products-grid">
          {products.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} onAdd={onAdd} delay={i * 110} />
          ))}
        </ul>
      </div>
    </section>
  );
}
