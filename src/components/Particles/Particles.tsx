import {useCallback, useEffect, useState} from "react";
import {useParticlesComponent} from "../../hooks/useParticlesEngine.js";
import {Container, ISourceOptions} from "@tsparticles/engine";

type Props = {
    isActive: boolean;
    id: string;
    options: ISourceOptions;
    onLoaded?: () => void;
};

export default function Particles({isActive, id, options, onLoaded}: Props) {
    const [container, setContainer] = useState<Container | null>(null);

    useEffect(() => {
        if (!container) return;

        if (isActive) container.play();
        else container?.pause();
    }, [isActive]);

    useEffect(() => {
        if (!container) return;

        if (isActive) container?.play();
        else container?.pause();
    }, [container]);

    const handleParticlesLoaded = useCallback(
        async (container?: Container) => {
            setContainer(container!);
            if (onLoaded) onLoaded();
        },
        [onLoaded],
    );

    return useParticlesComponent(id, options, handleParticlesLoaded);
}
