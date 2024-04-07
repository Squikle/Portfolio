import styles from "./Resume.module.scss";
import classNames from "classnames";
import { ReactNode, useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useSwiper } from "swiper/react";
import { useCurrentSectionContext } from "../Page/CurrentPageContext/Contexts.tsx";
import { ResumeSectionContext } from "../../Pages/LogoPage/types.ts";

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
    const handleNextTransitionStart = contextSafe(async () => {
      if (!sectionContext.isActive) return;

      timeline.to(lineRef.current, {
        duration: 1,
        [LINE_HEIGHT_PROP]: window.innerHeight,
        ease: "power3.out",
      });
      timeline.play();
    });

    const handlePrevTransitionStart = async () => {
      const nextActive = sectionContext.activeIndex - 1;
      console.log(nextActive);

      if (nextActive === sectionContext.index) timeline.reverse();
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
