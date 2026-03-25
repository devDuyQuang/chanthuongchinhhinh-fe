// "use client"
// import { useState } from "react";
// import Link from "next/link";
// import { IMAGES, SVGICONS } from "../constant/theme";
// import { mapdata } from "../constant/alldata";
// import Image from "next/image";

// function Connect() {
//     const [active, setactive] = useState(1)
//     return (
//         <>
//             <div className="col-xl-7 pe-xl-4 m-b10">
//                 <div className="section-head style-1 m-b30">
//                     <h2 className="title wow fadeInUp" data-wow-delay="0.2s" data-wow-duration="0.8s">Connect with Us for <br /> Your Healthcare Needs</h2>
//                     <p className="small wow fadeInUp" data-wow-delay="0.4s" data-wow-duration="0.8s">Reach out for support, feedback, or to schedule an appointment. Fill out the form, and we'll promptly assist you and confirm your visit with our healthcare professionals.</p>
//                 </div>
//                 <div className="clearfix m-b60 m-lg-b30">
//                     <div className="d-flex align-items-center m-b15 wow fadeInUp" data-wow-delay="0.6s" data-wow-duration="0.8s">
//                         <div className="info-widget style-12 m-r10 bg-light">
//                             <div className="avatar-group">
//                                 <Image className="avatar rounded-circle avatar-md border border-white border-2" src={IMAGES.smallavatar1} alt="avatar1" />
//                                 <Image className="avatar rounded-circle avatar-md border border-white border-2" src={IMAGES.smallavatar2} alt="avatar2" />
//                                 <Image className="avatar rounded-circle avatar-md border border-white border-2" src={IMAGES.smallavatar3} alt="avatar3" />
//                                 <Image className="avatar rounded-circle avatar-md border border-white border-2" src={IMAGES.smallavatar4} alt="avatar4" />
//                             </div>
//                             <div className="clearfix">
//                                 <span>Talk to over 215 doctor</span>
//                             </div>
//                         </div>
//                         <Link href="/team" className="btn btn-square btn-xl btn-light btn-rounded"
//                             dangerouslySetInnerHTML={{ __html: SVGICONS.uparrow }}
//                         />
//                     </div>
//                     <div className="widget-rating3 wow fadeInUp" data-wow-delay="0.8s" data-wow-duration="0.8s">
//                         <ul className="star-list">
//                             <li><i className="fa fa-star" /></li>
//                             <li><i className="fa fa-star" /></li>
//                             <li><i className="fa fa-star" /></li>
//                             <li><i className="fa fa-star" /></li>
//                             <li><i className="fa fa-star" /></li>
//                         </ul>
//                         <span className="rating">(4.8)</span>
//                         <span className="text">12k+ ratings on google</span>
//                     </div>
//                 </div>
//                 <div className="row">
//                     {mapdata.map((data, i) => (
//                         <div className="col-md-6 m-b20 wow fadeInUp" data-wow-delay={data.delay} data-wow-duration="0.8s" key={i}>
//                             <div className={`icon-bx-wraper style-8 box-hover ${active === data.id ? 'active' : ''}`} onMouseEnter={() => setactive(data.id)}>
//                                 <div className="icon-bx">
//                                     <span className="icon-cell"> {data.icon} </span>
//                                 </div>
//                                 <div className="icon-content">
//                                     <h4 className="dz-title">{data.title}</h4>
//                                     {data.para}
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </>
//     );
// }
// export default Connect;


"use client";

import { useState } from "react";
import Link from "next/link";
import { IMAGES, SVGICONS } from "../constant/theme";
import { mapdata } from "../constant/alldata";
import Image from "next/image";

type ConnectData = {
    title?: string;
    description?: string;
    address?: {
        label?: string;
        value?: string;
    };
    phone?: {
        label?: string;
        value?: string;
    };
    email?: {
        label?: string;
        value?: string;
    };
    time?: {
        label?: string;
        value?: string;
    };
    appointment_btn?: {
        text?: string;
        link?: string;
    };
    rating?: {
        score?: string;
        text?: string;
    };
    stats_text?: string;
};

type ConnectProps = {
    data?: ConnectData;
};

