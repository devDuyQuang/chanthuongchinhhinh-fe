// "use client"
// import Image from "next/image";
// import { countupdata } from "../constant/alldata";
// import { IMAGES } from "../constant/theme";
// import CountUp from "react-countup"

// function Counter() {
//     return (
//         <>
//             <section className="content-inner-3 bg-secondary background-blend-multiply bg-img-fix" 
//                 style={{ backgroundImage: `URL(${IMAGES.bg2.src})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'right center' }}
//             >
//                 <div className="container">
//                     <div className="row align-items-sm-center">
//                         <div className="col-lg-3 col-12 m-b30 wow fadeInUp" data-wow-delay="0.2s" data-wow-duration="0.8s">
//                             <div className="avatar-group m-b20">
//                                 <Image className="avatar rounded-circle border border-white border-3" src={IMAGES.smallavatar1} alt="" />
//                                 <Image className="avatar rounded-circle border border-white border-3" src={IMAGES.smallavatar2} alt="" />
//                                 <Image className="avatar rounded-circle border border-white border-3" src={IMAGES.smallavatar3} alt="" />
//                                 <Image className="avatar rounded-circle border border-white border-3" src={IMAGES.smallavatar4} alt="" />
//                             </div>
//                             <h2 className="text-white font-20 m-b0 fw-medium">300+ Appointment Booking Confirm for this Week</h2>
//                         </div>
//                         {countupdata.map((data, i) => (
//                             <div className="col-lg-3 col-4 m-b30 d-flex wow fadeInUp" data-wow-delay={data.delay} data-wow-duration="0.8s" key={i}>
//                                 <div className="content-bx style-1 mx-auto">
//                                     <span className="content-text text-white">
//                                         <CountUp end={data.countup} duration={5} />                                        
//                                         {data.span}
//                                     </span>
//                                     <h3 className="title text-white m-b0">{data.title}</h3>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </section>
//         </>
//     )
// }
// export default Counter;


"use client";

import Image from "next/image";
import CountUp from "react-countup";
import { countupdata } from "../constant/alldata";
import { IMAGES } from "../constant/theme";

type CounterItem = {
    number?: string;
    label?: string;
};

type CounterData = {
    background_image?: string;
    avatar_title?: string;
    avatars?: string[];
    stats?: CounterItem[];
};

type CounterProps = {
    data?: CounterData;
};

function Counter({ data }: CounterProps) {
    const statsList =
        data?.stats && data.stats.length > 0
            ? data.stats
            : countupdata.map((item) => ({
                number: `${item.countup}${item.span || ""}`,
                label: item.title,
            }));

    return (
        <>
            <section
                className="content-inner-3 bg-secondary background-blend-multiply bg-img-fix"
                style={{
                    backgroundImage: `url(${IMAGES.bg2.src})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "right center",
                }}
            >
                <div className="container">
                    <div className="row align-items-sm-center">
                        <div
                            className="col-lg-3 col-12 m-b30 wow fadeInUp"
                            data-wow-delay="0.2s"
                            data-wow-duration="0.8s"
                        >
                            <div className="avatar-group m-b20">
                                <Image
                                    className="avatar rounded-circle border border-white border-3"
                                    src={IMAGES.smallavatar1}
                                    alt=""
                                />
                                <Image
                                    className="avatar rounded-circle border border-white border-3"
                                    src={IMAGES.smallavatar2}
                                    alt=""
                                />
                                <Image
                                    className="avatar rounded-circle border border-white border-3"
                                    src={IMAGES.smallavatar3}
                                    alt=""
                                />
                                <Image
                                    className="avatar rounded-circle border border-white border-3"
                                    src={IMAGES.smallavatar4}
                                    alt=""
                                />
                            </div>

                            <h2 className="text-white font-20 m-b0 fw-medium">
                                {data?.avatar_title || "300+ Appointment Booking Confirm for this Week"}
                            </h2>
                        </div>

                        {statsList.map((item, i) => {
                            const rawNumber = item.number || "0";
                            const matched = rawNumber.match(/^(\d+)(.*)$/);
                            const endNumber = matched ? Number(matched[1]) : 0;
                            const suffix = matched ? matched[2] : rawNumber;

                            return (
                                <div
                                    className="col-lg-3 col-4 m-b30 d-flex wow fadeInUp"
                                    data-wow-delay={`${0.4 + i * 0.2}s`}
                                    data-wow-duration="0.8s"
                                    key={i}
                                >
                                    <div className="content-bx style-1 mx-auto">
                                        <span className="content-text text-white">
                                            <CountUp end={endNumber} duration={5} />
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
            </section>
        </>
    );
}

export default Counter;