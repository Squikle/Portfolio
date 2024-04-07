import { useState } from "react";
import Logo from "../Components/Logo/Logo";
import { ImageData, OnImageUpdate } from "../Components/Logo/types";
import { useCurrentPageContext } from "../Components/Page/CurrentPageContext/useContexts";
import LogoEmitters from "../Components/Particles/LogoEmitters.tsx";
import Particles from "../Components/Particles/Particles";
import { ParticlesOptions } from "../Pages/LogoPage/LogoPage";
import styles from "../Pages/LogoPage/LogoPage.module.scss";
import { BackgroundControl } from "../Components/Page/Page.tsx";
import classNames from "classnames";

export default function (
  particlesLoaded: boolean,
  onImageLoaded: OnImageUpdate,
  onImageResize: OnImageUpdate,
  particlesOptions: ParticlesOptions,
  imageData: ImageData,
) {
  const [opacity, setOpacity] = useState<number | null>(null);
  const [className, setClassName] = useState<classNames.ArgumentArray | null>(
    null,
  );

  const element = (
    <div
      style={{
        opacity: opacity!,
      }}
      className={classNames(className, styles.background)}
    >
      {particlesLoaded && (
        <FixedParticles options={particlesOptions} imageData={imageData} />
      )}
      <Logo onLoad={onImageLoaded} onImageResize={onImageResize}></Logo>
    </div>
  );

  const control: BackgroundControl = {
    setOpacity,
    setClassName,
  };
  return {
    element,
    control,
  };
}

const FixedParticles = ({
  options,
  imageData,
}: {
  options: ParticlesOptions;
  imageData: ImageData;
}) => {
  const isActive = useCurrentPageContext().isActive;
  return (
    <div className={styles.particlesContainer}>
      <LogoEmitters
        id="emitters-particles"
        options={options.emitters}
        imgData={imageData}
        isActive={isActive}
      />
      <Particles
        id="canvas-particles"
        options={options.canvas}
        isActive={isActive}
      />
    </div>
  );
};