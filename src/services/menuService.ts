// // services/menuService.ts
// import type { StaticImageData } from "next/image";

// const API_BASE = (process.env.NEXT_PUBLIC_API_BASE_URL ?? "").replace(/\/$/, "");
// const API_URL = API_BASE ? `${API_BASE}/menu` : "";

// export type HeaderContentItem = {
//   title: string;
//   to: string;
//   image?: string | StaticImageData;
// };

// export type HeaderItem = {
//   title: string;
//   to?: string;
//   classChange?: string;
//   content?: HeaderContentItem[];
// };

// interface RawMenuItem {
//   name?: string;
//   path?: string;
//   children?: RawMenuItem[]; // nếu API có trả children
//   [k: string]: any;
// }

// function normalizePath(p?: string): string {
//   if (!p) return "/";
//   // nếu path full url -> lấy pathname, nếu relative -> đảm bảo bắt đầu bằng '/'
//   try {
//     const url = new URL(p, "http://example.com");
//     return url.pathname === "" ? "/" : url.pathname + (url.search || "");
//   } catch {
//     // nếu không phải url -> đảm bảo bắt đầu bằng '/'
//     return p.startsWith("/") ? p : `/${p}`;
//   }
// }

// /**
//  * Map raw menu item (API) -> HeaderContentItem[] hoặc HeaderItem
//  */
// function mapRawToHeaderContent(items?: RawMenuItem[]): HeaderContentItem[] | undefined {
//   if (!items || !Array.isArray(items) || items.length === 0) return undefined;
//   return items.map(it => ({
//     title: it.name ?? "No title",
//     to: normalizePath(it.path),
//     // image: undefined // nếu API trả image, map ở đây
//   }));
// }

// /**
//  * Trả về mảng HeaderItem phù hợp UI
//  */
// export async function getMenu(location: string = "header"): Promise<HeaderItem[]> {
//   if (!API_URL) {
//     console.warn("API base URL not configured. Set NEXT_PUBLIC_API_BASE_URL in .env");
//     return [];
//   }

//   const res = await fetch(`${API_URL}?location=${encodeURIComponent(location)}`, {
//     cache: "no-store",
//     headers: { Accept: "application/json" },
//   });

//   if (!res.ok) {
//     // đọc body để debug (an toàn server-side)
//     const txt = await res.text();
//     throw new Error(`Failed to fetch menu: ${res.status} ${res.statusText} — ${txt}`);
//   }

//   const json = await res.json();
//   const raw: RawMenuItem[] = Array.isArray(json?.data) ? json.data : [];

//   // Nếu API chỉ trả list đơn giản (không nested) -> map thành HeaderItem[] với to/title
//   // Nếu API có children -> gán vào content
//   const mapped: HeaderItem[] = raw.map((it) => {
//     const children = it.children ?? undefined;
//     const content = children ? mapRawToHeaderContent(children) : undefined;

//     // Nếu muốn giữ cấu trúc mega-menu khi có content, set classChange
//     const classChange = content ? "has-mega-menu" : undefined;

//     return {
//       title: it.name ?? "No title",
//       to: normalizePath(it.path),
//       classChange,
//       content,
//     };
//   });

//   return mapped;
// }

import type { StaticImageData } from "next/image";

const API_BASE = (process.env.NEXT_PUBLIC_API_BASE_URL ?? "").replace(/\/$/, "");
const API_URL = API_BASE ? `${API_BASE}/menu` : "";

export type HeaderContentItem = {
  title: string;
  to: string;
  image?: string | StaticImageData;
};

export type HeaderItem = {
  title: string;
  to?: string;
  classChange?: string;
  content?: HeaderContentItem[];
};

interface RawMenuItem {
  name?: string;
  path?: string;
  children?: RawMenuItem[];
  [k: string]: any;
}

function normalizePath(p?: string): string {
  if (!p) return "/";
  try {
    const url = new URL(p, "http://example.com");
    return url.pathname === "" ? "/" : url.pathname + (url.search || "");
  } catch {
    return p.startsWith("/") ? p : `/${p}`;
  }
}

function mapTemplateRoute(name?: string, path?: string): string {
  const normalized = normalizePath(path);
  const title = (name || "").trim().toLowerCase();

  if (title === "trang chủ") return "/";
  if (title === "giới thiệu") return "/about-us";
  if (title === "dịch vụ điều trị") return "/services";
  if (title === "đặt lịch khám") return "/appointment";
  if (title === "liên hệ") return "/contact-us";
  if (title === "kiến thức xương khớp") return "/blog-grid";

  if (title === "bệnh lý") return "#";

  return normalized;
}

function mapRawToHeaderContent(items?: RawMenuItem[]): HeaderContentItem[] | undefined {
  if (!items || !Array.isArray(items) || items.length === 0) return undefined;

  return items.map((it) => ({
    title: it.name ?? "No title",
    to: mapTemplateRoute(it.name, it.path),
  }));
}

export async function getMenu(location: string = "header"): Promise<HeaderItem[]> {
  if (!API_URL) {
    console.warn("API base URL not configured. Set NEXT_PUBLIC_API_BASE_URL in .env");
    return [];
  }

  const res = await fetch(`${API_URL}?location=${encodeURIComponent(location)}`, {
    cache: "no-store",
    headers: { Accept: "application/json" },
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Failed to fetch menu: ${res.status} ${res.statusText} — ${txt}`);
  }

  const json = await res.json();
  const raw: RawMenuItem[] = Array.isArray(json?.data) ? json.data : [];

  const mapped: HeaderItem[] = raw.map((it) => {
    const content = it.children ? mapRawToHeaderContent(it.children) : undefined;

    return {
      title: it.name ?? "No title",
      to: mapTemplateRoute(it.name, it.path),
      classChange: content && content.length > 0 ? "sub-menu-down" : undefined,
      content,
    };
  });

  return mapped;
}