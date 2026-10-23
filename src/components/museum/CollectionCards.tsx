import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import napoleon from "@/assets/museum/napoleon.jpg";
import headWoman from "@/assets/museum/head-woman.jpg";

/** Previous / Next collection cards in museum green and terracotta orange. */
export function CollectionCards() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        "[data-reveal]",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: rootRef.current, start: "top 75%" },
        }
      );
    },
    { scope: rootRef }
  );

  return (
    <section
      id="collection"
      ref={rootRef}
      className="grid border-t border-border/60 md:grid-cols-2"
    >
      <a
        data-reveal
        href="#art"
        className="group relative block overflow-hidden bg-museum-green"
      >
        <img
          src={napoleon}
          alt="Napoleon — marble bust"
          loading="lazy"
          width={1024}
          height={1024}
          className="absolute inset-y-0 left-0 h-full w-1/2 object-cover opacity-90 transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="relative z-10 flex h-[420px] flex-col items-center justify-center md:h-[460px]">
          <div className="ml-auto mr-10 text-right md:mr-16">
            <p className="text-[10px] uppercase tracking-museum text-museum-green-foreground/70">
              Previous
            </p>
            <p className="mt-2 font-display text-3xl italic text-museum-green-foreground md:text-4xl">
              Napoleon
            </p>
            <span className="mt-4 inline-block text-2xl text-museum-green-foreground transition-transform duration-300 group-hover:-translate-x-2">
              ←
            </span>
          </div>
        </div>
      </a>

      <a
        data-reveal
        href="#art"
        className="group relative block overflow-hidden bg-museum-orange"
      >
        <img
          src={headWoman}
          alt="Head of a Woman — limestone sculpture"
          loading="lazy"
          width={1024}
          height={1024}
          className="absolute inset-y-0 right-0 h-full w-1/2 object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="relative z-10 flex h-[420px] flex-col items-center justify-center md:h-[460px]">
          <div className="mr-auto ml-10 text-left md:ml-16">
            <p className="text-[10px] uppercase tracking-museum text-museum-orange-foreground/70">
              Next
            </p>
            <p className="mt-2 font-display text-3xl italic text-museum-orange-foreground md:text-4xl">
              Head of a Woman
            </p>
            <span className="mt-4 inline-block text-2xl text-museum-orange-foreground transition-transform duration-300 group-hover:translate-x-2">
              →
            </span>
          </div>
        </div>
      </a>
    </section>
  );
}
