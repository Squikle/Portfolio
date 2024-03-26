/// <reference types="vite/client" />
import { Container as TSParticlesContainer } from "@tsparticles/engine";

declare module "*.css";
declare module "*.png";
declare module "*.svg";
declare module "*.jpeg";
declare module "*.jpg";
declare module "*.module.css";
declare module "@tsparticles/engine";

interface ContainerWithPlugins extends TSParticlesContainer {
  addEmitter(emitter: any, position: { x: number; y: number }): Promise<void>;
  play(): Promise<void>;
}
