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
//                         src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d28891.193971348785!2d75.8546432!3d25.1559936!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1719221707984!5m2!1sen!2sin"                         
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

import Link from "next/link";
import PageBanner from "@/component/PageBanner";
import { IMAGES } from "@/constant/theme";
import Footer from "@/layout/Footer";
import Image from "next/image";

type ContactField = {
    label?: string;
    value?: string;
};

type ContactPageHeroClinic = {
    title?: string;
    image?: string;
    banner?: string;
    banner_hero?: string;
};

type ContactPageInfoClinic = {
    title?: string;
    description?: string;
    address?: ContactField;
    phone?: ContactField;
    email?: ContactField;
    opening_time?: ContactField;
};

type ContactLocationItem = {
    name?: string;
    address?: string;
    opening_time?: string;
};

type ContactPageLocationsClinic = {
    section_title?: string;
    items?: ContactLocationItem[];
    map_iframe?: string;
    map_link?: string;
    address?: string;
};

type SettingResponse = {
    success: boolean;
    message: string;
    data?: {
        contact_page_hero_clinic?: ContactPageHeroClinic | [];
        contact_page_info_clinic?: ContactPageInfoClinic | [];
        contact_page_locations_clinic?: ContactPageLocationsClinic | [];
    };
};

function normalizeImageUrl(url?: string | null) {
    if (!url) return null;

    if (url.startsWith("http://") || url.startsWith("https://")) {
        return url;
    }

    if (url.startsWith("/uploads/")) {
        return `https://admin.chanthuongchinhhinh.com.vn${url}`;
    }

    if (url.startsWith("uploads/")) {
        return `https://admin.chanthuongchinhhinh.com.vn/${url}`;
    }

    if (url.startsWith("/storage/")) {
        return `https://admin.chanthuongchinhhinh.com.vn${url}`;
    }

    if (url.startsWith("storage/")) {
        return `https://admin.chanthuongchinhhinh.com.vn/${url}`;
    }

    return `https://admin.chanthuongchinhhinh.com.vn/${url}`;
}


async function getSetting() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/setting`, {
            cache: "no-store",
        });

        if (!res.ok) return null;

        const result: SettingResponse = await res.json();
        return result?.data || null;
    } catch (error) {
        console.error("Lỗi lấy setting:", error);
        return null;
    }
}

async function Contactus() {
    const setting = await getSetting();

    const hero =
        setting?.contact_page_hero_clinic &&
            !Array.isArray(setting.contact_page_hero_clinic)
            ? setting.contact_page_hero_clinic
            : null;

    const info =
        setting?.contact_page_info_clinic &&
            !Array.isArray(setting.contact_page_info_clinic)
            ? setting.contact_page_info_clinic
            : null;

    const location =
        setting?.contact_page_locations_clinic &&
            !Array.isArray(setting.contact_page_locations_clinic)
            ? setting.contact_page_locations_clinic
            : null;

    const title = hero?.title || "Liên hệ";
    const bannerImage =
        normalizeImageUrl(hero?.image || hero?.banner || hero?.banner_hero) ||
        IMAGES.bnr1.src;

    const phoneLabel = info?.phone?.label || "Số điện thoại";
    const phoneValue = info?.phone?.value || "0901 234 567";

    const emailLabel = info?.email?.label || "Email";
    const emailValue = info?.email?.value || "info@chanthuongchinhhinh.com.vn";

    const addressLabel = info?.address?.label || "Địa chỉ";
    const addressValue =
        info?.address?.value || location?.address || "Địa chỉ đang được cập nhật";

    const description =
        info?.description ||
        "Phòng khám luôn sẵn sàng hỗ trợ tư vấn, giải đáp và đồng hành cùng bạn.";

    const mapLink = location?.map_link || "https://www.google.com/maps/";
    const mapIframe =
        location?.map_iframe ||
        "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d28891.193971348785!2d75.8546432!3d25.1559936!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1719221707984!5m2!1sen!2sin";

    return (
        <>
            <main className="page-content">
                <PageBanner title={title} bnrimage={bannerImage} />

                <section className="content-inner">
                    <div className="container">
                        <div className="text-center m-b40">
                            <h2>{info?.title || "Liên hệ với chúng tôi"}</h2>
                            <p>{description}</p>
                        </div>

                        <div className="row g-4">
                            <div className="col-md-4">
                                <div className="p-4 rounded-4 bg-light h-100">
                                    <h4>{phoneLabel}</h4>
                                    <p className="mb-0">
                                        <Link href={`tel:${phoneValue.replace(/\s+/g, "")}`}>
                                            {phoneValue}
                                        </Link>
                                    </p>
                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className="p-4 rounded-4 bg-light h-100">
                                    <h4>{emailLabel}</h4>
                                    <p className="mb-0">
                                        <Link href={`mailto:${emailValue}`}>{emailValue}</Link>
                                    </p>
                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className="p-4 rounded-4 bg-light h-100">
                                    <h4>{addressLabel}</h4>
                                    <p className="mb-0">{addressValue}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="clearfix">
                    <div className="map-wrapper style-2">
                        <iframe
                            src={mapIframe}
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />

                        <div className="container">
                            <div className="content-bx style-5 position-absolute wow fadeInUp">
                                <div className="content-logo">
                                    <Image src={IMAGES.logo} alt="logo" />
                                </div>
                                <div className="content-text">
                                    <p className="m-b0">{addressValue}</p>
                                </div>
                                <div className="dz-footer">
                                    <Link
                                        href={mapLink}
                                        target="_blank"
                                        className="icon-link-hover-end"
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

            <Footer />
        </>
    );
}

export default Contactus;