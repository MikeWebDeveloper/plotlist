/** Central site config. Production domain is the free Vercel subdomain until Mike buys one. */
export const site = {
  name: "PlotList",
  tagline: "Find your allotment, skip the guesswork.",
  description:
    "PlotList is the UK allotment directory: how to apply, where the official council page is, and the published waiting-list signal — council by council.",
  // Live production domain (free Vercel subdomain). A custom domain is an owner decision.
  url: "https://plotlist-kappa.vercel.app",
  locale: "en_GB",
} as const;

export function absoluteUrl(path = ""): string {
  const base = site.url.replace(/\/$/, "");
  return path ? `${base}${path.startsWith("/") ? "" : "/"}${path}` : base;
}
