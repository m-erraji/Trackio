import Reveal from "./Reveal";
import WhatsAppLink from "./WhatsAppLink";
import { useI18n } from "../i18n";

export default function Faq() {
  const { t } = useI18n();
  const f = t.faq;
  return (
    <section className="section section--alt" id="faq">
      <div className="container faq__grid">
        <Reveal className="faq__intro" variant="left">
          <p className="eyebrow">
            <span></span> {f.eyebrow}
          </p>
          <h2>{f.title}</h2>
          <p className="section__lead">{f.lead}</p>
          <WhatsAppLink className="button button--outline">{f.cta}</WhatsAppLink>
        </Reveal>
        <div className="faq">
          {f.items.map(([q, a], i) => (
            <Reveal as="details" key={i} delay={i * 70}>
              <summary>
                {q} <span className="faq__plus">+</span>
              </summary>
              <p className="faq__answer">{a}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
