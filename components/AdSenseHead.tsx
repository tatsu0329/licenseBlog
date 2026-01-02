"use client";

import { useEffect } from "react";

export default function AdSenseHead() {
  const adsensePublisherId = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID;

  useEffect(() => {
    if (adsensePublisherId) {
      // メタタグを動的に追加
      let metaTag = document.querySelector('meta[name="google-adsense-account"]');
      if (!metaTag) {
        metaTag = document.createElement("meta");
        metaTag.setAttribute("name", "google-adsense-account");
        metaTag.setAttribute("content", adsensePublisherId);
        document.head.appendChild(metaTag);
      }
    }
  }, [adsensePublisherId]);

  return null;
}


