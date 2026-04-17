// import { getMenu } from "@/services/menuService";
// import Header from "@/layout/Header";

// export default async function HeaderWrapper() {
//   const menu = await getMenu("header");

//   return <Header menu={menu} />;
// }
import { getMenu } from "@/services/menuService";
import Header from "@/layout/Header";

type CategoryItem = {
  name?: string;
  slug?: string;
};

async function getCategories(): Promise<CategoryItem[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/category`,
      { cache: "no-store" },
    );

    if (!res.ok) return [];

    const result = await res.json();
    return result.data || [];
  } catch (error) {
    console.error("Lỗi lấy category:", error);
    return [];
  }
}

async function getSettings() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/setting`, {
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

// export default async function HeaderWrapper() {
//   const menu = await getMenu("header");
//   const categories = await getCategories();
//   const settings = await getSettings();

//   const newMenu = menu.map((item: any) => {
//     if (item.title?.trim().toLowerCase() === "bệnh lý") {
//       return {
//         ...item,
//         content: categories.map((cat) => ({
//           title: cat.name,
//           to: `/danh-muc/${cat.slug}`,
//         })),
//       };
//     }
//     return item;
//   });

//   return <Header menu={newMenu} settings={settings} />;
// }

export default async function HeaderWrapper() {
  const menu = await getMenu("header");
  const categories = await getCategories();
  const settings = await getSettings();

  //SORT THEO ADMIN
  const sortedMenu = [...menu].sort(
    (a: any, b: any) => (a.sort_order ?? 0) - (b.sort_order ?? 0),
  );

  const newMenu = sortedMenu.map((item: any) => {
    if (item.title?.trim().toLowerCase() === "bệnh lý") {
      return {
        ...item,
        content: categories.map((cat) => ({
          title: cat.name,
          to: `/danh-muc/${cat.slug}`,
        })),
      };
    }
    return item;
  });
  console.log(menu);
  return <Header menu={newMenu} settings={settings} />;
}
