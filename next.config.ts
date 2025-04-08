import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/__/auth/:path*",
        destination: "https://productivityapp-f2a7c.firebaseapp.com/__/auth/:path*",
      },
    ];
  },
};

export default nextConfig;
