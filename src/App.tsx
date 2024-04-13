import "swiper/css";
import "./main.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard } from "swiper/modules";
import { useSwiperPagination } from "./components/Slides/hooks/useSwiperPagination.ts";
import config from "./configs/global.config.json";
import SlidesPagination from "./components/Slides/SlidesPagination.tsx";
import Page from "./components/Page/Page.tsx";
import { lazy, Suspense } from "react";
import LoadingOverlay from "./components/LoadingOverlay/LoadingOverlay.tsx";

export default function App() {
  const pagination = useSwiperPagination();

  return (
    <Page isActive={true} pageName={"master"}>
      <SlidesPagination
        position={"bottom"}
        onInit={pagination.setPagination}
        length={config.slides.progress.length}
        offset={config.slides.progress.offset}
        offsetSide={config.slides.progress.offsetSide}
        thickness={config.slides.progress.thickness}
      ></SlidesPagination>
      <Swiper
        direction={"horizontal"}
        slidesPerView={1}
        modules={[Keyboard]}
        speed={config.slides.animation.duration * 1000}
        followFinger={false}
        keyboard={true}
        onInit={pagination.setSwiper}
        onSlideChange={pagination.updateSlides}
        noSwipingClass={"swiper-no-swiping"}
      >
        <SwiperSlide>
          {({ isActive }) => (
            <Suspense fallback={<LoadingOverlay />}>
              <LazyParallaxPage isActive={isActive}></LazyParallaxPage>
            </Suspense>
          )}
        </SwiperSlide>
        <SwiperSlide>
          {({ isActive }) => (
            <Suspense fallback={<LoadingOverlay />}>
              <LazyLogoPage
                isAlwaysVisible={true}
                isActive={isActive}
              ></LazyLogoPage>
            </Suspense>
          )}
        </SwiperSlide>
      </Swiper>
    </Page>
  );
}

const LazyParallaxPage = lazy(
  () => import("./pages/ParallaxPage/ParallaxPage.tsx"),
);

const LazyLogoPage = lazy(() => import("./pages/LogoPage/LogoPage.tsx"));
