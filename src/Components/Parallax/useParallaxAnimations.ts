import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import globalConfig from "../../global.config.json";

export default function useParallaxAnimation(onAnimationCompleted: () => void) {
  const config = globalConfig.parallax.animation;

  useGSAP(() => {
    const container = document.querySelector(".parallax-container")!;
    const elementsToUpdate = Array.from(
      container.querySelectorAll<HTMLElement>(".parallax"),
    );

    const timeline = gsap.timeline({
      onComplete: () => {
        onAnimationCompleted();
        timeline.revert();
      },
    });

    elementsToUpdate.forEach((el) => {
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
        1,
      );
    });
    timeline.from(
      ".dev",
      {
        left: "170%",
        duration: config.textIn.duration,
        ease: config.textIn.ease,
      },
      config.objects.duration,
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
