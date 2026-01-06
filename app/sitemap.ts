import { MetadataRoute } from "next";
import { getAllCerts } from "@/lib/data/certs";
import { getAllQuestions } from "@/lib/data/questions";
import { getAllArticles } from "@/lib/data/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://example.com";

  const certs = getAllCerts();
  const questions = getAllQuestions();
  const articles = getAllArticles();

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/certs`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...certs.map((cert) => ({
      url: `${baseUrl}/certs/${cert.slug}`,
      lastModified: cert.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    ...certs.map((cert) => ({
      url: `${baseUrl}/certs/${cert.slug}/kakomon`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...certs.map((cert) => ({
      url: `${baseUrl}/certs/${cert.slug}/study`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...certs.map((cert) => ({
      url: `${baseUrl}/certs/${cert.slug}/faq`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...certs.map((cert) => ({
      url: `${baseUrl}/certs/${cert.slug}/overview`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...questions.map((q) => {
      const cert = certs.find((c) => c.id === q.certId || c.slug === q.certId);
      const certSlug = cert?.slug || q.certId;
      return {
        url: `${baseUrl}/certs/${certSlug}/kakomon/${q.year}/${q.season}/${q.categoryId}/${q.id}`,
        lastModified: q.updatedAt,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      };
    }),
    ...articles.map((article) => ({
      url: `${baseUrl}/articles/${article.slug}`,
      lastModified: article.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    {
      url: `${baseUrl}/disclaimer`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.3,
    },
  ];
}

