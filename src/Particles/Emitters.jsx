import { useParticlesComponent } from "../hooks/useParticlesEngine";
import { adaptEmitter } from "../retinaAdapter";
import emittersOptions from "./emitters.json";

const initialImageSize = { width: 2750, height: 2052 };
const sEmitterPosition = { x: 425, y: 1205 };
const kEmitterPosition = { x: 2435, y: 612 };

import { useCallback, useEffect, useState } from "react";

export default function Emitters({ imageData, id, options, onLoaded }) {
  const [container, setContainer] = useState(null);

  const handleParticlesLoaded = useCallback(
    (container) => {
      console.log("loaded");
      setContainer(container);
      if (onLoaded) onLoaded();
    },
    [onLoaded]
  );

  useEffect(() => {
    const update = async () => {
      if (!container || !container.addEmitter) return;
      await container.refresh();
      const imageSize = { width: imageData.width, height: imageData.height };
      const imagePosition = { left: imageData.left, top: imageData.top };
      const sEmitter = adaptEmitter(emittersOptions["s-emitter"], imageSize);
      await container.addEmitter(sEmitter, {
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
      await container.addEmitter(kEmitter, {
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

  const particles = useParticlesComponent(id, options, handleParticlesLoaded);
  return particles;
}
