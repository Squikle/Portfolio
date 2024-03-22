import { useCallback, useState } from "react";
import { useParticlesComponent } from "../hooks/useParticlesEngine";

export default function Particles({ id, options, onLoaded }) {
  const [container, setContainer] = useState(null);

  const handleParticlesLoaded = useCallback(
    (container) => {
      setContainer(container);
      if (onLoaded) onLoaded();
    },
    [onLoaded]
  );

  const particles = useParticlesComponent(id, options, handleParticlesLoaded);
  return particles;
}
