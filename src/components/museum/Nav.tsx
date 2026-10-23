import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const LINKS = [
  { label: "Art", href: "#art" },
  { label: "About", href: "#about" },
  { label: "Visit", href: "#visit" },
  { label: "Shop", href: "#collection" },
];

const EXHIBITS = [
  { title: "The Viking Voyage", href: "#", note: "Moving-image gallery" },
  { title: "The Three Graces", href: "#art", note: "Marble, Antonio Canova" },
  { title: "Napoleon", href: "#collection", note: "Marble bust" },
  { title: "Head of a Woman", href: "#collection", note: "Limestone" },
];

export function Nav() {
  const barRef = useRef<HTMLSpanElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  // The little dash under the active link slides to whatever is hovered.
  useGSAP(() => {
    const bar = barRef.current;
    const list = listRef.current;
    if (!bar || !list) return;
    const links = Array.from(list.querySelectorAll<HTMLAnchorElement>("a"));
    const active = links[0];
    if (!active) return;

    const moveTo = (el: HTMLElement, fade = false) => {
      gsap.to(bar, {
        x: el.offsetLeft + el.offsetWidth / 2 - bar.offsetWidth / 2,
        opacity: fade ? 0.35 : 1,
        duration: 0.45,
        ease: "power3.out",
      });
    };
    moveTo(active);
    const enter = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest("a");
      if (link) moveTo(link, true);
    };
    const leave = () => moveTo(active);
    list.addEventListener("mouseover", enter);
    list.addEventListener("mouseleave", leave);
    return () => {
      list.removeEventListener("mouseover", enter);
      list.removeEventListener("mouseleave", leave);
    };
  });

  useGSAP(() => {
    if (!overlayRef.current) return;
    if (searchOpen) {
      gsap.set(overlayRef.current, { display: "flex" });
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: "power2.out" }
      );
      gsap.fromTo(
        overlayRef.current.querySelector("input"),
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, delay: 0.08, ease: "power3.out" }
      );
    } else {
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => gsap.set(overlayRef.current, { display: "none" }),
      });
    }
  }, [searchOpen]);

  const results = EXHIBITS.filter((e) =>
    e.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 bg-gradient-to-b from-background via-background/80 to-transparent pb-6 pt-7">
        <nav className="mx-auto flex max-w-5xl items-center justify-center px-6">
          <ul
            ref={listRef}
            className="flex items-center gap-10 md:gap-16"
          >
            {LINKS.map((link, i) => (
              <li key={link.label} className="relative">
                <a
                  href={link.href}
                  className="font-body text-[11px] font-medium uppercase tracking-museum text-foreground/90 transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
                {i === 0 && (
                  <span
                    ref={barRef}
                    className="absolute -bottom-3 left-0 h-px w-6 bg-foreground"
                  />
                )}
              </li>
            ))}
            <li>
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="font-body text-[11px] font-medium uppercase tracking-museum text-foreground/90 transition-colors hover:text-foreground"
              >
                Search
              </button>
            </li>
          </ul>
        </nav>
      </header>

      <div
        ref={overlayRef}
        className="fixed inset-0 z-[65] hidden flex-col items-center justify-center bg-background/95 px-6 backdrop-blur-sm"
      >
        <button
          type="button"
          onClick={() => setSearchOpen(false)}
          aria-label="Close search"
          className="absolute right-8 top-8 text-2xl text-muted-foreground transition-colors hover:text-foreground"
        >
          ×
        </button>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search the collection…"
          className="w-full max-w-xl border-b border-border bg-transparent pb-4 text-center font-display text-3xl text-foreground outline-none placeholder:text-muted-foreground/50 md:text-4xl"
        />
        <ul className="mt-10 w-full max-w-xl space-y-1">
          {results.map((r) => (
            <li key={r.title}>
              <a
                href={r.href}
                onClick={() => setSearchOpen(false)}
                className="group flex items-baseline justify-between border-b border-border/60 py-3"
              >
                <span className="font-display text-xl text-foreground/90 transition-colors group-hover:text-foreground">
                  {r.title}
                </span>
                <span className="text-[10px] uppercase tracking-museum text-muted-foreground">
                  {r.note}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
