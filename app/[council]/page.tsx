import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { councils, getCouncil } from "@/data/councils";
import { Breadcrumb } from "@/components/Breadcrumb";
import { JsonLd, councilJsonLd } from "@/lib/jsonld";

export function generateStaticParams() {
  return councils.map((c) => ({ council: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ council: string }>;
}): Promise<Metadata> {
  const { council: slug } = await params;
  const council = getCouncil(slug);
  if (!council) return {};
  const title = `${council.shortName} allotments: waiting list & how to apply`;
  const description = `How to apply for an allotment with ${council.name}, where the official page is, and the published waiting-list signal for ${council.shortName}.`;
  return {
    title,
    description,
    alternates: { canonical: `/${council.slug}` },
    openGraph: { title: `${title} · PlotList`, description },
  };
}

function formatWait(council: NonNullable<ReturnType<typeof getCouncil>>) {
  const w = council.waitlist;
  if (!w?.typicalWaitYears) return null;
  if (w.typicalWaitYearsUpper && w.typicalWaitYearsUpper !== w.typicalWaitYears) {
    return `${w.typicalWaitYears}–${w.typicalWaitYearsUpper} years`;
  }
  return `${w.typicalWaitYears} years`;
}

export default async function CouncilPage({
  params,
}: {
  params: Promise<{ council: string }>;
}) {
  const { council: slug } = await params;
  const council = getCouncil(slug);
  if (!council) notFound();

  const verified = Boolean(council.waitlist && !council.seed);
  const wait = formatWait(council);

  return (
    <article>
      <JsonLd data={councilJsonLd(council)} />
      <Breadcrumb
        items={[
          { name: "Home", path: "/" },
          { name: council.shortName, path: `/${council.slug}` },
        ]}
      />

      <h1>{council.shortName} allotments</h1>
      <p className="lede">
        How to apply for an allotment with {council.name}, and what we know about
        the waiting list.
      </p>

      <div className="panel">
        <h2 style={{ marginTop: 0 }}>Waiting list</h2>
        {verified && wait ? (
          <>
            <p>
              <strong>Typical wait: {wait}.</strong>{" "}
              {council.waitlist?.peopleWaiting != null && (
                <>About {council.waitlist.peopleWaiting.toLocaleString("en-GB")} people on the list. </>
              )}
              <span className="badge verified">
                Verified {council.waitlistVerifiedAt}
              </span>
            </p>
            <p className="note">
              Source:{" "}
              <a href={council.waitlistSource} rel="nofollow noopener" target="_blank">
                official figure
              </a>
              . Waits change — confirm on the council&apos;s own page.
            </p>
          </>
        ) : (
          <p>
            <span className="badge unverified">Wait not published here yet</span>{" "}
            We haven&apos;t recorded a verified waiting-list figure for{" "}
            {council.shortName} yet, so we&apos;re not going to guess one. Check
            the current position directly on the council&apos;s page below.
          </p>
        )}
      </div>

      <h2>How to apply</h2>
      <p>{council.howToApply}</p>
      {council.siteCount != null && (
        <p className="note">{council.shortName} runs around {council.siteCount} allotment sites.</p>
      )}

      <p>
        <a className="cta" href={council.officialUrl} rel="nofollow noopener" target="_blank">
          Apply on {council.shortName}&apos;s official page →
        </a>
      </p>

      <h2>Tips while you wait</h2>
      <ul>
        <li>Apply for several nearby sites if the council allows it — shorter lists move faster.</li>
        <li>Keep your contact details current; many councils drop you from the list if they can&apos;t reach you.</li>
        <li>Ask about half-plots — they often come up sooner than full plots.</li>
        <li>Check whether a nearby parish, church or community garden runs its own plots outside the council system.</li>
      </ul>

      <p className="note">
        PlotList is an independent directory and is not affiliated with{" "}
        {council.name}. Always confirm details on the official page.
      </p>
    </article>
  );
}
