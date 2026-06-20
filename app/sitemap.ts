import type { MetadataRoute } from "next";
import { councils } from "@/data/councils";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/about"), lastModified: now, changeFrequency: "monthly", priority: 0.5 },
  ];
  const councilRoutes: MetadataRoute.Sitemap = councils.map((c) => ({
    url: absoluteUrl(`/${c.slug}`),
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));
  return [...staticRoutes, ...councilRoutes];
}
