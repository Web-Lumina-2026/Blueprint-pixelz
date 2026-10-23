import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import gracesCloseup from "@/assets/museum/graces-closeup.jpg";

const GRACES = [
  {
    name: "Aglaea",
    text: "Aglaea is the Greek goddess of beauty, splendor, glory and magnificence. She is the youngest of the Charites or Graces, although Homer knew of a younger Charis or Grace named Pasithea (“Hallucination”). Aglaea is one of three daughters of Zeus and either the Oceanid Eurynome.",
  },
  {
    name: "Thalia",
    text: "Thalia was one of the three Graces (Charites) with her sisters Aglaea and Euphrosyne. They were usually found dancing in a circle. Thalia was the goddess of festivity. The Greek word thalia is an adjective applied to banquets, meaning rich, plentiful, luxuriant and abundant.",
  },
  {
    name: "Euphrosyne",
    text: "Euphrosyne is the goddess of good cheer, joy and mirth. Her name is the female version of the Greek word euphrosynos, meaning merriment. Together with her sisters she presided over banquets and gatherings, delighting the guests of the gods.",
  },
];

/** The three sisters — name tabs over a close-up, as in the reference film. */
export function GracesTabs() {
  const rootRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      gsap.fromTo(
        ".tabs-image",
        { opacity: 0, scale: 1.06 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: { trigger: rootRef.current, start: "top 65%" },
        }
      );
      gsap.fromTo(
        "[data-reveal]",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: rootRef.current, start: "top 60%" },
        }
      );
      // Gentle drift on the close-up while scrolling through the section.
      gsap.to(".tabs-image", {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: rootRef }
  );

  const choose = (i: number) => {
    if (i === active) return;
    setActive(i);
    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.55, ease: "power2.out" }
    );
  };

  return (
    <section
      ref={rootRef}
      className="relative overflow-hidden border-t border-border/60"
    >
      <div className="absolute inset-y-0 right-0 hidden w-1/2 overflow-hidden md:block">
        <img
          className="tabs-image size-full scale-105 object-cover"
          src={gracesCloseup}
          alt="Marble close-up of the Three Graces"
          loading="lazy"
          width={1600}
          height={1008}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, var(--background) 0%, color-mix(in oklab, var(--background) 45%, transparent) 35%, transparent 60%)",
          }}
        />
      </div>

      <div className="relative z-10 flex min-h-[80vh] max-w-2xl flex-col justify-center px-8 py-24 md:px-16">
        <div data-reveal className="flex items-baseline gap-6 md:gap-8">
          {GRACES.map((g, i) => (
            <button
              key={g.name}
              type="button"
              onClick={() => choose(i)}
              aria-pressed={i === active}
              className={`relative font-display text-2xl transition-colors duration-500 md:text-4xl ${
                i === active
                  ? "text-foreground"
                  : "text-muted-foreground/40 hover:text-muted-foreground/70"
              }`}
            >
              {g.name}
              <span
                className={`absolute -bottom-3 left-0 h-px bg-foreground transition-all duration-500 ${
                  i === active ? "w-8 opacity-90" : "w-0 opacity-0"
                }`}
              />
            </button>
          ))}
        </div>

        <p
          ref={textRef}
          className="mt-12 max-w-md text-sm leading-7 text-muted-foreground"
        >
          {GRACES[active].text}
        </p>

        <a
          data-reveal
          href="#about"
          className="group mt-8 inline-flex w-fit items-center gap-3 text-[11px] uppercase tracking-museum text-foreground/80 transition-colors hover:text-foreground"
        >
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
          Read more
        </a>
      </div>
    </section>
  );
}
