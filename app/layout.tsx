import type { Metadata } from "next";
import AdSenseHead from "@/components/AdSenseHead";
import "./globals.css";

export const metadata: Metadata = {
  title: "国家資格の過去問解説と勉強法",
  description: "FP、簿記、宅建など、国家資格の過去問解説と勉強法を提供しています。",
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
        {children}
      </body>
    </html>
  );
}




