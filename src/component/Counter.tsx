"use client";

import Image from "next/image";
import CountUp from "react-countup";
import { countupdata } from "../constant/alldata";
import { IMAGES } from "../constant/theme";

type CounterItem = {
    number?: string;
    label?: string;
};

type AvatarGroup = {
    text?: string;
    images?: string[];
};

type CounterData = {
    background?: string;
    avatar_group?: AvatarGroup;
    items?: CounterItem[];

    // fallback cho schema cũ nếu cần
    background_image?: string;
    avatar_title?: string;
    avatars?: string[];
    stats?: CounterItem[];
};

type CounterProps = {
    data?: CounterData;
};

function normalizeImageUrl(url?: string) {
    if (!url) return null;

    if (url.startsWith("http://") || url.startsWith("https://")) {
        return url;
    }

    if (url.startsWith("/storage/")) {
        return `${(process.env.NEXT_PUBLIC_BASE_URL || "").replace(/^https?:\/\//, (match) => match + "admin.")}${url}`;
    }

    if (url.startsWith("storage/")) {
        return `${(process.env.NEXT_PUBLIC_BASE_URL || "").replace(/^https?:\/\//, (match) => match + "admin.")}/${url}`;
    }

    if (url.startsWith("/uploads/")) {
        return `${(process.env.NEXT_PUBLIC_BASE_URL || "").replace(/^https?:\/\//, (match) => match + "admin.")}/storage${url}`;
    }

    if (url.startsWith("uploads/")) {
        return `${(process.env.NEXT_PUBLIC_BASE_URL || "").replace(/^https?:\/\//, (match) => match + "admin.")}/storage/${url}`;
    }

    return `${(process.env.NEXT_PUBLIC_BASE_URL || "").replace(/^https?:\/\//, (match) => match + "admin.")}/storage/${url}`;
}

function Counter({ data }: CounterProps) {
    const statsList =
        data?.items && data.items.length > 0
            ? data.items
            : data?.stats && data.stats.length > 0
                ? data.stats
                : countupdata.map((item) => ({
                    number: `${item.countup}${item.span || ""}`,
                    label: item.title,
                }));

    const avatarTitle =
        data?.avatar_group?.text ||
        data?.avatar_title ||
        "300+ Appointment Booking Confirm for this Week";

    const avatarImages =
        data?.avatar_group?.images && data.avatar_group.images.length > 0
            ? data.avatar_group.images
            : data?.avatars && data.avatars.length > 0
                ? data.avatars
                : [
                    IMAGES.smallavatar1,
                    IMAGES.smallavatar2,
                    IMAGES.smallavatar3,
                    IMAGES.smallavatar4,
                ];

    const backgroundImage =
        normalizeImageUrl(data?.background) ||
        normalizeImageUrl(data?.background_image) ||
        IMAGES.bg2.src;

    return (
        <section
            className="content-inner-3 bg-secondary background-blend-multiply bg-img-fix"
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center center",
            }}
        >
            <div className="container">
                <div className="row align-items-sm-center">

                    {/* Avatar block */}
                    <div className="col-lg-3 col-12 m-b30">
                        <div className="avatar-group m-b20 d-flex flex-wrap">
                            {avatarImages.slice(0, 4).map((avatar, index) => {
                                const src =
                                    typeof avatar === "string"
                                        ? normalizeImageUrl(avatar) || avatar
                                        : avatar;

                                return (
                                    <div
                                        key={index}
                                        className="avatar rounded-circle border border-white border-3 overflow-hidden"
                                    >
                                        <Image
                                            src={src}
                                            alt={`avatar-${index + 1}`}
                                            width={50}
                                            height={50}
                                            className="w-100 h-100 object-fit-cover"
                                        />
                                    </div>
                                );
                            })}
                        </div>

                        <h2 className="text-white font-20 m-b0 fw-medium">
                            {avatarTitle}
                        </h2>
                    </div>

                    {/* Stats block */}
                    <div className="col-lg-9 col-12">
                        <div className="row">
                            {statsList.map((item, i) => {
                                const rawNumber = item.number || "0";
                                const matched = rawNumber.match(/^(\d+)(.*)$/);
                                const endNumber = matched ? Number(matched[1]) : 0;
                                const suffix = matched ? matched[2] : rawNumber;

                                return (
                                    <div
                                        className="col-lg-3 col-6 m-b30 d-flex"
                                        key={i}
                                    >
                                        <div className="content-bx style-1 mx-auto">
                                            <span className="content-text text-white">
                                                <CountUp end={endNumber} duration={3} />
                                                {suffix}
                                            </span>
                                            <h3 className="title text-white m-b0">
                                                {item.label || ""}
                                            </h3>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}

export default Counter;