# PlotList

> Find your allotment, skip the guesswork.

PlotList is a free, honest **UK allotment directory**. Over 100,000 people are on
allotment waiting lists, and every council runs its own system. For each local
authority, PlotList gives you the same three things:

- **Where the official page is** — a direct link to the council's allotment service.
- **How to apply** — the application/waiting-list process in plain English.
- **The published wait** — but *only* where we've checked a real source, with the date
  we checked it. We never invent a waiting time.

A project of [The Company](../../). Faceless, agent-built, organic distribution,
≤£50/mo to run (fully static Next.js + client-side).

## Why it exists

Allotment waiting times are the #1 thing people search for ("[council] allotment waiting
list", "find an allotment near me") — yet that data lives scattered across 300+ council
pages, plus one-off FOI blog posts from unrelated brands that are never maintained. No one
runs a living, per-council directory. PlotList fills that gap. See [`RESEARCH.md`](./RESEARCH.md)
for the full validation (including why we rejected golf tee-times, EV charging, a Stylish/MV3
extension, and Vinted tooling).

## Honesty model (enforced in code)

A waiting-list figure may only exist alongside a real source URL **and** a verified date.
The build fails otherwise — see the integrity checks in [`data/councils.ts`](./data/councils.ts)
and the tests in [`data/councils.test.ts`](./data/councils.test.ts). Scaffold (`seed`)
records carry genuine official links but never a fabricated wait. See [`CLAUDE.md`](./CLAUDE.md)
for the full non-negotiables.

## Project structure

```
app/
  layout.tsx              # shell, site-wide metadata + WebSite JSON-LD
  page.tsx                # home: councils grouped by region
  [council]/page.tsx      # one static page per council (the pSEO grid)
  about/page.tsx          # how we source data + honesty rules
  sitemap.ts robots.ts    # SEO plumbing (added up front)
  icon.svg                # favicon
  opengraph-image.tsx     # social card
data/
  councils.ts             # the dataset + build-time honesty checks
  councils.test.ts        # unit tests for the honesty rules
lib/  site.ts jsonld.tsx  # config + structured-data helpers
components/                # Breadcrumb, CouncilCard
```

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck  # tsc --noEmit
npm test           # node --test (honesty rules)
npm run build      # production build (runs integrity checks)
```

## Status

Scaffold + working MVP. 10 seed councils with **real** official links (no fabricated
waits). Next: verify and add real waiting-list figures council by council, expand the grid,
add region landing pages. Domain, going live, and monetisation are owner decisions for Mike.
