"use client";

import { Accordion } from "react-bootstrap";
import { IMAGES } from "../constant/theme";
import Link from "next/link";
import { accordiondata } from "../constant/alldata";
import Image from "next/image";

type FAQItem = {
    question?: string;
    answer?: string;
    title?: string;
    content?: string;
};

type FAQData = {
    title?: string;
    description?: string;
    image?: string;
    contact?: {
        text?: string;
        phone?: string;
    };
    appointment_btn?: {
        text?: string;
        link?: string;
    };
    items?: FAQItem[];
    questions?: FAQItem[];
};

type FrequentlyProps = {
    data?: FAQData;
};

function normalizeImageUrl(url?: string) {
    if (!url) return null;

    if (url.startsWith("http://") || url.startsWith("https://")) {
        return url;
    }

    if (url.startsWith("/storage/")) {
        return `https://admin.chanthuongchinhhinh.com.vn${url}`;
    }

    if (url.startsWith("storage/")) {
        return `https://admin.chanthuongchinhhinh.com.vn/${url}`;
    }

    if (url.startsWith("/uploads/")) {
        return `https://admin.chanthuongchinhhinh.com.vn${url}`;
    }

    if (url.startsWith("uploads/")) {
        return `https://admin.chanthuongchinhhinh.com.vn/${url}`;
    }

    return `https://admin.chanthuongchinhhinh.com.vn/${url}`;
}

function normalizeAppointmentLink(link?: string) {
    if (!link || link === "/appointment") return "/dat-lich-kham";
    return link;
}

function Frequently({ data }: FrequentlyProps) {
    const rawFaqItems = data?.items || data?.questions || [];

    const faqItems =
        rawFaqItems.length > 0
            ? rawFaqItems.map((item, index) => ({
                key: String(index),
                delay: `${0.2 + index * 0.2}s`,
                title:
                    item.question ||
                    item.title ||
                    accordiondata[index]?.title ||
                    "Câu hỏi thường gặp",
                answer:
                    item.answer ||
                    item.content ||
                    "Nội dung đang được cập nhật.",
            }))
            : [
                {
                    key: "0",
                    delay: "0.2s",
                    title: "Quy trình đặt lịch khám như thế nào?",
                    answer:
                        "Bạn có thể đặt lịch trực tiếp trên website hoặc gọi hotline để được tư vấn và đặt lịch nhanh chóng.",
                },
                {
                    key: "1",
                    delay: "0.4s",
                    title: "Thời gian làm việc của phòng khám?",
                    answer:
                        "Phòng khám làm việc từ 8:00 đến 17:30 tất cả các ngày trong tuần, kể cả thứ 7 và chủ nhật.",
                },
                {
                    key: "2",
                    delay: "0.6s",
                    title: "Tôi có cần mang theo giấy tờ gì khi đi khám?",
                    answer:
                        "Bạn nên mang theo CCCD hoặc giấy tờ tùy thân và các hồ sơ bệnh án, phim chụp hoặc kết quả xét nghiệm trước đó nếu có.",
                },
                {
                    key: "3",
                    delay: "0.8s",
                    title: "Tôi có thể chọn bác sĩ khám không?",
                    answer:
                        "Bạn hoàn toàn có thể yêu cầu bác sĩ mong muốn khi đặt lịch. Đội ngũ tư vấn sẽ hỗ trợ sắp xếp phù hợp.",
                },
                {
                    key: "4",
                    delay: "1s",
                    title: "Chi phí khám và điều trị có được báo trước không?",
                    answer:
                        "Mọi chi phí sẽ được tư vấn rõ ràng trước khi thực hiện, đảm bảo minh bạch và phù hợp với từng trường hợp.",
                },
            ];

    const faqImage = normalizeImageUrl(data?.image);
    const appointmentLink = normalizeAppointmentLink(data?.appointment_btn?.link);

    console.log("faq data:", data);
    console.log("faq image:", faqImage);
    console.log("faq items:", faqItems);

    return (
        <section
            className="content-inner"
            style={{
                backgroundImage: `url(${IMAGES.bg3png.src})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right bottom",
            }}
        >
            <div className="container">
                <div className="row content-wrapper style-5">
                    <div className="col-xxl-7 col-xl-6 col-lg-5 m-b30 align-self-center">
                        <div className="content-info">
                            <div className="section-head style-1 m-b30">
                                <h2
                                    className="title wow fadeInUp"
                                    data-wow-delay="0.2s"
                                    data-wow-duration="0.7s"
                                >
                                    {data?.title || "Câu Hỏi Thường Gặp"}
                                </h2>
                                <p
                                    className="wow fadeInUp"
                                    data-wow-delay="0.4s"
                                    data-wow-duration="0.7s"
                                >
                                    {data?.description ||
                                        "Giải đáp những thắc mắc phổ biến của bệnh nhân về quá trình thăm khám, điều trị và đặt lịch tại phòng khám."}
                                </p>
                            </div>

                            <Accordion className="accordion dz-accordion style-1" defaultActiveKey="0">
                                {faqItems.map((item, i) => (
                                    <Accordion.Item
                                        eventKey={item.key}
                                        key={i}
                                        className="wow fadeInUp"
                                        data-wow-delay={item.delay}
                                        data-wow-duration="0.7s"
                                    >
                                        <Accordion.Header>{item.title}</Accordion.Header>
                                        <Accordion.Body>{item.answer}</Accordion.Body>
                                    </Accordion.Item>
                                ))}
                            </Accordion>
                        </div>
                    </div>

                    <div className="col-xxl-5 col-xl-6 col-lg-7 m-b30">
                        <div
                            className="content-media"
                            data-bottom-top="transform: translateY(50px)"
                            data-top-bottom="transform: translateY(-50px)"
                        >
                            <div className="dz-media">
                                <Image
                                    src={faqImage || IMAGES.about3}
                                    alt={data?.title || "FAQ"}
                                    width={700}
                                    height={850}
                                    style={{
                                        width: "100%",
                                        height: "auto",
                                        objectFit: "cover",
                                    }}
                                    unoptimized={typeof faqImage === "string"}
                                />
                            </div>

                            <div className="item1">
                                <div className="info-widget style-5">
                                    <div className="widget-media text-primary">
                                        <i className="feather icon-phone-call dz-ring-effect" />
                                    </div>
                                    <div className="widget-content">
                                        <h6 className="title">
                                            {data?.contact?.text || "Liên hệ với chúng tôi"}
                                        </h6>
                                        <Link
                                            href={`tel:${(data?.contact?.phone || "0901234567").replace(/\s+/g, "")}`}
                                            className="text-secondary"
                                        >
                                            {data?.contact?.phone || "0901 234 567"}
                                        </Link>
                                    </div>
                                </div>

                                <Link
                                    href={appointmentLink}
                                    className="btn btn-lg btn-icon btn-primary btn-shadow"
                                >
                                    <span className="w-100">
                                        {data?.appointment_btn?.text || "Đặt lịch ngay"}
                                    </span>
                                    <span className="right-icon">
                                        <i className="feather icon-arrow-right" />
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Frequently;