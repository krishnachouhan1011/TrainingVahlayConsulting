import { useState, useEffect } from 'react';

const useScrollToBottom = (ref, threshold = 20) => {
    const [isBottom, setIsBottom] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (!ref.current) return;

            const { scrollTop, scrollHeight, clientHeight } = ref.current;
            // Check if processed scroll is near bottom
            // We use a small threshold to account for fractional pixels or easy usability
            if (scrollTop + clientHeight >= scrollHeight - threshold) {
                setIsBottom(true);
            }
        };

        const checkScrollable = () => {
            if (ref.current) {
                const { scrollHeight, clientHeight } = ref.current;
                // If content fits without scrolling, consider it "bottom reached"
                if (scrollHeight <= clientHeight) {
                    setIsBottom(true);
                }
            }
        };

        const element = ref.current;
        if (element) {
            element.addEventListener('scroll', handleScroll);
            // Check initially and on resize
            window.addEventListener('resize', checkScrollable);
            checkScrollable(); // Initial check
        }

        return () => {
            if (element) {
                element.removeEventListener('scroll', handleScroll);
            }
            window.removeEventListener('resize', checkScrollable);
        };
    }, [ref, threshold]);

    return isBottom;
};

export default useScrollToBottom;
