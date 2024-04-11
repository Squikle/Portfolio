import classNames from "classnames";
import Tooltip from "../../../components/Tooltip/Tooltip";
import tooltipStyles from "../components/Parallax/ParallaxOverlay.module.scss";
import React, { useCallback, useEffect, useRef } from "react";
import config from "../../../configs/global.config.json";
import { StagedAnimationTweens } from "./useParallaxAnimations.ts";
import { useSwiper } from "swiper/react";

const tooltipRevealStages = {
  HOVER: "hoverTooltip",
  MORE: "moreTooltip",
  TEXT: "textTooltip",
};

export default function useTooltips(tweens: StagedAnimationTweens) {
  const swiper = useSwiper();

  const timeout = useRef<NodeJS.Timeout>();
  const userInteractionConfig = config.parallax.userInteraction;

  const hoverCompleted = useCallback(() => {
    tweens[tooltipRevealStages.HOVER].reverse();
  }, [tweens]);

  const moreCompleted = useCallback(() => {
    tweens[tooltipRevealStages.MORE].reverse();
  }, [tweens]);

  const textTapCompleted = useCallback(() => {
    tweens[tooltipRevealStages.TEXT].reverse();
  }, [tweens]);

  useEffect(() => {
    setTimeout(moreCompleted, userInteractionConfig.swipeDelay * 1000);
  }, [userInteractionConfig.swipeDelay]);

  useEffect(() => {
    swiper.on("slideChangeTransitionStart", moreCompleted);
    return () => swiper.off("slideChangeTransitionStart", moreCompleted);
  }, [swiper, moreCompleted]);

  const handleContainerEnter = useCallback(
    (delaySeconds: number, event: React.PointerEvent | React.TouchEvent) => {
      if (
        (event as React.PointerEvent).pointerType === "touch" ||
        timeout.current
      )
        return;

      timeout.current = setTimeout(hoverCompleted, delaySeconds * 1000);
    },
    [hoverCompleted],
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

  return {
    tooltips: { InteractiveTooltip, MoreTooltip, TextTooltip },
    onTextClick: textTapCompleted,
    onPointerEnter: handlePointerEnter,
    onTouchStart: handleTouchStart,
    onPointerLeave: handleContainerLeave,
    onTouchEnd: handleContainerLeave,
    onTextPointerEnter: textTapCompleted,
  };
}

const InteractiveTooltip = () => (
  <Tooltip
    className={classNames(
      tooltipStyles.tip,
      tooltipStyles.interactive,
      "parallax",
    )}
    dataProps={{
      "data-speed-x": "0.19",
      "data-speed-y": "0.16",
      "data-reveal-distance-y": "-1",
      "data-reveal-speed": "1",
      "data-reveal-stage": "1",
      "data-reveal-stage-name": tooltipRevealStages.HOVER,
    }}
  >
    <p>It's interactive!</p>
    <p>Hover the screen!</p>
  </Tooltip>
);

const MoreTooltip = () => (
  <Tooltip
    className={classNames(tooltipStyles.tip, tooltipStyles.more, "parallax")}
    dataProps={{
      "data-speed-x": "0.19",
      "data-speed-y": "0.16",
      "data-reveal-distance-x": "1",
      "data-reveal-speed": "1",
      "data-reveal-stage": "3",
      "data-reveal-stage-name": tooltipRevealStages.MORE,
    }}
    tailClassName={tooltipStyles.tail}
    position={"right-bottom"}
  >
    <p>There's more!</p>
    <p>Click!</p>
  </Tooltip>
);

const TextTooltip = () => (
  <Tooltip
    position={"bottom"}
    className={classNames(tooltipStyles.tip, tooltipStyles.tapMe, "parallax")}
    dataProps={{
      "data-speed-x": "0.19",
      "data-speed-y": "0.16",
      "data-speed-rot-y": "16",
      "data-speed-rot-x": "8",
      "data-reveal-distance-x": "-1",
      "data-reveal-speed": "1",
      "data-reveal-stage": "2",
      "data-reveal-stage-name": tooltipRevealStages.TEXT,
    }}
    tailClassName={tooltipStyles.tail}
  >
    <p>Who's that?</p>
  </Tooltip>
);
