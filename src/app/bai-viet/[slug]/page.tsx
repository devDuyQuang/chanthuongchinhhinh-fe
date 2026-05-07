import PageBanner from "@/component/PageBanner";
import { IMAGES } from "@/constant/theme";
import ServiceBox from "@/component/ServiceBox";
import { notFound } from "next/navigation";

type CategoryPostItem = {
  id?: number;
  name?: string;
  slug?: string;
  image?: string | null;
  description?: string | null;
};

type CategoryDetail = {
  id?: number;
  name?: string;
  slug?: string;
  description?: string | null;
  content?: string | null;
  posts?: {
    current_page?: number;
    data?: CategoryPostItem[];
  };
};

type CategoryApiResponse = {
  success: boolean;
  message: string;
  data?: CategoryDetail;
};

async function getCategory(slug: string): Promise<CategoryDetail | null> {
  try {
    const res = await fetch(
      `${(process.env.NEXT_PUBLIC_BASE_URL || "").replace(/^https?:\/\//, (match) => match + "api.")}/category/${slug}`,
      { cache: "no-store" },
    );

    if (!res.ok) return null;

    const result: CategoryApiResponse = await res.json();
    return result.data || null;
  } catch (error) {
    console.error("Lỗi lấy category bài viết:", error);
    return null;
  }
}

export default async function BaiVietCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const category = await getCategory(slug);

  if (!category) {
    notFound();
  }

  const categoryItems =
    category.posts?.data?.map((item) => ({
      title: item.name || "Bài viết",
      description: item.description || "Nội dung đang được cập nhật.",
      doctor_text: "Xem chi tiết",

      // Bài viết thật mở thẳng /{post.slug}
      link: item.slug ? `/${item.slug}` : "#",

      image: item.image || null,
    })) || [];

  return (
    <main className="page-content">
      <PageBanner
        title={category.name || "Bài viết"}
        bnrimage={IMAGES.bnr2.src}
      />

      <section
        className="content-inner bg-light"
        style={{ backgroundImage: `url(${IMAGES.bg5png.src})` }}
      >
        <div className="container">
          {category.description && (
            <div className="m-b30">
              <p>{category.description}</p>
            </div>
          )}

          {category.content && (
            <div
              className="m-b30"
              dangerouslySetInnerHTML={{
                __html: category.content,
              }}
            />
          )}

          <ServiceBox data={{ items: categoryItems }} useFallback={false} />
        </div>
      </section>
    </main>
  );
}
