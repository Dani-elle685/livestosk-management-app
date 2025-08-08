import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tse4.mm.bing.net",
        pathname: "/th/id/*", 
      },
      {
        protocol: "https",
        hostname: "th.bing.com",
        pathname: "/th/id/*",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        pathname: "/wikipedia/commons/*",
      },
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net",
        pathname: "/npm/lucide-icons@*",
      },
    ],
  },
};

export default nextConfig;
