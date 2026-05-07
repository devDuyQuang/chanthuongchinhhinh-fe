// // "use client"
// // import { useState } from "react";
// // import Link from "next/link";
// // import { serviceboxdata } from "../constant/alldata";

// // function ServiceBox() {
// //     const [active, setActive] = useState(1);
// //     return (
// //         <>
// //             <div className="row">
// //                 {serviceboxdata.map((data, i) => (
// //                     <div className="col-xl-3 col-md-6 m-b30 wow fadeInUp" data-wow-delay={data.delay} data-wow-duration="0.8s" key={i}>
// //                         <div className={`icon-bx-wraper style-3 box-hover ${active === data.id ? 'active' : ''}`} onMouseEnter={() => setActive(data.id)}>
// //                             <div className="icon-bx-head">
// //                                 <div className="icon-bx">
// //                                     <span className="icon-cell" dangerouslySetInnerHTML={{__html : data.svg1}}>
// //                                     </span>
// //                                 </div>
// //                                 <span className="icon-bg"
// //                                     dangerouslySetInnerHTML={{__html : data.svg2}}>
// //                                 </span>
// //                                 <div className="icon-content">
// //                                     <h3 className="dz-title">{data.title}</h3>
// //                                     <p>It is a long established fact that a reader will be distracted by the readable content.</p>
// //                                 </div>
// //                             </div>
// //                             <div className="icon-bx-footer">
// //                                 <span className="text-badge"><i className="fa fa-circle text-primary" /> 25+ Doctor</span>
// //                                 <Link href="/service-detail" className="btn btn-square btn-primary rounded-circle">
// //                                     <i className="feather icon-arrow-up-right" />
// //                                 </Link>
// //                             </div>
// //                         </div>
// //                     </div>
// //                 ))}
// //             </div>
// //         </>
// //     )
// // }
// // export default ServiceBox;

// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { serviceboxdata } from "../constant/alldata";
// import Image from "next/image";

// type ServiceItem = {
//     title?: string;
//     description?: string;
//     doctor_text?: string;
//     link?: string;
// };

// type ServiceBoxData = {
//     items?: ServiceItem[];
// };

// type PostItem = {
//     id: number;
//     name?: string;
//     slug?: string;
//     image?: string | null;
//     description?: string | null;
//     created_at?: string;
//     views?: number;
//     favorites?: number;
// };

// type ServiceBoxProps = {
//     data?: ServiceBoxData;
//     posts?: PostItem[];
// };

// function normalizeImageUrl(url?: string | null) {
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

// function ServiceBox({ data, posts }: ServiceBoxProps) {
//     const [active, setActive] = useState(1);

//     const services =
//         posts && posts.length > 0
//             ? posts.map((item, index) => ({
//                 id: item.id || index + 1,
//                 delay: `${0.1 * (index + 1)}s`,
//                 title: item.name || serviceboxdata[index]?.title || "Dịch vụ",
//                 description:
//                     item.description ||
//                     "Nội dung dịch vụ đang được cập nhật.",
//                 subText: "Xem chi tiết",
//                 // link: item.slug ? `/services/${item.slug}` : "/service-detail",
//                 // link: item.slug ? `/dich-vu/${item.slug}` : "/dich-vu",
//                 link: item.slug ? `/${item.slug}` : "/dich-vu",
//                 image: normalizeImageUrl(item.image),
//                 svg1: serviceboxdata[index % serviceboxdata.length]?.svg1 || serviceboxdata[0].svg1,
//                 svg2: serviceboxdata[index % serviceboxdata.length]?.svg2 || serviceboxdata[0].svg2,
//             }))
//             : data?.items && data.items.length > 0
//                 ? data.items.map((item, index) => ({
//                     id: index + 1,
//                     delay: `${0.1 * (index + 1)}s`,
//                     title: item.title || serviceboxdata[index]?.title || "Dịch vụ",
//                     description:
//                         item.description ||
//                         "Nội dung dịch vụ đang được cập nhật.",
//                     subText: item.doctor_text || "Xem chi tiết",
//                     link: item.link || "/service-detail",
//                     image: null,
//                     svg1: serviceboxdata[index % serviceboxdata.length]?.svg1 || serviceboxdata[0].svg1,
//                     svg2: serviceboxdata[index % serviceboxdata.length]?.svg2 || serviceboxdata[0].svg2,
//                 }))
//                 : serviceboxdata.map((item) => ({
//                     id: item.id,
//                     delay: item.delay,
//                     title: item.title,
//                     description:
//                         "Nội dung dịch vụ đang được cập nhật.",
//                     subText: "Xem chi tiết",
//                     link: "/service-detail",
//                     image: null,
//                     svg1: item.svg1,
//                     svg2: item.svg2,
//                 }));

