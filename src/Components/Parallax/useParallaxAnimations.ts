import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import globalConfig from "../../global.config.json";
import { RefObject, useRef } from "react";

export type StagedAnimationTweens = {
  [key: string]: { reverse: () => void };
};

export default function useParallaxAnimation(
  containerRef: RefObject<HTMLElement>,
  onAnimationCompleted: () => void,
) {
  const config = globalConfig.parallax.animation;
  const stagedTweens = useRef<StagedAnimationTweens>({});

  useGSAP(async (_, contextSafe) => {
    const timeline = gsap.timeline({
      onComplete: () => {
        onAnimationCompleted();
      },
    });

    const container = containerRef.current!;
    const animatedElements = Array.from(
      document.querySelectorAll<HTMLElement>(".parallax"),
    );
    timeline.from(
      ".dev",
      {
        left: "170%",
        duration: config.textIn.duration,
        ease: config.textIn.ease,
      },
      config.objects.delay + config.objects.duration / 3,
    );
    timeline.from(
      ".name",
      {
        left: "-80%",
        duration: config.textIn.duration,
        ease: config.textIn.ease,
      },
      "<",
    );

    animatedElements
      .filter((el) => !el.classList.contains("text"))
      .filter((el) => !el.dataset.revealStage)
      .forEach((el) => {
        const tween = createTween(container, el);
        timeline.add(tween, "0.3");
      });

    animatedElements
      .filter((el) => el.dataset.revealStage)
      .sort((el1, el2) => +el1.dataset.revealStage! - +el2.dataset.revealStage!)
      .forEach((el, i) => {
        const stageName = el.dataset.revealStageName;
        if (!stageName) {
          console.warn("stage name not set for element", el);
          return;
        }

        const tween = createTween(container, el);
        const position = i === 0 ? ">=-0.5" : ">";
        timeline.add(tween, position);
        stagedTweens.current[stageName] = {
          reverse: contextSafe!(
            () => !tween.reversed() && gsap.timeline().add(tween.reverse()),
          ),
        };
      });
  });

  const createTween = (container: HTMLElement, el: HTMLElement) => {
    const offsetDistanceX = +(el.dataset.revealDistanceX || 0) / 1000;
    const offsetDistanceY = +(el.dataset.revealDistanceY || 0) / 1000;
    const absoluteOffsetX = container.clientWidth * Math.sign(offsetDistanceX);
    const absoluteOffsetY = container.clientHeight * Math.sign(offsetDistanceY);

    const offset: { top?: string; left?: string } = {};
    if (offsetDistanceX) offset.left = `${absoluteOffsetX + offsetDistanceX}px`;
    if (offsetDistanceY) offset.top = `${absoluteOffsetY + offsetDistanceY}px`;

    const speed = (el.dataset.revealSpeed as any as number) || 1;

    return gsap.from(el, {
      ...offset,
      ease: config.objects.ease,
      duration: config.objects.duration / speed,
    });
  };

  return stagedTweens.current;
}
