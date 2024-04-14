import sky3 from "../../../../../assets/layers-mid/9-3-sky.webp";
import sky3Low from "../../../../../assets/layers-low/9-3-sky.webp";
import sky2 from "../../../../../assets/layers-mid/9-2-sky.webp";
import sky2Low from "../../../../../assets/layers-low/9-2-sky.webp";
import sky1 from "../../../../../assets/layers-mid/9-1-sky.webp";
import sky1Low from "../../../../../assets/layers-low/9-1-sky.webp";
import trace from "../../../../../assets/layers-mid/8-0-trace.webp";
import traceLow from "../../../../../assets/layers-low/8-0-trace.webp";
import left9 from "../../../../../assets/layers-mid/7-9-left.webp";
import left9Low from "../../../../../assets/layers-low/7-9-left.webp";
import left8 from "../../../../../assets/layers-mid/7-8-left.webp";
import left8Low from "../../../../../assets/layers-low/7-8-left.webp";
import left7 from "../../../../../assets/layers-mid/7-7-left.webp";
import left7Low from "../../../../../assets/layers-low/7-7-left.webp";
import left6 from "../../../../../assets/layers-mid/7-6-left.webp";
import left6Low from "../../../../../assets/layers-low/7-6-left.webp";
import left5 from "../../../../../assets/layers-mid/7-5-left.webp";
import left5Low from "../../../../../assets/layers-low/7-5-left.webp";
import left4 from "../../../../../assets/layers-mid/7-4-left.webp";
import left4Low from "../../../../../assets/layers-low/7-4-left.webp";
import left3 from "../../../../../assets/layers-mid/7-3-left.webp";
import left3Low from "../../../../../assets/layers-low/7-3-left.webp";
import left2 from "../../../../../assets/layers-mid/7-2-left.webp";
import left2Low from "../../../../../assets/layers-low/7-2-left.webp";
import raysLeft from "../../../../../assets/layers-mid/7-1-rays-left.webp";
import fogLeft from "../../../../../assets/layers-mid/7-0-fog-left.webp";
import right11 from "../../../../../assets/layers-mid/6-11-right.webp";
import right11Low from "../../../../../assets/layers-low/6-11-right.webp";
import right10 from "../../../../../assets/layers-mid/6-10-right.webp";
import right10Low from "../../../../../assets/layers-low/6-10-right.webp";
import right9 from "../../../../../assets/layers-mid/6-9-right.webp";
import right9Low from "../../../../../assets/layers-low/6-9-right.webp";
import right8 from "../../../../../assets/layers-mid/6-8-right.webp";
import right8Low from "../../../../../assets/layers-low/6-8-right.webp";
import right7 from "../../../../../assets/layers-mid/6-7-right.webp";
import right7Low from "../../../../../assets/layers-low/6-7-right.webp";
import fogRight6 from "../../../../../assets/layers-mid/6-6-fog-right.webp";
import right5 from "../../../../../assets/layers-mid/6-5-right.webp";
import right5Low from "../../../../../assets/layers-low/6-5-right.webp";
import right4 from "../../../../../assets/layers-mid/6-4-right.webp";
import right4Low from "../../../../../assets/layers-low/6-4-right.webp";
import right3 from "../../../../../assets/layers-mid/6-3-right.webp";
import right3Low from "../../../../../assets/layers-low/6-3-right.webp";
import right2 from "../../../../../assets/layers-mid/6-2-right.webp";
import right2Low from "../../../../../assets/layers-low/6-2-right.webp";
import right1 from "../../../../../assets/layers-mid/6-1-right.webp";
import right1Low from "../../../../../assets/layers-low/6-1-right.webp";
import fogRight0 from "../../../../../assets/layers-mid/6-0-fog-right.webp";
import middle5 from "../../../../../assets/layers-mid/5-5-middle.webp";
import middle5Low from "../../../../../assets/layers-low/5-5-middle.webp";
import middle4 from "../../../../../assets/layers-mid/5-4-middle.webp";
import middle4Low from "../../../../../assets/layers-low/5-4-middle.webp";
import fogMiddleLow from "../../../../../assets/layers-low/5-3-fog-middle.webp";
import middle2 from "../../../../../assets/layers-mid/5-2-middle.webp";
import middle2Low from "../../../../../assets/layers-low/5-2-middle.webp";
import middle1 from "../../../../../assets/layers-mid/5-1-middle.webp";
import middle1Low from "../../../../../assets/layers-low/5-1-middle.webp";
import middle0 from "../../../../../assets/layers-mid/5-0-middle.webp";
import middle0Low from "../../../../../assets/layers-low/5-0-middle.webp";
import buildingsFront from "../../../../../assets/layers-mid/4-0-buildings-front.webp";
import buildingsFrontLow from "../../../../../assets/layers-low/4-0-buildings-front.webp";
import water from "../../../../../assets/layers-mid/3-3-water.webp";
import waterLow from "../../../../../assets/layers-low/3-3-water.webp";
import waterYacht from "../../../../../assets/layers-mid/3-2-water-yacht.webp";
import waterYachtLow from "../../../../../assets/layers-low/3-2-water-yacht.webp";
import waterBoatRight from "../../../../../assets/layers-mid/3-1-water-boat-right.webp";
import waterBoatRightLow from "../../../../../assets/layers-low/3-1-water-boat-right.webp";
import waterBoatLeft from "../../../../../assets/layers-mid/3-0-water-boat-left.webp";
import waterBoatLeftLow from "../../../../../assets/layers-low/3-0-water-boat-left.webp";
import fogSmallFront from "../../../../../assets/layers-mid/2-2-fog-small-front.webp";
import fogFront from "../../../../../assets/layers-mid/2-1-fog-front.webp";
import fogFrontLow from "../../../../../assets/layers-low/2-1-fog-front.webp";
import birds from "../../../../../assets/layers-mid/2-0-birds.webp";
import birdsLow from "../../../../../assets/layers-low/2-0-birds.webp";
import person from "../../../../../assets/layers-mid/1-0-person.webp";
import personLow from "../../../../../assets/layers-low/1-0-person.webp";
import light from "../../../../../assets/layers-mid/0-0-light.webp";
import "./parallax.scss";
import "./parallax.text.scss";
import { useParallax } from "../../hooks/useParallax.ts";
import classNames from "classnames";
import overlayStyles from "./ParallaxOverlay.module.scss";
import useTooltips from "../../hooks/useTooltips.tsx";
import { useRef } from "react";

