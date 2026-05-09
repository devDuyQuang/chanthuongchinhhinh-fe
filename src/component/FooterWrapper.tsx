import Footer, { FloatingInfoData } from "@/layout/Footer";
import { SiteCommonData } from "@/types/site";

type SettingResponse = {
    success: boolean;
    message: string;
    data?: {
        site?: SiteCommonData;
        floating_info?: FloatingInfoData;
    };
};

// async function getSettings(): Promise<SettingResponse | null> {
//     try {
//         const res = await fetch(
//             `${(process.env.NEXT_PUBLIC_BASE_URL || "").replace(/^https?:\/\//, (match) => match + "api.")}/setting`,
//             { cache: "no-store" }
//         );

//         if (!res.ok) {
//             throw new Error(`Fetch setting failed: ${res.status}`);
//         }

//         return await res.json();
//     } catch (error) {
//         console.error("Lỗi lấy settings cho footer:", error);
//         return null;
//     }
// }

// export default async function FooterWrapper() {
//     const setting = await getSettings();

//     return <Footer settings={{ site: setting?.data?.site}} />;
// }

async function getSettings(): Promise<SettingResponse | null> {
    try {
        const baseUrl = (process.env.NEXT_PUBLIC_BASE_URL || "").replace(/^https?:\/\//, (match) => match + "api.");
        
        // BẮT BUỘC: Thêm ?keys=site,floating_info
        const url = `${baseUrl}/setting?keys=site,floating_info,floating_info_clinic`;
        
        //console.log("Đang gọi API tại:", url); // Anh xem log terminal xem có đúng url này không

        const res = await fetch(url, { cache: "no-store" });

        if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
        
        const result = await res.json();
        return result;
    } catch (error) {
        console.error("Lỗi lấy settings cho footer:", error);
        return null;
    }
}

export default async function FooterWrapper() {
    const settingResponse = await getSettings();
    const data = settingResponse?.data as any;

    return (
        <Footer 
            settings={{ 
                site: data?.site, 
                // Lấy cả 2 trường hợp: có alias hoặc giữ nguyên tên gốc trong DB
                floating_info: data?.floating_info || data?.floating_info_clinic 
            }} 
        />
    );
}

