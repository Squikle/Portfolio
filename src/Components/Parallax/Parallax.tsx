import sky3 from "./layers-mid/9-3-sky.png";
import sky2 from "./layers-mid/9-2-sky.png";
import sky1 from "./layers-mid/9-1-sky.png";
import skyOverlap from "./layers-mid/9-0-sky-overlap.png";
import trace from "./layers-mid/8-0-trace.png";
import left9 from "./layers-mid/7-9-left.png";
import left8 from "./layers-mid/7-8-left.png";
import left7 from "./layers-mid/7-7-left.png";
import left6 from "./layers-mid/7-6-left.png";
import left5 from "./layers-mid/7-5-left.png";
import left4 from "./layers-mid/7-4-left.png";
import left3 from "./layers-mid/7-3-left.png";
import left2 from "./layers-mid/7-2-left.png";
import raysLeft from "./layers-mid/7-1-rays-left.png";
import fogLeft from "./layers-mid/7-0-fog-left.png";
import right11 from "./layers-mid/6-11-right.png";
import right10 from "./layers-mid/6-10-right.png";
import right9 from "./layers-mid/6-9-right.png";
import right8 from "./layers-mid/6-8-right.png";
import right7 from "./layers-mid/6-7-right.png";
import fogRight6 from "./layers-mid/6-6-fog-right.png";
import right5 from "./layers-mid/6-5-right.png";
import right4 from "./layers-mid/6-4-right.png";
import right3 from "./layers-mid/6-3-right.png";
import right2 from "./layers-mid/6-2-right.png";
import right1 from "./layers-mid/6-1-right.png";
import fogRight0 from "./layers-mid/6-0-fog-right.png";
import middle5 from "./layers-mid/5-5-middle.png";
import middle4 from "./layers-mid/5-4-middle.png";
import fogMiddle from "./layers-mid/5-3-fog-middle.png";
import middle2 from "./layers-mid/5-2-middle.png";
import middle1 from "./layers-mid/5-1-middle.png";
import middle0 from "./layers-mid/5-0-middle.png";
import buildingsFront from "./layers-mid/4-0-buildings-front.png";
import water from "./layers-mid/3-3-water.png";
import waterYacht from "./layers-mid/3-2-water-yacht.png";
import waterBoatRight from "./layers-mid/3-1-water-boat-right.png";
import waterBoatLeft from "./layers-mid/3-0-water-boat-left.png";
import fogSmallFront from "./layers-mid/2-2-fog-small-front.png";
import fogFront from "./layers-mid/2-1-fog-front.png";
import birds from "./layers-mid/2-0-birds.png";
import person from "./layers-mid/1-0-person.png";
import light from "./layers-mid/0-0-light.png";
import "./parallax.scss";
import "./parallax.text.scss";
import { useParallax } from "./useParallax.ts";

type Props = {
  isActive: boolean;
};

