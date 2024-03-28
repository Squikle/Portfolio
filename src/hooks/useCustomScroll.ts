import { useEffect } from "react";
import { throttle } from "../utils/throttle.ts";

export function useCustomScroll() {
  useEffect(() => {
    const isSupportsScrollend = () => "onscrollend" in window;

    if (!isSupportsScrollend()) return;

    const container = document.getElementById("main-container");
    if (!container) throw new Error("main-container doesn't exist!");

    let scrolling = false;

    const handleScrollFinish = () => {
      scrolling = false;
    };

    const handleScroll = throttle((event: WheelEvent) => {
      if (scrolling || Math.abs(event.deltaY) <= 0) return;

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
    }, 1000);

    container.addEventListener("wheel", handleScroll);
    if (isSupportsScrollend())
      container.addEventListener("scrollend", handleScrollFinish);

    return () => {
      if (isSupportsScrollend())
        container.removeEventListener("scrollend", handleScrollFinish);

      container.removeEventListener("wheel", handleScroll);
    };
  }, []);
}
