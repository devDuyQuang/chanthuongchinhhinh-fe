import type { Metadata } from "next";
import Link from "next/link";
import { IMAGES, SVGICONS } from "@/constant/theme";
import Footer from "@/layout/Footer";
import Image from "next/image";
import { getCategoryBySlug, getCategories } from "@/services/categoryService";
import { normalizeImageUrl } from "@/lib/normalizeImageUrl";
import ImageLightboxActivator from "@/component/ImageLightboxContent";

export async function generateMetadata(
    { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
    const { slug } = await params;
    const category = await getCategoryBySlug(slug + '?limit=7');

    const title = `${category?.title_seo || category?.name || "Dịch vụ"} - DrDuongOrtho`;
    const description = category?.description_seo || category?.description || "";
    const canonical = category?.canonical_seo;
    const image = normalizeImageUrl(category?.image);

    return {
        title,
        description,
        ...(canonical && {
            alternates: {
                canonical,
            },
        }),
        openGraph: {
            title,
            description: description ?? undefined,
            ...(image && {
                images: [{ url: image }],
            }),
        },
    };
}

async function ServiceDetail({ params }: { params: Promise<{ slug: string }>; }) {
    const { slug } = await params;

    const [category, categories] = await Promise.all([
        getCategoryBySlug(slug + '?limit=7'),
        getCategories(),
    ]);

    const name = category?.name;
    const description = category?.description;
    const content = category?.content;
    const created_at = category?.created_at;
    const image = normalizeImageUrl(category?.image);
    const posts = category?.posts?.data;
    const breadcrumbs = category?.breadcrumbs;

    return (
        <>
            <main className="page-content">
                <div className="dz-bnr-inr dz-banner-dark overlay-secondary-middle dz-bnr-inr-md" style={{ backgroundImage: `url(${image})` }}>
                    <div className="container">
                        <div className="dz-bnr-inr-entry d-table-cell">
                            <h1 className="wow fadeInUp" data-wow-delay="0.2s" data-wow-duration="0.8s">{name}</h1>
                            {/* {created_at && (
                                <div className="dz-meta style-1">
                                    <ul className="justify-content-center">
                                        <li className="post-date">
                                            {new Date(created_at).toLocaleDateString("en-GB", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                            })}
                                        </li>
                                        <li className="dz-comment">
                                            <i className="fa-solid fa-eye" />
                                            <Link href="#" scroll={false}>
                                                100 Lượt xem
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            )} */}
                            <div className="dz-btn">
                                <Link href="tel:0389951795" className="btn btn-lg btn-icon btn-primary radius-xl btn-shadow mb-3 mb-sm-0">
                                    <span className="left-icon"> <i className="feather icon-phone-call" /> </span> 038 995 1795
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <section className="content-inner service-single">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 single-inner order-lg-1">
                                <nav aria-label="breadcrumb" className="breadcrumb-row wow fadeInUp" data-wow-delay="0.4s" data-wow-duration="0.8s">
                                    <ul className="breadcrumb">
                                        {(breadcrumbs || []).map((item, index) => (
                                            <li key={index} className={`breadcrumb-item ${item.active ? 'active' : ''}`} style={item.active ? { color: '#000' } : {}}>
                                                {item.active ? (
                                                    <>
                                                        {index === 0 && <i className="fa-solid fa-house me-1" />}
                                                        {item.name}
                                                    </>
                                                ) : (
                                                    <Link href={item.slug.startsWith('/') ? item.slug : `/${item.slug}`}>
                                                        {index === 0 && <i className="fa-solid fa-house me-1" />}
                                                        {item.name}
                                                    </Link>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </nav>
                                {description ? (
                                    <blockquote
                                        style={{
                                            position: 'relative',
                                            background: 'transparent',
                                            borderTop: '2px solid rgba(0,0,0,0.05)',
                                            borderBottom: '2px solid rgba(0,0,0,0.05)',
                                            padding: '30px 10px',
                                            marginBottom: '40px',
                                            marginTop: '10px',
                                            fontFamily: 'inherit',
                                            fontSize: 'inherit',
                                            fontWeight: 'inherit',
                                            color: 'inherit',
                                        }}
                                    >
                                        <span
                                            aria-hidden="true"
                                            style={{
                                                position: 'absolute',
                                                top: '0',
                                                left: '0',
                                                fontSize: '60px',
                                                lineHeight: 1,
                                                color: 'rgba(0,0,0,0.05)',
                                                fontFamily: 'Georgia, serif',
                                                fontWeight: 700,
                                                userSelect: 'none',
                                            }}
                                        >
                                            &ldquo;
                                        </span>
                                        <p
                                            style={{
                                                fontSize: '1.08rem',
                                                lineHeight: '1.85',
                                                fontStyle: 'italic',
                                                color: '#1e3a5f',
                                                margin: 0,
                                                fontWeight: 500,
                                                letterSpacing: '0.01em',
                                            }}
                                        >
                                            <span
                                                style={{
                                                    float: 'left',
                                                    fontSize: '3.6rem',
                                                    lineHeight: '0.8',
                                                    fontWeight: 700,
                                                    fontStyle: 'normal',
                                                    color: 'var(--bs-primary, #1a6fc4)',
                                                    marginRight: '6px',
                                                    marginTop: '6px',
                                                    fontFamily: 'Georgia, serif',
                                                    letterSpacing: '-1px',
                                                }}
                                            >
                                                {description.charAt(0)}
                                            </span>
                                            {description.slice(1)}
                                        </p>
                                    </blockquote>
                                ) : null}
                                {
                                    content && (
                                        <>
                                            <div
                                                className="content-item wow fadeInUp add-style"
                                                data-wow-delay="0.2s"
                                                data-wow-duration="0.7s"
                                                dangerouslySetInnerHTML={{ __html: content }}
                                            />
                                            <ImageLightboxActivator containerSelector=".content-item" />
                                        </>
                                    )
                                }
                                <div className="content-item wow fadeInUp" data-wow-delay="0.5s" data-wow-duration="0.7s">
                                    <h3>Có thể bạn quan tâm?</h3>
                                    <div className="row loadmore-content">
                                        {posts && posts.map((item, i) => (
                                            <div className="dz-card style-2 blog-half m-b35 wow fadeInUp" data-wow-delay="0.1s" data-wow-duration="0.5s" key={i}>
                                                <div className="dz-media">
                                                    <Image src={normalizeImageUrl(item?.image) ?? ''} alt={item?.name} width={500} height={500} />
                                                </div>
                                                <div className="dz-info">
                                                    <div className="dz-meta">
                                                        <ul className="p-0">
                                                            <li className="post-date mb-0">
                                                                {new Date(item?.created_at).toLocaleDateString("en-GB", {
                                                                    day: "2-digit",
                                                                    month: "short",
                                                                    year: "numeric",
                                                                })}
                                                            </li>
                                                            <li className="post-comments">100 lượt xem</li>
                                                        </ul>
                                                    </div>
                                                    <h3><Link href={"/" + item?.slug} scroll={false}>{item?.name}</Link></h3>
                                                    <p style={{
                                                        display: '-webkit-box',
                                                        WebkitLineClamp: 2,
                                                        WebkitBoxOrient: 'vertical',
                                                        overflow: 'hidden',
                                                        margin: '8px 0 12px',
                                                        fontSize: '16px',
                                                    }}>{item?.description}</p>
                                                    <Link href={"/" + item?.slug} scroll={false} className="btn icon-link-hover-end btn-primary radius-sm">
                                                        Đọc Thêm <i className="feather icon-arrow-right" />
                                                    </Link>
                                                </div>
                                            </div>
                                        ))}
                                        {/* <div className="text-center m-t30 m-lg-t0 wow fadeInUp" data-wow-delay="0.7s" data-wow-duration="0.5s"
                                            onClick={() => handleMoreItem()}
                                        >
                                            <Link href={"#"} scroll={false} className={`btn btn-lg btn-icon btn-primary ${refresh ? "dz-load-more" : ""}`}>
                                                Load More <span className="right-icon"><i className="feather icon-refresh-ccw" /></span>
                                            </Link>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 m-b30 d-flex flex-column side-bar left">
                                <div className="widget service_menu_nav bg-secondary wow fadeInUp" data-wow-delay="0.2s" data-wow-duration="0.7s">
                                    <div className="widget-title">
                                        <h4 className="title">Tất cả Dịch vụ</h4>
                                    </div>
                                    <ul>
                                        {(categories as any[]).map((parent, i) => {
                                            const isParentActive = parent.slug === slug;
                                            const hasActiveChild = parent.children?.some((c: { slug: string }) => c.slug === slug);
                                            return (
                                                <li key={i} className={isParentActive || hasActiveChild ? 'active' : ''}>
                                                    <Link
                                                        href={`/dich-vu/${parent.slug}`}
                                                        scroll={false}
                                                        className={isParentActive ? 'active' : ''}
                                                        style={isParentActive ? {
                                                            backgroundColor: 'var(--bs-primary)',
                                                            color: '#ffffff',
                                                            fontWeight: 700,
                                                        } : {}}
                                                    >
                                                        {parent.name}
                                                    </Link>
                                                    {parent.children && parent.children.length > 0 && (
                                                        <ul className="sub-menu">
                                                            {parent.children.map((child: { name: string; slug: string }, j: number) => {
                                                                const isChildActive = child.slug === slug;
                                                                return (
                                                                    <li key={j} className={isChildActive ? 'active' : ''}>
                                                                        <Link
                                                                            href={`/dich-vu/${child.slug}`}
                                                                            scroll={false}
                                                                            className={isChildActive ? 'active' : ''}
                                                                            style={isChildActive ? {
                                                                                color: 'var(--bs-primary)',
                                                                                fontWeight: 700,
                                                                                borderLeft: '3px solid var(--bs-primary)',
                                                                            } : {}}
                                                                        >
                                                                            + {child.name}
                                                                        </Link>
                                                                    </li>
                                                                );
                                                            })}
                                                        </ul>
                                                    )}
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                                <div className="sticky-top">
                                    <div className="widget_contact"
                                        style={{ backgroundImage: `url(${IMAGES.bg3png.src})` }}
                                    >
                                        <div className="widget-content">
                                            <Image src={IMAGES.question} width="80" alt="icon help" />
                                            <h4 className="title">Bạn có cần giúp đỡ gì không?</h4>
                                            <div className="phone-number">
                                                <Link href="tel:0389951795">038 995 1795</Link>
                                            </div>
                                            <div className="email">
                                                <Link href="mailto:odrduong@gmail.com">odrduong@gmail.com</Link>
                                            </div>
                                            <div className="link-btn">
                                                <Link href="/lien-he" scroll={false} className="btn btn-lg btn-icon btn-white hover-secondary btn-shadow">
                                                    Liên hệ ngay <span className="right-icon"><i className="feather icon-arrow-right" /></span>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
export default ServiceDetail;