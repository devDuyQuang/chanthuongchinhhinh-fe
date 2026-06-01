"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type TOCItem = {
    id: string;
    text: string;
    level: number;
};

export default function FloatingTOC({ toc }: { toc: TOCItem[] }) {
    const [isVisible, setIsVisible] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 600) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
                setIsOpen(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    if (!toc || toc.length === 0) return null;

    return (
        <>
            {/* Floating Button */}
            <div
                className={`floating-toc-btn ${isVisible ? "show" : ""}`}
                style={{
                    position: "fixed",
                    bottom: "120px",
                    left: "10px",
                    width: "120px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    zIndex: 998,
                    opacity: isVisible ? 1 : 0,
                    pointerEvents: isVisible ? "auto" : "none",
                    transition: "all 0.3s ease",
                }}
            >
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="btn btn-primary shadow d-flex align-items-center justify-content-center"
                    style={{
                        width: "45px",
                        height: "45px",
                        borderRadius: "50%",
                        padding: 0,
                        border: "none",
                        backgroundColor: "var(--bs-primary)",
                        color: "white",
                        boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
                    }}
                >
                    <i className="fas fa-list-ul" style={{ fontSize: "20px" }}></i>
                </button>

                {/* Floating Menu Popup */}
                {isOpen && (
                    <div
                        className="toc-popup shadow"
                        style={{
                            position: "absolute",
                            bottom: "55px",
                            left: "10px",
                            backgroundColor: "white",
                            borderRadius: "10px",
                            padding: "15px",
                            width: "max-content",
                            maxWidth: "280px",
                            maxHeight: "350px",
                            overflowY: "auto",
                            boxShadow: "0 5px 25px rgba(0,0,0,0.15)",
                        }}
                    >
                        <h6 className="mb-3" style={{ fontWeight: "bold", borderBottom: "1px solid #eee", paddingBottom: "10px" }}>Mục lục</h6>
                        <ul className="list-unstyled mb-0 custom-scrollbar">
                            {toc.map((item, index) => (
                                <li key={index} className="mb-2" style={{ paddingLeft: `${(item.level - 2) * 15}px` }}>
                                    <Link
                                        href={`#${item.id}`}
                                        className="text-body"
                                        style={{ fontSize: "13px", textDecoration: "none", display: "block" }}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <i className="feather icon-chevron-right me-2" style={{ fontSize: "10px", color: "var(--bs-primary)" }}></i>
                                        {item.text}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #f1f1f1;
                    border-radius: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #c1c1c1;
                    border-radius: 4px;
                }
            `}</style>
        </>
    );
}
