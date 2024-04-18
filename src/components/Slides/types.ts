import {SwiperClass} from "swiper/react";

export type Slider = {
    slides: number;
    currentSlide: number;
    nested: Slider[];
    atParentSlide: -1 | number;
    swiper: SwiperClass;
};
