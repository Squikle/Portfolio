import Tooltip from "@/components/Tooltip/Tooltip.tsx";
import classNames from "classnames";
import tooltipStyles from "@/pages/ParallaxPage/components/Parallax/ParallaxOverlay.module.scss";
import {tooltipRevealStages} from "@/pages/ParallaxPage/hooks/useTooltips.tsx";

export const MoreTooltip = ({onPointerOver}: { onPointerOver: () => void }) => (
  <Tooltip
    className={classNames(tooltipStyles.tip, tooltipStyles.more, "parallax")}
    dataProps={{
      "data-speed-x": "0.19",
      "data-speed-y": "0.16",
      "data-reveal-distance-y": "100",
      "data-reveal-speed": "1.5",
      "data-reveal-opacity": "-3",
      "data-reveal-stage": "3",
      "data-reveal-stage-name": tooltipRevealStages.MORE,
    }}
    tailClassName={tooltipStyles.tail}
    position={"right-bottom"}
    onPointerOver={onPointerOver}
  >
    <p>Let's Connect!</p>
  </Tooltip>
);