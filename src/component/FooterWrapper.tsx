import Footer, { FloatingInfoData } from "@/layout/Footer";
import { SiteCommonData } from "@/types/site";
import { getSetting } from "@/services/settingService";

export default async function FooterWrapper() {
  const settingResponse = await getSetting();
  const data = settingResponse?.data as any;

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