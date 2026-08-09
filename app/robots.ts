import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/apply/success"],
      },
    ],
    sitemap: "https://applyidponline.com/sitemap.xml",
  };
}