//     return (
//         <div className="row">
//             {services.map((item, i) => (
//                 <div
//                     className="col-xl-3 col-md-6 m-b30 wow fadeInUp"
//                     data-wow-delay={item.delay}
//                     data-wow-duration="0.8s"
//                     key={i}
//                 >
//                     <div
//                         className={`icon-bx-wraper style-3 box-hover ${active === item.id ? "active" : ""
//                             }`}
//                         onMouseEnter={() => setActive(item.id)}
//                     >
//                         <div className="icon-bx-head">
//                             {item.image ? (
//                                 <div className="service-thumb m-b20">
//                                     <Image
//                                         src={item.image}
//                                         alt={item.title}
//                                         width={400}
//                                         height={240}
//                                         style={{
//                                             width: "100%",
//                                             height: "220px",
//                                             objectFit: "cover",
//                                             borderRadius: "20px",
//                                         }}
//                                         unoptimized
//                                     />
//                                 </div>
//                             ) : (
//                                 <>
//                                     <div className="icon-bx">
//                                         <span
//                                             className="icon-cell"
//                                             dangerouslySetInnerHTML={{ __html: item.svg1 }}
//                                         />
//                                     </div>

//                                     <span
//                                         className="icon-bg"
//                                         dangerouslySetInnerHTML={{ __html: item.svg2 }}
//                                     />
//                                 </>
//                             )}

//                             <div className="icon-content">
//                                 <h3 className="dz-title">{item.title}</h3>
//                                 <p>{item.description}</p>
//                             </div>
//                         </div>

//                         <div className="icon-bx-footer">
//                             <span className="text-badge">
//                                 <i className="fa fa-circle text-primary" /> {item.subText}
//                             </span>
//                             <Link
//                                 href={item.link}
//                                 className="btn btn-square btn-primary rounded-circle"
//                             >
//                                 <i className="feather icon-arrow-up-right" />
//                             </Link>
//                         </div>
//                     </div>
//                 </div>
//             ))}
//         </div>
//     );
// }

// export default ServiceBox;

"use client";

import { useState } from "react";
import Link from "next/link";
import { serviceboxdata } from "../constant/alldata";
import { normalizeImageUrl } from "@/lib/normalizeImageUrl";

type ServiceItem = {
  title?: string;
  description?: string | null;
  doctor_text?: string;
  link?: string;
  image?: string | null;
};

type ServiceBoxData = {
  items?: ServiceItem[];
};

type PostItem = {
  id: number;
  name?: string;
  slug?: string;
  image?: string | null;
  description?: string | null;
};

type ServiceBoxProps = {
  data?: ServiceBoxData;
  posts?: PostItem[];
  useFallback?: boolean;
};

