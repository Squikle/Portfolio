import { loadCanvasMaskPlugin } from "@tsparticles/plugin-canvas-mask";
import { loadEmittersPlugin } from "@tsparticles/plugin-emitters";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { useEffect, useMemo } from "react";
import { loadFull } from "tsparticles";
import type { Container, ISourceOptions } from "@tsparticles/engine";
import { ContainerWithPlugins } from "../vite-env";

export function useParticlesEngine(onLoaded: () => void) {
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadEmittersPlugin(engine);
      await loadCanvasMaskPlugin(engine);
      await loadFull(engine);
    }).then(() => {
      if (onLoaded) onLoaded();
    });
  }, [onLoaded]);
}

export function useParticlesComponent(
  id: string,
  options: ISourceOptions,
  particlesLoaded: (
    container?: ContainerWithPlugins | Container,
  ) => Promise<void>,
) {
  return useMemo(() => {
    return (
      <Particles id={id} options={options} particlesLoaded={particlesLoaded} />
    );
  }, [id, particlesLoaded, options]);
}
