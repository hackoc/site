import { useEffect } from "react";

export function useProtection (showWarning = true) {
   return useEffect(() => {
        window.onbeforeunload = () => showWarning;
    }, []);
}

export default useProtection;
