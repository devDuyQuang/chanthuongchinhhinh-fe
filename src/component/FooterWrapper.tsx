import Footer, { FloatingInfoData } from "@/layout/Footer";
import { SiteCommonData } from "@/types/site";

type SettingResponse = {
  success: boolean;
  message: string;
  data?: {
    site?: SiteCommonData;
    floating_info?: FloatingInfoData;
    floating_info_clinic?: FloatingInfoData;
    site_assets_clinic?: unknown;
  };
};

function getApiBaseUrl() {
  return (
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    "http://localhost:8000/api"
  ).replace(/\/$/, "");
}

async function getSettings(): Promise<SettingResponse | null> {
  try {
    const url = `${getApiBaseUrl()}/setting?keys=site,floating_info,floating_info_clinic,site_assets_clinic`;

    const res = await fetch(url, {
      cache: "no-store",
      headers: {
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      console.error("Fetch settings footer failed:", res.status, url);
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error("Lỗi lấy settings cho footer:", error);
    return null;
  }
}

export default async function FooterWrapper() {
  const settingResponse = await getSettings();
  const data = settingResponse?.data;

  return (
    <Footer
      settings={{
        site: data?.site,
        floating_info: data?.floating_info || data?.floating_info_clinic,
        site_assets_clinic: data?.site_assets_clinic,
      }}
    />
  );
}