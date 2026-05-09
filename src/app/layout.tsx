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
  title: "DrDuongOrtho - Bác sĩ Dương Chuyên khoa Chấn thương Chỉnh hình",
  description:
    "DrDuongOrtho - Bác sĩ Dương Chuyên khoa Chấn thương Chỉnh hình chuyên khám và điều trị các bệnh lý cơ xương khớp, chấn thương thể thao, đau lưng, thoái hóa khớp và phục hồi vận động với giải pháp an toàn, hiệu quả và tận tâm cho từng bệnh nhân.",
  // robots: {
  //   index: false,
  //   follow: false,
  // },
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