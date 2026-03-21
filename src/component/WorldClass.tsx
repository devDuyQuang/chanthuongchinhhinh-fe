import Link from "next/link";
import Image from "next/image";
import { IMAGES } from "../constant/theme";
import { worldclasslistdata } from "../constant/alldata";

type OpenHourItem = {
    day?: string;
    time?: string;
};

type WorldClassData = {
    title?: string;
    description?: string;
    button_text?: string;
    button_link?: string;
    phone?: string;
    image_one?: string;
    image_two?: string;
    open_hours?: OpenHourItem[];
    utilities?: string[];
};

type WorldClassProps = {
    data?: WorldClassData;
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
        return `https://admin.chanthuongchinhhinh.com.vn/storage${url}`;
    }

    if (url.startsWith("uploads/")) {
        return `https://admin.chanthuongchinhhinh.com.vn/storage/${url}`;
    }

    return `https://admin.chanthuongchinhhinh.com.vn/storage/${url}`;
}

function WorldClass({ data }: WorldClassProps) {
    const featureList =
        data?.utilities && data.utilities.length > 0
            ? data.utilities.map((item) => ({ title: item }))
            : worldclasslistdata;

    const openHours = data?.open_hours || [
        { day: "Monday", time: "09:30 - 07:30" },
        { day: "Tuesday", time: "09:30 - 07:30" },
        { day: "Wednesday", time: "09:30 - 07:30" },
        { day: "Thursday", time: "09:30 - 07:30" },
        { day: "Friday", time: "09:30 - 07:30" },
        { day: "Saturday", time: "09:30 - 07:30" },
    ];

    const imageOne = normalizeImageUrl(data?.image_one) || IMAGES.about2;
    const imageTwo = normalizeImageUrl(data?.image_two) || IMAGES.about1;

    return (
        <div className="row content-wrapper style-1 align-items-center">
            <div className="col-xl-6 m-b30">
                <div className="content-media">
                    <div className="dz-media worldclass-image-large">
                        <Image
                            src={imageTwo}
                            alt={data?.title || "Facility image"}
                            fill
                            className="worldclass-img-cover"
                            sizes="(max-width: 1200px) 100vw, 50vw"
                        />
                    </div>

                    <div
                        className="item1"
                        data-bottom-top="transform: translateY(-50px)"
                        data-top-bottom="transform: translateY(50px)"
                    >
                        <div className="info-widget style-7">
                            <div className="widget-content bg-secondary">
                                Hỗ trợ cuộc gọi video
                            </div>

                            <div className="widget-media worldclass-image-small">
                                <Image
                                    src={imageOne}
                                    alt={data?.title || "Facility support image"}
                                    fill
                                    className="worldclass-img-contain"
                                    sizes="300px"
                                />

                                <div className="call-widget">
                                    <Link href={"#"} scroll={false}>
                                        <Image src={IMAGES.camerasvg} alt="" />
                                    </Link>
                                    <Link href={"#"} scroll={false}>
                                        <Image src={IMAGES.massagesvg} alt="" />
                                    </Link>
                                    <Link href={"#"} scroll={false} className="active">
                                        <Image src={IMAGES.callsvg} alt="" />
                                    </Link>
                                    <Link href={"#"} scroll={false}>
                                        <Image src={IMAGES.mikesvg} alt="" />
                                    </Link>
                                    <Link href={"#"} scroll={false}>
                                        <Image src={IMAGES.videosvg} alt="" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                        className="item2"
                        data-bottom-top="transform: translateY(50px)"
                        data-top-bottom="transform: translateY(-50px)"
                    >
                        <div className="info-widget style-6 bg-primary">
                            <div className="info-icon bg-secondary">
                                <Image src={IMAGES.clocksvg} alt="" />
                            </div>

                            <div className="widget-content">
                                <h4 className="title">Open Hours</h4>
                                <ul>
                                    {openHours.map((item, index) => (
                                        <li key={index}>
                                            {item.day} <strong>{item.time}</strong>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-xl-6 m-b30">
                <div className="section-head style-1 m-b30">
                    <h2
                        className="title wow fadeInUp"
                        data-wow-delay="0.2s"
                        data-wow-duration="0.8s"
                    >
                        {data?.title || "World ClassName Patient Facilities Designed for You"}
                    </h2>

                    <p
                        className="wow fadeInUp"
                        data-wow-delay="0.4s"
                        data-wow-duration="0.8s"
                    >
                        {data?.description ||
                            "Experience the future of healthcare. Our state-of-the-art facilities are equipped with the latest technology, ensuring you receive the world's best quality treatment. Here, cutting-edge tools meet unparalleled expertise, providing a comfortable and effective path to optimal health."}
                    </p>
                </div>

                <ul
                    className="list-check text-secondary grid-2 fw-medium m-b30 wow fadeInUp"
                    data-wow-delay="0.6s"
                    data-wow-duration="0.8s"
                >
                    {featureList.map((item, i) => (
                        <li key={i}>{item.title}</li>
                    ))}
                </ul>

                <div
                    className="d-flex flex-wrap align-items-center wow fadeInUp"
                    data-wow-delay="0.8s"
                    data-wow-duration="0.8s"
                >
                    <Link
                        href={data?.button_link || "/appointment"}
                        className="btn btn-lg btn-icon btn-secondary btn-shadow m-r30 mb-3 mb-sm-0"
                    >
                        {data?.button_text || "Appointment"}
                        <span className="right-icon">
                            <i className="feather icon-arrow-right" />
                        </span>
                    </Link>

                    <div className="info-widget style-5">
                        <div className="widget-media text-primary">
                            <i className="feather icon-phone-call dz-ring-effect" />
                        </div>

                        <div className="widget-content">
                            <h6 className="title">Liên hệ với chúng tôi</h6>
                            <Link
                                href={`tel:${(data?.phone || "+11234567890").replace(/\s+/g, "")}`}
                                className="text-secondary"
                            >
                                {data?.phone || "+1 123 456 7890"}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WorldClass;





// import Link from "next/link";
// import Image from "next/image";
// import { IMAGES } from "../constant/theme";
// import { worldclasslistdata } from "../constant/alldata";

// type OpenHourItem = {
//     day?: string;
//     time?: string;
// };

// type WorldClassData = {
//     title?: string;
//     description?: string;
//     button_text?: string;
//     button_link?: string;
//     phone?: string;
//     open_hours?: OpenHourItem[];
//     utilities?: string[];
// };

// type WorldClassProps = {
//     data?: WorldClassData;
// };

// function WorldClass({ data }: WorldClassProps) {
//     const featureList =
//         data?.utilities && data.utilities.length > 0
//             ? data.utilities.map((item) => ({ title: item }))
//             : worldclasslistdata;

//     const openHours = data?.open_hours || [
//         { day: "Monday", time: "09:30 - 07:30" },
//         { day: "Tuesday", time: "09:30 - 07:30" },
//         { day: "Wednesday", time: "09:30 - 07:30" },
//         { day: "Thursday", time: "09:30 - 07:30" },
//         { day: "Friday", time: "09:30 - 07:30" },
//         { day: "Saturday", time: "09:30 - 07:30" },
//     ];

//     return (
//         <>
//             <div className="row content-wrapper style-1 align-items-center">
//                 <div className="col-xl-6 m-b30">
//                     <div className="content-media">
//                         <div className="dz-media">
//                             <Image src={IMAGES.about1} alt="" />
//                         </div>

//                         <div
//                             className="item1"
//                             data-bottom-top="transform: translateY(-50px)"
//                             data-top-bottom="transform: translateY(50px)"
//                         >
//                             <div className="info-widget style-7">
//                                 <div className="widget-content bg-secondary">
//                                     Video Call Support
//                                 </div>
//                                 <div className="widget-media">
//                                     <Image src={IMAGES.about2} alt="" />
//                                     <div className="call-widget">
//                                         <Link href={"#"} scroll={false}>
//                                             <Image src={IMAGES.camerasvg} alt="" />
//                                         </Link>
//                                         <Link href={"#"} scroll={false}>
//                                             <Image src={IMAGES.massagesvg} alt="" />
//                                         </Link>
//                                         <Link href={"#"} scroll={false} className="active">
//                                             <Image src={IMAGES.callsvg} alt="" />
//                                         </Link>
//                                         <Link href={"#"} scroll={false}>
//                                             <Image src={IMAGES.mikesvg} alt="" />
//                                         </Link>
//                                         <Link href={"#"} scroll={false}>
//                                             <Image src={IMAGES.videosvg} alt="" />
//                                         </Link>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                         <div
//                             className="item2"
//                             data-bottom-top="transform: translateY(50px)"
//                             data-top-bottom="transform: translateY(-50px)"
//                         >
//                             <div className="info-widget style-6 bg-primary">
//                                 <div className="info-icon bg-secondary">
//                                     <Image src={IMAGES.clocksvg} alt="" />
//                                 </div>
//                                 <div className="widget-content">
//                                     <h4 className="title">Open Hours</h4>
//                                     <ul>
//                                         {openHours.map((item, index) => (
//                                             <li key={index}>
//                                                 {item.day} <strong>{item.time}</strong>
//                                             </li>
//                                         ))}
//                                     </ul>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="col-xl-6 m-b30">
//                     <div className="section-head style-1 m-b30">
//                         <h2
//                             className="title wow fadeInUp"
//                             data-wow-delay="0.2s"
//                             data-wow-duration="0.8s"
//                         >
//                             {data?.title || "World ClassName Patient Facilities Designed for You"}
//                         </h2>
//                         <p
//                             className="wow fadeInUp"
//                             data-wow-delay="0.4s"
//                             data-wow-duration="0.8s"
//                         >
//                             {data?.description ||
//                                 "Experience the future of healthcare. Our state-of-the-art facilities are equipped with the latest technology, ensuring you receive the world's best quality treatment. Here, cutting-edge tools meet unparalleled expertise, providing a comfortable and effective path to optimal health."}
//                         </p>
//                     </div>

//                     <ul
//                         className="list-check text-secondary grid-2 fw-medium m-b30 wow fadeInUp"
//                         data-wow-delay="0.6s"
//                         data-wow-duration="0.8s"
//                     >
//                         {featureList.map((item, i) => (
//                             <li key={i}>{item.title}</li>
//                         ))}
//                     </ul>

//                     <div
//                         className="d-flex flex-wrap align-items-center wow fadeInUp"
//                         data-wow-delay="0.8s"
//                         data-wow-duration="0.8s"
//                     >
//                         <Link
//                             href={data?.button_link || "/appointment"}
//                             className="btn btn-lg btn-icon btn-secondary btn-shadow m-r30 mb-3 mb-sm-0"
//                         >
//                             {data?.button_text || "Appointment"}
//                             <span className="right-icon">
//                                 <i className="feather icon-arrow-right" />
//                             </span>
//                         </Link>

//                         <div className="info-widget style-5">
//                             <div className="widget-media text-primary">
//                                 <i className="feather icon-phone-call dz-ring-effect" />
//                             </div>
//                             <div className="widget-content">
//                                 <h6 className="title">Contact us</h6>
//                                 <Link
//                                     href={`tel:${(data?.phone || "+11234567890").replace(/\s+/g, "")}`}
//                                     className="text-secondary"
//                                 >
//                                     {data?.phone || "+1 123 456 7890"}
//                                 </Link>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }

// export default WorldClass;