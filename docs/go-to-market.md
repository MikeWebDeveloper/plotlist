# PlotList — Go-to-Market

**Owner:** Head of Marketing (a project of The Company)
**Status:** Plan only — PlotList is not live. Everything outward-facing here is owner-gated
(domain, go-live, monetisation, any posting/outreach) and waits for Mike.
**Source of truth:** `CLAUDE.md` + `RESEARCH.md`. This doc is the living GTM plan; it never
overrides the honesty non-negotiables.

---

## 1. Positioning

**One line:** *Find your allotment, skip the guesswork.*

**Positioning statement:** For anyone trying to get an allotment in the UK, PlotList is the
free, honest, per-council directory that tells you — for your specific local authority — how to
apply, where the official page is, and the published waiting-list signal where one genuinely
exists. Unlike the scattered council pages and the one-off FOI blog posts from unrelated brands,
PlotList is the *only maintained, per-council directory* and it never invents a waiting time.

**What we are:** a living, structured, council-by-council hub that turns "I want an allotment but
have no idea where to start in my area" into a single accurate page with the official link and the
real process.

**What we are NOT:** not an official council service, not an application portal, not a guarantee of
a place or a wait, not a one-time FOI roundup. Where a council hasn't published a wait, we say so
plainly and link out — that honesty *is* the brand.

**Why this positioning holds:** the data is fragile by design (FOI-sourced, point-in-time, often
unpublished). We don't compete on having a number for every council — we compete on being the one
place that's accurate, current, and honest about what's known vs not. The honesty rule is enforced
in code (`data/councils.ts` + `data/councils.test.ts`), so the positioning can't drift even if we
wanted it to.

---

## 2. ICP (who we're for)

**Primary: the prospective allotment-holder.** Someone who wants to grow their own food / get an
allotment plot and is at the *start* of the journey — they don't yet know their council's process,
where to apply, or how bad the wait is. High intent, evergreen, and self-selecting by search.

Two sub-segments:
- **"Just starting" searchers** — query "how to apply for an allotment in [town]", "allotment near
  me". They need the official link + plain-English process. We serve every council here (seed
  records included — real official link + how-to-apply, no wait number).
- **"Already waiting / deciding" searchers** — query "[council] allotment waiting list", "how long
  is the wait for an allotment in [town]". They want the wait signal. We serve them best where we
  have a *verified* figure; elsewhere we're honest and point them at the council to ask directly.

**Demand is real and durable:** ~108,958 people on UK allotment waiting lists; national average
wait ~4 years (May 2025), extremes 11–17.5 years (Camden ~17.5y, Islington ~12–13y, Richmond ~11y).
Council-specific queries are evergreen — people search them year after year, council by council.

**Who we are NOT for (yet):** councils themselves, allotment associations as a paid audience, or
commercial trades. (That's a different axis — note WashList sells paid trade listings; PlotList
indexes civic data. No overlap.)

---

## 3. Why this is almost entirely an organic-SEO play

The audience **tells us exactly what they want by typing a council name + "allotment waiting
list / apply"**. That is the whole game:

- **The query is the product.** Intent is council-specific and explicit. We don't need to create
  demand or interrupt anyone — we need to *be the best answer* when they search. pSEO mechanics
  (one strong page per council × intent) map perfectly onto this.
- **The supply side is fragmented by design.** 300+ local authorities, each with its own page,
  portal, and (often unpublished) wait. Users have to hunt for their specific council and dig.
  A single, queryable, per-council hub removes that friction.
- **No incumbent owns it as a directory.** What ranks today is one-off **PR-bait FOI roundups**
  from unrelated brands (decking, mobility aids, trades quotes, sheds) — published once for
  backlinks, never maintained. They go stale immediately. A *maintained, per-council, honest*
  directory out-serves and out-lasts them.
- **Paid doesn't fit.** The audience is diffuse across 300+ councils and low monetary value
  per visit; paid acquisition would never pay back at ≤£50/mo. Organic compounds for free and
  matches the faceless/async model.

So distribution is **organic-first by a wide margin**: ~90% search, with a small assist from the
two community channels below. Marketing's leverage is choosing *which councils to win first* and
*building the citable asset*, not buying traffic.

---

## 4. The moat

**PlotList is the only living, maintained, per-council allotment directory — and it's honest by
construction.** Two durable signals (per `RESEARCH.md`):

1. **Persistent, multi-year, council-specific demand** that nobody owns as a directory.
2. **Absence of any maintained competitor** — the FOI blog posts are one-shot and rot.

Our defensibility compounds three ways:
- **Maintenance is the moat.** Anyone can publish a FOI roundup once; almost no one keeps 300
  council pages current with fresh `waitlistVerifiedAt` dates and working official links. Doing
  exactly that, visibly, is what we are.
- **Honesty is the moat.** The code-enforced "never invent a wait" rule means answer engines and
  users can trust us as a citable source. A competitor that fabricates or guesses loses the one
  thing this category needs. We will out-trust them.
- **Structure is the moat.** Stable per-council URLs + accurate `GovernmentService` structured data
  make us the natural canonical entry the FOI posts link *to*, and the natural source answer engines
  cite. Stale roundups become our backlinks over time.

The moat is **not** a clever number nobody else has — it's being correct, current, and the only one
who keeps doing it.

---

## 5. Organic channels (faceless, ≤£50/mo, compounding)

### Channel 1 — Organic search & answer engines (the engine; ~90%)
The core. Owned in execution by **growth-seo**; Marketing sets the priority order and the angles.
- One strong, accurate page per council ranking for "[council] allotment waiting list",
  "[council] allotment apply", "how to apply for an allotment in [town]", "allotment near me".
