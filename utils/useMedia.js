import { useEffect, useState } from "react";

export function useViewport () {
    const [viewport, setViewport] = useState({
        width: 0,
        height: 0
    });

    useEffect(() => {
        function handleResize () {
            setViewport({
                width: window.innerWidth,
                height: window.innerHeight
            });
        }

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return viewport;
}

export function breakpoint$ (one, breakpoint, two, amount) {
    if (amount < breakpoint) return one;
    else return two;
}

export function useMedia () {
    const viewport = useViewport();
    
    function width (one, breakpoint, two) {
        return breakpoint$(one, breakpoint, two, viewport.width);
    }

    function height (one, breakpoint, two) {
        return breakpoint$(one, breakpoint, two, viewport.height);
    }

    return { width, height, viewport };
}

export default useMedia;