import Footer from "@/layout/Footer";
import { SiteCommonData } from "@/types/site";

type SettingResponse = {
    success: boolean;
    message: string;
    data?: {
        site?: SiteCommonData;
    };
};

async function getSettings(): Promise<SettingResponse | null> {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/setting`,
            { cache: "no-store" }
        );

        if (!res.ok) {
            throw new Error(`Fetch setting failed: ${res.status}`);
        }

        return await res.json();
    } catch (error) {
        console.error("Lỗi lấy settings cho footer:", error);
        return null;
    }
}

export default async function FooterWrapper() {
    const setting = await getSettings();

    return <Footer settings={{ site: setting?.data?.site }} />;
}