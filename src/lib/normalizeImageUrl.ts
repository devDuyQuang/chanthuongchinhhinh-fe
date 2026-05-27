// export function normalizeImageUrl(url?: string | null): string | undefined {
//     if (!url) return undefined;

//     const baseUrl = (process.env.NEXT_PUBLIC_BASE_URL || "").replace(/^https?:\/\//, (match) => match + "admin.") || "";

//     if (url.startsWith("http://") || url.startsWith("https://")) {
//         return url;
//     }

//     if (url.startsWith("/storage/")) {
//         return `${baseUrl}${url}`;
//     }

//     if (url.startsWith("storage/")) {
//         return `${baseUrl}/${url}`;
//     }

//     const domainText = (process.env.NEXT_PUBLIC_BASE_URL || "")
//         .replace(/^https?:\/\//, "")
//         .replace(/\/$/, "")
//         .replace(/\./g, "_");

//     // nhóm file tenant/domain-specific
//     if (
//         domainText && (
//             url.startsWith(`/uploads/${domainText}/`) ||
//             url.startsWith(`uploads/${domainText}/`)
//         )
//     ) {
//         const cleanUrl = url.startsWith("/") ? url : `/${url}`;
//         return `${baseUrl}/storage${cleanUrl}`;
//     }

//     // nhóm file uploads/settings/... dùng public trực tiếp
//     // uploads phải đi qua /storage
//     if (url.startsWith("/uploads/")) {
//         return `${baseUrl}${url}`;
//     }

//     if (url.startsWith("uploads/")) {
//         return `${baseUrl}/${url}`;
//     }
//     return `${baseUrl}/${url}`;
// }


export function normalizeImageUrl(url?: string | null): string | undefined {
    if (!url) return undefined;

    if (url.startsWith("http://") || url.startsWith("https://")) {
        return url;
    }

    const baseUrl = process.env.NEXT_PUBLIC_ADMIN_URL || "";
    const cleanUrl = url.replace(/^\/+/, "");

    // ảnh setting của home đang public trực tiếp, KHÔNG qua /storage
    if (cleanUrl.startsWith("uploads/settings/")) {
        return `${baseUrl}/${cleanUrl}`;
    }

    // nếu API đã trả storage/... thì giữ nguyên
    if (cleanUrl.startsWith("storage/")) {
        return `${baseUrl}/${cleanUrl}`;
    }

    // icon/category/domain-specific đi qua storage
    if (cleanUrl.startsWith("uploads/")) {
        return `${baseUrl}/storage/${cleanUrl}`;
    }

    return `${baseUrl}/${cleanUrl}`;
}