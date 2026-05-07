import PageBanner from "@/component/PageBanner";
import { IMAGES } from "@/constant/theme";
import Footer from "@/layout/Footer";
import Image from "next/image";

type PostDetail = {
    id: number;
    name?: string;
    slug?: string;
    image?: string | null;
    description?: string | null;
};

type ApiResponse = {
    success: boolean;
    message: string;
    data?: PostDetail;
};

function normalizeImageUrl(url?: string | null) {
    if (!url) return null;

    if (url.startsWith("http")) return url;

    return `${process.env.NEXT_PUBLIC_ADMIN_BASE_URL}/${url}`;
}

async function getPost(slug: string): Promise<PostDetail | null> {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/post/${slug}`,
            { cache: "no-store" },
        );

        if (!res.ok) return null;

        const result: ApiResponse = await res.json();
        return result.data || null;
    } catch (err) {
        console.error("Lỗi lấy detail:", err);
        return null;
    }
}

async function ServiceDetail({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const post = await getPost(slug);

    if (!post) {
        return <div className="container py-5">Không tìm thấy dịch vụ</div>;
    }

    return (
        <>
            <main className="page-content">
                <PageBanner
                    title={post.name || "Chi tiết dịch vụ"}
                    bnrimage={IMAGES.bnr2.src}
                />

                <section className="content-inner service-single">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 single-inner">
                                {/* IMAGE */}
                                {post.image && (
                                    <div className="single-media dz-media height-sm radius-lg m-b30">
                                        <Image
                                            src={normalizeImageUrl(post.image)!}
                                            alt={post.name || ""}
                                            width={800}
                                            height={500}
                                            style={{ width: "100%", height: "auto" }}
                                            unoptimized
                                        />
                                    </div>
                                )}

                                {/* TITLE + DESCRIPTION */}
                                <div className="content-item">
                                    <h2>{post.name}</h2>
                                    <p>{post.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* <Footer /> */}
        </>
    );
}

export default ServiceDetail;
