"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Link from "next/link";
import { awarddata, awardswiperdata } from "../constant/alldata";
import Image from "next/image";
import { useMemo, useState } from "react";

type AwardItem = {
    image?: string;
    title?: string;
    subtitle?: string;
    link_text?: string;
    year?: string;
};

type AwardsData = {
    title?: string;
    description?: string;
    years?: string[];
    items?: AwardItem[];
};

type AwardsProps = {
    data?: AwardsData;
};

function Awards({ data }: AwardsProps) {
    const [activeYear, setActiveYear] = useState<string>("all");

    const yearButtons = useMemo(() => {
        if (data?.years && data.years.length > 0) {
            return [...data.years, "all"];
        }

        return [...awarddata.map((item) => item.title), "all"];
    }, [data]);

    const allItems = useMemo(() => {
        if (data?.items && data.items.length > 0) {
            return data.items.map((item, index) => ({
                image: awardswiperdata[index]?.image || awardswiperdata[0]?.image,
                title: item.title || "ClinicMaster 2024",
                subtitle: item.subtitle || "Quality and Accreditation Institute",
                link_text: item.link_text || "Save the Children",
                year: item.year || "2024",
            }));
        }

        return awardswiperdata.map((item, index) => ({
            image: item.image,
            title: "ClinicMaster 2024",
            subtitle: "Quality and Accreditation Institute",
            link_text: "Save the Children",
            year: awarddata[index % awarddata.length]?.title || "2024",
        }));
    }, [data]);

    const filteredItems = useMemo(() => {
        if (activeYear === "all") return allItems;
        return allItems.filter((item) => item.year === activeYear);
    }, [allItems, activeYear]);

    return (
        <section className="content-inner-1 bg-light overflow-hidden">
            <div className="container-left">
                <div className="row g-0 align-items-center">
                    <div className="col-xxl-3">
                        <div className="section-head style-1 m-b30">
                            <h2
                                className="title wow fadeInUp"
                                data-wow-delay="0.2s"
                                data-wow-duration="0.8s"
                            >
                                {data?.title || "Awards"}
                            </h2>
                            <p
                                className="wow fadeInUp"
                                data-wow-delay="0.4s"
                                data-wow-duration="0.8s"
                            >
                                {data?.description ||
                                    "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."}
                            </p>
                        </div>

                        {yearButtons.map((year, i) => (
                            <button
                                type="button"
                                key={i}
                                onClick={() => setActiveYear(year)}
                                className={`btn btn-outline-light btn-rounded m-r5 m-b10 wow fadeInUp ${activeYear === year ? "active" : ""
                                    }`}
                                data-wow-delay={`${0.2 + i * 0.1}s`}
                                data-wow-duration="0.8s"
                                style={{ minWidth: "90px" }}
                            >
                                {year === "all" ? "View All" : year}
                            </button>
                        ))}
                    </div>

                    <div className="col-xxl-9">
                        <Swiper
                            className="swiper awards-swiper wow fadeInUp"
                            data-wow-delay="0.4s"
                            data-wow-duration="0.8s"
                            loop={filteredItems.length > 1}
                            slidesPerView={3}
                            autoplay={{
                                delay: 3000,
                            }}
                            breakpoints={{
                                1200: {
                                    slidesPerView: 3,
                                },
                                991: {
                                    slidesPerView: 2.5,
                                },
                                767: {
                                    slidesPerView: 2,
                                },
                                575: {
                                    slidesPerView: 1.5,
                                },
                                320: {
                                    slidesPerView: 1.2,
                                },
                            }}
                            modules={[Autoplay]}
                        >
                            {filteredItems.map((item, i) => (
                                <SwiperSlide key={i}>
                                    <div className="dz-img-box style-1 box-lg grid-bx text-center">
                                        <div className="dz-media">
                                            <Image
                                                src={item.image}
                                                alt={item.title || "Award"}
                                                width={300}
                                                height={300}
                                            />
                                        </div>
                                        <div className="dz-content">
                                            <h3 className="title">{item.title}</h3>
                                            <p>{item.subtitle}</p>
                                            <Link href={"#"} scroll={false} className="btn-link">
                                                {item.link_text}
                                            </Link>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </div>
        </section >
    );
}

export default Awards;