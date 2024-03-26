import { useCallback, useEffect, useRef, useState } from "react";
import { useParticlesEngine } from "./hooks/useParticlesEngine.tsx";
import { adaptParticles } from "./Components/Particles/retinaAdapter";
import Emitters from "./Components/Particles/Emitters.tsx";
import Page from "./Components/Page/Page.tsx";
import PageSection from "./Components/Page/PageSection.tsx";
import Logo from "./Components/Logo/Logo.tsx";
import InfoCard from "./Components/TextCard/InfoCard.tsx";
import Particles from "./Components/Particles/Particles.tsx";
import { ImageData, ImagePosition, ImageSize } from "./types/imageData";
import globalParticlesOptions from "./Components/Particles/global-particles.json";
import emittersParticlesOptions from "./Components/Particles/emitters-particles.json";
import canvasParticlesOptions from "./Components/Particles/canvas-particles.json";
import Parallax from "./Components/Parallax/Parallax.tsx";

type ParticlesOptions = {
  global: any;
  emitters: any;
  canvas: any;
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

const initialParticlesOptions: ParticlesOptions = {
  global: null,
  canvas: null,
  emitters: null,
};

export default function App() {
  const imageRef = useRef(null);
  const [imageData, setImageData] = useState<ImageData>(initialImageData);
  const [loadState, setLoadState] = useState<LoadState>(initialLoadState);
  const options = useRef<ParticlesOptions>(initialParticlesOptions);
  const [isParallaxEnabled, setIsParallaxEnabled] = useState(false);
  const [isParticlesEnabled, setIsParticlesEnabled] = useState(false);

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

  useEffect(() => {
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    };
  }, []);

  const isLoaded = () => {
    return loadState?.image === true && loadState?.particles === true;
  };

  const particles = (
    <>
      <Emitters
        id="emitters-particles"
        options={options.current.emitters}
        imageData={imageData}
        isActive={isParticlesEnabled}
      />
      <Particles
        id="canvas-particles"
        options={options.current.canvas}
        isActive={isParticlesEnabled}
      />
    </>
  );

  return (
    <div className="content" id="main-container">
      <div id="scroll">
        <Page>
          <PageSection
            className="slide parallax-slide"
            onActiveUpdate={(active) => setIsParallaxEnabled(active)}
          >
            <Parallax isActive={isParallaxEnabled}></Parallax>
          </PageSection>
        </Page>
        <Page onActiveUpdate={(active) => setIsParticlesEnabled(active)}>
          <Logo
            ref={imageRef}
            onLoad={onImageLoad}
            onImageResize={updateImage}
          ></Logo>
          <PageSection className="slide">
            <InfoCard></InfoCard>
          </PageSection>
          <PageSection className="slide" alwaysActive={true}>
            {isLoaded() && (
              <Particles
                id="global-particles"
                options={options.current.global}
                isActive={isParticlesEnabled}
              />
            )}
          </PageSection>
          {isLoaded() && particles}
        </Page>
      </div>
    </div>
  );
}
