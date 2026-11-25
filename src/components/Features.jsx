import Reveal from "./Reveal";
import { useI18n } from "../i18n";

const svg = (children) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    {children}
  </svg>
);

// Icons in the same order as t.features.items
const ICONS = [
  svg(<><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></>),
  svg(<><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.7 21a2 2 0 0 1-3.4 0" /></>),
  svg(<><circle cx="12" cy="12" r="9" strokeDasharray="3 3" /><circle cx="12" cy="12" r="3" /></>),
  svg(<><path d="M3 3v18h18" /><path d="m7 14 4-4 4 4 5-6" /></>),
];

export default function Features() {
  const { t } = useI18n();
  const f = t.features;
  return (
    <section className="section section--alt" id="features">
      <div className="container">
        <Reveal className="section__head section__head--split">
          <div>
            <p className="eyebrow">
              <span></span> {f.eyebrow}
            </p>
            <h2>{f.title}</h2>
          </div>
          <p className="section__lead">{f.lead}</p>
        </Reveal>

        <ul className="features-grid">
          {f.items.map(([title, text], i) => (
            <Reveal as="li" className="feature" key={i} delay={i * 90}>
              <div className="feature__top">
                <span className="feature__icon">{ICONS[i]}</span>
                <span className="feature__index">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
