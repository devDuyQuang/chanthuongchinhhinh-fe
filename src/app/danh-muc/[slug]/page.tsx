import PageBanner from "@/component/PageBanner";
import { IMAGES } from "@/constant/theme";
import Footer from "@/layout/Footer";
import Sidebar from "@/component/Sidebar";
import KnowledgeGridClient from "./KnowledgeGridClient";

type Props = {
    params: Promise<{
        slug: string;
    }>;
};

const titleMap: Record<string, string> = {
    "dau-lung": "Đau lưng",
    "thoai-hoa-cot-song": "Thoái hóa cột sống",
    "thoat-vi-dia-dem": "Thoát vị đĩa đệm",
    "dau-khop-goi": "Đau khớp gối",
    "viem-khop": "Viêm khớp",
    "tran-dich-khop": "Tràn dịch khớp",
    "gay-xuong": "Gãy xương",
    "dut-day-chang": "Đứt dây chằng",
    "chan-thuong-the-thao": "Chấn thương thể thao",
};

export default async function DanhMucSlugPage({ params }: Props) {
    const { slug } = await params;
    const pageTitle = titleMap[slug] || "Kiến thức";

    return (
        <>
            <main className="page-content">
                <PageBanner title={pageTitle} bnrimage={IMAGES.bnr2.src} />

                <section className="content-inner">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-9 col-lg-12 m-b30 pe-xl-5">
                                <KnowledgeGridClient />
                            </div>

                            <div className="col-xl-3 col-lg-12">
                                <Sidebar />
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}