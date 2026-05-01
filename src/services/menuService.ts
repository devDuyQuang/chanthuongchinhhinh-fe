import type { StaticImageData } from "next/image";

const API_BASE = (process.env.NEXT_PUBLIC_API_BASE_URL ?? "").replace(/\/$/, "");
const API_URL = API_BASE ? `${API_BASE}/menu` : "";

export type HeaderContentItem = {
  title: string;
  to: string;
  image?: string | StaticImageData;
  order_position?: number;
};

export type HeaderItem = {
  title: string;
  to?: string;
  classChange?: string;
  content?: HeaderContentItem[];
  order_position?: number;
};

interface RawMenuItem {
  name?: string;
  path?: string | null;
  order_position?: number;
  children?: RawMenuItem[];
  [k: string]: any;
}

function normalizePath(p?: string | null): string {
  if (!p) return "/";

  try {
    const url = new URL(p, "http://example.com");
    return url.pathname === "" ? "/" : `${url.pathname}${url.search || ""}`;
  } catch {
    return p.startsWith("/") ? p : `/${p}`;
  }
}

function mapTemplateRoute(name?: string, path?: string | null): string {
  const normalized = normalizePath(path);
  const title = (name || "").trim().toLowerCase();

  if (normalized && normalized !== "/") {
    return normalized;
  }

  if (title === "trang chủ") return "/";
  if (title === "giới thiệu") return "/gioi-thieu";
  if (title === "liên hệ") return "/lien-he";
  if (title === "đặt lịch khám") return "/dat-lich-kham";

  return "#";
}

function shouldHideFromMainNav(name?: string): boolean {
  const title = (name || "").trim().toLowerCase();
  return title === "đặt lịch khám";
}

function sortByAdminOrder<T extends { order_position?: number }>(items: T[]): T[] {
  return [...items].sort(
    (a, b) => Number(a.order_position ?? 0) - Number(b.order_position ?? 0),
  );
}

function mapRawToHeaderContent(items?: RawMenuItem[]): HeaderContentItem[] | undefined {
  if (!items || !Array.isArray(items) || items.length === 0) return undefined;

  return sortByAdminOrder(items).map((it) => ({
    title: it.name ?? "No title",
    to: mapTemplateRoute(it.name, it.path),
    order_position: it.order_position ?? 0,
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

  const filtered = sortByAdminOrder(
    raw.filter((it) => !shouldHideFromMainNav(it.name)),
  );

  return filtered.map((it) => {
    const content = it.children ? mapRawToHeaderContent(it.children) : undefined;

    return {
      title: it.name ?? "No title",
      to: mapTemplateRoute(it.name, it.path),
      classChange: content && content.length > 0 ? "sub-menu-down" : undefined,
      content,
      order_position: it.order_position ?? 0,
    };
  });
}