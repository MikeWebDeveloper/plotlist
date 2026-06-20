/**
 * Tests for the council dataset honesty rules. Run with `npm test`
 * (node --test). Importing the module also exercises the build-time
 * integrity assertions, so a malformed dataset would throw on import here too.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  councils,
  regions,
  getCouncil,
  councilsByRegion,
} from "./councils.ts";

test("dataset is non-empty and every slug is unique kebab-case", () => {
  assert.ok(councils.length > 0, "expected at least one council");
  const slugs = new Set<string>();
  for (const c of councils) {
    assert.match(c.slug, /^[a-z0-9-]+$/, `bad slug: ${c.slug}`);
    assert.ok(!slugs.has(c.slug), `duplicate slug: ${c.slug}`);
    slugs.add(c.slug);
  }
});

test("every council links to a real official URL", () => {
  for (const c of councils) {
    assert.match(c.officialUrl, /^https?:\/\//, `${c.slug} missing officialUrl`);
  }
});

test("every council has a known region", () => {
  for (const c of councils) {
    assert.ok(regions.includes(c.region), `${c.slug} unknown region ${c.region}`);
  }
});

test("HONESTY: a waitlist figure always carries a real source + verified date", () => {
  for (const c of councils) {
    if (!c.waitlist) continue;
    assert.ok(!c.seed, `${c.slug}: seed records must not carry a waitlist`);
    assert.match(
      c.waitlistSource ?? "",
      /^https?:\/\//,
      `${c.slug}: waitlist without a real source URL`
    );
    assert.match(
      c.waitlistVerifiedAt ?? "",
      /^\d{4}-\d{2}-\d{2}$/,
      `${c.slug}: waitlist without a verifiedAt date`
    );
  }
});

test("HONESTY: seed records never present waiting-list numbers", () => {
  for (const c of councils) {
    if (c.seed) {
      assert.equal(c.waitlist, undefined, `${c.slug}: seed record leaked a waitlist`);
    }
  }
});

test("lookup helpers work", () => {
  const first = councils[0];
  assert.equal(getCouncil(first.slug)?.slug, first.slug);
  assert.equal(getCouncil("no-such-council"), undefined);
  for (const r of regions) {
    const inRegion = councilsByRegion(r);
    for (const c of inRegion) assert.equal(c.region, r);
  }
});
