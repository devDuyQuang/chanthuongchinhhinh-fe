"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function FloatingPhone() {
    return (
        <div className="floating-phone" style={{
            position: 'fixed',
            bottom: '30px',
            left: '10px',
            width: '120px',
            zIndex: 998,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '5px',
        }}>
            <Link href="tel:0976158931" className="phone-btn" style={{
                width: '45px',
                height: '45px',
                backgroundColor: '#dc3545',
                color: 'white',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
                position: 'relative',
                textDecoration: 'none'
            }}>
                <i className="fas fa-phone-alt phone-icon" style={{ fontSize: '20px' }}></i>
            </Link>
            <div className="phone-label" style={{
                backgroundColor: '#dc3545',
                color: 'white',
                padding: '3px 10px',
                borderRadius: '20px',
                fontWeight: 'bold',
                fontSize: '13px',
                boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                whiteSpace: 'nowrap'
            }}>
                0976.158.931
            </div>

            <style>{`
                @keyframes phonePulse {
                    0% { box-shadow: 0 0 0 0 rgba(220, 53, 69, 0.7); }
                    70% { box-shadow: 0 0 0 20px rgba(220, 53, 69, 0); }
                    100% { box-shadow: 0 0 0 0 rgba(220, 53, 69, 0); }
                }
                @keyframes phoneRing {
                    0% { transform: rotate(0); }
                    10% { transform: rotate(15deg); }
                    20% { transform: rotate(-15deg); }
                    30% { transform: rotate(15deg); }
                    40% { transform: rotate(-15deg); }
                    50% { transform: rotate(0); }
                    100% { transform: rotate(0); }
                }
                .floating-phone {
                    opacity: 0.5;
                    transition: opacity 0.3s ease;
                }
                .floating-phone:hover {
                    opacity: 1;
                }
                .phone-btn {
                    animation: phonePulse 1.5s infinite;
                }
                .phone-icon {
                    animation: phoneRing 1.5s infinite;
                }
                @media (max-width: 767px) {
                    .floating-phone {
                        display: none !important;
                    }
                }
            `}</style>
        </div>
    );
}
