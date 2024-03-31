import { useEffect, useLayoutEffect, useState } from "react";
import ParallaxPage from "./Pages/ParallaxPage.tsx";
import LogoPage from "./Pages/LogoPage.tsx";
import "swiper/css";
import "swiper/css/pagination";
import "./main.scss";

import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Mousewheel, Pagination } from "swiper/modules";
import SlidesPagination from "./Components/Slides/SlidesPagination.tsx";
import { useSwiperPagination } from "./Components/Slides/useSwiperPagination.ts";

export default function App() {
  const pagination = useSwiperPagination();

  useEffect(() => {
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    };
  }, []);

  useLayoutEffect(() => {
    const updateViewportHeight = () => {
      document.documentElement.style.setProperty(
        "--viewport-height",
        `${window.innerHeight}px`,
      );
    };

    updateViewportHeight();
    window.addEventListener("resize", updateViewportHeight);
    return window.removeEventListener("resize", updateViewportHeight);
  }, []);

  return (
    <>
      <SlidesPagination
        position={"bottom"}
        onInit={pagination.setPagination}
      ></SlidesPagination>
      <Swiper
        direction={"horizontal"}
        slidesPerView={1}
        mousewheel={true}
        modules={[Mousewheel, Pagination, Keyboard]}
        autoHeight={false}
        speed={850}
        followFinger={false}
        keyboard={true}
        slidesPerGroup={1}
        onInit={pagination.setSwiper}
        onSlideChange={pagination.updateSlides}
      >
        <SwiperSlide>
          {({ isActive }) => <ParallaxPage isActive={isActive}></ParallaxPage>}
        </SwiperSlide>
        <SwiperSlide>
          {({ isActive }) => <LogoPage isActive={isActive}></LogoPage>}
        </SwiperSlide>
      </Swiper>
    </>
  );
}
