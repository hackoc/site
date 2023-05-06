import { useState } from "react";

export function useDeviceId () {
    const [deviceId, setDeviceId] = useState(null);

    useEffect(() => {
        if (localStorage.getItem('deviceId')) {
            setDeviceId(localStorage.getItem('deviceId'));
        } else {
            const newDeviceId = Math.random().toString(36).substr(2, 9);
            localStorage.setItem('deviceId', newDeviceId);
            setDeviceId(newDeviceId);
        }
    }, []);

    const loading = deviceId === null;

    const waitForDeviceId = () => new Promise((resolve, reject) => {
        if (deviceId) resolve(deviceId);
        else {
            const interval = setInterval(() => {
                if (deviceId) {
                    clearInterval(interval);
                    resolve(deviceId);
                }
            }, 100);
        }
    });

    return [deviceId, waitForDeviceId, loading];
}