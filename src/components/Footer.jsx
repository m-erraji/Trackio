import { Link } from "react-router-dom";
import Logo from "./Logo";
import Reveal from "./Reveal";
import WhatsAppLink from "./WhatsAppLink";
import { LangSwitch, useNav } from "./Header";
import { WhatsAppIcon } from "./icons";
import { useI18n } from "../i18n";

export default function Footer() {
  const { t } = useI18n();
  const nav = useNav();
  const f = t.footer;
  return (
    <>
      <footer className="footer">
        <div className="container footer__main">
          <Reveal className="footer__brand">
            <Logo />
            <p>{f.tagline}</p>
          </Reveal>
          <Reveal as="nav" className="footer__nav" delay={100}>
            {nav.map(([href, label]) => (
              <Link key={href} to={href}>
                {label}
              </Link>
            ))}
          </Reveal>
          <Reveal className="footer__hours" delay={200}>
            <span>{f.support}</span>
            <p>{f.hours}</p>
            <p>{f.delivery}</p>
          </Reveal>
        </div>
        <div className="container footer__bottom">
          <span>© {new Date().getFullYear()} Trackio. {f.rights}</span>
          <LangSwitch />
          <a href="#">{f.legal}</a>
        </div>
      </footer>

      <WhatsAppLink className="wa-fab" aria-label={f.chat}>
        <WhatsAppIcon size={24} />
      </WhatsAppLink>
    </>
  );
}
