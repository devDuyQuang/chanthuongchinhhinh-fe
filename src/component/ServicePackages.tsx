"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { IMAGES } from "../constant/theme";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

interface ServiceItem {
    name?: string;
    price?: string;
    period?: string;
    btn_text?: string;
    btn_link?: string;
    features?: string[];
    image_url?: string;
}

interface ServicePlansData {
    title?: string;
    description?: string;
    features_pool?: string[];
    items?: ServiceItem[];
}

interface ServicePackageProps {
    data?: ServicePlansData;
}

function ServicePackage({ data }: ServicePackageProps) {
    const [active, setActive] = useState<number | null>(1);

    const ADMIN_URL = process.env.NEXT_PUBLIC_ADMIN_URL || "http://admin.localhost:8000";
    const defaultImage = "/assets/images/services/default-plan.jpg";

    // Hàm xử lý hiển thị ảnh
    const getFullImageUrl = (url: string | undefined) => {
        if (!url) return defaultImage;
        // Nếu đã có http/https thì trả về luôn, nếu không thì ghép với ADMIN_URL
        if (url.startsWith('http')) return url;
        // Đảm bảo không bị thừa dấu / khi ghép
        const cleanUrl = url.startsWith('/') ? url.substring(1) : url;
        return `${ADMIN_URL}/${cleanUrl}`;
    };

    // Lấy 8 item mới nhất từ mảng trả về (giả sử item mới nằm ở cuối mảng thì dùng slice(-8).reverse())
    // Hoặc đơn giản là lấy 8 item đầu tiên nếu backend đã sắp xếp
    const rawItems = data?.items || [];
    const latestItems = [...rawItems].slice(-8).reverse(); 

    const packages = latestItems.length > 0
        ? latestItems.map((item, index) => ({
            id: index + 1,
            delay: `${0.1 * (index + 1)}s`,
            image: getFullImageUrl(item.image_url),
            name: item.name || "Gói dịch vụ",
            price: item.price || "Liên hệ",
            period: item.period ? `/ ${item.period}` : "",
            buttonText: item.btn_text || "Chọn dịch vụ",
            buttonLink: item.btn_link || "#",
            features: item.features || []
        }))
        : [];

    return (
        <div className="row justify-content-center">
            <div
                className="col-12 swiper-btn-center-lr wow fadeInUp"
                data-wow-delay="0.4s"
                data-wow-duration="0.7s"
            >
                <Swiper
                    className="testimonial-swiper1"
                    modules={[Navigation, Autoplay]}
                    slidesPerView={4}
                    spaceBetween={30}
                    loop={packages.length > 4} // Chỉ loop nếu có đủ item
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    navigation={{
                        nextEl: ".swiper2-button-next",
                        prevEl: ".swiper2-button-prev",
                    }}
                    breakpoints={{
                        // Cấu hình responsive
                        320: { slidesPerView: 1, spaceBetween: 10 },
                        640: { slidesPerView: 2, spaceBetween: 20 },
                        1024: { slidesPerView: 3, spaceBetween: 20 },
                        1200: { slidesPerView: 4, spaceBetween: 30 },
                    }}
                >
                    {packages.map((item) => (
                        <SwiperSlide key={item.id}>
                            <div
                                className={`dz-team style-1 box-hover ${active === item.id ? "active" : ""}`}
                                onMouseEnter={() => setActive(item.id)}
                                style={{ margin: "15px 0" }} // Tạo khoảng cách để không bị cắt shadow khi hover
                            >
                                <div className="dz-media">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        width={300}
                                        height={335}
                                        style={{
                                            width: "100%",
                                            height: "335px",
                                            objectFit: "cover",
                                        }}
                                        unoptimized={true}
                                    />
                                    <Link href={item.buttonLink} className="btn btn-primary">
                                        <i className="feather icon-shopping-cart m-r5" /> {item.buttonText}
                                    </Link>
                                </div>

                                <div className="dz-content">
                                    <div className="clearfix">
                                        <h3 className="dz-name fs-6">
                                            <Link href={item.buttonLink}>{item.name}</Link>
                                        </h3>
                                        <span className="dz-position fs-5 text-primary">
                                            {item.price} <small className="text-muted fw-normal">{item.period}</small>
                                        </span>
                                    </div>

                                    {active === item.id && (
                                        <ul className="list-unstyled mt-2 mb-0 small text-muted animate__animated animate__fadeIn">
                                            {item.features.slice(0, 3).map((feat, idx) => (
                                                <li key={idx} className="text-truncate">
                                                    <i className="feather icon-check-circle text-success me-1"></i>
                                                    {feat}
                                                </li>
                                            ))}
                                        </ul>
                                    )}

                                    {/* <Link href={item.buttonLink} className="btn btn-square btn-secondary">
                                        <i className="feather icon-arrow-right" />
                                    </Link> */}
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                
                {/* Nút điều hướng nếu template của anh yêu cầu nằm ngoài Swiper tag */}
               <div className="swiper2-button-prev btn-prev" role="button">
                    <Image src={IMAGES.arrowleft} alt="" />
                </div>
                <div className="swiper2-button-next btn-next" role="button">
                    <Image src={IMAGES.arrowright} alt="" />
                </div>
            </div>
        </div>
    );
}

export default ServicePackage;