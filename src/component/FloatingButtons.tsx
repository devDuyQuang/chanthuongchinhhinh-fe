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
                gap: '15px',
                zIndex: 998
            }}>
                {/* Search Button */}
                <button
                    onClick={() => setIsSearchOpen(true)}
                    className="btn btn-primary shadow d-flex align-items-center justify-content-center search-btn-animated"
                    style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        padding: 0,
                        border: 'none',
                        transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                    <i className="fas fa-search" style={{ fontSize: '20px' }}></i>
                </button>

                {/* Messenger Button */}
                <Link href="https://www.facebook.com/profile.php?id=61585978932447" target="_blank" rel="nofollow noopener noreferrer"
                    className="btn shadow d-flex align-items-center justify-content-center"
                    style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        padding: 0,
                        backgroundColor: '#0084FF',
                        color: '#fff',
                        border: 'none',
                        transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                    <i className="fa-brands fa-facebook-f" style={{ fontSize: '24px' }}></i>
                </Link>

                {/* Zalo Button */}
                <Link href="https://zalo.me/0982891044" target="_blank" rel="nofollow noopener noreferrer"
                    className="btn shadow d-flex align-items-center justify-content-center"
                    style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        padding: 0,
                        backgroundColor: '#0068FF',
                        color: '#fff',
                        border: 'none',
                        overflow: 'hidden',
                        transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                    <span style={{ fontWeight: '900', fontSize: '18px', fontFamily: 'sans-serif' }}>Zalo</span>
                </Link>
            </div>

            <SearchModal show={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </>
    );
}
