import { IMAGES } from "@/constant/theme";
import Link from "next/link";
import Image from "next/image";
import { getSetting } from "@/services/settingService";
import { getCategories } from "@/services/categoryService";
import { serviceboxdata } from "@/constant/alldata";
import { normalizeImageUrl } from "@/lib/normalizeImageUrl";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Dịch vụ Chấn thương Chỉnh hình - DrDuongOrtho",
    description: "Danh sách các dịch vụ chuyên khoa Chấn thương Chỉnh hình, điều trị bệnh lý cơ xương khớp, chấn thương thể thao và phục hồi chức năng chuyên sâu.",
    openGraph: {
        title: "Dịch vụ Chấn thương Chỉnh hình - DrDuongOrtho",
        description: "Danh sách các dịch vụ chuyên khoa Chấn thương Chỉnh hình, điều trị bệnh lý cơ xương khớp, chấn thương thể thao và phục hồi chức năng chuyên sâu.",
        type: "website",
        locale: "vi_VN",
        siteName: "DrDuongOrtho",
    },
    twitter: {
        card: "summary_large_image",
        title: "Dịch vụ Chấn thương Chỉnh hình - DrDuongOrtho",
        description: "Danh sách các dịch vụ chuyên khoa Chấn thương Chỉnh hình, điều trị bệnh lý cơ xương khớp, chấn thương thể thao và phục hồi chức năng chuyên sâu.",
    },
};

async function Services() {
    const categories = await getCategories();

    return (
        <>
            <main className="page-content">
                <div className="dz-bnr-inr dz-banner-dark overlay-secondary-middle dz-bnr-inr-md" style={{ backgroundImage: `url(${'assets/images/banner/banner-dichvu.jpg'})` }}>
                    <div className="container">
                        <div className="dz-bnr-inr-entry d-table-cell">
                            <h1 className="wow fadeInUp" data-wow-delay="0.2s" data-wow-duration="0.8s">Dịch vụ</h1>
                            <nav aria-label="breadcrumb" className="breadcrumb-row wow fadeInUp" data-wow-delay="0.4s" data-wow-duration="0.8s">
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item"><Link href="/">Trang Chủ</Link></li>
                                    <li className="breadcrumb-item">Dịch vụ</li>
                                </ul>
                            </nav>
                            <div className="dz-btn">
                                <Link href="tel:0389951795" className="btn btn-lg btn-icon btn-primary radius-xl btn-shadow mb-3 mb-sm-0">
                                    <span className="left-icon"> <i className="feather icon-phone-call" /> </span> 038 995 1795
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <section className="content-inner bg-light" style={{ backgroundImage: `url(${IMAGES.bg5png.src})` }}>
                    <div className="container">
                        {categories.map((parent, pIndex) => (
                            <div key={pIndex} className={pIndex !== categories.length - 1 ? "m-b50" : ""}>
                                <div className="section-head style-1 m-b30 row align-items-end">
                                    <div
                                        className="col-xl-7 col-md-9 wow fadeInUp"
                                        data-wow-delay="0.2s"
                                        data-wow-duration="0.8s"
                                    >
                                        <h2 className="title m-b0 fw-bold">
                                            {parent.name}
                                        </h2>
                                    </div>

                                    <div
                                        className="col-xl-5 col-md-3 text-lg-end d-none d-md-block wow fadeInUp"
                                        data-wow-delay="0.4s"
                                        data-wow-duration="0.8s"
                                    >
                                        <Link
                                            href={`/dich-vu/${parent.slug}`}
                                            className="btn btn-icon btn-primary btn-shadow"
                                        >
                                            Xem tất cả
                                            <span className="right-icon">
                                                <i className="feather icon-arrow-right" />
                                            </span>
                                        </Link>
                                    </div>
                                </div>
                                <div className="row">
                                    {parent.children && parent.children.length > 0 ? (
                                        parent.children.map((child: any, i: number) => {
                                            const svg1 = serviceboxdata[i % serviceboxdata.length]?.svg1 || serviceboxdata[0].svg1;
                                            const svg2 = serviceboxdata[i % serviceboxdata.length]?.svg2 || serviceboxdata[0].svg2;
                                            const image = normalizeImageUrl(child.image);
                                            const delay = `${0.1 * (i + 1)}s`;
                                            const link = `/dich-vu/${child.slug}`;

                                            return (
                                                <div
                                                    className="col-xl-3 col-md-6 m-b30 wow fadeInUp"
                                                    data-wow-delay={delay}
                                                    data-wow-duration="0.8s"
                                                    key={i}
                                                >
                                                    <div className={`icon-bx-wraper style-3 box-hover ${i === 0 ? "active" : ""}`}>
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
                                                                {image ? (
                                                                    <Image
                                                                        src={image}
                                                                        alt={child.name}
                                                                        width={0}
                                                                        height={0}
                                                                        sizes="100vw"
                                                                        unoptimized
                                                                        style={{
                                                                            width: "100%",
                                                                            height: "100%",
                                                                            objectFit: "cover",
                                                                        }}
                                                                    />
                                                                ) : (
                                                                    <span
                                                                        className="icon-cell"
                                                                        dangerouslySetInnerHTML={{ __html: svg1 }}
                                                                    />
                                                                )}
                                                            </div>

                                                            {image ? (
                                                                <span className="icon-bg d-flex align-items-center justify-content-center">
                                                                    <Image
                                                                        src={image}
                                                                        alt={child.name}
                                                                        width={0}
                                                                        height={0}
                                                                        sizes="100vw"
                                                                        unoptimized
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
                                                                    dangerouslySetInnerHTML={{ __html: svg2 }}
                                                                />
                                                            )}

                                                            <div className="icon-content">
                                                                <h3 className="dz-title">{child.name}</h3>
                                                                <p>{child.description || "Nội dung dịch vụ đang được cập nhật."}</p>
                                                            </div>
                                                        </div>

                                                        <div className="icon-bx-footer">
                                                            <span className="text-badge">
                                                                <i className="fa fa-circle text-primary" /> Xem chi tiết
                                                            </span>
                                                            <Link
                                                                href={link}
                                                                className="btn btn-square btn-primary rounded-circle"
                                                            >
                                                                <i className="feather icon-arrow-up-right" />
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    ) : (
                                        <div className="col-12 m-b30 text-muted">
                                            Chưa có dịch vụ nào trong danh mục này.
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main >
        </>
    );
}
export default Services;