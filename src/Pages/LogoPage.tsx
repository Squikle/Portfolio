import PageSection from "../Components/Page/PageSection";
import InfoCard from "../Components/TextCard/InfoCard";
import Page from "../Components/Page/Page";
import Logo from "../Components/Logo/Logo";
import Particles from "../Components/Particles/Particles";
import { useCallback, useRef, useState } from "react";
import Emitters from "../Components/Particles/Emitters";
import globalParticlesOptions from "../Components/Particles/global-particles.json";
import emittersParticlesOptions from "../Components/Particles/emitters-particles.json";
import canvasParticlesOptions from "../Components/Particles/canvas-particles.json";
import { useParticlesEngine } from "../hooks/useParticlesEngine";
import { ImageData, ImagePosition, ImageSize } from "../types/imageData";
import { adaptParticles } from "../Components/Particles/retinaAdapter";
import classNames from "classnames";
import styles from "./LogoPage.module.css";

type Props = {
  className?: string;
};

type ParticlesOptions = {
  global: any;
  emitters: any;
  canvas: any;
};
const initialParticlesOptions: ParticlesOptions = {
  global: null,
  canvas: null,
  emitters: null,
};

type LoadState = {
  particles: boolean;
  image: boolean;
};

const initialLoadState: LoadState = {
  particles: false,
  image: false,
};

const initialImageData: ImageData = {
  height: 0,
  width: 0,
  top: 0,
  left: 0,
};

export default function LogoPage({ className }: Props) {
  const imageRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const options = useRef<ParticlesOptions>(initialParticlesOptions);
  const [loadState, setLoadState] = useState<LoadState>(initialLoadState);
  const [imageData, setImageData] = useState<ImageData>(initialImageData);

  const onParticlesLoaded = useCallback(() => {
    setLoadState((prev: LoadState) => {
      if (prev?.particles !== true) {
        return { ...prev, particles: true };
      }
      return prev;
    });
  }, []);
  useParticlesEngine(onParticlesLoaded);

  const updateImage = useCallback(
    (size: ImageSize, position: ImagePosition) => {
      setImageData({ ...position, ...size });

      if (!size?.width && !size?.height) {
        return;
      }
      const newSize = { width: size.width, height: size.height };
      options.current = {
        global: adaptParticles(globalParticlesOptions, newSize),
        emitters: adaptParticles(emittersParticlesOptions, newSize),
        canvas: adaptParticles(canvasParticlesOptions, newSize),
      };
    },
    [],
  );

  const particles = (
    <>
      <Emitters
        id="emitters-particles"
        options={options.current.emitters}
        imageData={imageData}
        isActive={isActive}
      />
      <Particles
        id="canvas-particles"
        options={options.current.canvas}
        isActive={isActive}
      />
    </>
  );

  const onImageLoad = useCallback(
    (size: ImageSize, position: ImagePosition) => {
      updateImage(size, position);
      setLoadState((prev) => {
        if (prev?.image !== true) {
          return { ...prev, image: true };
        }
        return prev;
      });
    },
    [updateImage],
  );

  const isLoaded = () => {
    return loadState?.image === true && loadState?.particles === true;
  };

  return (
    <Page onActiveUpdate={setIsActive} className={className}>
      {isLoaded() && particles}
      <Logo
        ref={imageRef}
        onLoad={onImageLoad}
        onImageResize={updateImage}
      ></Logo>
      <PageSection>
        <InfoCard></InfoCard>
      </PageSection>
      <PageSection className={classNames(styles.globalParticles)}>
        {isActive && (
          <Particles
            id="global-particles"
            options={options.current.global}
            isActive={isActive}
          />
        )}
      </PageSection>
    </Page>
  );
}
