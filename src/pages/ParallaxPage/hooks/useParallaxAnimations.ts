import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import globalConfig from "../../../configs/global.config.json";
import { RefObject, useRef } from "react";

export type StagedAnimationTweens = {
  [key: string]: {
    reverse: () => void;
    completed: boolean;
  };
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
        timeline.revert();
      },
      defaults: {
        ease: "power3.inOut",
      },
    });

    const container = containerRef.current!;
    const animatedElements = Array.from(
      document.querySelectorAll<HTMLElement>(".parallax"),
    );

    animatedElements
      .filter((el) => !el.classList.contains("text"))
      .filter((el) => !el.dataset.revealStage)
      .forEach((el) => {
        const tween = createTwin(container, el);
        timeline.add(tween, "0.3");
      });

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
      .filter((el) => el.dataset.revealStage)
      .sort((el1, el2) => +el1.dataset.revealStage! - +el2.dataset.revealStage!)
      .forEach((el) => {
        const stageName = el.dataset.revealStageName;
        if (!stageName) {
          console.warn("stage name not set for element", el);
          return;
        }

        const tween = createTwin(container, el);

        const nestedTimeline = gsap
          .timeline({
            onComplete: () => {
              stagedTween.completed = true;
            },
          })
          .add(tween);
        timeline.add(nestedTimeline, ">=-0.5");

        const stagedTween = {
          reverse: contextSafe!(
            () => !tween.reversed() && gsap.timeline().add(tween.reverse()),
          ),
          completed: false,
        };
        stagedTweens.current[stageName] = stagedTween;
      });
  });

  const calcInitialPosition = (container: HTMLElement, el: HTMLElement) => {
    const offsetDistanceX = +(el.dataset.revealDistanceX || 0) / 1000;
    const offsetDistanceY = +(el.dataset.revealDistanceY || 0) / 1000;
    const absoluteOffsetX = container.clientWidth * Math.sign(offsetDistanceX);
    const absoluteOffsetY = container.clientHeight * Math.sign(offsetDistanceY);
    const speed = (el.dataset.revealSpeed as any as number) || 1;

    return {
      x: absoluteOffsetX + offsetDistanceX,
      y: absoluteOffsetY + offsetDistanceY,
      duration: config.objects.duration / speed,
    };
  };

  const createTwin = (container: HTMLElement, el: HTMLElement) => {
    const initPos = calcInitialPosition(container, el);
    const offset: { top?: number; left?: number } = {};
    if (initPos.x) offset.left = initPos.x;
    if (initPos.y) offset.top = initPos.y;

    return gsap.from(el, {
      ...offset,
      duration: initPos.duration,
    });
  };

  return stagedTweens.current;
}
