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

/**
 * Generic, honest allotment FAQ — applies to UK allotments in general, NOT a
 * claim about any one council. Answers are factual process guidance plus an
 * explicit "waits vary, we never invent them" caveat that matches the site's
 * honesty model. The typical-wait context is attributed to a real public source
 * rather than guessed. FAQPage rich results were retired by Google in 2026, but
 * the markup still parses cleanly and is fed to generative answer engines at
 * query time, so it remains worth emitting (see research/seo-llm-proof/brief.md).
 *
 * Source for the wait-time context: the National Allotment Society (NSALG) and
 * the 2019 APPG for Gardening & Horticulture allotment research, which document
 * that UK allotment waiting lists vary enormously by area — from months to many
 * years — with no single national figure.
 */
export const allotmentFaqs: { q: string; a: string }[] = [
  {
    q: "How do I apply for an allotment in the UK?",
    a: "You apply through your local council's allotments service — most have an online form or a phone/email contact on their official allotments page. You usually need to live in the area, and you join a waiting list for the site(s) you choose. Many councils let you register interest in more than one site. PlotList links you straight to each council's official application page.",
  },
  {
    q: "How long is the typical wait for an allotment?",
    a: "There is no single national figure: UK allotment waiting lists vary enormously by area, from a few months in some places to many years in high-demand cities. Because waits are so local and change over time, PlotList never invents a number — we show a waiting-list figure only where a council has published one and we have checked that source, with the date we checked it. Always confirm the current position on the council's own page.",
  },
  {
    q: "What does an allotment cost?",
    a: "Rents are set by each council (or site association) and are typically modest — often a few tens of pounds per year for a standard plot, with concessions in many areas. The exact rent, plot sizes and any deposit are published on the council's allotments page, which PlotList links to.",
  },
  {
    q: "Can I apply for allotments in more than one area?",
    a: "Many councils let you join the waiting list for several of their own sites at once, which can shorten the wait. Some also accept applicants who live outside the area once local demand is met. The rules differ by council, so check the eligibility section on each official page.",
  },
  {
    q: "How can I get an allotment faster?",
    a: "Practical options people use: apply for several nearby sites if the council allows it (shorter lists move faster), ask about half-plots which often come up sooner than full plots, keep your contact details current so you aren't skipped when a plot is offered, and check whether a nearby parish, church or community garden runs plots outside the council system.",
  },
];

export function faqJsonLd(faqs: { q: string; a: string }[] = allotmentFaqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/**
 * Organization entity node for the brand — the top AEO priority: it makes
 * PlotList a resolvable, named entity answer engines can attribute facts to
 * (see research/seo-llm-proof/brief.md). `sameAs` should list PlotList's real
 * off-site profiles (LinkedIn / Crunchbase / Wikidata / etc.); those are
 * owner-gated and left as PLACEHOLDERS until Mike supplies real URLs. The array
 * is filtered to non-empty entries, so no empty/placeholder link ever ships.
 */
export const orgSameAs: string[] = [
  // PLACEHOLDERS — replace with PlotList's real profile URLs (owner-gated):
  // "https://www.linkedin.com/company/plotlist",
  // "https://www.crunchbase.com/organization/plotlist",
  // "https://www.wikidata.org/wiki/Qxxxxxxx",
];

export function organizationJsonLd() {
  const sameAs = orgSameAs.filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: absoluteUrl(),
    description: site.description,
    ...(sameAs.length ? { sameAs } : {}),
  };
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
