// import Image from "next/image";
// import { inspirationaldata } from "../constant/alldata";
// import { IMAGES, SVGICONS } from "../constant/theme";

// function Inspirational() {
//     return (
//         <>
//             <section className="content-inner bg-light gradient-top-light">
//                 <div className="container">
//                     <div className="row g-lg-5 align-items-center">
//                         <div className="col-lg-7 m-b10">
//                             <div className="section-head style-1 m-b30 max-w600">
//                                 <h2 className="title wow fadeInUp" data-wow-delay="0.2s" data-wow-duration="0.8s">Inspirational Health <br /> Our Vision and Mission</h2>
//                                 <p className="small wow fadeInUp" data-wow-delay="0.4s" data-wow-duration="0.8s">To enhance the health and well-being of our community by providing compassionate, high-quality healthcare services through dedicated professionals and advanced medical practices.</p>
//                             </div>
//                             {inspirationaldata.map((item, i) => (
//                                 <div className={`icon-bx-wraper style-9 m-b20 ${item.columnstand} wow fadeInUp`} data-wow-delay={item.delay} data-wow-duration="0.8s" key={i}>
//                                     <div className="icon-bx">                                        
//                                         <svg viewBox="0 0 70 71" fill="none" xmlns="http://www.w3.org/2000/svg"
//                                             dangerouslySetInnerHTML={{__html : item.svg}} 
//                                         >                                            
//                                         </svg>
//                                     </div>
//                                     <div className="icon-content">
//                                         <h3 className="dz-title">{item.title} </h3>
//                                         <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal.</p>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                         <div className="col-lg-5 m-b30" data-bottom-top="transform: translateY(100px)" data-top-bottom="transform: translateY(-100px)">
//                             <div className="dz-media radius-md height-lg">
//                                 <Image src={IMAGES.about8} alt="about8" className="object-fit-cover" />
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </section>
//         </>
//     )
// }
// export default Inspirational;

import Image from "next/image";
import { inspirationaldata } from "../constant/alldata";
import { IMAGES } from "../constant/theme";
import { normalizeImageUrl } from "@/lib/normalizeImageUrl";

type InspirationalItem = {
    icon?: string;
    title?: string;
    description?: string;
};

type InspirationalData = {
    subtitle?: string;
    title?: string;
    description?: string;
    image?: string;
    items?: InspirationalItem[];
};

type InspirationalProps = {
    data?: InspirationalData;
};

function Inspirational({ data }: InspirationalProps) {
    const imageUrl = normalizeImageUrl(data?.image);

    const items =
        data?.items && data.items.length > 0
            ? data.items.map((item, index) => ({
                title: item.title || inspirationaldata[index]?.title || "Mục",
                description:
                    item.description ||
                    "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
                svg: inspirationaldata[index % inspirationaldata.length]?.svg || inspirationaldata[0].svg,
                columnstand: inspirationaldata[index % inspirationaldata.length]?.columnstand || "",
                delay: inspirationaldata[index % inspirationaldata.length]?.delay || "0.2s",
            }))
            : inspirationaldata.map((item) => ({
                title: item.title,
                description:
                    "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal.",
                svg: item.svg,
                columnstand: item.columnstand,
                delay: item.delay,
            }));

    return (
        <section className="content-inner bg-light gradient-top-light">
            <div className="container">
                <div className="row g-lg-5 align-items-center">
                    <div className="col-lg-7 m-b10">
                        <div className="section-head style-1 m-b30 max-w600">
                            {data?.subtitle ? (
                                <span className="sub-title wow fadeInUp" data-wow-delay="0.1s" data-wow-duration="0.8s">
                                    {data.subtitle}
                                </span>
                            ) : null}

                            <h2 className="title wow fadeInUp" data-wow-delay="0.2s" data-wow-duration="0.8s">
                                {data?.title || (
                                    <>
                                        Inspirational Health <br /> Our Vision and Mission
                                    </>
                                )}
                            </h2>

                            <p className="small wow fadeInUp" data-wow-delay="0.4s" data-wow-duration="0.8s">
                                {data?.description ||
                                    "To enhance the health and well-being of our community by providing compassionate, high-quality healthcare services through dedicated professionals and advanced medical practices."}
                            </p>
                        </div>

                        {items.map((item, i) => (
                            <div
                                className={`icon-bx-wraper style-9 m-b20 ${item.columnstand} wow fadeInUp`}
                                data-wow-delay={item.delay}
                                data-wow-duration="0.8s"
                                key={i}
                            >
                                <div className="icon-bx">
                                    <svg
                                        viewBox="0 0 70 71"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        dangerouslySetInnerHTML={{ __html: item.svg }}
                                    />
                                </div>

                                <div className="icon-content">
                                    <h3 className="dz-title">{item.title}</h3>
                                    <p>{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div
                        className="col-lg-5 m-b30"
                        data-bottom-top="transform: translateY(100px)"
                        data-top-bottom="transform: translateY(-100px)"
                    >
                        <div className="dz-media radius-md height-lg">
                            <Image
                                src={imageUrl || IMAGES.about8}
                                alt="about8"
                                className="object-fit-cover"
                                width={900}
                                height={1200}
                                unoptimized={typeof imageUrl === "string"}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Inspirational;