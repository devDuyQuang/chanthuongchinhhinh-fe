"use client";

import { useState } from "react";
import Link from "next/link";
import SearchModal from "./SearchModal";

export default function FloatingButtons() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    return (
        <>
            <style>
                {`
                @keyframes search-pulse-animation {
                    0% {
                        box-shadow: 0 0 0 0 rgba(0, 123, 255, 0.7);
                    }
                    70% {
                        box-shadow: 0 0 0 15px rgba(0, 123, 255, 0);
                    }
                    100% {
                        box-shadow: 0 0 0 0 rgba(0, 123, 255, 0);
                    }
                }
                .search-btn-animated {
                    animation: search-pulse-animation 2s infinite;
                    background-color: #fff !important;
                    color: var(--bs-primary) !important;
                }
                .search-btn-animated:hover {
                    animation: none;
                    background-color: var(--bs-primary) !important;
                    color: #fff !important;
                }
                `}
            </style>
            <div className="floating-buttons-container" style={{
                position: 'fixed',
                bottom: '90px',
                right: '30px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '15px',
                zIndex: 998
            }}>
                {/* Search Button */}
                <button
                    onClick={() => setIsSearchOpen(true)}
                    className="btn btn-primary shadow d-flex align-items-center justify-content-center search-btn-animated"
                    style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        padding: 0,
                        border: 'none',
                        opacity: 0.7,
                        transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.opacity = '1'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.opacity = '0.7'; }}
                >
                    <i className="fas fa-search" style={{ fontSize: '18px' }}></i>
                </button>

                {/* Messenger Button */}
                <Link href="https://www.facebook.com/profile.php?id=61585978932447" target="_blank" rel="nofollow noopener noreferrer"
                    className="btn shadow d-flex align-items-center justify-content-center"
                    style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        padding: 0,
                        backgroundColor: 'transparent',
                        color: '#0084FF',
                        border: '2px solid #0084FF',
                        opacity: 0.7,
                        transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.opacity = '1'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.opacity = '0.7'; }}
                >
                    <i className="fa-brands fa-facebook-f" style={{ fontSize: '18px' }}></i>
                </Link>

                {/* Zalo Button */}
                <Link href="https://zalo.me/0982891044" target="_blank" rel="nofollow noopener noreferrer"
                    className="btn shadow d-flex align-items-center justify-content-center"
                    style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        padding: 0,
                        backgroundColor: 'transparent',
                        color: '#0068FF',
                        border: '2px solid #0068FF',
                        opacity: 0.7,
                        overflow: 'hidden',
                        transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.opacity = '1'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.opacity = '0.7'; }}
                >
                    <span style={{ fontWeight: '900', fontSize: '14px', fontFamily: 'sans-serif' }}>Zalo</span>
                </Link>
            </div>

            <SearchModal show={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </>
    );
}
