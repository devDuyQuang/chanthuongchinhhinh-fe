"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function FloatingPhone() {
    return (
        <div className="floating-phone" style={{
            position: 'fixed',
            bottom: '30px',
            left: '30px',
            zIndex: 998,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px',
        }}>
            <Link href="tel:0976158931" className="phone-btn" style={{
                width: '60px',
                height: '60px',
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
                <i className="fas fa-phone-alt phone-icon" style={{ fontSize: '26px' }}></i>
            </Link>
            <div style={{
                backgroundColor: '#dc3545',
                color: 'white',
                padding: '5px 12px',
                borderRadius: '20px',
                fontWeight: 'bold',
                fontSize: '15px',
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
                .phone-btn {
                    animation: phonePulse 1.5s infinite;
                }
                .phone-icon {
                    animation: phoneRing 1.5s infinite;
                }
            `}</style>
        </div>
    );
}
