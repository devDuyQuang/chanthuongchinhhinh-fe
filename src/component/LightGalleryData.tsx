// "use client"
// // import Link from "next/link";
// import { IMAGES } from "../constant/theme";
// import LightGallery from 'lightgallery/react';
// import lgThumbnail from 'lightgallery/plugins/thumbnail';
// import lgZoom from 'lightgallery/plugins/zoom';
// import Image from "next/image";

// function LightGalleryData() {
//     return (        
//         <div className="overflow-hidden">
//             <LightGallery
//                 zoom={true}
//                 thumbnail={true}
//                 plugins={[lgThumbnail, lgZoom]}
//                 selector='.lightimg'
//             >
//                 <div className="dz-img-wrapper" id="lightgallery">
//                     <div className="left-wrapper">
//                         <div className="dz-media media-lg">
//                             <a href={IMAGES.portfolio1.src} data-src={IMAGES.portfolio1.src} className="lg-item lightimg">
//                                 <Image src={IMAGES.portfolio1} alt="portfolio" />
//                             </a>
//                         </div>
//                         <div className="media-inner">
//                             <div className="dz-media media-md">
//                                 <a href={IMAGES.portfolio2.src} data-src={IMAGES.portfolio2.src} className="lg-item lightimg">
//                                     <Image src={IMAGES.portfolio2} alt="portfolio" />
//                                 </a>
//                             </div>
//                             <div className="dz-media media-sm">
//                                 <a href={IMAGES.portfolio3.src} data-src={IMAGES.portfolio3.src} className="lg-item lightimg">
//                                     <Image src={IMAGES.portfolio3} alt="portfolio" />
//                                 </a>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="right-wrapper">
//                         <div className="media-inner">
//                             <div className="dz-media media-sm">
//                                 <a href={IMAGES.portfolio4.src} data-src={IMAGES.portfolio4.src} className="lg-item lightimg">
//                                     <Image src={IMAGES.portfolio4} alt="portfolio" />
//                                 </a>
//                             </div>
//                             <div className="dz-media media-md">
//                                 <a href={IMAGES.portfolio5.src} data-src={IMAGES.portfolio5.src} className="lg-item lightimg">
//                                     <Image src={IMAGES.portfolio5} alt="" />
//                                 </a>
//                             </div>
//                         </div>
//                         <div className="dz-media media-lg">
//                             <a href={IMAGES.portfolio6.src} data-src={IMAGES.portfolio6.src} className="lg-item lightimg">
//                                 <Image src={IMAGES.portfolio6} alt="portfolio" />
//                             </a>
//                         </div>
//                     </div>
//                     <div className="left-wrapper">
//                         <div className="dz-media media-lg">
//                             <a href={IMAGES.portfolio1.src} data-src={IMAGES.portfolio1.src} className="lg-item lightimg">
//                                 <Image src={IMAGES.portfolio1} alt="portfolio" />
//                             </a>
//                         </div>
//                         <div className="media-inner">
//                             <div className="dz-media media-md">
//                                 <a href={IMAGES.portfolio2.src} data-src={IMAGES.portfolio2.src} className="lg-item lightimg">
//                                     <Image src={IMAGES.portfolio2} alt="portfolio" />
//                                 </a>
//                             </div>
//                             <div className="dz-media media-sm">
//                                 <a href={IMAGES.portfolio3.src} data-src={IMAGES.portfolio3.src} className="lg-item lightimg">
//                                     <Image src={IMAGES.portfolio3} alt="portfolio" />
//                                 </a>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="right-wrapper">
//                         <div className="media-inner">
//                             <div className="dz-media media-sm">
//                                 <a href={IMAGES.portfolio4.src} data-src={IMAGES.portfolio4.src} className="lg-item lightimg">
//                                     <Image src={IMAGES.portfolio4} alt="portfolio" />
//                                 </a>
//                             </div>
//                             <div className="dz-media media-md">
//                                 <a href={IMAGES.portfolio5.src} data-src={IMAGES.portfolio5.src} className="lg-item lightimg">
//                                     <Image src={IMAGES.portfolio5} alt="portfolio" />
//                                 </a>
//                             </div>
//                         </div>
//                         <div className="dz-media media-lg">
//                             <a href={IMAGES.portfolio6.src} data-src={IMAGES.portfolio6.src} className="lg-item lightimg">
//                                 <Image src={IMAGES.portfolio6} alt="portfolio" />
//                             </a>
//                         </div>
//                     </div>
//                 </div>
//             </LightGallery >
//         </div >        
//     )
// }
// export default LightGalleryData;

"use client";

import { IMAGES } from "../constant/theme";
import LightGallery from "lightgallery/react";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import Image from "next/image";
import { normalizeImageUrl } from "@/lib/normalizeImageUrl";

type LightGalleryDataProps = {
    data?: {
        images?: string[];
    };
};

