import PageSection from "../../components/Page/PageSection";
import Page from "../../components/Page/Page";
import Particles from "../../components/Particles/Particles";
import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import globalParticlesOptions from "../../configs/global-particles.json";
import emittersParticlesOptions from "../../configs/emitters-particles.json";
import canvasParticlesOptions from "../../configs/canvas-particles.json";
import { useParticlesEngine } from "../../hooks/useParticlesEngine";
import { ImageData } from "./components/Logo/types.ts";
import { adaptParticles } from "../../components/Particles/retinaAdapter";
import classNames from "classnames";
import styles from "./LogoPage.module.scss";
import { useCurrentSectionContext } from "../../components/Page/CurrentPageContext/Contexts.tsx";
import { Keyboard, Mousewheel } from "swiper/modules";
import { Swiper, SwiperClass, SwiperSlide, useSwiper } from "swiper/react";
import SlidesPagination from "../../components/Slides/SlidesPagination.tsx";
import { useSwiperPagination } from "../../components/Slides/hooks/useSwiperPagination.ts";
import config from "../../configs/global.config.json";
import useBackground from "../../components/Page/hooks/useBackground.tsx";
import cardStyle from "../../components/Card/Card.module.scss";
import useResumeCards from "./components/Resume/hooks/useResumeCards.tsx";
import canvasLogo from "../../../assets/squik-canvas.png";
import OfferSection from "./components/Resume/OfferSection/OfferSection.tsx";
import { ResumeSectionContext } from "./types.ts";

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
  isAlwaysVisible = false,
}: {
  isActive: boolean;
  className?: string;
  isAlwaysVisible?: boolean;
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
    newCanvasParticlesOptions.canvasMask.image.src = canvasLogo;
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
    return loadState?.image && loadState?.particles;
  };

  const background = useBackground(
    isLoaded(),
    onImageLoad,
    updateImage,
    options.current,
    imageData,
  );

  const resumeCards = useResumeCards();
  const isPageActive = isActive;

  return (
    <Page<{}>
      isActive={isPageActive}
      className={classNames(className, styles.logoPage)}
      backgroundControl={background.control}
      isAlwaysVisible={isAlwaysVisible}
      swiper={parentSwiper}
      pageName={"logo"}
    >
      <SlidesPagination
        position={"right"}
        onInit={pagination.setPagination}
        length={config.slides.progress.length}
        offset={config.slides.progress.offset}
        offsetSide={config.slides.progress.offsetSide}
        thickness={config.slides.progress.thickness}
      ></SlidesPagination>
      <Swiper
        direction={"vertical"}
        modules={[Mousewheel, Keyboard]}
        speed={config.slides.animation.duration * 1000}
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
              {({ isActive, isPrev, isNext }) => (
                <PageSection<ResumeSectionContext>
                  index={i}
                  isActive={isActive && isPageActive}
                  isAlwaysVisible={true}
                  backgroundOpacity={backgroundOpacity}
                  isNext={isNext}
                  isPrev={isPrev}
                  sectionName={"resume/" + i}
                >
                  {card}
                </PageSection>
              )}
            </SwiperSlide>
          );
        })}

        <SwiperSlide>
          {({ isActive, isPrev, isNext }) => (
            <PageSection<ResumeSectionContext>
              index={resumeCards.length}
              isActive={isActive && isPageActive}
              isAlwaysVisible={true}
              backgroundOpacity={1}
              isNext={isNext}
              isPrev={isPrev}
              sectionName={"offer"}
            >
              <OfferSection
                darkBackgroundOpacity={config.slides.style.backgroundOpacity}
              />
            </PageSection>
          )}
        </SwiperSlide>
        {background.element}
        <SwiperSlide>
          {({ isActive }) => (
            <PageSection
              isActive={isActive && isPageActive}
              className={classNames(
                styles.globalParticles,
                "swiper-no-swiping",
              )}
              sectionName={"global-particles"}
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
