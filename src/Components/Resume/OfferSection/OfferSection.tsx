import styles from "./OfferSection.module.scss";
import resumeCardStyles from "../Resume.module.scss";
import PageSection, { PageSectionProps } from "../../Page/PageSection";
import classNames from "classnames";
import ResumeCard from "../ResumeCard.tsx";
import { ExperienceLine } from "../ExperienceLine.tsx";
import { useCurrentPageContext } from "../../Page/CurrentPageContext/Contexts.tsx";
import options from "./button-emitter-particles.json";
import { adaptParticles } from "../../Particles/retinaAdapter.ts";
import emitter from "./emitter.json";
import Emitters from "../../Particles/Emitters.tsx";
import React from "react";

type Props = {
  darkBackgroundOpacity: number;
};

export default function OfferSection(
  pageSectionProps: Omit<PageSectionProps<{}>, "index"> & Props,
) {
  const backgroundControl = useCurrentPageContext().backgroundControl;
  const top = "50px";

  const switchBackground = (opacity: number) => {
    backgroundControl?.setOpacity(opacity);
  };

  return (
    <PageSection index={0} {...pageSectionProps}>
      <ResumeCard
        cardClassName={classNames(
          styles.layoutCard,
          resumeCardStyles.experienceCard,
        )}
      >
        <ExperienceLine isLast={true} isFirst={false} withDot={false}>
          <div className={styles.container} style={{ top: top }}>
            <ButtonEmitter isActive={pageSectionProps.isActive}></ButtonEmitter>
            <button
              onMouseOver={() =>
                switchBackground(pageSectionProps.darkBackgroundOpacity || 1)
              }
              onMouseLeave={() => switchBackground(1)}
              style={{ top: top }}
              className={styles.button}
            >
              <p>Offer a Job</p>
            </button>
          </div>
        </ExperienceLine>
      </ResumeCard>
    </PageSection>
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
