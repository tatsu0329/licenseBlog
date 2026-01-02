import type { Metadata } from "next";
import AdSenseHead from "@/components/AdSenseHead";
import StructuredData from "@/components/StructuredData";
import "./globals.css";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://example.com";
const siteName = "ライセンスブログ";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "国家資格の過去問解説と勉強法 | ライセンスブログ",
    template: `%s | ${siteName}`,
  },
  description: "国家資格（自動車整備士、FP、簿記、宅建など）の過去問解説、勉強法、合格ロードマップを提供。過去問ベースの逆算学習で効率的に合格を目指せます。",
  keywords: [
    "国家資格",
    "過去問",
    "解説",
    "勉強法",
    "合格率",
    "自動車整備士",
    "FP",
    "簿記",
    "宅建",
    "試験対策",
    "学習ロードマップ",
  ],
  authors: [{ name: "ライセンスブログ編集部" }],
  creator: "ライセンスブログ編集部",
  publisher: "ライセンスブログ",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: baseUrl,
    siteName: siteName,
    title: "国家資格の過去問解説と勉強法 | ライセンスブログ",
    description: "国家資格（自動車整備士、FP、簿記、宅建など）の過去問解説、勉強法、合格ロードマップを提供。",
    images: [
      {
        url: `${baseUrl}/images/og-image.png`,
        width: 1200,
        height: 630,
        alt: "ライセンスブログ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "国家資格の過去問解説と勉強法 | ライセンスブログ",
    description: "国家資格（自動車整備士、FP、簿記、宅建など）の過去問解説、勉強法、合格ロードマップを提供。",
    images: [`${baseUrl}/images/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "iGf-PF9uOWYiJU0QpuGr559zSe4duSwiDVj9cL1niMs",
  },
  alternates: {
    canonical: baseUrl,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="antialiased">
        <AdSenseHead />
        <StructuredData type="Organization" />
        <StructuredData type="WebSite" />
        {children}
      </body>
    </html>
  );
}




