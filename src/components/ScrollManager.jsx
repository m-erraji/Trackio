import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Scrolls to #section links after navigation, or to the top on a new page. */
export default function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }
    // Wait one frame so the target page has rendered.
    const id = requestAnimationFrame(() => document.querySelector(hash)?.scrollIntoView());
    return () => cancelAnimationFrame(id);
  }, [pathname, hash]);

  return null;
}
