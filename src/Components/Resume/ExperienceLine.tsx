import styles from "./Resume.module.scss";
import classNames from "classnames";
import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useSwiper } from "swiper/react";
import { useCurrentSectionContext } from "../Page/CurrentPageContext/useContexts.ts";

type Props = {
  children?: ReactNode;
  isFirst: boolean;
  isLast: boolean;
  length?: string;
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
  const lineRef = useRef<HTMLDivElement | null>(null);
  const [lineTopOffset, setLineTopOffset] = useState<number>();
  const handleLineRect = useCallback((line: HTMLDivElement) => {
    if (!line) return;

    lineRef.current = line;
    const rect = line?.getBoundingClientRect();
    setLineTopOffset(line.offsetTop - rect?.top);
  }, []);

  const { contextSafe } = useGSAP({
    dependencies: [lineRef],
    scope: lineRef,
  });

  useEffect(() => {
    const handleNextTransitionStart = contextSafe(async () => {
      if (!sectionContext.isActive) return;

      timeline.to(lineRef.current, {
        duration: 1,
        [LINE_HEIGHT_PROP]: window.innerHeight,
      });
      await timeline.play();
    });

    const handlePrevTransitionEnd = async () => {
      if (sectionContext.isActive) return;

      console.log(lineRef.current);
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
        ref={handleLineRect}
        className={classNames(styles.line, {
          [styles.lineStart]: isFirst,
          [styles.lineEnd]: isLast,
          [styles.dot]: withDot,
        })}
      >
        <div className={styles.ending}>{children}</div>
      </div>
    </div>
  );
}
