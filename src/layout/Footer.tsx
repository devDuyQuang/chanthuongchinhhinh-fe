"use client";
import Link from "next/link";
import { IMAGES } from "../constant/theme";
import { useRef } from "react";
import Image from "next/image";
import { useEmailService } from "@/constant/useEmailService";
import { SiteCommonData } from "@/types/site";
import { mapSiteToFooterData } from "@/lib/mappers/site";

// Định nghĩa Type cho Floating Info
export type SocialItem = {
    name: string;
    link: string;
    icon: string;
};

export type FloatingInfoData = {
    emergency_text?: string;
    emergency_link?: string;
    contact_phone?: string;
    contact_link?: string;
    socials?: SocialItem[];
};

type FooterProps = {
    settings?: {
        site?: SiteCommonData;
        floating_info?: FloatingInfoData; // Thay any bằng Type cụ thể
        site_assets_clinic?: any;
    };
};

function Footer({ settings }: FooterProps) {
    // LOG 1: Kiểm tra toàn bộ object settings nhận từ API
    //console.log("1. Full Settings nhận được:", settings);

    // LOG 2: Kiểm tra riêng key floating_info
    //console.log("2. Data của floating_info:", settings?.floating_info);

    // LOG 3: Kiểm tra xem socials có tồn tại bên trong không
    //console.log("3. Socials thô:", settings?.floating_info?.socials);

    const site = settings?.site;
    const footerData = mapSiteToFooterData(site);
    const site_assets_clinic = settings?.site_assets_clinic;
    const adminUrl = (process.env.NEXT_PUBLIC_BASE_URL || "").replace(/^https?:\/\//, (match) => match + "admin.");
    const logo = site_assets_clinic?.logo_black ? adminUrl.replace(/\/$/, "") + '/storage/' + site_assets_clinic?.logo_black : IMAGES.logo;

    // Xử lý dữ liệu floating_info an toàn
    let floatingData = settings?.floating_info;
    if (typeof floatingData === 'string') {
        try {
            floatingData = JSON.parse(floatingData);
        } catch (e) {
            console.error("Lỗi parse JSON floating_info:", e);
        }
    }

    const socials = floatingData?.socials || [];
    //console.log("4. Socials sau khi xử lý:", socials);

    const year = new Date().getFullYear();
    const form = useRef<HTMLFormElement | null>(null);
    const { sendEmail } = useEmailService();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!form.current) return;

        const result = await sendEmail(form.current);
        if (result.success) {
            console.log("SUCCESS!", result.message);
        } else {
            console.error("FAILED...", result.message);
        }
    };

    const footerContactCards = [
        {
            delay: "0.4s",
            icon: <i className={footerData?.addressIcon || "feather icon-map-pin"} />,
            title: footerData?.addressTitle || "Địa chỉ",
            paragraph: footerData?.address || "Phòng khám Chấn thương Chỉnh hình, Việt Nam",
        },
        {
            delay: "0.6s",
            icon: <i className={footerData?.phoneIcon || "feather icon-phone-call"} />,
            title: footerData?.phoneTitle || "Hotline",
            paragraph: footerData?.phone || "0901 234 567",
        },
        {
            delay: "0.8s",
            icon: <i className={footerData?.emailIcon || "feather icon-mail"} />,
            title: footerData?.emailTitle || "Email",
            paragraph: footerData?.email || `info@${process.env.NEXT_PUBLIC_BASE_URL}`,
        },
    ];

    const footerMenus = [
        {
            delay: "0.2s",
            title: "Thông Tin",
            links: [
                { text: "Trang chủ", href: "/" },
                { text: "Giới thiệu", href: "/gioi-thieu" },
                { text: "Dịch vụ", href: "/dich-vu" },
                { text: "Bác sĩ", href: "/bac-si" },
                { text: "Liên hệ", href: "/lien-he" },
            ],
        },
        {
            delay: "0.6s",
            title: "Hỗ Trợ",
            links: [
                { text: "Câu hỏi thường gặp", href: "/#faq" },
                { text: "Chính sách bảo mật", href: "#" },
                { text: "Điều khoản sử dụng", href: "#" },
                { text: "Hướng dẫn đặt lịch", href: "/dat-lich-kham" },
                { text: "Kiến thức y khoa", href: "/kien-thuc" },
            ],
        },
    ];

    return (
        <footer
            className="site-footer style-1 overlay-primary-light"
            style={{ backgroundImage: `url(${IMAGES.bg4.src})` }}
        >
            <div className="footer-head">
                <div className="container">
                    <div className="fh-inner">
                        <div className="row g-3 align-items-center">
                            <div
                                className="col-xl-3 col-md-12 col-sm-6 wow fadeInUp"
                                data-wow-delay="0.2s"
                                data-wow-duration="0.8s"
                            >
                                <h3 className="title fw-bold">
                                    {footerData?.contactTitle || "Kết nối với chúng tôi"}
                                </h3>
                                <p className="text">
                                    {footerData?.contactDescription ||
                                        "Luôn sẵn sàng tư vấn, hỗ trợ và đồng hành cùng bạn trong quá trình thăm khám và điều trị."}
                                </p>
                            </div>

                            {footerContactCards.map((item, i) => (
                                <div
                                    className="col-xl-3 col-md-4 col-sm-6 wow fadeInUp"
                                    data-wow-delay={item.delay}
                                    data-wow-duration="0.8s"
                                    key={i}
                                >
                                    <div className="icon-bx-wraper style-1">
                                        <div className="icon-bx bg-secondary">
                                            <span className="icon-cell">{item.icon}</span>
                                        </div>
                                        <div className="icon-content">
                                            <h5 className="dz-title fw-bold">{item.title}</h5>
                                            <p>{item.paragraph}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer-top">
                <div className="container">
                    <div className="row">
                        <div
                            className="col-xl-7 col-sm-12 pe-5 wow fadeInUp"
                            data-wow-delay="0.2s"
                            data-wow-duration="0.8s"
                        >
                            <div className="widget widget_about me-2">
                                <div className="footer-logo logo-white">
                                    <Link href="/">
                                        <Image src={logo} alt={footerData?.company || "DrDuongOrtho"} width={200} height={60} />
                                    </Link>
                                </div>

                                <p>
                                    <span className="text-primary">
                                        {footerData?.company || "DrDuongOrtho"}
                                    </span>{" "}
                                    {footerData?.description ||
                                        "là hệ thống phòng khám chuyên sâu về chấn thương chỉnh hình, cơ xương khớp và phục hồi chức năng. Chúng tôi hướng đến dịch vụ thăm khám rõ ràng, tận tâm và phù hợp với từng bệnh nhân."}
                                </p>


                                {/* PHẦN SOCIAL ICONS ĐÃ FIX */}
                                {socials?.length > 0 && (
                                    <div className="dz-social-icon style-1 mt-3">
                                        <ul className="d-flex align-items-center gap-2 list-unstyled p-0">
                                            {socials.map((social: SocialItem, index: number) => (
                                                <li key={index} className="wow fadeInUp" data-wow-delay={`${index * 0.1}s`}>
                                                    <Link
                                                        href={social.link || "#"}
                                                        target="_blank"
                                                        /* Kết hợp icon-bx-wraper và style-8 để lấy hiệu ứng hover của theme */
                                                        className="icon-bx-wraper box-hover d-flex align-items-center justify-content-center shadow-lg text-decoration-none"
                                                        style={{
                                                            width: '40px',
                                                            height: '40px',
                                                            borderRadius: '30%',
                                                            transition: 'all 0.3s ease',
                                                            border: 'none', // Bỏ border nếu theme style-8 có sẵn
                                                            backgroundColor: '#fff',
                                                        }}
                                                    >
                                                        <i className={social.icon} />
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="col-xl-5 col-sm-12 ps-xl-5">
                            <div className="row">
                                {footerMenus.map((menu, i) => (
                                    <div
                                        className="col-xl-6 col-md-6 wow fadeInUp"
                                        data-wow-delay={menu.delay}
                                        data-wow-duration="0.8s"
                                        key={i}
                                    >
                                        <div className="widget widget_services">
                                            <h2 className="footer-title fw-bold">{menu.title}</h2>
                                            <ul className="list-hover1 ps-2">
                                                {menu.links.map((link, idx) => (
                                                    <li key={idx}>
                                                        <Link href={link.href}>
                                                            <span>{link.text}</span>
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>


                    </div>
                </div>
            </div>

            <div className="footer-middle">
                <div className="container">
                    <div className="fm-inner">
                        <div className="row align-items-center g-lg-5 g-4">
                            <div
                                className="col-lg-6 wow fadeInUp"
                                data-wow-delay="0.2s"
                                data-wow-duration="0.8s"
                            >
                                <h2 className="title fw-bold">
                                    {footerData?.registerTitle || "Nhận thông tin mới từ chúng tôi"}
                                </h2>
                                <p>
                                    {footerData?.registerDescription ||
                                        "Đăng ký email để nhận các cập nhật mới nhất về lịch khám, dịch vụ và kiến thức sức khỏe hữu ích."}
                                </p>
                            </div>

                            <div
                                className="col-lg-6 wow fadeInUp"
                                data-wow-delay="0.4s"
                                data-wow-duration="0.8s"
                            >
                                <form className="dzSubscribe style-1" ref={form} onSubmit={handleSubmit}>
                                    <div className="dzSubscribeMsg"></div>
                                    <div className="form-group">
                                        <div className="input-group mb-0">
                                            <input
                                                name="dzEmail"
                                                required
                                                type="email"
                                                className="form-control"
                                                placeholder={
                                                    footerData?.emailPlaceholder || "Nhập địa chỉ email của bạn"
                                                }
                                            />
                                            <div className="input-group-addon">
                                                <button
                                                    name="submit"
                                                    value="Submit"
                                                    type="submit"
                                                    className="btn btn-primary btn-hover1"
                                                >
                                                    <span className="btn-text">Đăng ký ngay</span>
                                                    <span className="btn-icon">
                                                        <i className="fa-solid fa-paper-plane" />
                                                    </span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="container">
                    <div className="fb-inner">
                        <div className="row">
                            <div className="col-lg-6 col-md-12 text-start">
                                <p className="copyright-text">
                                    {footerData?.copyright ? (
                                        footerData.copyright
                                    ) : (
                                        <>
                                            © <span className="current-year">{year}</span>{" "}
                                            <Link href="/" target="_self">
                                                {footerData?.company || "DrDuongOrtho"}
                                            </Link>
                                            . Bảo lưu mọi quyền.
                                        </>
                                    )}
                                </p>
                            </div>

                            <div className="col-lg-6 col-md-12 text-end">
                                <div className="d-flex align-items-center justify-content-center justify-content-md-center justify-content-xl-end">
                                    <div className="widget-rating1">
                                        <Image src={IMAGES.google} alt="google" />
                                        <ul className="star-list">
                                            <li><i className="fa fa-star" /></li>
                                            <li><i className="fa fa-star" /></li>
                                            <li><i className="fa fa-star" /></li>
                                            <li><i className="fa fa-star" /></li>
                                            <li><i className="fa fa-star" /></li>
                                        </ul>
                                        <span className="rating">(4.8)</span>
                                        <span className="text">Hơn 12.000 đánh giá trên Google</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="item1">
                <div className="info-widget style-4">
                    <div className="widget-media">
                        <Image src={IMAGES.smallavatar6} alt="Hỗ trợ tư vấn" />
                    </div>
                    <div className="widget-content">
                        <h6 className="title">{footerData?.contactTitle || "Bạn cần hỗ trợ?"}</h6>
                        <Link
                            href={`mailto:${footerData?.email || `info@${process.env.NEXT_PUBLIC_BASE_URL}`}`}
                        >
                            {footerData?.email || `info@${process.env.NEXT_PUBLIC_BASE_URL}`}
                        </Link>
                        <br />
                        <span className="text">
                            {footerData?.company
                                ? `Đội ngũ tư vấn ${footerData.company}`
                                : "Đội ngũ tư vấn DrDuongOrtho"}
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;