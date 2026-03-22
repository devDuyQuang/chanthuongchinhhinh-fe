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
//         hostname: "api.chanthuongchinhhinh.com.vn",
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
        hostname: "api.chanthuongchinhhinh.com.vn",
      },
      {
        protocol: "https",
        hostname: "admin.chanthuongchinhhinh.com.vn",
        pathname: "/storage/uploads/**",
      },
    ],
  },
};

export default nextConfig;
