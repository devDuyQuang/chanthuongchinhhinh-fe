import PageBanner from "@/component/PageBanner";
import { IMAGES } from "@/constant/theme";
import Footer from "@/layout/Footer";
import ServiceBox from "@/component/ServiceBox";

type PostItem = {
    id: number;
    name?: string;
    slug?: string;
    image?: string | null;
    description?: string | null;
    created_at?: string;
    views?: number;
    favorites?: number;
};

type PostListResponse = {
    success: boolean;
    message: string;
    data?: {
        current_page?: number;
        data?: PostItem[];
    };
};

async function getPosts(): Promise<PostItem[]> {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/post?limit=12&sort_name=id&sort_by=desc&name=`,
            {
                cache: "no-store",
            }
        );

        if (!res.ok) {
            throw new Error(`Fetch posts failed: ${res.status}`);
        }

        const result: PostListResponse = await res.json();
        return result?.data?.data || [];
    } catch (error) {
        console.error("Lỗi lấy danh sách bài viết:", error);
        return [];
    }
}

async function Services() {
    const posts = await getPosts();

    return (
        <>
            <main className="page-content">
                <PageBanner title="Dịch vụ" bnrimage={IMAGES.bnr2.src} />

                <section
                    className="content-inner bg-light"
                    style={{ backgroundImage: `url(${IMAGES.bg5png.src})` }}
                >
                    <div className="container">
                        <ServiceBox posts={posts} />
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}

export default Services;