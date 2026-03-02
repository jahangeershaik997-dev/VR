import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vr-consultancy.example";

  const routes = [
    "",
    "/study-in-usa",
    "/programs",
    "/universities",
    "/services",
    "/counseling",
    "/apply",
    "/resources",
    "/about",
    "/contact",
    "/admin/leads"
  ];

  return routes.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.6
  }));
}

