import Reveal from "./Reveal";
import WhatsAppLink from "./WhatsAppLink";
import { Check } from "./icons";
import { useI18n } from "../i18n";

export default function Approach() {
  const { t } = useI18n();
  const a = t.approach;
  return (
    <section className="section approach">
      <div className="container approach__grid">
        <Reveal className="approach__visual" variant="left" aria-hidden="true">
          <div className="approach__phone">
            <div className="phone__screen">
              <div className="phone__row">
                <strong>{a.phone.car}</strong>
                <span className="phone__pill">
                  <i className="status-dot"></i> {a.phone.parked}
                </span>
              </div>
              <div className="phone__map">
                <svg viewBox="0 0 200 140">
                  <rect width="200" height="140" fill="#f1ecea" />
                  <path d="M0 100 Q80 90 110 50 T200 30" stroke="#faf9f6" strokeWidth="12" fill="none" />
                  <path d="M60 0V140" stroke="#faf9f6" strokeWidth="8" />
                  <circle cx="130" cy="44" r="16" fill="#2a2326" opacity=".15" />
                  <circle cx="130" cy="44" r="6" fill="#2a2326" />
                </svg>
              </div>
              <div className="phone__stats">
                <div><span>{a.phone.today}</span><strong>48 km</strong></div>
                <div><span>{a.phone.trips}</span><strong>6</strong></div>
                <div><span>{a.phone.battery}</span><strong>92%</strong></div>
              </div>
              <div className="phone__alert">{a.phone.alert}</div>
            </div>
          </div>
          <div className="approach__seal">
            <span>
              {a.seal[0]}<br />{a.seal[1]}<br />{a.seal[2]}
            </span>
          </div>
        </Reveal>

        <Reveal className="approach__copy" variant="right" delay={120}>
          <p className="eyebrow">
            <span></span> {a.eyebrow}
          </p>
          <h2>{a.title}</h2>
          <p className="section__lead">{a.lead}</p>
          <ul>
            {a.points.map((p) => (
              <li key={p}>
                <Check size={18} /> {p}
              </li>
            ))}
          </ul>
          <WhatsAppLink className="button">{a.cta}</WhatsAppLink>
        </Reveal>
      </div>
    </section>
  );
}
