import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import vikingVideo from "@/assets/viking-voyage.mp4.asset.json";
import vikingPoster from "@/assets/viking-poster.jpg.asset.json";

function SplitWord({ word }: { word: string }) {
  return (
    <span className="inline-block whitespace-nowrap">
      {word.split("").map((ch, i) => (
        <span key={i} className="hero-char inline-block will-change-transform">
          {ch}
        </span>
      ))}
    </span>
  );
}

/** Homepage hero — the paper-cut viking film loops behind the title. */
export function Hero() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        ".hero-video",
        { scale: 1.14 },
        { scale: 1, duration: 2.8, ease: "power2.out" },
        0
      )
        .fromTo(
          ".hero-pre",
          { opacity: 0, y: 26 },
          { opacity: 1, y: 0, duration: 0.9 },
          0.5
        )
        .fromTo(
          ".hero-char",
          { opacity: 0, yPercent: 90 },
          { opacity: 1, yPercent: 0, duration: 0.9, stagger: 0.035 },
          0.7
        )
        .fromTo(
          ".hero-dash",
          { scaleX: 0 },
          { scaleX: 1, duration: 0.7 },
          1.4
        )
        .fromTo(
          ".hero-copy",
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.9 },
          1.5
        )
        .fromTo(
          ".hero-scroll",
          { opacity: 0 },
          { opacity: 1, duration: 0.8 },
          1.9
        );

      // Breathing aura behind the title.
      gsap.to(".hero-aura", {
        scale: 1.08,
        opacity: 0.5,
        duration: 3.6,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
      gsap.to(".hero-scroll-line", {
        scaleY: 0.2,
        transformOrigin: "top",
        duration: 1.4,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
    },
    { scope: rootRef }
  );

  return (
    <section
      ref={rootRef}
      className="relative flex h-svh min-h-[640px] flex-col items-center justify-end overflow-hidden"
    >
      <video
        className="hero-video absolute inset-0 size-full object-cover"
        src={vikingVideo.url}
        poster={vikingPoster.url}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      />

      {/* Dark vignette so the serif type reads over the animation */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, var(--background) 0%, color-mix(in oklab, var(--background) 55%, transparent) 26%, transparent 55%), linear-gradient(to bottom, var(--background) 0%, transparent 30%)",
        }}
      />

      <div
        aria-hidden="true"
        className="hero-aura absolute bottom-24 left-1/2 h-72 w-[42rem] max-w-[90vw] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, var(--aura), transparent 70%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center px-6 pb-16 text-center">
        <span className="hero-pre font-display text-xl italic text-foreground/85 md:text-2xl">
          The
        </span>
        <h1 className="mt-2 font-display text-[13vw] font-medium leading-none text-foreground sm:text-6xl md:text-7xl lg:text-8xl">
          <span className="inline-block tracking-[0.18em]">
            <SplitWord word="VIKING" />
            <span className="hero-char inline-block">&nbsp;</span>
            <SplitWord word="VOYAGE" />
          </span>
        </h1>
        <span className="hero-dash mt-5 block h-px w-14 origin-center bg-foreground/70" />
        <p className="hero-copy mt-6 max-w-xl text-sm leading-7 text-muted-foreground md:text-[15px]">
          A paper-cut epic, screened nightly in the moving-image gallery. A
          longship of stubborn vikings crosses storm, sun and starlight — a
          handcrafted tale of wind, thunder and very small hats.
        </p>
      </div>

      <div className="hero-scroll relative z-10 flex flex-col items-center gap-2 pb-6">
        <span className="hero-scroll-line block h-10 w-px bg-foreground/50" />
      </div>
    </section>
  );
}
