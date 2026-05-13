'use client';

import { useEffect, useState, useCallback } from 'react';

/**
 * ImageLightboxActivator
 *
 * Mục đích: Gắn sự kiện click vào các <img> bên trong `containerSelector`
 * để mở lightbox. KHÔNG render nội dung HTML — nội dung vẫn được render
 * phía server (SSR) để đảm bảo SEO đầy đủ.
 *
 * Cách dùng:
 *   1. Render nội dung HTML bình thường ở Server Component với dangerouslySetInnerHTML.
 *   2. Đặt <ImageLightboxActivator containerSelector=".content-item" /> cạnh đó.
 */
interface ImageLightboxActivatorProps {
    /** CSS selector của container chứa các ảnh cần lightbox */
    containerSelector?: string;
}

export default function ImageLightboxActivator({
    containerSelector = '.content-item',
}: ImageLightboxActivatorProps) {
    const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
    const [lightboxAlt, setLightboxAlt] = useState<string>('');
    const [isVisible, setIsVisible] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    const openLightbox = useCallback((src: string, alt: string) => {
        setLightboxSrc(src);
        setLightboxAlt(alt);
        setIsVisible(true);
        document.body.style.overflow = 'hidden';
        requestAnimationFrame(() => {
            requestAnimationFrame(() => setIsAnimating(true));
        });
    }, []);

    const closeLightbox = useCallback(() => {
        setIsAnimating(false);
        setTimeout(() => {
            setIsVisible(false);
            setLightboxSrc(null);
            document.body.style.overflow = '';
        }, 280);
    }, []);

    // Gắn event listeners vào các <img> bên trong container (SSR-rendered HTML)
    useEffect(() => {
        const containers = document.querySelectorAll<HTMLElement>(containerSelector);
        const cleanupFns: (() => void)[] = [];

        containers.forEach((container) => {
            const images = container.querySelectorAll<HTMLImageElement>('img');
            images.forEach((img) => {
                img.style.cursor = 'zoom-in';
                img.style.transition = 'transform 0.25s ease, box-shadow 0.25s ease';

                const onEnter = () => {
                    img.style.transform = 'scale(1)';
                    img.style.boxShadow = '0 8px 32px rgba(0,0,0,0.18)';
                };
                const onLeave = () => {
                    img.style.transform = '';
                    img.style.boxShadow = '';
                };
                const onClick = () => openLightbox(img.src, img.alt || '');

                img.addEventListener('mouseenter', onEnter);
                img.addEventListener('mouseleave', onLeave);
                img.addEventListener('click', onClick);

                cleanupFns.push(() => {
                    img.removeEventListener('mouseenter', onEnter);
                    img.removeEventListener('mouseleave', onLeave);
                    img.removeEventListener('click', onClick);
                    img.style.cursor = '';
                    img.style.transition = '';
                });
            });
        });

        return () => cleanupFns.forEach((fn) => fn());
    }, [containerSelector, openLightbox]);

    // Đóng bằng phím Escape
    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isVisible) closeLightbox();
        };
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [isVisible, closeLightbox]);

    if (!isVisible) return null;

    return (
        <div
            onClick={closeLightbox}
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 99999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: isAnimating
                    ? 'rgba(10, 10, 18, 0.92)'
                    : 'rgba(10, 10, 18, 0)',
                backdropFilter: isAnimating ? 'blur(6px)' : 'blur(0px)',
                transition: 'background-color 0.28s ease, backdrop-filter 0.28s ease',
                cursor: 'zoom-out',
                padding: '20px',
            }}
        >
            {/* Nút đóng */}
            <button
                onClick={closeLightbox}
                aria-label="Đóng ảnh"
                style={{
                    position: 'absolute',
                    top: '20px',
                    right: '24px',
                    background: 'rgba(255,255,255,0.12)',
                    border: '1.5px solid rgba(255,255,255,0.25)',
                    borderRadius: '50%',
                    width: '44px',
                    height: '44px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: '#fff',
                    fontSize: '22px',
                    lineHeight: 1,
                    transition: 'background 0.2s',
                }}
                onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background =
                        'rgba(255,255,255,0.24)';
                }}
                onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background =
                        'rgba(255,255,255,0.12)';
                }}
            >
                ✕
            </button>

            {/* Ảnh phóng to */}
            {lightboxSrc && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                    src={lightboxSrc}
                    alt={lightboxAlt}
                    onClick={(e) => e.stopPropagation()}
                    style={{
                        maxWidth: '92vw',
                        maxHeight: '88vh',
                        objectFit: 'contain',
                        borderRadius: '12px',
                        boxShadow: '0 24px 80px rgba(0,0,0,0.55)',
                        transform: isAnimating ? 'scale(1)' : 'scale(0.88)',
                        opacity: isAnimating ? 1 : 0,
                        transition:
                            'transform 0.28s cubic-bezier(0.34,1.56,0.64,1), opacity 0.28s ease',
                        cursor: 'default',
                    }}
                />
            )}

            {/* Caption */}
            {lightboxAlt && (
                <div
                    style={{
                        position: 'absolute',
                        bottom: '24px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        color: 'rgba(255,255,255,0.75)',
                        fontSize: '14px',
                        background: 'rgba(0,0,0,0.45)',
                        padding: '6px 18px',
                        borderRadius: '20px',
                        whiteSpace: 'nowrap',
                        maxWidth: '80vw',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        opacity: isAnimating ? 1 : 0,
                        transition: 'opacity 0.28s ease 0.1s',
                    }}
                >
                    {lightboxAlt}
                </div>
            )}
        </div>
    );
}
