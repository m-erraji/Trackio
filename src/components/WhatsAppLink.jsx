import { Link } from "react-router-dom";
import { WHATSAPP_NUMBER, waLink } from "../config";
import { useI18n } from "../i18n";

/** Opens WhatsApp with a pre-filled message, or scrolls to #contact when no number is configured. */
export default function WhatsAppLink({ children, message, ...rest }) {
  const { t, to } = useI18n();
  if (!WHATSAPP_NUMBER) {
    return (
      <Link to={to("#contact")} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <a href={waLink(message ?? t.wa.default)} target="_blank" rel="noopener" {...rest}>
      {children}
    </a>
  );
}
