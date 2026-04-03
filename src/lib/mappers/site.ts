import {
    SiteCommonData,
    SiteConnectData,
    SiteFooterData,
    SiteSidebarData,
} from "@/types/site";

export function mapSiteToSidebarData(site?: SiteCommonData): SiteSidebarData | undefined {
    if (!site) return undefined;

    return {
        description: site.description || "Nội dung mô tả chưa cập nhật",
        contactTitle: site.sidebar_title_one || "Liên hệ",
        address: site.address_description || "Địa chỉ chưa cập nhật",
        email: site.email_description || "Email chưa cập nhật",
        phone: site.phone_description || "Số điện thoại chưa cập nhật",
        newsletterTitle: site.sidebar_title_two || "Nhận bản tin",
        emailPlaceholder: site.email_placeholder || "Nhập email",
        followTitle: site.sidebar_title_three || "Mạng xã hội",
    };
}

export function mapSiteToFooterData(site?: SiteCommonData): SiteFooterData | undefined {
    if (!site) return undefined;

    return {
        company: site.company || "ClinicMaster",
        description:
            site.description ||
            "ClinicMaster là hệ thống phòng khám chuyên sâu về chấn thương chỉnh hình, cơ xương khớp và phục hồi chức năng.",
        contactTitle: site.contact_title || "Kết nối với chúng tôi",
        contactDescription:
            site.contact_description ||
            "Luôn sẵn sàng tư vấn, hỗ trợ và đồng hành cùng bạn trong quá trình thăm khám và điều trị.",
        registerTitle: site.register_title || "Nhận thông tin mới từ chúng tôi",
        registerDescription:
            site.register_description ||
            "Đăng ký email để nhận các cập nhật mới nhất về lịch khám, dịch vụ và kiến thức sức khỏe hữu ích.",
        emailPlaceholder: site.email_placeholder || "Nhập địa chỉ email của bạn",
        copyright: site.copyright || "© 2026 ClinicMaster. Bảo lưu mọi quyền.",

        addressTitle: site.address_title || "Địa chỉ",
        address: site.address_description || "Địa chỉ chưa cập nhật",
        phoneTitle: site.phone_title || "Hotline",
        phone: site.phone_description || "Số điện thoại chưa cập nhật",
        emailTitle: site.email_title || "Email",
        email: site.email_description || "Email chưa cập nhật",

        addressIcon: site.address_icon || "feather icon-map-pin",
        phoneIcon: site.phone_icon || "feather icon-phone-call",
        emailIcon: site.email_icon || "feather icon-mail",
    };
}

export function mapSiteToConnectData(site?: SiteCommonData): SiteConnectData | undefined {
    if (!site) return undefined;

    return {
        title: site.contact_title || undefined,
        description: site.contact_description || undefined,
        address: {
            label: site.address_title || undefined,
            value: site.address_description || undefined,
        },
        phone: {
            label: site.phone_title || undefined,
            value: site.phone_description || undefined,
        },
        email: {
            label: site.email_title || undefined,
            value: site.email_description || undefined,
        },
        time: {
            label: site.time_title || undefined,
            value: site.time_description || undefined,
        },
        appointment_btn: {
            text: site.btn_appointment_title || undefined,
            link: site.btn_appointment_link || undefined,
        },
    };
}

export function mergeConnectData(
    primary?: SiteConnectData,
    fallback?: SiteConnectData
): SiteConnectData | undefined {
    if (!primary && !fallback) return undefined;

    return {
        title: primary?.title || fallback?.title,
        description: primary?.description || fallback?.description,
        stats_text: primary?.stats_text || fallback?.stats_text,
        rating: {
            score: primary?.rating?.score || fallback?.rating?.score,
            text: primary?.rating?.text || fallback?.rating?.text,
        },
        appointment_btn: {
            text: primary?.appointment_btn?.text || fallback?.appointment_btn?.text,
            link: primary?.appointment_btn?.link || fallback?.appointment_btn?.link,
        },
        address: {
            label: primary?.address?.label || fallback?.address?.label,
            value: primary?.address?.value || fallback?.address?.value,
        },
        phone: {
            label: primary?.phone?.label || fallback?.phone?.label,
            value: primary?.phone?.value || fallback?.phone?.value,
        },
        email: {
            label: primary?.email?.label || fallback?.email?.label,
            value: primary?.email?.value || fallback?.email?.value,
        },
        time: {
            label: primary?.time?.label || fallback?.time?.label,
            value: primary?.time?.value || fallback?.time?.value,
        },
    };
}