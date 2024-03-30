import { useParticlesComponent } from "../../hooks/useParticlesEngine";
import emittersOptions from "./emitters.json";

type position = {
  x: number;
  y: number;
};

const initImgSize = { width: 2750, height: 2052 };
const sEmitterPosition: position = { x: 425, y: 1205 };
const kEmitterPosition: position = { x: 2435, y: 612 };

import { useCallback, useEffect, useState } from "react";
import { Container, ISourceOptions } from "@tsparticles/engine";
import { adaptEmitter } from "./retinaAdapter.js";
import { ContainerWithPlugins } from "../../vite-env";
import { IEmitterOptions } from "@tsparticles/plugin-emitters/types/types";
import { ImageData } from "../Logo/types.ts";

type Props = {
  isActive: boolean;
  imgData: ImageData;
  id: string;
  options: ISourceOptions;
  onLoaded?: () => void;
};

export default function Emitters({
  isActive,
  imgData,
  id,
  options,
  onLoaded,
}: Props) {
  const [container, setContainer] = useState<ContainerWithPlugins | null>(null);
  const handleParticlesLoaded = useCallback(
    async (container?: Container) => {
      setContainer(container as ContainerWithPlugins);
      if (onLoaded) onLoaded();
    },
    [onLoaded],
  );

  useEffect(() => {
    const updateEmitters = async () => {
      console.log("updateEmitters", isActive, imgData);
      if (!isActive || !container?.addEmitter) return;

      if (!imgData) throw new Error("Image data must be provided!");

      const addEmitter = async (emitter: IEmitterOptions, defPos: position) => {
        const pushedEmitter = await container.addEmitter(emitter, {
          x:
            ((defPos.x / initImgSize.width) * imgData.width + imgData.left) *
            window.devicePixelRatio,
          y:
            ((defPos.y / initImgSize.height) * imgData.height + imgData.top) *
            window.devicePixelRatio,
        });
        pushedEmitter.play();
      };

      const sEmitter = adaptEmitter(emittersOptions["s-emitter"], {
        ...imgData,
      });
      const kEmitter = adaptEmitter(emittersOptions["k-emitter"], {
        ...imgData,
      });
      await addEmitter(sEmitter, sEmitterPosition);
      await addEmitter(kEmitter, kEmitterPosition);
    };

    updateEmitters();
  }, [imgData, isActive, container]);

  useEffect(() => {
    console.log(
      "isActive changed: ",
      isActive,
      "container set: ",
      container !== null,
    );
    if (!container) return;

    if (isActive) container.play();
    else container.pause();
  }, [isActive]);

  return useParticlesComponent(id, options, handleParticlesLoaded);
}
