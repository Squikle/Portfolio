import { useEffect, useState } from "react";
import { Pagination as CustomPagination } from "./SlidesPagination";
import { SwiperClass } from "swiper/react";

export function useSwiperPagination() {
  const [pagination, setPagination] = useState<CustomPagination | null>(null);
  const [swiper, setSwiper] = useState<SwiperClass | null>(null);

  useEffect(() => {
    if (pagination && swiper) {
      pagination.addSlider(swiper);
      pagination.updateSliders(swiper);
    }
  }, [pagination, swiper]);

  return {
    setSwiper,
    setPagination,
    updateSlides: pagination?.updateSliders,
  };
}
