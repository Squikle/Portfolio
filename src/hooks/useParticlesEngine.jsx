import { loadCanvasMaskPlugin } from "@tsparticles/plugin-canvas-mask";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { useCallback, useEffect, useMemo } from "react";
import { loadFull } from "tsparticles";

export function useParticlesEngine(id, options, onInit, onLoaded) {
  const init = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  return useParticlesEngineBase(id, options, onInit, onLoaded, init);
}

export function useParticlesEngineWithCanvas(id, options, onInit, onLoaded) {
  const init = useCallback(async (engine) => {
    await loadFull(engine);
    await loadCanvasMaskPlugin(engine);
  }, []);

  return useParticlesEngineBase(id, options, onInit, onLoaded, init);
}

function useParticlesEngineBase(id, options, onInit, onLoaded, init) {
  useEffect(() => {
    const sync = async () => {
      await initParticlesEngine(async (engine) => {
        await init(engine);
        if (onInit) onInit();
      });
    };

    sync();
  }, [id, init, onInit, onLoaded, options]);

  const particles = useMemo(() => {
    return <Particles id={id} options={options} particlesLoaded={onLoaded} />;
  }, [onLoaded, options, id]);

  return particles;
}
