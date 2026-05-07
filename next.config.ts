// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */

//     images: {
//       unoptimized: true,
//     },    
// };

// export default nextConfig;


// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: process.env.NEXT_PUBLIC_BASE_URL ? new URL(process.env.NEXT_PUBLIC_BASE_URL.replace(/^https?:\/\//, (m) => m + "api.")).hostname : "api.drduongortho.com",
//       },
//     ],
//   },

//   async rewrites() {
//     return [
//       {
//         source: "/gioi-thieu",
//         destination: "/about-us",
//       },
//       {
//         source: "/danh-muc/dich-vu-dieu-tri",
//         destination: "/services",
//       },
//       {
//         source: "/dat-lich-kham",
//         destination: "/appointment",
//       },
//       {
//         source: "/lien-he",
//         destination: "/contact-us",
//       },
//     ];
//   },
// };

// export default nextConfig;



import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_BASE_URL ? new URL(process.env.NEXT_PUBLIC_BASE_URL.replace(/^https?:\/\//, (m) => m + "api.")).hostname : "api.drduongortho.com",
      },
      {
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_BASE_URL ? new URL(process.env.NEXT_PUBLIC_BASE_URL.replace(/^https?:\/\//, (m) => m + "admin.")).hostname : "admin.drduongortho.com",
        pathname: "/storage/**",
      },
    ],
  },
};

export default nextConfig;
