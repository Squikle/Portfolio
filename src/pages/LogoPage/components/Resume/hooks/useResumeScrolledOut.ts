import {useEffect, useRef} from "react";
import {SwiperClass} from "swiper/react";
import {useCurrentSectionContext} from "../../../../../components/Page/CurrentPageContext/Contexts";

export default function useResumeScrolledOut(
  swiper: SwiperClass,
  pageSwiper?: SwiperClass,
) {
  const {isActive} = useCurrentSectionContext();
  const scrolledOut = useRef(false);

  useEffect(() => {
    if (!swiper) return;

    const handleTransitionEnd = () => {
      if (isActive) scrolledOut.current = false;
    };

    swiper.on("slideChangeTransitionEnd", handleTransitionEnd);
    pageSwiper?.on("slideChangeTransitionEnd", handleTransitionEnd);
    return () => {
      swiper.off("slideChangeTransitionEnd", handleTransitionEnd);
      pageSwiper?.off("slideChangeTransitionEnd", handleTransitionEnd);
    };
  }, [swiper, pageSwiper, scrolledOut, isActive]);

  return scrolledOut;
}
