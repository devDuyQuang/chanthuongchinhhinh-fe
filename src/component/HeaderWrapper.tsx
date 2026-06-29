import { getMenu } from "@/services/menuService";
import Header from "@/layout/Header";
import { getSetting } from "@/services/settingService";

export default async function HeaderWrapper() {
  const [menu, settingsResponse] = await Promise.all([
    getMenu("header"),
    getSetting(),
  ]);

  const settings = settingsResponse?.data;

  return <Header menu={menu} settings={settings} />;
}
