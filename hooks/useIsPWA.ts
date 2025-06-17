import { useEffect, useState } from 'react';

declare global {
    interface Navigator {
        standalone?: boolean;
    }
}

export function useIsPWA() {
    const [isPWA, setIsPWA] = useState(false);

    useEffect(() => {
        const isStandalone =
            window.matchMedia('(display-mode: standalone)').matches ||
            window.navigator.standalone === true ||
            document.referrer.startsWith('android-app://');

        setIsPWA(isStandalone);
    }, []);

    return isPWA;
}