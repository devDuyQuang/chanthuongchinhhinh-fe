"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { IMAGES } from "../constant/theme";
import { Autoplay, Navigation } from "swiper/modules";
import Link from "next/link";
import "swiper/css/navigation";
import { testiswipeerdata } from "../constant/alldata";
import { Modal } from "react-bootstrap";
import { useMemo, useState } from "react";
import Image from "next/image";

type TestimonialItem = {
    name?: string;
    role?: string;
    title?: string;
    review?: string;
    video_link?: string;
    image?: string;
};

type TestimonialsData = {
    main_title?: string;
    main_image?: string;
    floating_review?: {
        name?: string;
        rating?: string;
        text?: string;
        avatar?: string;
    };
    achievement?: {
        number?: string;
        text?: string;
        avatars?: string[];
    };
    items?: TestimonialItem[];
};

type RealPatientProps = {
    data?: TestimonialsData;
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

function RealPatient({ data }: RealPatientProps) {
    const [show, setShow] = useState(false);
    const [videoUrl, setVideoUrl] = useState(
        "https://www.youtube.com/embed/o8OgzQdA70c?si=Kgb2auDFo3tH4oRZ"
    );

    const handleClose = () => setShow(false);

    const openVideo = (url?: string) => {
        if (url && url !== "#") {
            const embedUrl = convertYoutubeToEmbed(url);
            setVideoUrl(embedUrl);
        } else {
            setVideoUrl("https://www.youtube.com/embed/o8OgzQdA70c?si=Kgb2auDFo3tH4oRZ");
        }
        setShow(true);
    };

    const mainImage = normalizeImageUrl(data?.main_image);
    const floatingAvatar = normalizeImageUrl(data?.floating_review?.avatar);

    const achievementAvatars =
        data?.achievement?.avatars && data.achievement.avatars.length > 0
            ? data.achievement.avatars.map((item) => normalizeImageUrl(item) || item)
            : [
                IMAGES.smallavatar1,
                IMAGES.smallavatar2,
                IMAGES.smallavatar3,
                IMAGES.smallavatar4,
            ];

    const sliderItems = useMemo(() => {
        if (data?.items && data.items.length > 0) {
            return data.items.map((item, index) => ({
                name: item.name || testiswipeerdata[index]?.name || "Bệnh nhân",
                role: item.role || "Bệnh nhân",
                title: item.title || "Phản hồi điều trị",
                review:
                    item.review ||
                    "Bệnh nhân hài lòng với quá trình thăm khám và điều trị tại phòng khám.",
                video_link: item.video_link || "#",
                image:
                    normalizeImageUrl(item.image) ||
                    testiswipeerdata[index]?.image ||
                    testiswipeerdata[0].image,
            }));
        }

        return testiswipeerdata.map((item) => ({
            name: item.name,
            role: "Patient",
            title: "Best Treatment",
            review:
                "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
            video_link: "#",
            image: item.image,
        }));
    }, [data]);

    const ratingCount = Number(data?.floating_review?.rating || 5);
    const achievementNumber = data?.achievement?.number || "150k";
    const achievementText = data?.achievement?.text || "Patient recovers";

    console.log("testimonials data:", data);
    console.log("main image:", mainImage);
    console.log("floating avatar:", floatingAvatar);
    console.log("achievement avatars:", achievementAvatars);
    console.log("slider items:", sliderItems);

    return (
        <>
            <div className="container">
                <div className="row content-wrapper style-2">
                    <div className="col-xl-6">
                        <div className="content-media">
                            <div className="dz-media">
                                <Image
                                    src={mainImage || IMAGES.about2png}
                                    alt={data?.main_title || "Testimonials"}
                                    width={525}
                                    height={640}
                                    style={{
                                        width: "100%",
                                        height: "auto",
                                        objectFit: "cover",
                                    }}
                                    unoptimized={typeof mainImage === "string"}
                                />
                            </div>

                            <div
                                className="circle-wrapper"
                                data-bottom-top="transform: translateY(50px)"
                                data-top-bottom="transform: translateY(-50px)"
                            >
                                <span className="circle1">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </span>
                                <span className="circle2">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </span>
                            </div>

                            <div
                                className="item1"
                                data-bottom-top="transform: translateY(50px)"
                                data-top-bottom="transform: translateY(-50px)"
                            >
                                <div className="info-widget style-1 move-3">
                                    <div className="avatar-group">
                                        {achievementAvatars.slice(0, 4).map((avatar, index) => (
                                            <Image
                                                key={index}
                                                className="avatar rounded-circle avatar-sm border border-white border-2"
                                                src={avatar}
                                                alt={`achievement-avatar-${index + 1}`}
                                                width={50}
                                                height={50}
                                                unoptimized={typeof avatar === "string"}
                                            />
                                        ))}
                                    </div>

                                    <div className="clearfix ms-2">
                                        <span className="number text-primary">{achievementNumber}</span>
                                        <span>{achievementText}</span>
                                    </div>
                                </div>
                            </div>

                            <div
                                className="item2"
                                data-bottom-top="transform: translateY(50px)"
                                data-top-bottom="transform: translateY(-50px)"
                            >
                                <div className="info-widget style-3 move-1">
                                    <div className="widget-head">
                                        <div className="widget-media">
                                            <Image
                                                src={floatingAvatar || IMAGES.smallavatar5}
                                                alt={data?.floating_review?.name || "Review avatar"}
                                                width={50}
                                                height={50}
                                                unoptimized={typeof floatingAvatar === "string"}
                                            />
                                        </div>
                                        <div className="widget-content">
                                            <h6 className="title">
                                                {data?.floating_review?.name || "Nguyễn Văn Minh"}
                                            </h6>
                                            <ul className="star-list">
                                                {Array.from({ length: ratingCount }).map((_, i) => (
                                                    <li key={i}>
                                                        <i className="fa fa-star" />
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                    <p>
                                        “
                                        {data?.floating_review?.text ||
                                            "Tôi được bác sĩ tư vấn rất kỹ, quá trình điều trị hiệu quả và cảm thấy yên tâm trong suốt thời gian thăm khám."}
                                        ”
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-6 col-lg-10 align-self-center m-b30">
                        <div
                            className="section-head style-1 m-b30 wow fadeInUp"
                            data-wow-delay="0.2s"
                            data-wow-duration="0.7s"
                        >
                            <h2 className="title text-white m-b0">
                                {data?.main_title || "Real Patients, Real Stories. And our achievements"}
                            </h2>
                        </div>

                        <div
                            className="swiper-btn-center-lr wow fadeInUp"
                            data-wow-delay="0.4s"
                            data-wow-duration="0.7s"
                        >
                            <Swiper
                                className="swiper testimonial-swiper1"
                                slidesPerView={1}
                                spaceBetween={20}
                                loop={true}
                                autoplay={{
                                    delay: 3000,
                                }}
                                navigation={{
                                    nextEl: ".swiper1-button-next",
                                    prevEl: ".swiper1-button-prev",
                                }}
                                modules={[Navigation, Autoplay]}
                            >
                                {sliderItems.map((item, i) => (
                                    <SwiperSlide key={i}>
                                        <div className="testimonial-1 shadow-md">
                                            <div className="dz-media">
                                                <div className="media-inner">
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name || "Patient"}
                                                        width={320}
                                                        height={380}
                                                        style={{
                                                            width: "100%",
                                                            height: "auto",
                                                            objectFit: "cover",
                                                        }}
                                                        unoptimized={typeof item.image === "string"}
                                                    />
                                                    <Link
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            openVideo(item.video_link);
                                                        }}
                                                        href="#"
                                                        className="video-bx1 video-sm popup-youtube"
                                                    >
                                                        <div className="video-btn bg-primary">
                                                            <i className="fa fa-play" />
                                                        </div>
                                                        <span>Watch The Video</span>
                                                    </Link>
                                                </div>

                                                <div className="testimonial-info">
                                                    <h5 className="testimonial-name">{item.name}</h5>
                                                    <span className="testimonial-position">{item.role}</span>
                                                </div>
                                            </div>

                                            <div className="testimonial-detail">
                                                <div className="testimonial-text">
                                                    <h3 className="title">{item.title}</h3>
                                                    <p>{item.review}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>

                            <div className="swiper1-button-prev btn-prev" role="button">
                                <Image src={IMAGES.arrowleft} alt="" />
                            </div>
                            <div className="swiper1-button-next btn-next" role="button">
                                <Image src={IMAGES.arrowright} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={show} onHide={handleClose} centered>
                <iframe
                    width="560"
                    height="315"
                    src={videoUrl}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                ></iframe>
            </Modal>
        </>
    );
}

function convertYoutubeToEmbed(url: string): string {
    if (!url || url === "#") {
        return "https://www.youtube.com/embed/o8OgzQdA70c?si=Kgb2auDFo3tH4oRZ";
    }

    try {
        if (url.includes("youtube.com/watch?v=")) {
            const parsedUrl = new URL(url);
            const videoId = parsedUrl.searchParams.get("v");
            if (videoId) {
                return `https://www.youtube.com/embed/${videoId}`;
            }
        }

        if (url.includes("youtu.be/")) {
            const videoId = url.split("youtu.be/")[1]?.split("?")[0];
            if (videoId) {
                return `https://www.youtube.com/embed/${videoId}`;
            }
        }

        if (url.includes("/embed/")) {
            return url;
        }
    } catch {
        return "https://www.youtube.com/embed/o8OgzQdA70c?si=Kgb2auDFo3tH4oRZ";
    }

    return "https://www.youtube.com/embed/o8OgzQdA70c?si=Kgb2auDFo3tH4oRZ";
}

export default RealPatient;