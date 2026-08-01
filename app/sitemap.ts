import type { MetadataRoute } from "next";
import { toolList } from "./site-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://aisocialmediapostgenerators.com";
  return [
    { url: base, changeFrequency: "weekly", priority: 1 },
    ...toolList.map((tool) => ({ url: `${base}/${tool.slug}/`, changeFrequency: "weekly" as const, priority: 0.9 })),
    ...["about", "terms", "refund"].map((slug) => ({ url: `${base}/${slug}/`, changeFrequency: "monthly" as const, priority: 0.4 })),
  ];
}
