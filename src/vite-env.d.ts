/// <reference types="vite/client" />
import { Container as TSParticlesContainer } from "@tsparticles/engine";
import { IEmitterOptions } from "@tsparticles/plugin-emitters/types/types";
import { EmitterInstance } from "@tsparticles/plugin-emitters/types/EmitterInstance";

declare module "*.css";
declare module "*.png";
declare module "*.svg";
declare module "*.jpeg";
declare module "*.jpg";
declare module "*.module.css";
declare module "@tsparticles/engine";

interface ContainerWithPlugins extends TSParticlesContainer {
  addEmitter(
    options: IEmitterOptions,
    position: { x: number; y: number },
  ): Promise<EmitterInstance>;
  play(force?: boolean): Promise<void>;
}
