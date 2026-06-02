import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://drduongortho.com";
    const apiUrl = baseUrl.replace(/^https?:\/\//, (match) => match + "api.");

    // Static routes
    const staticRoutes: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 1,
        },
        {
            url: `${baseUrl}/dich-vu`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.9,
        }
    ];

    try {
        // Fetch dynamic posts from API
        const postsRes = await fetch(`${apiUrl}/post?limit=100`, { next: { revalidate: 3600 } });
        const postsData = await postsRes.json();

        const postRoutes = postsData.success ? postsData.data.data.map((post: any) => ({
            url: `${baseUrl}/${post.slug}`,
            lastModified: new Date(post.updated_at || post.created_at),
            changeFrequency: "weekly",
            priority: 0.7,
        })) : [];

        // Fetch dynamic categories (services/knowledge)
        const categoriesRes = await fetch(`${apiUrl}/category`, { next: { revalidate: 3600 } });
        const categoriesData = await categoriesRes.json();

        const categoryRoutes = categoriesData.success ? categoriesData.data.map((cat: any) => ({
            url: `${baseUrl}/dich-vu/${cat.slug}`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.8,
        })) : [];

        return [...staticRoutes, ...postRoutes, ...categoryRoutes];
    } catch (error) {
        console.error("Sitemap generation error:", error);
        return staticRoutes;
    }
}