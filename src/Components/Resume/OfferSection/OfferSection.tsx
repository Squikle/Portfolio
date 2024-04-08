import styles from "./OfferSection.module.scss";
import resumeCardStyles from "../Resume.module.scss";
import classNames from "classnames";
import ResumeCard from "../ResumeCard.tsx";
import { ExperienceLine } from "../ExperienceLine.tsx";
import {
  useCurrentPageContext,
  useCurrentSectionContext,
} from "../../Page/CurrentPageContext/Contexts.tsx";
import options from "./button-emitter-particles.json";
import { adaptParticles } from "../../Particles/retinaAdapter.ts";
import emitter from "./emitter.json";
import Emitters from "../../Particles/Emitters.tsx";
import React, { useEffect, useRef } from "react";
import useLongPress from "../../../hooks/useLongPress.ts";
import { useSwiper } from "swiper/react";
import config from "../../../global.config.json";

type Props = {
  darkBackgroundOpacity: number;
};

export default function OfferSection(offerSectionProps: Props) {
  const backgroundControl = useCurrentPageContext().backgroundControl;
  const top = "50px";
  const buttonRef = useRef<HTMLButtonElement>(null);
  const sectionContext = useCurrentSectionContext();
  const swiper = useSwiper();

  const handlePressAction = () => {
    if (!sectionContext.isActive) return;

    const currentSlide = swiper.activeIndex;

    const scroll = (delay: number) => {
      setTimeout(() => {
        swiper.slidePrev(config.slides.animation.duration * 1000 * 0.8);
      }, delay);
    };

    for (let i = 0; i < currentSlide; i++) {
      scroll(900 * i * 0.8);
    }
  };

  const { onTouchStart: onLongTouchStart, onTouchEnd: onLongTouchEnd } =
    useLongPress(handlePressAction, undefined, {
      delay: config.slides.animation.offerButtonDelay,
    });

  const switchBackground = (opacity: number) => {
    backgroundControl?.setOpacity(opacity);
  };

  const glowOff = () => {
    switchBackground(1);

    if (buttonRef.current) {
      buttonRef.current.classList.toggle(styles.glow, false);
      setTimeout(() => {
        buttonRef.current!.classList.toggle(styles.animated, true);
      }, 1);
    }
  };
  const glowOn = () => {
    switchBackground(offerSectionProps.darkBackgroundOpacity || 1);

    if (buttonRef.current) {
      buttonRef.current.classList.toggle(styles.animated, false);
      setTimeout(() => {
        buttonRef.current!.classList.toggle(styles.glow, true);
      }, 1);
    }
  };

  useEffect(() => {
    const handleOutOfButtonClick = (e: MouseEvent) => {
      if (!sectionContext.isActive) return;
      if (e.target !== buttonRef.current) glowOff();
    };

    window.addEventListener("click", handleOutOfButtonClick);
    return () => window.removeEventListener("click", handleOutOfButtonClick);
  }, [sectionContext]);

  useEffect(() => {
    if (!buttonRef.current) return;

    if (sectionContext.isActive) {
      buttonRef.current.classList.toggle(styles.animated, false);
      buttonRef.current.classList.toggle(styles.animated, true);
    }
  }, [sectionContext.isActive]);

  const handleTouchStart = (
    e:
      | React.MouseEvent<HTMLButtonElement>
      | React.TouchEvent<HTMLButtonElement>,
  ) => {
    glowOn();
    onLongTouchStart(e.nativeEvent);
  };
  const handleTouchEnd = (e: React.MouseEvent<HTMLButtonElement>) => {
    glowOff();
    onLongTouchEnd(e.nativeEvent);
  };
  return (
    <ResumeCard
      cardClassName={classNames(
        styles.layoutCard,
        resumeCardStyles.experienceCard,
      )}
    >
      <ExperienceLine isLast={true} isFirst={false} withDot={false}>
        <div className={styles.container} style={{ top: top }}>
          <ButtonEmitter isActive={sectionContext.isActive}></ButtonEmitter>
          <button
            ref={buttonRef}
            onPointerDown={handleTouchStart}
            onPointerUp={handleTouchEnd}
            className={classNames(styles.button)}
          >
            <p>Let's work together!</p>
          </button>
        </div>
      </ExperienceLine>
    </ResumeCard>
  );
}

const ButtonEmitter = React.memo(({ isActive }: { isActive: boolean }) => {
  const buttonEmitters = [emitter];

  return (
    <div className={styles.particlesContainer}>
      <Emitters
        id={styles["offer-button-particles"]}
        options={adaptParticles(options, {
          width: 100,
          height: 100,
        })}
        isActive={isActive}
        emitters={buttonEmitters}
      />
    </div>
  );
});
