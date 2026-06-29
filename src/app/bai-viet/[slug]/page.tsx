import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageBanner from "@/component/PageBanner";
import { IMAGES } from "@/constant/theme";
import { getCategoryBySlug, getCategories } from "@/services/categoryService";
import { normalizeImageUrl } from "@/lib/normalizeImageUrl";
import { getLatestPosts } from "@/services/postService";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  const title = `${category?.title_seo || category?.name || "Danh mục bài viết"} - DrDuongOrtho`;
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

export default async function BaiVietCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [category, categories, latestPosts] = await Promise.all([
    getCategoryBySlug(slug),
    getCategories("post"),
    getLatestPosts(),
  ]);

  if (!category) {
    notFound();
  }

  const posts = category?.posts?.data || [];

  return (
    <>
      <main className="page-content">
        <PageBanner
          title={category?.name || "Danh mục bài viết"}
          bnrimage={IMAGES.bnr2.src}
        />
        <section className="content-inner">
          <div className="container">
            <div className="row">
              <div className="col-xl-8 col-lg-12 m-b30 pe-xl-5">
                <div className="row loadmore-content">
                  {posts.map((item, i) => (
                    <div
                      className="col-12 m-b25 wow fadeInUp"
                      data-wow-delay="0.1s"
                      data-wow-duration="0.5s"
                      key={i}
                    >
                      <div className="dz-card style-2 blog-half m-b35">
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
                                  new Date(item.created_at).toLocaleDateString(
                                    "en-GB",
                                    {
                                      day: "2-digit",
                                      month: "short",
                                      year: "numeric",
                                    },
                                  )}
                              </li>

                            </ul>
                          </div>

                          <h3>
                            <Link
                              href={`/bai-viet/${item?.slug}`}
                            >
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
                            href={`/bai-viet/${item?.slug}`}
                            className="btn icon-link-hover-end btn-primary radius-sm"
                          >
                            Đọc Thêm <i className="feather icon-arrow-right" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                  {posts.length === 0 && (
                    <div className="col-12 text-center">
                      <p>Chưa có bài viết nào trong danh mục này.</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="col-xl-4 col-lg-12">
                <aside className="side-bar @@dir m-b30 p-0">
                  <div
                    className="widget wow fadeInUp"
                    data-wow-delay="0.1s"
                    data-wow-duration="0.5s"
                  >
                    <div className="widget-title">
                      <h4 className="title">Tìm kiếm</h4>
                    </div>
                    <div className="search-bx">
                      <form role="search">
                        <div className="input-group">
                          <input
                            name="text"
                            className="form-control"
                            placeholder="Tìm kiếm..."
                            type="text"
                          />
                          <div className="input-group-btn">
                            <button type="submit">
                              <i className="feather icon-search" />
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div
                    className="widget widget_categories style-1 wow fadeInUp"
                    data-wow-delay="0.2s"
                    data-wow-duration="0.5s"
                  >
                    <div className="widget-title">
                      <h4 className="title">Danh mục</h4>
                    </div>
                    <ul>
                      {(categories as any[]).map((parent, i) => {
                        const isParentActive = parent.slug === slug;
                        const hasActiveChild = parent.children?.some(
                          (c: { slug: string }) => c.slug === slug,
                        );
                        return (
                          <li
                            key={i}
                            className={
                              isParentActive || hasActiveChild ? "active" : ""
                            }
                          >
                            <Link
                              href={`/bai-viet/${parent.slug}`}
                              className={isParentActive ? "active" : ""}
                              style={
                                isParentActive
                                  ? {
                                      color: "var(--bs-primary)",
                                      fontWeight: 700,
                                    }
                                  : {}
                              }
                            >
                              {parent.name}
                            </Link>
                            {parent.children && parent.children.length > 0 && (
                              <ul
                                className="sub-menu ps-3 mt-2"
                                style={{ borderLeft: "1px solid #eee" }}
                              >
                                {parent.children.map(
                                  (
                                    child: { name: string; slug: string },
                                    j: number,
                                  ) => {
                                    const isChildActive = child.slug === slug;
                                    return (
                                      <li
                                        key={j}
                                        className={`cat-item ${isChildActive ? "active" : ""}`}
                                      >
                                        <Link
                                          href={`/bai-viet/${child.slug}`}
                                          style={
                                            isChildActive
                                              ? {
                                                  color: "var(--bs-primary)",
                                                  fontWeight: 700,
                                                }
                                              : {}
                                          }
                                        >
                                          {child.name}
                                        </Link>
                                      </li>
                                    );
                                  },
                                )}
                              </ul>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <div
                    className="widget recent-posts-entry wow fadeInUp"
                    data-wow-delay="0.3s"
                    data-wow-duration="0.5s"
                  >
                    <div className="widget-title">
                      <h4 className="title">Bài viết mới</h4>
                    </div>
                    <div className="widget-post-bx">
                      {latestPosts.map((item, i) => (
                        <div
                          className="widget-post clearfix"
                          key={item.id ?? i}
                        >
                          <div className="dz-media">
                            <Image
                              src={
                                normalizeImageUrl(item.image) ||
                                IMAGES.bloggrid1
                              }
                              alt={item.name || "Bài viết mới"}
                              width={90}
                              height={90}
                              style={{
                                width: "90px",
                                height: "90px",
                                objectFit: "cover",
                                borderRadius: "12px",
                              }}
                            />
                          </div>

                          <div className="dz-info">
                            <div className="dz-meta">
                              <ul>
                                <li className="post-date">
                                  <Link
                                    href={`/bai-viet/${item.slug}`}
                                  >
                                    {item.created_at
                                      ? new Date(
                                          item.created_at,
                                        ).toLocaleDateString("vi-VN", {
                                          day: "2-digit",
                                          month: "short",
                                          year: "numeric",
                                        })
                                      : "Chưa cập nhật"}
                                  </Link>
                                </li>
                              </ul>
                            </div>

                            <h6 className="title">
                              <Link
                                href={`/bai-viet/${item.slug}`}
                              >
                                {item.name}
                              </Link>
                            </h6>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
