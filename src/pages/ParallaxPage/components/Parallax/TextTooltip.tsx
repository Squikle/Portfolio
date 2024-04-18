import Tooltip from "@/components/Tooltip/Tooltip.tsx";
import classNames from "classnames";
import tooltipStyles from "@/pages/ParallaxPage/components/Parallax/ParallaxOverlay.module.scss";
import {tooltipRevealStages} from "@/pages/ParallaxPage/hooks/useTooltips.tsx";


export const TextTooltip = () => (
  <Tooltip
    position={"bottom"}
    className={classNames(tooltipStyles.tip, tooltipStyles.tapMe, "parallax")}
    dataProps={{
      "data-speed-x": "0.12",
      "data-speed-y": "0.1",
      "data-speed-z": "0",
      "data-speed-rot-y": "12",
      "data-speed-rot-x": "6",
      "data-reveal-distance-x": "-1",
      "data-reveal-speed": "1",
      "data-reveal-opacity": "-3",
      "data-reveal-stage": "2",
      "data-reveal-stage-name": tooltipRevealStages.TEXT,
    }}
    tailClassName={tooltipStyles.tail}
  >
    <p>Who's that?</p>
  </Tooltip>
);