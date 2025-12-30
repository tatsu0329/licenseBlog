/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // ISR設定（必要に応じて）
  // revalidate: 3600,
};

module.exports = nextConfig;

