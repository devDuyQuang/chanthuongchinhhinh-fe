import PageBanner from "@/component/PageBanner";
import { IMAGES } from "@/constant/theme";
import Footer from "@/layout/Footer";
import ServiceBox from "@/component/ServiceBox";

type CategoryPostItem = {
    id?: number;
    name?: string;
    slug?: string;
    image?: string | null;
    description?: string | null;
    created_at?: string;
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

type CategoryApiResponse = {
    success: boolean;
    message: string;
    data?: CategoryDetail;
};

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

type Props = {
    params: Promise<{
        slug: string;
    }>;
};

export default async function DanhMucSlugPage({ params }: Props) {
    const { slug } = await params;
    const category = await getCategory(slug);

    if (!category) {
        return (
            <>
                <main className="page-content">
                    <PageBanner title="Danh mục" bnrimage={IMAGES.bnr2.src} />
                    <section className="content-inner">
                        <div className="container">
                            <p>Không tìm thấy danh mục.</p>
                        </div>
                    </section>
                </main>
                {/* <Footer /> */}
            </>
        );
    }

    const serviceItems =
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
                        <ServiceBox data={{ items: serviceItems }} useFallback={false} />
                    </div>
                </section>
            </main>

            {/* <Footer /> */}
        </>
    );
}