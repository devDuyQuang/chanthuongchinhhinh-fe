// "use client";

// import CountUp from "react-countup";
// import { IMAGES } from "../constant/theme";
// import Link from "next/link";
// import { meetdrdata1, meetdrdata2 } from "../constant/alldata";
// import Image from "next/image";

// type DoctorAchievement = {
//     image?: string;
//     title?: string;
//     subtitle?: string;
//     link_text?: string;
// };

// type DoctorHomeData = {
//     title?: string;
//     doctor_name?: string;
//     description?: string;
//     skills_header?: string;
//     image?: string;
//     experience?: {
//         number?: string;
//         label?: string;
//     };
//     skills?: string[];
//     achievements?: DoctorAchievement[];
// };

// type MeetDrProps = {
//     data?: DoctorHomeData;
// };

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

// function MeetDr({ data }: MeetDrProps) {
//     const rawExperience = data?.experience?.number || "20+";
//     const matched = rawExperience.match(/^(\d+)(.*)$/);
//     const endNumber = matched ? Number(matched[1]) : 20;
//     const suffix = matched ? matched[2] || "+" : "+";

//     const skills =
//         data?.skills && data.skills.length > 0
//             ? data.skills
//             : meetdrdata1.map((item) => item.title);

//     const doctorImage = normalizeImageUrl(data?.image);

//     const achievements =
//         data?.achievements && data.achievements.length > 0
//             ? data.achievements.map((item, index) => ({
//                 image:
//                     normalizeImageUrl(item.image) ||
//                     meetdrdata2[index]?.image ||
//                     meetdrdata2[0]?.image,
//                 title: item.title || "ClinicMaster 2024",
//                 subtitle: item.subtitle || "Quality and Accreditation Institute",
//                 linkText: item.link_text || "Best Dermatologists",
//             }))
//             : meetdrdata2.map((item) => ({
//                 image: item.image,
//                 title: "ClinicMaster 2024",
//                 subtitle: "Quality and Accreditation Institute",
//                 linkText: "Best Dermatologists",
//             }));

//     console.log("doctor data:", data);
//     console.log("doctor image:", doctorImage);
//     console.log("doctor achievements:", achievements);

//     return (
//         <section
//             className="clearfix overlay-primary-dark overlay-opacity-95 p-t50 bg-img-fix"
//             style={{ backgroundImage: `url(${IMAGES.bg1})` }}
//         >
//             <div className="container">
//                 <div className="row content-wrapper style-6 align-items-end">
//                     <div
//                         className="col-xl-6 col-lg-5 wow fadeInLeft"
//                         data-wow-delay="0.2s"
//                         data-wow-duration="0.8s"
//                     >
//                         <div className="content-media">
//                             <div className="dz-media">
//                                 <Image
//                                     src={doctorImage || IMAGES.about1png}
//                                     alt={data?.doctor_name || data?.title || "Doctor"}
//                                     width={685}
//                                     height={720}
//                                     style={{
//                                         width: "100%",
//                                         height: "auto",
//                                         objectFit: "cover",
//                                     }}
//                                     unoptimized={typeof doctorImage === "string"}
//                                 />
//                             </div>

//                             <div
//                                 className="item1"
//                                 data-bottom-top="transform: translateY(-50px)"
//                                 data-top-bottom="transform: translateY(50px)"
//                             >
//                                 <div className="info-widget style-10 move-3">
//                                     <span className="content-text text-primary">
//                                         <span className="counter">
//                                             <CountUp start={0} end={endNumber} duration={5} />
//                                         </span>
//                                         {suffix}
//                                     </span>

//                                     <h3 className="title m-b0">
//                                         {data?.experience?.label || (
//                                             <>
//                                                 Years <br /> Experienced
//                                             </>
//                                         )}
//                                     </h3>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="col-xl-6 col-lg-7 m-b30 align-self-center">
//                         <div className="section-head style-1 m-b30">
//                             <h2
//                                 className="title wow fadeInUp"
//                                 data-wow-delay="0.2s"
//                                 data-wow-duration="0.8s"
//                             >
//                                 {data?.title || "Meet Dr. Natali jackson"}
//                             </h2>

