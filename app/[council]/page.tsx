import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  councils,
  getCouncil,
  isVerified,
  waitSummary,
  slugifyRegion,
} from "@/data/councils";
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
  const wait = isVerified(council) ? waitSummary(council) : null;
  const title = `${council.shortName} allotments: waiting list & how to apply`;
  const description = wait
    ? `${council.shortName} allotment waiting list: ${wait} (checked ${council.waitlistVerifiedAt}). How to apply with ${council.name} and the official page.`
    : `How to apply for an allotment with ${council.name}, the official page, and the published waiting-list signal for ${council.shortName}.`;
  return {
    title,
    description,
    alternates: { canonical: `/${council.slug}` },
    openGraph: { title: `${title} · PlotList`, description },
  };
}

export default async function CouncilPage({
  params,
}: {
  params: Promise<{ council: string }>;
}) {
  const { council: slug } = await params;
  const council = getCouncil(slug);
  if (!council) notFound();

  const verified = isVerified(council);
  const wait = verified ? waitSummary(council) : null;
  const w = council.waitlist;

  return (
    <article>
      <JsonLd data={councilJsonLd(council)} />
      <Breadcrumb
        items={[
          { name: "Home", path: "/" },
          { name: council.region, path: `/region/${slugifyRegion(council.region)}` },
          { name: council.shortName, path: `/${council.slug}` },
        ]}
      />

      <h1>{council.shortName} allotments</h1>
      <p className="lede">
        How to apply for an allotment with {council.name}, and what we know about
        the waiting list.
      </p>

      <div className={`answer ${verified ? "answer-known" : "answer-unknown"}`}>
        <h2 className="answer-q">How long is the wait in {council.shortName}?</h2>
        {verified && wait ? (
          <>
            <p className="answer-a">{wait}</p>
            <p className="answer-detail">
              {w?.typicalWaitYears != null && w?.peopleWaiting != null && (
                <>
                  About {w.peopleWaiting.toLocaleString("en-GB")} people are on
                  the list.{" "}
                </>
              )}
              {w?.typicalWaitYears == null && w?.peopleWaiting != null && (
                <>This is the number of people on the council&apos;s list. </>
              )}
              <a
                href={council.waitlistSource}
                rel="nofollow noopener"
                target="_blank"
              >
                Published by {council.name}
              </a>
              , checked {council.waitlistVerifiedAt}. Waits change — confirm on
              the council&apos;s own page before you rely on it.
            </p>
          </>
        ) : (
          <>
            <p className="answer-a answer-a-unknown">Not published here yet</p>
            <p className="answer-detail">
              {council.name} hasn&apos;t published a waiting-list figure we can
              verify, so we&apos;re not going to guess one. Check the current
              position directly on the council&apos;s page below — and we&apos;ll
              add a figure the moment there&apos;s a real source for it.
            </p>
          </>
        )}
      </div>

      <p className="cta-row">
        <a
          className="cta"
          href={council.officialUrl}
          rel="nofollow noopener"
          target="_blank"
        >
          Apply on {council.shortName}&apos;s official page →
        </a>
      </p>

      <h2>How to apply in {council.shortName}</h2>
      <p>{council.howToApply}</p>
      {council.siteCount != null && (
        <p className="note">
          {council.shortName} runs around {council.siteCount} allotment site
          {council.siteCount === 1 ? "" : "s"}.
        </p>
      )}

      <div className="panel">
        <h2 style={{ marginTop: 0 }}>The usual steps</h2>
        <p className="note" style={{ marginTop: 0 }}>
          Most UK councils follow a similar process. Always check the official
          page above for the exact rules where you live.
        </p>
        <ol className="steps">
          <li>
            Check you&apos;re eligible — usually you must live in the area and
            not already hold a plot in your household.
          </li>
          <li>
            Apply on the council&apos;s allotment page, choosing the sites
            nearest you (many councils let you join more than one list).
          </li>
          <li>
            You&apos;re added to the waiting list in date order; some sites
            close their list when it gets too long.
          </li>
          <li>
            When a plot comes up the council contacts you — so keep your details
            current, or you may be skipped.
          </li>
        </ol>
      </div>

      <h2>Tips while you wait</h2>
      <ul className="tips">
        <li>
          Apply for several nearby sites if the council allows it — shorter
          lists move faster.
        </li>
        <li>
          Keep your contact details current; many councils drop you from the
          list if they can&apos;t reach you.
        </li>
        <li>
          Ask about half-plots — they often come up sooner than full plots.
        </li>
        <li>
          Check whether a nearby parish, church or community garden runs its own
          plots outside the council system.
        </li>
      </ul>

      <p className="note disclaimer">
        PlotList is an independent directory and is not affiliated with{" "}
        {council.name}. Always confirm details on the official page.
      </p>
    </article>
  );
}
