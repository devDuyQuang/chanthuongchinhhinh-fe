"use client";

import Link from "next/link";
import { SVGICONS } from "@/constant/theme";

type KnowledgePostItem = {
    title: string;
    slug: string;
    image: string | null;
    description: string;
    created_at: string;
};

type Props = {
    posts: KnowledgePostItem[];
};

function formatDate(dateString?: string) {
    if (!dateString) return "Chưa cập nhật";

    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) return "Chưa cập nhật";

    return date.toLocaleDateString("vi-VN");
}

export default function KnowledgeGridClient({ posts }: Props) {
    if (!posts.length) {
        return <p>Danh mục này hiện chưa có bài viết.</p>;
    }

    return (
        <div className="row loadmore-content">
            {posts.map((item, i) => (
                <div
                    className="col-lg-6 col-md-6 m-b25 wow fadeInUp"
                    data-wow-delay={`${0.2 + i * 0.1}s`}
                    data-wow-duration="0.5s"
                    key={i}
                >
                    <div
                        className="dz-card style-2 dz-card-overlay"
                        style={{
                            backgroundImage: item.image ? `url(${item.image})` : "none",
                            backgroundColor: item.image ? undefined : "#d9d9d9",
                        }}
                    >
                        <div className="dz-info">
                            <div className="post-date">{formatDate(item.created_at)}</div>
                            <div className="bottom-info">
                                <h3 className="dz-title">
                                    <Link href={`/${item.slug}`}>{item.title}</Link>
                                </h3>
                                <Link
                                    href={`/${item.slug}`}
                                    className="btn btn-square btn-white rounded-circle"
                                    dangerouslySetInnerHTML={{ __html: SVGICONS.uparrow2 }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}