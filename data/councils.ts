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

  // -------------------------------------------------------------------------
  // VERIFIED RECORDS (added 2026-06-20).
  //
  // Each official URL below was checked via web research against the council's
  // own .gov.uk (or council-operated) domain. A `waitlist` figure is present
  // ONLY where the council's OWN published material (its allotments page, a
  // statutory report, or its open data) states it — quoted in the comment by
  // the figure. Councils whose figures appear only in blogs/press/third-party
  // FOI mirrors are recorded with the official link and NO number, per the
  // honesty rule. `seed` is omitted (false) on these checked records.
  // -------------------------------------------------------------------------

  // --- London ---
  {
    slug: "camden",
    name: "London Borough of Camden",
    shortName: "Camden",
    region: "London",
    officialUrl: "https://www.camden.gov.uk/allotments",
    howToApply:
      "Camden manages a small number of allotment sites; contact the parks team (parks@camden.gov.uk) about availability. Demand is very high and several site lists are closed.",
  },
  {
    slug: "islington",
    name: "London Borough of Islington",
    shortName: "Islington",
    region: "London",
    officialUrl:
      "https://www.islington.gov.uk/physical-activity-parks-and-trees/parks-and-green-space/gardening-and-greening/allotment-plots",
    howToApply:
      "The council owns plots at four sites and runs a single waiting list. The list is currently closed to new applicants and only reopens once it falls below 100 people.",
    siteCount: 4,
    // Council page: "There are 200 residents currently on the list and it will
    // open again after it drops to 100 people. This could take many years."
    waitlist: { peopleWaiting: 200 },
    waitlistSource:
      "https://www.islington.gov.uk/physical-activity-parks-and-trees/parks-and-green-space/gardening-and-greening/allotment-plots",
    waitlistVerifiedAt: "2026-06-20",
  },
  {
    slug: "hackney",
    name: "London Borough of Hackney",
    shortName: "Hackney",
    region: "London",
    officialUrl:
      "https://www.hackney.gov.uk/libraries-parks-and-leisure/parks-and-green-spaces/allotments-and-growing-foods",
    howToApply:
      "Hackney is the freeholder for nine allotment sites but does not run them day to day. Apply by contacting the Hackney Allotment Society, which holds the waiting lists.",
    siteCount: 9,
  },
  {
    slug: "lambeth",
    name: "London Borough of Lambeth",
    shortName: "Lambeth",
    region: "London",
    officialUrl:
      "https://www.lambeth.gov.uk/parks-sports-and-leisure/allotments/council-owned-allotments",
    howToApply:
      "Lambeth runs three council-owned allotment sites. There is no online form — contact the council about availability. The waiting list is currently closed.",
    siteCount: 3,
  },
  {
    slug: "southwark",
    name: "London Borough of Southwark",
    shortName: "Southwark",
    region: "London",
    officialUrl:
      "https://www.southwark.gov.uk/culture-and-sport/parks-and-open-spaces/allotments",
    howToApply:
      "Southwark's allotment sites are run by independent voluntary groups. Apply by contacting the organisation that manages your chosen site; most keep a waiting list and some are closed.",
    siteCount: 18,
    // Council page publishes per-site waits: most sites "5 years", Lamlash
    // Street "7 years", Lettsom "10 years" (some closed). Recorded as a 5–10
    // year range from the council's own published figures.
    waitlist: { typicalWaitYears: 5, typicalWaitYearsUpper: 10 },
    waitlistSource:
      "https://www.southwark.gov.uk/culture-and-sport/parks-and-open-spaces/allotments",
    waitlistVerifiedAt: "2026-06-20",
  },
  {
    slug: "tower-hamlets",
    name: "London Borough of Tower Hamlets",
    shortName: "Tower Hamlets",
    region: "London",
    officialUrl:
      "https://www.towerhamlets.gov.uk/lgnl/leisure_and_culture/parks_and_open_spaces/allotments_in_tower_hamlets.aspx",
    howToApply:
      "The council does not manage allotments directly. Apply by contacting one of the independent allotment societies listed on the council's page; some lists are closed due to high demand.",
  },
  {
    slug: "lewisham",
    name: "London Borough of Lewisham",
    shortName: "Lewisham",
    region: "London",
    officialUrl:
      "https://lewisham.gov.uk/myservices/environment/allotments/apply-for-an-allotment",
    howToApply:
      "Complete Lewisham's online application form and choose up to three sites. You must live in the borough and not already have an allotment in your household. All sites currently have waiting lists.",
    // Council "Allotment sites and waiting times" page (updated 11/06/2026)
    // lists per-site waits from "three years" up to "13 years".
    waitlist: { typicalWaitYears: 3, typicalWaitYearsUpper: 13 },
    waitlistSource:
      "https://lewisham.gov.uk/myservices/environment/allotments/allotment-waiting-times",
    waitlistVerifiedAt: "2026-06-20",
  },

  // --- South East ---
  {
    slug: "oxford",
    name: "Oxford City Council",
    shortName: "Oxford",
    region: "South East",
    officialUrl: "https://www.oxford.gov.uk/directory/2/allotments/category/5",
    howToApply:
      "Oxford's allotment sites are run with site associations rather than through a central application. Use the council's allotment directory to find and contact the site (or association) you want to join.",
    siteCount: 36,
  },
  {
    slug: "brighton-and-hove",
    name: "Brighton & Hove City Council",
    shortName: "Brighton & Hove",
    region: "South East",
    officialUrl:
      "https://www.brighton-hove.gov.uk/allotments/get-allotment/apply-allotment",
    howToApply:
      "Apply online to join the waiting list (a one-off admin fee applies). You must be 18 or over, live in Brighton & Hove, and not already hold an allotment, with limited exceptions.",
    // Council apply page: "The average wait for a plot is around 3 years."
    waitlist: { typicalWaitYears: 3 },
    waitlistSource:
      "https://www.brighton-hove.gov.uk/allotments/get-allotment/apply-allotment",
    waitlistVerifiedAt: "2026-06-20",
  },
  {
    slug: "reading",
    name: "Reading Borough Council",
    shortName: "Reading",
    region: "South East",
    officialUrl: "https://www.reading.gov.uk/leisure/outdoors/allotments/",
    howToApply:
      "Apply online through a Reading account, choosing up to three preferred sites. Priority goes first to residents in a site's local catchment, then other Reading residents, then non-residents.",
    siteCount: 20,
    // Council page publishes a per-site waiting-time table ranging from
    // 2 years (e.g. Meadway, Waterloo Meadows) to 12 years (Caversham Court).
    waitlist: { typicalWaitYears: 2, typicalWaitYearsUpper: 12 },
    waitlistSource: "https://www.reading.gov.uk/leisure/outdoors/allotments/",
    waitlistVerifiedAt: "2026-06-20",
  },
  {
    slug: "milton-keynes",
    name: "Milton Keynes City Council",
    shortName: "Milton Keynes",
    region: "South East",
    officialUrl:
      "https://www.milton-keynes.gov.uk/your-council-and-elections/councillors-and-committees/information-about-parish-town-and-community",
    howToApply:
      "Milton Keynes City Council does not manage allotments directly — they are run by parish, town and community councils. Apply to your local parish or town council, which you can find via the city council's directory.",
  },

  // --- South West ---
  {
    slug: "bristol",
    name: "Bristol City Council",
    shortName: "Bristol",
    region: "South West",
    officialUrl:
      "https://www.bristol.gov.uk/residents/museums-parks-sports-and-culture/allotments-and-gardens/apply-for-an-allotment",
    howToApply:
      "Use the council's Allotment Finder to see each site's waiting list and apply online. Demand is very high, so you can usually apply for a plot at one site only.",
  },

  // --- East of England ---
  {
    slug: "cambridge",
    name: "Cambridge City Council",
    shortName: "Cambridge",
    region: "East of England",
    officialUrl: "https://www.cambridge.gov.uk/applying-for-an-allotment-plot",
    howToApply:
      "Apply online and choose one site; you are then added to that site's waiting list. A couple of the most popular sites' lists are temporarily closed.",
    siteCount: 12,
    // Council apply page: shortest wait "about 12 months – at some sites it
    // could be three or more years." Recorded as a 1–3 year range.
    waitlist: { typicalWaitYears: 1, typicalWaitYearsUpper: 3 },
    waitlistSource: "https://www.cambridge.gov.uk/applying-for-an-allotment-plot",
    waitlistVerifiedAt: "2026-06-20",
  },

  // --- East Midlands ---
  {
    slug: "nottingham",
    name: "Nottingham City Council",
    shortName: "Nottingham",
    region: "East Midlands",
    officialUrl: "https://nottinghamcity.gov.uk/allotments",
    howToApply:
      "Apply online through the council's allotments booking system. One application per person covers the council's Direct Let, Association and Private sites.",
  },
  {
    slug: "leicester",
    name: "Leicester City Council",
    shortName: "Leicester",
    region: "East Midlands",
    officialUrl:
      "https://www.leicester.gov.uk/culture-and-sport/allotments-and-other-growing-spaces",
    howToApply:
      "Apply online through your Leicester account, or email allotments@leicester.gov.uk. You must live in Leicester and can join the waiting list for up to four sites at once.",
    siteCount: 40,
    // Sum of the per-site "people on waiting list" counts in the council's own
    // open-data dataset (records last updated 2024-11-26): 598 people.
    waitlist: { peopleWaiting: 598 },
    waitlistSource: "https://data.leicester.gov.uk/explore/dataset/allotments-waiting-list/",
    waitlistVerifiedAt: "2026-06-20",
  },

  // --- West Midlands ---
  // (Birmingham & Solihull already present as seed records above.)

  // --- Yorkshire & the Humber ---
  {
    slug: "leeds",
    name: "Leeds City Council",
    shortName: "Leeds",
    region: "Yorkshire & the Humber",
    officialUrl:
      "https://www.leeds.gov.uk/parks-and-countryside/grow-your-own/allotments",
    howToApply:
      "There are usually no vacant plots, so join the waiting list by emailing allotments@leeds.gov.uk for your preferred site.",
    siteCount: 101,
  },
  {
    slug: "sheffield",
    name: "Sheffield City Council",
    shortName: "Sheffield",
    region: "Yorkshire & the Humber",
    officialUrl:
      "https://www.sheffield.gov.uk/parks-sport-recreation/allotments/allotment-information",
    howToApply:
      "Apply online through the council's allotment portal. You may apply for one site only, and many waiting lists are currently longer than usual.",
  },
  {
    slug: "bradford",
    name: "City of Bradford Metropolitan District Council",
    shortName: "Bradford",
    region: "Yorkshire & the Humber",
    officialUrl:
      "https://www.bradford.gov.uk/your-community/allotments/apply-for-an-allotment-and-view-the-allotments-waiting-list/",
    howToApply:
      "Register for the council's online system to apply, then register interest for up to two sites. Households are limited to one plot, and some sites have long waiting lists.",
    siteCount: 29,
  },
  {
    slug: "wakefield",
    name: "Wakefield Metropolitan District Council",
    shortName: "Wakefield",
    region: "Yorkshire & the Humber",
    officialUrl:
      "https://www.wakefield.gov.uk/parks-countryside-and-outdoor-spaces/allotments/applying-for-an-allotment/",
    howToApply:
      "Apply online through the council's MyAccount system. You receive an application number and are dealt with in date order for your chosen site. The council notes you may wait a year or longer due to high demand.",
    siteCount: 60,
  },

  // --- North West ---
  {
    slug: "liverpool",
    name: "Liverpool City Council",
    shortName: "Liverpool",
    region: "North West",
    officialUrl: "https://liverpool.gov.uk/leisure-and-wellbeing/allotments/",
    howToApply:
      "Liverpool's allotments are run by individual allotment societies. Apply by contacting the site representative directly rather than through a central form; many lists are currently closed.",
    siteCount: 23,
  },

  // --- North East ---
  {
    slug: "newcastle-upon-tyne",
    name: "Newcastle upon Tyne City Council",
    shortName: "Newcastle",
    region: "North East",
    officialUrl: "https://new.newcastle.gov.uk/parks-and-allotments/allotments",
    howToApply:
      "The council manages allotments centrally. Submit the online application form to join the waiting list for your chosen site or sites; waiting times vary across the city.",
  },

  // --- Wales ---
  {
    slug: "cardiff",
    name: "Cardiff Council",
    shortName: "Cardiff",
    region: "Wales",
    officialUrl:
      "https://www.cardiff.gov.uk/ENG/resident/Leisure-parks-and-culture/Allotments/Pages/default.aspx",
    howToApply:
      "Register your interest online and choose up to two sites to join their waiting lists. When a plot comes up the site representative invites you to view it, then you sign a tenancy and pay a refundable gate-key deposit.",
    siteCount: 28,
  },

  // --- Scotland ---
  {
    slug: "city-of-edinburgh",
    name: "City of Edinburgh Council",
    shortName: "Edinburgh",
    region: "Scotland",
    officialUrl: "https://www.edinburghoutdoors.org.uk/allotments/rent-allotment",
    howToApply:
      "Complete the council's allotment application form with your preferred site(s) and plot size to join the waiting list. Demand far exceeds supply, so waits are long.",
    siteCount: 32,
    // City of Edinburgh Council statutory Annual Allotment Report 2021/22:
    // "the waiting list ... increased to 5,658 in November 2021 (352% of
    // allocation)." Point-in-time figure from the council's own report.
    waitlist: { peopleWaiting: 5658 },
    waitlistSource:
      "https://www.edinburghoutdoors.org.uk/downloads/file/18/the-city-of-edinburgh-council-annual-allotment-report-2021-22",
    waitlistVerifiedAt: "2026-06-20",
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

/** A council carries a verified, source-backed waiting-list figure. */
export function isVerified(c: Council): boolean {
  return Boolean(c.waitlist && !c.seed && c.waitlistSource && c.waitlistVerifiedAt);
}

/**
 * Short, human wait summary for a verified council, or null. Honest: never
 * invented — derived only from the stored, sourced figures.
 *  - "5–10 years" / "3 years" when year figures are known
 *  - "200 on the list" when only a headcount is known
 */
export function waitSummary(c: Council): string | null {
  if (!isVerified(c)) return null;
  const w = c.waitlist!;
  if (w.typicalWaitYears != null) {
    if (w.typicalWaitYearsUpper && w.typicalWaitYearsUpper !== w.typicalWaitYears) {
      return `${w.typicalWaitYears}–${w.typicalWaitYearsUpper} years`;
    }
    return `${w.typicalWaitYears} ${w.typicalWaitYears === 1 ? "year" : "years"}`;
  }
  if (w.peopleWaiting != null) {
    return `${w.peopleWaiting.toLocaleString("en-GB")} on the list`;
  }
  return null;
}

/** Dataset coverage stats for trust signals on the homepage. */
export function coverage() {
  const total = councils.length;
  const verified = councils.filter(isVerified).length;
  const activeRegions = regions.filter((r) => councilsByRegion(r).length > 0).length;
  return { total, verified, activeRegions };
}

export function slugifyRegion(region: Region): string {
  return region.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function regionFromSlug(slug: string): Region | undefined {
  return regions.find((r) => slugifyRegion(r) === slug);
}
