import Link from "next/link";
import { IMAGES } from "@/constant/theme";
import PageBanner from "@/component/PageBanner";
import Image from "next/image";
import { normalizeImageUrl } from "@/lib/normalizeImageUrl";
import SurgeryBlog from "../../service-detail/_components/SurgeryBlog";
import AccordionBlog from "../../service-detail/_components/AccordionBlog";
import { SiteCommonData } from "@/types/site";
import { notFound } from "next/navigation";

type RelatedPostItem = {
  id?: number;
  name?: string;
  slug?: string;
  image?: string | null;
  description?: string | null;
  created_at?: string;
  views?: number;
  favorites?: number;
};

type ServiceCategoryDetail = {
  id: number;
  name?: string;
  slug?: string;
  image?: string | null;
  description?: string | null;
  content?: string | null;
  posts?: {
    current_page?: number;
    data?: RelatedPostItem[];
    total?: number;
  };
};

type CategoryApiResponse = {
  success: boolean;
  message: string;
  data?: ServiceCategoryDetail;
};

type SpecialistItem = {
  name?: string;
  specialty?: string;
  button_text?: string;
  button_link?: string;
  image?: string;
  socials?: {
    linkedin?: string | null;
    facebook?: string | null;
    twitter?: string | null;
    youtube?: string | null;
  };
};

type FAQItem = {
  question?: string;
  answer?: string;
  title?: string;
  content?: string;
};

type SettingResponse = {
  success: boolean;
  message: string;
  data?: {
    specialists_home_clinic?: {
      items?: SpecialistItem[];
    };
    faq_home_clinic?: {
      items?: FAQItem[];
      questions?: FAQItem[];
    };
    site?: SiteCommonData;
  };
};

type RelatedPostResponse = {
  success: boolean;
  message: string;
  data?: {
    current_page?: number;
    data?: RelatedPostItem[];
    total?: number;
  };
};

async function getSetting(): Promise<SettingResponse | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/setting`, {
      cache: "no-store",
    });

    if (!res.ok) return null;

    return await res.json();
  } catch (error) {
    console.error("Lỗi lấy setting:", error);
    return null;
  }
}

async function getCategory(
  slug: string,
): Promise<ServiceCategoryDetail | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/category/${slug}`,
      { cache: "no-store" },
    );

    if (!res.ok) return null;

    const result: CategoryApiResponse = await res.json();
    return result.data || null;
  } catch (error) {
    console.error("Lỗi lấy category service detail:", error);
    return null;
  }
}

