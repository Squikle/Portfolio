import classNames from "classnames";
import styles from "./SlidesPagination.module.scss";
import { useCallback, useEffect, useState } from "react";
import { Slider } from "./types.ts";
import { SwiperClass } from "swiper/react";
import PaginationBlock from "./PaginationBlock.tsx";

type Props = {
  onInit: (pagination: Pagination) => void;
  position: Position;
  offset: number;
  offsetSide: number;
  thickness: number;
  length: number;
};

export type Pagination = {
  addSlider: (swiper: SwiperClass) => void;
  updateSliders: (swiper: SwiperClass) => void;
  clearSliders: () => void;
};

export type Position = "top" | "right" | "bottom" | "left";

export default function SlidesPagination({
  onInit,
  position,
  offset,
  offsetSide,
  length = 5,
  thickness = 1,
}: Props) {
  const [sliders, setSliders] = useState<Slider[]>([]);

  const toSlider = (
    swiper: SwiperClass,
    nested?: Slider[],
    atParentSlide: number = -1,
  ): Slider => {
    return {
      slides: swiper.slides.length,
      currentSlide: swiper.activeIndex,
      swiper: swiper,
      nested: nested || [],
      atParentSlide: atParentSlide,
    };
  };

  const addSlider = useCallback((swiper: SwiperClass) => {
    setSliders((sliders) => {
      const parentSwiper = swiper.el.parentElement?.closest(".swiper");

      const hasParentInList = sliders.some((x) => x.swiper.el == parentSwiper);
      if (parentSwiper != null && hasParentInList) {
        return appendSliderToParent(sliders, swiper, parentSwiper);
      }

      const nestedSliders = getNestedSliders(sliders, swiper);
      const otherSliders = sliders.filter(
        (x) =>
          !(nestedSliders as Slider[])
            .map((x) => x.swiper.el)
            .includes(x.swiper.el),
      );

      return [toSlider(swiper, nestedSliders), ...otherSliders];
    });
  }, []);

  useEffect(() => {
    onInit({
      addSlider: addSlider,
      updateSliders: (swiper) =>
        setSliders((sliders) => updateSlider(sliders, swiper)),
      clearSliders: () => setSliders([]),
    });
  }, []);

  const updateSlider = (sliders: Slider[], swiper: SwiperClass) => {
    return sliders.map((slider) => {
      let newSlider = slider;
      if (slider.swiper === swiper)
        newSlider = toSlider(swiper, slider.nested, slider.atParentSlide);

      if (slider.nested.map((x) => x.swiper).includes(swiper)) {
        newSlider.nested = updateSlider(slider.nested, swiper);
      }

      return newSlider;
    });
  };

  const getNestedSliders = (sliders: Slider[], swiper: SwiperClass) => {
    return sliders
      .map((x) => {
        const parentSlide = x.swiper.el.parentElement?.closest(".swiper-slide");
        if (!parentSlide) return null;
        const parentSlideIndex = (swiper.slides as Element[]).indexOf(
          parentSlide,
        );
        return { ...x, atParentSlide: parentSlideIndex };
      })
      .filter((x) => x !== null) as Slider[];
  };

  const appendSliderToParent = (
    sliders: Slider[],
    swiper: SwiperClass,
    parentSwiperElement: Element,
  ): Slider[] => {
    return sliders.map((slider) => {
      if (slider.swiper.el === parentSwiperElement) {
        const nestedSliders = getNestedSliders(sliders, swiper);
        const nestedSlider = nestedSliders.find((x) => x.swiper === swiper)!;
        const updatedParent: Slider = {
          ...slider,
          nested: [
            toSlider(swiper, undefined, nestedSlider.atParentSlide),
            ...slider.nested,
          ],
        };
        return updatedParent;
      }

      return slider;
    });
  };

  return (
    <div className={classNames(styles.container)}>
      {sliders.map((s, i) => (
        <PaginationBlock
          slider={s}
          key={i}
          position={position}
          offset={offset}
          offsetSide={offsetSide}
          parentSlide={s.currentSlide}
          index={i}
          length={length}
          thickness={thickness}
        />
      ))}
    </div>
  );
}
