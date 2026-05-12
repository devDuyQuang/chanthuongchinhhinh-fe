import { Post } from "@/types/post";

const API_BASE = ((process.env.NEXT_PUBLIC_BASE_URL || "").replace(/^https?:\/\//, (match) => match + "api.") ?? "").replace(/\/$/, "");

export interface PaginationLinks {
    url: string | null;
    label: string;
    active: boolean;
    page: number | null;
}

export interface PaginatedData<T> {
    current_page: number;
    data: T[];
    first_page_url: string;
    from: number | null;
    last_page: number;
    last_page_url: string;
    links: PaginationLinks[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number | null;
    total: number;
}

export interface Breadcrumb {
    name: string;
    slug: string;
    active: boolean;
}

export interface Category {
    id: number;
    name: string;
    slug: string;
    status: number;
    description: string | null;
    content: string | null;
    image: string | null;
    type: string;
    sort: number;
    order_position: number;
    created_at: string;
    updated_at: string;
    title_seo?: string | null;
    description_seo?: string | null;
    canonical_seo?: string | null;
    posts?: PaginatedData<Post>;
    stories?: PaginatedData<Post>;
    breadcrumbs?: Breadcrumb[];
}

export interface CategoryResponse {
    success: boolean;
    message: string;
    data: Category;
}

export interface GetCategoryParams {
    limit?: number;
    page?: number;
    sortName?: string;
    sortBy?: string;
}

/**
 * Lấy thông tin danh mục và danh sách bài viết thuộc danh mục đó
 * API: /category/{slug}
 */
export async function getCategoryBySlug(
    slug: string,
    params: GetCategoryParams = { limit: 12, page: 1, sortName: 'created_at', sortBy: 'desc' }
): Promise<Category | null> {
    if (!API_BASE) return null;

    try {
        const queryParams = new URLSearchParams();
        if (params.limit) queryParams.append('limit', params.limit.toString());
        if (params.page) queryParams.append('page', params.page.toString());
        if (params.sortName) queryParams.append('sortName', params.sortName);
        if (params.sortBy) queryParams.append('sortBy', params.sortBy);

        const url = `${API_BASE}/category/${slug}?${queryParams.toString()}`;

        const res = await fetch(url, {
            cache: 'no-store',
            headers: {
                'Accept': 'application/json',
            }
        });

        if (!res.ok) {
            console.error(`Failed to fetch category ${slug}: ${res.status}`);
            return null;
        }

        const result: CategoryResponse = await res.json();
        return result.data || null;
    } catch (error) {
        console.error("Error fetching category:", error);
        return null;
    }
}

/**
 * Lấy danh sách tất cả các danh mục
 * API: /category
 */
export async function getCategories(): Promise<any[]> {
    if (!API_BASE) return [];

    try {
        const res = await fetch(`${API_BASE}/category`, {
            cache: 'no-store',
            headers: {
                'Accept': 'application/json',
            }
        });

        if (!res.ok) return [];

        const result = await res.json();
        return result.data || [];
    } catch (error) {
        console.error("Error fetching categories:", error);
        return [];
    }
}
