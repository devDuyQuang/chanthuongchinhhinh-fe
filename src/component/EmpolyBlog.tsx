"use client";

import { useState } from "react";
import Link from "next/link";
import { empolydata } from "../constant/alldata";
import Image from "next/image";
import { normalizeImageUrl } from "@/lib/normalizeImageUrl";

type SpecialistItem = {
    name?: string;
    specialty?: string;
    button_text?: string;
    button_link?: string;
    image?: string;
    socials?: {
        linkedin?: string | null;
        facebook?: string | null;
        twitter?: string | null;
        youtube?: string | null;
    };
};

type SpecialistsData = {
    items?: SpecialistItem[];
};

type EmpolyBlogProps = {
    data?: SpecialistsData;
};

// function normalizeImageUrl(url?: string) {
//     if (!url) return null;

//     if (url.startsWith("http://") || url.startsWith("https://")) {
//         return url;
//     }

//     if (url.startsWith("/storage/")) {
//         return `${(process.env.NEXT_PUBLIC_BASE_URL || "").replace(/^https?:\/\//, (match) => match + "admin.")}${url}`;
//     }

//     if (url.startsWith("storage/")) {
//         return `${(process.env.NEXT_PUBLIC_BASE_URL || "").replace(/^https?:\/\//, (match) => match + "admin.")}/${url}`;
//     }

//     if (url.startsWith("/uploads/")) {
//         return `${(process.env.NEXT_PUBLIC_BASE_URL || "").replace(/^https?:\/\//, (match) => match + "admin.")}${url}`;
//     }

//     if (url.startsWith("uploads/")) {
//         return `${(process.env.NEXT_PUBLIC_BASE_URL || "").replace(/^https?:\/\//, (match) => match + "admin.")}/${url}`;
//     }

//     return `${(process.env.NEXT_PUBLIC_BASE_URL || "").replace(/^https?:\/\//, (match) => match + "admin.")}/${url}`;
// }

function EmpolyBlog({ data }: EmpolyBlogProps) {
    const [active, setActive] = useState(1);

    const doctors =
        data?.items && data.items.length > 0
            ? data.items.map((item, index) => ({
                id: index + 1,
                delay: empolydata[index]?.delay || `${0.2 * (index + 1)}s`,
                image:
                    normalizeImageUrl(item.image) ||
                    empolydata[index]?.image ||
                    empolydata[0].image,
                title: item.name || empolydata[index]?.title || "Tên bác sĩ",
                position:
                    item.specialty || empolydata[index]?.position || "Chuyên khoa",
                buttonText: item.button_text || "Xem chi tiết",
                buttonLink:
                    !item.button_link || item.button_link === "/team-detail"
                        ? "/chi-tiet-bac-si"
                        : item.button_link,
                socials: {
                    linkedin: item.socials?.linkedin || "#",
                    facebook: item.socials?.facebook || "#",
                    twitter: item.socials?.twitter || "#",
                    youtube: item.socials?.youtube || "#",
                },
            }))
            : empolydata.slice(0, empolydata.length - 4).map((item) => ({
                id: item.id,
                delay: item.delay,
                image: item.image,
                title: item.title,
                position: item.position,
                buttonText: "Xem chi tiết",
                buttonLink: "/chi-tiet-bac-si",
                socials: {
                    linkedin: "https://www.linkedin.com/showcase/dexignzone",
                    facebook: "https://www.facebook.com/dexignzone",
                    twitter: "https://x.com/dexignzone",
                    youtube: "https://www.youtube.com/@dexignzone",
                },
            }));

    // console.log("specialists data:", data);
    // console.log("mapped doctors:", doctors);

    return (
        <div className="row">
            {doctors.map((item, i) => (
                <div
                    className="col-xl-3 col-sm-6 wow fadeInUp"
                    data-wow-delay={item.delay}
                    data-wow-duration="0.8s"
                    key={i}
                >
                    <div
                        className={`dz-team style-1 box-hover ${active === item.id ? "active" : ""}`}
                        onMouseEnter={() => setActive(item.id)}
                    >
                        <div className="dz-media">
                            <Image
                                src={item.image}
                                alt={item.title}
                                width={300}
                                height={335}
                                style={{
                                    width: "100%",
                                    height: "auto",
                                    objectFit: "cover",
                                }}
                                unoptimized={typeof item.image === "string"}
                            />
                            <Link href={item.buttonLink} className="btn btn-primary">
                                <i className="feather icon-calendar m-r5" /> {item.buttonText}
                            </Link>
                        </div>

                        <div className="dz-content">
                            <div className="clearfix">
                                <h3 className="dz-name">
                                    <Link href={item.buttonLink}>{item.title}</Link>
                                </h3>
                                <span className="dz-position">{item.position}</span>
                            </div>

                            <Link href={item.buttonLink} className="btn btn-square btn-secondary">
                                <i className="feather icon-arrow-right" />
                            </Link>
                        </div>

                        <ul className="dz-social">
                            <li>
                                <Link href={item.socials.linkedin || "#"} target="_blank" rel="nofollow">
                                    <i className="fa-brands fa-linkedin" />
                                </Link>
                            </li>
                            <li>
                                <Link href={item.socials.facebook || "#"} target="_blank" rel="nofollow">
                                    <i className="fa-brands fa-facebook-f" />
                                </Link>
                            </li>
                            <li>
                                <Link href={item.socials.twitter || "#"} target="_blank" rel="nofollow">
                                    <i className="fa-brands fa-x-twitter" />
                                </Link>
                            </li>
                            <li>
                                <Link href={item.socials.youtube || "#"} target="_blank" rel="nofollow">
                                    <i className="fa-brands fa-youtube" />
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default EmpolyBlog;