import { Slider } from "./types";
import React, { CSSProperties, useCallback, useEffect, useRef } from "react";
import classNames from "classnames";
import SlideScrollButton from "./SlideScrollButton";
import { Position } from "./SlidesPagination";
import config from "../../configs/global.config.json";
import styles from "./SlidesPagination.module.scss";
import getCssDimensions from "./utils.ts";
import { positions } from "./positions.ts";
import { useAnalytics } from "../Analytics/AnalyticsContext.tsx";
import { EventActions, EventCategories } from "../../hooks/useAnalytics.ts";

type Props = {
  slider: Slider;
  index: number;
  parentSlide: number;
  position: Position;
  offset: number;
  offsetSide: number;
  length: number;
  thickness: number;
};

export default function PaginationBlock({
  slider,
  index,
  parentSlide,
  position,
  offset,
  offsetSide,
  length,
  thickness,
}: Props) {
  const isVertical = slider.swiper.params.direction == "vertical";
  const blockRef = useRef<HTMLDivElement>(null);
  const analytics = useAnalytics();

  useEffect(() => {
    const handleTouch = () => {
      if (!blockRef.current) return;

      blockRef.current.style.opacity =
        config.slides.control.opacityOnTouch.toString();
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!blockRef.current) return;

      if (e.targetTouches.length === 0) {
        blockRef.current.style.opacity = 1 + "";
      }
    };

    const handleMouseUp = () => {
      if (!blockRef.current) return;

      blockRef.current.style.opacity = 1 + "";
    };

    window.addEventListener("mousedown", handleTouch);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchmove", handleTouch);
    window.addEventListener("touchstart", handleTouch);
    window.addEventListener("touchend", handleTouchEnd);
    return () => {
      window.addEventListener("mousedown", handleTouch);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouch);
      window.removeEventListener("touchstart", handleTouch);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  const drawBullet = () => {
    const children = slider.nested.map(() => drawBullet());

    const bulletsStyle: CSSProperties = {};
    if (slider.atParentSlide !== parentSlide && slider.atParentSlide !== -1) {
      bulletsStyle.opacity = "0.8";
    }
    const activeBullet = (
      <div
        style={
          {
            ...bulletsStyle,
            "--offset": slider.currentSlide,
            ...getCssDimensions(length, thickness, isVertical),
          } as CSSProperties
        }
        className={classNames(styles.bullet, styles.active)}
      ></div>
    );

    const scrollButtonStyle: React.CSSProperties = {
      width: config.slides.control.length + "em",
      height: config.slides.control.thickness + "em",
    };

    const hasNext = slider.swiper.slides.length > parentSlide + 1;
    const hasPrev = parentSlide > 0;

    const slidePrev = useCallback(() => {
      slider.swiper.slidePrev();
    }, [slider.swiper, analytics]);

    const slideNext = useCallback(() => {
      slider.swiper.slideNext();
    }, [slider.swiper, analytics]);

    return (
      <div
        key={index}
        className={classNames(styles.block, {
          [styles.vertical]: isVertical,
        })}
        ref={blockRef}
        style={{
          paddingTop: offset,
          paddingBottom: offset,
          paddingRight: offsetSide,
          paddingLeft: offsetSide,
          ...positions[position],
        }}
      >
        <SlideScrollButton
          onClick={slidePrev}
          style={scrollButtonStyle}
          className={classNames(styles.prev, { [styles.hidden]: !hasPrev })}
        ></SlideScrollButton>
        <div
          style={{
            ...bulletsStyle,
            ...getCssDimensions(length * slider.slides, thickness, isVertical),
          }}
          className={classNames(styles.bullet)}
        >
          {activeBullet}
        </div>
        {children}
        <SlideScrollButton
          onClick={slideNext}
          style={scrollButtonStyle}
          className={classNames(styles.next, { [styles.hidden]: !hasNext })}
        ></SlideScrollButton>
      </div>
    );
  };

  return drawBullet();
}
