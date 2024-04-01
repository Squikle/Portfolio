import PageSection from "../Components/Page/PageSection";
import InfoCard from "../Components/TextCard/InfoCard";
import Page from "../Components/Page/Page";
import Logo from "../Components/Logo/Logo";
import Particles from "../Components/Particles/Particles";
import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import Emitters from "../Components/Particles/Emitters";
import globalParticlesOptions from "../Components/Particles/global-particles.json";
import emittersParticlesOptions from "../Components/Particles/emitters-particles.json";
import canvasParticlesOptions from "../Components/Particles/canvas-particles.json";
import { useParticlesEngine } from "../hooks/useParticlesEngine";
import { ImageData } from "../Components/Logo/types.ts";
import { adaptParticles } from "../Components/Particles/retinaAdapter";
import classNames from "classnames";
import styles from "./LogoPage.module.css";
import {
  useCurrentPageContext,
  useCurrentSectionContext,
} from "../Components/Page/CurrentPageContext/useContexts.ts";
import { Keyboard, Mousewheel } from "swiper/modules";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import SlidesPagination from "../Components/Slides/SlidesPagination.tsx";
import { useSwiperPagination } from "../Components/Slides/useSwiperPagination.ts";
import config from "../global.config.json";

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
const initialImageData: ImageData = {
  height: 0,
  width: 0,
  top: 0,
  left: 0,
};

type LoadState = {
  particles: boolean;
  image: boolean;
};
const initialLoadState: LoadState = {
  particles: false,
  image: false,
};
type stateUpdatedAction = "image" | "particles";
const stateReducer = (state: LoadState, action: stateUpdatedAction) => {
  switch (action) {
    case "image":
      return {
        ...state,
        image: true,
      };
    case "particles":
      return {
        ...state,
        particles: true,
      };
    default:
      return state;
  }
};

export default function LogoPage({
  isActive,
  className,
}: {
  isActive: boolean;
  className?: string;
}) {
  const [imageData, setImageData] = useState<ImageData>(initialImageData);
  const [loadState, dispatchLoad] = useReducer(stateReducer, initialLoadState);
  const [swiper, setSwiper] = useState<SwiperClass | null>(null);
  const options = useRef(initialParticlesOptions);
  const pagination = useSwiperPagination();
  useParticlesEngine(useCallback(() => dispatchLoad("particles"), []));

  const updateImage = useCallback((imageData: ImageData) => {
    setImageData(imageData);

    if (!imageData?.width && !imageData?.height) {
      return;
    }
    const newSize = { width: imageData.width, height: imageData.height };
    options.current = {
      global: adaptParticles(globalParticlesOptions, newSize),
      emitters: adaptParticles(emittersParticlesOptions, newSize),
      canvas: adaptParticles(canvasParticlesOptions, newSize),
    };
  }, []);

  const onImageLoad = useCallback(
    (imageData: ImageData) => {
      updateImage(imageData);
      dispatchLoad("image");
    },
    [updateImage],
  );

  const isLoaded = () => {
    return loadState?.image === true && loadState?.particles === true;
  };

  useEffect(() => {
    if (!swiper) return;

    if (isActive) setTimeout(() => swiper.mousewheel.enable(), 1500);
    else {
      swiper.mousewheel.disable();
    }
  }, [isActive]);

  return (
    <Page
      isActive={isActive}
      className={classNames(className, styles.logoPage)}
    >
      <SlidesPagination
        position={"right"}
        onInit={pagination.setPagination}
        length={config.slides.progress.length}
        offset={config.slides.progress.offset}
        thickness={config.slides.progress.thickness}
      ></SlidesPagination>
      <Swiper
        direction={"vertical"}
        modules={[Mousewheel, Keyboard]}
        speed={config.slides.animation.speed}
        followFinger={true}
        keyboard={true}
        onInit={(s) => {
          pagination.setSwiper(s);
          setSwiper(s);
        }}
        onSlideChange={pagination.updateSlides}
      >
        <Logo onLoad={onImageLoad} onImageResize={updateImage}></Logo>
        {isLoaded() && (
          <FixedParticles options={options.current} imageData={imageData} />
        )}
        <SwiperSlide>
          {({ isActive }) => (
            <PageSection isActive={isActive}>
              <InfoCard></InfoCard>
            </PageSection>
          )}
        </SwiperSlide>
        <SwiperSlide>
          {({ isActive }) => (
            <PageSection
              isActive={isActive}
              className={classNames(styles.globalParticles)}
            >
              {isLoaded() && <StaticParticles options={options.current} />}
            </PageSection>
          )}
        </SwiperSlide>
      </Swiper>
    </Page>
  );
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
      <Emitters
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

const StaticParticles = ({ options }: { options: ParticlesOptions }) => {
  const isActive = useCurrentSectionContext().isActive;

  return (
    <div className={styles.globalParticlesContainer}>
      <Particles
        id={styles["global-particles"]}
        options={options.global}
        isActive={isActive}
      />
    </div>
  );
};
