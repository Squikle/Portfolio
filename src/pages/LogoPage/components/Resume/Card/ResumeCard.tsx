import React, {RefObject, useCallback, useRef} from "react";
import Card from "../../../../../components/Card/Card.tsx";
import classNames from "classnames";
import styles from "./ResumeCard.module.scss";
import useFadeScroll from "../../../../../hooks/useFadeScroll/useFadeScroll.ts";
import useOverScroll from "../../../../../hooks/userControl/useOverScroll.ts";
import {useSwiper} from "swiper/react";
import {useCurrentPageContext} from "../../../../../components/Page/CurrentPageContext/Contexts.tsx";
import useResumeWheelScroll from "../hooks/useResumeWheelScroll.ts";
import useResumeSwipes from "../hooks/useResumeSwipes.ts";
import useResumeScrolledOut from "../hooks/useResumeScrolledOut.ts";
import useResumeScrollReset from "../hooks/useResumeScrollReset.ts";
import config from "../../../../../configs/global.config.json";

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
  const scrolledOut = useResumeScrolledOut(swiper, pageSwiper);

  const slidePrev = useCallback(() => {
    swiper.slidePrev();
    scrolledOut.current = true;
  }, [swiper, scrolledOut.current]);

  const slideNext = useCallback(() => {
    swiper.slideNext();
    scrolledOut.current = true;
  }, [swiper, scrolledOut.current]);

  const handleScroll = useCallback(
    (percentageY: number) => {
      if (scrolledOut.current) return;

      const thresholdY = config.slides.control.customScrollThreshold.y;
      const slides = swiper.slides.length;
      if (percentageY > thresholdY && swiper.activeIndex < slides - 1)
        slideNext();
      else if (percentageY < -thresholdY && swiper.activeIndex > 0) slidePrev();
    },
    [
      swiper.slides.length,
      swiper.activeIndex,
      scrolledOut.current,
      slideNext,
      slidePrev,
    ],
  );

  const scrollableElementRef = useRef<HTMLElement>(null);

  useOverScroll(scrollableElementRef, handleScroll);
  useFadeScroll(scrollableElementRef);
  useResumeScrollReset(scrollableElementRef);
  useResumeSwipes(
    scrollableElementRef,
    scrolledOut,
    slideNext,
    slidePrev,
    handleScroll,
    swiper,
    pageSwiper,
  );
  useResumeWheelScroll(
    scrollableElementRef,
    scrolledOut,
    swiper,
    slideNext,
    slidePrev,
  );

  const renderChildren = () => {
    return typeof children === "function"
      ? children({scrollableElementRef})
      : children;
  };

  return (
    <Card className={classNames(styles.card, cardClassName)}>
      {renderChildren()}
    </Card>
  );
}
