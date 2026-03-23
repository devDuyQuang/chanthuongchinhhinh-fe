// import PageBanner from "@/component/PageBanner";
// import { IMAGES } from "@/constant/theme";
// import Footer from "@/layout/Footer";
// import Header from "@/layout/Header";
// import ServiceBox from "@/component/ServiceBox";
// import Whychoose from "@/component/WhyChoose";
// import Pricing from "@/component/Pricing";
// import RealPatient from "@/component/RealPatient";
// import Frequently from "@/component/Frequently";

// function Services() {
//     return (
//         <>
//             <main className="page-content">
//                 <PageBanner title="Services" bnrimage={IMAGES.bnr2.src} />
//                 <section className="content-inner bg-light" style={{ backgroundImage: `url(${IMAGES.bg5png.src})` }}>
//                     <div className="container">
//                         <ServiceBox />
//                     </div>
//                 </section>
//                 <section className="content-inner overlay-secondary-dark background-blend-luminosity bg-img-fix overflow-hidden" style={{ backgroundImage: `URL(${IMAGES.bg1.src})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'right center' }}>
//                     <div className="container">
//                         <Whychoose />
//                     </div>
//                 </section>
//                 <section className="content-inner">
//                     <div className="container">
//                         <div className="section-head style-1 text-center">
//                             <h2 className="title wow fadeInUp" data-wow-delay="0.2s" data-wow-duration="0.7s">Choose Your Optimal Plan</h2>
//                             <p className="wow fadeInUp" data-wow-delay="0.4s" data-wow-duration="0.7s">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
//                         </div>
//                         <Pricing />
//                     </div>
//                 </section>
//                 <section className="clearfix p-t50 overlay-secondary-dark bg-primary background-blend-multiply overflow-hidden" style={{ backgroundImage: `url(${IMAGES.bg3.src})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right center', backgroundSize: 'cover' }}>
//                     <RealPatient />
//                 </section>
//                 <Frequently />
//             </main>
//             <Footer />
//         </>
//     );
// }
// export default Services;


import PageBanner from "@/component/PageBanner";
import { IMAGES } from "@/constant/theme";
import Footer from "@/layout/Footer";
import ServiceBox from "@/component/ServiceBox";

type PostItem = {
    id: number;
    name?: string;
    slug?: string;
    image?: string | null;
    description?: string | null;
};

type PostListResponse = {
    success: boolean;
    message: string;
    data?: {
        current_page?: number;
        data?: PostItem[];
    };
};

type ServiceHeroClinic = {
    title?: string;
    image?: string;
    banner?: string;
    banner_hero?: string;
};

type ServicePlanItem = {
    name?: string;
    price?: string;
    duration?: string;
    button_text?: string;
    button_link?: string;
    features?: string[];
};

type ServicePlansClinic = {
    title?: string;
    description?: string;
    features_pool?: string[];
    items?: ServicePlanItem[];
};

type SettingResponse = {
    success: boolean;
    message: string;
    data?: {
        service_hero_clinic?: ServiceHeroClinic | [];
        service_plans_clinic?: ServicePlansClinic | [];
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

async function getPosts(): Promise<PostItem[]> {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/post?limit=12&sort_name=id&sort_by=desc&name=`,
            {
                cache: "no-store",
            }
        );

        if (!res.ok) {
            throw new Error(`Fetch posts failed: ${res.status}`);
        }

        const result: PostListResponse = await res.json();
        return result?.data?.data || [];
    } catch (error) {
        console.error("Lỗi lấy danh sách bài viết:", error);
        return [];
    }
}

async function getSetting() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/setting`, {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error(`Fetch setting failed: ${res.status}`);
        }

        const result: SettingResponse = await res.json();
        return result?.data || null;
    } catch (error) {
        console.error("Lỗi lấy setting:", error);
        return null;
    }
}

async function Services() {
    const [posts, setting] = await Promise.all([getPosts(), getSetting()]);

    const serviceHero =
        setting?.service_hero_clinic &&
            !Array.isArray(setting.service_hero_clinic)
            ? setting.service_hero_clinic
            : null;

    const servicePlans =
        setting?.service_plans_clinic &&
            !Array.isArray(setting.service_plans_clinic)
            ? setting.service_plans_clinic
            : null;

    const serviceItems = posts.map((post) => ({
        title: post.name || "Dịch vụ",
        description: post.description || "Nội dung dịch vụ đang được cập nhật.",
        doctor_text: "Xem chi tiết",
        link: post.slug ? `/${post.slug}` : "#",
        image: post.image || null,
    }));

    const bannerTitle = serviceHero?.title || "Dịch vụ";
    const bannerImage =
        normalizeImageUrl(
            serviceHero?.banner_hero || serviceHero?.image || serviceHero?.banner
        ) || IMAGES.bnr2.src;

    return (
        <>
            <main className="page-content">
                <PageBanner title={bannerTitle} bnrimage={bannerImage} />

                <section
                    className="content-inner bg-light"
                    style={{ backgroundImage: `url(${IMAGES.bg5png.src})` }}
                >
                    <div className="container">
                        <ServiceBox data={{ items: serviceItems }} useFallback={false} />
                    </div>
                </section>

                {servicePlans &&
                    ((servicePlans.items && servicePlans.items.length > 0) ||
                        (servicePlans.features_pool && servicePlans.features_pool.length > 0)) && (
                        <section className="content-inner">
                            <div className="container">
                                <div className="section-head style-1 text-center">
                                    <h2 className="title">
                                        {servicePlans.title || "Gói dịch vụ điều trị"}
                                    </h2>
                                    <p>
                                        {servicePlans.description ||
                                            "Lựa chọn gói dịch vụ phù hợp với nhu cầu thăm khám và điều trị của bạn."}
                                    </p>
                                </div>

                                {servicePlans.features_pool &&
                                    servicePlans.features_pool.length > 0 && (
                                        <div className="m-b30">
                                            <ul className="list-check-circle row">
                                                {servicePlans.features_pool.map((feature, index) => (
                                                    <li
                                                        key={index}
                                                        className="col-lg-3 col-md-6 m-b10"
                                                    >
                                                        {feature}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                {servicePlans.items && servicePlans.items.length > 0 && (
                                    <div className="row">
                                        {servicePlans.items.map((item, index) => (
                                            <div
                                                key={index}
                                                className="col-lg-4 col-md-6 m-b30"
                                            >
                                                <div className="p-4 rounded-4 bg-light border h-100">
                                                    <h3 className="m-b10">
                                                        {item.name || "Gói dịch vụ"}
                                                    </h3>

                                                    {item.price && (
                                                        <h4 className="text-primary m-b10">
                                                            {item.price}
                                                        </h4>
                                                    )}

                                                    {item.duration && (
                                                        <p className="m-b15">{item.duration}</p>
                                                    )}

                                                    {item.features && item.features.length > 0 && (
                                                        <ul className="list-check-circle m-b20">
                                                            {item.features.map((feature, fIndex) => (
                                                                <li key={fIndex}>{feature}</li>
                                                            ))}
                                                        </ul>
                                                    )}

                                                    <a
                                                        href={item.button_link || "/dat-lich-kham"}
                                                        className="btn btn-primary"
                                                    >
                                                        {item.button_text || "Đặt lịch ngay"}
                                                    </a>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </section>
                    )}
            </main>

            <Footer />
        </>
    );
}

export default Services;