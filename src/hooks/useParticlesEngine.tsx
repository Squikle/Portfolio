import {loadCanvasMaskPlugin} from "@tsparticles/plugin-canvas-mask";
import {loadEmittersPlugin} from "@tsparticles/plugin-emitters";
import Particles, {initParticlesEngine} from "@tsparticles/react";
import {useEffect, useMemo} from "react";
import type {Container, ISourceOptions} from "@tsparticles/engine";
import {loadExternalBubbleInteraction} from "@tsparticles/interaction-external-bubble";
import {loadExternalConnectInteraction} from "@tsparticles/interaction-external-connect";
import {loadExternalGrabInteraction} from "@tsparticles/interaction-external-grab";
import {loadExternalTrailInteraction} from "@tsparticles/interaction-external-trail";
import {loadExternalAttractInteraction} from "@tsparticles/interaction-external-attract";
import {loadBaseMover} from "@tsparticles/move-base";
import {loadParallaxMover} from "@tsparticles/move-parallax";
import {loadParticlesLinksInteraction} from "@tsparticles/interaction-particles-links";
import {loadRotateUpdater} from "@tsparticles/updater-rotate";
import {loadSizeUpdater} from "@tsparticles/updater-size";
import {loadOpacityUpdater} from "@tsparticles/updater-opacity";
import {loadColorUpdater} from "@tsparticles/updater-color";
import {loadStrokeColorUpdater} from "@tsparticles/updater-stroke-color";
import {loadDestroyUpdater} from "@tsparticles/updater-destroy";
import {loadBasic} from "@tsparticles/basic";
import {loadTriangleShape} from "@tsparticles/shape-polygon";
import {loadEmittersShapeCircle} from "@tsparticles/plugin-emitters-shape-circle";
import {loadExternalRepulseInteraction} from "@tsparticles/interaction-external-repulse";

export function useParticlesEngine(onLoaded: () => void) {
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadEmittersPlugin(engine);
      await loadCanvasMaskPlugin(engine);
      await loadExternalBubbleInteraction(engine);
      await loadExternalConnectInteraction(engine);
      await loadExternalGrabInteraction(engine);
      await loadExternalTrailInteraction(engine);
      await loadExternalAttractInteraction(engine);
      await loadTriangleShape(engine);
      await loadBaseMover(engine);
      await loadParallaxMover(engine);
      await loadParticlesLinksInteraction(engine);
      await loadRotateUpdater(engine);
      await loadSizeUpdater(engine);
      await loadOpacityUpdater(engine);
      await loadColorUpdater(engine);
      await loadStrokeColorUpdater(engine);
      await loadDestroyUpdater(engine);
      await loadBasic(engine);
      await loadEmittersShapeCircle(engine);
      await loadExternalRepulseInteraction(engine);
    }).then(() => {
      if (onLoaded) onLoaded();
    });
  }, [onLoaded]);
}

export function useParticlesComponent(
  id: string,
  options: ISourceOptions,
  particlesLoaded: (container?: Container) => Promise<void>,
) {
  return useMemo(() => {
    return (
      <Particles id={id} options={options} particlesLoaded={particlesLoaded}/>
    );
  }, [id, particlesLoaded, options]);
}
