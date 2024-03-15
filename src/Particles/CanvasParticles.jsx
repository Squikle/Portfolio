import { useCallback, useState } from "react";
import {
  useParticlesEngine,
  useParticlesEngineWithCanvas,
} from "../hooks/useParticlesEngine";

export default function Particles({ id, options, onLoaded }) {
  const [container, setContainer] = useState();
  const [particlesLoaded, setParticlesLoaded] = useState(false);

  const onInit = useCallback(() => {
    setParticlesLoaded(true);
    if (onLoaded) onLoaded();
  }, [onLoaded]);

  const onEngineLoaded = useCallback(
    (instanceContainer) => {
      setContainer(instanceContainer);
      if (onLoaded) onLoaded();
    },
    [onLoaded]
  );

  const particles = useParticlesEngineWithCanvas(
    id,
    options,
    onInit,
    onEngineLoaded
  );

  return particlesLoaded ? particles : null;
}