export default function Parallax({ isActive }: Props) {
  useParallax(isActive);

  return (
    <div className="parallax-container">
      <img
        src={birds}
        className="parallax birds"
        data-speed-x="0.3"
        data-speed-y="0.25"
        data-speed-z="0.2"
      />
      <img
        src={person}
        className="parallax person"
        data-speed-x="0.05"
        data-speed-y="0.10"
        data-speed-z="1"
      />
      <img
        src={light}
        className="parallax light"
        data-speed-x="0.2"
        data-speed-y="0.2"
        data-speed-z="0.5"
      />
      <div className="parallax-layers">
        <img
          src={sky3}
          className="parallax sky-3"
          data-speed-x="0.19"
          data-speed-y="0.16"
          data-speed-z="0"
        />
        <div
          className="parallax text"
          data-speed-x="0.19"
          data-speed-y="0.13"
          data-speed-z="0"
          data-speed-rot-y="8"
          data-speed-rot-x="4"
        >
          <div className="dev">
            <h1 className="filled">Fullstack</h1>
            <h1 className="filled">Developer</h1>
          </div>
          <div className="name">
            <h1 className="empty">Michael</h1>
            <h1 className="empty">Dovhalov</h1>
          </div>
        </div>
        <img
          src={sky2}
          className="parallax sky-2"
          data-speed-x="0.26"
          data-speed-y="0.13"
          data-speed-z="0"
        />
        <img
          src={sky1}
          className="parallax sky-1"
          data-speed-x="0.22"
          data-speed-y="0.1"
          data-speed-z="0"
        />
        <img src={skyOverlap} className="parallax sky-overlap" />
        <img
          src={trace}
          className="parallax trace"
          data-speed-x="0.25"
          data-speed-y="0.165"
          data-speed-z="0.1"
        />
        <img
          src={left9}
          className="parallax left-9"
          data-speed-x="0.19"
          data-speed-y="0.17"
          data-speed-z="0.2"
        />
        <img
          src={left8}
          className="parallax left-8"
          data-speed-x="0.2"
          data-speed-y="0.18"
          data-speed-z="0.21"
        />
        <img
          src={left7}
          className="parallax left-7"
          data-speed-x="0.2"
          data-speed-y="0.185"
          data-speed-z="0.215"
        />
        <img
          src={left6}
          className="parallax left-6"
          data-speed-x="0.19"
          data-speed-y="0.17"
          data-speed-z="0.2"
        />
        <img
          src={left5}
          className="parallax left-5"
          data-speed-x="0.18"
          data-speed-y="0.16"
          data-speed-z="0.19"
        />
        <img
          src={left4}
          className="parallax left-4"
          data-speed-x="0.14"
          data-speed-y="0.13"
          data-speed-z="0.16"
        />
        <img
          src={left3}
          className="parallax left-3"
          data-speed-x="0.2"
          data-speed-y="0.18"
          data-speed-z="0.21"
        />
        <img
          src={left2}
          className="parallax left-2"
          data-speed-x="0.19"
          data-speed-y="0.16"
          data-speed-z="0.19"
        />
        <img
          src={fogLeft}
          className="parallax fog-left"
          data-speed-x="0.2"
          data-speed-y="0.21"
          data-speed-z="0.215"
        />
        <img
          src={right11}
          className="parallax right-11"
          data-speed-x="0.14"
          data-speed-y="0.13"
          data-speed-z="0.185"
        />
        <img
          src={right10}
          className="parallax right-10"
          data-speed-x="0.15"
          data-speed-y="0.13"
          data-speed-z="0.16"
        />
        <img
          src={right9}
          className="parallax right-9"
          data-speed-x="0.15"
          data-speed-y="0.16"
          data-speed-z="0.19"
        />
        <img
          src={right8}
          className="parallax right-8"
          data-speed-x="0.17"
          data-speed-y="0.15"
          data-speed-z="0.18"
        />
        <img
          src={right7}
          className="parallax right-7"
          data-speed-x="0.18"
          data-speed-y="0.18"
          data-speed-z="0.21"
        />
        <img
          src={fogRight6}
          className="parallax fog-right-6"
          data-speed-x="0.2"
          data-speed-y="0.18"
          data-speed-z="0.21"
        />
        <img
          src={right5}
          className="parallax right-5"
          data-speed-x="0.2"
          data-speed-y="0.2"
          data-speed-z="0.215"
        />
        <img
          src={right4}
          className="parallax right-4"
          data-speed-x="0.18"
          data-speed-y="0.19"
          data-speed-z="0.22"
        />
        <img
          src={right3}
          className="parallax right-3"
          data-speed-x="0.21"
          data-speed-y="0.215"
          data-speed-z="0.215"
        />
        <img
          src={right2}
          className="parallax right-2"
          data-speed-x="0.17"
          data-speed-y="0.18"
          data-speed-z="0.165"
        />
        <img
          src={right1}
          className="parallax right-1"
          data-speed-x="0.2"
          data-speed-y="0.2"
          data-speed-z="0.2"
        />
        <img
          src={fogRight0}
          className="parallax fog-right-0"
          data-speed-x="0.22"
          data-speed-y="0.15"
          data-speed-z="0.17"
        />
        <img
          src={middle5}
          className="parallax middle-5"
          data-speed-x="0.15"
          data-speed-y="0.12"
          data-speed-z="0.14"
        />
        <img
          src={middle4}
          className="parallax middle-4"
          data-speed-x="0.19"
          data-speed-y="0.13"
          data-speed-z="0.15"
        />
        <img
          src={fogMiddle}
          className="parallax fog-middle"
          data-speed-x="0.23"
          data-speed-y="0.15"
          data-speed-z="0.17"
        />
        <img
          src={middle2}
          className="parallax middle-2"
          data-speed-x="0.18"
          data-speed-y="0.15"
          data-speed-z="0.17"
        />
        <img
          src={middle1}
          className="parallax middle-1"
          data-speed-x="0.175"
          data-speed-y="0.16"
          data-speed-z="0.21"
        />
        <img
          src={middle0}
          className="parallax middle-0"
          data-speed-x="0.2"
          data-speed-y="0.2"
          data-speed-z="0.2"
        />
        <img
          src={buildingsFront}
          className="parallax buildings-front"
          data-speed-x="0.19"
          data-speed-y="0.2"
          data-speed-z="0"
        />
        <img
          src={water}
          className="parallax water"
          data-speed-x="0.2"
          data-speed-y="0.2"
          data-speed-z="0"
        />
        <img
          src={waterYacht}
          className="parallax water-yacht"
          data-speed-x="0.23"
          data-speed-y="0.21"
          data-speed-z="0.1"
        />
        <img
          src={waterBoatRight}
          className="parallax water-boat-right"
          data-speed-x="0.29"
          data-speed-y="0.2"
          data-speed-z="0.1"
        />
        <img
          src={waterBoatLeft}
          className="parallax water-boat-left"
          data-speed-x="0.15"
          data-speed-y="0.21"
          data-speed-z="0.21"
        />
        <img
          src={fogSmallFront}
          className="parallax fog-front-small"
          data-speed-x="0.23"
          data-speed-y="0.18"
          data-speed-z="0.21"
        />
        <img
          src={fogFront}
          className="parallax fog-front"
          data-speed-x="0.25"
          data-speed-y="0.25"
          data-speed-z="0.23"
        />
        <img
          src={raysLeft}
          className="parallax rays-left"
          data-speed-x="0.11"
          data-speed-y="0.05"
          data-speed-z="0.15"
        />
      </div>
    </div>
  );
}
