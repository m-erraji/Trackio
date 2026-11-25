import Reveal from "./Reveal";
import WhatsAppLink from "./WhatsAppLink";
import { EMAIL, PHONE_DISPLAY, PHONE_TEL } from "../config";
import { useI18n } from "../i18n";

export default function Contact() {
  const { t } = useI18n();
  const c = t.contact;
  return (
    <section className="section contact" id="contact">
      <div className="container contact__grid">
        <Reveal variant="left">
          <p className="eyebrow">
            <span></span> {c.eyebrow}
          </p>
          <h2>{c.title}</h2>
          <p className="contact__lead">{c.lead}</p>
        </Reveal>
        <Reveal className="contact__card" variant="zoom" delay={150}>
          <dl className="contact__list">
            <div><dt>{c.hours}</dt><dd>{c.hoursValue}</dd></div>
            <div><dt>{c.phone}</dt><dd className="num" dir="ltr">{PHONE_DISPLAY}</dd></div>
            <div><dt>{c.email}</dt><dd dir="ltr">{EMAIL}</dd></div>
            <div><dt>{c.delivery}</dt><dd>{c.deliveryValue}</dd></div>
          </dl>
          <div className="contact__actions">
            <a href={`tel:${PHONE_TEL}`} className="button button--gold">
              {c.call}
            </a>
            <WhatsAppLink className="button button--light-outline">{c.whatsapp}</WhatsAppLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
