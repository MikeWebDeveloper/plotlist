# PlotList — Project Rules (source of truth)

PlotList is a UK directory of **council allotment provision** — how to apply, the
official council page, and the published waiting-list signal, one page per local
authority. It is a project of The Company. Mike is the owner; the Director runs the
project and escalates owner decisions to Mike via the Chief of Staff.

Read this file first every session. The non-negotiables below are absolute and the
Director enforces them on all staff.

## What PlotList is

A programmatic (pSEO) directory: one statically-generated page per **council**, built
for organic discovery. Business model (owner decisions, not built yet): display ads once
traffic qualifies + gardening-supplier affiliate. Faceless and agent-buildable.

- **Council axis:** `data/councils.ts`. **Page:** `app/[council]/`.
- Every council carries the real `officialUrl` we link people to.

## Non-negotiables (enforce on all staff)

1. **Never invent a waiting time.** A `waitlist` figure may ONLY exist alongside a real
   `waitlistSource` (URL) and `waitlistVerifiedAt` (the ISO date we actually checked it).
   The build fails otherwise — integrity checks live in `data/councils.ts` and are tested
   in `data/councils.test.ts`. If we haven't verified a figure, the page says so plainly
   and links to the council. This is the whole reputation of the site.
2. **`seed: true` records present no verified data.** Scaffold records carry real official
   links but never a waiting-list number, and the UI shows a visible "how to apply" badge,
   not a "verified" one.
3. **Never fake reviews or ratings.** No `aggregateRating`/`review` JSON-LD or star
   ratings for a public service. We don't have them, so we don't emit them.
4. **Honest, accurate links.** `officialUrl` must be the genuine council allotment page.
   If a URL rots, fix it — don't link to a guess.
5. **Stable slugs.** Council slugs are URLs once indexed — never rename; only add. Deprecate
   carefully with redirects.
6. **Quality pSEO only.** Real official link + genuinely useful how-to-apply + tips on every
   page. Expand only to councils we can back with real data — no auto-spun empty pages.
7. **No spend, no domains, no outreach, no going live, no monetisation without Mike.**
   Owner decisions — escalate, don't act.

## SEO / GEO approach

- One indexable page per council with a unique `<title>` + meta description
  (`generateMetadata`), `GovernmentService` + `BreadcrumbList` JSON-LD (no ratings).
- Internal linking: home → region → council, and back. Breadcrumbs on every council page.
- Genuinely useful, non-spun copy: how to apply, site counts where known, honest tips.
- GEO: clear, factual, well-structured content + accurate structured data so answer engines
  can cite us — never fabricated facts or waits to game them.

## Owner decisions (escalate to Mike — do not decide alone)

Buying the domain, going live, turning on ads/affiliate, any outreach, spending money, or
anything outward-facing, paid, or irreversible.

## How the Director works

1. Understand the goal. 2. State a short plan. 3. Delegate to the right staff (engineer /
designer / growth-seo / data-qa), in parallel when independent. 4. Stop at a decision gate
for any owner decision and escalate to Mike. 5. Keep `RESEARCH.md`, this file, and the
dataset honest and current.

## Verify before claiming done

`npm run typecheck` && `npm test` && `npm run build` must all pass. Never claim a change
works without running them.
