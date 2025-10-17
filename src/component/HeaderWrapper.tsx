import { getMenu } from "@/services/menuService";
import Header from "@/layout/Header";

export default async function HeaderWrapper() {
  const menu = await getMenu("header");

  return <Header menu={menu} />;
}
