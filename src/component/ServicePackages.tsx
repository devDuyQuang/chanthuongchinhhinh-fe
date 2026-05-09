"use client";

import { useState } from "react";
import Link from "next/link";

interface ServiceItem {
    name?: string;
    price?: string;
    period?: string;
    btn_text?: string;
    btn_link?: string;
    features?: string[];
}

interface ServicePackageProps {
    data?: {
        title?: string;
        description?: string;
        items?: ServiceItem[];
    };
}

const ServicePackages = ({ data }: ServicePackageProps) => {
    const [active, setActive] = useState(0);
    // Kiểm tra dữ liệu đầu vào
    if (!data || !data.items || data.items.length === 0) return null;

    // CHỈ LẤY 4 ITEM MỚI NHẤT
    const latestItems = data.items.slice(0, 4);

    return (
        <section className="content-inner bg-light">
            <div className="container">
                <div className="section-head style-1 m-b30 row align-items-center justify-content-between ">
                    <div
                        className="col-sm-7 wow fadeInUp"
                        data-wow-delay="0.2s"
                        data-wow-duration="0.8s"
                    >
                        <h2 className="title m-b0 fw-bold">
                            {data.title || "Gói dịch vụ điều trị"}
                        </h2>
                        <p className="max-w600">{data.description}</p>
                    </div>

                    <div
                        className="col-sm-5 text-sm-end d-sm-block d-none wow fadeInUp"
                        data-wow-delay="0.4s"
                        data-wow-duration="0.8s"
                    >
                        <Link
                            href="/dich-vu"
                            className="btn btn-icon btn-primary btn-shadow"
                        >
                            Xem tất cả
                            <span className="right-icon">
                                <i className="feather icon-arrow-right" />
                            </span>
                        </Link>
                    </div>
                </div>

                <div className="row justify-content-center">
                    {latestItems.map((item, index) => {
                        const isActive = active === index;
                        return (
                            <div 
                                className="col-xl-3 col-md-6 m-b30 wow fadeInUp" 
                                data-wow-delay={`${0.1 * (index + 1)}s`}
                                key={index}
                            >
                                <div 
                                    className={`icon-bx-wraper style-3 box-hover ${active === index ? "active" : ""}`}
                                    onMouseEnter={() => setActive(index)}
                                    style={{ minHeight: '400px', display: 'flex', flexDirection: 'column', transition: 'all 0.3s ease' }}
                                >
                                    <div className="icon-bx-head">
                                        {/* Phần hiển thị Giá thay cho Icon */}
                                        <div 
                                            className="icon-bx" 
                                            style={{ 
                                                width: 'auto', 
                                                height: '80px', 
                                                background: 'transparent',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'flex-start'
                                            }}
                                        >
                                            <div className="pricing-value">
                                                <h2 className="dz-title m-b15" style={{ fontSize: '21px', fontWeight: '700'}}>{item.name}</h2>
                                                <h3 className="m-b0" style={{ fontSize: '17px', fontWeight: '700', color: isActive ? '#031B4E' : '#00BDE0', }}>
                                                {item.price}<small style={{ fontSize: '14px', opacity: 0.6 }}>/{item.period}</small>
                                            </h3>
                                            </div>
                                        </div>

                                        {/* Nội dung gói */}
                                        <div className="icon-content">
                                            <ul className="list-check-2 primary m-b0">
                                                {item.features?.map((feature, fIndex) => (
                                                    <li key={fIndex} style={{ fontSize: '15px', marginBottom: '8px', textAlign: 'left', color: isActive ? '#ECF5FB' : '#161616ff',  }}>
                                                        {feature}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Footer chứa nút bấm */}
                                    <div className="icon-bx-footer" style={{ marginTop: 'auto' }}>
                                        <span className="text-badge text-uppercase" style={{ fontSize: '12px', fontWeight: '600' }}>
                                            <i className="fa fa-circle text-primary m-r5" /> 
                                            {item.btn_text || "Chọn dịch vụ"}
                                        </span>
                                        <Link 
                                            href={item.btn_link || "#"} 
                                            className="btn btn-square btn-primary rounded-circle"
                                        >
                                            <i className="feather icon-arrow-up-right" />
                                        </Link>
                                    </div>
                                    
                                    {/* Lớp nền mờ tạo chiều sâu giống ServiceBox gốc */}
                                    <span className="icon-bg d-flex align-items-center justify-content-center" style={{ fontSize: '100px', fontWeight: '900', opacity: 0.09, pointerEvents: 'none' }}>
                                        {index + 1}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default ServicePackages;