type Props = {
  isActive: boolean;
};

export default function Parallax({ isActive }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  const tweens = useParallax(containerRef, isActive);
  const {
    tooltips,
    onTextClick,
    onTouchStart,
    onTouchEnd,
    onPointerEnter,
    onPointerLeave,
    onTextPointerEnter,
    onPointerMove,
  } = useTooltips(tweens);

  return (
    <>
      <div className="vignette"></div>
      <div className={classNames(overlayStyles.overlay)}>
        <tooltips.InteractiveTooltip />
        <tooltips.MoreTooltip />
      </div>
      <div
        className="parallax-container swiper-no-swiping"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
        onPointerMove={onPointerMove}
        ref={containerRef}
      >
        <img
          src={birdsLow}
          alt="birdsLow"
          data-src={birds}
          className="lazyload blur-up parallax birds"
          data-speed-x="0.3"
          data-speed-y="0.25"
          data-speed-z="0.2"
          data-reveal-distance-x="1000"
          data-reveal-speed="0.7"
        />
        <img
          fetchPriority={"high"}
          src={personLow}
          data-src={person}
          alt="person"
          className="lazyload blur-up parallax person"
          data-speed-x="0.05"
          data-speed-y="0.10"
          data-speed-z="1"
          data-reveal-distance-x="-0.1"
          data-reveal-distance-y="5"
          data-reveal-speed="0.7"
        />
        <img
          src={light}
          alt="light"
          className="lazyload blur-up parallax light"
          data-speed-x="0.2"
          data-speed-y="0.2"
          data-speed-z="0.5"
          data-reveal-distance-x="-30"
          data-reveal-speed="0.4"
        />
        <div className="lazyload blur-up parallax-layers">
          <div className={classNames(overlayStyles.overlayFixed)}>
            <tooltips.TextTooltip />
          </div>
          <img
            fetchPriority={"high"}
            src={sky3Low}
            data-src={sky3}
            alt="sky3"
            className="lazyload blur-up parallax sky-3"
            data-speed-x="0.19"
            data-speed-y="0.16"
            data-speed-z="0"
          />
          <div
            className="lazyload blur-up parallax text swiper-no-swiping"
            data-speed-x="0.19"
            data-speed-y="0.13"
            data-speed-z="0"
            data-speed-rot-y="8"
            data-speed-rot-x="4"
          >
            <div
              className="dev"
              onClick={onTextClick}
              onPointerEnter={onTextPointerEnter}
            >
              <h1 className="filled">Fullstack</h1>
              <h1 className="filled">Developer</h1>
            </div>
            <div
              className="name"
              onClick={onTextClick}
              onPointerEnter={onTextPointerEnter}
            >
              <h1 className="empty">Michael</h1>
              <h1 className="empty">Dovhalov</h1>
            </div>
          </div>
          <img
            fetchPriority={"high"}
            src={sky2Low}
            data-src={sky2}
            alt="sky2Low"
            className="lazyload blur-up parallax sky-2"
            data-speed-x="0.26"
            data-speed-y="0.13"
            data-speed-z="0"
            data-reveal-distance-y="-1"
            data-reveal-speed="1.1"
          />
          <img
            fetchPriority={"high"}
            src={sky1Low}
            data-src={sky1}
            alt="sky1Low"
            className="lazyload blur-up parallax sky-1"
            data-speed-x="0.22"
            data-speed-y="0.1"
            data-speed-z="0"
            data-reveal-distance-y="-20"
            data-reveal-speed="0.7"
          />
          <img
            src={traceLow}
            data-src={trace}
            alt="trace"
            className="lazyload blur-up parallax trace"
            data-speed-x="0.25"
            data-speed-y="0.165"
            data-speed-z="0.1"
            data-reveal-distance-x="200"
            data-reveal-distance-y="5"
            data-reveal-speed="0.8"
          />
          <img
            src={left9Low}
            data-src={left9}
            alt="left9"
            className="lazyload blur-up parallax left-9"
            data-speed-x="0.19"
            data-speed-y="0.17"
            data-speed-z="0.2"
            data-reveal-distance-y="20"
            data-reveal-speed="0.7"
          />
          <img
            src={left8Low}
            data-src={left8}
            alt="left8"
            className="lazyload blur-up parallax left-8"
            data-speed-x="0.2"
            data-speed-y="0.18"
            data-speed-z="0.21"
            data-reveal-distance-y="19"
            data-reveal-speed="0.6"
          />
          <img
            src={left7Low}
            data-src={left7}
            alt="left7"
            className="lazyload blur-up parallax left-7"
            data-speed-x="0.2"
            data-speed-y="0.185"
            data-speed-z="0.215"
            data-reveal-distance-y="18"
            data-reveal-speed="0.55"
          />
          <img
            src={left6Low}
            data-src={left6}
            alt="left6"
            className="lazyload blur-up parallax left-6"
            data-speed-x="0.19"
            data-speed-y="0.17"
            data-speed-z="0.2"
            data-reveal-distance-y="17"
            data-reveal-speed="0.5"
          />
          <img
            src={left5Low}
            data-src={left5}
            alt="left5"
            className="lazyload blur-up parallax left-5"
            data-speed-x="0.18"
            data-speed-y="0.16"
            data-speed-z="0.19"
            data-reveal-distance-y="16"
            data-reveal-speed="0.6"
          />
          <img
            src={left4Low}
            data-src={left4}
            alt="left4"
            className="lazyload blur-up parallax left-4"
            data-speed-x="0.14"
            data-speed-y="0.13"
            data-speed-z="0.16"
            data-reveal-distance-y="15"
            data-reveal-speed="0.7"
          />
          <img
            src={left3Low}
            data-src={left3}
            alt="left3"
            className="lazyload blur-up parallax left-3"
            data-speed-x="0.2"
            data-speed-y="0.18"
            data-speed-z="0.21"
            data-reveal-distance-y="14"
            data-reveal-speed="0.8"
          />
          <img
            src={left2Low}
            data-src={left2}
            alt="left2"
            className="lazyload blur-up parallax left-2"
            data-speed-x="0.19"
            data-speed-y="0.16"
            data-speed-z="0.19"
            data-reveal-distance-y="13"
            data-reveal-speed="0.8"
          />
          <img
            src={fogLeft}
            alt="fogLeft"
            className="parallax fog-left"
            data-speed-x="0.2"
            data-speed-y="0.21"
            data-speed-z="0.215"
            data-reveal-distance-x="-12"
            data-reveal-speed="1"
          />
          <img
            src={right11Low}
            data-src={right11}
            alt="right11"
            className="lazyload blur-up parallax right-11"
            data-speed-x="0.14"
            data-speed-y="0.13"
            data-speed-z="0.185"
            data-reveal-distance-y="20"
            data-reveal-speed="0.55"
          />
          <img
            src={right10Low}
            data-src={right10}
            alt="right10"
            className="lazyload blur-up parallax right-10"
            data-speed-x="0.15"
            data-speed-y="0.13"
            data-speed-z="0.16"
            data-reveal-distance-y="19"
            data-reveal-speed="0.55"
          />
          <img
            src={right9Low}
            data-src={right9}
            alt="right9"
            className="lazyload blur-up parallax right-9"
            data-speed-x="0.15"
            data-speed-y="0.16"
            data-speed-z="0.19"
            data-reveal-distance-y="18"
            data-reveal-speed="0.55"
          />
          <img
            src={right8Low}
            data-src={right8}
            alt="right8"
            className="lazyload blur-up parallax right-8"
            data-speed-x="0.17"
            data-speed-y="0.15"
            data-speed-z="0.18"
            data-reveal-distance-y="17"
            data-reveal-speed="0.5"
          />
          <img
            src={right7Low}
            data-src={right7}
            alt="right7"
            className="lazyload blur-up parallax right-7"
            data-speed-x="0.18"
            data-speed-y="0.18"
            data-speed-z="0.21"
            data-reveal-distance-y="16"
            data-reveal-speed="0.6"
          />
          <img
            src={fogRight6}
            alt="fogRight6"
            className="parallax fog-right-6"
            data-speed-x="0.2"
            data-speed-y="0.18"
            data-speed-z="0.21"
            data-reveal-distance-x="30"
            data-reveal-speed="0.7"
          />
          <img
            src={right5Low}
            data-src={right5}
            alt="right5"
            className="lazyload blur-up parallax right-5"
            data-speed-x="0.2"
            data-speed-y="0.2"
            data-speed-z="0.215"
            data-reveal-distance-y="20"
            data-reveal-speed="0.65"
          />
          <img
            src={right4Low}
            data-src={right4}
            alt="right4"
            className="lazyload blur-up parallax right-4"
            data-speed-x="0.18"
            data-speed-y="0.19"
            data-speed-z="0.22"
            data-reveal-distance-y="14"
            data-reveal-speed="0.7"
          />
          <img
            src={right3Low}
            data-src={right3}
            alt="right3"
            className="lazyload blur-up parallax right-3"
            data-speed-x="0.21"
            data-speed-y="0.215"
            data-speed-z="0.215"
            data-reveal-distance-y="13"
            data-reveal-speed="0.8"
          />
          <img
            src={right2Low}
            data-src={right2}
            alt="right2"
            className="lazyload blur-up parallax right-2"
            data-speed-x="0.17"
            data-speed-y="0.18"
            data-speed-z="0.165"
            data-reveal-distance-y="12"
            data-reveal-speed="0.65"
          />
          <img
            src={right1Low}
            data-src={right1}
            alt="right1"
            className="lazyload blur-up parallax right-1"
            data-speed-x="0.2"
            data-speed-y="0.2"
            data-speed-z="0.2"
            data-reveal-distance-y="11"
            data-reveal-speed="0.7"
          />
          <img
            src={fogRight0}
            alt="fogRight0"
            className="parallax fog-right-0"
            data-speed-x="0.22"
            data-speed-y="0.15"
            data-speed-z="0.17"
            data-reveal-distance-y="10"
            data-reveal-speed="0.8"
          />
          <img
            src={middle5Low}
            data-src={middle5}
            alt="middle5"
            className="lazyload blur-up parallax middle-5"
            data-speed-x="0.15"
            data-speed-y="0.12"
            data-speed-z="0.14"
            data-reveal-distance-y="20"
            data-reveal-speed="0.6"
          />
          <img
            src={middle4Low}
            data-src={middle4}
            alt="middle4"
            className="lazyload blur-up parallax middle-4"
            data-speed-x="0.19"
            data-speed-y="0.13"
            data-speed-z="0.15"
            data-reveal-distance-y="1"
            data-reveal-speed="0.55"
          />
          <img
            src={fogMiddleLow}
            alt="fogMiddleLow"
            className="parallax fog-middle"
            data-speed-x="0.23"
            data-speed-y="0.15"
            data-speed-z="0.17"
            data-reveal-distance-y="15"
            data-reveal-speed="0.7"
          />
          <img
            src={middle2Low}
            data-src={middle2}
            alt="middle2"
            className="lazyload blur-up parallax middle-2"
            data-speed-x="0.18"
            data-speed-y="0.15"
            data-speed-z="0.17"
            data-reveal-distance-y="17"
            data-reveal-speed="0.6"
          />
          <img
            src={middle1Low}
            data-src={middle1}
            alt="middle1"
            className="lazyload blur-up parallax middle-1"
            data-speed-x="0.175"
            data-speed-y="0.16"
            data-speed-z="0.21"
            data-reveal-distance-y="16"
            data-reveal-speed="0.7"
          />
          <img
            src={middle0Low}
            data-src={middle0}
            alt="middle0"
            className="lazyload blur-up parallax middle-0"
            data-speed-x="0.2"
            data-speed-y="0.2"
            data-speed-z="0.2"
            data-reveal-distance-y="15"
            data-reveal-speed="0.7"
          />
          <img
            src={buildingsFrontLow}
            data-src={buildingsFront}
            alt="buildingsFront"
            className="lazyload blur-up parallax buildings-front"
            data-speed-x="0.19"
            data-speed-y="0.2"
            data-speed-z="0"
            data-reveal-distance-y="1"
            data-reveal-speed="1.2"
            fetchPriority={"high"}
          />
          <img
            fetchPriority={"high"}
            src={waterLow}
            data-src={water}
            alt="water"
            className="lazyload blur-up parallax water"
            data-speed-x="0.2"
            data-speed-y="0.2"
            data-speed-z="0"
          />
          <img
            src={waterYachtLow}
            data-src={waterYacht}
            alt="waterYacht"
            className="lazyload blur-up parallax water-yacht"
            data-speed-x="0.23"
            data-speed-y="0.21"
            data-speed-z="0.1"
            data-reveal-distance-x="-1"
            data-reveal-speed="0.6"
          />
          <img
            src={waterBoatRightLow}
            data-src={waterBoatRight}
            alt="waterBoatRight"
            className="lazyload blur-up parallax water-boat-right"
            data-speed-x="0.29"
            data-speed-y="0.2"
            data-speed-z="0.1"
            data-reveal-distance-x="-1"
            data-reveal-speed="0.8"
          />
          <img
            src={waterBoatLeftLow}
            data-src={waterBoatLeft}
            alt="waterBoatLeft"
            className="lazyload blur-up parallax water-boat-left"
            data-speed-x="0.15"
            data-speed-y="0.21"
            data-speed-z="0.21"
            data-reveal-distance-x="-1"
            data-reveal-speed="0.3"
          />
          <img
            src={fogSmallFront}
            alt="fogSmallFront"
            className="parallax fog-front-small"
            data-speed-x="0.23"
            data-speed-y="0.18"
            data-speed-z="0.21"
            data-reveal-distance-x="-20"
            data-reveal-distance-y="20"
            data-reveal-speed="0.8"
          />
          <img
            src={fogFrontLow}
            data-src={fogFront}
            alt="fogFront"
            className="lazyload blur-up parallax fog-front"
            data-speed-x="0.25"
            data-speed-y="0.25"
            data-speed-z="0.23"
            data-reveal-distance-x="20"
            data-reveal-distance-y="20"
            data-reveal-speed="0.5"
          />
          <img
            fetchPriority={"high"}
            src={raysLeft}
            alt="raysLeft"
            className="parallax rays-left"
            data-speed-x="0.11"
            data-speed-y="0.05"
            data-speed-z="0.15"
            data-reveal-distance-y="-20"
            data-reveal-distance-x="-5"
            data-reveal-speed="1"
          />
        </div>
      </div>
    </>
  );
}
