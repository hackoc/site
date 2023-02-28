import { useEffect } from "react";

export function useProtection () {
   return useEffect(() => {
        window.onbeforeunload = () => true;
    }, []);
}

export default useProtection;