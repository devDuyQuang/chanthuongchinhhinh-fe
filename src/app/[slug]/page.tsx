import type { Metadata } from "next";
import Link from "next/link";
import { IMAGES } from "@/constant/theme";
import Image from "next/image";
import { normalizeImageUrl } from "@/lib/normalizeImageUrl";
import { notFound } from "next/navigation";
import CommentForm from "../(blogs)/blog-details/_components/CommentForm";
import { getPost, getRelatedPosts } from "@/services/postService";
import ImageLightboxActivator from "@/component/ImageLightboxContent";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  const title = `${post?.title_seo || post?.name || "Bài viết"} - DrDuongOrtho`;
  const description = post?.description_seo || post?.description || "";
  const canonical = post?.canonical_seo;
  const image = normalizeImageUrl(post?.image);

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

export default async function DirectPostDetailPage({ params }: Props) {
  const { slug } = await params;

  const [post, relatedPosts] = await Promise.all([
    getPost(slug),
    getRelatedPosts(slug),
  ]);

  if (!post) {
    notFound();
  }

  const imageUrl = normalizeImageUrl(post.image) || IMAGES.bnr2.src;

  const createdDate = post.created_at
    ? new Date(post.created_at).toLocaleDateString("vi-VN")
    : "N/A";

  const toc = post?.toc;
  const breadcrumbs = post?.breadcrumbs;

  return (
    <main className="page-content">
      <div className="dz-bnr-inr dz-banner-dark overlay-secondary-middle dz-bnr-inr-md" style={{ backgroundImage: `url(${imageUrl})` }}>
        <div className="container">
          <div className="dz-bnr-inr-entry d-table-cell">
            <h1 className="wow fadeInUp" data-wow-delay="0.2s" data-wow-duration="0.8s">{post.name || "Chi tiết bài viết"}</h1>
            <div className="dz-meta">
              <ul className="justify-content-center" style={{ gap: '15px' }}>
                <li style={{ background: '#031b4e', borderRadius: '30px', padding: '5px 20px', color: '#03bde0', fontWeight: 600, fontSize: '14px', display: 'flex', alignItems: 'center', margin: 0 }}>
                  <i className="fa-solid fa-circle" style={{ fontSize: '8px', color: 'var(--bs-primary)', marginRight: '8px' }}></i> {createdDate}
                </li>
                <li style={{ background: '#031b4e', borderRadius: '30px', padding: '5px 20px', color: '#03bde0', fontWeight: 600, fontSize: '14px', display: 'flex', alignItems: 'center', margin: 0 }}>
                  <i className="fa-solid fa-eye" style={{ color: 'var(--bs-primary)', marginRight: '8px' }} />
                  <span>100 Lượt xem</span>
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

      <section className="content-inner-3">
        <div className="container">
          <div className="row">
            <div className="col-xl-8 mx-auto m-b30">
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
              <div className="dz-blog blog-single sidebar style-1">
                <div className="dz-info">
                  <div className="dz-post-text">
                    {post.description ? (
                      <blockquote
                        style={{
                          position: "relative",
                          background: "transparent",
                          borderTop: "2px solid rgba(0,0,0,0.05)",
                          borderBottom: "2px solid rgba(0,0,0,0.05)",
                          padding: "30px 10px",
                          marginBottom: "40px",
                          marginTop: "0",
                          fontFamily: "inherit",
                          fontSize: "inherit",
                          fontWeight: "inherit",
                          color: "inherit",
                        }}
                      >
                        <span
                          aria-hidden="true"
                          style={{
                            position: "absolute",
                            top: "0",
                            left: "0",
                            fontSize: "60px",
                            lineHeight: 1,
                            color: "rgba(0,0,0,0.05)",
                            fontFamily: "Georgia, serif",
                            fontWeight: 700,
                            userSelect: "none",
                          }}
                        >
                          &ldquo;
                        </span>
                        <p
                          style={{
                            fontSize: "1.08rem",
                            lineHeight: "1.85",
                            fontStyle: "italic",
                            color: "#1e3a5f",
                            margin: 0,
                            fontWeight: 500,
                            letterSpacing: "0.01em",
                          }}
                        >
                          <span
                            style={{
                              float: "left",
                              fontSize: "3.6rem",
                              lineHeight: "0.8",
                              fontWeight: 700,
                              fontStyle: "normal",
                              color: "var(--bs-primary, #1a6fc4)",
                              marginRight: "6px",
                              marginTop: "6px",
                              fontFamily: "Georgia, serif",
                              letterSpacing: "-1px",
                            }}
                          >
                            {post.description.charAt(0)}
                          </span>
                          {post.description.slice(1)}
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
                              }
                              .toc-link:hover {
                                color: var(--bs-primary) !important;
                                transform: translateX(5px);
                              }
                            `}</style>
                            <div
                              className="table-of-contents mb-4 p-4 rounded mx-auto"
                              style={{
                                background: "#f8f9fa",
                                borderLeft: "4px solid var(--bs-primary)",
                                boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                                width: "80%",
                              }}
                            >
                              <h4
                                className="mb-3"
                                style={{ fontSize: "1.25rem", fontWeight: 600 }}
                              >
                                Nội dung chính
                              </h4>
                              <ul className="list-unstyled mb-0">
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
                          </>
                        )}
                        <div
                          className="dz-post-content"
                          dangerouslySetInnerHTML={{
                            __html: post.content,
                          }}
                        />
                        <ImageLightboxActivator containerSelector=".dz-post-content" />
                      </>
                    ) : null}

                    {relatedPosts && relatedPosts.length > 0 && (
                      <div
                        className="content-item wow fadeInUp mt-5"
                        data-wow-delay="0.5s"
                        data-wow-duration="0.7s"
                      >
                        <div className="d-flex justify-content-between align-items-center mb-4">
                          <h3 className="m-0">Bài viết liên quan</h3>
                          {post?.categories && post.categories.length > 0 && (
                            <Link
                              href={`/dich-vu/${post.categories[0].slug}`}
                              scroll={false}
                              className="text-primary"
                              style={{ fontWeight: 600, fontSize: "15px" }}
                            >
                              Xem thêm{" "}
                              <i className="feather icon-arrow-right ms-1" />
                            </Link>
                          )}
                        </div>
                        <div className="row loadmore-content">
                          {relatedPosts.map((item, i) => (
                            <div
                              className="dz-card style-2 blog-half m-b35 wow fadeInUp"
                              data-wow-delay="0.1s"
                              data-wow-duration="0.5s"
                              key={i}
                            >
                              <div className="dz-media">
                                <Image
                                  src={normalizeImageUrl(item?.image) ?? ""}
                                  alt={item?.name || ""}
                                  width={500}
                                  height={500}
                                />
                              </div>
                              <div className="dz-info">
                                <div className="dz-meta">
                                  <ul className="p-0">
                                    <li className="post-date mb-0">
                                      {item?.created_at &&
                                        new Date(
                                          item.created_at,
                                        ).toLocaleDateString("en-GB", {
                                          day: "2-digit",
                                          month: "short",
                                          year: "numeric",
                                        })}
                                    </li>
                                    <li className="post-comments">
                                      100 lượt xem
                                    </li>
                                  </ul>
                                </div>
                                <h3>
                                  <Link href={"/" + item?.slug} scroll={false}>
                                    {item?.name}
                                  </Link>
                                </h3>
                                {item?.description && (
                                  <p
                                    style={{
                                      display: "-webkit-box",
                                      WebkitLineClamp: 2,
                                      WebkitBoxOrient: "vertical",
                                      overflow: "hidden",
                                      margin: "8px 0 12px",
                                      fontSize: "16px",
                                    }}
                                  >
                                    {item?.description}
                                  </p>
                                )}
                                <Link
                                  href={"/" + item?.slug}
                                  scroll={false}
                                  className="btn icon-link-hover-end btn-primary radius-sm"
                                >
                                  Đọc Thêm{" "}
                                  <i className="feather icon-arrow-right" />
                                </Link>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="clear" id="comment-list">
                <div className="post-comments comments-area style-1 clearfix">
                  <div
                    className="default-form comment-respond style-1"
                    id="respond"
                  >
                    <h4 className="comment-reply-title mb-2" id="reply-title">
                      Để lại bình luận
                    </h4>
                    <p className="dz-title-text">
                      Chia sẻ ý kiến hoặc trải nghiệm của bạn để giúp mọi người
                      hiểu hơn về dịch vụ.
                    </p>
                    <div className="clearfix">
                      <CommentForm />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
