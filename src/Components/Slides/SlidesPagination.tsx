import classNames from "classnames";
import styles from "./SlidesPagination.module.css";
import PaginationBullet from "./PaginationBullet.tsx";
import {
  CSSProperties,
  Fragment,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Slider } from "./types.ts";
import { SwiperClass } from "swiper/react";
import { positions } from "./positions.ts";

type Props = {
  onInit: (pagination: Pagination) => void;
  position: Position;
};

export type Pagination = {
  addSlider: (swiper: SwiperClass) => void;
  updateSliders: (swiper: SwiperClass) => void;
};

export type Position = "top" | "right" | "bottom" | "left";

export default function SlidesPagination({ onInit, position }: Props) {
  const [sliders, setSliders] = useState<Slider[]>([]);

  const size = 15;
  const bulletsStyle: CSSProperties = {
    height: size + "px",
    margin: "2px",
  };

  const drawBullet = (slider: Slider, index: number, parentSlide: number) => {
    const children = slider.nested.map((x, i) =>
      drawBullet(x, i, slider.currentSlide),
    );

    const currentBulletStyle = { ...bulletsStyle };
    if (slider.atParentSlide !== parentSlide && slider.atParentSlide !== -1) {
      currentBulletStyle.opacity = "0.8";
    }

    const isVertical = slider.swiper.params.direction == "vertical";
    return (
      <Fragment key={index}>
        <PaginationBullet
          slidesCount={slider.slides}
          width={size}
          currentActive={slider.currentSlide}
          style={currentBulletStyle}
          className={classNames({ [styles.vertical]: isVertical })}
        ></PaginationBullet>
        {children}
      </Fragment>
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

  const updateSliders = useCallback((swiper: SwiperClass) => {
    setSliders((sliders) => updateSlider(sliders, swiper));
  }, []);

  useEffect(() => {
    onInit({
      addSlider,
      updateSliders,
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
        [position]: "2%",
        ...positions[position],
      }}
    >
      {sliders.map((s, i) => drawBullet(s, i, s.currentSlide))}
    </div>
  );
}
