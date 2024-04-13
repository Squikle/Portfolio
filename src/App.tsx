import ParallaxPage from "./pages/ParallaxPage/ParallaxPage.tsx";
import LogoPage from "./pages/LogoPage/LogoPage.tsx";
import "swiper/css";
import "swiper/css/pagination";
import "./main.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard } from "swiper/modules";
import { useSwiperPagination } from "./components/Slides/hooks/useSwiperPagination.ts";
import config from "./configs/global.config.json";
import SlidesPagination from "./components/Slides/SlidesPagination.tsx";
import Page from "./components/Page/Page.tsx";

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
          {({ isActive }) => (
            <LogoPage isAlwaysActive={true} isActive={isActive}></LogoPage>
          )}
        </SwiperSlide>
      </Swiper>
    </Page>
  );
}
