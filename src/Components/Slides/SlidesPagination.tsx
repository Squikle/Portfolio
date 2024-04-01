import classNames from "classnames";
import styles from "./SlidesPagination.module.scss";
import React, { CSSProperties, useCallback, useEffect, useState } from "react";
import { Slider } from "./types.ts";
import { SwiperClass } from "swiper/react";
import { positions } from "./positions.ts";
import SlideScrollButton from "./SlideScrollButton.tsx";
import config from "../../global.config.json";

type Props = {
  onInit: (pagination: Pagination) => void;
  position: Position;
  offset: number;
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
  length = 5,
  offset = 1,
  thickness = 1,
}: Props) {
  const [sliders, setSliders] = useState<Slider[]>([]);

  const drawBullet = (slider: Slider, index: number, parentSlide: number) => {
    const children = slider.nested.map((x, i) =>
      drawBullet(x, i, slider.currentSlide),
    );

    const bulletsStyle: CSSProperties = {};
    if (slider.atParentSlide !== parentSlide && slider.atParentSlide !== -1) {
      bulletsStyle.opacity = "0.8";
    }

    const activeBullet = (
      <div
        style={
          {
            ...bulletsStyle,
            width: length,
            height: thickness,
            "--offset": slider.currentSlide,
          } as CSSProperties
        }
        className={classNames(styles.bullet, styles.active)}
      ></div>
    );

    const scrollButtonStyle: React.CSSProperties = {
      width: config.slides.control.length,
      height: config.slides.control.thickness,
    };

    const hasNext = slider.swiper.slides.length > parentSlide + 1;
    const hasPrev = parentSlide > 0;

    return (
      <div
        key={index}
        className={classNames(styles.block, {
          [styles.vertical]: slider.swiper.params.direction == "vertical",
        })}
      >
        <SlideScrollButton
          onClick={() => slider.swiper.slidePrev()}
          style={scrollButtonStyle}
          className={classNames(styles.prev, { [styles.hidden]: !hasPrev })}
        ></SlideScrollButton>
        <div
          style={{
            ...bulletsStyle,
            width: length * slider.slides,
            height: thickness,
          }}
          className={classNames(styles.bullet)}
        >
          {activeBullet}
        </div>
        {children}
        <SlideScrollButton
          onClick={() => slider.swiper.slideNext()}
          style={scrollButtonStyle}
          className={classNames(styles.next, { [styles.hidden]: !hasNext })}
        ></SlideScrollButton>
      </div>
    );
  };

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
    <div
      className={classNames(styles.container)}
      style={{
        [position]: offset + "%",
        ...positions[position],
      }}
    >
      {sliders.map((s, i) => drawBullet(s, i, s.currentSlide))}
    </div>
  );
}
