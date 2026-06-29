import type { Metadata } from "next";
import Link from "next/link";
import { IMAGES, SVGICONS } from "@/constant/theme";
import Footer from "@/layout/Footer";
import Image from "next/image";
import { getCategoryBySlug, getCategories } from "@/services/categoryService";
import { normalizeImageUrl } from "@/lib/normalizeImageUrl";
import ImageLightboxActivator from "@/component/ImageLightboxContent";
import FloatingTOC from "@/component/FloatingTOC";
import ExpandableContent from "@/component/ExpandableContent";
import SidebarMenuParent from "./SidebarMenuParent";
import NavigationLink from "@/component/NavigationLink";

export async function generateMetadata(
    { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
    const { slug } = await params;
    const category = await getCategoryBySlug(slug, { limit: 9 });

    const title = `${category?.title_seo || category?.name || "Dịch vụ"} - DrDuongOrtho`;
    const description = category?.description_seo || category?.description || "";
    const canonical = category?.canonical_seo;
    const image = normalizeImageUrl(category?.image);

    return {
        title,
        description,
        alternates: {
            canonical: canonical || `/dich-vu/${slug}`,
        },
        openGraph: {
            title,
            description: description ?? undefined,
            type: "article",
            ...(image && {
                images: [{ url: image }],
            }),
        },
    };
}

async function ServiceDetail({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
    // Khởi tạo API không phụ thuộc vào params ngay lập tức để tải ngầm
    const categoriesPromise = getCategories();

    // Chờ params và searchParams đồng thời
    const [{ slug }, resolvedSearchParams] = await Promise.all([params, searchParams]);
    const page = Number(resolvedSearchParams?.page) || 1;

    // Chờ API phụ thuộc params và API độc lập cùng hoàn thành
    const [category, categories] = await Promise.all([
        getCategoryBySlug(slug, { limit: 9, page }),
        categoriesPromise,
    ]);

    const name = category?.name;
    const description = category?.description;
    const content = category?.content;
    const created_at = category?.created_at;
    const image = normalizeImageUrl(category?.image);
    const posts = category?.posts?.data;
    const pagination = category?.posts;
    const breadcrumbs = category?.breadcrumbs;
    const toc = category?.toc;
    const createdDate = created_at
        ? new Date(created_at).toLocaleDateString("vi-VN")
        : "N/A";

    return (
        <>
            <main className="page-content h-entry hentry">
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "Article",
                            headline: name || "Dịch vụ",
                            image: image ? [image] : undefined,
                            datePublished: created_at ? new Date(created_at).toISOString() : undefined,
                            dateModified: (category as any)?.updated_at ? new Date((category as any).updated_at).toISOString() : (created_at ? new Date(created_at).toISOString() : undefined),
                            description: description || "",
                            author: {
                                "@type": "Person",
                                name: "DrDuongOrtho",
                            }
                        })
                    }}
                />
                <span className="vcard author p-author h-card" style={{ display: 'none' }}><span className="fn">DrDuongOrtho</span></span>
                <div className="dz-bnr-inr dz-banner-dark overlay-secondary-middle dz-bnr-inr-md" style={{ backgroundImage: `url(${image})` }}>
                    <div className="container">
                        <div className="dz-bnr-inr-entry d-table-cell">
                            <h1 className="wow fadeInUp entry-title p-name" data-wow-delay="0.2s" data-wow-duration="0.8s">{name}</h1>
                            <div className="dz-meta">
                                <ul className="justify-content-center" style={{ gap: '15px' }}>
                                    <li className="updated published dt-published" style={{ background: '#031b4e', borderRadius: '30px', padding: '5px 20px', color: '#03bde0', fontWeight: 600, fontSize: '14px', display: 'flex', alignItems: 'center', margin: 0 }}>
                                        <i className="fa-solid fa-circle" style={{ fontSize: '8px', color: 'var(--bs-primary)', marginRight: '8px' }}></i>
                                        {created_at && (
                                            <time className="value" dateTime={new Date(created_at).toISOString()} style={{ display: 'none' }}>
                                                {new Date(created_at).toISOString()}
                                            </time>
                                        )}
                                        {createdDate}
                                    </li>

                                </ul>
                            </div>
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
                                        className="entry-summary p-summary"
                                        style={{
                                            position: 'relative',
                                            background: 'transparent',
                                            borderTop: '2px solid rgba(0,0,0,0.05)',
                                            borderBottom: '2px solid rgba(0,0,0,0.05)',
                                            padding: '30px 10px',
                                            marginBottom: '40px',
                                            marginTop: '0',
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
                                {content ? (
                                    <>
                                        <ExpandableContent content={content} maxHeight={400} syncHeightWithSelector=".side-bar.left" toc={toc} />
                                        <ImageLightboxActivator containerSelector=".entry-content" />
                                    </>
                                ) : null}

                            </div>
                            <div className="col-lg-4 m-b30 d-flex flex-column side-bar left">
                                <div className="widget service_menu_nav bg-secondary wow fadeInUp d-none d-lg-block" data-wow-delay="0.2s" data-wow-duration="0.7s">
                                    <style>{`
                                        .service_menu_nav ul li a::before,
                                        .service_menu_nav ul li a::after {
                                            display: none !important;
                                            content: none !important;
                                        }
                                    `}</style>
                                    <div className="widget-title position-relative" style={{ paddingBottom: '15px', marginBottom: '25px', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                                        <h4 className="title d-flex align-items-center" style={{ fontSize: '20px', fontWeight: 700, color: '#031b4e', margin: 0 }}>
                                            Tất cả Dịch vụ
                                        </h4>
                                    </div>
                                    <ul>
                                        {(categories as any[]).map((parent, i) => {
                                            const isParentActive = parent.slug === slug;
                                            const hasActiveChild = parent.children?.some((c: { slug: string }) => c.slug === slug);
                                            const isActive = isParentActive || hasActiveChild;
                                            return (
                                                <SidebarMenuParent 
                                                    key={i} 
                                                    parent={parent} 
                                                    slug={slug} 
                                                    isActive={isActive} 
                                                />
                                            );
                                        })}
                                    </ul>
                                </div>
                                <div>
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
                                                <Link href="/lien-he" className="btn btn-lg btn-icon btn-white hover-secondary btn-shadow">
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
                {posts && posts.length > 0 && (
                    <section className="content-inner border-top">
                        <div className="container">
                            <div className="content-item wow fadeInUp" data-wow-delay="0.5s" data-wow-duration="0.7s">
                                <h3 className="mb-4">Có thể bạn quan tâm?</h3>
                                <div className="row loadmore-content">
                                    {posts.map((item, i) => (
                                        <div className="col-xl-4 col-lg-4 col-md-6 mb-4" key={i}>
                                            <div className="dz-card shadow-sm border rounded overflow-hidden bg-white h-100 d-flex flex-column wow fadeInUp" data-wow-delay="0.1s" data-wow-duration="0.5s">
                                                <div className="dz-media" style={{ height: '220px', overflow: 'hidden' }}>
                                                    <NavigationLink href={"/" + item?.slug} style={{ display: 'block', width: '100%', height: '100%' }}>
                                                        <Image src={normalizeImageUrl(item?.image) ?? ''} alt={item?.name} width={500} height={500} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                    </NavigationLink>
                                                </div>
                                                <div className="dz-info p-4 d-flex flex-column flex-grow-1">
                                                    <div className="dz-meta mb-2">
                                                        <ul className="p-0 d-flex align-items-center gap-3 list-unstyled">
                                                            <li className="post-date mb-0 text-muted" style={{ fontSize: '13px' }}>
                                                                <i className="fa-regular fa-calendar me-1"></i>
                                                                {new Date(item?.created_at).toLocaleDateString("en-GB", {
                                                                    day: "2-digit",
                                                                    month: "short",
                                                                    year: "numeric",
                                                                })}
                                                            </li>

                                                        </ul>
                                                    </div>
                                                    <h3 style={{ fontSize: '18px', fontWeight: 600, lineHeight: 1.4, marginBottom: '10px' }}>
                                                        <NavigationLink href={"/" + item?.slug} className="text-dark text-decoration-none hover-primary">{item?.name}</NavigationLink>
                                                    </h3>
                                                    <p className="text-muted" style={{
                                                        display: '-webkit-box',
                                                        WebkitLineClamp: 3,
                                                        WebkitBoxOrient: 'vertical',
                                                        overflow: 'hidden',
                                                        margin: '0 0 15px',
                                                        fontSize: '15px',
                                                        lineHeight: 1.6
                                                    }}>{item?.description}</p>
                                                    <div className="mt-auto">
                                                        <NavigationLink href={"/" + item?.slug} className="btn btn-outline-primary btn-sm radius-sm">
                                                            Đọc Thêm <i className="feather icon-arrow-right" />
                                                        </NavigationLink>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                
                                {pagination && pagination.last_page > 1 && (
                                    <div className="row mt-4">
                                        <div className="col-12 text-center">
                                            <style>{`
                                                .content-inner ul.pagination-no-bullets,
                                                .content-inner ul.pagination-no-bullets > li {
                                                    list-style: none !important;
                                                    list-style-type: none !important;
                                                }
                                                .content-inner ul.pagination-no-bullets > li::before,
                                                .content-inner ul.pagination-no-bullets > li::after,
                                                ul.pagination-no-bullets > li::before,
                                                ul.pagination-no-bullets > li::after {
                                                    display: none !important;
                                                    content: none !important;
                                                    background: transparent !important;
                                                }
                                            `}</style>
                                            <ul className="pagination text-center pagination-rounded justify-content-center list-unstyled pagination-no-bullets" style={{ margin: 0, padding: 0 }}>
                                                {pagination.current_page > 1 && (
                                                    <li className="page-item">
                                                        <Link className="page-link prev" href={`/dich-vu/${slug}?page=${pagination.current_page - 1}`} scroll={false}>
                                                            <i className="fas fa-chevron-left"></i>
                                                        </Link>
                                                    </li>
                                                )}
                                                {Array.from({ length: pagination.last_page }, (_, i) => i + 1).map((p) => (
                                                    <li key={p} className="page-item">
                                                        <Link className={`page-link ${p === pagination.current_page ? 'active' : ''}`} href={`/dich-vu/${slug}?page=${p}`} scroll={false}>
                                                            {p}
                                                        </Link>
                                                    </li>
                                                ))}
                                                {pagination.current_page < pagination.last_page && (
                                                    <li className="page-item">
                                                        <Link className="page-link next" href={`/dich-vu/${slug}?page=${pagination.current_page + 1}`} scroll={false}>
                                                            <i className="fas fa-chevron-right"></i>
                                                        </Link>
                                                    </li>
                                                )}
                                            </ul>
                                        </div>
                                    </div>
                                )}
    
                            </div>
                        </div>
                    </section>
                )}
            </main>
        </>
    );
}
export default ServiceDetail;