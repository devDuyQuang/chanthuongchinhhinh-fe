// "use client"
// import { empolydata } from "@/constant/alldata";
// import Image from "next/image";
// import Link from "next/link";
// import { useState } from "react";

// const SurgeryBlog = () =>{
//     const [active, setActive] = useState(1);
//     return(
//         <div className="row">
//             {empolydata.slice(0, empolydata.length - 5).map((item, i) => (
//                 <div className="col-xxl-4 col-sm-6" key={i}>
//                     <div className={`dz-team style-1 box-hover ${active === item.id ? 'active' : ''}`} onMouseEnter={() => setActive(item.id)}>
//                         <div className="dz-media">
//                             <Image src={item.image} alt="/" />
//                             <Link href="/appointment" className="btn btn-primary">
//                                 <i className="feather icon-calendar m-r5" /> Appointment Now
//                             </Link>
//                         </div>
//                         <div className="dz-content">
//                             <div className="clearfix">
//                                 <h3 className="dz-name"><Link href="/team-detail">{item.title}</Link></h3>
//                                 <span className="dz-position">{item.position}</span>
//                             </div>
//                             <Link href="/team-detail" className="btn btn-square btn-secondary">
//                                 <i className="feather icon-arrow-right" />
//                             </Link>
//                         </div>
//                         <ul className="dz-social">
//                             <li><Link href="https://www.linkedin.com/showcase/dexignzone" target="_blank"> <i className="fa-brands fa-linkedin" /></Link></li>
//                             <li><Link href="https://www.instagram.com/dexignzone" target="_blank"> <i className="fa-brands fa-instagram" /></Link></li>
//                             <li><Link href="https://www.facebook.com/dexignzone" target="_blank"> <i className="fa-brands fa-facebook-f" /></Link></li>
//                             <li><Link href="https://x.com/dexignzone" target="_blank"> <i className="fa-brands fa-x-twitter" /></Link></li>
//                             <li><Link href="https://www.youtube.com/@dexignzone" target="_blank"> <i className="fa-brands fa-youtube" /></Link></li>
//                         </ul>
//                     </div>
//                 </div>
//             ))}
//         </div>
//     )
// }
// export default SurgeryBlog;


"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { normalizeImageUrl } from "@/lib/normalizeImageUrl";

type DoctorItem = {
    name?: string;
    specialty?: string;
    button_text?: string;
    button_link?: string;
    image?: string;
    socials?: {
        linkedin?: string | null;
        facebook?: string | null;
        twitter?: string | null;
        youtube?: string | null;
    };
};

type SurgeryBlogProps = {
    doctors?: DoctorItem[];
};

const SurgeryBlog = ({ doctors = [] }: SurgeryBlogProps) => {
    const visibleDoctors = doctors.slice(0, 3);
    const [active, setActive] = useState(0);

    if (!visibleDoctors.length) return null;

    return (
        <div className="row">
            {visibleDoctors.map((item, i) => (
                <div className="col-xxl-4 col-sm-6" key={`${item.name || "doctor"}-${i}`}>
                    <div
                        className={`dz-team style-1 box-hover ${active === i ? "active" : ""}`}
                        onMouseEnter={() => setActive(i)}
                    >
                        <div className="dz-media">
                            <Image
                                src={normalizeImageUrl(item.image) || "/assets/images/team/pic1.jpg"}
                                alt={item.name || "doctor"}
                                width={300}
                                height={335}
                                style={{ width: "100%", height: "auto" }}
                                unoptimized
                            />
                            <Link
                                href={item.button_link || "/dat-lich-kham"}
                                className="btn btn-primary"
                            >
                                <i className="feather icon-calendar m-r5" />{" "}
                                {item.button_text || "Xem chi tiết"}
                            </Link>
                        </div>

                        <div className="dz-content">
                            <div className="clearfix">
                                <h3 className="dz-name">
                                    <Link href={item.button_link || "#"}>
                                        {item.name || "Bác sĩ chuyên khoa"}
                                    </Link>
                                </h3>
                                <span className="dz-position">
                                    {item.specialty || "Bác sĩ chuyên khoa"}
                                </span>
                            </div>
                            <Link
                                href={item.button_link || "#"}
                                className="btn btn-square btn-secondary"
                            >
                                <i className="feather icon-arrow-right" />
                            </Link>
                        </div>

                        <ul className="dz-social">
                            {item.socials?.linkedin ? (
                                <li>
                                    <Link href={item.socials.linkedin} target="_blank">
                                        <i className="fa-brands fa-linkedin" />
                                    </Link>
                                </li>
                            ) : null}
                            {item.socials?.facebook ? (
                                <li>
                                    <Link href={item.socials.facebook} target="_blank">
                                        <i className="fa-brands fa-facebook-f" />
                                    </Link>
                                </li>
                            ) : null}
                            {item.socials?.twitter ? (
                                <li>
                                    <Link href={item.socials.twitter} target="_blank">
                                        <i className="fa-brands fa-x-twitter" />
                                    </Link>
                                </li>
                            ) : null}
                            {item.socials?.youtube ? (
                                <li>
                                    <Link href={item.socials.youtube} target="_blank">
                                        <i className="fa-brands fa-youtube" />
                                    </Link>
                                </li>
                            ) : null}
                        </ul>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SurgeryBlog;