import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  regions,
  councilsByRegion,
  slugifyRegion,
  regionFromSlug,
  isVerified,
} from "@/data/councils";
import { CouncilCard } from "@/components/CouncilCard";
import { Breadcrumb } from "@/components/Breadcrumb";

export function generateStaticParams() {
  return regions
    .filter((r) => councilsByRegion(r).length > 0)
    .map((r) => ({ region: slugifyRegion(r) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ region: string }>;
}): Promise<Metadata> {
  const { region: slug } = await params;
  const region = regionFromSlug(slug);
  if (!region) return {};
  const count = councilsByRegion(region).length;
  const title = `${region} allotment waiting lists & how to apply`;
  const description = `Allotment waiting lists and how to apply across ${count} ${region} council${count === 1 ? "" : "s"}. Official council links and the published wait where we've checked a real source.`;
  return {
    title,
    description,
    alternates: { canonical: `/region/${slug}` },
    openGraph: { title: `${title} · PlotList`, description },
  };
}

export default async function RegionPage({
  params,
}: {
  params: Promise<{ region: string }>;
}) {
  const { region: slug } = await params;
  const region = regionFromSlug(slug);
  if (!region) notFound();

  const list = councilsByRegion(region);
  if (list.length === 0) notFound();

  const verifiedCount = list.filter(isVerified).length;

  return (
    <article>
      <Breadcrumb
        items={[
          { name: "Home", path: "/" },
          { name: region, path: `/region/${slug}` },
        ]}
      />

      <h1>Allotments in {region}</h1>
      <p className="lede">
        How to apply for an allotment across {list.length} {region} council
        {list.length === 1 ? "" : "s"}
        {verifiedCount > 0 ? (
          <>
            {" "}— including {verifiedCount} with a published waiting-list figure we&apos;ve checked
          </>
        ) : null}
        . Pick your council for the official page and the latest we know.
      </p>

      <div className="grid">
        {list.map((c) => (
          <CouncilCard key={c.slug} council={c} />
        ))}
      </div>

      <p className="note" style={{ marginTop: 28 }}>
        Don&apos;t see your council? We add areas as we verify real official
        links and figures — we never auto-generate empty pages.
      </p>
    </article>
  );
}
