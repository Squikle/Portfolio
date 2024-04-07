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

type Props = {
  darkBackgroundOpacity: number;
};

export default function OfferSection(offerSectionProps: Props) {
  const backgroundControl = useCurrentPageContext().backgroundControl;
  const top = "50px";
  const buttonRef = useRef<HTMLButtonElement>(null);
  const sectionContext = useCurrentSectionContext();

  const switchBackground = (opacity: number) => {
    backgroundControl?.setOpacity(opacity);
  };

  const lightOff = () =>
    switchBackground(offerSectionProps.darkBackgroundOpacity || 1);
  const lightOn = () => switchBackground(1);

  useEffect(() => {
    const handleOutOfButtonClick = (e: MouseEvent) => {
      if (!sectionContext.isActive) return;
      if (e.target !== buttonRef.current) lightOn();
    };

    window.addEventListener("click", handleOutOfButtonClick);
    return () => window.removeEventListener("click", handleOutOfButtonClick);
  }, [sectionContext]);

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
            onMouseOver={lightOff}
            onMouseLeave={lightOn}
            style={{ top: top }}
            className={styles.button}
          >
            <p>Offer a Job</p>
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
