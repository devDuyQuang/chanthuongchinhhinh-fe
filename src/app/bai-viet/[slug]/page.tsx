import Link from "next/link";
import { IMAGES } from "@/constant/theme";
import Image from "next/image";
import { normalizeImageUrl } from "@/lib/normalizeImageUrl";
import BlogSidebar from "@/component/BlogSidebar";

type PostDetail = {
  id: number;
  name?: string;
  slug?: string;
  image?: string | null;
  description?: string | null;
  content?: string | null;
  created_at?: string;
};

type ApiResponse = {
  success: boolean;
  message: string;
  data?: PostDetail;
};

type CategoryListItem = {
  name: string;
  slug: string;
};

type CategoryListResponse = {
  success: boolean;
  message: string;
  data?: CategoryListItem[];
};

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

async function getPost(slug: string): Promise<PostDetail | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/post/${slug}`,
      { cache: "no-store" },
    );

    if (!res.ok) return null;

    const result: ApiResponse = await res.json();
    return result.data || null;
  } catch (error) {
    console.error("Lỗi lấy post detail:", error);
    return null;
  }
}

async function getCategories() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/category`,
      { cache: "no-store" },
    );

    if (!res.ok) return [];

    const result: CategoryListResponse = await res.json();
    const categories = result.data || [];

    const postCategorySlugs = [
      "kien-thuc",
      "kien-thuc-xuong-khop",
      "tin-tuc-y-khoa",
    ];

    return categories
      .filter((item) => postCategorySlugs.includes(item.slug))
      .map((item) => ({
        name: item.name,
        slug: item.slug,
        count: 0,
      }));
  } catch (error) {
    console.error("Lỗi lấy category list:", error);
    return [];
  }
}

async function getLatestPosts() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/post?limit=3&sort_name=id&sort_by=desc&name=`,
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

export default async function BaiVietDetailPage({ params }: Props) {
  const { slug } = await params;

  const [post, categories, latestPosts] = await Promise.all([
    getPost(slug),
    getCategories(),
    getLatestPosts(),
  ]);

  if (!post) {
    return (
      <main className="page-content">
        <div className="container py-5">
          <p>Không tìm thấy bài viết.</p>
        </div>
      </main>
    );
  }

  const imageUrl = normalizeImageUrl(post.image) || IMAGES.bnr2.src;

  return (
    <main className="page-content">
      <div className="section-full post-header blog-single style-1 mb-0">
        <div className="dz-card text-center">
          <div className="dz-media overlay-secondary-light">
            <Image
              src={imageUrl}
              alt={post.name || ""}
              width={1920}
              height={800}
              style={{ width: "100%", height: "auto" }}
              unoptimized
            />
          </div>

          <div className="dz-info">
            <h1 className="dz-title text-white mx-auto">
              {post.name || "Chi tiết bài viết"}
            </h1>

            <div className="dz-meta style-1">
              <ul className="justify-content-center">
                <li className="post-date">
                  {post.created_at
                    ? new Date(post.created_at).toLocaleDateString("vi-VN")
                    : "N/A"}
                </li>
                <li className="dz-user">
                  <i className="fa-solid fa-user" />
                  By{" "}
                  <Link href={"#"} scroll={false}>
                    Admin
                  </Link>
                </li>
                <li className="dz-comment">
                  <i className="fa-solid fa-message" />
                  <Link href={"#"} scroll={false}>
                    0 Comments
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <section className="content-inner-3">
        <div className="container">
          <div className="row">
            <div className="col-xl-9 pe-xl-5 m-b30">
              <div className="dz-blog blog-single sidebar style-1">
                <div className="dz-info">
                  <div className="dz-post-text">
                    {post.description ? <p>{post.description}</p> : null}

                    {post.content ? (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: post.content,
                        }}
                      />
                    ) : null}
                  </div>

                  <div className="dz-share-post meta-bottom">
                    <div className="post-tags">
                      <strong>Tags:</strong>
                      <Link href={"#"} scroll={false}>
                        Bài viết
                      </Link>
                      <Link href={"#"} scroll={false}>
                        Kiến thức
                      </Link>
                    </div>

                    <div className="dz-social-icon primary-light">
                      <ul>
                        <li>
                          <Link href="https://www.facebook.com" target="_blank">
                            <i className="fa-brands fa-facebook-f" />
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="https://www.instagram.com"
                            target="_blank"
                          >
                            <i className="fa-brands fa-instagram" />
                          </Link>
                        </li>
                        <li>
                          <Link href="https://x.com" target="_blank">
                            <i className="fa-brands fa-x-twitter" />
                          </Link>
                        </li>
                        <li>
                          <Link href="https://www.linkedin.com" target="_blank">
                            <i className="fa-brands fa-linkedin" />
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-3">
              <BlogSidebar categories={categories} latestPosts={latestPosts} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
