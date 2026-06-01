"use client"
import { useEffect, useState } from "react";

function ScrolltoTop() {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    useEffect(() => {
        const handleScroll = (): void => {
            setIsVisible(window.scrollY > 500);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToTop = (): void => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <button 
            onClick={scrollToTop} 
            className={`scroltop ${isVisible ? 'show' : ''}`}
            style={{ 
                width: '40px', 
                height: '40px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                opacity: 0.7,
                transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.7'; }}
        >
            <i className="fas fa-arrow-up" />
        </button>
    );
}

export default ScrolltoTop;