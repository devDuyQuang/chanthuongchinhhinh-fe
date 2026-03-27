// import Link from "next/link";
// import PageBanner from "@/component/PageBanner";
// import { IMAGES } from "@/constant/theme";
// import Footer from "@/layout/Footer";
// import Header from "@/layout/Header";
// import Connect from "@/component/Connect";
// import Getintouch from "@/component/Getintouch";
// import Alllocation from "@/component/Alllocation";
// import Image from "next/image";

// function Contactus() {
//     return (
//         <>
//             <main className="page-content">
//                 <PageBanner title="Contact Us" bnrimage={IMAGES.bnr1.src} />
//                 <section className="content-inner">
//                     <div className="container">
//                         <div className="row g-xl-4 align-items-center">
//                             <Connect />
//                             <Getintouch />
//                         </div>
//                     </div>
//                 </section>
//                 <Alllocation />
//                 <div className="clearfix">
//                     <div className="map-wrapper style-2">
//                         <iframe
//                             src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d28891.193971348785!2d75.8546432!3d25.1559936!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1719221707984!5m2!1sen!2sin"
//                             style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
//                         />

//                         <div className="container">
//                             <div className="content-bx style-5 position-absolute wow fadeInUp" data-wow-delay="0.2s" data-wow-duration="0.5s">
//                                 <div className="content-logo">
//                                     <Image src={IMAGES.logo} alt="logo" />
//                                 </div>
//                                 <div className="content-text">
//                                     <p className="m-b0">1234 Elm Street Springfield, IL 62704 USA</p>
//                                 </div>
//                                 <div className="dz-footer">
//                                     <Link href="https://www.google.com/maps/" target="_blank" className="icon-link-hover-end">Open Google Map
//                                         <i className="feather icon-arrow-right" />
//                                     </Link>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </main>
//             <Footer />
//         </>
//     );
// }
// export default Contactus;


export const dynamic = "force-dynamic";

import Link from "next/link";
import PageBanner from "@/component/PageBanner";
import { IMAGES } from "@/constant/theme";
import Footer from "@/layout/Footer";
import Connect from "@/component/Connect";
import Getintouch from "@/component/Getintouch";
import Alllocation from "@/component/Alllocation";
import Image from "next/image";

import { normalizeImageUrl } from "@/lib/normalizeImageUrl";
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
    };
};

async function getSetting(): Promise<SettingResponse | null> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/setting`, {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error(`Fetch setting failed: ${res.status}`);
        }

        return await res.json();
    } catch (error) {
        console.error("Lỗi lấy setting:", error);
        return null;
    }
}

// function normalizeImageUrl(url?: string) {
//     if (!url) return null;

//     if (url.startsWith("http://") || url.startsWith("https://")) {
//         return url;
//     }

//     if (url.startsWith("/storage/")) {
//         return `https://admin.chanthuongchinhhinh.com.vn${url}`;
//     }

//     if (url.startsWith("storage/")) {
//         return `https://admin.chanthuongchinhhinh.com.vn/${url}`;
//     }

//     if (url.startsWith("/uploads/")) {
//         return `https://admin.chanthuongchinhhinh.com.vn/storage${url}`;
//     }

//     if (url.startsWith("uploads/")) {
//         return `https://admin.chanthuongchinhhinh.com.vn/storage/${url}`;
//     }

//     return `https://admin.chanthuongchinhhinh.com.vn/storage/${url}`;
// }

async function Contactus() {
    const setting = await getSetting();

    const contactHero = setting?.data?.contact_page_hero_clinic;
    const contactInfo = setting?.data?.contact_page_info_clinic;
    const contactLocations = setting?.data?.contact_page_locations_clinic;

    const bannerUrl = normalizeImageUrl(contactHero?.banner_hero);
    const mapIframe = contactInfo?.map_iframe;

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
                            <Connect data={contactInfo} />
                            <Getintouch data={contactInfo} />
                        </div>
                    </div>
                </section>

                <Alllocation data={contactLocations} />

                <div className="clearfix">
                    <div className="map-wrapper style-2">
                        {mapIframe ? (
                            <div dangerouslySetInnerHTML={{ __html: mapIframe }} />
                        ) : (
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d28891.193971348785!2d75.8546432!3d25.1559936!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1719221707984!5m2!1sen!2sin"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
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
                                    <p className="m-b0">
                                        {contactInfo?.address?.value ||
                                            "1234 Elm Street Springfield, IL 62704 USA"}
                                    </p>
                                </div>
                                <div className="dz-footer">
                                    <Link
                                        href="https://www.google.com/maps/"
                                        target="_blank"
                                        className="icon-link-hover-end"
                                    >
                                        Open Google Map
                                        <i className="feather icon-arrow-right" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}

export default Contactus;