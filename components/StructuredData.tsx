import { getCert } from "@/lib/data/certs";

interface StructuredDataProps {
  type: "Organization" | "WebSite" | "BreadcrumbList" | "Article" | "FAQPage" | "Question";
  data?: any;
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://example.com";

  const getStructuredData = () => {
    switch (type) {
      case "Organization":
        return {
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "ライセンスブログ",
          url: baseUrl,
          logo: `${baseUrl}/images/logo.png`,
          description: "国家資格の過去問解説と勉強法を提供するメディアサイト",
          sameAs: [],
        };

      case "WebSite":
        return {
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "ライセンスブログ",
          url: baseUrl,
          description: "国家資格の過去問解説と勉強法を提供するメディアサイト",
          potentialAction: {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate: `${baseUrl}/search?q={search_term_string}`,
            },
            "query-input": "required name=search_term_string",
          },
        };

      case "BreadcrumbList":
        if (!data?.items) return null;
        return {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: data.items.map((item: any, index: number) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: `${baseUrl}${item.url}`,
          })),
        };

      case "Article":
        if (!data) return null;
        return {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: data.title,
          description: data.description,
          image: data.image || `${baseUrl}/images/og-image.png`,
          datePublished: data.publishedAt,
          dateModified: data.updatedAt,
          author: {
            "@type": "Person",
            name: data.author || "ライセンスブログ編集部",
          },
          publisher: {
            "@type": "Organization",
            name: "ライセンスブログ",
            logo: {
              "@type": "ImageObject",
              url: `${baseUrl}/images/logo.png`,
            },
          },
        };

      case "FAQPage":
        if (!data?.questions) return null;
        return {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: data.questions.map((faq: any) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        };

      case "Question":
        if (!data) return null;
        const cert = data.certId ? getCert(data.certId) : null;
        return {
          "@context": "https://schema.org",
          "@type": "Question",
          name: data.questionText || data.questionSummary,
          text: data.questionText || data.questionSummary,
          acceptedAnswer: data.explanation
            ? {
                "@type": "Answer",
                text: data.explanation,
              }
            : undefined,
          about: cert
            ? {
                "@type": "Thing",
                name: cert.name,
              }
            : undefined,
        };

      default:
        return null;
    }
  };

  const structuredData = getStructuredData();

  if (!structuredData) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

