import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/noi-soi-khop-goi",
        destination: "/dich-vu/noi-soi-khop-goi",
        permanent: true, // 301
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "admin.localhost",
        port: "8000",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "admin.drduongortho.com",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "api.localhost",
        port: "8000",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_BASE_URL ? new URL(process.env.NEXT_PUBLIC_BASE_URL.replace(/^https?:\/\//, (m) => m + "api.")).hostname : "api.drduongortho.com",
      },
      {
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_BASE_URL ? new URL(process.env.NEXT_PUBLIC_BASE_URL.replace(/^https?:\/\//, (m) => m + "admin.")).hostname : "admin.drduongortho.com",
        pathname: "/storage/**",
      },
      {
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_BASE_URL ? new URL(process.env.NEXT_PUBLIC_BASE_URL).hostname : "drduongortho.com",
        pathname: "/storage/**",
      },
    ],
  },
};

export default nextConfig;