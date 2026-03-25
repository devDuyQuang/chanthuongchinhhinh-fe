// import Link from "next/link";
// import { locationdata } from "../constant/alldata";
// // import GoogleMap from "./GoogleMap";

// function Alllocation() {
//     return (
//         <>
//             <section className="content-inner bg-light bg-opacity-50">
//                 <div className="container">
//                     <div className="section-head style-3">
//                         <h2 className="title m-b0 wow fadeInUp" data-wow-delay="0.2s" data-wow-duration="0.8s">All Locations</h2>
//                     </div>
//                     <div className="row content-wrapper">
//                         {locationdata.map((data, i) => (
//                             <div className="col-xl-6 m-b30 wow fadeInUp" data-wow-delay={data.delay} data-wow-duration="0.8s" key={i}>
//                                 <div className="content-bx style-6 shadow-sm">
//                                     <div className="dz-media">                                                                                                                   
//                                         <iframe 
//                                         src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d28891.193971348785!2d75.8546432!3d25.1559936!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1719221707984!5m2!1sen!2sin"                         
//                                             style={{ border: 0 , height: '100%', width: '100%'}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
//                                         />  
//                                     </div>
//                                     <div className="dz-info">
//                                         <div className="clearfix">
//                                             <h3 className="title m-b20">{data.title}</h3>
//                                             <div className="m-b15">
//                                                 <h4 className="m-b5 font-16">Address:</h4>
//                                                 <p>123 Health Way, Suite 456 Goodland, 78910 United States</p>
//                                             </div>
//                                             <div className="m-b15">
//                                                 <h4 className="m-b5 font-16">Service Time:</h4>
//                                                 <p>Mon -Sat: 7:00 - 17:00</p>
//                                             </div>
//                                         </div>
//                                         <div className="dz-footer">
//                                             <Link href="https://www.google.com/maps/" target="_blank" className="icon-link-hover-end">Get Directions <i className="feather icon-arrow-up-right" /></Link>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </section>
//         </>
//     )
// }
// export default Alllocation;


import Link from "next/link";
import { locationdata } from "../constant/alldata";

type LocationItem = {
    title?: string;
    address?: string;
    phone?: string;
    email?: string;
    time?: string;
    map_iframe?: string;
    map_link?: string;
};

type AlllocationData = {
    section_title?: string;
    items?: LocationItem[];
};

type AlllocationProps = {
    data?: AlllocationData;
};

function Alllocation({ data }: AlllocationProps) {
    const hasAdminLocations = !!data?.items && data.items.length > 0;

    return (
        <>
            <section className="content-inner bg-light bg-opacity-50">
                <div className="container">
                    <div className="section-head style-3">
                        <h2
                            className="title m-b0 wow fadeInUp"
                            data-wow-delay="0.2s"
                            data-wow-duration="0.8s"
                        >
                            {data?.section_title || "All Locations"}
                        </h2>
                    </div>

                    <div className="row content-wrapper">
                        {hasAdminLocations
                            ? data.items!.map((item, i) => (
                                <div
                                    className="col-xl-6 m-b30 wow fadeInUp"
                                    data-wow-delay="0.4s"
                                    data-wow-duration="0.8s"
                                    key={i}
                                >
                                    <div className="content-bx style-6 shadow-sm">
                                        <div className="dz-media">
                                            {item.map_iframe ? (
                                                <div
                                                    dangerouslySetInnerHTML={{
                                                        __html: item.map_iframe,
                                                    }}
                                                />
                                            ) : (
                                                <iframe
                                                    src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d28891.193971348785!2d75.8546432!3d25.1559936!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1719221707984!5m2!1sen!2sin"
                                                    style={{ border: 0, height: "100%", width: "100%" }}
                                                    allowFullScreen
                                                    loading="lazy"
                                                    referrerPolicy="no-referrer-when-downgrade"
                                                />
                                            )}
                                        </div>

                                        <div className="dz-info">
                                            <div className="clearfix">
                                                <h3 className="title m-b20">
                                                    {item.title || "Location"}
                                                </h3>

                                                <div className="m-b15">
                                                    <h4 className="m-b5 font-16">Address:</h4>
                                                    <p>
                                                        {item.address ||
                                                            "123 Health Way, Suite 456 Goodland, 78910 United States"}
                                                    </p>
                                                </div>

                                                <div className="m-b15">
                                                    <h4 className="m-b5 font-16">Service Time:</h4>
                                                    <p style={{ whiteSpace: "pre-line" }}>
                                                        {item.time || "Mon -Sat: 7:00 - 17:00"}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="dz-footer">
                                                <Link
                                                    href={item.map_link || "https://www.google.com/maps/"}
                                                    target="_blank"
                                                    className="icon-link-hover-end"
                                                >
                                                    Get Directions <i className="feather icon-arrow-up-right" />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                            : locationdata.map((data, i) => (
                                <div
                                    className="col-xl-6 m-b30 wow fadeInUp"
                                    data-wow-delay={data.delay}
                                    data-wow-duration="0.8s"
                                    key={i}
                                >
                                    <div className="content-bx style-6 shadow-sm">
                                        <div className="dz-media">
                                            <iframe
                                                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d28891.193971348785!2d75.8546432!3d25.1559936!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1719221707984!5m2!1sen!2sin"
                                                style={{ border: 0, height: "100%", width: "100%" }}
                                                allowFullScreen
                                                loading="lazy"
                                                referrerPolicy="no-referrer-when-downgrade"
                                            />
                                        </div>
                                        <div className="dz-info">
                                            <div className="clearfix">
                                                <h3 className="title m-b20">{data.title}</h3>
                                                <div className="m-b15">
                                                    <h4 className="m-b5 font-16">Address:</h4>
                                                    <p>123 Health Way, Suite 456 Goodland, 78910 United States</p>
                                                </div>
                                                <div className="m-b15">
                                                    <h4 className="m-b5 font-16">Service Time:</h4>
                                                    <p>Mon -Sat: 7:00 - 17:00</p>
                                                </div>
                                            </div>
                                            <div className="dz-footer">
                                                <Link
                                                    href="https://www.google.com/maps/"
                                                    target="_blank"
                                                    className="icon-link-hover-end"
                                                >
                                                    Get Directions <i className="feather icon-arrow-up-right" />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </section>
        </>
    );
}

export default Alllocation;