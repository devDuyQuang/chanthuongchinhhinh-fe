"use client";

import { useState } from "react";
import Link from "next/link";
import SearchModal from "./SearchModal";

export default function FloatingButtons() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    return (
        <>
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
                    className="btn btn-primary shadow d-flex align-items-center justify-content-center"
                    style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        padding: 0,
                        border: 'none',
                        backgroundColor: '#fff',
                        color: 'var(--bs-primary)',
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
