import { useCallback, useEffect, useRef } from "react";
import { useParticlesComponent } from "../../hooks/useParticlesEngine.js";
import { Container, ISourceOptions } from "@tsparticles/engine";

type Props = {
  isActive: boolean;
  id: string;
  options: ISourceOptions;
  onLoaded?: () => void;
};

export default function Particles({ isActive, id, options, onLoaded }: Props) {
  const containerRef = useRef<Container | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    if (isActive) containerRef.current.play();
    else containerRef.current.pause();
  }, [isActive, containerRef]);

  const handleParticlesLoaded = useCallback(
    async (container?: Container) => {
      containerRef.current = container!;
      if (onLoaded) onLoaded();
      if (isActive) container?.play();
    },
    [onLoaded, isActive],
  );

  return useParticlesComponent(id, options, handleParticlesLoaded);
}
