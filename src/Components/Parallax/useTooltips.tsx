import classNames from "classnames";
import Tooltip from "../Tooltip/Tooltip";
import tooltipStyles from "./ParallaxOverlay.module.scss";
import React, { useCallback, useEffect, useReducer, useRef } from "react";
import config from "../../global.config.json";
import { StagedAnimationTimelines } from "./useParallaxAnimations.ts";

type UserInteraction = {
  TextTapFinished: boolean;
  HoverFinished: boolean;
  SwipeDelayFinished: boolean;
};

const defaultUserInteraction: UserInteraction = {
  HoverFinished: false,
  SwipeDelayFinished: false,
  TextTapFinished: false,
};

const reduceUserInteraction = (
  prevState: UserInteraction,
  action: keyof UserInteraction,
): UserInteraction => {
  switch (action) {
    default:
      return { ...prevState, [action]: true };
  }
};

const tooltipRevealStages = {
  HOVER: "hoverTooltip",
  SWIPE: "swipeTooltip",
  TEXT: "textTooltip",
};

export default function useTooltips(timelineControl: StagedAnimationTimelines) {
  const timeout = useRef<NodeJS.Timeout>();
  const [userInteraction, dispatchUserInteraction] = useReducer(
    reduceUserInteraction,
    defaultUserInteraction,
  );
  const userInteractionConfig = config.parallax.userInteraction;

  const hoverCompleted = useCallback(() => {
    dispatchUserInteraction("HoverFinished");
    timelineControl[tooltipRevealStages.HOVER].reverse();
  }, [timelineControl]);

  const swipeCompleted = useCallback(() => {
    dispatchUserInteraction("SwipeDelayFinished");
    timelineControl[tooltipRevealStages.SWIPE].reverse();
  }, [timelineControl]);

  const textTapCompleted = useCallback(() => {
    dispatchUserInteraction("TextTapFinished");
    timelineControl[tooltipRevealStages.TEXT].reverse();
  }, [timelineControl]);

  useEffect(() => {
    setTimeout(swipeCompleted, userInteractionConfig.swipeDelay * 1000);
  }, [userInteractionConfig.swipeDelay]);

  const handleContainerEnter = useCallback(
    (event: React.PointerEvent | React.TouchEvent) => {
      if (
        (event as React.PointerEvent).pointerType === "touch" ||
        timeout.current
      )
        return;

      timeout.current = setTimeout(
        hoverCompleted,
        userInteractionConfig.hovering * 1000,
      );
    },
    [userInteractionConfig.hovering, hoverCompleted],
  );

  const handleContainerLeave = () => {
    if (timeout.current) {
      clearTimeout(timeout.current);
      timeout.current = undefined;
    }
  };

  return {
    tooltips: { InteractiveTooltip, MoreTooltip, TextTooltip },
    onTextClick: textTapCompleted,
    onPointerEnter: handleContainerEnter,
    onTouchStart: handleContainerEnter,
    onPointerLeave: handleContainerLeave,
    onTouchEnd: handleContainerLeave,
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
      "data-reveal-distance-x": "-1",
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
      "data-reveal-stage-name": tooltipRevealStages.SWIPE,
    }}
    tailClassName={tooltipStyles.tail}
    position={"right"}
  >
    <p>There's more!</p>
    <p>Swipe!</p>
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
      "data-reveal-distance-y": "-1",
      "data-reveal-speed": "1",
      "data-reveal-stage": "2",
      "data-reveal-stage-name": tooltipRevealStages.TEXT,
    }}
    tailClassName={tooltipStyles.tail}
  >
    <p>What's that?</p>
  </Tooltip>
);
