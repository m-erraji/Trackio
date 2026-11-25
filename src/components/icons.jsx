/* Brand mark: white location pin with a "T" cut out, on a bordeaux tile.
   Keep in sync with the favicon in index.html. */
export const PinLogo = ({ size = 44 }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
    <rect width="40" height="40" rx="10" fill="var(--c-accent)" />
    <path d="M20 33s-9-8.2-9-15.5a9 9 0 0 1 18 0C29 24.8 20 33 20 33z" fill="#fff" />
    <path d="M15.6 12.6h8.8v3h-2.9V24h-3v-8.4h-2.9z" fill="var(--c-accent)" />
  </svg>
);

export const PhoneIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
  </svg>
);

export const BagIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
    <path d="M3 6h18" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);

export const ArrowRight = () => (
  <svg className="icon-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const WhatsAppIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.4-.5c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3zM12 21.8c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4A9.8 9.8 0 1 1 12 21.8zM12 0a12 12 0 0 0-10.3 18L0 24l6.2-1.6A12 12 0 1 0 12 0z" />
  </svg>
);

export const ShieldIcon = ({ size = 13, strokeWidth = 2, check = false }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    {check && <path d="m9 12 2 2 4-4" />}
  </svg>
);

export const Check = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="m5 12 5 5L20 7" />
  </svg>
);

export const DeviceSVG = () => (
  <svg viewBox="0 0 120 120" aria-hidden="true">
    <rect x="22" y="32" width="76" height="58" rx="12" fill="#2a2326" />
    <rect x="28" y="38" width="64" height="46" rx="8" fill="#3a3034" />
    <circle cx="60" cy="57" r="13" fill="#f0b4ba" opacity=".2" />
    <path d="M60 46a8.5 8.5 0 0 0-8.5 8.5c0 6.4 8.5 15 8.5 15s8.5-8.6 8.5-15A8.5 8.5 0 0 0 60 46zm0 11.6a3.1 3.1 0 1 1 0-6.2 3.1 3.1 0 0 1 0 6.2z" fill="#f0b4ba" />
    <circle cx="83" cy="76" r="2.8" fill="#e8798a" />
    <rect x="35" y="75" width="18" height="2.5" rx="1.25" fill="#56484d" />
  </svg>
);
