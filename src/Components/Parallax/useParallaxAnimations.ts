import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import globalConfig from "../../global.config.json";
import { CustomEase } from "gsap/dist/CustomEase";
gsap.registerPlugin(CustomEase);

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
      const offsetDistanceX = +(el.dataset.revealDistanceX || 0) / 100;
      const offsetDistanceY = +(el.dataset.revealDistanceY || 0) / 100;
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
      let easeMode: gsap.EaseString | gsap.EaseFunction;
      switch (el.dataset.revealEase) {
        case "bounce":
          easeMode = easePresets.softBounce;
          break;
        default:
          easeMode = config.objects.ease;
      }

      timeline.from(
        el,
        {
          ...offset,
          ease: easeMode || config.objects.ease,
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
      "2",
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

const easePresets = {
  softBounce: CustomEase.create(
    "custom",
    "M0,0 C0,0 0.081,0.364 0.225,0.619 0.369,0.873 0.575,1.018 0.683,1.018 0.765,1.018 0.726,1.013 0.8,1 0.873,0.987 1,1 1,1 ",
  ),
  powerInOut: CustomEase.create(
    "custom",
    "M0,0 C0.012,-0.032 0.155,-0.008 0.341,0.199 0.498,0.375 0.57,0.644 0.611,0.735 0.659,0.841 0.704,1 1,1 ",
  ),
};
