# PlotList — Validation & Opportunity Research

**Author:** Director, PlotList (a project of The Company)
**Date:** 2026-06-20
**Status:** Opportunity locked. Validated with live web search before committing.

## The locked opportunity

**A UK allotment directory: one indexable page per local authority, giving how-to-apply,
the official council page, and the published waiting-list signal — combined into a single,
queryable, durable hub.** pSEO mechanics (one page per council × intent), monetised by
display ads + gardening-supplier affiliate (no owner-gated work to *build*; going live,
domains and monetisation are Mike's calls).

Brand: **PlotList** — "Find your allotment, skip the guesswork." Location: **United Kingdom.**

## Why it's genuinely open

The demand is real, durable and high-intent, but **no incumbent owns it as a living,
structured directory**:

- **Demand is corroborated and large.** ~108,958 people were found on UK allotment
  waiting lists (Dino Decking FOI study); the national average wait is ~4 years as of
  May 2025, with extremes of 11–17.5 years (Camden ~17.5y, Islington ~12–13y,
  Richmond ~11y). Searches like "[council] allotment waiting list", "find an allotment
  near me", "how to apply for an allotment" are evergreen and council-specific.
- **The supply side is fragmented by design.** There are 300+ local authorities, each
  with its own page, its own application portal and its own (often unpublished) wait.
  Users have to find their specific council and dig.
- **What exists today is NOT a directory.** The waiting-list data that surfaces in search
  is one-off **PR-bait blog posts** from unrelated brands (Dino Decking — decking;
  Oak Tree Mobility — mobility aids; MyJobQuote — trades quotes; Power Sheds — sheds).
  They publish a FOI roundup once for backlinks and never maintain it. There is **no
  site that gives a stable, per-council URL** combining how-to-apply + official link +
  the published wait + tips. That is the gap PlotList fills.

This is a textbook backlog **#2** ("pSEO local availability/price tracker for an
underserved niche") — but with a *better* niche than the brief's lead candidate, because
the leading candidates were already taken (see rejected alternatives).

## Distinct from the existing portfolio

- Not a calculator (airport / mortgage), not a deadline engine (ClearDate), not the MTD
  tool (QuarterClear), not a cookie/storage extension (TabSweep).
- It IS a pSEO directory like **WashList** — but deliberately on a different axis:
  WashList sells **paid business listings** to commercial trades (free vs featured tiers);
  PlotList indexes **public/civic data per council** and monetises via ads + affiliate.
  Different dataset, different monetisation, no overlap in keywords or audience.

## Rejected alternatives (validated and dropped)

| Candidate | Verdict | Why rejected (with evidence) |
|---|---|---|
| **#3 — "Stylish" / custom-CSS MV3 extension** | **REJECT** | The brief flagged this to check against **Stylus**. Confirmed: Stylus has fully migrated to **Manifest V3** (Chrome v2.3.17, 12 Nov 2025), is free, open-source and **actively maintained**. The orphan is filled. No room for a trustworthy clean entrant to differentiate on. |
| **#2 — UK golf tee-times** (brief's lead pSEO candidate) | REJECT | **GolfNow.co.uk** already aggregates 1,700+ UK clubs with price comparison and booking; **Golfscape** sources live rates/availability directly. The comparison layer is owned. |
| **#2 alt — EV public charging tariff comparison** | REJECT | **Zapmap** owns this (UK Charging Price Index, per-kWh by network, full coverage). Plus many comparison guides (GoCompare, Honest John). Saturated. |
| **#4 — Vinted seller utility extension** | REJECT | Saturated: **Dotb, Relisted, Grow Bot (10k+ users), Vindy, V-Hive, Vinted Relister** all live on the Chrome Web Store. The single-platform niche is already crowded. |
| **UK bathing-water / beach quality directory** | REJECT | gov.uk official service + **UK Beach Guide** + **Marine Conservation Society** already cover 600+ beaches with ratings. Owned. |
| **UK council-tax band lookup** | REJECT | VOA official + several dedicated sites (Council Tax Checker, TaxBandCheck, Which?, PropertyData). Owned. |
| **#2 alt — allotment waiting lists** | **SELECTED** | Demand corroborated (108k+ on lists, multi-year waits), but only fragmented council pages + one-off PR-bait blogs exist — **no maintained directory**. Genuinely open. |

## Main risk & honest posture

- **Data fragility.** Waiting-list figures come from FOI responses and scattered council
  pages; they go stale and many councils don't publish a number at all. PlotList's answer
  is a **hard honesty rule, enforced in code**: a wait time is shown only with a real
  source URL + the date we checked it; otherwise we say "not published — check the
  council" and link out. The build fails if a record breaks this rule
  (`data/councils.ts` integrity checks + `data/councils.test.ts`). We never invent a wait.
- **Thin-content / pSEO penalty risk.** Mitigated by grounding every page in a real
  official link + genuinely useful how-to-apply + tips, and by only expanding to councils
  we can back with real data — not auto-spinning 300 empty pages.

## Sources (validated 2026-06-20 via web search)

- Allotment demand & waits: Dino Decking (108,958 on lists, FOI), Oak Tree Mobility
  (London avg 69 months; Islington ~12y), MyJobQuote (300+ councils; Camden 17.5y),
  Power Sheds (199 towns dataset), gov.uk-linked council pages (Medway 28 sites/1,000+
  plots; Royal Greenwich 18 sites; Glasgow; B&NES; Richmond; Slough; Solihull; Tameside).
- Stylus MV3 status: openstyles/stylus GitHub & discussion #1761; chrome-stats Stylus
  listing; Grokipedia "Stylus (browser extension)" (v2.3.17 Chrome, 12 Nov 2025).
- Golf: GolfNow.co.uk (1,700+ clubs), Golfscape, UK Golf Guy 2026 green-fee report.
- EV charging: Zapmap UK Charging Price Index; GoCompare / Honest John EV tariff guides.
- Vinted tooling: Dotb, Relisted, SellerAider Grow Bot, Vindy, V-Hive (Chrome Web Store).
- Bathing water: gov.uk/quality-of-local-bathing-water; UK Beach Guide; MCS.
- Council tax: VOA gov.uk/council-tax-bands; Council Tax Checker; TaxBandCheck; Which?.

> Honesty note: the FOI-sourced waiting-list totals are real but point-in-time and
> source-dependent; PlotList treats every figure as "as published on [date], confirm with
> the council" and never presents an unverified number. The two hard, durable signals are
> (a) the persistent, multi-year, council-specific demand and (b) the absence of any
> maintained directory occupying this space.
