"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";

interface ExpandableContentProps {
    content: string;
    maxHeight?: number;
    syncHeightWithSelector?: string;
}

export default function ExpandableContent({ content, maxHeight = 400, syncHeightWithSelector }: ExpandableContentProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [needsExpansion, setNeedsExpansion] = useState(false);
    const [calculatedMaxHeight, setCalculatedMaxHeight] = useState(maxHeight);
    const contentRef = useRef<HTMLDivElement>(null);

    const updateHeight = useCallback(() => {
        if (!contentRef.current) return;
        
        const contentEl = contentRef.current;
        let finalMaxHeight = maxHeight;

        if (syncHeightWithSelector) {
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

    return (
        <div style={{ position: 'relative' }}>
            <div
                ref={contentRef}
                className={`content-item wow fadeInUp add-style entry-content e-content custom-content-transition`}
                data-wow-delay="0.2s"
                data-wow-duration="0.7s"
                style={{
                    maxHeight: isExpanded ? `${contentRef.current?.scrollHeight || 10000}px` : `${calculatedMaxHeight}px`,
                    overflow: 'hidden',
                    transition: 'max-height 0.5s ease-in-out',
                }}
                dangerouslySetInnerHTML={{ __html: content }}
            />
            
            {/* Gradient overlay when collapsed */}
            {!isExpanded && needsExpansion && (
                <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '150px',
                    background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)',
                    pointerEvents: 'none',
                }} />
            )}

            {/* Read more / Collapse button */}
            {needsExpansion && (
                <div className="text-center mt-4 mb-4" style={{ position: 'relative', zIndex: 10 }}>
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="btn shadow-sm"
                        style={{ 
                            padding: '10px 35px', 
                            fontWeight: 700, 
                            fontSize: '15px', 
                            backgroundColor: '#031b4e', 
                            color: '#ffffff', 
                            border: 'none', 
                            borderRadius: '30px',
                            transition: 'all 0.3s ease',
                            cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#1a6fc4'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 5px 15px rgba(26, 111, 196, 0.4)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#031b4e'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)'; }}
                    >
                        {isExpanded ? (
                            <>Thu gọn <i className="feather icon-chevron-up ms-2"></i></>
                        ) : (
                            <>Đọc thêm <i className="feather icon-chevron-down ms-2"></i></>
                        )}
                    </button>
                </div>
            )}
        </div>
    );
}
