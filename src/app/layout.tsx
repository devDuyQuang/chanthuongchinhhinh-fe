import type { Metadata } from "next";
import { Noto_Serif } from "next/font/google";
import Script from "next/script";

const notoSerif = Noto_Serif({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  subsets: ["latin", "vietnamese"],
  display: "swap",
  variable: "--font-noto-serif",
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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://drduongortho.com'),
  title: "Bác sĩ Dương Chuyên khoa II Chấn thương Chỉnh hình - DrDuongOrtho",
  description:
    "Bác sĩ Dương Chuyên khoa II  Chấn thương Chỉnh hình chuyên khám và điều trị các bệnh lý cơ xương khớp, chấn thương thể thao, đau lưng, thoái hóa khớp và phục hồi vận động với giải pháp an toàn, hiệu quả và tận tâm cho từng bệnh nhân.",
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Bác sĩ Dương Chuyên khoa II Chấn thương Chỉnh hình - DrDuongOrtho",
    description: "Bác sĩ Dương Chuyên khoa II  Chấn thương Chỉnh hình chuyên khám và điều trị các bệnh lý cơ xương khớp, chấn thương thể thao, đau lưng, thoái hóa khớp và phục hồi vận động với giải pháp an toàn, hiệu quả và tận tâm cho từng bệnh nhân.",
    type: "website",
    locale: "vi_VN",
    siteName: "DrDuongOrtho",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bác sĩ Dương Chuyên khoa II Chấn thương Chỉnh hình - DrDuongOrtho",
    description: "Bác sĩ Dương Chuyên khoa II  Chấn thương Chỉnh hình chuyên khám và điều trị các bệnh lý cơ xương khớp, chấn thương thể thao, đau lưng, thoái hóa khớp và phục hồi vận động với giải pháp an toàn, hiệu quả và tận tâm cho từng bệnh nhân.",
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
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="vi" data-theme-color="skin-1" className={notoSerif.variable}>
      <head>
        {faviconUrl ? <link rel="icon" href={faviconUrl} /> : null}
      </head>
      <body className={notoSerif.className}>
        <HeaderWrapper />
        {children}
        <FooterWrapper />
        <ScrolltoTop />
        <Toaster position="top-right" />
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />

            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];

                function gtag(){
                  dataLayer.push(arguments);
                }

                gtag('js', new Date());

                gtag('config', '${GA_ID}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}