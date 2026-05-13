export interface Post {
    id: number;
    name: string;
    slug: string;
    image: string;
    image_url?: string;
    description: string;
    content?: string;
    created_at: string;
    updated_at?: string;
    views: number;
    favorites: number;
    title_seo?: string | null;
    description_seo?: string | null;
    canonical_seo?: string | null;
}

export interface PostResponse {
    success: boolean;
    data: {
        data: Post[]; // Dữ liệu nằm trong object pagination của Laravel
    };
}