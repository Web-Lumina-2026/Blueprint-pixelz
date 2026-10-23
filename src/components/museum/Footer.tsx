export function Footer() {
  return (
    <footer className="flex flex-col items-center gap-3 border-t border-border/60 px-6 py-14 text-center">
      <p className="font-display text-lg text-foreground/80">Hermitage Museum</p>
      <p className="text-[10px] uppercase tracking-museum text-muted-foreground">
        Palace Embankment — Saint Petersburg
      </p>
      <p className="mt-2 max-w-md text-xs leading-6 text-muted-foreground/70">
        Moving-image exhibit “The Viking Voyage” — paper-cut animation by
        Meneer Penninx. © 2026 Hermitage Museum.
      </p>
    </footer>
  );
}
