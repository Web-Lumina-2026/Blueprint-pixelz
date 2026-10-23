import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import gracesFull from "@/assets/museum/graces-full.jpg";

/** Exhibit intro — "The Three Graces", copied from the reference film. */
export function GracesIntro() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        "[data-reveal-image]",
        { clipPath: "inset(0 0 100% 0)" },
        {
          clipPath: "inset(0 0 0% 0)",
          duration: 1.4,
          ease: "power3.inOut",
          scrollTrigger: { trigger: rootRef.current, start: "top 70%" },
        }
      );
      gsap.fromTo(
        "[data-reveal]",
        { opacity: 0, y: 34 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: rootRef.current, start: "top 60%" },
        }
      );
    },
    { scope: rootRef }
  );

  return (
    <section
      id="art"
      ref={rootRef}
      className="relative grid items-stretch gap-0 border-t border-border/60 md:grid-cols-2"
    >
      <div className="order-2 flex flex-col justify-center px-8 py-20 md:order-1 md:px-16 md:py-32">
        <p
          data-reveal
          className="text-[10px] uppercase tracking-museum text-muted-foreground"
        >
          Exhibit 01 — Marble
        </p>
        <h2
          data-reveal
          className="mt-4 font-display text-4xl leading-tight text-foreground md:text-5xl"
        >
          <span className="italic">The</span> Three Graces
        </h2>
        <span data-reveal className="mt-5 block h-px w-12 bg-foreground/70" />
        <p
          data-reveal
          className="mt-6 max-w-md text-sm leading-7 text-muted-foreground"
        >
          Antonio Canova's statue The Three Graces is a Neoclassical sculpture,
          in marble, of the mythological three charites, daughters of Zeus —
          identified on some engravings of the statue as, from left to right,
          Euphrosyne, Aglaea and Thalia — who were said to represent
          youth/beauty (Thalia), mirth (Euphrosyne), and elegance (Aglaea).
          The Graces presided over banquets and gatherings, to delight the
          guests of the gods.
        </p>
        <a
          data-reveal
          href="#about"
          className="group mt-8 inline-flex items-center gap-3 text-[11px] uppercase tracking-museum text-foreground/80 transition-colors hover:text-foreground"
        >
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
          Read more
        </a>
      </div>
      <div className="order-1 min-h-[60vh] overflow-hidden md:order-2 md:min-h-[85vh]">
        <img
          data-reveal-image
          src={gracesFull}
          alt="The Three Graces — marble sculpture group"
          loading="lazy"
          width={1008}
          height={1600}
          className="size-full object-cover"
        />
      </div>
    </section>
  );
}
