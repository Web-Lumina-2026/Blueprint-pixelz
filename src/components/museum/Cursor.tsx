import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/** Soft round gallery cursor that trails the mouse and blooms over links. */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const dot = dotRef.current;
    if (!dot) return;
    if (window.matchMedia("(hover: none)").matches) return;

    gsap.set(dot, { xPercent: -50, yPercent: -50 });
    const xTo = gsap.quickTo(dot, "x", { duration: 0.45, ease: "power3" });
    const yTo = gsap.quickTo(dot, "y", { duration: 0.45, ease: "power3" });

    const move = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const interactive = (e.target as HTMLElement).closest(
        "a, button, input, [data-cursor]"
      );
      gsap.to(dot, {
        scale: interactive ? 2.1 : 1,
        opacity: interactive ? 0.55 : 0.9,
        duration: 0.35,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  });

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className="cursor-dot pointer-events-none fixed left-0 top-0 z-[70] size-8 rounded-full bg-foreground opacity-90 mix-blend-difference"
    />
  );
}
