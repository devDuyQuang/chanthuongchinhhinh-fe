import type { Metadata } from "next";
import Link from "next/link";
import { IMAGES } from "@/constant/theme";
import Image from "next/image";
import { normalizeImageUrl } from "@/lib/normalizeImageUrl";
import { notFound } from "next/navigation";
import CommentSection from "@/component/CommentSection";
import { getPost, getRelatedPosts } from "@/services/postService";
import { getSetting } from "@/services/settingService";
import ImageLightboxActivator from "@/component/ImageLightboxContent";
import FloatingTOC from "@/component/FloatingTOC";
import NavigationLink from "@/component/NavigationLink";

type Props = {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;
  const post = await getPost(slug);

  const title = `${post?.title_seo || post?.name || "Bài viết"} - DrDuongOrtho`;
  const description = post?.description_seo || post?.description || "";
  let canonical = post?.canonical_seo || `/${slug}`;

  if (resolvedSearchParams?.page && resolvedSearchParams.page !== '1') {
    canonical = `${canonical}?page=${resolvedSearchParams.page}`;
  }

  const image = normalizeImageUrl(post?.image);

  return {
    title,
    description,
    alternates: {
      canonical: canonical,
    },
    openGraph: {
      title,
      description: description ?? undefined,
      type: "article",
      ...(image && {
        images: [{ url: image }],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: description ?? undefined,
      ...(image && {
        images: [image],
      }),
    },
  };
}

export default async function DirectPostDetailPage({ params }: Props) {
  const { slug } = await params;

  const [post, relatedPosts, settings] = await Promise.all([
    getPost(slug),
    getRelatedPosts(slug),
    getSetting(),
  ]);

  if (!post) {
    notFound();
  }

  const imageUrl = normalizeImageUrl(post.image) || IMAGES.bnr2.src;

  const createdDate = post.created_at
    ? new Date(post.created_at).toLocaleDateString("vi-VN")
    : "N/A";

  const adminUrl = (process.env.NEXT_PUBLIC_BASE_URL || "").replace(/^https?:\/\//, (match) => match + "admin.");
  const site_assets_clinic = settings?.data?.site_assets_clinic;
  const logoWhite = site_assets_clinic?.logo ? adminUrl.replace(/\/$/, "") + '/storage/' + site_assets_clinic?.logo : "/assets/images/logo-white.svg";

  const toc = post?.toc;
  const breadcrumbs = post?.breadcrumbs;

  return (
    <main className="page-content h-entry hentry">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.name || "Chi tiết bài viết",
            image: imageUrl ? [imageUrl] : undefined,
            datePublished: post.created_at ? new Date(post.created_at).toISOString() : undefined,
            dateModified: (post as any).updated_at ? new Date((post as any).updated_at).toISOString() : (post.created_at ? new Date(post.created_at).toISOString() : undefined),
            description: post.description || "",
            author: {
              "@type": "Person",
              name: "DrDuongOrtho",
            }
          })
        }}
      />
      <span className="vcard author p-author h-card" style={{ display: 'none' }}><span className="fn">DrDuongOrtho</span></span>
      <div
        className="dz-bnr-inr dz-banner-dark overlay-secondary-middle dz-bnr-inr-md"
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        <div className="container">
          <div className="dz-bnr-inr-entry d-table-cell">
            <nav
              aria-label="breadcrumb"
              className="breadcrumb-row wow fadeInUp"
              data-wow-delay="0.2s"
              data-wow-duration="0.8s"
              style={{ marginBottom: "16px" }}
            >
              <ul className="breadcrumb">
                {(breadcrumbs || []).filter((item) => !item.active).map((item, index) => (
                  <li
                    key={index}
                    className={`breadcrumb-item ${item.active ? "active" : ""}`}
                  >
                    {item.active ? (
                      <>
                        {index === 0 && (
                          <i className="fa-solid fa-house me-1" />
                        )}
                        {item.name}
                      </>
                    ) : (
                      <Link
                        href={
                          item.slug.startsWith("/")
                            ? item.slug
                            : `/${item.slug}`
                        }
                      >
                        {index === 0 && (
                          <i className="fa-solid fa-house me-1" />
                        )}
                        {item.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
            <h1
              className="wow fadeInUp entry-title p-name"
              data-wow-delay="0.3s"
              data-wow-duration="0.8s"
            >
              {post.name || "Chi tiết bài viết"}
            </h1>
            {post.created_at && (
              <div
                className="wow fadeInUp"
                data-wow-delay="0.4s"
                data-wow-duration="0.8s"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  color: "rgba(255,255,255,0.85)",
                  fontSize: "14px",
                  marginTop: "16px",
                  marginBottom: "4px",
                }}
              >
                <i className="fa-regular fa-calendar" style={{ color: "rgba(255,255,255,0.7)" }} />
                <time
                  className="updated published dt-published"
                  dateTime={new Date(post.created_at).toISOString()}
                >
                  {new Date(post.created_at).toLocaleDateString("vi-VN", {
                    weekday: "long",
                    day: "numeric",
                    month: "numeric",
                    year: "numeric",
                  })}
                </time>
              </div>
            )}
            {/* <div className="dz-meta">
              <ul className="justify-content-center" style={{ gap: "15px" }}>
                <li
                  className="updated published dt-published"
                  style={{
                    background: "#031b4e",
                    borderRadius: "30px",
                    padding: "5px 20px",
                    color: "#03bde0",
                    fontWeight: 600,
                    fontSize: "14px",
                    display: "flex",
                    alignItems: "center",
                    margin: 0,
                  }}
                >
                  <i
                    className="fa-solid fa-circle"
                    style={{
                      fontSize: "8px",
                      color: "var(--bs-primary)",
                      marginRight: "8px",
                    }}
                  ></i>{" "}
                  {post.created_at && (
                    <time className="value" dateTime={new Date(post.created_at).toISOString()} style={{ display: 'none' }}>
                      {new Date(post.created_at).toISOString()}
                    </time>
                  )}
                  {createdDate}
                </li>

              </ul>
            </div> */}
            <div className="dz-btn">
              <Link
                href="tel:0846555367"
                className="btn btn-lg btn-icon btn-primary radius-xl btn-shadow mb-3 mb-sm-0"
              >
                <span className="left-icon">
                  {" "}
                  <i className="feather icon-phone-call" />{" "}
                </span>{" "}
                038 995 1795
              </Link>
            </div>
          </div>
        </div>
      </div>

      <section className="content-inner-3" style={{ background: "#f0f4f8" }}>
        <div className="container">
          <div className="row">
            <div className="col-xl-9 mx-auto">

              <div
                className="dz-blog blog-single sidebar style-1"
              >
                <div className="dz-info">
                  <div className="dz-post-text">
                    {post.description ? (
                      <blockquote
                        className="entry-summary p-summary"
                        style={{
                          background: "rgba(26, 111, 196, 0.07)",
                          borderLeft: "4px solid var(--bs-primary, #1a6fc4)",
                          borderRadius: "10px",
                          padding: "18px 20px",
                          marginBottom: "16px",
                          marginTop: "0",
                        }}
                      >
                        <p
                          style={{
                            fontSize: "1.05rem",
                            lineHeight: "1.8",
                            color: "#1e3a5f",
                            margin: 0,
                            fontWeight: 600,
                          }}
                        >
                          {post.description}
                        </p>
                      </blockquote>
                    ) : null}

                    {post.content ? (
                      <>
                        {toc && toc.length > 0 && (
                          <>
                            <style>{`
                              .toc-link {
                                text-decoration: none;
                                transition: all 0.3s ease;
                                display: block;
                                font-size: 14px;
                              }
                              .toc-link:hover {
                                color: var(--bs-primary) !important;
                              }
                              .custom-scrollbar::-webkit-scrollbar {
                                width: 6px;
                              }
                              .custom-scrollbar::-webkit-scrollbar-track {
                                background: #f1f1f1;
                                border-radius: 4px;
                              }
                              .custom-scrollbar::-webkit-scrollbar-thumb {
                                background: #c1c1c1;
                                border-radius: 4px;
                              }
                              .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                                background: #a8a8a8;
                              }
                            `}</style>
                            <style>{`
                              .dz-post-content .sec {
                                background: #fff;
                                border-radius: 10px;
                                box-shadow: 0 2px 12px rgba(0,0,0,0.05);
                                padding: 28px 32px;
                                margin-bottom: 16px;
                              }
                              .dz-post-content .sec:last-child {
                                margin-bottom: 0;
                              }
                              .dz-post-content .sec h2 {
                                margin-top: 2rem;
                              }
                              .dz-bnr-inr .dz-btn {
                                background-color: #f0f4f8 !important;
                              }
                              .dz-bnr-inr .dz-btn::before,
                              .dz-bnr-inr .dz-btn::after {
                                background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 50 50' fill='none'><path fill-rule='evenodd' clip-rule='evenodd' d='M0 0V50H50C22.3858 50 0 27.6142 0 0Z' fill='%23f0f4f8'/></svg>") !important;
                              }
                            `}</style>
                            <div
                              className="table-of-contents"
                              style={{
                                background: "#fff",
                                border: "1px solid #e2e8f0",
                                borderRadius: "10px",
                                boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                                width: "100%",
                                marginBottom: "16px",
                                overflow: "hidden",
                              }}
                            >
                              <div style={{
                                background: "var(--bs-primary, #1a6fc4)",
                                padding: "12px 20px",
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                              }}>
                                <i className="feather icon-list" style={{ color: "#fff", fontSize: "16px" }} />
                                <h4
                                  style={{ fontSize: "1rem", fontWeight: 600, color: "#fff", margin: 0 }}
                                >
                                  Nội dung chính
                                </h4>
                              </div>
                              <div style={{ padding: "16px 20px", background: "rgba(26, 111, 196, 0.04)" }}>
                                <ul className="list-unstyled mb-0 custom-scrollbar" style={{ maxHeight: '300px', overflowY: 'auto', paddingRight: '10px' }}>
                                  {toc.map((item, index) => (
                                    <li
                                      key={index}
                                      className="mb-2"
                                      style={{
                                        paddingLeft: `${(item.level - 2) * 20}px`,
                                      }}
                                    >
                                      <Link
                                        href={`#${item.id}`}
                                        className="toc-link text-body"
                                      >
                                        <i
                                          className="feather icon-chevron-right me-2"
                                          style={{
                                            fontSize: "12px",
                                            color: "var(--bs-primary)",
                                          }}
                                        ></i>
                                        {item.text}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </>
                        )}
                        <div
                          className="dz-post-content entry-content e-content"
                          dangerouslySetInnerHTML={{
                            __html: post.content,
                          }}
                        />
                        <ImageLightboxActivator containerSelector=".dz-post-content" />
                      </>
                    ) : null}

                  </div>
                </div>
              </div>
              {/* Comment */}
              {/* <CommentSection postId={post.id} /> */}

              {/* CTA Liên hệ */}
              <div
                style={{
                  background: "linear-gradient(135deg, #0d2d6b 0%, #1a4fa0 60%, #0d2d6b 100%)",
                  borderRadius: "16px",
                  padding: "32px 36px",
                  marginTop: "16px",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "32px",
                  alignItems: "center",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Decorative circles */}
                <div style={{ position: "absolute", right: "-40px", top: "-40px", width: "200px", height: "200px", borderRadius: "50%", background: "rgba(255,255,255,0.04)", pointerEvents: "none" }} />
                <div style={{ position: "absolute", right: "60px", bottom: "-60px", width: "160px", height: "160px", borderRadius: "50%", background: "rgba(255,255,255,0.04)", pointerEvents: "none" }} />

                {/* Cột trái: Logo + Tiêu đề + Mô tả */}
                <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                  <Image
                    src={logoWhite}
                    alt="Dr.DUONG Ortho Logo"
                    width={90}
                    height={90}
                    style={{ flexShrink: 0, objectFit: "contain" }}
                  />
                  <div>
                    <h3 style={{ color: "#fff", fontSize: "1.3rem", fontWeight: 700, margin: "0 0 8px" }}>
                      Liên hệ với <span style={{ color: "#4dd0e1" }}>chúng tôi</span>
                    </h3>
                    <p style={{ color: "rgba(255,255,255,0.75)", margin: 0, fontSize: "14px", lineHeight: 1.6 }}>
                      Đội ngũ Dr.DUONG Ortho luôn sẵn sàng tư vấn và hỗ trợ bạn!
                    </p>
                  </div>
                </div>

                {/* Cột phải: Địa chỉ + Hotline + Email */}
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {/* Địa chỉ */}
                  <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                    <div style={{ width: "40px", height: "40px", borderRadius: "50%", border: "1.5px solid rgba(255,255,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <i className="fa-solid fa-location-dot" style={{ color: "#4dd0e1", fontSize: "16px" }} />
                    </div>
                    <div>
                      <div style={{ color: "#4dd0e1", fontSize: "12px", fontWeight: 600, marginBottom: "2px" }}>Địa chỉ</div>
                      <div style={{ color: "#fff", fontSize: "13px", lineHeight: 1.5 }}>Bệnh Viện Đa Khoa Quốc Tế Nam Sài Gòn</div>
                    </div>
                  </div>

                  {/* Hotline + Email trên 1 hàng */}
                  <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
                    {/* Hotline */}
                    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                      <div style={{ width: "40px", height: "40px", borderRadius: "50%", border: "1.5px solid rgba(255,255,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <i className="fa-solid fa-phone" style={{ color: "#4dd0e1", fontSize: "16px" }} />
                      </div>
                      <div>
                        <div style={{ color: "#4dd0e1", fontSize: "12px", fontWeight: 600, marginBottom: "2px" }}>Hotline</div>
                        <Link href="tel:0846555367" style={{ color: "#fff", fontSize: "14px", fontWeight: 600, textDecoration: "none", whiteSpace: "nowrap" }}>
                          0846 555 367
                        </Link>
                      </div>
                    </div>

                    {/* Email */}
                    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                      <div style={{ width: "40px", height: "40px", borderRadius: "50%", border: "1.5px solid rgba(255,255,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <i className="fa-solid fa-envelope" style={{ color: "#4dd0e1", fontSize: "16px" }} />
                      </div>
                      <div>
                        <div style={{ color: "#4dd0e1", fontSize: "12px", fontWeight: 600, marginBottom: "2px" }}>Email</div>
                        <Link href="mailto:odrduong@gmail.com" style={{ color: "#fff", fontSize: "13px", textDecoration: "none", whiteSpace: "nowrap" }}>
                          odrduong@gmail.com
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
      {relatedPosts && relatedPosts.length > 0 && (
        <section className="content-inner border-top">
          <div className="container">
            <div className="content-item wow fadeInUp" data-wow-delay="0.5s" data-wow-duration="0.7s">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="m-0">Bài viết liên quan</h3>
                {post?.categories && post.categories.length > 0 && (
                  <Link
                    href={`/dich-vu/${post.categories[0].slug}`}
                    className="text-primary"
                    style={{ fontWeight: 600, fontSize: "15px" }}
                  >
                    Xem thêm{" "}
                    <i className="feather icon-arrow-right ms-1" />
                  </Link>
                )}
              </div>
              <div className="row loadmore-content">
                {relatedPosts.slice(0, 6).map((item, i) => (
                  <div className="col-lg-4 col-md-6 mb-4" key={i}>
                    <div className="dz-card shadow-sm border rounded overflow-hidden bg-white h-100 d-flex flex-column wow fadeInUp" data-wow-delay="0.1s" data-wow-duration="0.5s">
                      <div className="dz-media" style={{ height: '220px', overflow: 'hidden' }}>
                        <NavigationLink href={"/" + item?.slug} style={{ display: 'block', width: '100%', height: '100%' }}>
                          <Image src={normalizeImageUrl(item?.image) ?? ''} alt={item?.name || ""} width={500} height={500} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </NavigationLink>
                      </div>
                      <div className="dz-info p-4 d-flex flex-column flex-grow-1">
                        <div className="dz-meta mb-2">
                          <ul className="p-0 d-flex align-items-center gap-3 list-unstyled">
                            <li className="post-date mb-0 text-muted" style={{ fontSize: '13px' }}>
                              <i className="fa-regular fa-calendar me-1"></i>
                              {item?.created_at &&
                                new Date(item.created_at).toLocaleDateString("en-GB", {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                })}
                            </li>

                          </ul>
                        </div>
                        <h3 style={{ fontSize: '18px', fontWeight: 600, lineHeight: 1.4, marginBottom: '10px' }}>
                          <NavigationLink href={"/" + item?.slug} className="text-dark text-decoration-none hover-primary">
                            {item?.name}
                          </NavigationLink>
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
            </div>
          </div>
        </section>
      )}
      <FloatingTOC toc={toc} />
    </main>
  );
}
