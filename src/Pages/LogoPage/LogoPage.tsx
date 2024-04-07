import PageSection from "../../Components/Page/PageSection";
import Page from "../../Components/Page/Page";
import Particles from "../../Components/Particles/Particles";
import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import globalParticlesOptions from "../../Components/Particles/global-particles.json";
import emittersParticlesOptions from "../../Components/Particles/emitters-particles.json";
import canvasParticlesOptions from "../../Components/Particles/canvas-particles.json";
import { useParticlesEngine } from "../../hooks/useParticlesEngine";
import { ImageData } from "../../Components/Logo/types.ts";
import { adaptParticles } from "../../Components/Particles/retinaAdapter";
import classNames from "classnames";
import styles from "./LogoPage.module.scss";
import { useCurrentSectionContext } from "../../Components/Page/CurrentPageContext/useContexts.ts";
import { Keyboard, Mousewheel } from "swiper/modules";
import { Swiper, SwiperClass, SwiperSlide, useSwiper } from "swiper/react";
import SlidesPagination from "../../Components/Slides/SlidesPagination.tsx";
import { useSwiperPagination } from "../../Components/Slides/useSwiperPagination.ts";
import config from "../../global.config.json";
import useBackground from "../../hooks/useBackground.tsx";
import cardStyle from "../../Components/TextCard/InfoCard.module.scss";
import useResumeCards from "../../Components/Resume/useResumeCards.tsx";
import smallLogo from "/public/squik-canvas.webp";
import OfferSection from "../../Components/Resume/OfferSection/OfferSection.tsx";

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
  const parentSwiper = useSwiper();
  const options = useRef(initialParticlesOptions);
  const pagination = useSwiperPagination();
  useParticlesEngine(useCallback(() => dispatchLoad("particles"), []));

  const updateImage = useCallback((imageData: ImageData) => {
    setImageData(imageData);

    if (!imageData?.width && !imageData?.height) {
      return;
    }
    const newSize = { width: imageData.width, height: imageData.height };
    const newCanvasParticlesOptions = adaptParticles(
      canvasParticlesOptions,
      newSize,
    );
    newCanvasParticlesOptions.canvasMask.image.src = smallLogo;
    options.current = {
      global: adaptParticles(globalParticlesOptions, newSize),
      emitters: adaptParticles(emittersParticlesOptions, newSize),
      canvas: newCanvasParticlesOptions,
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
      offsetSide={config.slides.progress.offsetSide}
      thickness={config.slides.progress.thickness}
    ></SlidesPagination>
  );

  const resumeCards = useResumeCards();
  const isPageActive = isActive;
  return (
    <Page
      isActive={isPageActive}
      className={classNames(className, styles.logoPage)}
      backgroundControl={background.control}
      isAlwaysVisible={isAlwaysActive}
      swiper={parentSwiper}
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
        noSwipingClass={"swiper-no-swiping"}
      >
        {resumeCards.map((card, i) => {
          const backgroundOpacity = config.slides.style.backgroundOpacity;

          return (
            <SwiperSlide key={i}>
              {({ isActive }) => (
                <PageSection
                  isAlwaysVisible={true}
                  isActive={isActive && isPageActive}
                  backgroundOpacity={backgroundOpacity}
                >
                  {card}
                </PageSection>
              )}
            </SwiperSlide>
          );
        })}

        <SwiperSlide>
          {({ isActive }) => (
            <OfferSection
              isAlwaysVisible={true}
              isActive={isActive && isPageActive}
              backgroundOpacity={1}
              darkBackgroundOpacity={config.slides.style.backgroundOpacity}
            />
          )}
        </SwiperSlide>
        {background.element}
      </Swiper>
    </Page>
  );
}
