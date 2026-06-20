/** Central site config. The domain is a placeholder until Mike buys one. */
export const site = {
  name: "PlotList",
  tagline: "Find your allotment, skip the guesswork.",
  description:
    "PlotList is the UK allotment directory: how to apply, where the official council page is, and the published waiting-list signal — council by council.",
  // Placeholder only. Owner decision to register a real domain.
  url: "https://plotlist.example",
  locale: "en_GB",
} as const;

export function absoluteUrl(path = ""): string {
  const base = site.url.replace(/\/$/, "");
  return path ? `${base}${path.startsWith("/") ? "" : "/"}${path}` : base;
}
