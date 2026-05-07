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
  public_url?: string | null;
  status?: number | string | boolean | null;
  is_active?: number | string | boolean | null;
  active?: number | string | boolean | null;
  is_show?: number | string | boolean | null;
  published?: number | string | boolean | null;
  order_position?: number;
  children?: RawMenuItem[];
  [key: string]: any;
}

function isActiveMenu(item: RawMenuItem): boolean {
  const value =
    item?.status ??
    item?.is_active ??
    item?.active ??
    item?.is_show ??
    item?.published;

  // Nếu API chưa trả status thì vẫn giữ menu, không tự ẩn
  if (value === undefined || value === null) return true;

  return (
    value === true ||
    value === 1 ||
    value === "1" ||
    String(value).toLowerCase() === "true" ||
    String(value).toLowerCase() === "active"
  );
}

function normalizePath(path?: string | null): string {
  const value = String(path || "").trim();

  if (!value) return "#";

  try {
    const url = new URL(value, "http://example.com");
    return url.pathname === "" ? "/" : `${url.pathname}${url.search || ""}`;
  } catch {
    return value.startsWith("/") ? value : `/${value}`;
  }
}

function mapTemplateRoute(name?: string, path?: string | null): string {
  const normalized = normalizePath(path);
  const title = String(name || "").trim().toLowerCase();

  if (normalized && normalized !== "#" && normalized !== "/") return normalized;

  if (title === "trang chủ") return "/";
  if (title === "giới thiệu") return "/gioi-thieu";
  if (title === "liên hệ") return "/lien-he";
  if (title === "đặt lịch khám") return "/dat-lich-kham";

  return "#";
}

function shouldHideFromMainNav(name?: string): boolean {
  return String(name || "").trim().toLowerCase() === "đặt lịch khám";
}

function sortByAdminOrder<T extends { order_position?: number }>(items: T[]): T[] {
  return [...items].sort(
    (a, b) => Number(a.order_position ?? 0) - Number(b.order_position ?? 0),
  );
}

function getMenuPath(item: RawMenuItem): string | null {
  return item.path || item.public_url || null;
}

function mapRawToHeaderContent(items?: RawMenuItem[]): HeaderContentItem[] | undefined {
  if (!Array.isArray(items) || items.length === 0) return undefined;

  const activeChildren = sortByAdminOrder(
    items.filter((item) => isActiveMenu(item)),
  );

  if (activeChildren.length === 0) return undefined;

  return activeChildren.map((item) => ({
    title: item.name ?? "No title",
    to: mapTemplateRoute(item.name, getMenuPath(item)),
    order_position: item.order_position ?? 0,
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
    const text = await res.text();
    throw new Error(`Failed to fetch menu: ${res.status} ${res.statusText} — ${text}`);
  }

  const json = await res.json();
  const raw: RawMenuItem[] = Array.isArray(json?.data) ? json.data : [];

  const activeParents = sortByAdminOrder(
    raw.filter((item) => isActiveMenu(item) && !shouldHideFromMainNav(item.name)),
  );

  return activeParents.map((item) => {
    const content = mapRawToHeaderContent(item.children);

    return {
      title: item.name ?? "No title",
      to: mapTemplateRoute(item.name, getMenuPath(item)),
      classChange: content && content.length > 0 ? "sub-menu-down" : undefined,
      content,
      order_position: item.order_position ?? 0,
    };
  });
}