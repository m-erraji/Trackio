import { useEffect, useRef, useState } from "react";

/**
 * Animates its element in when it scrolls into view.
 *   variant: "up" (default) | "left" | "right" | "zoom"
 *   delay:   ms — use index * 80 for a staggered list
 * Once the entrance has finished, the reveal classes are removed so the
 * element's own hover transitions work normally.
 */
export default function Reveal({ as: Tag = "div", className = "", variant = "up", delay = 0, style, children, ...rest }) {
  const ref = useRef(null);
  const [state, setState] = useState("hidden"); // hidden → visible → done

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState("visible");
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Fallback in case transitionend never fires (e.g. reduced motion).
  useEffect(() => {
    if (state !== "visible") return;
    const t = setTimeout(() => setState("done"), 900 + delay);
    return () => clearTimeout(t);
  }, [state, delay]);

  const onTransitionEnd = (e) => {
    if (e.target === e.currentTarget && e.propertyName === "opacity" && state === "visible") setState("done");
  };

  const revealCls =
    state === "done" ? "" : ` reveal reveal--${variant}${state === "visible" ? " visible" : ""}`;

  return (
    <Tag
      ref={ref}
      className={`${className}${revealCls}`.trim()}
      style={delay ? { ...style, "--delay": `${delay}ms` } : style}
      onTransitionEnd={onTransitionEnd}
      {...rest}
    >
      {children}
    </Tag>
  );
}
