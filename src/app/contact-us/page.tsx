export const dynamic = "force-dynamic";

import Link from "next/link";
import PageBanner from "@/component/PageBanner";
import { IMAGES } from "@/constant/theme";
// import Footer from "@/layout/Footer";
import Connect from "@/component/Connect";
import Getintouch from "@/component/Getintouch";
import Alllocation from "@/component/Alllocation";
import Image from "next/image";
import { SiteCommonData } from "@/types/site";

import { normalizeImageUrl } from "@/lib/normalizeImageUrl";
import { mapSiteToConnectData, mergeConnectData } from "@/lib/mappers/site";

type LocationItem = {
  title?: string;
  address?: string;
  phone?: string;
  email?: string;
  time?: string;
  map_iframe?: string;
  map_link?: string;
};

type SettingResponse = {
  success: boolean;
  message: string;
  data?: {
    contact_page_hero_clinic?: {
      title?: string;
      banner_hero?: string;
    };
    contact_page_info_clinic?: {
      title?: string;
      description?: string;
      address?: {
        label?: string;
        value?: string;
      };
      phone?: {
        label?: string;
        value?: string;
      };
      email?: {
        label?: string;
        value?: string;
      };
      time?: {
        label?: string;
        value?: string;
      };
      stats_text?: string;
      rating?: {
        score?: string;
        text?: string;
      };
      appointment_btn?: {
        text?: string;
        link?: string;
      };
      form_title?: string;
      form_subtitle?: string;
      map_iframe?: string;
    };
    contact_page_locations_clinic?: {
      section_title?: string;
      items?: LocationItem[];
    };
    site?: SiteCommonData;
  };
};

async function getSetting(): Promise<SettingResponse | null> {
  try {
    const res = await fetch(
      `${(process.env.NEXT_PUBLIC_BASE_URL || "").replace(/^https?:\/\//, (match) => match + "api.")}/setting`,
      {
        cache: "no-store",
      },
    );

    if (!res.ok) {
      throw new Error(`Fetch setting failed: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Lỗi lấy setting:", error);
    return null;
  }
}

function extractIframeSrc(iframe?: string): string | undefined {
  if (!iframe) return undefined;

  const match = iframe.match(/src=["']([^"']+)["']/i);
  return match?.[1];
}

async function Contactus() {
  const setting = await getSetting();
  const site = setting?.data?.site;
  const contactPage = setting?.data?.contact_page_info_clinic;

  const fallback = mapSiteToConnectData(site);
  const connectData = mergeConnectData(contactPage, fallback);

  const contactHero = setting?.data?.contact_page_hero_clinic;
  const contactInfo = setting?.data?.contact_page_info_clinic;
  const contactLocations = setting?.data?.contact_page_locations_clinic;

  const bannerUrl = normalizeImageUrl(contactHero?.banner_hero);

  // map lớn của trang liên hệ: ưu tiên page riêng, fallback site common
  const rawMapIframe = contactInfo?.map_iframe || site?.map || undefined;
  const mapSrc = extractIframeSrc(rawMapIframe);

  // location đầu tiên là source đúng nhất cho box địa chỉ + link map
  const primaryLocation = contactLocations?.items?.[0];

  const mapAddress =
    primaryLocation?.address ||
    contactInfo?.address?.value ||
    site?.address_description ||
    "Địa chỉ chưa cập nhật";

  const googleMapHref =
    primaryLocation?.map_link ||
    (mapAddress
      ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapAddress)}`
      : "https://www.google.com/maps/");

  return (
    <>
      <main className="page-content">
        <PageBanner
          title={contactHero?.title || "Contact Us"}
          bnrimage={bannerUrl || IMAGES.bnr1.src}
        />

        <section className="content-inner">
          <div className="container">
            <div className="row g-xl-4 align-items-center">
              <Connect data={connectData} />
              <Getintouch data={contactInfo} />
            </div>
          </div>
        </section>

        {/* <Alllocation data={contactLocations} /> */}

        <div className="clearfix">
          <div className="map-wrapper style-2">
            {mapSrc ? (
              <iframe
                src={mapSrc}
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                rel="nofollow"
              />
            ) : (
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d28891.193971348785!2d75.8546432!3d25.1559936!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1719221707984!5m2!1sen!2sin"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                rel="nofollow"
              />
            )}

            <div className="container">
              <div
                className="content-bx style-5 position-absolute wow fadeInUp"
                data-wow-delay="0.2s"
                data-wow-duration="0.5s"
              >
                <div className="content-logo">
                  <Image src={IMAGES.logo} alt="logo" />
                </div>
                <div className="content-text">
                  <p className="m-b0">{mapAddress}</p>
                </div>
                <div className="dz-footer">
                  <Link
                    href={googleMapHref}
                    target="_blank"
                    className="icon-link-hover-end"
                    rel="nofollow"
                  >
                    Mở Google Map
                    <i className="feather icon-arrow-right" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* <Footer settings={{ site: setting?.data?.site }} /> */}
    </>
  );
}

export default Contactus;