function normalizeServiceLink(link?: string) {
  if (!link) return "#";

  // nếu đã đúng rồi thì giữ nguyên
  if (link.startsWith("/dich-vu/")) return link;

  // nếu admin trả /services/... thì convert
  if (link.startsWith("/services/")) {
    return link.replace("/services/", "/dich-vu/");
  }

  // nếu chỉ là slug
  return `/dich-vu/${link.replace(/^\//, "")}`;
}
function ServiceBox({ data, posts, useFallback = true }: ServiceBoxProps) {
  const [active, setActive] = useState(1);

  const hasPosts = !!posts && posts.length > 0;
  const hasSettingItems = !!data?.items && data.items.length > 0;

  const services = hasSettingItems
    ? data!.items!.map((item, index) => ({
        id: index + 1,
        delay: `${0.1 * (index + 1)}s`,
        title: item.title || "Dịch vụ",
        description: item.description || "Nội dung dịch vụ đang được cập nhật.",
        subText: item.doctor_text || "Xem chi tiết",
        // link: item.link || "#",
        link: normalizeServiceLink(item.link),
        image: normalizeImageUrl(item.image),
        svg1:
          serviceboxdata[index % serviceboxdata.length]?.svg1 ||
          serviceboxdata[0].svg1,
        svg2:
          serviceboxdata[index % serviceboxdata.length]?.svg2 ||
          serviceboxdata[0].svg2,
      }))
    : hasPosts
      ? posts!.map((item, index) => ({
          id: item.id || index + 1,
          delay: `${0.1 * (index + 1)}s`,
          title: item.name || "Dịch vụ",
          description:
            item.description || "Nội dung dịch vụ đang được cập nhật.",
          subText: "Xem chi tiết",
          // link: item.slug ? `/${item.slug}` : "/dich-vu",
          link: item.slug ? `/dich-vu/${item.slug}` : "/dich-vu",
          image: normalizeImageUrl(item.image),
          svg1:
            serviceboxdata[index % serviceboxdata.length]?.svg1 ||
            serviceboxdata[0].svg1,
          svg2:
            serviceboxdata[index % serviceboxdata.length]?.svg2 ||
            serviceboxdata[0].svg2,
        }))
      : hasSettingItems
        ? data!.items!.map((item, index) => ({
            id: index + 1,
            delay: `${0.1 * (index + 1)}s`,
            title: item.title || "Dịch vụ",
            description:
              item.description || "Nội dung dịch vụ đang được cập nhật.",
            subText: item.doctor_text || "Xem chi tiết",
            link: item.link || "#",
            image: normalizeImageUrl(item.image),
            svg1:
              serviceboxdata[index % serviceboxdata.length]?.svg1 ||
              serviceboxdata[0].svg1,
            svg2:
              serviceboxdata[index % serviceboxdata.length]?.svg2 ||
              serviceboxdata[0].svg2,
          }))
        : useFallback
          ? serviceboxdata.map((item) => ({
              id: item.id,
              delay: item.delay,
              title: item.title,
              description: "Nội dung dịch vụ đang được cập nhật.",
              subText: "Xem chi tiết",
              link: "/service-detail",
              image: null,
              svg1: item.svg1,
              svg2: item.svg2,
            }))
          : [];

  if (!services.length) {
    return (
      <div className="row">
        <div className="col-12">
          <div
            className="text-center p-5 rounded-4 bg-white shadow-sm"
            style={{ border: "1px solid #e9eef5" }}
          >
            <div
              className="mx-auto mb-3 d-flex align-items-center justify-content-center rounded-circle"
              style={{
                width: 72,
                height: 72,
                background: "#eef6ff",
                color: "#0d2a6b",
                fontSize: 28,
              }}
            >
              <i className="feather icon-file-text" />
            </div>

            <h3 className="mb-2">Chưa có bài viết</h3>
            <p className="mb-0 text-muted">
              Danh mục này hiện chưa có nội dung. Vui lòng quay lại sau.
            </p>
          </div>
        </div>
      </div>
    );
  }

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
            className={`icon-bx-wraper style-3 box-hover ${active === item.id ? "active" : ""}`}
            onMouseEnter={() => setActive(item.id)}
          >
            <div className="icon-bx-head">
              <div
                className="icon-bx"
                style={{
                  width: 80,
                  height: 80,
                  overflow: "hidden",
                  borderRadius: 12,
                }}
              >
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <span
                    className="icon-cell"
                    dangerouslySetInnerHTML={{ __html: item.svg1 }}
                  />
                )}
              </div>

              {item.image ? (
                <span className="icon-bg d-flex align-items-center justify-content-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{
                      width: 140,
                      height: 140,
                      objectFit: "cover",
                      opacity: 0.12,
                      borderRadius: 16,
                    }}
                  />
                </span>
              ) : (
                <span
                  className="icon-bg"
                  dangerouslySetInnerHTML={{ __html: item.svg2 }}
                />
              )}

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
