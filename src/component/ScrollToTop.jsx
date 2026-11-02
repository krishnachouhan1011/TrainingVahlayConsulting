import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Toggle visibility based on scroll position
    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    // Smooth scroll to top
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    return (
        <div
            className={`fixed bottom-8 right-8 z-50 transition-all duration-500 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
                }`}
        >
            <button
                onClick={scrollToTop}
                className="p-3 bg-gray-900 text-white rounded-full shadow-xl hover:bg-red-600 transition-colors duration-300 border border-gray-700 hover:border-red-500 group cursor-pointer"
                aria-label="Scroll to top"
            >
                <ArrowUp size={20} className="group-hover:-translate-y-1 transition-transform duration-300" />
            </button>
        </div>
    );
};

export default ScrollToTop;