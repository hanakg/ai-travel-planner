import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // TODO: replace with your own domain
      },
    ],
  },
};

export default nextConfig;
