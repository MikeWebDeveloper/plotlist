import Link from "next/link";
import {
  councils,
  regions,
  councilsByRegion,
  coverage,
  isVerified,
  waitSummary,
  slugifyRegion,
} from "@/data/councils";
import { CouncilCard } from "@/components/CouncilCard";
import { site } from "@/lib/site";

export default function HomePage() {
  const activeRegions = regions.filter((r) => councilsByRegion(r).length > 0);
  const { total, verified, activeRegions: regionCount } = coverage();
  const withWait = councils.filter(isVerified);

  return (
    <>
      <section className="hero">
        <p className="eyebrow">UK allotment directory</p>
        <h1>{site.tagline}</h1>
        <p className="lede">
          Allotment waiting lists in the UK run from a couple of years to well
          over a decade, and every council runs its own system. PlotList points
          you straight to the official page, explains how to get on the list,
          and shows the published wait wherever we&apos;ve checked a real source.
        </p>

        <dl className="stats" aria-label="Directory coverage">
          <div>
            <dt>Councils</dt>
            <dd>{total}</dd>
          </div>
          <div>
            <dt>With a checked wait</dt>
            <dd>{verified}</dd>
          </div>
          <div>
            <dt>Regions</dt>
            <dd>{regionCount}</dd>
          </div>
        </dl>

        <p className="trust note">
          We never invent a waiting time. A figure appears only with a real,
          dated source — otherwise we say so and link you to the council.
        </p>
      </section>

      <section aria-labelledby="regions-h">
        <h2 id="regions-h">Browse by region</h2>
        <div className="region-grid">
          {activeRegions.map((region) => {
            const n = councilsByRegion(region).length;
            return (
              <Link
                key={region}
                href={`/region/${slugifyRegion(region)}`}
                className="region-link"
              >
                <span className="region-name">{region}</span>
                <span className="region-count">
                  {n} council{n === 1 ? "" : "s"}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {withWait.length > 0 && (
        <section aria-labelledby="wait-h">
          <h2 id="wait-h">Councils with a published wait we&apos;ve checked</h2>
          <p className="note">
            These figures come from the council&apos;s own page, report or open
            data — each links to the source on the council page.
          </p>
          <ul className="wait-table">
            {withWait
              .slice()
              .sort((a, b) => a.shortName.localeCompare(b.shortName))
              .map((c) => (
                <li key={c.slug}>
                  <Link href={`/${c.slug}`}>{c.shortName}</Link>
                  <span className="wait-region">{c.region}</span>
                  <span className="badge verified">{waitSummary(c)}</span>
                </li>
              ))}
          </ul>
        </section>
      )}

      <section aria-labelledby="all-h">
        <h2 id="all-h">All councils ({councils.length})</h2>
        {activeRegions.map((region) => (
          <div key={region} className="region-block">
            <h3>
              <Link href={`/region/${slugifyRegion(region)}`}>{region}</Link>
            </h3>
            <div className="grid">
              {councilsByRegion(region).map((c) => (
                <CouncilCard key={c.slug} council={c} />
              ))}
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
