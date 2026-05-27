// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { serviceboxdata } from "../constant/alldata";
// import { normalizeImageUrl } from "@/lib/normalizeImageUrl";

// type ServiceItem = {
//   title?: string;
//   description?: string | null;
//   doctor_text?: string;
//   link?: string;
//   image?: string | null;
// };

// type ServiceBoxData = {
//   items?: ServiceItem[];
// };

// type PostItem = {
//   id: number;
//   name?: string;
//   slug?: string;
//   image?: string | null;
//   icon?: string | null;
//   description?: string | null;
// };

// type ServiceBoxProps = {
//   data?: ServiceBoxData;
//   posts?: PostItem[];
//   useFallback?: boolean;
// };

// function normalizeServiceLink(link?: string) {
//   if (!link) return "#";

//   // nếu đã đúng rồi thì giữ nguyên
//   if (link.startsWith("/dich-vu/")) return link;

//   // nếu admin trả /services/... thì convert
//   if (link.startsWith("/services/")) {
//     return link.replace("/services/", "/dich-vu/");
//   }

//   // nếu chỉ là slug
//   return `/dich-vu/${link.replace(/^\//, "")}`;
// }
// function ServiceBox({ data, posts, useFallback = true }: ServiceBoxProps) {
//   const [active, setActive] = useState(1);

//   const hasPosts = !!posts && posts.length > 0;
//   const hasSettingItems = !!data?.items && data.items.length > 0;

//   const services = hasSettingItems
//     ? data!.items!.map((item, index) => ({
//         id: index + 1,
//         delay: `${0.1 * (index + 1)}s`,
//         title: item.title || "Dịch vụ",
//         description: item.description || "Nội dung dịch vụ đang được cập nhật.",
//         subText: item.doctor_text || "Xem chi tiết",
//         // link: item.link || "#",
//         link: normalizeServiceLink(item.link),
//         image: normalizeImageUrl(item.image),
//         svg1:
//           serviceboxdata[index % serviceboxdata.length]?.svg1 ||
//           serviceboxdata[0].svg1,
//         svg2:
//           serviceboxdata[index % serviceboxdata.length]?.svg2 ||
//           serviceboxdata[0].svg2,
//       }))
//     : hasPosts
//       ? posts!.map((item, index) => ({
//           id: item.id || index + 1,
//           delay: `${0.1 * (index + 1)}s`,
//           title: item.name || "Dịch vụ",
//           description:
//             item.description || "Nội dung dịch vụ đang được cập nhật.",
//           subText: "Xem chi tiết",
//           link: item.slug ? `/dich-vu/${item.slug}` : "/dich-vu",
//           image: normalizeImageUrl(item.icon),
//           svg1:
//             serviceboxdata[index % serviceboxdata.length]?.svg1 ||
//             serviceboxdata[0].svg1,
//           svg2:
//             serviceboxdata[index % serviceboxdata.length]?.svg2 ||
//             serviceboxdata[0].svg2,
//         }))
//       : hasSettingItems
//         ? data!.items!.map((item, index) => ({
//             id: index + 1,
//             delay: `${0.1 * (index + 1)}s`,
//             title: item.title || "Dịch vụ",
//             description:
//               item.description || "Nội dung dịch vụ đang được cập nhật.",
//             subText: item.doctor_text || "Xem chi tiết",
//             link: item.link || "#",
//             image: normalizeImageUrl(item.image),
//             svg1:
//               serviceboxdata[index % serviceboxdata.length]?.svg1 ||
//               serviceboxdata[0].svg1,
//             svg2:
//               serviceboxdata[index % serviceboxdata.length]?.svg2 ||
//               serviceboxdata[0].svg2,
//           }))
//         : useFallback
//           ? serviceboxdata.map((item) => ({
//               id: item.id,
//               delay: item.delay,
//               title: item.title,
//               description: "Nội dung dịch vụ đang được cập nhật.",
//               subText: "Xem chi tiết",
//               link: "/service-detail",
//               image: null,
//               svg1: item.svg1,
//               svg2: item.svg2,
//             }))
//           : [];

