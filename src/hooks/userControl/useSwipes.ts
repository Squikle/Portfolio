import { RefObject, useEffect } from "react";

export type SwipeHandler = (delta: Delta) => void;
export type SwipeEndHandler = (delta: Delta & { time: number }) => void;

export type Delta = {
  x: number;
  y: number;
};

export function useSwipes(
  swipeElementRef: RefObject<HTMLElement>,
  onSwipe?: SwipeHandler,
  onSwipeEnd?: SwipeEndHandler,
  justOnce: boolean = false,
  xDeltaThreshold: number = Number.MIN_VALUE,
  yDeltaThreshold: number = Number.MIN_VALUE,
  delayThreshold: number = Number.MAX_VALUE,
) {
  let triggeredSwipe = false;

  useEffect(() => {
    const element = swipeElementRef.current;
    if (!element) return;

    let xDown: number | null;
    let yDown: number | null;
    let timeDown: number | null;

    const resetStart = () => {
      xDown = null;
      yDown = null;
      timeDown = null;
      triggeredSwipe = false;
    };

    const getTouchDelta = (e: TouchEvent, xDown: number, yDown: number) => {
      const clientX = e.changedTouches[0].clientX;
      const clientY = e.changedTouches[0].clientY;

      const xDelta = ((xDown - clientX) / element.offsetHeight) * 100;
      const yDelta = ((yDown - clientY) / element.offsetHeight) * 100;

      return { xDelta, yDelta };
    };

    const handleTouchStart = (e: TouchEvent) => {
      resetStart();
      timeDown = Date.now();
      xDown = e.touches[0].clientX;
      yDown = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (justOnce && triggeredSwipe) return;

      const anyTextSelected = !window.getSelection()?.isCollapsed;
      if (anyTextSelected || !xDown || !yDown || !timeDown || !element) return;

      const { xDelta, yDelta } = getTouchDelta(e, xDown, yDown);

      if (
        Math.abs(xDelta) < xDeltaThreshold &&
        Math.abs(yDelta) < yDeltaThreshold
      )
        return;

      if (onSwipe) onSwipe({ x: xDelta, y: yDelta });
      triggeredSwipe = true;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!xDown || !yDown || !timeDown || !element) return;

      let timeDelta = Date.now() - timeDown;
      if (timeDelta > delayThreshold) {
        return;
      }

      const { xDelta, yDelta } = getTouchDelta(e, xDown, yDown);

      if (onSwipeEnd) onSwipeEnd({ x: xDelta, y: yDelta, time: timeDelta });
      resetStart();
    };

    element.addEventListener("touchstart", handleTouchStart, false);
    element.addEventListener("touchmove", handleTouchMove, false);
    element.addEventListener("touchend", handleTouchEnd, false);

    return () => {
      element.removeEventListener("touchstart", handleTouchStart);
      element.removeEventListener("touchmove", handleTouchMove);
      element.removeEventListener("touchend", handleTouchEnd);
    };
  }, [swipeElementRef, onSwipe, onSwipeEnd]);
}
