import { useParticlesComponent } from "../../hooks/useParticlesEngine";
import { useCallback, useEffect, useState } from "react";
import { Container, ISourceOptions } from "@tsparticles/engine";
import { EmitterContainer } from "@tsparticles/plugin-emitters";
// @ts-ignore
import { IEmitter } from "@tsparticles/plugin-emitters/types/Options/Interfaces/IEmitter";

type Props = {
  isActive: boolean;
  id: string;
  options: ISourceOptions;
  onLoaded?: () => void;
  emitters: IEmitter[];
};

export default function Emitters({
  isActive,
  id,
  options,
  onLoaded,
  emitters,
}: Props) {
  const [container, setContainer] = useState<EmitterContainer | null>(null);

  useEffect(() => {
    if (!container) return;

    if (isActive) container.play();
    else container?.pause();
  }, [isActive]);

  useEffect(() => {
    if (!container) return;

    const updateEmitters = async () => {
      if (!container?.addEmitter || !container.plugins) return;

      for (const emitter of emitters) {
        container.removeEmitter(emitter.name);
        await container.addEmitter(emitter);
      }
    };

    updateEmitters().then(() => {
      if (isActive) container?.play();
      else container?.pause();
    });
  }, [container]);

  const handleParticlesLoaded = useCallback(
    async (container?: Container) => {
      setContainer(container as EmitterContainer);
      if (onLoaded) onLoaded();
    },
    [onLoaded],
  );

  return useParticlesComponent(id, options, handleParticlesLoaded);
}
