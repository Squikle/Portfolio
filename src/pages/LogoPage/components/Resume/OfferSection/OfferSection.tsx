import styles from "./OfferSection.module.scss";
import resumeCardStyles from "../Card/ResumeCard.module.scss";
import classNames from "classnames";
import ResumeCard from "../Card/ResumeCard.tsx";
import {ExperienceLine} from "../Card/ExperienceLine.tsx";
import {
  useCurrentPageContext,
  useCurrentSectionContext,
} from "../../../../../components/Page/CurrentPageContext/Contexts.tsx";
import options from "../../../../../configs/button-emitter-particles.json";
import {adaptEmitter, adaptParticles,} from "../../../../../components/Particles/retinaAdapter.ts";
import emitter from "./emitter.json";
import Emitters from "../../../../../components/Particles/Emitters.tsx";
import React, {useCallback, useEffect, useRef} from "react";
import useLongPress from "../../../../../hooks/userControl/useLongPress.ts";
import {useSwiper} from "swiper/react";
import config from "../../../../../configs/global.config.json";
import {useAnalytics} from "../../../../../components/Analytics/AnalyticsContext.tsx";
import {EventActions, EventCategories,} from "../../../../../hooks/useAnalytics.ts";

type Props = {
  darkBackgroundOpacity: number;
};

type HoldTextRef = {
  element: HTMLElement,
  timeout?: NodeJS.Timeout
}

export default function OfferSection(offerSectionProps: Props) {
  const backgroundControl = useCurrentPageContext().backgroundControl;
  const top = "50px";
  const buttonRef = useRef<HTMLButtonElement>(null);
  const holdTextRef = useRef<HoldTextRef | null>(null);
  const sectionContext = useCurrentSectionContext();
  const swiper = useSwiper();
  const analytics = useAnalytics();

  const setHoldTextRef = useCallback((el: HTMLElement) => {
    holdTextRef.current = {
      element: el
    }
  }, [])

  const handlePressAction = () => {
    if (!sectionContext.isActive) return;

    analytics.pushEvent(
      EventCategories.button,
      EventActions.click,
      "WorkTogether",
    );
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

  const {onTouchStart: onLongTouchStart, onTouchEnd: onLongTouchEnd} =
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

  const handleTouchStart = (e: React.PointerEvent) => {
    glowOn();
    if (e.pointerType === "mouse") handlePressAction();
    else {
      if (holdTextRef.current) {
        clearTimeout(holdTextRef.current.timeout);
        holdTextRef.current?.element.classList.toggle(styles.active, true)
      }
      console.log(holdTextRef)
      analytics.pushEvent(
        EventCategories.button,
        EventActions.startHold,
        "WorkTogether",
      );
      onLongTouchStart(e.nativeEvent);
    }
  };
  const handleTouchEnd = (e: React.TouchEvent<HTMLButtonElement>) => {
    if (holdTextRef.current) {
      clearTimeout(holdTextRef.current.timeout);
      holdTextRef.current.timeout = setTimeout(() => holdTextRef.current?.element.classList.toggle(styles.active, false), 500);
    }

    glowOff();
    onLongTouchEnd(e.nativeEvent);
  };
  const handlePointerOver = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse") glowOn();
  };
  return (
    <ResumeCard
      cardClassName={classNames(
        styles.layoutCard,
        resumeCardStyles.experienceCard,
      )}
    >
      <ExperienceLine isLast={true} isFirst={false} withDot={false}>
        <div className={styles.container} style={{top: top}}>
          <ButtonEmitter isActive={sectionContext.isActive}></ButtonEmitter>
          <button
            ref={buttonRef}
            onPointerDown={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onPointerOver={handlePointerOver}
            onMouseLeave={glowOff}
            className={classNames(styles.button)}
          >
            <p>Let's work together!</p>
            <p ref={(el) => {
              setHoldTextRef(el as HTMLElement)
            }} className={styles.holdText}>Hold it!</p>
          </button>
        </div>
      </ExperienceLine>
    </ResumeCard>
  );
}

const ButtonEmitter = React.memo(({isActive}: { isActive: boolean }) => {
  const buttonEmitters = [adaptEmitter(emitter)];

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
