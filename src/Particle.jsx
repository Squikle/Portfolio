import Particles, { initParticlesEngine } from "@tsparticles/react";
import particlesOptions from "./particles.json";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { loadFull } from "tsparticles";
import { loadPolygonMaskPlugin } from "@tsparticles/plugin-polygon-mask";
import { loadCanvasMaskPlugin } from "@tsparticles/plugin-canvas-mask";

export default function Particle() {
  const containerRef = useRef(null);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
      await loadPolygonMaskPlugin(engine);
      await loadCanvasMaskPlugin(engine);
    });
  }, []);

  const loaded = useCallback((instanceContainer) => {
    containerRef.current = instanceContainer;
  }, []);

  const particles = useMemo(() => {
    console.log("new memo");
    return (
      <Particles
        id="tsparticles"
        options={particlesOptions}
        particlesLoaded={loaded}
      />
    );
  }, [loaded]);

  return particles;
}
