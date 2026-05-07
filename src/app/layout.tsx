// import type { Metadata } from "next";
// // import "./globals.css";
// import 'swiper/css'
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import 'swiper/css/grid';
// import 'swiper/css/thumbs';
// import 'swiper/css/free-mode';
// import 'swiper/css/effect-fade';
// import 'lightgallery/css/lightgallery.css';
// import 'lightgallery/css/lg-zoom.css';
// import 'lightgallery/css/lg-thumbnail.css';
// import "../../public/assets/css/style.css"
// import ScrolltoTop from "@/component/ScrolltoTop";
// import HeaderWrapper from "@/component/HeaderWrapper";
// import FooterWrapper from "@/component/FooterWrapper";

// export const metadata: Metadata = {
//   title: "ClinicMaster - Health & Medical NextJs Template",
//   description: "ClinicMaster is a clean and modern Health & Medical Next.js template. Ideal for clinics, hospitals, and healthcare providers, with responsive design, booking system, and customizable components.",
//   robots: {
//     index: false,
//     follow: false,
//   },
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="vi" data-theme-color="skin-1">
//       <head>
//         <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"></link>      
//       </head>
//       <body>
//         <HeaderWrapper />
//         {children}
//         <FooterWrapper />
//         <ScrolltoTop />
//       </body>
//     </html>
//   );
// }


import type { Metadata } from "next";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/grid";
import "swiper/css/thumbs";
import "swiper/css/free-mode";
import "swiper/css/effect-fade";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import "../../public/assets/css/style.css";

import ScrolltoTop from "@/component/ScrolltoTop";
import HeaderWrapper from "@/component/HeaderWrapper";
import FooterWrapper from "@/component/FooterWrapper";
import { normalizeImageUrl } from "@/lib/normalizeImageUrl";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "ClinicMaster - Health & Medical NextJs Template",
  description:
    "ClinicMaster is a clean and modern Health & Medical Next.js template. Ideal for clinics, hospitals, and healthcare providers, with responsive design, booking system, and customizable components.",
  robots: {
    index: false,
    follow: false,
  },
};

async function getSettings() {
  try {
    const res = await fetch(
      `${(process.env.NEXT_PUBLIC_BASE_URL || "").replace(/^https?:\/\//, (match) => match + "api.")}/setting`,
      { cache: "no-store" }
    );

    if (!res.ok) return null;

    const result = await res.json();
    return result.data || null;
  } catch (error) {
    console.error("Lỗi lấy settings:", error);
    return null;
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSettings();
  const faviconUrl = normalizeImageUrl(settings?.site_assets_clinic?.favicon);

  return (
    <html lang="vi" data-theme-color="skin-1" className={roboto.variable}>
      <head>
        {faviconUrl ? <link rel="icon" href={faviconUrl} /> : null}
      </head>
      <body className={roboto.className}>
        <HeaderWrapper />
        {children}
        <FooterWrapper />
        <ScrolltoTop />
        <Toaster position="top-right" />
      </body>
    </html>
  );
}