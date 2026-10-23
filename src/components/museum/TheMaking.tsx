import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import makingDetail from "@/assets/museum/making-detail.jpg";

/** "The Making" — carving process block, mirrored from the reference film. */
export function TheMaking() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".making-image",
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
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
      gsap.to(".making-image", {
        yPercent: 8,
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

  return (
    <section
      id="about"
      ref={rootRef}
      className="relative grid items-stretch border-t border-border/60 md:grid-cols-2"
    >
      <div className="min-h-[60vh] overflow-hidden md:min-h-[80vh]">
        <img
          className="making-image size-full scale-105 object-cover"
          src={makingDetail}
          alt="Carved marble face in raking light"
          loading="lazy"
          width={1600}
          height={1008}
        />
      </div>
      <div className="flex flex-col justify-center px-8 py-20 md:px-16 md:py-32">
        <h2 data-reveal className="font-display text-4xl text-foreground md:text-5xl">
          The Making
        </h2>
        <span data-reveal className="mt-5 block h-px w-12 bg-foreground/70" />
        <p
          data-reveal
          className="mt-6 max-w-md text-sm leading-7 text-muted-foreground"
        >
          Canova's assistants roughly blocked out the marble, leaving Canova to
          perform the final carving and shape the stone to highlight the
          Graces' soft flesh. This was a trademark of the artist, and the piece
          shows a strong allegiance to the Neo-Classical movement in sculpture.
        </p>
        <a
          data-reveal
          href="#visit"
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
