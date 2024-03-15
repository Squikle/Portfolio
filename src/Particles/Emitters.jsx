import emittersOptions from "./emitters.json";

const initialImageSize = { width: 2750, height: 2052 };
const sEmitterPosition = { x: 425, y: 1205 };
const kEmitterPosition = { x: 2435, y: 612 };

import { useCallback, useEffect, useState } from "react";
import { useParticlesEngine } from "../hooks/useParticlesEngine";

export default function Emitters({
  imageSize,
  imagePosition,
  id,
  options,
  onLoad,
}) {
  const [container, setContainer] = useState();
  const [particlesLoaded, setParticlesLoaded] = useState(false);

  const onInit = useCallback(() => {
    setParticlesLoaded(true);
    if (onLoad) onLoad();
  }, [onLoad]);

  const onLoaded = useCallback((instanceContainer) => {
    setContainer(instanceContainer);
  }, []);

  const setEmitters = useCallback(async () => {
    const emitters = container?.plugins?.get("emitters")?.container;
    if (!emitters || !particlesLoaded) return;
    await emitters.refresh();

    const sEmitter = emittersOptions["s-emitter"];
    await emitters.addEmitter(sEmitter, {
      x:
        ((sEmitterPosition.x / initialImageSize.width) * imageSize.width +
          imagePosition.left) *
        window.devicePixelRatio,
      y:
        ((sEmitterPosition.y / initialImageSize.height) * imageSize.height +
          imagePosition.top) *
        window.devicePixelRatio,
    });

    const kEmitter = emittersOptions["k-emitter"];
    await emitters.addEmitter(kEmitter, {
      x:
        ((kEmitterPosition.x / initialImageSize.width) * imageSize.width +
          imagePosition.left) *
        window.devicePixelRatio,
      y:
        ((kEmitterPosition.y / initialImageSize.height) * imageSize.height +
          imagePosition.top) *
        window.devicePixelRatio,
    });
  }, [container, imagePosition, imageSize, particlesLoaded]);

  useEffect(() => {
    const update = async () => {
      await setEmitters();
    };
    update();
  }, [container, setEmitters]);

  const particles = useParticlesEngine(id, options, onInit, onLoaded);

  return particlesLoaded ? particles : null;
}