- **GEO/answer-engine:** clear, factual, well-structured pages + honest structured data so
  Google's AI answers, ChatGPT, etc. cite the official link and the verified wait — never
  fabricated facts to game them.
- Marketing's job here: pick the councils/regions with the strongest intent + conviction first
  (see §6), and supply the content angles (e.g. "longest allotment waiting lists in [region]"
  comparison framing, grounded only in verified figures).

### Channel 2 — Gardening & allotment communities (seed + earn, owner-gated to post)
Where these exact questions get asked: r/GardeningUK, r/UKAllotments and allotment subreddits,
the National Allotment Society (NSALG) ecosystem, allotment/grow-your-own Facebook groups, and
forums like GardenersWorld. Posture: be genuinely useful — answer "how do I find my council's
list?" by pointing to the relevant council page — never spammy drops. These earn referral traffic
*and* the kind of natural links that lift the whole directory. **All posting is owner-gated** (a
real account, a real post) — Marketing drafts replies/resources and stages them; Mike decides.

### Channel 3 — Civic / local (durable, low-effort, owner-gated to submit)
Allotment associations, local "moving to [town]" and community guides, and local gardening blogs
are natural linkers to an accurate per-council resource. Plan: a short, stageable outreach list of
the most relevant per-council associations/guides, offering our council page as a useful link.
Low volume, high durability, very faceless. **Submission/outreach is owner-gated.**

> Explicitly out of scope: paid ads, influencers, a personal brand, buying links. None fit the
> faceless/organic/≤£50 model and all risk the honesty posture.

---

## 6. First 30 days — which councils/regions to prioritise

**Principle:** lead with councils where we *already have verified waiting-list data* AND demand is
highest — that's where a page can rank for the high-value "waiting list" query honestly on day one.
Then widen the honest "how to apply" coverage behind it.

The dataset today carries verified waitlist sources for a London-heavy + university-city set
(Islington, Southwark, Lewisham, Oxford, Brighton & Hove, Reading, Cambridge, Nottingham,
Leicester, Edinburgh) alongside seed records (real official link, no wait number). That shapes the
plan:

- **Week 1 — Verified flagships.** Polish and prioritise the councils that already have a verified
  wait + high demand: **London long-wait boroughs** (Islington, Southwark, Lewisham — the "how bad
  is the wait" searchers) and **high-demand university cities** (Oxford, Cambridge, Brighton,
  Reading, Nottingham, Leicester, Edinburgh). These can win "[council] allotment waiting list"
  honestly now. Make sure each `waitlistVerifiedAt` is current.
- **Week 2 — Verify the next demand tier.** Hand growth-seo/data-qa a ranked list of the highest-
  demand councils still missing a verified figure (the famous extremes — Camden, Richmond — and
  other large metros). Each only ships a wait number once a real source + date is checked; until
  then they run as honest "how to apply / not published" pages.
- **Weeks 3–4 — Widen honest coverage by region.** Expand "how to apply" pages (official link +
  plain-English process, no invented wait) across whole regions starting with **London**, then a
  couple of high-density metros (**Greater Manchester / West Midlands**), so internal linking
  (home → region → council) has real depth. Quality bar holds: real official link + useful copy on
  every page — no auto-spun empty councils.

**Sequencing logic:** verified-wait pages earn the high-intent clicks and the citations; honest
how-to-apply pages give breadth, internal-linking strength, and catch the "just starting" segment —
without ever compromising the honesty rule.

---

## 7. Key metric

**Indexed council pages ranking for their target "[council] allotment waiting list / apply" query
→ organic clicks** — i.e. Search Console *impressions and clicks per council page*, not raw
visitors and not vanity totals. Early on, the leading indicator is **coverage of the demand**: how
many high-intent council queries we have a strong, honest page for, and how many of those are
ranking and being clicked. Monetisation metrics (ad/affiliate) come only after Mike turns those on.

---

## 8. Launch checklist

### No gate — Marketing/growth-seo can do now (planning & on-site assets)
- [ ] Finalise positioning + messaging (this doc) and the per-council page copy angles with
      growth-seo (honest, non-spun).
- [ ] Ranked council/region priority list for the first 30 days (§6), with intent + whether we have
      verified data.
- [ ] Draft (stage, don't post) community resource replies and a civic/association outreach list —
      held for Mike.
- [ ] Confirm on-site SEO plumbing with growth-seo: per-council `<title>`/meta, `GovernmentService`
      + `BreadcrumbList` JSON-LD (no ratings), internal linking, `sitemap.ts`/`robots.ts`.
- [ ] Verify `npm run typecheck && npm test && npm run build` all pass before anything is staged
      as "ready".

### Owner-gated — needs Mike (do not act; stage and escalate)
- [ ] **Buy the domain / decide the live URL.**
- [ ] **Go live** (publish the site, submit sitemap, enable IndexNow).
- [ ] **Monetisation:** turn on display ads and/or the gardening-supplier affiliate — recommended
      posture: *free, honest directory first*; monetise only once traffic qualifies, and never gate
      the core official-link/how-to-apply content.
- [ ] **Any outward action:** creating any social/forum/community/directory account, posting in
      communities, or sending outreach emails.

---

## 9. Honesty guardrails for marketing (always)
- Never present an unverified wait. Councils with no published figure stay honest — "not published,
  check with the council" + link out. This holds in copy, posts, and any comparison framing.
- Never fabricate traction, reviews, ratings, testimonials, or "as seen in".
- Never imply PlotList is an official council service or guarantees a plot or a wait.
- Comparison/listicle angles ("longest waits in [region]") use *only* verified figures, dated.
- Everything outward-facing is staged for Mike, not shipped by Marketing.
