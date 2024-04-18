import styles from "./ResumeCard.module.scss";
import classNames from "classnames";
import {ReactNode, useEffect, useRef} from "react";
import {useGSAP} from "@gsap/react";
import gsap from "gsap";
import {useSwiper} from "swiper/react";
import {useCurrentSectionContext} from "../../../../../components/Page/CurrentPageContext/Contexts.tsx";
import {ResumeSectionContext} from "../../../types.ts";
import config from "../../../../../configs/global.config.json";

type Props = {
  children?: ReactNode;
  isFirst: boolean;
  isLast: boolean;
  withDot?: boolean;
  height?: number;
};

const LINE_HEIGHT_PROP = "--additional-height";

export function ExperienceLine({
  children,
  isFirst,
  isLast,
  withDot = true,
}: Props) {
  const timeline = useRef<gsap.core.Timeline>(
    gsap.timeline({
      paused: true,
    }),
  );
  const swiper = useSwiper();
  const currentSectionContext =
    useCurrentSectionContext<ResumeSectionContext>();
  const {isActive, isPrev} = currentSectionContext;
  const lineRef = useRef<HTMLDivElement>(null);

  const {contextSafe} = useGSAP(
    async () => {
      timeline.current.to(lineRef.current, {
        duration: config.slides.animation.experienceLine.duration,
        [LINE_HEIGHT_PROP]: window.innerHeight,
        ease: config.slides.animation.experienceLine.ease,
        yoyoEase: true,
      });
    },
    {
      dependencies: [lineRef, window.innerHeight],
      revertOnUpdate: true,
    },
  );

  useEffect(() => {
    const handleNextTransitionStart = async () =>
      isActive && contextSafe(async () => await timeline.current.play())();
    const handlePrevTransitionStart = async () =>
      isPrev && contextSafe(async () => await timeline.current.reverse())();

    swiper.on("slideNextTransitionStart", handleNextTransitionStart);
    swiper.on("slidePrevTransitionStart", handlePrevTransitionStart);

    return () => {
      swiper.off("slideNextTransitionStart", handleNextTransitionStart);
      swiper.off("slidePrevTransitionStart", handlePrevTransitionStart);
    };
  }, [currentSectionContext, timeline, swiper]); //todo: why doesn't work without currentSectionContext?

  return (
    <div className={styles.lineContainer}>
      <div
        ref={lineRef}
        className={classNames(styles.line, {
          [styles.lineStart]: isFirst,
          [styles.lineEnd]: isLast,
          [styles.dot]: withDot,
          [styles.active]: isActive,
        })}
      >
        {children}
      </div>
    </div>
  );
}
