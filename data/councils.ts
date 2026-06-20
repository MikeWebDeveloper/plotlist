/**
 * Council dataset for PlotList.
 *
 * Each record describes one UK local authority's allotment provision: how to
 * apply, where the official page is, and (where we have actually checked a real
 * public source) the published waiting-list signal.
 *
 * HONESTY NON-NEGOTIABLES (enforced at build time, see assertions below):
 *  - Every council carries `officialUrl` — the real council page we link to.
 *  - A `waitlist` figure may ONLY be present if `waitlistSource` (a real URL)
 *    and `waitlistVerifiedAt` (an ISO date we actually checked it) are present.
 *    No waiting-list number is ever invented. If we have not verified it, the
 *    field is omitted and the UI says "not published / check with the council".
 *  - `seed: true` marks a scaffold/sample record that must NOT be presented as
 *    verified data. Seed records never emit a waitlist number.
 *
 * Slugs are URLs once indexed — never rename, only add.
 */

export type Region =
  | "London"
  | "South East"
  | "South West"
  | "East of England"
  | "East Midlands"
  | "West Midlands"
  | "Yorkshire & the Humber"
  | "North West"
  | "North East"
  | "Wales"
  | "Scotland";

export interface Council {
  /** Stable URL slug, e.g. "manchester". Never rename. */
  slug: string;
  /** Display name, e.g. "Manchester City Council". */
  name: string;
  /** Short name used in copy, e.g. "Manchester". */
  shortName: string;
  region: Region;
  /** The real council allotments page we link people to. Required. */
  officialUrl: string;
  /** How to get on the list, in plain English. */
  howToApply: string;
  /** Number of council-managed allotment sites, if we have a real figure. */
  siteCount?: number;
  /**
   * Published waiting-list signal. ONLY set alongside a real source + date.
   * `typicalWaitYears` is what the council/official source states; if it gives
   * a range, store the lower and upper bounds. Never estimated by us.
   */
  waitlist?: {
    typicalWaitYears?: number;
    typicalWaitYearsUpper?: number;
    /** People on the list, if officially published. */
    peopleWaiting?: number;
  };
  /** Real URL backing the `waitlist` figures. Required if `waitlist` set. */
  waitlistSource?: string;
  /** ISO date (YYYY-MM-DD) we actually checked `waitlistSource`. Required if `waitlist` set. */
  waitlistVerifiedAt?: string;
  /** Scaffold/sample record — never presented as verified, never emits a waitlist. */
  seed?: boolean;
}

/**
 * SEED DATA — scaffold only.
 *
 * These records carry the REAL official allotment-page URLs (verified by web
 * search during scaffolding) so the links are genuine, but they are marked
 * `seed: true` and deliberately carry NO waiting-list numbers. A waiting-list
 * figure is only added once a human/agent has read a specific official source
 * and recorded `waitlistSource` + `waitlistVerifiedAt`. This keeps PlotList
 * honest from day one: we link you to the truth, we never fabricate the wait.
 */
