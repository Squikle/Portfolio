import { RefObject, useCallback } from "react";
import { Delta, useSwipes } from "../../../hooks/useSwipes";
import { SwiperClass } from "swiper/react";
import config from "../../../global.config.json";

export default function useResumeSwipes(
  scrollableElementRef: RefObject<HTMLElement>,
  scrolledOut: RefObject<boolean>,
  slideNext: () => void,
  slidePrev: () => void,
  handleScroll: (y: number) => void,
  swiper: SwiperClass,
  pageSwiper?: SwiperClass,
) {
  const handleSwipe = useCallback(
    (e: Delta) => {
      const handleSwipeX = (percentageX: number, percentageY: number) => {
        if (!pageSwiper) return;
        if (scrolledOut.current) return;
        if (
          Math.abs(percentageY) > config.slides.control.customSwipeThreshold.y
        )
          return;

        const thresholdX = config.slides.control.customSwipeThreshold.x;
        const slides = swiper.slides.length;
        if (percentageX > thresholdX && pageSwiper.activeIndex < slides - 1)
          slideNext();
        else if (percentageX < -thresholdX && pageSwiper.activeIndex > 0)
          slidePrev();
      };

      const element = scrollableElementRef.current;
      if (!element) throw new Error("Scrollable element ref must be set!");

      const isScrollable = element.scrollHeight > element.clientHeight;
      if (!isScrollable) handleScroll(e.y);

      handleSwipeX(e.x, e.y);
    },
    [
      pageSwiper,
      swiper.slides.length,
      slideNext,
      slidePrev,
      handleScroll,
      scrolledOut,
      scrollableElementRef,
    ],
  );
  useSwipes(scrollableElementRef, handleSwipe);
}
