import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import globalConfig from "../../global.config.json";
import { RefObject, useRef } from "react";

export type StagedAnimationTimelines = {
  [key: string]: { timeline: gsap.core.Timeline; reverse: () => void };
};

export default function useParallaxAnimation(
  containerRef: RefObject<HTMLElement>,
  onAnimationCompleted: () => void,
) {
  const config = globalConfig.parallax.animation;
  const stagesTimeline = useRef<StagedAnimationTimelines>({});

  const { contextSafe } = useGSAP(() => {
    const timeline = gsap.timeline({
      onComplete: onAnimationCompleted,
    });

    const container = containerRef.current!;
    const animatedElements = Array.from(
      container.parentNode!.querySelectorAll<HTMLElement>(".parallax"),
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
        const stagedTimeline = gsap.timeline({ id: stageName, paused: true });

        stagesTimeline.current[stageName] = {
          timeline: stagedTimeline,
          reverse: contextSafe(() => {
            stagedTimeline.reverse();
          }),
        };
        runAnimation(container, el, stagedTimeline!, ">");
        timeline.add(stagedTimeline.tweenTo(2), "<=+1");
      });

    animatedElements
      .filter((el) => !el.classList.contains("text"))
      .filter((el) => !el.dataset.revealStage)
      .forEach((el) =>
        runAnimation(container, el, timeline, config.objects.delay),
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
  });

  const runAnimation = (
    container: HTMLElement,
    el: HTMLElement,
    timeline: gsap.core.Timeline,
    delay: number | string,
  ) => {
    const offsetDistanceX = +(el.dataset.revealDistanceX || 0) / 1000;
    const offsetDistanceY = +(el.dataset.revealDistanceY || 0) / 1000;
    const absoluteOffsetX = container.clientWidth * Math.sign(offsetDistanceX);
    const absoluteOffsetY = container.clientHeight * Math.sign(offsetDistanceY);

    const offset: { top?: string; left?: string } = {};
    if (offsetDistanceX) offset.left = `${absoluteOffsetX + offsetDistanceX}px`;
    if (offsetDistanceY) offset.top = `${absoluteOffsetY + offsetDistanceY}px`;

    const speed = (el.dataset.revealSpeed as any as number) || 1;

    timeline.from(
      el,
      {
        ...offset,
        ease: config.objects.ease,
        duration: config.objects.duration / speed,
      },
      delay,
    );
  };

  return stagesTimeline.current;
}
