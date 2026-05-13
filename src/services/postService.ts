export type PostDetail = {
    id: number;
    name?: string;
    slug?: string;
    image?: string | null;
    description?: string | null;
    content?: string | null;
    created_at?: string;
    creator_name?: string;
    creator?: string;
    title_seo?: string | null;
    description_seo?: string | null;
    canonical_seo?: string | null;
};

type PostDetailResponse = {
    success: boolean;
    message: string;
    data?: PostDetail;
};

export type CategoryListItem = {
    name: string;
    slug: string;
};

type CategoryListResponse = {
    success: boolean;
    message: string;
    data?: CategoryListItem[];
};

export type PostListItem = {
    id?: number;
    name?: string;
    slug?: string;
    image?: string | null;
    created_at?: string;
};

type PostListResponse = {
    success: boolean;
    message: string;
    data?: {
        data?: PostListItem[];
    };
};

const getApiBase = () =>
    (process.env.NEXT_PUBLIC_BASE_URL || "").replace(
        /^https?:\/\//,
        (match) => match + "api.",
    );

export async function getPost(slug: string): Promise<PostDetail | null> {
    try {
        const res = await fetch(`${getApiBase()}/post/${slug}`, {
            cache: "no-store",
        });

        if (!res.ok) return null;

        const result: PostDetailResponse = await res.json();
        return result.data || null;
    } catch (error) {
        console.error("Lỗi lấy post detail:", error);
        return null;
    }
}

export async function getCategories(): Promise<
    { name: string; slug: string; count: number }[]
> {
    try {
        const res = await fetch(`${getApiBase()}/category`, {
            cache: "no-store",
        });

        if (!res.ok) return [];

        const result: CategoryListResponse = await res.json();
        const categories = result.data || [];

        return categories.map((item) => ({
            name: item.name,
            slug: item.slug,
            count: 0,
        }));
    } catch (error) {
        console.error("Lỗi lấy category list:", error);
        return [];
    }
}

export async function getLatestPosts(): Promise<PostListItem[]> {
    try {
        const res = await fetch(
            `${getApiBase()}/post?limit=3&sort_name=id&sort_by=desc&name=`,
            { cache: "no-store" },
        );

        if (!res.ok) return [];

        const result: PostListResponse = await res.json();
        return result.data?.data || [];
    } catch (error) {
        console.error("Lỗi lấy latest posts:", error);
        return [];
    }
}
