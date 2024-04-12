import { RefObject, useCallback } from "react";
import {
  Direction,
  useCustomWheelScroll,
} from "../../../../../hooks/userControl/useCustomWheelScroll.ts";
import { executeAndDebounce } from "../../../../../utils/debounce";
import { SwiperClass } from "swiper/react";
import config from "../../../../../configs/global.config.json";

export default function useResumeWheelScroll(
  scrollableElementRef: RefObject<HTMLElement>,
  scrolledOut: RefObject<boolean>,
  swiper: SwiperClass,
  slideNext: () => void,
  slidePrev: () => void,
) {
  const handleWheelScroll = useCallback(
    (direction: Direction, yDelta: number) => {
      if (scrolledOut.current) return;
      if (Math.abs(yDelta) < config.slides.control.customWheelThreshold) return;

      executeAndDebounce(() => {
        const slides = swiper.slides.length;
        if (direction === "up" && swiper.activeIndex > 0) slidePrev();
        else if (direction === "down" && swiper.activeIndex < slides - 1)
          slideNext();
      }, config.slides.animation.duration)();
    },
    [scrollableElementRef, scrolledOut, swiper, slidePrev, slideNext],
  );
  useCustomWheelScroll(scrollableElementRef, handleWheelScroll);
}