//                             <p
//                                 className="fw-normal wow fadeInUp"
//                                 data-wow-delay="0.4s"
//                                 data-wow-duration="0.8s"
//                             >
//                                 <strong className="text-secondary fw-semibold">
//                                     {data?.doctor_name || "Dr. Natali jackson"}{" "}
//                                 </strong>
//                                 {data?.description ||
//                                     "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration."}
//                             </p>
//                         </div>

//                         <h3
//                             className="text-primary title-dashed-separator wow fadeInUp"
//                             data-wow-delay="0.6s"
//                             data-wow-duration="0.8s"
//                         >
//                             {data?.skills_header || "About Skills"}
//                         </h3>

//                         <ul
//                             className="list-check-circle text-secondary fw-medium grid-2 m-b30 wow fadeInUp"
//                             data-wow-delay="0.8s"
//                             data-wow-duration="0.8s"
//                         >
//                             {skills.map((skill, i) => (
//                                 <li key={i}>{skill}</li>
//                             ))}
//                         </ul>

//                         <div className="row m-b30 g-3">
//                             {achievements.map((item, i) => (
//                                 <div
//                                     className="col-md-6 wow fadeInUp"
//                                     data-wow-delay={`${i * 0.2}s`}
//                                     data-wow-duration="0.8s"
//                                     key={i}
//                                 >
//                                     <div className="dz-img-box style-1">
//                                         <div className="dz-media">
//                                             <Image
//                                                 src={item.image}
//                                                 alt={item.title}
//                                                 width={80}
//                                                 height={80}
//                                                 style={{
//                                                     width: "100%",
//                                                     height: "auto",
//                                                     objectFit: "contain",
//                                                 }}
//                                                 unoptimized={typeof item.image === "string"}
//                                             />
//                                         </div>

//                                         <div className="dz-content">
//                                             <h3 className="title">{item.title}</h3>
//                                             <p>{item.subtitle}</p>
//                                             <Link href={"#"} scroll={false} className="btn-link">
//                                                 {item.linkText}
//                                             </Link>
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// }

// export default MeetDr;

"use client";

import CountUp from "react-countup";
import { IMAGES } from "../constant/theme";
import Link from "next/link";
import { meetdrdata1, meetdrdata2 } from "../constant/alldata";
import Image from "next/image";
import { normalizeImageUrl } from "@/lib/normalizeImageUrl";

type DoctorAchievement = {
    image?: string;
    title?: string;
    subtitle?: string;
    link_text?: string;
};

type DoctorHomeData = {
    title?: string;
    doctor_name?: string;
    description?: string;
    skills_header?: string;
    image?: string;
    experience?: {
        number?: string;
        label?: string;
    };
    skills?: string[];
    achievements?: DoctorAchievement[];
};

type MeetDrProps = {
    data?: DoctorHomeData;
};

