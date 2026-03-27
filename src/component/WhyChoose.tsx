// "use client";

// import Image from "next/image";
// import { whychoosedata } from "../constant/alldata";
// import { IMAGES } from "../constant/theme";
// import CountUp from "react-countup";

// type WhyChooseItem = {
//     title?: string;
//     description?: string;
// };

// type WhyChooseData = {
//     title?: string;
//     experience_number?: string;
//     experience_label?: string;
//     image?: string;
//     items?: WhyChooseItem[];
// };

// type WhyChooseProps = {
//     data?: WhyChooseData;
// };

// function WhyChoose({ data }: WhyChooseProps) {
//     const items =
//         data?.items && data.items.length > 0
//             ? data.items.map((item, index) => ({
//                 title: item.title || whychoosedata[index]?.title || "Feature",
//                 description:
//                     item.description ||
//                     "We offer a wide range of health services to meet all your needs.",
//                 delay: whychoosedata[index]?.delay || `${0.4 + index * 0.2}s`,
//             }))
//             : whychoosedata.map((item) => ({
//                 title: item.title,
//                 description: "We offer a wide range of health services to meet all your needs.",
//                 delay: item.delay,
//             }));

//     const rawExperience = data?.experience_number || "20+";
//     const matched = rawExperience.match(/^(\d+)(.*)$/);
//     const endNumber = matched ? Number(matched[1]) : 20;
//     const suffix = matched ? matched[2] : "+";

//     return (
//         <>
//             <div className="row content-wrapper style-7 align-items-center">
//                 <div
//                     className="col-lg-6 m-b30 wow fadeInUp"
//                     data-wow-delay="0.2s"
//                     data-wow-duration="0.7s"
//                 >
//                     <div className="content-media">
//                         <div className="dz-media">
//                             <Image src={IMAGES.about5} alt="about" />
//                         </div>

//                         <div className="item1">
//                             <div className="info-widget style-11 bg-primary text-center">
//                                 <span className="content-text text-white">
//                                     <span className="counter">
//                                         <CountUp end={endNumber} duration={5} />
//                                     </span>
//                                     {suffix}
//                                 </span>
//                                 <h3 className="title m-b0 text-white">
//                                     {data?.experience_label || (
//                                         <>
//                                             Years <br /> Experienced
//                                         </>
//                                     )}
//                                 </h3>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="col-lg-6 m-b30">
//                     <div className="section-head style-1 m-b30">
//                         <h2
//                             className="title text-white m-b0 wow fadeInUp"
//                             data-wow-delay="0.2s"
//                             data-wow-duration="0.7s"
//                         >
//                             {data?.title || "Why Choose Us for Your Health care Needs"}
//                         </h2>
//                     </div>

//                     <div className="row row-wrapper g-5">
//                         {items.map((item, i) => (
//                             <div className="col-sm-6" key={i}>
//                                 <div
//                                     className="icon-bx-wraper style-4 text-center text-white wow fadeInUp"
//                                     data-wow-delay={item.delay}
//                                     data-wow-duration="0.7s"
//                                 >
//                                     <div className="icon-bx bg-primary">
//                                         <span className="icon-cell">
//                                             <i className="flaticon-check" />
//                                         </span>
//                                     </div>

//                                     <div className="icon-content">
//                                         <h3 className="dz-title">{item.title}</h3>
//                                         <p>{item.description}</p>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }

// export default WhyChoose;

"use client";

import Image from "next/image";
import { whychoosedata } from "../constant/alldata";
import { IMAGES } from "../constant/theme";
import CountUp from "react-countup";
import { normalizeImageUrl } from "@/lib/normalizeImageUrl";

type WhyChooseItem = {
    title?: string;
    description?: string;
};

type WhyChooseData = {
    title?: string;
    experience_number?: string;
    experience_label?: string;
    image?: string;
    items?: WhyChooseItem[];
};

type WhyChooseProps = {
    data?: WhyChooseData;
};

function WhyChoose({ data }: WhyChooseProps) {
    const items =
        data?.items && data.items.length > 0
            ? data.items.map((item, index) => ({
                title: item.title || whychoosedata[index]?.title || "Feature",
                description:
                    item.description ||
                    "We offer a wide range of health services to meet all your needs.",
                delay: whychoosedata[index]?.delay || `${0.4 + index * 0.2}s`,
            }))
            : whychoosedata.map((item) => ({
                title: item.title,
                description: "We offer a wide range of health services to meet all your needs.",
                delay: item.delay,
            }));

    const rawExperience = data?.experience_number || "20+";
    const matched = rawExperience.match(/^(\d+)(.*)$/);
    const endNumber = matched ? Number(matched[1]) : 20;
    const suffix = matched ? matched[2] : "+";

    const whyChooseImage = normalizeImageUrl(data?.image);

    return (
        <div className="row content-wrapper style-7 align-items-center">
            <div
                className="col-lg-6 m-b30 wow fadeInUp"
                data-wow-delay="0.2s"
                data-wow-duration="0.7s"
            >
                <div className="content-media">
                    <div className="dz-media">
                        <Image
                            src={whyChooseImage || IMAGES.about5}
                            alt={data?.title || "Why choose us"}
                            width={600}
                            height={600}
                            style={{
                                width: "100%",
                                height: "auto",
                                objectFit: "contain",
                            }}
                            unoptimized={typeof whyChooseImage === "string"}
                        />
                    </div>

                    <div className="item1">
                        <div className="info-widget style-11 bg-primary text-center">
                            <span className="content-text text-white">
                                <span className="counter">
                                    <CountUp end={endNumber} duration={5} />
                                </span>
                                {suffix}
                            </span>
                            <h3 className="title m-b0 text-white">
                                {data?.experience_label || (
                                    <>
                                        Years <br /> Experienced
                                    </>
                                )}
                            </h3>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-lg-6 m-b30">
                <div className="section-head style-1 m-b30">
                    <h2
                        className="title text-white m-b0 wow fadeInUp"
                        data-wow-delay="0.2s"
                        data-wow-duration="0.7s"
                    >
                        {data?.title || "Why Choose Us for Your Health care Needs"}
                    </h2>
                </div>

                <div className="row row-wrapper g-5">
                    {items.map((item, i) => (
                        <div className="col-sm-6" key={i}>
                            <div
                                className="icon-bx-wraper style-4 text-center text-white wow fadeInUp"
                                data-wow-delay={item.delay}
                                data-wow-duration="0.7s"
                            >
                                <div className="icon-bx bg-primary">
                                    <span className="icon-cell">
                                        <i className="flaticon-check" />
                                    </span>
                                </div>

                                <div className="icon-content">
                                    <h3 className="dz-title">{item.title}</h3>
                                    <p>{item.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default WhyChoose;