//   if (!services.length) {
//     return (
//       <div className="row">
//         <div className="col-12">
//           <div
//             className="text-center p-5 rounded-4 bg-white shadow-sm"
//             style={{ border: "1px solid #e9eef5" }}
//           >
//             <div
//               className="mx-auto mb-3 d-flex align-items-center justify-content-center rounded-circle"
//               style={{
//                 width: 72,
//                 height: 72,
//                 background: "#eef6ff",
//                 color: "#0d2a6b",
//                 fontSize: 28,
//               }}
//             >
//               <i className="feather icon-file-text" />
//             </div>

//             <h3 className="mb-2">Chưa có bài viết</h3>
//             <p className="mb-0 text-muted">
//               Vui lòng bật Home cho dịch vụ trong trang quản trị hoặc cập nhật
//               nội dung dịch vụ.
//             </p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="row">
//       {services.map((item, i) => (
//         <div
//           className="col-xl-3 col-md-6 m-b30 wow fadeInUp"
//           data-wow-delay={item.delay}
//           data-wow-duration="0.8s"
//           key={i}
//         >
//           <div
//             className={`icon-bx-wraper style-3 box-hover ${active === item.id ? "active" : ""}`}
//             onMouseEnter={() => setActive(item.id)}
//           >
//             <div className="icon-bx-head">
//               <div
//                 className="icon-bx"
//                 style={{
//                   width: 80,
//                   height: 80,
//                   overflow: "hidden",
//                   borderRadius: 12,
//                 }}
//               >
//                 {item.image ? (
//                   <img
//                     src={item.image}
//                     alt={item.title}
//                     style={{
//                       width: "100%",
//                       height: "100%",
//                       objectFit: "cover",
//                     }}
//                   />
//                 ) : (
//                   <span
//                     className="icon-cell"
//                     dangerouslySetInnerHTML={{ __html: item.svg1 }}
//                   />
//                 )}
//               </div>

//               {item.image ? (
//                 <span className="icon-bg d-flex align-items-center justify-content-center">
//                   <img
//                     src={item.image}
//                     alt={item.title}
//                     style={{
//                       width: 140,
//                       height: 140,
//                       objectFit: "cover",
//                       opacity: 0.12,
//                       borderRadius: 16,
//                     }}
//                   />
//                 </span>
//               ) : (
//                 <span
//                   className="icon-bg"
//                   dangerouslySetInnerHTML={{ __html: item.svg2 }}
//                 />
//               )}

//               <div className="icon-content">
//                 <h3 className="dz-title">{item.title}</h3>
//                 <p>{item.description}</p>
//               </div>
//             </div>

//             <div className="icon-bx-footer">
//               <span className="text-badge">
//                 <i className="fa fa-circle text-primary" /> {item.subText}
//               </span>
//               <Link
//                 href={item.link}
//                 className="btn btn-square btn-primary rounded-circle"
//               >
//                 <i className="feather icon-arrow-up-right" />
//               </Link>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default ServiceBox;

"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { serviceboxdata } from "../constant/alldata";
import { normalizeImageUrl } from "@/lib/normalizeImageUrl";

type ServiceItem = {
  title?: string;
  description?: string | null;
  doctor_text?: string;
  link?: string;
  image?: string | null;
  icon?: string | null;
};

type ServiceBoxData = {
  items?: ServiceItem[];
};

type PostItem = {
  id: number;
  name?: string;
  slug?: string;
  image?: string | null;
  icon?: string | null;
  description?: string | null;
};

type ServiceBoxProps = {
  data?: ServiceBoxData;
  posts?: PostItem[];
  useFallback?: boolean;
};

type NormalizedService = {
  id: number;
  delay: string;
  title: string;
  description: string;
  subText: string;
  link: string;
  iconUrl?: string;
  fallbackSvg: string;
  fallbackBgSvg: string;
};

function normalizeServiceLink(link?: string): string {
  if (!link) return "#";
  if (link.startsWith("/dich-vu/")) return link;
  if (link.startsWith("/services/")) {
    return link.replace("/services/", "/dich-vu/");
  }

  return `/dich-vu/${link.replace(/^\//, "")}`;
}

function getFallbackIcon(index: number) {
  const fallback =
    serviceboxdata[index % serviceboxdata.length] || serviceboxdata[0];

  return {
    svg1: fallback.svg1,
    svg2: fallback.svg2,
  };
}

