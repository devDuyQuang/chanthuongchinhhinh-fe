"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import FloatingTOC from "./FloatingTOC";

type TOCItem = {
    id: string;
    text: string;
    level: number;
};

interface ExpandableContentProps {
    content: string;
    maxHeight?: number;
    syncHeightWithSelector?: string;
    toc?: TOCItem[] | null;
}

export default function ExpandableContent({ content, maxHeight = 400, syncHeightWithSelector, toc }: ExpandableContentProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [needsExpansion, setNeedsExpansion] = useState(false);
    const [calculatedMaxHeight, setCalculatedMaxHeight] = useState(maxHeight);
    const contentRef = useRef<HTMLDivElement>(null);

    const updateHeight = useCallback(() => {
        if (!contentRef.current) return;

        const contentEl = contentRef.current;
        let finalMaxHeight = maxHeight;

        // On mobile and tablet devices (<=991px), ignore sidebar sync since it drops below content, and fix max height to 500px
        if (typeof window !== 'undefined' && window.innerWidth <= 991) {
            finalMaxHeight = 500;
        } else if (syncHeightWithSelector) {
            const targetEl = document.querySelector(syncHeightWithSelector);
            if (targetEl) {
                const targetRect = targetEl.getBoundingClientRect();
                const contentRect = contentEl.getBoundingClientRect();

                // Calculate height so the bottom of this component matches the target bottom
                const targetBottom = targetRect.bottom;
                const desiredHeight = targetBottom - contentRect.top - 70; // Reserve 70px for the "Read more" button

                finalMaxHeight = Math.max(desiredHeight, 200); // Minimum 200px
            }
        }

        if (contentEl.scrollHeight > finalMaxHeight + 20) {
            setNeedsExpansion(true);
            setCalculatedMaxHeight(finalMaxHeight);
        } else {
            setNeedsExpansion(false);
            setCalculatedMaxHeight(contentEl.scrollHeight);
        }
    }, [maxHeight, syncHeightWithSelector]);

    useEffect(() => {
        updateHeight();

        // Use timeout to handle image loads that might change heights
        const timer1 = setTimeout(updateHeight, 300);
        const timer2 = setTimeout(updateHeight, 1500);

        window.addEventListener('resize', updateHeight);
        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            window.removeEventListener('resize', updateHeight);
        };
    }, [content, updateHeight]);

    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isModalOpen]);

    return (
        <div style={{ position: 'relative' }}>
            {toc && toc.length > 0 && (
                <>
                    <style>{`
                        .toc-link {
                            text-decoration: none;
                            transition: all 0.3s ease;
                            display: block;
                            font-size: 14px;
                            cursor: pointer;
                        }
                        .toc-link:hover {
                            color: var(--bs-primary) !important;
                        }
                        .custom-scrollbar::-webkit-scrollbar {
                            width: 6px;
                        }
                        .custom-scrollbar::-webkit-scrollbar-track {
                            background: #f1f1f1;
                            border-radius: 4px;
                        }
                        .custom-scrollbar::-webkit-scrollbar-thumb {
                            background: #c1c1c1;
                            border-radius: 4px;
                        }
                        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                            background: #a8a8a8;
                        }
                    `}</style>
                    <div
                        className="table-of-contents mb-4 p-4 rounded mx-auto"
                        style={{
                            background: '#f8f9fa',
                            borderLeft: '4px solid var(--bs-primary)',
                            boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                            width: '80%'
                        }}
                    >
                        <h4 className="mb-3" style={{ fontSize: '1.25rem', fontWeight: 600 }}>Nội dung chính</h4>
                        <ul className="list-unstyled mb-0 custom-scrollbar" style={{ maxHeight: '300px', overflowY: 'auto', paddingRight: '10px' }}>
                            {toc.map((item, index) => (
                                <li
                                    key={index}
                                    className="mb-2"
                                    style={{ paddingLeft: `${(item.level - 2) * 20}px` }}
                                >
                                    <a
                                        href={`#${item.id}`}
                                        className="toc-link text-body"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setIsModalOpen(true);
                                            setTimeout(() => {
                                                const container = document.querySelector('.custom-modal-body');
                                                if (container) {
                                                    const target = container.querySelector(`[id="${item.id}"]`);
                                                    if (target) {
                                                        target.scrollIntoView({ behavior: 'smooth' });
                                                    }
                                                }
                                            }, 100);
                                        }}
                                    >
                                        <i className="feather icon-chevron-right me-2" style={{ fontSize: '12px', color: 'var(--bs-primary)' }}></i>
                                        {item.text}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </>
            )}
            <div style={{ position: 'relative' }}>
                <div
                    ref={contentRef}
                    className={`content-item wow fadeInUp add-style entry-content e-content custom-content-transition`}
                    data-wow-delay="0.2s"
                    data-wow-duration="0.7s"
                    style={{
                        maxHeight: `${calculatedMaxHeight}px`,
                        overflow: 'hidden',
                    }}
                    dangerouslySetInnerHTML={{ __html: content }}
                />

                {/* Gradient overlay when collapsed */}
                {needsExpansion && (
                    <div style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '200px',
                        background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 60%, rgba(255,255,255,1) 100%)',
                        backdropFilter: 'blur(4px)',
                        WebkitBackdropFilter: 'blur(4px)',
                        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 100%)',
                        maskImage: 'linear-gradient(to bottom, transparent 0%, black 100%)',
                        pointerEvents: 'none',
                    }} />
                )}
            </div>

            <style>{`
                @keyframes border-glow {
                    0% { 
                        border-color: #031b4e; 
                        box-shadow: 0 0 5px rgba(3, 27, 78, 0.2); 
                    }
                    50% { 
                        border-color: #03bde0; 
                        box-shadow: 0 0 20px rgba(3, 189, 224, 0.8); 
                    }
                    100% { 
                        border-color: #031b4e; 
                        box-shadow: 0 0 5px rgba(3, 27, 78, 0.2); 
                    }
                }
                .btn-readmore {
                    padding: 10px 35px;
                    font-weight: 700;
                    font-size: 15px;
                    background-color: #031b4e;
                    color: #ffffff;
                    border: 2px solid #031b4e;
                    border-radius: 30px;
                    transition: all 0.3s ease;
                    cursor: pointer;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                }
                .btn-readmore:hover {
                    background-color: #ffffff;
                    color: #031b4e;
                    animation: border-glow 1.5s infinite;
                }
                .custom-modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color: rgba(0, 0, 0, 0.7);
                    z-index: 99999;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 20px;
                    opacity: 0;
                    animation: fadeIn 0.3s forwards;
                }
                .custom-modal-content {
                    background-color: #fff;
                    width: 100%;
                    max-width: 900px;
                    max-height: 90vh;
                    border-radius: 12px;
                    display: flex;
                    flex-direction: column;
                    position: relative;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                    transform: translateY(20px);
                    animation: slideUp 0.3s forwards;
                }
                .custom-modal-header {
                    padding: 15px 25px;
                    border-bottom: 1px solid #eee;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .custom-modal-body {
                    padding: 25px;
                    overflow-y: auto;
                    flex-grow: 1;
                }
                .btn-close-modal {
                    background: none;
                    border: none;
                    font-size: 28px;
                    cursor: pointer;
                    color: #666;
                    line-height: 1;
                    padding: 0;
                    transition: color 0.2s;
                }
                .btn-close-modal:hover {
                    color: #000;
                }
                @keyframes fadeIn {
                    to { opacity: 1; }
                }
                @keyframes slideUp {
                    to { transform: translateY(0); }
                }
            `}</style>

            {/* Read more button */}
            {needsExpansion && (
                <div className="text-center pb-4" style={{ position: 'relative', zIndex: 10, marginTop: '-50px' }}>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="btn-readmore shadow"
                    >
                        Đọc thêm <i className="feather icon-arrow-right ms-2"></i>
                    </button>
                </div>
            )}

            {/* Modal */}
            {isModalOpen && (
                <div className="custom-modal-overlay" onClick={() => setIsModalOpen(false)}>
                    <div className="custom-modal-content" onClick={e => e.stopPropagation()}>
                        <div className="custom-modal-header">
                            <h4 style={{ margin: 0, fontSize: '20px', color: '#031b4e' }}>Chi tiết nội dung</h4>
                            <button className="btn-close-modal" onClick={() => setIsModalOpen(false)}>
                                &times;
                            </button>
                        </div>
                        <div className="custom-modal-body add-style entry-content e-content pt-0" dangerouslySetInnerHTML={{ __html: content }}>
                        </div>
                    </div>
                    {toc && toc.length > 0 && (
                        <div onClick={e => e.stopPropagation()}>
                            <FloatingTOC toc={toc} scrollContainerSelector=".custom-modal-body" alwaysVisible={true} />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
