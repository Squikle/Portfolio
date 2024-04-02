import PageSection from "../Components/Page/PageSection";
import Page from "../Components/Page/Page";
import Particles from "../Components/Particles/Particles";
import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import globalParticlesOptions from "../Components/Particles/global-particles.json";
import emittersParticlesOptions from "../Components/Particles/emitters-particles.json";
import canvasParticlesOptions from "../Components/Particles/canvas-particles.json";
import { useParticlesEngine } from "../hooks/useParticlesEngine";
import { ImageData } from "../Components/Logo/types.ts";
import { adaptParticles } from "../Components/Particles/retinaAdapter";
import classNames from "classnames";
import styles from "./LogoPage.module.css";
import { useCurrentSectionContext } from "../Components/Page/CurrentPageContext/useContexts.ts";
import { Keyboard, Mousewheel } from "swiper/modules";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import SlidesPagination from "../Components/Slides/SlidesPagination.tsx";
import { useSwiperPagination } from "../Components/Slides/useSwiperPagination.ts";
import config from "../global.config.json";
import useBackground from "./useBackground.tsx";
import cardStyle from "../Components/TextCard/InfoCard.module.scss";
import useResumeCards from "../Components/Resume/useResumeCards.tsx";

export type ParticlesOptions = {
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
  isAlwaysActive = false,
}: {
  isActive: boolean;
  className?: string;
  isAlwaysActive?: boolean;
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

  const background = useBackground(
    isLoaded(),
    onImageLoad,
    updateImage,
    options.current,
    imageData,
  );
  const paginationElement = (
    <SlidesPagination
      position={"right"}
      onInit={pagination.setPagination}
      length={config.slides.progress.length}
      offset={config.slides.progress.offset}
      thickness={config.slides.progress.thickness}
    ></SlidesPagination>
  );

  const resumeCards = useResumeCards();
  return (
    <Page
      isActive={isActive}
      className={classNames(className, styles.logoPage)}
      backgroundControl={background.control}
      isAlwaysVisible={isAlwaysActive}
    >
      {paginationElement}
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
        mousewheel={{
          enabled: true,
          noMousewheelClass: cardStyle.card,
        }}
        onSlideChange={pagination.updateSlides}
        noSwipingClass={classNames(cardStyle.card)}
      >
        {resumeCards.map((card, i) => {
          const backgroundOpacity = i === 0 ? undefined : 0.5;

          return (
            <SwiperSlide key={i}>
              {({ isActive }) => (
                <PageSection
                  isAlwaysVisible={true}
                  isActive={isActive}
                  backgroundOpacity={backgroundOpacity}
                >
                  {card}
                </PageSection>
              )}
            </SwiperSlide>
          );
        })}

        {background.element}
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
