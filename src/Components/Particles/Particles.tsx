import { useCallback, useEffect, useState } from "react";
import { useParticlesComponent } from "../../hooks/useParticlesEngine.js";
import { Container, ISourceOptions } from "@tsparticles/engine";

type Props = {
  isActive: boolean;
  id: string;
  options: ISourceOptions;
  onLoaded?: () => void;
};

export default function Particles({ isActive, id, options, onLoaded }: Props) {
  const [container, setContainer] = useState<Container | null>(null);

  useEffect(() => {
    if (!container) return;

    if (isActive) {
      container.play();
    } else {
      container.pause();
    }
  }, [isActive, container]);

  const handleParticlesLoaded = useCallback(
    (container?: Container) => {
      setContainer(container as Container);
      if (onLoaded) onLoaded();
      return Promise.resolve();
    },
    [onLoaded],
  );

  return useParticlesComponent(id, options, handleParticlesLoaded);
}
