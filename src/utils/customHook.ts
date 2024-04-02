import { useState, useEffect } from 'react';
import WaveSurfer, { WaveSurferOptions } from "wavesurfer.js";

export const useHasMounted = () => {
    const [hasMounted, setHasMounted] = useState<boolean>(false);
    useEffect(() => {
        setHasMounted(true);
    }, []);

    return hasMounted;
}

export const useScript = (url: string) => {
    useEffect(() => {
        const script = document.createElement('script');

        script.src = url;
        script.async = true;

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        }
    }, [url]);
};


export const useWavesurfer = (
    containerRef: React.RefObject<HTMLDivElement>,
    options: Omit<WaveSurferOptions, "container">
) => {
    const [waveserfer, setWaveserfer] = useState<any>(null);

    useEffect(() => {
        if (!containerRef.current) {
            return;
        }
        const ws = WaveSurfer.create({
            ...options,
            container: containerRef.current,
        });

        setWaveserfer(ws);

        return () => {
            ws.destroy();
        };
    }, [options, containerRef]);
    return waveserfer;
};