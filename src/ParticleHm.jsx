import Particles, { initParticlesEngine } from "@tsparticles/react";
import particlesOptions from "./particles.json";
import { useEffect, useState } from "react";
import { loadFull } from "tsparticles";
import { loadPolygonMaskPlugin } from "@tsparticles/plugin-polygon-mask";
import { loadCanvasMaskPlugin } from "@tsparticles/plugin-canvas-mask";
import usePrevious from "./hooks/usePrevious";

export default function ParticleHm({ width, height }) {
  const [init, setInit] = useState(false);
  const previousSize = usePrevious({ width, height });
  const [container, setContainer] = useState(null);

  useEffect(() => {
    if (init) {
      return;
    }

    initParticlesEngine(async (engine) => {
      await loadFull(engine);
      await loadPolygonMaskPlugin(engine);
      await loadCanvasMaskPlugin(engine);
    }).then(() => {
      setInit(true);
    });
  }, [init]);

  const particlesLoaded = (container) => {
    container._eventListeners = {
      removeListeners: () => true,
      addListeners: () => true,
    };
    console.log(container._eventListeners);
    container.canvas.resize = updateSize;
    Object.getPrototypeOf(container.canvas).resize = updateSize;
    setContainer((c) => c || container);
  };

  const calculateNewImageSize = (
    previousImageSize,
    newImageSize,
    previousCanvasSize
  ) => {
    return (newImageSize * previousCanvasSize) / previousImageSize;
  };

  const updateSize = () => {
    console.log("happening");
    if (!container || !previousSize.width || !previousSize.height) return false;

    const newSize = {
      width: calculateNewImageSize(
        previousSize.width,
        width,
        container.canvas.element.width
      ),
      height: calculateNewImageSize(
        previousSize.height,
        height,
        container.canvas.element.height
      ),
    };

    const size = container.canvas.size;
    if (
      newSize.height === size.height &&
      newSize.width === size.width &&
      newSize.height === container.canvas.element.height &&
      newSize.width === container.canvas.element.width
    ) {
      return false;
    }

    const oldSize = { ...size };

    container.canvas.element.width = size.width = newSize.width;
    container.canvas.element.height = size.height = newSize.height;

    if (container.started) {
      container.canvas.container.particles.setResizeFactor({
        width: size.width / oldSize.width,
        height: size.height / oldSize.height,
      });
    }

    return true;
  };

  return (
    <div>
      <Particles
        id="tsparticles"
        options={particlesOptions}
        particlesLoaded={particlesLoaded}
      />
    </div>
  );
}
