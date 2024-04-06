import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import globalConfig from "../../global.config.json";

export default function useParallaxAnimation() {
  const config = globalConfig.parallax.animation;

  useGSAP(
    () => {
      const timeline = gsap.timeline({
        defaults: {
          clearProps: true,
        },
      });
      timeline.from(".dev", {
        left: "170%",
        duration: config.textIn.duration,
        ease: config.textIn.ease,
        delay: 1,
      });
      timeline.from(
        ".name",
        {
          left: "-80%",
          duration: config.textIn.duration,
          ease: config.textIn.ease,
        },
        "<",
      );
    },
    {
      revertOnUpdate: true,
    },
  );
}
