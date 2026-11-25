import { Link } from "react-router-dom";
import WhatsAppLink from "./WhatsAppLink";
import { ArrowRight, ShieldIcon, WhatsAppIcon } from "./icons";
import { useI18n } from "../i18n";

export default function Hero() {
  const { t, to } = useI18n();
  const h = t.hero;
  return (
    <section className="hero">
      <div className="container hero__grid">
        <div className="hero__copy">
          <p className="eyebrow">
            <span></span> {h.eyebrow}
          </p>
          <h1>
            {h.title} <em>{h.titleEm}</em>
          </h1>
          <p className="hero__intro">{h.intro}</p>
          <div className="hero__actions">
            <Link to={to("#products")} className="button">
              {h.cta}
              <ArrowRight />
            </Link>
            <WhatsAppLink className="button button--outline">
              <WhatsAppIcon />
              {h.whatsapp}
            </WhatsAppLink>
          </div>
          <p className="hero__note">
            <ShieldIcon />
            {h.note}
          </p>
          <Link to={to("#features")} className="hero__discover">
            <span>↓</span> {h.discover}
          </Link>
        </div>

        <div className="hero__visual" aria-hidden="true">
          <svg className="hero__map" viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice">
            <defs>
              <pattern id="grid" width="34" height="34" patternUnits="userSpaceOnUse">
                <path d="M34 0H0V34" fill="none" stroke="#e6dfdd" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="400" height="500" fill="#f1ecea" />
            <rect width="400" height="500" fill="url(#grid)" />
            <rect x="230" y="250" width="140" height="90" rx="6" fill="#ecdfe0" />
            <rect x="24" y="60" width="70" height="150" rx="6" fill="#e8e0dc" />
            <rect x="250" y="40" width="110" height="70" rx="6" fill="#ecdfe0" />
            <path d="M0 330 Q120 300 190 190 T400 110" stroke="#faf9f6" strokeWidth="26" fill="none" />
            <path d="M120 0 V500" stroke="#faf9f6" strokeWidth="18" />
            <path d="M0 400 H400" stroke="#faf9f6" strokeWidth="14" />
            <path
              className="route"
              d="M50 440 C 110 410, 110 300, 175 260 S 280 170, 320 145"
              stroke="#7b1e2b"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="9 8"
            />
            <circle cx="50" cy="440" r="7" fill="#faf9f6" stroke="#2a2326" strokeWidth="3.5" />
            <circle className="pulse" cx="320" cy="145" r="24" fill="#2a2326" opacity=".18" />
            <circle cx="320" cy="145" r="10" fill="#2a2326" stroke="#faf9f6" strokeWidth="3" />
          </svg>
          <div className="hero__live">
            <i className="status-dot"></i> {h.live}
          </div>
          <div className="hero__image-caption">
            <span>{h.captionTag}</span>
            <p>{h.caption}</p>
          </div>
          <div className="hero__badge">
            <span className="hero__badge-icon">
              <ShieldIcon size={22} strokeWidth={1.8} check />
            </span>
            <div>
              <strong>{h.badgeTitle}</strong>
              <span>{h.badgeText}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
