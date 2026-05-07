import { getMenu } from "@/services/menuService";
import Header from "@/layout/Header";

async function getSettings() {
  try {
    const res = await fetch(`${(process.env.NEXT_PUBLIC_BASE_URL || "").replace(/^https?:\/\//, (match) => match + "api.")}/setting`, {
      cache: "no-store",
    });

    if (!res.ok) return null;

    const result = await res.json();
    return result.data || null;
  } catch (error) {
    console.error("Lỗi lấy settings:", error);
    return null;
  }
}

export default async function HeaderWrapper() {
  const [menu, settings] = await Promise.all([
    getMenu("header"),
    getSettings(),
  ]);

  return <Header menu={menu} settings={settings} />;
}
