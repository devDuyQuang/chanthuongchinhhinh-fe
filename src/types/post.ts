export interface Post {
    id: number;
    name: string;
    slug: string;
    image: string;
    description: string;
    created_at: string;
    views: number;
    favorites: number;
}

export interface PostResponse {
    success: boolean;
    data: {
        data: Post[]; // Dữ liệu nằm trong object pagination của Laravel
    };
}