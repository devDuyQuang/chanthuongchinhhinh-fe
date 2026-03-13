// "use client"
// import { useState } from "react";
// import Link from "next/link";
// import { serviceboxdata } from "../constant/alldata";

// function ServiceBox() {
//     const [active, setActive] = useState(1);
//     return (
//         <>
//             <div className="row">
//                 {serviceboxdata.map((data, i) => (
//                     <div className="col-xl-3 col-md-6 m-b30 wow fadeInUp" data-wow-delay={data.delay} data-wow-duration="0.8s" key={i}>
//                         <div className={`icon-bx-wraper style-3 box-hover ${active === data.id ? 'active' : ''}`} onMouseEnter={() => setActive(data.id)}>
//                             <div className="icon-bx-head">
//                                 <div className="icon-bx"> 
//                                     <span className="icon-cell" dangerouslySetInnerHTML={{__html : data.svg1}}>  
//                                     </span> 
//                                 </div>
//                                 <span className="icon-bg" 
//                                     dangerouslySetInnerHTML={{__html : data.svg2}}> 
//                                 </span>
//                                 <div className="icon-content">
//                                     <h3 className="dz-title">{data.title}</h3>
//                                     <p>It is a long established fact that a reader will be distracted by the readable content.</p>
//                                 </div>
//                             </div>
//                             <div className="icon-bx-footer">
//                                 <span className="text-badge"><i className="fa fa-circle text-primary" /> 25+ Doctor</span>
//                                 <Link href="/service-detail" className="btn btn-square btn-primary rounded-circle">
//                                     <i className="feather icon-arrow-up-right" />
//                                 </Link>
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </>
//     )
// } 
// export default ServiceBox;


"use client";

import { useState } from "react";
import Link from "next/link";
import { serviceboxdata } from "../constant/alldata";

type ServiceItem = {
    title?: string;
    description?: string;
    doctor_text?: string;
    link?: string;
};

type ServiceBoxData = {
    items?: ServiceItem[];
};

type ServiceBoxProps = {
    data?: ServiceBoxData;
};

function ServiceBox({ data }: ServiceBoxProps) {
    const [active, setActive] = useState(1);

    const services =
        data?.items && data.items.length > 0
            ? data.items.map((item, index) => ({
                id: index + 1,
                delay: `${0.1 * (index + 1)}s`,
                title: item.title || serviceboxdata[index]?.title || "Service",
                description:
                    item.description ||
                    "It is a long established fact that a reader will be distracted by the readable content.",
                subText: item.doctor_text || "25+ Doctor",
                link: item.link || "/service-detail",
                svg1: serviceboxdata[index]?.svg1 || serviceboxdata[0].svg1,
                svg2: serviceboxdata[index]?.svg2 || serviceboxdata[0].svg2,
            }))
            : serviceboxdata.map((item) => ({
                id: item.id,
                delay: item.delay,
                title: item.title,
                description:
                    "It is a long established fact that a reader will be distracted by the readable content.",
                subText: "25+ Doctor",
                link: "/service-detail",
                svg1: item.svg1,
                svg2: item.svg2,
            }));

    return (
        <div className="row">
            {services.map((item, i) => (
                <div
                    className="col-xl-3 col-md-6 m-b30 wow fadeInUp"
                    data-wow-delay={item.delay}
                    data-wow-duration="0.8s"
                    key={i}
                >
                    <div
                        className={`icon-bx-wraper style-3 box-hover ${active === item.id ? "active" : ""
                            }`}
                        onMouseEnter={() => setActive(item.id)}
                    >
                        <div className="icon-bx-head">
                            <div className="icon-bx">
                                <span
                                    className="icon-cell"
                                    dangerouslySetInnerHTML={{ __html: item.svg1 }}
                                />
                            </div>

                            <span
                                className="icon-bg"
                                dangerouslySetInnerHTML={{ __html: item.svg2 }}
                            />

                            <div className="icon-content">
                                <h3 className="dz-title">{item.title}</h3>
                                <p>{item.description}</p>
                            </div>
                        </div>

                        <div className="icon-bx-footer">
                            <span className="text-badge">
                                <i className="fa fa-circle text-primary" /> {item.subText}
                            </span>
                            <Link
                                href={item.link}
                                className="btn btn-square btn-primary rounded-circle"
                            >
                                <i className="feather icon-arrow-up-right" />
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ServiceBox;