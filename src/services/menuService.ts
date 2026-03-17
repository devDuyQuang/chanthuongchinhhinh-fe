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
    return url.pathname === "" ? "/" : `${url.pathname}${url.search || ""}`;
  } catch {
    return p.startsWith("/") ? p : `/${p}`;
  }
}

function mapTemplateRoute(name?: string, path?: string): string {
  const normalized = normalizePath(path);
  const title = (name || "").trim().toLowerCase();

  // Luôn ưu tiên path thật từ admin nếu đã có và khác "/"
  if (normalized && normalized !== "/") {
    return normalized;
  }

  // Fallback nếu admin chưa nhập path
  if (title === "trang chủ") return "/";

  if (title === "giới thiệu") return "/gioi-thieu";
  if (title === "dịch vụ điều trị") return "/danh-muc/dich-vu-dieu-tri";
  if (title === "kiến thức xương khớp") return "/danh-muc/kien-thuc-xuong-khop";
  if (title === "đặt lịch khám") return "/dat-lich-kham";
  if (title === "liên hệ") return "/lien-he";

  // Menu cha không có trang riêng
  if (title === "bệnh lý") return "#";

  return "/";
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
    const children = it.children ?? undefined;
    const content = children ? mapRawToHeaderContent(children) : undefined;

    return {
      title: it.name ?? "No title",
      to: mapTemplateRoute(it.name, it.path),
      classChange: content && content.length > 0 ? "sub-menu-down" : undefined,
      content,
    };
  });

  return mapped;
}