function Connect({ data }: ConnectProps) {
    const [active, setactive] = useState(1);

    const contactCards = [
        {
            id: 1,
            delay: mapdata[0]?.delay || "1.0s",
            icon: mapdata[0]?.icon,
            title: data?.address?.label || mapdata[0]?.title || "Address",
            para: (
                <p>
                    {data?.address?.value ||
                        "123 Health Way, Suite 456 Goodland, 78910 United States"}
                </p>
            ),
        },
        {
            id: 2,
            delay: mapdata[1]?.delay || "1.2s",
            icon: mapdata[1]?.icon,
            title: data?.phone?.label || mapdata[1]?.title || "Call Us",
            para: (
                <p>
                    <Link href={`tel:${(data?.phone?.value || "").replace(/\s+/g, "")}`}>
                        {data?.phone?.value || "+1 123 456 7890"}
                    </Link>
                </p>
            ),
        },
        {
            id: 3,
            delay: mapdata[2]?.delay || "1.4s",
            icon: mapdata[2]?.icon,
            title: data?.email?.label || mapdata[2]?.title || "Send us a Mail",
            para: (
                <p>
                    <Link href={`mailto:${data?.email?.value || ""}`}>
                        {data?.email?.value || "email@domain.com"}
                    </Link>
                </p>
            ),
        },
        {
            id: 4,
            delay: mapdata[3]?.delay || "1.6s",
            icon: mapdata[3]?.icon,
            title: data?.time?.label || mapdata[3]?.title || "Opening Time",
            para: (
                <p style={{ whiteSpace: "pre-line" }}>
                    {data?.time?.value || "Mon-Thu: 8:00am-5:00pm\nFri: 8:00am-1:00pm"}
                </p>
            ),
        },
    ];

    return (
        <>
            <div className="col-xl-7 pe-xl-4 m-b10">
                <div className="section-head style-1 m-b30">
                    <h2
                        className="title wow fadeInUp"
                        data-wow-delay="0.2s"
                        data-wow-duration="0.8s"
                    >
                        {data?.title || (
                            <>
                                Connect with Us for <br /> Your Healthcare Needs
                            </>
                        )}
                    </h2>

                    <p
                        className="small wow fadeInUp"
                        data-wow-delay="0.4s"
                        data-wow-duration="0.8s"
                    >
                        {data?.description ||
                            "Reach out for support, feedback, or to schedule an appointment. Fill out the form, and we'll promptly assist you and confirm your visit with our healthcare professionals."}
                    </p>
                </div>

                <div className="clearfix m-b60 m-lg-b30">
                    <div
                        className="d-flex align-items-center m-b15 wow fadeInUp"
                        data-wow-delay="0.6s"
                        data-wow-duration="0.8s"
                    >
                        <div className="info-widget style-12 m-r10 bg-light">
                            <div className="avatar-group">
                                <Image
                                    className="avatar rounded-circle avatar-md border border-white border-2"
                                    src={IMAGES.smallavatar1}
                                    alt="avatar1"
                                />
                                <Image
                                    className="avatar rounded-circle avatar-md border border-white border-2"
                                    src={IMAGES.smallavatar2}
                                    alt="avatar2"
                                />
                                <Image
                                    className="avatar rounded-circle avatar-md border border-white border-2"
                                    src={IMAGES.smallavatar3}
                                    alt="avatar3"
                                />
                                <Image
                                    className="avatar rounded-circle avatar-md border border-white border-2"
                                    src={IMAGES.smallavatar4}
                                    alt="avatar4"
                                />
                            </div>
                            <div className="clearfix">
                                <span>{data?.stats_text || "Talk to over 215 doctor"}</span>
                            </div>
                        </div>

                        <Link
                            href={data?.appointment_btn?.link || "/team"}
                            className="btn btn-square btn-xl btn-light btn-rounded"
                            dangerouslySetInnerHTML={{ __html: SVGICONS.uparrow }}
                        />
                    </div>

                    <div
                        className="widget-rating3 wow fadeInUp"
                        data-wow-delay="0.8s"
                        data-wow-duration="0.8s"
                    >
                        <ul className="star-list">
                            <li><i className="fa fa-star" /></li>
                            <li><i className="fa fa-star" /></li>
                            <li><i className="fa fa-star" /></li>
                            <li><i className="fa fa-star" /></li>
                            <li><i className="fa fa-star" /></li>
                        </ul>
                        <span className="rating">({data?.rating?.score || "4.8"})</span>
                        <span className="text">
                            {data?.rating?.text || "12k+ ratings on google"}
                        </span>
                    </div>
                </div>

                <div className="row">
                    {contactCards.map((item, i) => (
                        <div
                            className="col-md-6 m-b20 wow fadeInUp"
                            data-wow-delay={item.delay}
                            data-wow-duration="0.8s"
                            key={i}
                        >
                            <div
                                className={`icon-bx-wraper style-8 box-hover ${active === item.id ? "active" : ""}`}
                                onMouseEnter={() => setactive(item.id)}
                            >
                                <div className="icon-bx">
                                    <span className="icon-cell">{item.icon}</span>
                                </div>
                                <div className="icon-content">
                                    <h4 className="dz-title">{item.title}</h4>
                                    {item.para}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Connect;