async function getRelatedPostsByCategory(
  slug: string,
): Promise<RelatedPostItem[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/post?category_slug=${encodeURIComponent(
        slug,
      )}&limit=6&sort_name=id&sort_by=desc`,
      { cache: "no-store" },
    );

    if (!res.ok) return [];

    const result: RelatedPostResponse = await res.json();
    return result.data?.data || [];
  } catch (error) {
    console.error("Lỗi lấy bài viết liên quan:", error);
    return [];
  }
}

function EmptyCategoryContent() {
  return (
    <div
      className="content-item text-center"
      style={{
        background: "#fff",
        borderRadius: "24px",
        padding: "60px 30px",
        boxShadow: "0 10px 40px rgba(0,0,0,0.04)",
      }}
    >
      <div
        style={{
          width: 72,
          height: 72,
          borderRadius: "50%",
          background: "#f0f7ff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 20px",
          color: "#05245c",
          fontSize: 28,
        }}
      >
        <i className="fa-regular fa-file-lines" />
      </div>

      <h3 className="m-b10">Chưa có bài viết</h3>

      <p className="m-b0">
        Danh mục này hiện chưa có nội dung. Vui lòng quay lại sau.
      </p>
    </div>
  );
}

export default async function ServiceDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [category, setting, relatedPosts] = await Promise.all([
    getCategory(slug),
    getSetting(),
    getRelatedPostsByCategory(slug),
  ]);

  if (!category) {
    notFound();
  }

  const specialists = setting?.data?.specialists_home_clinic;
  const faqHome = setting?.data?.faq_home_clinic;
  const faqItems = faqHome?.items || faqHome?.questions || [];

  const hasCategoryDescription = Boolean(category.description?.trim());
  const hasCategoryContent = Boolean(category.content?.trim());
  const hasRelatedPosts = relatedPosts.length > 0;

  // Chỉ xem là có nội dung khi category có mô tả/content hoặc có bài viết liên quan.
  // Nếu không có gì thì chỉ hiện empty state, không render steps/doctors/faq.
  const hasRealContent =
    hasCategoryDescription || hasCategoryContent || hasRelatedPosts;

  return (
    <main className="page-content">
      <PageBanner
        title={category.name || "Chi tiết dịch vụ"}
        bnrimage={IMAGES.bnr2.src}
      />

      <section className="content-inner service-single">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 single-inner order-lg-1">
              {category.image && (
                <div className="single-media dz-media height-sm radius-lg m-b30">
                  <Image
                    src={normalizeImageUrl(category.image)!}
                    alt={category.name || ""}
                    width={800}
                    height={500}
                    style={{ width: "100%", height: "auto" }}
                    unoptimized
                  />
                </div>
              )}

              <div className="content-item m-b30">
                <h2>{category.name}</h2>
                {hasCategoryDescription && <p>{category.description}</p>}
              </div>

              {!hasRealContent ? (
                <EmptyCategoryContent />
              ) : (
                <>
                  {hasCategoryContent && (
                    <div
                      className="content-item"
                      dangerouslySetInnerHTML={{
                        __html: category.content || "",
                      }}
                    />
                  )}

                  {hasRelatedPosts && (
                    <div className="content-item m-b30">
                      <h3>Bài viết liên quan</h3>

                      <div className="row">
                        {relatedPosts.map((post) => {
                          const postHref = post.slug ? `/${post.slug}` : "#";
                          const postImage =
                            normalizeImageUrl(post.image) || IMAGES.bnr2.src;

                          return (
                            <div
                              className="col-md-6 m-b30"
                              key={post.id || post.slug}
                            >
                              <div className="dz-card style-1">
                                <div className="dz-media">
                                  <Link href={postHref}>
                                    <Image
                                      src={postImage}
                                      alt={post.name || ""}
                                      width={600}
                                      height={400}
                                      style={{
                                        width: "100%",
                                        height: "auto",
                                      }}
                                      unoptimized
                                    />
                                  </Link>
                                </div>

                                <div className="dz-info">
                                  <h4 className="dz-title">
                                    <Link href={postHref}>
                                      {post.name || "Bài viết"}
                                    </Link>
                                  </h4>

                                  {post.description ? (
                                    <p>{post.description}</p>
                                  ) : null}

                                  <Link
                                    href={postHref}
                                    className="btn btn-primary"
                                  >
                                    Xem thêm
                                  </Link>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  <div className="content-item">
                    <h3>Các bước điều trị</h3>
                    <ul className="list-check text-secondary grid-2 m-b30">
                      <li>Thăm khám ban đầu</li>
                      <li>Đánh giá triệu chứng</li>
                      <li>Chẩn đoán hình ảnh</li>
                      <li>Tư vấn hướng điều trị</li>
                      <li>Theo dõi tiến triển</li>
                      <li>Hướng dẫn phục hồi</li>
                    </ul>
                  </div>

                  <div className="content-item">
                    <h3>Đội ngũ bác sĩ chuyên khoa</h3>
                    <SurgeryBlog doctors={specialists?.items} />
                  </div>

                  <div className="content-item">
                    <h3>Câu hỏi thường gặp</h3>
                    <AccordionBlog items={faqItems} />
                  </div>
                </>
              )}
            </div>

            <div className="col-lg-4 m-b30">
              <aside className="side-bar sticky-top left">
                <div className="widget service_menu_nav bg-secondary">
                  <div className="widget-title">
                    <h4 className="title">Dịch vụ</h4>
                  </div>

                  <ul>
                    <li>
                      <Link href="/dich-vu">Tất cả dịch vụ</Link>
                    </li>
                  </ul>
                </div>

                <div
                  className="widget_contact"
                  style={{
                    backgroundImage: `url(${IMAGES.bg3png.src})`,
                  }}
                >
                  <div className="widget-content">
                    <Image src={IMAGES.question} width={80} alt="" />
                    <h4 className="title">Bạn cần hỗ trợ?</h4>

                    <div className="phone-number">
                      <Link href="tel:+84901234567">+84 901 234 567</Link>
                    </div>

                    <div className="email">
                      <Link href="mailto:info@gmail.com">info@gmail.com</Link>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
