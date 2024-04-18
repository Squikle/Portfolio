import Tooltip from "@/components/Tooltip/Tooltip.tsx";
import classNames from "classnames";
import tooltipStyles from "@/pages/ParallaxPage/components/Parallax/ParallaxOverlay.module.scss";
import {tooltipRevealStages} from "@/pages/ParallaxPage/hooks/useTooltips.tsx";


export const InteractiveTooltip = ({onPointerOver}: { onPointerOver: () => void }) => (
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
      "data-reveal-opacity": "-3",
      "data-reveal-stage": "1",
      "data-reveal-stage-name": tooltipRevealStages.HOVER,
    }}
    onPointerOver={onPointerOver}
  >
    <p>It's interactive</p>
    <p>Slide over the screen!</p>
  </Tooltip>
);