"use client";

import Link from "next/link";
import { IMAGES } from "../constant/theme";
import CountUp from "react-countup";
import { howitworkdata } from "../constant/alldata";
import Image from "next/image";

type HowItWorkFeature = {
    icon_class?: string;
    title?: string;
};

type HowItWorkStat = {
    number?: string;
    label?: string;
};

type HowItWorkData = {
    title?: string;
    description?: string;
    image?: string;
    appointment_btn?: {
        text?: string;
        link?: string;
    };
    features?: HowItWorkFeature[];
    stats?: HowItWorkStat[];
};

type HowitworkProps = {
    data?: HowItWorkData;
};

function Howitwork({ data }: HowitworkProps) {
    const features =
        data?.features && data.features.length > 0
            ? data.features.map((item, index) => ({
                title: item.title || howitworkdata[index]?.title || "Bước thực hiện",
                iconClass:
                    item.icon_class ||
                    (index === 0
                        ? "feather icon-clock"
                        : index === 1
                            ? "flaticon-list"
                            : index === 2
                                ? "flaticon-stethoscope"
                                : "flaticon-hand-holding-usd"),
                delay: `${0.2 * (index + 1)}s`,
            }))
            : howitworkdata.map((item, index) => ({
                title: item.title,
                iconClass:
                    index === 0
                        ? "feather icon-clock"
                        : index === 1
                            ? "flaticon-list"
                            : index === 2
                                ? "flaticon-stethoscope"
                                : "flaticon-hand-holding-usd",
                delay: item.delay,
            }));

    const stats =
        data?.stats && data.stats.length > 0
            ? data.stats
            : [
                { number: "180+", label: "Specialists" },
                { number: "45K", label: "Happy Patients" },
            ];

    const firstStat = stats[0] || { number: "180+", label: "Specialists" };
    const secondStat = stats[1] || { number: "45K", label: "Happy Patients" };

    const parseCount = (value?: string) => {
        const raw = value || "0";
        const matched = raw.match(/^(\d+)(.*)$/);
        return {
            end: matched ? Number(matched[1]) : 0,
            suffix: matched ? matched[2] : "",
        };
    };

    const firstCount = parseCount(firstStat.number);
    const secondCount = parseCount(secondStat.number);

    return (
        <section className="content-inner">
            <div className="container">
                <div className="row content-wrapper style-3">
                    <div className="col-xl-4 m-b30 pe-xl-4">
                        <div className="section-head style-1 m-b30">
                            <h2
                                className="title m-b0 wow fadeInUp"
                                data-wow-delay="0.2s"
                                data-wow-duration="0.8s"
                            >
                                {data?.title || "How it work"}
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

                        <div className="row">
                            {features.map((item, i) => (
                                <div
                                    className="col-xl-12 col-md-6 wow fadeInUp"
                                    data-wow-delay={item.delay}
                                    data-wow-duration="0.8s"
                                    key={i}
                                >
                                    <div className="icon-bx-wraper style-2 m-b20">
                                        <div className="icon-bx">
                                            <span className="icon-cell">
                                                <i className={item.iconClass} />
                                            </span>
                                        </div>
                                        <div className="icon-content">
                                            <h3 className="dz-title">{item.title}</h3>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="col-xl-8">
                        <div className="content-media">
                            <div className="dz-media">
                                <Image src={IMAGES.about4} alt={data?.title || "How it work"} />
                                <div className="dz-btn">
                                    <Link
                                        href={data?.appointment_btn?.link || "/appointment"}
                                        className="btn btn-lg btn-icon btn-secondary btn-shadow"
                                    >
                                        {data?.appointment_btn?.text || "Appointment"}
                                        <span className="right-icon">
                                            <i className="feather icon-arrow-right" />
                                        </span>
                                    </Link>
                                </div>
                            </div>

                            <div
                                className="item1"
                                data-bottom-top="transform: translateY(30px)"
                                data-top-bottom="transform: translateY(-30px)"
                            >
                                <div className="info-widget style-8 bg-primary">
                                    <div className="row g-0">
                                        <div className="col-6 d-flex">
                                            <div className="content-bx style-1 m-auto text-center">
                                                <span className="content-text text-white">
                                                    <span className="counter">
                                                        <CountUp end={firstCount.end} duration={5} />
                                                    </span>
                                                    {firstCount.suffix}
                                                </span>
                                                <h3 className="title text-white m-b0">
                                                    {firstStat.label || "Specialists"}
                                                </h3>
                                            </div>
                                        </div>

                                        <div className="col-6 d-flex">
                                            <div className="content-bx style-1 m-auto text-center">
                                                <span className="content-text text-white">
                                                    <span className="counter">
                                                        <CountUp end={secondCount.end} duration={5} />
                                                    </span>
                                                    {secondCount.suffix}
                                                </span>
                                                <h3 className="title text-white m-b0">
                                                    {secondStat.label || "Happy Patients"}
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}

export default Howitwork;