export const councils: Council[] = [
  {
    slug: "manchester",
    name: "Manchester City Council",
    shortName: "Manchester",
    region: "North West",
    officialUrl: "https://www.manchester.gov.uk/info/200074/parks_and_open_spaces/2161/allotments",
    howToApply:
      "Apply online through the council's allotments service and join the waiting list for your preferred site. You can usually register interest in more than one site.",
    seed: true,
  },
  {
    slug: "birmingham",
    name: "Birmingham City Council",
    shortName: "Birmingham",
    region: "West Midlands",
    officialUrl: "https://www.birmingham.gov.uk/allotments",
    howToApply:
      "Register on Birmingham's allotments waiting list online and pick the sites nearest to you. The council contacts you when a plot becomes available.",
    seed: true,
  },
  {
    slug: "medway",
    name: "Medway Council",
    shortName: "Medway",
    region: "South East",
    officialUrl: "https://www.medway.gov.uk/info/200142/leisure_and_libraries/345/allotments",
    howToApply:
      "Medway has 28 allotment sites with over 1,000 plots. Apply online, add your name to the waiting list for sites with no current vacancies, and keep your contact details up to date.",
    siteCount: 28,
    seed: true,
  },
  {
    slug: "royal-greenwich",
    name: "Royal Borough of Greenwich",
    shortName: "Royal Greenwich",
    region: "London",
    officialUrl: "https://www.royalgreenwich.gov.uk/info/200227/allotments",
    howToApply:
      "Greenwich has 18 allotment sites across the borough. Find and apply for a plot online; where there are no vacancies you can join the waiting list.",
    siteCount: 18,
    seed: true,
  },
  {
    slug: "richmond-upon-thames",
    name: "London Borough of Richmond upon Thames",
    shortName: "Richmond upon Thames",
    region: "London",
    officialUrl: "https://www.richmond.gov.uk/services/parks_and_open_spaces/allotments/apply_for_an_allotment",
    howToApply:
      "Apply for an allotment online. Demand in Richmond is very high, so expect a long wait and apply for the sites closest to where you live.",
    seed: true,
  },
  {
    slug: "glasgow",
    name: "Glasgow City Council",
    shortName: "Glasgow",
    region: "Scotland",
    officialUrl: "https://www.glasgow.gov.uk/allotments",
    howToApply:
      "Apply through Glasgow's allotments service. Under Scotland's allotment legislation, councils must keep a waiting list and report on it.",
    seed: true,
  },
  {
    slug: "bath-and-north-east-somerset",
    name: "Bath & North East Somerset Council",
    shortName: "Bath & NE Somerset",
    region: "South West",
    officialUrl: "https://www.bathnes.gov.uk/apply-allotment",
    howToApply:
      "Apply for an allotment online through B&NES. Choose your preferred sites and join the waiting list where there are no current vacancies.",
    seed: true,
  },
  {
    slug: "tameside",
    name: "Tameside Metropolitan Borough Council",
    shortName: "Tameside",
    region: "North West",
    officialUrl: "https://www.tameside.gov.uk/allotments",
    howToApply:
      "Apply via Tameside's allotments page and join the waiting list for your nearest sites.",
    seed: true,
  },
  {
    slug: "solihull",
    name: "Solihull Metropolitan Borough Council",
    shortName: "Solihull",
    region: "West Midlands",
    officialUrl: "https://www.solihull.gov.uk/parks-and-open-spaces/allotments",
    howToApply:
      "Apply for a Solihull allotment online and add your name to the waiting list for sites near you.",
    seed: true,
  },
  {
    slug: "slough",
    name: "Slough Borough Council",
    shortName: "Slough",
    region: "South East",
    officialUrl: "https://www.slough.gov.uk/leisure-wellbeing-health/allotments/2",
    howToApply:
      "Apply through Slough Borough Council's allotments service and join the waiting list for your preferred site.",
    seed: true,
  },
];

export const regions: Region[] = [
  "London",
  "South East",
  "South West",
  "East of England",
  "East Midlands",
  "West Midlands",
  "Yorkshire & the Humber",
  "North West",
  "North East",
  "Wales",
  "Scotland",
];

// ---------------------------------------------------------------------------
// Build-time integrity checks. These run when the module is first imported
// (i.e. during `next build`). A violation throws and fails the build — this is
// how PlotList enforces its honesty rules in code, not just in prose.
// ---------------------------------------------------------------------------

const seenSlugs = new Set<string>();
for (const c of councils) {
  if (seenSlugs.has(c.slug)) {
    throw new Error(`[councils] duplicate slug: ${c.slug}`);
  }
  seenSlugs.add(c.slug);

  if (!/^[a-z0-9-]+$/.test(c.slug)) {
    throw new Error(`[councils] invalid slug (kebab-case only): ${c.slug}`);
  }
  if (!c.officialUrl || !/^https?:\/\//.test(c.officialUrl)) {
    throw new Error(`[councils] ${c.slug} missing a real officialUrl`);
  }
  if (!regions.includes(c.region)) {
    throw new Error(`[councils] ${c.slug} has unknown region: ${c.region}`);
  }

  // The core honesty rule: a waitlist figure requires a real source + date.
  if (c.waitlist) {
    if (c.seed) {
      throw new Error(
        `[councils] ${c.slug} is seed:true but carries a waitlist figure — seed records must not present waiting-list data as verified.`
      );
    }
    if (!c.waitlistSource || !/^https?:\/\//.test(c.waitlistSource)) {
      throw new Error(
        `[councils] ${c.slug} has a waitlist figure but no real waitlistSource URL.`
      );
    }
    if (!c.waitlistVerifiedAt || !/^\d{4}-\d{2}-\d{2}$/.test(c.waitlistVerifiedAt)) {
      throw new Error(
        `[councils] ${c.slug} has a waitlist figure but no waitlistVerifiedAt date (YYYY-MM-DD).`
      );
    }
  }
}

export function getCouncil(slug: string): Council | undefined {
  return councils.find((c) => c.slug === slug);
}

export function councilsByRegion(region: Region): Council[] {
  return councils
    .filter((c) => c.region === region)
    .sort((a, b) => a.name.localeCompare(b.name));
}

/** Whether we have any council with a verified waiting-list figure yet. */
export function hasVerifiedWaitlists(): boolean {
  return councils.some((c) => c.waitlist && !c.seed);
}
