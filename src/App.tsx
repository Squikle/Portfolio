import ParallaxPage from "./pages/ParallaxPage/ParallaxPage.tsx";
import "swiper/css";
import "./main.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard } from "swiper/modules";
import { useSwiperPagination } from "./components/Slides/hooks/useSwiperPagination.ts";
import config from "./configs/global.config.json";
import SlidesPagination from "./components/Slides/SlidesPagination.tsx";
import Page from "./components/Page/Page.tsx";
import { lazy, Suspense } from "react";

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
          {({ isActive }) => <ParallaxPage isActive={isActive}></ParallaxPage>}
        </SwiperSlide>
        <SwiperSlide>
          {({ isActive }) =>
            isActive && (
              <Suspense>
                <LazyLogoPage
                  isAlwaysActive={true}
                  isActive={isActive}
                ></LazyLogoPage>
              </Suspense>
            )
          }
        </SwiperSlide>
      </Swiper>
    </Page>
  );
}

const LazyLogoPage = lazy(() => import("./pages/LogoPage/LogoPage.tsx"));
