import React, { RefObject, useCallback, useEffect, useRef } from "react";
import InfoCard from "../TextCard/InfoCard";
import classNames from "classnames";
import styles from "./Resume.module.scss";
import useFadeScroll from "../../hooks/FadeScroll/useFadeScroll.ts";
import useOverScroll from "../../hooks/useOverScroll.ts";
import { useSwiper } from "swiper/react";
import { Delta, useSwipes } from "../../hooks/useSwipes.ts";
import { useCurrentPageContext } from "../Page/CurrentPageContext/useContexts.ts";

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
  const pageSwiper = useCurrentPageContext().swiper;

  let scrolledOut = false;
  useEffect(() => {
    if (!swiper) return;
    const handleTransitionEnd = () => {
      scrolledOut = false;
    };

    swiper.on("transitionEnd", handleTransitionEnd);
    pageSwiper?.on("transitionEnd", handleTransitionEnd);
    return () => {
      swiper.off("transitionEnd", handleTransitionEnd);
      pageSwiper?.off("transitionEnd", handleTransitionEnd);
    };
  }, [swiper]);

  const handleScroll = useCallback(
    (percentageY: number) => {
      if (scrolledOut) return;

      const thresholdY = 12.5;
      if (
        percentageY > thresholdY &&
        swiper.activeIndex < swiper.slides.length - 1
      ) {
        swiper?.slideNext();
        scrolledOut = true;
      } else if (percentageY < -thresholdY && swiper.activeIndex > 0) {
        swiper?.slidePrev();
        scrolledOut = true;
      }
    },
    [scrolledOut, swiper, swiper.slides.length],
  );

  const handleSwipeX = useCallback(
    (percentageX: number, percentageY: number) => {
      if (!pageSwiper) return;
      if (scrolledOut) return;
      if (Math.abs(percentageY) > 5) return;

      const thresholdX = 12.5;
      if (
        percentageX > thresholdX &&
        pageSwiper.activeIndex < pageSwiper.slides.length - 1
      ) {
        pageSwiper?.slideNext();
        scrolledOut = true;
      } else if (percentageX < -thresholdX && pageSwiper.activeIndex > 0) {
        pageSwiper?.slidePrev();
        scrolledOut = true;
      }
    },
    [pageSwiper, scrolledOut],
  );

  const scrollableElementRef = useRef<HTMLElement>(null);

  const handleSwipe = useCallback(
    (e: Delta) => {
      const element = scrollableElementRef.current;
      if (!element) throw new Error("Scrollable element ref must be set!");

      const isScrollable = element.scrollHeight > element.clientHeight;
      if (!isScrollable) handleScroll(e.y);
      handleSwipeX(e.x, e.y);
    },
    [handleScroll, handleSwipeX],
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
