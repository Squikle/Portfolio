import {useParticlesComponent} from "../../hooks/useParticlesEngine";
import emittersOptions from "./emitters.json";
import {useCallback, useEffect, useState} from "react";
import {Container, ISourceOptions} from "@tsparticles/engine";
import {adaptEmitter} from "./retinaAdapter";
// @ts-ignore
import {IEmitterOptions} from "@tsparticles/plugin-emitters/types/types";
import {ImageData} from "@/pages/LogoPage/components/Logo/types.ts";
import {EmitterContainer} from "@tsparticles/plugin-emitters";

type position = {
  x: number;
  y: number;
};

const initImgSize = {width: 2750, height: 2052};
const sEmitterPosition: position = {x: 425, y: 1205};
const kEmitterPosition: position = {x: 2435, y: 612};

type Props = {
  isActive: boolean;
  imgData: ImageData;
  id: string;
  options: ISourceOptions;
  onLoaded?: () => void;
};

export default function LogoEmitters({
  isActive,
  imgData,
  id,
  options,
  onLoaded,
}: Props) {
  const [container, setContainer] = useState<EmitterContainer | null>(null);

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
      setContainer(container as EmitterContainer);
      if (onLoaded) onLoaded();
    },
    [onLoaded],
  );

  useEffect(() => {
    const updateEmitters = async () => {
      if (!container?.addEmitter || !container.plugins) return;

      if (!imgData) throw new Error("Image data must be provided!");

      const addEmitter = async (emitter: IEmitterOptions, defPos: position) => {
        return await container.addEmitter(emitter, {
          x:
            ((defPos.x / initImgSize.width) * imgData.width + imgData.left) *
            window.devicePixelRatio,
          y:
            ((defPos.y / initImgSize.height) * imgData.height + imgData.top) *
            window.devicePixelRatio,
        });
      };

      const sEmitter = adaptEmitter(emittersOptions["s-emitter"]);
      const kEmitter = adaptEmitter(emittersOptions["k-emitter"]);
      container.removeEmitter(sEmitter.name);
      container.removeEmitter(kEmitter.name);
      await addEmitter(sEmitter, sEmitterPosition);
      await addEmitter(kEmitter, kEmitterPosition);
    };

    updateEmitters();
  }, [imgData, container]);

  return useParticlesComponent(id, options, handleParticlesLoaded);
}