function ServiceBox({ data, posts, useFallback = true }: ServiceBoxProps) {
  const [active, setActive] = useState<number>(1);

  const services = useMemo<NormalizedService[]>(() => {
    const hasPosts = !!posts?.length;
    const hasSettingItems = !!data?.items?.length;

    if (hasPosts) {
      return posts.map((item, index) => {
        const fallback = getFallbackIcon(index);

        return {
          id: item.id || index + 1,
          delay: `${0.1 * (index + 1)}s`,
          title: item.name || "Dịch vụ",
          description:
            item.description || "Nội dung dịch vụ đang được cập nhật.",
          subText: "Xem chi tiết",
          link: item.slug ? `/dich-vu/${item.slug}` : "/dich-vu",
          iconUrl: normalizeImageUrl(item.icon || item.image),
          fallbackSvg: fallback.svg1,
          fallbackBgSvg: fallback.svg2,
        };
      });
    }

    if (hasSettingItems) {
      return data.items!.map((item, index) => {
        const fallback = getFallbackIcon(index);

        return {
          id: index + 1,
          delay: `${0.1 * (index + 1)}s`,
          title: item.title || "Dịch vụ",
          description:
            item.description || "Nội dung dịch vụ đang được cập nhật.",
          subText: item.doctor_text || "Xem chi tiết",
          link: normalizeServiceLink(item.link),
          iconUrl: normalizeImageUrl(item.icon || item.image),
          fallbackSvg: fallback.svg1,
          fallbackBgSvg: fallback.svg2,
        };
      });
    }

    if (!useFallback) return [];

    return serviceboxdata.map((item) => ({
      id: item.id,
      delay: item.delay,
      title: item.title,
      description: "Nội dung dịch vụ đang được cập nhật.",
      subText: "Xem chi tiết",
      link: "/service-detail",
      iconUrl: undefined,
      fallbackSvg: item.svg1,
      fallbackBgSvg: item.svg2,
    }));
  }, [data, posts, useFallback]);

  if (!services.length) {
    return (
      <div className="row">
        <div className="col-12">
          <div
            className="text-center p-5 rounded-4 bg-white shadow-sm"
            style={{ border: "1px solid #e9eef5" }}
          >
            <h3 className="mb-2">Chưa có bài viết</h3>
            <p className="mb-0 text-muted">
              Vui lòng bật Home cho dịch vụ trong trang quản trị hoặc cập nhật
              nội dung dịch vụ.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <style jsx global>{`
        .icon-bx-wraper.style-3 .service-upload-icon {
          width: 60px !important;
          height: 60px !important;
          object-fit: contain !important;
          display: block !important;
        }

        .icon-bx-wraper.style-3 .service-upload-icon-bg {
          width: 160px !important;
          height: 160px !important;
          object-fit: contain !important;
          display: block !important;
          opacity: 0.05;
        }

        .icon-bx-wraper.style-3.active .service-upload-icon,
        .icon-bx-wraper.style-3:hover .service-upload-icon {
          filter: brightness(0) invert(1);
        }

        .icon-bx-wraper.style-3 .icon-bx {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .icon-bx-wraper.style-3 .icon-bg {
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
        }
      `}</style>

      <div className="row">
        {services.map((item, index) => (
          <div
            className="col-xl-3 col-md-6 m-b30 wow fadeInUp"
            data-wow-delay={item.delay}
            data-wow-duration="0.8s"
            key={`${item.id}-${index}`}
          >
            <div
              className={`icon-bx-wraper style-3 box-hover ${
                active === item.id ? "active" : ""
              }`}
              onMouseEnter={() => setActive(item.id)}
            >
              <div className="icon-bx-head">
                <div className="icon-bx">
                  {item.iconUrl ? (
                    <img
                      src={item.iconUrl}
                      alt={item.title}
                      className="service-upload-icon"
                    />
                  ) : (
                    <span
                      className="icon-cell"
                      dangerouslySetInnerHTML={{ __html: item.fallbackSvg }}
                    />
                  )}
                </div>

                {item.iconUrl ? (
                  <span className="icon-bg">
                    <img
                      src={item.iconUrl}
                      alt=""
                      aria-hidden="true"
                      className="service-upload-icon-bg"
                    />
                  </span>
                ) : (
                  <span
                    className="icon-bg"
                    dangerouslySetInnerHTML={{ __html: item.fallbackBgSvg }}
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
    </>
  );
}

export default ServiceBox;
