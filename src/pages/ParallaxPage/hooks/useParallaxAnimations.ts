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
      }
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
        left: "-120%",
        duration: config.textIn.duration,
        ease: config.textIn.ease,
      },
      "<",
    );

    animatedElements
      .filter((el) => el.dataset.revealStage)
      .sort((el1, el2) => +el1.dataset.revealStage! - +el2.dataset.revealStage!)
      .forEach((el, i) => {
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
        const position = i === 0 ? config.objects.delay : ">=-0.8";
        timeline.add(nestedTimeline, position);

        const stagedTween = {
          reverse: contextSafe!(
            () => !tween.reversed() && gsap.timeline().add(tween.reverse()),
          ),
          completed: false,
        };
        stagedTweens.current[stageName] = stagedTween;
      });
  });

  const calcInitialPositionAndStyle = (container: HTMLElement, el: HTMLElement) => {
    const offsetDistanceX = +(el.dataset.revealDistanceX || 0) / 1000;
    const offsetDistanceY = +(el.dataset.revealDistanceY || 0) / 1000;
    const absoluteOffsetX = container.clientWidth * Math.sign(offsetDistanceX);
    const absoluteOffsetY = container.clientHeight * Math.sign(offsetDistanceY);
    const speed = el.dataset.revealSpeed as any as number || 1;
    const opacity = el.dataset.revealOpacity as any as number || 1;

    return {
      x: absoluteOffsetX + offsetDistanceX,
      y: absoluteOffsetY + offsetDistanceY,
      opacity: opacity,
      duration: config.objects.duration / speed,
    };
  };

  const createTwin = (container: HTMLElement, el: HTMLElement) => {
    const initProps = calcInitialPositionAndStyle(container, el);
    const offset: { top?: number; left?: number } = {};
    if (initProps.x) offset.left = initProps.x;
    if (initProps.y) offset.top = initProps.y;

    return gsap.from(el, {
      ...offset,
      opacity: initProps.opacity,
      duration: initProps.duration,
    });
  };

  return stagedTweens.current;
}
