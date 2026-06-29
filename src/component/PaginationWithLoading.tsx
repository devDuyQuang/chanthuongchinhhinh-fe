"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import LoadingModal from "./LoadingModal";

interface PaginationProps {
    currentPage: number;
    lastPage: number;
    basePath: string; // e.g. "/dich-vu/slug"
}

export default function PaginationWithLoading({ currentPage, lastPage, basePath }: PaginationProps) {
    const [loading, setLoading] = useState(false);
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Reset loading when URL changes (navigation completed)
    useEffect(() => {
        setLoading(false);
    }, [pathname, searchParams]);

    const pageHref = (p: number) => p === 1 ? basePath : `${basePath}?page=${p}`;

    const handleClick = () => {
        setLoading(true);
    };

    return (
        <>
            <LoadingModal show={loading} />
            <style>{`
                .content-inner ul.pagination-no-bullets,
                .content-inner ul.pagination-no-bullets > li {
                    list-style: none;
                }
                .content-inner ul.pagination-no-bullets > li::before,
                .content-inner ul.pagination-no-bullets > li::after,
                ul.pagination-no-bullets > li::before,
                ul.pagination-no-bullets > li::after {
                    display: none !important;
                    content: none !important;
                    background: transparent !important;
                }
            `}</style>
            <ul className="pagination text-center pagination-rounded justify-content-center list-unstyled pagination-no-bullets" style={{ margin: 0, padding: 0 }}>
                {currentPage > 1 && (
                    <li className="page-item">
                        <Link
                            className="page-link prev"
                            href={pageHref(currentPage - 1)}
                            scroll={false}
                            onClick={handleClick}
                        >
                            <i className="fas fa-chevron-left"></i>
                        </Link>
                    </li>
                )}
                {Array.from({ length: lastPage }, (_, i) => i + 1).map((p) => (
                    <li key={p} className="page-item">
                        <Link
                            className={`page-link ${p === currentPage ? 'active' : ''}`}
                            href={pageHref(p)}
                            scroll={false}
                            onClick={handleClick}
                        >
                            {p}
                        </Link>
                    </li>
                ))}
                {currentPage < lastPage && (
                    <li className="page-item">
                        <Link
                            className="page-link next"
                            href={pageHref(currentPage + 1)}
                            scroll={false}
                            onClick={handleClick}
                        >
                            <i className="fas fa-chevron-right"></i>
                        </Link>
                    </li>
                )}
            </ul>
        </>
    );
}
