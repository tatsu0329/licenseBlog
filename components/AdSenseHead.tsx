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

      // AdSenseスクリプトをhead内に追加
      let scriptTag = document.querySelector('script[src*="adsbygoogle.js"]');
      if (!scriptTag) {
        scriptTag = document.createElement("script");
        scriptTag.setAttribute("async", "true");
        scriptTag.setAttribute(
          "src",
          `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsensePublisherId}`
        );
        scriptTag.setAttribute("crossorigin", "anonymous");
        document.head.appendChild(scriptTag);
      }
    }
  }, [adsensePublisherId]);

  return null;
}


