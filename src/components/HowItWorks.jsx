import Reveal from "./Reveal";
import { useI18n } from "../i18n";

const svg = (children) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    {children}
  </svg>
);

// Icons in the same order as t.how.steps
const ICONS = [
  svg(<><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><path d="M3 6h18" /></>),
  svg(<><path d="M12 2v6M8 4v4M16 4v4" /><rect x="6" y="8" width="12" height="8" rx="2" /><path d="M12 16v6" /></>),
  svg(<><rect x="6" y="2" width="12" height="20" rx="2" /><path d="M11 18h2" /></>),
];

export default function HowItWorks() {
  const { t } = useI18n();
  return (
    <section className="section" id="how">
      <div className="container">
        <Reveal className="section__head">
          <p className="eyebrow">
            <span></span> {t.how.eyebrow}
          </p>
          <h2>{t.how.title}</h2>
        </Reveal>
        <ol className="steps">
          {t.how.steps.map(([title, text], i) => (
            <Reveal as="li" key={i} delay={i * 120}>
              <div className="step__top">
                <span className="step__num">{String(i + 1).padStart(2, "0")}</span>
                {ICONS[i]}
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
