import { useParticlesComponent } from "../../hooks/useParticlesEngine";
import emittersOptions from "./emitters.json";

const initialImageSize = { width: 2750, height: 2052 };
const sEmitterPosition = { x: 425, y: 1205 };
const kEmitterPosition = { x: 2435, y: 612 };

import { useCallback, useEffect, useState } from "react";
import { Container, ISourceOptions } from "@tsparticles/engine";
import { adaptEmitter } from "./retinaAdapter.js";
import { ContainerWithPlugins } from "../../vite-env";
import { ImageData } from "../../types/imageData";

type Props = {
  isActive: boolean;
  imageData: ImageData;
  id: string;
  options: ISourceOptions;
  onLoaded?: () => void;
};

export default function Emitters({
  isActive,
  imageData,
  id,
  options,
  onLoaded,
}: Props) {
  const [container, setContainer] = useState<Container | undefined | null>(
    null,
  );

  const handleParticlesLoaded = useCallback(
    (container?: Container) => {
      console.log("loaded");
      setContainer(container);
      if (onLoaded) onLoaded();
      return Promise.resolve();
    },
    [onLoaded],
  );

  useEffect(() => {
    if (!container) return;

    if (isActive) {
      container.play();
    } else {
      container.pause();
    }
  }, [isActive, container]);

  useEffect(() => {
    const update = async () => {
      const containerWithEmitters = container as ContainerWithPlugins;
      if (!containerWithEmitters || !containerWithEmitters.addEmitter) return;
      const imageSize = { width: imageData.width, height: imageData.height };
      const imagePosition = { left: imageData.left, top: imageData.top };
      const sEmitter = adaptEmitter(emittersOptions["s-emitter"], imageSize);
      await containerWithEmitters.addEmitter(sEmitter, {
        x:
          ((sEmitterPosition.x / initialImageSize.width) * imageSize.width +
            imagePosition.left) *
          window.devicePixelRatio,
        y:
          ((sEmitterPosition.y / initialImageSize.height) * imageSize.height +
            imagePosition.top) *
          window.devicePixelRatio,
      });
      const kEmitter = adaptEmitter(emittersOptions["k-emitter"], imageSize);
      await containerWithEmitters.addEmitter(kEmitter, {
        x:
          ((kEmitterPosition.x / initialImageSize.width) * imageSize.width +
            imagePosition.left) *
          window.devicePixelRatio,
        y:
          ((kEmitterPosition.y / initialImageSize.height) * imageSize.height +
            imagePosition.top) *
          window.devicePixelRatio,
      });
    };

    update();
  }, [container, imageData]);

  return useParticlesComponent(id, options, handleParticlesLoaded);
}
