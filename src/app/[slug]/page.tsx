import PageBanner from "@/component/PageBanner";
import { IMAGES } from "@/constant/theme";
import Footer from "@/layout/Footer";
import Image from "next/image";
import { notFound } from "next/navigation";
import ServiceBox from "@/component/ServiceBox";

type PostDetail = {
    id: number;
    name?: string;
    slug?: string;
    image?: string | null;
    description?: string | null;
    content?: string | null;
};

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
    posts?: {
        current_page?: number;
        data?: CategoryPostItem[];
    };
};

type PostApiResponse = {
    success: boolean;
    message: string;
    data?: PostDetail;
};

type CategoryApiResponse = {
    success: boolean;
    message: string;
    data?: CategoryDetail;
};
function normalizeImageUrl(url?: string | null) {
    if (!url) return null;

    if (url.startsWith("http://") || url.startsWith("https://")) {
        return url;
    }

    if (url.startsWith("/storage/")) {
        return `https://admin.chanthuongchinhhinh.com.vn${url}`;
    }

    if (url.startsWith("storage/")) {
        return `https://admin.chanthuongchinhhinh.com.vn/${url}`;
    }

    if (url.startsWith("/uploads/")) {
        return `https://admin.chanthuongchinhhinh.com.vn/storage${url}`;
    }

    if (url.startsWith("uploads/")) {
        return `https://admin.chanthuongchinhhinh.com.vn/storage/${url}`;
    }

    return `https://admin.chanthuongchinhhinh.com.vn/storage/${url}`;
}

async function getPost(slug: string): Promise<PostDetail | null> {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/post/${slug}`,
            { cache: "no-store" }
        );

        if (!res.ok) return null;

        const result: PostApiResponse = await res.json();
        return result.data || null;
    } catch (error) {
        console.error("Lỗi lấy chi tiết bài viết:", error);
        return null;
    }
}

async function getCategory(slug: string): Promise<CategoryDetail | null> {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/category/${slug}?fields=id,name,slug,description`,
            { cache: "no-store" }
        );

        if (!res.ok) return null;

        const result: CategoryApiResponse = await res.json();
        return result.data || null;
    } catch (error) {
        console.error("Lỗi lấy category:", error);
        return null;
    }
}

export default async function SlugPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    const category = await getCategory(slug);

    if (category) {
        const categoryItems =
            category.posts?.data?.map((item) => ({
                title: item.name || "Bài viết",
                description: item.description || "Nội dung đang được cập nhật.",
                doctor_text: "Xem chi tiết",
                link: item.slug ? `/${item.slug}` : "#",
                image: item.image || null,
            })) || [];

        return (
            <>
                <main className="page-content">
                    <PageBanner
                        title={category.name || "Danh mục"}
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

                            {/* <ServiceBox data={{ items: categoryItems }} /> */}
                            <ServiceBox data={{ items: categoryItems }} useFallback={false} />
                        </div>
                    </section>
                </main>

                <Footer />
            </>
        );
    }

    const post = await getPost(slug);

    if (!post) {
        notFound();
    }

    const imageUrl = normalizeImageUrl(post.image);

    return (
        <>
            <main className="page-content">
                <PageBanner
                    title={post.name || "Chi tiết bài viết"}
                    bnrimage={IMAGES.bnr2.src}
                />

                <section className="content-inner service-single">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 single-inner">
                                {imageUrl && (
                                    <div className="single-media dz-media single-media height-sm radius-lg m-b30">
                                        <Image
                                            src={imageUrl}
                                            alt={post.name || "Post image"}
                                            width={900}
                                            height={500}
                                            style={{
                                                width: "100%",
                                                height: "auto",
                                                objectFit: "cover",
                                            }}
                                            unoptimized
                                        />
                                    </div>
                                )}

                                <div className="content-item">
                                    <h2>{post.name}</h2>

                                    {post.content ? (
                                        <div dangerouslySetInnerHTML={{ __html: post.content }} />
                                    ) : post.description ? (
                                        <p>{post.description}</p>
                                    ) : (
                                        <p>Thông tin chi tiết dịch vụ đang được cập nhật.</p>
                                    )}
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