import { createFileRoute } from "@tanstack/react-router";
import { Cursor } from "@/components/museum/Cursor";
import { Nav } from "@/components/museum/Nav";
import { Hero } from "@/components/museum/Hero";
import { GracesIntro } from "@/components/museum/GracesIntro";
import { GracesTabs } from "@/components/museum/GracesTabs";
import { TheMaking } from "@/components/museum/TheMaking";
import { VisitSection } from "@/components/museum/VisitSection";
import { CollectionCards } from "@/components/museum/CollectionCards";
import { Footer } from "@/components/museum/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Hermitage Museum — The Viking Voyage",
      },
      {
        name: "description",
        content:
          "Step into the Hermitage after dark: the paper-cut epic The Viking Voyage screens in the moving-image gallery, beside Canova's marble Three Graces, Napoleon and the Head of a Woman.",
      },
      {
        property: "og:title",
        content: "Hermitage Museum — The Viking Voyage",
      },
      {
        property: "og:description",
        content:
          "A looping paper-cut animation, marble statues in raking light, and a night map of the museum district.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Hermitage Museum — The Viking Voyage" },
      {
        name: "twitter:description",
        content:
          "A looping paper-cut animation, marble statues in raking light, and a night map of the museum district.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative bg-background text-foreground">
      <Cursor />
      <Nav />
      <Hero />
      <GracesIntro />
      <GracesTabs />
      <TheMaking />
      <VisitSection />
      <CollectionCards />
      <Footer />
      <div className="grain" aria-hidden="true" />
    </main>
  );
}
