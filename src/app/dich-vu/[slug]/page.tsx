import Link from "next/link";
import { IMAGES, SVGICONS } from "@/constant/theme";
import Footer from "@/layout/Footer";
import { servicedetails } from "@/constant/alldata";
import Image from "next/image";
import { getCategoryBySlug } from "@/services/categoryService";
import { normalizeImageUrl } from "@/lib/normalizeImageUrl";

async function ServiceDetail({ params }: { params: Promise<{ slug: string }>; }) {
    const { slug } = await params;

    const [category] = await Promise.all([
        getCategoryBySlug(slug + '?limit=6'),
    ]);

    const name = category?.name;
    const content = category?.content;
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
                            <nav aria-label="breadcrumb" className="breadcrumb-row wow fadeInUp" data-wow-delay="0.4s" data-wow-duration="0.8s">
                                <ul className="breadcrumb">
                                    {(breadcrumbs || []).map((item, index) => (
                                        <li key={index} className={`breadcrumb-item ${item.active ? 'active' : ''}`} style={item.active ? { color: '#fff' } : {}}>
                                            {item.active ? (
                                                item.name
                                            ) : (
                                                <Link href={item.slug.startsWith('/') ? item.slug : `/${item.slug}`}>
                                                    {item.name}
                                                </Link>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                            <div className="dz-btn">
                                <Link href="tel:+11234567890" className="btn btn-lg btn-icon btn-primary radius-xl btn-shadow mb-3 mb-sm-0">
                                    <span className="left-icon"> <i className="feather icon-phone-call" /> </span> +1 123 456 7890
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <section className="content-inner service-single">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 single-inner order-lg-1">
                                <div className="single-media dz-media single-media height-sm radius-lg wow fadeInUp" data-wow-delay="0.1s" data-wow-duration="0.7s">
                                    <Image src={image || ''} alt={name || ''} width={800} height={800} className="object-fit-cover" />
                                </div>
                                <div
                                    className="content-item wow fadeInUp"
                                    data-wow-delay="0.2s"
                                    data-wow-duration="0.7s"
                                    dangerouslySetInnerHTML={{
                                        __html: content || '',
                                    }}
                                ></div>
                                <div className="content-item wow fadeInUp" data-wow-delay="0.5s" data-wow-duration="0.7s">
                                    <h3>Bài liên quan</h3>
                                    <div className="row loadmore-content">
                                        {posts && posts.map((item, i) => (
                                            <div className="col-lg-6 col-md-6 m-b25 wow fadeInUp" data-wow-delay="0.1s" data-wow-duration="0.5s" key={i}>
                                                <div className="dz-card style-2 dz-card-overlay" style={{ backgroundImage: `url(${normalizeImageUrl(item?.image)})` }}>
                                                    <div className="dz-info">
                                                        <div className="post-date">
                                                            {new Date(item.created_at).toLocaleDateString("en-GB", {
                                                                day: "2-digit",
                                                                month: "short",
                                                                year: "numeric",
                                                            })}
                                                        </div>
                                                        <div className="bottom-info">
                                                            <h3 className="dz-title"> <Link href="/blog-details">{item?.name}</Link> </h3>
                                                            <Link href={"/" + item?.slug} className="btn btn-square btn-white rounded-circle"
                                                                dangerouslySetInnerHTML={{ __html: SVGICONS.uparrow2 }}>
                                                            </Link>
                                                        </div>
                                                    </div>
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
                            <div className="col-lg-4 m-b30">
                                <aside className="side-bar sticky-top left">
                                    <div className="widget service_menu_nav bg-secondary wow fadeInUp" data-wow-delay="0.2s" data-wow-duration="0.7s">
                                        <div className="widget-title">
                                            <h4 className="title">Tất cả Dịch vụ</h4>
                                        </div>
                                        <ul>
                                            {servicedetails.map((item, i) => (
                                                <li key={i} className={item.columnstand}><Link href="#" scroll={false}>{item.title}</Link></li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="widget_contact wow fadeInUp"
                                        style={{ backgroundImage: `url(${IMAGES.bg3png.src})` }} data-wow-delay="0.4s" data-wow-duration="0.7s"
                                    >
                                        <div className="widget-content">
                                            <Image src={IMAGES.question} width="80" alt="" />
                                            <h4 className="title">Do you need any help?</h4>
                                            <div className="phone-number">
                                                <Link href="tel:+11234567890">+1 123 456 7890</Link>
                                            </div>
                                            <div className="email">
                                                <Link href="mailto:info@support.com">info@support.com</Link>
                                            </div>
                                            <div className="link-btn">
                                                <Link href="#" scroll={false} className="btn btn-lg btn-icon btn-white hover-secondary btn-shadow">
                                                    Contact Us <span className="right-icon"><i className="feather icon-arrow-right" /></span>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </aside>
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