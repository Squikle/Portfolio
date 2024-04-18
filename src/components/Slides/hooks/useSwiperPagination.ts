import {useEffect, useState} from "react";
import {Pagination as CustomPagination} from "../SlidesPagination";
import {SwiperClass} from "swiper/react";

export function useSwiperPagination() {
  const [pagination, setPagination] = useState<CustomPagination | null>(null);
  const [swiper, setSwiper] = useState<SwiperClass | null>(null);

  useEffect(() => {
    if (swiper) pagination?.addSlider(swiper);
    return () => pagination?.clearSliders();
  }, [pagination]);

  useEffect(() => {
    if (swiper) pagination?.updateSliders(swiper);
  }, [swiper]);

  return {
    setSwiper,
    setPagination,
    updateSlides: pagination?.updateSliders,
  };
}
