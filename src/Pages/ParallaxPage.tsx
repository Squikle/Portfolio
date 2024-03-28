import PageSection from "../Components/Page/PageSection";
import InfoCard from "../Components/TextCard/InfoCard";
import Parallax from "../Components/Parallax/Parallax";
import Page from "../Components/Page/Page";
import styles from "./ParallaxPage.module.css";
import classNames from "classnames";
import { useEffect, useState } from "react";

type Props = {
  className?: string;
};

export default function ParallaxPage({ className }: Props) {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    document.addEventListener("touchstart", handleTouchStart, false);
    document.addEventListener("touchmove", handleTouchMove, false);

    let xDown = null;
    let yDown = null;

    function getTouches(evt) {
      return (
        evt.touches || // browser API
        evt.originalEvent.touches
      ); // jQuery
    }

    function handleTouchStart(evt) {
      const firstTouch = getTouches(evt)[0];
      xDown = firstTouch.clientX;
      yDown = firstTouch.clientY;
    }

    function handleTouchMove(evt) {
      if (!xDown || !yDown) {
        return;
      }

      var xUp = evt.touches[0].clientX;
      var yUp = evt.touches[0].clientY;

      var xDiff = xDown - xUp;
      var yDiff = yDown - yUp;

      if (Math.abs(xDiff) > Math.abs(yDiff)) {
        /*most significant*/
        if (xDiff > 0) {
          /* right swipe */
        } else {
          /* left swipe */
        }
      } else {
        if (yDiff > 0) {
          /* down swipe */
        } else {
          /* up swipe */
        }
      }
      /* reset values */
      xDown = null;
      yDown = null;
    }
  }, []);

  return (
    <Page>
      <PageSection
        className={classNames(className, styles.parallaxSlide)}
        onActiveUpdate={setIsActive}
      >
        <InfoCard></InfoCard>
        <Parallax isActive={isActive}></Parallax>
      </PageSection>
    </Page>
  );
}
