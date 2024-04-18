import {RefObject, useEffect} from "react";

export type Direction = "up" | "down";

export function useCustomWheelScroll(
  scrollElementRef: RefObject<HTMLElement>,
  onScroll: (direction: Direction, yDelta: number) => void,
) {
  useEffect(() => {
    const element = scrollElementRef.current;
    if (!element) return;

    const handleScroll = (event: WheelEvent) => {
      const scrollTop = element.scrollTop;
      const scrollHeight = element.scrollHeight;
      const clientHeight = element.clientHeight;

      const scrollable = scrollHeight > clientHeight;
      const scrolledToBottom = scrollTop + clientHeight >= scrollHeight;
      const scrolledToTop = !scrollTop;

      const direction = event.deltaY > 0 ? "down" : "up";
      if (!scrollable) onScroll(direction, event.deltaY);
      else if (scrolledToTop && direction === "up")
        onScroll(direction, event.deltaY);
      else if (scrolledToBottom && direction === "down")
        onScroll(direction, event.deltaY);
    };

    element.addEventListener("wheel", handleScroll);
    return () => element.removeEventListener("wheel", handleScroll);
  }, [scrollElementRef, onScroll]);
}
