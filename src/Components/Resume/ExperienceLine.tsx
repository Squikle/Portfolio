import styles from "./Resume.module.scss";
import classNames from "classnames";
import { ReactNode, useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useSwiper } from "swiper/react";
import { useCurrentSectionContext } from "../Page/CurrentPageContext/useContexts.ts";

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
  const sectionContext = useCurrentSectionContext();
  const lineRef = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP({
    dependencies: [lineRef],
    scope: lineRef,
  });

  useEffect(() => {
    const handleNextTransitionStart = contextSafe(async () => {
      if (!sectionContext.isActive) return;

      timeline.to(lineRef.current, {
        duration: 2,
        [LINE_HEIGHT_PROP]: window.innerHeight,
        ease: "power3.out",
      });
      await timeline.play();
    });

    const handlePrevTransitionEnd = async () => {
      if (cardIndex) return;
      await timeline.reverse();
    };

    swiper.on("slideNextTransitionStart", handleNextTransitionStart);
    swiper.on("slidePrevTransitionStart", handlePrevTransitionEnd);

    return () => {
      swiper.off("slideNextTransitionStart", handleNextTransitionStart);
      swiper.off("slidePrevTransitionStart", handlePrevTransitionEnd);
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
