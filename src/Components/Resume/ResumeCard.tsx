import React, { RefObject, useCallback, useEffect, useRef } from "react";
import InfoCard from "../TextCard/InfoCard";
import classNames from "classnames";
import styles from "./Resume.module.scss";
import useFadeScroll from "../../hooks/FadeScroll/useFadeScroll.ts";
import useOverScroll from "../../hooks/useOverScroll.ts";
import { useSwiper } from "swiper/react";
import { Delta, useSwipes } from "../../hooks/useSwipes.ts";

export type ResumeCardContentProps = {
  scrollableElementRef?: RefObject<HTMLElement>;
};

type ResumeCardContent =
  | React.ReactNode
  | ((props: ResumeCardContentProps) => React.ReactNode);

export default function ResumeCard({
  children,
  cardClassName,
}: {
  children: ResumeCardContent;
  cardClassName: string;
}) {
  const swiper = useSwiper();

  let scrolledOut = false;
  useEffect(() => {
    if (!swiper) return;
    const handleTransitionEnd = () => {
      scrolledOut = false;
    };

    swiper.on("transitionEnd", handleTransitionEnd);
    return () => swiper.off("transitionEnd", handleTransitionEnd);
  }, [swiper]);

  const handleScroll = useCallback(
    (percentage: number) => {
      if (scrolledOut) return;

      const threshold = 12.5;
      if (
        percentage > threshold &&
        swiper.activeIndex < swiper.slides.length - 1
      ) {
        console.log(swiper.activeIndex);
        swiper?.slideNext();
        scrolledOut = true;
      } else if (percentage < -threshold && swiper.activeIndex > 0) {
        console.log(swiper.activeIndex);
        swiper?.slidePrev();
        scrolledOut = true;
      }
    },
    [scrolledOut, swiper, swiper.slides.length],
  );

  const scrollableElementRef = useRef<HTMLElement>(null);

  const handleSwipe = useCallback(
    (e: Delta) => {
      const element = scrollableElementRef.current;
      if (!element) throw new Error("Scrollable element ref must be set!");

      const isScrollable = element.scrollHeight > element.clientHeight;
      if (isScrollable) return;

      handleScroll(e.y);
    },
    [handleScroll],
  );

  useOverScroll(scrollableElementRef, handleScroll);
  useSwipes(scrollableElementRef, handleSwipe);
  useFadeScroll(scrollableElementRef);

  const renderChildren = () => {
    return typeof children === "function"
      ? children({ scrollableElementRef })
      : children;
  };

  return (
    <InfoCard className={classNames(styles.card, cardClassName)}>
      {renderChildren()}
    </InfoCard>
  );
}
