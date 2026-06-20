import Link from "next/link";
import { councils, regions, councilsByRegion } from "@/data/councils";
import { CouncilCard } from "@/components/CouncilCard";
import { site } from "@/lib/site";

export default function HomePage() {
  const activeRegions = regions.filter((r) => councilsByRegion(r).length > 0);

  return (
    <>
      <section className="hero">
        <h1>{site.tagline}</h1>
        <p className="lede">
          Allotment waiting lists in the UK can run from a couple of years to
          well over a decade — and every council runs its own system.
          PlotList points you straight to the official page, tells you how to
          get on the list, and shows the published wait where we have checked a
          real source.
        </p>
        <Link href="/about" className="cta">
          How PlotList works
        </Link>
      </section>

      <h2>Councils ({councils.length})</h2>
      <p className="note">
        Scaffold dataset — links go to genuine council allotment pages. We are
        adding councils and verified waiting-list figures region by region.
      </p>

      {activeRegions.map((region) => (
        <section key={region}>
          <h2>{region}</h2>
          <div className="grid">
            {councilsByRegion(region).map((c) => (
              <CouncilCard key={c.slug} council={c} />
            ))}
          </div>
        </section>
      ))}
    </>
  );
}