// function normalizeImageUrl(url?: string | null): string | undefined {
//     if (!url) return undefined;

//     const baseUrl = "https://admin.chanthuongchinhhinh.com.vn";

//     if (url.startsWith("http://") || url.startsWith("https://")) {
//         return url;
//     }

//     if (url.startsWith("/storage/")) {
//         return `${baseUrl}${url}`;
//     }

//     if (url.startsWith("storage/")) {
//         return `${baseUrl}/${url}`;
//     }

//     if (url.startsWith("/uploads/")) {
//         return `${baseUrl}${url}`;
//     }

//     if (url.startsWith("uploads/")) {
//         return `${baseUrl}/${url}`;
//     }

//     return `${baseUrl}/${url}`;
// }

function LightGalleryData({ data }: LightGalleryDataProps) {
    const gallery =
        data?.images && data.images.length > 0
            ? data.images
                .map((item) => normalizeImageUrl(item))
                .filter((item): item is string => Boolean(item))
            : [
                IMAGES.portfolio1.src,
                IMAGES.portfolio2.src,
                IMAGES.portfolio3.src,
                IMAGES.portfolio4.src,
                IMAGES.portfolio5.src,
                IMAGES.portfolio6.src,
            ];

    const getImage = (index: number) => gallery[index % gallery.length];

    return (
        <div className="overflow-hidden">
            <LightGallery zoom={true} thumbnail={true} plugins={[lgThumbnail, lgZoom]} selector=".lightimg">
                <div className="dz-img-wrapper" id="lightgallery">
                    <div className="left-wrapper">
                        <div className="dz-media media-lg">
                            <a href={getImage(0)} data-src={getImage(0)} className="lg-item lightimg">
                                <Image src={getImage(0)} alt="portfolio" width={800} height={800} unoptimized />
                            </a>
                        </div>
                        <div className="media-inner">
                            <div className="dz-media media-md">
                                <a href={getImage(1)} data-src={getImage(1)} className="lg-item lightimg">
                                    <Image src={getImage(1)} alt="portfolio" width={800} height={800} unoptimized />
                                </a>
                            </div>
                            <div className="dz-media media-sm">
                                <a href={getImage(2)} data-src={getImage(2)} className="lg-item lightimg">
                                    <Image src={getImage(2)} alt="portfolio" width={800} height={800} unoptimized />
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="right-wrapper">
                        <div className="media-inner">
                            <div className="dz-media media-sm">
                                <a href={getImage(3)} data-src={getImage(3)} className="lg-item lightimg">
                                    <Image src={getImage(3)} alt="portfolio" width={800} height={800} unoptimized />
                                </a>
                            </div>
                            <div className="dz-media media-md">
                                <a href={getImage(0)} data-src={getImage(0)} className="lg-item lightimg">
                                    <Image src={getImage(0)} alt="portfolio" width={800} height={800} unoptimized />
                                </a>
                            </div>
                        </div>
                        <div className="dz-media media-lg">
                            <a href={getImage(1)} data-src={getImage(1)} className="lg-item lightimg">
                                <Image src={getImage(1)} alt="portfolio" width={800} height={800} unoptimized />
                            </a>
                        </div>
                    </div>

                    <div className="left-wrapper">
                        <div className="dz-media media-lg">
                            <a href={getImage(2)} data-src={getImage(2)} className="lg-item lightimg">
                                <Image src={getImage(2)} alt="portfolio" width={800} height={800} unoptimized />
                            </a>
                        </div>
                        <div className="media-inner">
                            <div className="dz-media media-md">
                                <a href={getImage(3)} data-src={getImage(3)} className="lg-item lightimg">
                                    <Image src={getImage(3)} alt="portfolio" width={800} height={800} unoptimized />
                                </a>
                            </div>
                            <div className="dz-media media-sm">
                                <a href={getImage(0)} data-src={getImage(0)} className="lg-item lightimg">
                                    <Image src={getImage(0)} alt="portfolio" width={800} height={800} unoptimized />
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="right-wrapper">
                        <div className="media-inner">
                            <div className="dz-media media-sm">
                                <a href={getImage(1)} data-src={getImage(1)} className="lg-item lightimg">
                                    <Image src={getImage(1)} alt="portfolio" width={800} height={800} unoptimized />
                                </a>
                            </div>
                            <div className="dz-media media-md">
                                <a href={getImage(2)} data-src={getImage(2)} className="lg-item lightimg">
                                    <Image src={getImage(2)} alt="portfolio" width={800} height={800} unoptimized />
                                </a>
                            </div>
                        </div>
                        <div className="dz-media media-lg">
                            <a href={getImage(3)} data-src={getImage(3)} className="lg-item lightimg">
                                <Image src={getImage(3)} alt="portfolio" width={800} height={800} unoptimized />
                            </a>
                        </div>
                    </div>
                </div>
            </LightGallery>
        </div>
    );
}

export default LightGalleryData;