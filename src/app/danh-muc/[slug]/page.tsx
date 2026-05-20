import Link from "next/link";
import PageBanner from "@/component/PageBanner";
import { IMAGES, SVGICONS } from "@/constant/theme";
import BlogSidebar from "@/component/BlogSidebar";
import {
  getCategoryBySlug,
  getCategories as getCategoryList,
} from "@/services/categoryService";

// Types are now imported or handled by categoryService

type PostListItem = {
  id?: number;
  name?: string;
  slug?: string;
  image?: string | null;
  created_at?: string;
};

type PostListResponse = {
  success: boolean;
  message: string;
  data?: {
    data?: PostListItem[];
  };
};

function normalizeImageUrl(url?: string | null) {
  if (!url || !url.trim()) return IMAGES.blogoverlaylarge1.src;

  if (url.startsWith("http")) return url;

  return `${(process.env.NEXT_PUBLIC_BASE_URL || "").replace(/^https?:\/\//, (match) => match + "admin.")}/${url.replace(/^\/+/, "")}`;
}

// Replaced by categoryService
async function getCategories() {
  const categories = await getCategoryList();

  const postCategorySlugs = [
    "kien-thuc",
    "kien-thuc-xuong-khop",
    "tin-tuc-y-khoa",
  ];

  return categories
    .filter((item: any) => postCategorySlugs.includes(item.slug))
    .map((item: any) => ({
      name: item.name,
      slug: item.slug,
      count: 0,
    }));
}

async function getLatestPosts() {
  try {
    const res = await fetch(
      `${(process.env.NEXT_PUBLIC_BASE_URL || "").replace(/^https?:\/\//, (match) => match + "api.")}/post?limit=3&sort_name=id&sort_by=desc&name=`,
      { cache: "no-store" },
    );

    if (!res.ok) return [];

    const result: PostListResponse = await res.json();
    return result.data?.data || [];
  } catch (error) {
    console.error("Lỗi lấy latest posts:", error);
    return [];
  }
}

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function DanhMucSlugPage({ params }: Props) {
  const { slug } = await params;

  const [category, categories, latestPosts] = await Promise.all([
    getCategoryBySlug(slug, {
      limit: 12,
      page: 1,
      sortName: "created_at",
      sortBy: "desc",
    }),
    getCategories(),
    getLatestPosts(),
  ]);

  if (!category) {
    return (
      <main className="page-content">
        <PageBanner title="Danh mục" bnrimage={IMAGES.bnr2.src} />
        <div className="container py-5">Không tìm thấy danh mục</div>
      </main>
    );
  }

  const posts = category.posts?.data || [];

  const categoriesWithCount = categories.map((cat) => ({
    ...cat,
    count: cat.slug === slug ? posts.length : 0,
  }));

  return (
    <main className="page-content">
      <PageBanner
        title={category.name || "Danh mục"}
        bnrimage={IMAGES.bnr2.src}
      />

      <section className="content-inner">
        <div className="container">
          <div className="row">
            <div className="col-xl-9 col-lg-12 m-b30 pe-xl-5">
              <div className="row">
                {posts.map((item, i) => (
                  <div
                    className="col-lg-6 col-md-6 m-b25 wow fadeInUp"
                    data-wow-delay="0.2s"
                    key={i}
                  >
                    <div
                      className="dz-card style-2 dz-card-overlay"
                      style={{
                        backgroundImage: `url("${normalizeImageUrl(item.image)}")`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                      }}
                    >
                      <div className="dz-info">
                        <div className="post-date">
                          {item.created_at
                            ? new Date(item.created_at).toLocaleDateString(
                                "vi-VN",
                              )
                            : "N/A"}
                        </div>

                        <div className="bottom-info">
                          <h3 className="dz-title">
                            <Link href={`/bai-viet/${item.slug}`}>
                              {item.name}
                            </Link>
                          </h3>

                          <Link
                            href={`/bai-viet/${item.slug}`}
                            className="btn btn-square btn-white rounded-circle"
                            dangerouslySetInnerHTML={{
                              __html: SVGICONS.uparrow2,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {posts.length === 0 && (
                  <p>Chưa có bài viết trong danh mục này.</p>
                )}
              </div>
            </div>

            <div className="col-xl-3 col-lg-12">
              <BlogSidebar
                categories={categoriesWithCount}
                latestPosts={latestPosts}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
