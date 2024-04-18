import React, {useCallback, useEffect, useRef} from "react";
import config from "../../../configs/global.config.json";
import {StagedAnimationTweens} from "./useParallaxAnimations.ts";
import {useSwiper} from "swiper/react";
import {MoreTooltip} from "@/pages/ParallaxPage/components/Parallax/MoreTooltip.tsx";
import {InteractiveTooltip} from "@/pages/ParallaxPage/components/Parallax/InteractiveTooltip.tsx";
import {TextTooltip} from "@/pages/ParallaxPage/components/Parallax/TextTooltip.tsx";

export const tooltipRevealStages = {
  HOVER: "hoverTooltip",
  MORE: "moreTooltip",
  TEXT: "textTooltip",
};

export default function useTooltips(tweens: StagedAnimationTweens) {
  const swiper = useSwiper();

  const timeout = useRef<NodeJS.Timeout>();
  const userInteractionConfig = config.parallax.userInteraction;

  const handleContainerPointerDown = useCallback((e: React.PointerEvent) => {
    console.log(e.target)
    e.target.releasePointerCapture(e.pointerId);
  }, []);

  const hoverCompleted = useCallback(() => {
    const hoverTween = tweens[tooltipRevealStages.HOVER];
    hoverTween.completed && hoverTween.reverse();
  }, [tweens]);

  const moreCompleted = useCallback(() => {
    const moreTween = tweens[tooltipRevealStages.MORE];
    moreTween.reverse();
  }, [tweens]);

  const textTapCompleted = useCallback(() => {
    const textTween = tweens[tooltipRevealStages.TEXT];
    textTween.completed && textTween.reverse();
  }, [tweens]);

  useEffect(() => {
    const timeout = setTimeout(
      moreCompleted,
      userInteractionConfig.swipeDelay * 1000,
    );
    return () => clearTimeout(timeout);
  }, [userInteractionConfig.swipeDelay]);

  useEffect(() => {
    swiper.on("slideChangeTransitionStart", moreCompleted);
    return () => swiper.off("slideChangeTransitionStart", moreCompleted);
  }, [swiper, moreCompleted]);

  const handleContainerEnter = useCallback(
    (delaySeconds: number, event: React.PointerEvent | React.TouchEvent) => {
      if (
        (event as React.PointerEvent).pointerType === "touch" ||
        timeout.current ||
        !tweens[tooltipRevealStages.HOVER].completed
      )
        return;

      timeout.current = setTimeout(hoverCompleted, delaySeconds * 1000);
    },
    [hoverCompleted, tweens],
  );

  const handleContainerPointerMove = useCallback(
    (event: React.PointerEvent) => {
      if (timeout.current || !tweens[tooltipRevealStages.HOVER].completed)
        return;

      const delaySeconds =
        event.pointerType === "mouse"
          ? userInteractionConfig.hoveringMouse
          : userInteractionConfig.hoveringTouch;

      timeout.current = setTimeout(hoverCompleted, delaySeconds * 1000);
    },
    [
      tweens,
      userInteractionConfig.hoveringTouch,
      userInteractionConfig.hoveringMouse,
      hoverCompleted,
    ],
  );

  const handleContainerLeave = () => {
    if (timeout.current) {
      clearTimeout(timeout.current);
      timeout.current = undefined;
    }
  };

  const handlePointerEnter = useCallback(
    (e: React.PointerEvent) =>
      handleContainerEnter(userInteractionConfig.hoveringMouse, e),
    [handleContainerEnter, userInteractionConfig.hoveringMouse],
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) =>
      handleContainerEnter(userInteractionConfig.hoveringTouch, e),
    [handleContainerEnter, userInteractionConfig.hoveringTouch],
  );

  const InteractiveTooltipWithProps = useCallback(
    () => <InteractiveTooltip onPointerOver={hoverCompleted}/>,
    [hoverCompleted],
  );

  const MoreTooltipWithProps = useCallback(
    () => <MoreTooltip onPointerOver={moreCompleted}/>,
    [moreCompleted],
  );

  return {
    tooltips: {
      InteractiveTooltip: InteractiveTooltipWithProps,
      MoreTooltip: MoreTooltipWithProps,
      TextTooltip,
    },
    onTextClick: textTapCompleted,
    onPointerEnter: handlePointerEnter,
    onPointerMove: handleContainerPointerMove,
    onTouchStart: handleTouchStart,
    onPointerLeave: handleContainerLeave,
    onTouchEnd: handleContainerLeave,
    onTextPointerEnter: textTapCompleted,
    onContainerPointerDown: handleContainerPointerDown
  };
}
