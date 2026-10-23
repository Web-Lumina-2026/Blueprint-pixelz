import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import darkMap from "@/assets/museum/dark-map.jpg";

const HOURS = [
  ["10:00 — 18:00", ""],
  ["Wednesday: Closed", ""],
] as const;

const ADMISSION = [
  ["Adults: 12$", ""],
  ["Special: 5$", ""],
  ["Kids: Free", ""],
] as const;

/** Visit block — navy info panel beside the night map, per the reference. */
export function VisitSection() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        "[data-reveal]",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.09,
          ease: "power3.out",
          scrollTrigger: { trigger: rootRef.current, start: "top 65%" },
        }
      );
      gsap.fromTo(
        ".map-image",
        { scale: 1.1 },
        {
          scale: 1,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: { trigger: rootRef.current, start: "top 65%" },
        }
      );
    },
    { scope: rootRef }
  );

  return (
    <section
      id="visit"
      ref={rootRef}
      className="relative grid border-t border-border/60 md:grid-cols-2"
    >
      <div className="flex flex-col justify-center bg-visit px-8 py-20 text-visit-foreground md:px-16 md:py-28">
        <h2 data-reveal className="font-display text-4xl md:text-5xl">
          Hermitage Museum
        </h2>
        <span data-reveal className="mt-5 block h-px w-12 bg-visit-foreground/80" />

        <div data-reveal className="mt-10 grid max-w-md grid-cols-[9rem_1fr] gap-x-6 gap-y-2 text-sm">
          <span className="text-[11px] font-semibold uppercase tracking-museum">Opening Hours</span>
          <span className="leading-7">
            10:00 — 18:00
            <br />
            Wednesday: Closed
          </span>

          <span className="mt-4 text-[11px] font-semibold uppercase tracking-museum">General Admission</span>
          <span className="mt-4 leading-7">
            Adults: 12$
            <br />
            Special: 5$
            <br />
            Kids: Free
          </span>
        </div>
      </div>

      <div className="relative min-h-[45vh] overflow-hidden md:min-h-[70vh]">
        <img
          className="map-image size-full scale-110 object-cover"
          src={darkMap}
          alt="Night map — Riverside District"
          loading="lazy"
          width={1024}
          height={1024}
        />
        <button
          type="button"
          aria-label="Get directions"
          className="absolute left-0 top-1/2 z-10 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-visit text-xl text-visit-foreground shadow-lg transition-transform duration-300 hover:scale-110"
        >
          ↗
        </button>
      </div>
    </section>
  );
}
