import styles from "./Resume.module.scss";
import classNames from "classnames";
import { ReactNode, useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useSwiper } from "swiper/react";
import { useCurrentSectionContext } from "../Page/CurrentPageContext/Contexts.tsx";
import { ResumeSectionContext } from "../../Pages/LogoPage/types.ts";
import config from "../../global.config.json";

type Props = {
  children?: ReactNode;
  isFirst: boolean;
  isLast: boolean;
  withDot?: boolean;
};

const LINE_HEIGHT_PROP = "--additional-height";

export function ExperienceLine({
  children,
  isFirst,
  isLast,
  withDot = true,
}: Props) {
  const [timeline] = useState<gsap.core.Timeline>(
    gsap.timeline({
      paused: true,
    }),
  );
  const swiper = useSwiper();
  const sectionContext = useCurrentSectionContext<ResumeSectionContext>();
  const lineRef = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP({
    dependencies: [lineRef],
    scope: lineRef,
  });

  useEffect(() => {
    contextSafe(async () => {
      timeline.pause();
      timeline.to(lineRef.current, {
        duration: config.slides.animation.experienceLine.duration,
        [LINE_HEIGHT_PROP]: window.innerHeight,
        ease: config.slides.animation.experienceLine.ease,
      });
    })();
  }, []);

  useEffect(() => {
    const handleNextTransitionStart = async () => {
      if (sectionContext.isActive) {
        await timeline.play();
      }
    };

    const handlePrevTransitionStart = async () => {
      if (sectionContext.isPrev) {
        timeline.reversed(true);
      }
    };

    swiper.on("slideNextTransitionStart", handleNextTransitionStart);
    swiper.on("slidePrevTransitionStart", handlePrevTransitionStart);

    return () => {
      swiper.off("slideNextTransitionStart", handleNextTransitionStart);
      swiper.off("slidePrevTransitionStart", handlePrevTransitionStart);
    };
  }, [sectionContext, timeline, swiper]);

  return (
    <div className={styles.lineContainer}>
      <div
        ref={lineRef}
        className={classNames(styles.line, {
          [styles.lineStart]: isFirst,
          [styles.lineEnd]: isLast,
          [styles.dot]: withDot,
        })}
      >
        {children}
      </div>
    </div>
  );
}
