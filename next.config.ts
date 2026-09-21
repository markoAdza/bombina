import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // Every photo is served from /public, so no remote patterns are needed.
    // AVIF first, WebP as the fallback — both are far smaller than the
    // source files we inherited from the old Webador CDN.
    formats: ["image/avif", "image/webp"],
  },

  /**
   * Every route lives under a locale segment so that <html lang> can be
   * correct per language; `/` simply hands over to the Slovenian site.
   */
  async redirects() {
    return [{ source: "/", destination: "/sl", permanent: false }];
  },
};

export default nextConfig;
