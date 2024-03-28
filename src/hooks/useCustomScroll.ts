import { useEffect } from "react";

type WheelEventWithWheelDelta = WheelEvent & { wheelDeltaY: number };

export function useCustomScroll() {
  useEffect(() => {
    const container = document.getElementById("main-container");

    if (!container) throw new Error("main-container doesn't exist!");

    let scrolling = false;
    let timeout: NodeJS.Timeout | null = null;

    const handleScrollFinish = () => {
      scrolling = false;
    };

    const handleBlockTimerScroll = () => {
      if (timeout !== null) clearTimeout(timeout);

      timeout = setTimeout(() => {
        scrolling = false;
      }, 50);
    };

    const handleScroll = (event: WheelEvent) => {
      event.preventDefault();
      if (Math.abs(event.deltaY) <= 5) return;

      if (scrolling) return;

      const topBound = !container.scrollTop && event.deltaY <= 0;
      if (topBound) {
        return;
      }

      const bottomBound =
        container.scrollTop + window.innerHeight >=
          container.scrollHeight - 1 && event.deltaY >= 0;
      if (bottomBound) return;

      console.log("scroll!");
      container.scrollBy({
        top: Math.sign(event.deltaY) * window.innerHeight,
        behavior: "smooth",
      });
      scrolling = true;
    };

    const isSupportsScrollend = () => "onscrollend" in window;

    const isTrackpad = (e: WheelEventWithWheelDelta) => {
      if (e.wheelDeltaY) {
        if (e.wheelDeltaY === e.deltaY * -3) {
          return true;
        }
      } else if (e.deltaMode === 0) {
        return true;
      }
    };

    container.addEventListener("touchmove", () => console.log("touch"));
    container.addEventListener("wheel", handleScroll);
    if (isSupportsScrollend())
      container.addEventListener("scrollend", handleScrollFinish);
    else container.addEventListener("wheel", handleBlockTimerScroll);

    return () => {
      if (isSupportsScrollend())
        container.removeEventListener("scrollend", handleScrollFinish);
      else container.removeEventListener("wheel", handleBlockTimerScroll);

      container.removeEventListener("wheel", handleScroll);
    };
  }, []);
}
