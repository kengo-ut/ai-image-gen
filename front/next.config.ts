import type { NextConfig } from "next";
const imageBaseUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL || "";

const nextConfig: NextConfig = {
  /* config options here */
  // output: 'export',
  // images: { unoptimized: true },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: imageBaseUrl,
      },
    ],
  },
};

export default nextConfig;
