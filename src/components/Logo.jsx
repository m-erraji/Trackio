import { Link } from "react-router-dom";
import { PinLogo } from "./icons";
import { useI18n } from "../i18n";

export default function Logo() {
  const { t, to } = useI18n();
  return (
    <Link to={to()} className="logo" aria-label={t.header.home}>
      <span className="logo__mark">
        <PinLogo />
      </span>
      <span className="logo__text">
        Trackio<span>{t.logoTagline}</span>
      </span>
    </Link>
  );
}
