import { useEffect } from "react";

// view https://www.youtube.com/watch?v=pZwvrxVavnQ for additional context, consent before exiting is important – my esteemed colleague mr. ned p.
export function useProtection (showWarning = true) {
   return useEffect(() => {
        window.onbeforeunload = () => showWarning;
    }, []);
}

export default useProtection;
