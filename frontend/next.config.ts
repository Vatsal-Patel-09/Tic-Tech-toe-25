import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images : {
    domains: [
      ",assets.aceternity.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "randomuser.me",
      },
    ],
  },
};

export default nextConfig;
