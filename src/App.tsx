import ParallaxPage from "./Pages/ParallaxPage.tsx";
import LogoPage from "./Pages/LogoPage.tsx";
import "swiper/css";
import "swiper/css/pagination";
import "./main.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Mousewheel } from "swiper/modules";
import SlidesPagination from "./Components/Slides/SlidesPagination.tsx";
import { useSwiperPagination } from "./Components/Slides/useSwiperPagination.ts";
import config from "./global.config.json";

export default function App() {
  const pagination = useSwiperPagination();

  const paginationElement = (
    <SlidesPagination
      position={"bottom"}
      onInit={pagination.setPagination}
      length={config.slides.progress.length}
      offset={config.slides.progress.offset}
      offsetSide={config.slides.progress.offsetSide}
      thickness={config.slides.progress.thickness}
    ></SlidesPagination>
  );
  return (
    <>
      {paginationElement}
      <Swiper
        direction={"horizontal"}
        slidesPerView={1}
        mousewheel={{ enabled: true, forceToAxis: true }}
        modules={[Mousewheel, Keyboard]}
        speed={config.slides.animation.speed}
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
    </>
  );
}
