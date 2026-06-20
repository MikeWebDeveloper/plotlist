import { type Council } from "@/data/councils";
import { absoluteUrl, site } from "@/lib/site";

/**
 * Structured data helpers.
 *
 * We only emit facts we actually hold. We never emit aggregateRating, review,
 * or a fabricated waiting time. GovernmentService is used per council because
 * the underlying thing is a real public service (the council's allotment
 * provision), which we link to.
 */

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    description: site.description,
    url: absoluteUrl(),
  };
}

export function councilJsonLd(council: Council) {
  const node: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "GovernmentService",
    name: `${council.shortName} allotments`,
    serviceType: "Allotment plots and waiting list",
    url: absoluteUrl(`/${council.slug}`),
    provider: {
      "@type": "GovernmentOrganization",
      name: council.name,
      url: council.officialUrl,
    },
    areaServed: council.shortName,
  };
  return node;
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
