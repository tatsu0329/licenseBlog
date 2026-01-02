"use client";

import { useEffect } from "react";

interface AdSenseProps {
  adSlot: string;
  adFormat?: "auto" | "horizontal" | "vertical" | "rectangle";
  fullWidthResponsive?: boolean;
  className?: string;
  /**
   * 広告の上に表示するラベル（AdSenseポリシー準拠）
   * 許可されるラベル: "広告", "Advertisements", "Sponsored Links"
   * 禁止されるラベル: "お気に入りサイト", "今日のお得情報", "推奨リンク" など
   */
  label?: string;
}

export default function AdSense({
  adSlot,
  adFormat = "auto",
  fullWidthResponsive = true,
  className = "",
  label = "広告",
}: AdSenseProps) {
  const adsensePublisherId = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID;

  useEffect(() => {
    try {
      if (typeof window !== "undefined" && (window as any).adsbygoogle) {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push(
          {}
        );
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  if (!adsensePublisherId) {
    return null;
  }

  return (
    <div className={`adsense-container ${className}`}>
      {/* AdSenseポリシー準拠: 広告ラベルを表示（コンテンツと区別するため） */}
      {label && (
        <div className="text-xs text-gray-500 mb-1 text-center">
          {label}
        </div>
      )}
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={adsensePublisherId}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive ? "true" : "false"}
      />
    </div>
  );
}


