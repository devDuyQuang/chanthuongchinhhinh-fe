"use client";

import { useState } from "react";
import Link from "next/link";
import SearchModal from "./SearchModal";
import AppointmentModal from "@/component/AppointmentModal";

export default function FloatingButtons() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);

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
                
                .mobile-bottom-nav {
                    display: none;
                }

                @media (max-width: 767px) {
                    .floating-buttons-container {
                        display: none !important;
                    }
                    .mobile-bottom-nav {
                        display: flex;
                        justify-content: space-around;
                        align-items: center;
                        position: fixed;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        background-color: #0d1427; /* Dark theme matching the image */
                        padding: 10px 0 15px; /* Extra padding bottom for safe area */
                        z-index: 9999;
                        box-shadow: 0 -2px 10px rgba(0,0,0,0.2);
                        border-top: 1px solid rgba(255,255,255,0.05);
                    }
                    .mobile-bottom-nav .nav-item {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        color: #8c92a4; /* Gray color for inactive */
                        text-decoration: none;
                        font-size: 11px;
                        gap: 6px;
                        border: none;
                        background: transparent;
                        padding: 0;
                        width: 25%;
                    }
                    .mobile-bottom-nav .nav-item i {
                        font-size: 22px;
                        transition: color 0.3s ease;
                    }
                    .mobile-bottom-nav .nav-item.active i,
                    .mobile-bottom-nav .nav-item.active span {
                        color: #ff4d4d; /* Red color like the 'Trang chủ' in the image */
                    }
                    .mobile-bottom-nav .nav-item:active i,
                    .mobile-bottom-nav .nav-item:active span {
                        color: #ff4d4d;
                    }
                    
                    /* Adjust body padding so content isn't hidden behind the nav bar */
                    body {
                        padding-bottom: 70px !important;
                    }
                    
                    /* Adjust floating TOC button to be higher on mobile */
                    .floating-toc-btn {
                        bottom: 90px !important;
                    }
                }
                `}
            </style>

            {/* Desktop Floating Buttons */}
            <div className="floating-buttons-container d-none d-md-flex" style={{
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

            {/* Mobile Bottom Navigation Bar */}
            <div className="mobile-bottom-nav">
                <Link href="tel:0846555367" className="nav-item active">
                    <i className="feather icon-phone-call"></i>
                    <span>Gọi Ngay</span>
                </Link>
                <button onClick={() => setIsAppointmentOpen(true)} className="nav-item">
                    <i className="feather icon-calendar"></i>
                    <span>Đặt Lịch</span>
                </button>
                <Link href="https://zalo.me/0982891044" target="_blank" rel="nofollow noopener noreferrer" className="nav-item">
                    <i className="feather icon-message-circle"></i>
                    <span>Zalo</span>
                </Link>
                <Link href="https://www.facebook.com/profile.php?id=61585978932447" target="_blank" rel="nofollow noopener noreferrer" className="nav-item">
                    <i className="feather icon-facebook"></i>
                    <span>Facebook</span>
                </Link>
            </div>

            <SearchModal show={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
            <AppointmentModal show={isAppointmentOpen} onClose={() => setIsAppointmentOpen(false)} />
        </>
    );
}
