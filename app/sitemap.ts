import type { MetadataRoute } from "next";
import { toolList } from "./site-data";
import { companyPageList } from "./company-pages";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://aisocialmediapostgenerators.com";
  return [
    { url: base, changeFrequency: "weekly", priority: 1 },
    ...toolList.map((tool) => ({ url: `${base}/${tool.slug}/`, changeFrequency: "weekly" as const, priority: 0.9 })),
    ...companyPageList.map((page) => ({ url: `${base}/${page.slug}/`, changeFrequency: "monthly" as const, priority: 0.5 })),
  ];
}
