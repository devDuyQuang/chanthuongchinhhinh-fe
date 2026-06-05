"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function SidebarMenuParent({ parent, slug, isActive }: { parent: any, slug: string, isActive: boolean }) {
    const [isOpen, setIsOpen] = useState(isActive);

    // Update isOpen if isActive changes (e.g., from navigation)
    useEffect(() => {
        if (isActive) {
            setIsOpen(true);
        }
    }, [isActive]);

    return (
        <li className={isActive ? 'active' : ''}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <Link
                    href={`/dich-vu/${parent.slug}`}
                    className={isActive ? 'active' : ''}
                    style={isActive ? {
                        color: 'var(--bs-primary)',
                        fontWeight: 700,
                        backgroundColor: 'transparent',
                        flexGrow: 1,
                        display: 'block'
                    } : {
                        backgroundColor: 'transparent',
                        flexGrow: 1,
                        display: 'block'
                    }}
                >
                    <span>{parent.name}</span>
                </Link>
                {parent.children && parent.children.length > 0 ? (
                    <i 
                        className={`feather ${isOpen ? 'icon-chevron-down' : 'icon-chevron-down'}`} 
                        style={{ 
                            fontSize: '18px', 
                            color: isActive ? 'var(--bs-primary)' : 'inherit', 
                            cursor: 'pointer',
                            padding: '5px 0 5px 15px'
                        }}
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setIsOpen(!isOpen);
                        }}
                    ></i>
                ) : isActive && (
                    <i className="feather icon-arrow-right" style={{ fontSize: '18px', color: 'var(--bs-primary)' }}></i>
                )}
            </div>
            {parent.children && parent.children.length > 0 && isOpen && (
                <ul className="sub-menu">
                    {parent.children.map((child: { name: string; slug: string }, j: number) => {
                        const isChildActive = child.slug === slug;
                        return (
                            <li key={j} className={isChildActive ? 'active' : ''}>
                                <Link
                                    href={`/dich-vu/${child.slug}`}
                                    className={isChildActive ? 'active' : ''}
                                    style={isChildActive ? {
                                        color: 'var(--bs-primary)',
                                        fontWeight: 700,
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        backgroundColor: 'transparent'
                                    } : {
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        backgroundColor: 'transparent'
                                    }}
                                >
                                    <span>+ {child.name}</span>
                                    {isChildActive && <i className="feather icon-arrow-right" style={{ fontSize: '18px', color: 'var(--bs-primary)' }}></i>}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            )}
        </li>
    );
}
