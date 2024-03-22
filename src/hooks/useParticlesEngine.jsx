import { loadCanvasMaskPlugin } from "@tsparticles/plugin-canvas-mask";
import { loadEmittersPlugin } from "@tsparticles/plugin-emitters";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { useEffect, useMemo } from "react";
import { loadFull } from "tsparticles";

export function useParticlesEngine(onLoaded) {
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
      await loadEmittersPlugin(engine);
      await loadCanvasMaskPlugin(engine);
      if (onLoaded) onLoaded();
    });
  }, [onLoaded]);
}

export function useParticlesComponent(id, options, particlesLoaded) {
  return useMemo(() => {
    return (
      <Particles id={id} options={options} particlesLoaded={particlesLoaded} />
    );
  }, [id, particlesLoaded, options]);
}