function MeetDr({ data }: MeetDrProps) {
    const rawExperience = data?.experience?.number || "20+";
    const matched = rawExperience.match(/^(\d+)(.*)$/);
    const endNumber = matched ? Number(matched[1]) : 20;
    const suffix = matched ? matched[2] || "+" : "+";

    const skills =
        data?.skills && data.skills.length > 0
            ? data.skills
            : meetdrdata1.map((item) => item.title);

    const doctorImage = normalizeImageUrl(data?.image);

    const achievements =
        data?.achievements && data.achievements.length > 0
            ? data.achievements.map((item, index) => ({
                image:
                    normalizeImageUrl(item.image) ||
                    meetdrdata2[index]?.image ||
                    meetdrdata2[0]?.image,
                title: item.title || "ClinicMaster 2024",
                subtitle: item.subtitle || "Quality and Accreditation Institute",
                linkText: item.link_text || "Best Dermatologists",
            }))
            : meetdrdata2.map((item) => ({
                image: item.image,
                title: "ClinicMaster 2024",
                subtitle: "Quality and Accreditation Institute",
                linkText: "Best Dermatologists",
            }));

    return (
        <section
            className="clearfix overlay-primary-dark overlay-opacity-95 p-t50 bg-img-fix"
            style={{ backgroundImage: `url(${IMAGES.bg1})` }}
        >
            <div className="container">
                <div className="row content-wrapper style-6 align-items-end">
                    <div
                        className="col-xl-6 col-lg-5 wow fadeInLeft"
                        data-wow-delay="0.2s"
                        data-wow-duration="0.8s"
                    >
                        <div className="content-media">
                            <div className="dz-media">
                                <Image
                                    src={doctorImage || IMAGES.about1png}
                                    alt={data?.doctor_name || data?.title || "Doctor"}
                                    width={685}
                                    height={720}
                                    style={{
                                        width: "100%",
                                        height: "auto",
                                        objectFit: "cover",
                                    }}
                                    unoptimized={typeof doctorImage === "string"}
                                />
                            </div>

                            <div
                                className="item1"
                                data-bottom-top="transform: translateY(-50px)"
                                data-top-bottom="transform: translateY(50px)"
                            >
                                <div className="info-widget style-10 move-3">
                                    <span className="content-text text-primary">
                                        <span className="counter">
                                            <CountUp start={0} end={endNumber} duration={5} />
                                        </span>
                                        {suffix}
                                    </span>

                                    <h3 className="title m-b0 fw-bold">
                                        {data?.experience?.label || (
                                            <>
                                                Years <br /> Experienced
                                            </>
                                        )}
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-6 col-lg-7 m-b30 align-self-center">
                        <div className="section-head style-1 m-b30">
                            <h2
                                className="title wow fadeInUp fw-bold"
                                data-wow-delay="0.2s"
                                data-wow-duration="0.8s"
                            >
                                {data?.title || "Meet Dr. Natali jackson"}
                            </h2>

                            <p
                                className="fw-normal wow fadeInUp"
                                data-wow-delay="0.4s"
                                data-wow-duration="0.8s"
                            >
                                <strong className="text-secondary fw-semibold">
                                    {data?.doctor_name || "Dr. Natali jackson"}{" "}
                                </strong>
                                {data?.description ||
                                    "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration."}
                            </p>
                        </div>

                        <h3
                            className="text-primary title-dashed-separator wow fadeInUp"
                            data-wow-delay="0.6s"
                            data-wow-duration="0.8s"
                        >
                            {data?.skills_header || "About Skills"}
                        </h3>

                        <ul
                            className="list-check-circle text-secondary fw-medium grid-2 m-b30 wow fadeInUp"
                            data-wow-delay="0.8s"
                            data-wow-duration="0.8s"
                        >
                            {skills.map((skill, i) => (
                                <li key={i}>{skill}</li>
                            ))}
                        </ul>

                        <div className="row m-b30 g-3">
                            {achievements.map((item, i) => (
                                <div
                                    className="col-md-6 wow fadeInUp"
                                    data-wow-delay={`${i * 0.2}s`}
                                    data-wow-duration="0.8s"
                                    key={i}
                                >
                                    <div className="dz-img-box style-1">
                                        <div className="dz-media">
                                            <Image
                                                src={item.image}
                                                alt={item.title}
                                                width={80}
                                                height={80}
                                                style={{
                                                    width: "100%",
                                                    height: "auto",
                                                    objectFit: "contain",
                                                }}
                                                unoptimized={typeof item.image === "string"}
                                            />
                                        </div>

                                        <div className="dz-content">
                                            <h3 className="title">{item.title}</h3>
                                            <p>{item.subtitle}</p>
                                            <Link href={"#"} scroll={false} className="btn-link">
                                                {item.linkText}
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default MeetDr;