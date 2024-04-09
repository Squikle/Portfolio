import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import globalConfig from "../../global.config.json";

export default function useParallaxAnimation(onAnimationCompleted: () => void) {
  const config = globalConfig.parallax.animation;

  useGSAP(() => {
    const container = document.querySelector(".parallax-container")!;
    const animatedElements = Array.from(
      document.querySelectorAll<HTMLElement>(".parallax"),
    );

    const timeline = gsap.timeline({
      onComplete: () => {
        onAnimationCompleted();
        timeline.revert();
      },
    });

    const runAnimation = (el: HTMLElement, delay: number | string) => {
      const offsetDistanceX = +(el.dataset.revealDistanceX || 0) / 1000;
      const offsetDistanceY = +(el.dataset.revealDistanceY || 0) / 1000;
      const absoluteOffsetX =
        container.clientWidth * Math.sign(offsetDistanceX);
      const absoluteOffsetY =
        container.clientHeight * Math.sign(offsetDistanceY);

      const offset: { top?: string; left?: string } = {};
      if (offsetDistanceX)
        offset.left = `${absoluteOffsetX + offsetDistanceX}px`;
      if (offsetDistanceY)
        offset.top = `${absoluteOffsetY + offsetDistanceY}px`;

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

    animatedElements
      .filter((el) => !el.classList.contains("text"))
      .filter((el) => !el.dataset.revealStage)
      .forEach((el) => runAnimation(el, config.objects.delay));
    animatedElements
      .filter((el) => el.dataset.revealStage)
      .sort((el1, el2) => +el1.dataset.revealStage! - +el2.dataset.revealStage!)
      .forEach((el, i) => {
        const delay = i === 0 ? config.objects.delay + 1 : ">";
        runAnimation(el, delay);
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
  });
}
